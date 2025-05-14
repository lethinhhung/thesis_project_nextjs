"use client";

import { Editor } from "@/components/dynamic-editor";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowUpRight,
  ChevronDown,
  Copy,
  Loader,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ChatBox from "@/components/chat-box";
import { AnimatePresence, motion } from "framer-motion";
import { LessonWithContent } from "@/interfaces/lesson";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound, useParams, useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateNewSmall } from "@/components/create-new-small";
import { DocumentCardSkeleton } from "@/components/skeleton/document-skeleton";
import { DocumentCard } from "@/components/document-card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import DocumentPreview from "@/components/document-preview";
import { Document as DocumentInterface } from "@/interfaces/document";
import { EditLesson } from "@/components/edit-lesson";

function Lesson() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [markDown, setMarkDown] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [lesson, setLesson] = useState<LessonWithContent>();
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentInterface | null>(null);
  const [openDocumentPreview, setOpenDocumentPreview] = useState(false);
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  const courseId = params.courseId as string;
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  const copyText = () => {
    const text = document?.getElementById("summary")?.innerText;
    navigator.clipboard
      .writeText(text?.toString() || "")
      .then(() => {
        const audio = new Audio("/notification.mp3");
        audio.play();
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Err:", err);
      });
  };

  const fetchLesson = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/lesson/${lessonId}`, {
        method: "GET",
      });
      const response = await processResponse(res, {
        success: false,
        error: true,
      });

      if (response.success) {
        setLesson(response.data);
      }
    } catch (error) {
      console.error("Error fetching lesson:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLesson = async () => {
    setIsDeleteLoading(true);
    const res = await fetch(`/api/lesson/delete/${lessonId}`, {
      method: "DELETE",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.success("Lesson deleted successfully", {
        description: `${lesson?.title} has been deleted`,
      });
      setOpenDelete(false);
      router.push(`/courses/${courseId}/lessons`);
    } else {
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.error("Failed to delete lesson", {
        description: response.error || "Something went wrong",
      });
    }
    setIsDeleteLoading(false);
  };

  const handleDocumentSelect = (document: DocumentInterface) => {
    setSelectedDocument(document);
    setOpenDocumentPreview(true);
  };

  useEffect(() => {
    fetchLesson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full max-w-7xl h-full min-h-80 mx-auto" />;
  }

  if (!lesson) {
    notFound(); // Trả về trang 404
  }

  return (
    <div className="flex justify-center h-full w-full gap-4">
      <div
        className="w-full grid grid-cols-2 gap-4 max-w-5xl font-inherit relative"
        spellCheck="false"
      >
        <div className="col-span-2 gap-4 columns-md space-y-4">
          <Card className="dark:border-dashed break-inside-avoid-column">
            <CardHeader className="flex-1">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col gap-1">
                  <CardTitle className="break-all">{lesson?.title}</CardTitle>
                  <CardDescription>
                    {capitalizeFirstLetter(
                      format(new Date(lesson?.createdAt), "PPPP", {
                        locale: currentDateFnsLocale,
                      })
                    )}
                  </CardDescription>
                  <CardDescription>
                    Updated {/* relative time */}
                    {lesson?.updatedAt &&
                      formatDistanceToNow(new Date(lesson?.updatedAt), {
                        addSuffix: true,
                        locale: currentDateFnsLocale,
                      })}
                  </CardDescription>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setOpenDelete(true)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete this lesson?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        remove this lesson and all of its data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant={"destructive"}
                        onClick={deleteLesson}
                        className="min-w-20"
                        disabled={isDeleteLoading}
                      >
                        {isDeleteLoading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <EditLesson
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                  lesson={lesson}
                  fetchLesson={fetchLesson}
                />
              </div>

              {/* <CardDescription>
                User&apos;s lesson note User&apos;s lesson note User&apos;s
                lesson note User&apos;s lesson note User&apos;s lesson note
                User&apos;s lesson note User&apos;s lesson note User&apos;s
                lesson note User&apos;s lesson note User&apos;s lesson note
              </CardDescription> */}
            </CardHeader>
          </Card>
          <Card className="dark:border-dashed break-inside-avoid-column">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <CardTitle className="break-all">
                    Reference documents
                  </CardTitle>
                  <CardDescription>
                    {lesson.refDocuments.length} reference documents
                  </CardDescription>
                </div>

                <div className="flex items-center gap-1">
                  <CreateNewSmall
                    variant="ghost"
                    size="sm"
                    type="document"
                    courseId={courseId}
                    lessonId={lessonId}
                    refetchData={fetchLesson}
                  />
                  <Button
                    variant={"ghost"}
                    size="sm"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    {isCollapsed ? (
                      <ChevronDown className="rotate-180" />
                    ) : (
                      <ChevronDown />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {isCollapsed && (
              <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed}>
                <CardContent className="w-full">
                  <CollapsibleContent className="w-full columns-3xs space-y-2 gap-2">
                    {isLoading ? (
                      Array.from({ length: 3 }, (_, index) => (
                        <DocumentCardSkeleton
                          key={index}
                          variant="sm"
                          className="w-full break-inside-avoid-column"
                        />
                      ))
                    ) : lesson.refDocuments.length > 0 ? (
                      lesson.refDocuments.map((document, index) => (
                        <DocumentCard
                          variant="sm"
                          className="break-inside-avoid-column"
                          key={index}
                          document={document}
                          onClick={() => {
                            handleDocumentSelect(document);
                          }}
                        />
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No reference documents available
                      </p>
                    )}
                  </CollapsibleContent>
                </CardContent>
              </Collapsible>
            )}
          </Card>
          <Card
            className={
              "dark:border-dashed justify-between break-inside-avoid-column"
            }
          >
            <div className="flex justify-between">
              <CardHeader className="flex-1">
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <CardTitle>Summary</CardTitle>
                    <CardDescription id="summary" className="break-all">
                      {markDown.slice(0, 300) || "No summary available"}
                    </CardDescription>
                  </div>
                  <Button size={"sm"} variant={"ghost"} onClick={copyText}>
                    <Copy />
                  </Button>
                </div>
              </CardHeader>
            </div>
            <CardFooter className="flex flex-wrap justify-end gap-2">
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => window.open("/chat", "_blank")}
              >
                <ArrowUpRight /> Chat with AI
              </Button>
              <Button size={"sm"} variant={"secondary"}>
                <Sparkles /> Re-summarize
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* <EditorMenubar
          isDarkTheme={isDarkTheme}
          isPlainBackground={isPlainBackground}
          setIsPlainBackground={setIsPlainBackground}
        /> */}

        <Editor
          lesson={lesson}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          markDown={markDown}
          setMarkDown={setMarkDown}
        />
      </div>
      <AnimatePresence initial={false}>
        {isChatOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 1024, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden 2xl:flex sticky border py-4 dark:border-dashed rounded-xl shadow-md h-[calc(100svh-92px)] top-18"
          >
            <ChatBox attachContent={markDown} title="lesson" />
          </motion.div>
        )}
      </AnimatePresence>
      <DocumentPreview
        open={openDocumentPreview}
        onOpenChange={setOpenDocumentPreview}
        document={selectedDocument}
        fetchDocuments={fetchLesson}
        responsive={false}
      />
    </div>
  );
}

export default Lesson;
