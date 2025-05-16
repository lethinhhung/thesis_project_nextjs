"use client";

import { Edit, Loader, Settings, Trash } from "lucide-react";
// import SortButton from "@/components/sort-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CourseTestsChart from "@/components/course-tests-chart";
import { CreateNewTestProject } from "@/components/create-new-test-project";
import { useParams } from "next/navigation";
import { Test as TestInterface } from "@/interfaces/test";
import { useEffect, useRef, useState } from "react";
import { scrollToTabTop } from "@/lib/scrollToTabTop";
import { processResponse } from "@/lib/response-process";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { useLocale } from "next-intl";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Project as ProjectInterface } from "@/interfaces/project";
import { CompletedMark } from "@/components/completed-mark";
import { CourseProjectsChart } from "@/components/course-projects-chart";

function Tests() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteTest, setOpenDeleteTest] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);
  const [test, setTest] = useState<TestInterface>();
  const [project, setProject] = useState<ProjectInterface>();
  const [isActionsLoading, setIsActionsLoading] = useState(false);
  const [data, setData] = useState<{
    tests: TestInterface[];
    projects: ProjectInterface[];
  }>({
    tests: [],
    projects: [],
  });
  const params = useParams();
  const courseId = params.courseId as string;
  const tabTop = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  const fecthData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/course/get-tests-and-projects/${courseId}`,
        {
          method: "GET",
        }
      );
      const response = await processResponse(res, {
        success: false,
        error: false,
      });

      if (response.success) {
        setData(response.data);
      } else {
        setData({
          tests: [],
          projects: [],
        });
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTest = async (testId: string) => {
    try {
      setIsActionsLoading(true);
      const res = await fetch(`/api/test/delete/${testId}`, {
        method: "DELETE",
      });
      const response = await processResponse(res);

      if (response.success) {
        fecthData();
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    } finally {
      setOpenDeleteTest(false);
      setIsActionsLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      setIsActionsLoading(true);
      const res = await fetch(`/api/project/delete/${projectId}`, {
        method: "DELETE",
      });
      const response = await processResponse(res);

      if (response.success) {
        fecthData();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setOpenDeleteProject(false);
      setIsActionsLoading(false);
    }
  };

  useEffect(() => {
    fecthData().then(() => scrollToTabTop(tabTop, 116));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex p-2 md:p-4 flex-col gap-4">
        <div className="w-full flex justify-between items-center sticky top-16">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Tests & Projects
          </h4>
        </div>
        <div className="w-full flex grid grid-cols-1 sm:px-2 lg:grid-cols-2 gap-4">
          <Skeleton className="w-full h-[300px]" />
          <Skeleton className="w-full h-[300px]" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4" ref={tabTop}>
      <div className="w-full flex justify-between items-center sticky top-16">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tests & Projects
        </h4>
        <div className="flex gap-2 items-center z-10">
          {/* <SortButton variant={"secondary"} /> */}

          <CreateNewTestProject courseId={courseId} refetchData={fecthData} />
        </div>
      </div>
      {/* <div className="w-full flex grid grid-cols-1 sm:px-2 lg:grid-cols-2 gap-4"> */}
      <div className="w-full columns-lg gap-4 space-y-4">
        <Card className="break-inside-avoid-column">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Tests</CardTitle>
              <Button
                className={`${isEditing && "bg-secondary"}`}
                size={"sm"}
                variant={"ghost"}
                onClick={() => setIsEditing(!isEditing)}
              >
                <Settings
                  className={`transition-all duration-300 ${
                    isEditing && "rotate-180"
                  }`}
                />
              </Button>
            </div>
          </CardHeader>
          {data.tests.length == 0 ? (
            <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
              <small className="text-sm font-medium leading-none">
                No tests found
              </small>
            </div>
          ) : (
            <>
              <CardContent>
                <CourseTestsChart data={data.tests} />
              </CardContent>
              <CardContent className="space-y-4">
                <Dialog open={openDeleteTest} onOpenChange={setOpenDeleteTest}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete this test?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        remove this test and all of its data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => setOpenDeleteTest(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant={"destructive"}
                        onClick={() => deleteTest(test?._id || "")}
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
                {data.tests.map((test, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <Card key={index} className="p-4">
                        <div className="flex flex-row items-center justify-between">
                          <CardHeader className="px-2">
                            <CardTitle>{test.title}</CardTitle>
                            <CardDescription>
                              {format(new Date(test?.date), "P", {
                                locale: currentDateFnsLocale,
                              })}
                            </CardDescription>
                          </CardHeader>

                          {isEditing ? (
                            <div className="px-2 flex gap-1 items-center">
                              <Button variant={"ghost"} size={"sm"}>
                                <Edit />
                              </Button>

                              <Button
                                variant={"ghost"}
                                size={"sm"}
                                onClick={() => {
                                  setTest(test);
                                  setOpenDeleteTest(true);
                                }}
                              >
                                <Trash />
                              </Button>
                            </div>
                          ) : (
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 px-2">
                              {test.score}
                            </h2>
                          )}
                        </div>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="flex flex-col gap-4">
                        <div className="space-y-1">
                          <h4 className="font-medium leading-none">
                            Description
                          </h4>
                          <p className="text-sm text-muted-foreground break-all">
                            {test?.description}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium leading-none">
                            Created At
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {test?.createdAt
                              ? format(new Date(test.createdAt), "PPPP", {
                                  locale: currentDateFnsLocale,
                                })
                              : "No date"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-medium leading-none">
                            Last updated
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {test?.updatedAt
                              ? format(new Date(test.updatedAt), "PPPP", {
                                  locale: currentDateFnsLocale,
                                })
                              : "No date"}
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </CardContent>
            </>
          )}
        </Card>
        <Card className="break-inside-avoid-column">
          <CardHeader className="py-2">
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          {data.projects.length === 0 ? (
            <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
              <small className="text-sm font-medium leading-none">
                No projects found
              </small>
            </div>
          ) : (
            <>
              <CardContent>
                <CourseProjectsChart projects={data.projects} />
              </CardContent>
              <CardContent className="space-y-4">
                <Dialog
                  open={openDeleteProject}
                  onOpenChange={setOpenDeleteProject}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete this project?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        remove this project and all of its data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => setOpenDeleteProject(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant={"destructive"}
                        onClick={() => deleteProject(project?._id || "")}
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
                {data.projects.map((project, index) => (
                  <Card key={index} className="p-4">
                    <CardHeader className="px-2 flex flex-row items-center justify-between">
                      <div className="flex flex-col gap-1 flex-1">
                        <CardTitle className="break-all">
                          {project.title}
                        </CardTitle>
                        <CardDescription>
                          {`Created at ${format(
                            new Date(project?.createdAt),
                            "P",
                            {
                              locale: currentDateFnsLocale,
                            }
                          )}`}
                        </CardDescription>
                      </div>
                      {project.status && <CompletedMark size={18} />}
                    </CardHeader>
                    <CardContent>
                      <p className="break-all">{project.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-1 items-center px-0">
                      <Button variant={"ghost"} size={"sm"}>
                        <Edit />
                      </Button>

                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => {
                          setProject(project);
                          setOpenDeleteProject(true);
                        }}
                      >
                        <Trash />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Tests;
