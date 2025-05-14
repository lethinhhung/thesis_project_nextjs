"use client";

import { Settings } from "lucide-react";
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

function Tests() {
  const [isLoading, setIsLoading] = useState(true);
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

  const fetchLessons = async () => {
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
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLessons().then(() => scrollToTabTop(tabTop, 116));

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

          <CreateNewTestProject
            courseId={courseId}
            refetchData={fetchLessons}
          />
        </div>
      </div>
      <div className="w-full flex grid grid-cols-1 sm:px-2 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Tests</CardTitle>
              <Button size={"sm"} variant={"ghost"}>
                <Settings />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CourseTestsChart data={tests} />
          </CardContent>
          <CardContent className="space-y-4">
            {tests.map((test, index) => (
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
                  <div className="px-2">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                      {test.score}
                    </h2>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button size={"sm"} variant={"ghost"}>
                <Settings />
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
