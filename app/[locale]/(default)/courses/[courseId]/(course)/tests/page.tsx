"use client";

import { Edit, Loader, Settings, Trash } from "lucide-react";
// import SortButton from "@/components/sort-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

function Tests() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [test, setTest] = useState<TestInterface>();
  const [isActionsLoading, setIsActionsLoading] = useState(false);
  const [tests, setTests] = useState<TestInterface[]>([]);
  const params = useParams();
  const courseId = params.courseId as string;
  const tabTop = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  const fecthTests = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/test/get-all/${courseId}`, {
        method: "GET",
      });
      const response = await processResponse(res, {
        success: false,
        error: false,
      });

      if (response.success) {
        setTests(response.data);
      } else {
        setTests([]);
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
        fecthTests();
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    } finally {
      setOpenDelete(false);
      setIsActionsLoading(false);
    }
  };

  useEffect(() => {
    fecthTests().then(() => scrollToTabTop(tabTop, 116));

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
        <div className="flex gap-2 items-center">
          {/* <SortButton variant={"secondary"} /> */}

          <CreateNewTestProject courseId={courseId} refetchData={fecthTests} />
        </div>
      </div>
      <div className="w-full flex grid grid-cols-1 sm:px-2 lg:grid-cols-2 gap-4">
        <Card>
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
          <CardContent>
            <CourseTestsChart data={tests} />
          </CardContent>
          <CardContent className="space-y-4">
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete this test?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently remove
                    this test and all of its data from our servers.
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
            {tests.map((test, index) => (
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
                              setOpenDelete(true);
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
                  {" "}
                  <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Description</h4>
                      <p className="text-sm text-muted-foreground break-all">
                        {test?.description}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Created At</h4>
                      <p className="text-sm text-muted-foreground">
                        {test?.createdAt
                          ? format(new Date(test.createdAt), "PPPP", {
                              locale: currentDateFnsLocale,
                            })
                          : "No date"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium leading-none">Last updated</h4>
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
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button
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
          <CardContent className="space-y-4"></CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Tests;
