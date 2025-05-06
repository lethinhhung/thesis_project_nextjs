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
  Copy,
  FileText,
  Loader,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ChatBox from "@/components/chat-box";
import { AnimatePresence, motion } from "framer-motion";
import { LessonContent } from "@/interfaces/lesson";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound, useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
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

function Lesson() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [markDown, setMarkDown] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [lesson, setLesson] = useState<LessonContent>();
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

  const fetchLessons = async () => {
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

  useEffect(() => {
    fetchLessons().then(() => setIsLoading(false));
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
            <div className="flex justify-between">
              <CardHeader className="flex-1">
                <CardTitle className="break-all">{lesson?.title}</CardTitle>
                <CardDescription>
                  {capitalizeFirstLetter(
                    format(new Date(lesson?.createdAt), "PPPP", {
                      locale: currentDateFnsLocale,
                    })
                  )}
                </CardDescription>
                <CardDescription>User&apos;s lesson note</CardDescription>
              </CardHeader>
              <div className="px-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>Edit</DropdownMenuItem>

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
              </div>
            </div>
            <CardContent className="border border-dashed mx-6 p-4 rounded-lg">
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                <p className="col-span-2 md:col-span-3 text-sm text-muted-foreground">
                  Reference documents
                </p>
                <Button variant={"ghost"}>
                  <FileText />
                  <p className="line-clamp-1">Document.docx</p>
                </Button>
                <Button variant={"ghost"}>
                  <FileText />
                  <p className="line-clamp-1">Document.docx</p>
                </Button>
                <Button variant={"ghost"}>
                  <FileText />
                  <p className="line-clamp-1">Document.docx</p>
                </Button>
                <Button variant={"ghost"}>
                  <FileText />
                  <p className="line-clamp-1">Document.docx</p>
                </Button>
                <Button variant={"ghost"}>
                  <FileText />
                  <p className="line-clamp-1">Document.docx</p>
                </Button>
                <Button variant={"ghost"}>
                  <FileText />
                  <p className="line-clamp-1">Document.docx</p>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card
            className={
              "dark:border-dashed justify-between break-inside-avoid-column"
            }
          >
            <div className="flex justify-between">
              <CardHeader className="flex-1">
                <CardTitle>Summary</CardTitle>
                <CardDescription id="summary" className="break-all">
                  {markDown.slice(0, 300) || "No summary available"}
                </CardDescription>
              </CardHeader>
              <div className="px-4">
                <Button size={"sm"} variant={"ghost"} onClick={copyText}>
                  <Copy />
                </Button>
              </div>
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
    </div>
  );
}

export default Lesson;
