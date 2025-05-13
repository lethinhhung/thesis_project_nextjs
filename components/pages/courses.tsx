"use client";

import { CourseCard } from "@/components/course-card";
import { LessonCardRecent } from "@/components/lesson-card-recent";
import { Button } from "@/components/ui/button";
import { LessonCard as LessonCardInterface } from "@/interfaces/lesson";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { LessonCardRecentSkeleton } from "@/components/skeleton/lesson-card-recent-skeleton";
import { CourseCardSkeleton } from "@/components/skeleton/course-card-skeleton";

function AllCourses() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<{
    lessons: LessonCardInterface[];
    courses: CourseInterface[];
  }>();

  // Ví dụ cách gọi API từ client

  const fetchData = async () => {
    const res = await fetch(`/api/data/get-limit-courses-and-lessons`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      setResult(response.data);
    } else {
      setResult({
        lessons: [],
        courses: [],
      });
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-12 space-y-8 w-full h-full max-w-7xl p-2">
      <div className="col-span-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Recent lessons
          </h4>
        </div>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index: number) => (
              <LessonCardRecentSkeleton
                key={index}
                className="col-span-12 md:col-span-6 2xl:col-span-4"
              />
            ))
          : result?.lessons
              ?.sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )

              .map((lesson) => (
                <LessonCardRecent
                  key={lesson._id}
                  lesson={lesson}
                  className="col-span-12 md:col-span-6 2xl:col-span-4"
                />
              ))}
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Ongoing courses
          </h4>

          {result?.courses &&
            result?.courses?.filter((course) => course.status === false)
              .length > 0 && (
              <Button
                variant={"ghost"}
                onClick={() => router.push("/courses/ongoing")}
              >
                View all
                <ArrowRight />
              </Button>
            )}
        </div>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index: number) => (
            <CourseCardSkeleton
              key={index}
              className="col-span-12 md:col-span-6 2xl:col-span-4"
            />
          ))
        ) : result?.courses &&
          result?.courses?.filter((course) => course.status === false).length >
            0 ? (
          result?.courses
            .filter((course) => course.status === false)
            .map((course) => (
              <CourseCard
                key={course._id.toString()}
                className="col-span-12 md:col-span-6 2xl:col-span-4"
                course={course}
              />
            ))
        ) : (
          <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
            <small className="text-sm font-medium leading-none">
              No courses ongoing yet
            </small>
          </div>
        )}
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Completed courses
          </h4>
          {result?.courses &&
            result?.courses?.filter((course) => course.status === true).length >
              0 && (
              <Button
                variant={"ghost"}
                onClick={() => router.push("/courses/completed")}
              >
                View all
                <ArrowRight />
              </Button>
            )}
        </div>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index: number) => (
            <CourseCardSkeleton
              key={index}
              className="col-span-12 md:col-span-6 2xl:col-span-4"
            />
          ))
        ) : result?.courses &&
          result?.courses?.filter((course) => course.status === true).length >
            0 ? (
          result?.courses
            .filter((course) => course.status === true)
            .map((course) => (
              <CourseCard
                key={course._id}
                className="col-span-12 md:col-span-6 2xl:col-span-4"
                course={course}
              />
            ))
        ) : (
          <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
            <small className="text-sm font-medium leading-none">
              No courses completed yet
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllCourses;
