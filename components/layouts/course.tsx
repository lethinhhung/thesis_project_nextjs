"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartColumnIncreasing,
  Folder,
  Image as ImageIcon,
  Loader,
  MoreHorizontal,
  Search,
  // Sparkles,
  SquareLibrary,
  TableOfContents,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname, useParams } from "next/navigation";
import Image from "next/image";
import { processResponse } from "@/lib/response-process";
import { Course as CourseInterface } from "@/interfaces/course";
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

import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { CompletedMark } from "@/components/completed-mark";
import { EditCourse } from "@/components/edit-course";

function CourseLayout({
  children,
  course,
}: {
  children: React.ReactNode;
  course: CourseInterface;
}) {
  const { courseId } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const [isActionsLoading, setIsActionsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const [course, setCourse] = useState<CourseInterface>();
  const router = useRouter();
  // const tabTop = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  const pathname = usePathname();
  const currentTab = pathname.includes("/lessons")
    ? "lessons"
    : pathname.includes("/documents")
    ? "documents"
    : pathname.includes("/tests")
    ? "tests"
    : pathname.includes("/ask-ai")
    ? "ask"
    : "dashboard";

  const [tab, setTab] = useState(currentTab);

  const deleteCourse = async () => {
    setIsActionsLoading(true);
    const res = await fetch(`/api/course/delete/${courseId}`, {
      method: "DELETE",
    });
    const response = await processResponse(res, {
      success: true,
      error: true,
    });

    if (response.success) {
      setOpenDelete(false);
      router.push("/courses");
    }
    setIsActionsLoading(false);
  };

  const updateCourseStatus = async () => {
    setIsActionsLoading(true);
    const res = await fetch(`/api/course/update-status/${courseId}`, {
      method: "PATCH",
    });
    await processResponse(res, {
      success: true,
      error: true,
    });
    // fetchCourse();
    setIsActionsLoading(false);
  };

  // useEffect(() => {
  //   fetchCourse().then(() => setIsLoading(false));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const currentTab = pathname.includes("/lessons")
      ? "lessons"
      : pathname.includes("/documents")
      ? "documents"
      : pathname.includes("/tests")
      ? "tests"
      : pathname.includes("/ask-ai")
      ? "ask"
      : "dashboard";

    setTab(currentTab);
  }, [pathname]);

  return (
    <div className="flex flex-col items-center mx-auto h-full w-full max-w-7xl rounded-xl">
      <div className="w-full flex p-2 md:p-4 flex-col gap-4 border-b border-dashed break-all">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent
            className={
              "text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            }
          >
            <div className="flex mb-4">
              <Image
                width={1000}
                height={1000}
                src={
                  course?.customization?.cover !== "" &&
                  course?.customization?.cover
                    ? course?.customization?.cover
                    : "/placeholder.svg"
                }
                alt="Image"
                className="inset-0 h-full max-h-120 w-full object-cover dark:brightness-[0.7]"
              />
            </div>
          </CollapsibleContent>
          <div className="flex justify-between items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              <span className="break-words inline">
                {`${course?.title} ${
                  isExpanded ? course?.customization?.emoji : ""
                }`}
                {isActionsLoading ? (
                  <Loader className="inline ml-1 animate-spin align-middle" />
                ) : (
                  course?.status && (
                    <CompletedMark className="inline ml-1 align-middle" />
                  )
                )}
              </span>
              <p className="text-sm text-muted-foreground">
                {course?.createdAt
                  ? format(new Date(course.createdAt), "PPPP", {
                      locale: currentDateFnsLocale,
                    })
                  : "No date"}
              </p>
            </h3>

            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <CollapsibleTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <ImageIcon />
                </Button>
              </CollapsibleTrigger>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setOpenEdit(!openEdit)}>
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={updateCourseStatus}>
                    {course?.status
                      ? "Unmark as completed"
                      : "Mark as completed"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpenDetails(true)}>
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setOpenDelete(!openDelete)}
                    variant="destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {course && (
                <EditCourse
                  openEdit={openEdit}
                  setOpenEdit={setOpenEdit}
                  course={course}
                  fetchCourse={() => {}}
                />
              )}

              <Dialog open={openDetails} onOpenChange={setOpenDetails}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="break-all">
                      {course?.title}
                    </DialogTitle>
                    <DialogDescription>Course details</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Description</h4>
                      <p className="text-sm text-muted-foreground break-all">
                        {course?.description}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">
                        Total lessons
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {course?.lessons.length} lesson(s)
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Created At</h4>
                      <p className="text-sm text-muted-foreground">
                        {course?.createdAt
                          ? format(new Date(course.createdAt), "PPPP", {
                              locale: currentDateFnsLocale,
                            })
                          : "No date"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Last updated</h4>
                      <p className="text-sm text-muted-foreground">
                        {course?.updatedAt
                          ? format(new Date(course.updatedAt), "PPPP", {
                              locale: currentDateFnsLocale,
                            })
                          : "No date"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Status</h4>
                      <p className="text-sm text-muted-foreground">
                        {course?.status ? "Completed" : "In Progress"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Tags</h4>
                      <p className="text-sm text-muted-foreground break-all">
                        {course?.tags && course?.tags.length > 0
                          ? course?.tags.map((tag) => tag.title).join(", ")
                          : "No tag(s)"}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete this course?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently remove
                      this course and all of its data from our servers.
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
                      onClick={deleteCourse}
                      className="min-w-20"
                      disabled={isActionsLoading}
                    >
                      {isActionsLoading ? (
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
        </Collapsible>
        <div className="flex flex-wrap gap-2">
          {course?.tags && course?.tags.length > 0 ? (
            course?.tags.map((tag) => (
              <Badge
                key={tag._id}
                variant="outline"
                className="break-all line-clamp-1 max-w-60"
              >
                {tag.title}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">No tag(s)</Badge>
          )}
        </div>
        {course?.description}
      </div>

      <Tabs
        value={tab}
        onValueChange={setTab}
        // ref={tabTop}
        defaultValue="dashboard"
        className="w-full py-4"
      >
        <Collapsible className="flex flex-wrap gap-1 sm:gap-2 items-center mx-2 md:mx-4 sticky top-16 z-10 transition-all duration-300 pr-26">
          <TabsList>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}`);
                // scrollToTabTop();
              }}
              value="dashboard"
            >
              <ChartColumnIncreasing />
              <div className="hidden lg:flex">Dashboard</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/lessons`);
                // scrollToTabTop();
              }}
              value="lessons"
            >
              <TableOfContents />
              <div className="hidden lg:flex">Lessons</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/documents`);
                // scrollToTabTop();
              }}
              value="documents"
            >
              <SquareLibrary />
              <div className="hidden lg:flex">Documents</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/tests`);
                // scrollToTabTop();
              }}
              value="tests"
            >
              <Folder />
              <div className="hidden lg:flex">Tests & Projects</div>
            </TabsTrigger>
            {/* <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/ask-ai`);
                // scrollToTabTop();
              }}
              value="ask"
            >
              <Sparkles />
              <div className="hidden lg:flex">Ask AI</div>
            </TabsTrigger> */}
          </TabsList>

          <CollapsibleTrigger asChild>
            <Button size={"icon"} variant={"secondary"} className="rounded-lg">
              <Search />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="">
            <Input
              placeholder={"Search"}
              autoFocus
              className="border-dashed bg-secondary"
            />
          </CollapsibleContent>
        </Collapsible>

        {children}
      </Tabs>
    </div>
  );
}

export default CourseLayout;
