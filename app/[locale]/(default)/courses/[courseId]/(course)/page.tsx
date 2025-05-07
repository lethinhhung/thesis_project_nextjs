"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "@/components/ui/skeleton";
import { scrollToTabTop } from "@/lib/scrollToTabTop";

function CourseDashboard() {
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<CourseInterface>();
  const tabTop = useRef<HTMLDivElement>(null);

  const fetchCourse = async () => {
    const res = await fetch(`/api/course/${courseId}`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });
    console.log("Course data:", response);

    if (response.success) {
      setCourse(response.data);
    }
  };

  useEffect(() => {
    fetchCourse()
      .then(() => setIsLoading(false))
      .then(() => scrollToTabTop(tabTop, 116));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full h-full min-h-80" />;
  }

  if (!course) {
    notFound(); // Trả về trang 404
  }

  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4" ref={tabTop}>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Dashboard
          </h4>
          <p className="text-sm text-muted-foreground">
            Track your learning progress! View course statistics, quizzes,
            projects, and your grades. Stay updated with upcoming lessons and
            assess your overall performance.
          </p>
        </div>
      </div>
      <div className="w-full sm:p-4 flex grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="w-full flex justify-center col-span-1">
          <Card className="w-full">
            <div className="flex flex-wrap justify-between items-center">
              <CardHeader className="pr-0">
                <CardTitle>Lessons</CardTitle>
                <CardDescription>Description</CardDescription>
              </CardHeader>
              <div className="hidden sm:flex pr-6">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
            <CardContent className="flex items-center justify-between">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                {course?.lessons.length}
              </h2>
              <div className="flex sm:hidden">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center col-span-1">
          <Card className="w-full">
            <div className="flex flex-wrap justify-between items-center">
              <CardHeader className="pr-0">
                <CardTitle>Documents</CardTitle>
                <CardDescription>Description</CardDescription>
              </CardHeader>
              <div className="hidden sm:flex pr-6">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
            <CardContent className="flex items-center justify-between">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                {course?.refDocuments.length}
              </h2>
              <div className="flex sm:hidden">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center col-span-1">
          <Card className="w-full">
            <div className="flex flex-wrap justify-between items-center">
              <CardHeader className="pr-0">
                <CardTitle>Tests</CardTitle>
                <CardDescription>Description</CardDescription>
              </CardHeader>
              <div className="hidden sm:flex pr-6">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
            <CardContent className="flex items-center justify-between">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                3
              </h2>
              <div className="flex sm:hidden">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center col-span-1">
          <Card className="w-full">
            <div className="flex flex-wrap justify-between items-center">
              <CardHeader className="pr-0">
                <CardTitle>Projects</CardTitle>
                <CardDescription>Description</CardDescription>
              </CardHeader>
              <div className="hidden sm:flex pr-6">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowUpRight />
                </Button>
              </div>
            </div>
            <CardContent className="flex items-center justify-between">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                2
              </h2>
              <div className="flex sm:hidden">
                <Button size={"icon"} variant={"ghost"}>
                  <ArrowRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-center col-span-2 lg:col-span-3 xl:col-span-4">
          <Card className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex">
                <CardHeader>
                  <CardTitle>AI tests</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
              </div>
              <div className="px-6">
                <Button size={"sm"} variant={"ghost"}>
                  Start learning <ArrowRight />
                </Button>
              </div>
            </div>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test #1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>dwawadwa</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Test #1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>dwawadwa</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Test #1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>dwawadwa</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Test #1</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>dwawadwa</CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default CourseDashboard;
