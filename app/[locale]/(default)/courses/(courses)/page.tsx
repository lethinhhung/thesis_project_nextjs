"use client";

import { CourseCard } from "@/components/course-card";
import { LessonCardLarge } from "@/components/lesson-card-large";
import { Button } from "@/components/ui/button";
import { LessonCard as LessonCardInterface } from "@/interfaces/lesson";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "@/components/ui/skeleton";

function CoursesAll() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonCardInterface[]>();
  const [courses, setCourses] = useState<CourseInterface[]>();

  const fetchData = async () => {
    const res = await fetch(`/api/data/get-all-courses-and-lessons`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });
    console.log("Data:", response);

    if (response.success) {
      setLessons(response.data.lessons);
      setCourses(response.data.courses);
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full max-w-7xl h-full min-h-80" />;
  }
  return (
    <div className="grid grid-cols-12 space-y-8 w-full h-full max-w-6xl p-2">
      <div className="col-span-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Recent lessons
          </h4>
        </div>
        {lessons
          ?.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .slice(0, 3)
          .map((lesson) => (
            <LessonCardLarge
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

          {courses &&
            courses?.filter((course) => course.status === false).length > 0 && (
              <Button
                variant={"ghost"}
                onClick={() => router.push("/courses/ongoing")}
              >
                <div className="flex items-center gap-1">
                  View all
                  <p className="text-sm text-muted-foreground">
                    {`(${
                      courses?.filter((course) => course.status === false)
                        .length
                    })`}
                  </p>
                </div>
                <ArrowRight />
              </Button>
            )}
        </div>
        {courses &&
        courses?.filter((course) => course.status === false).length > 0 ? (
          courses
            .filter((course) => course.status === false)
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
          {courses &&
            courses?.filter((course) => course.status === true).length > 0 && (
              <Button
                variant={"ghost"}
                onClick={() => router.push("/courses/completed")}
              >
                <div className="flex items-center gap-1">
                  View all
                  <p className="text-sm text-muted-foreground">
                    {`(${
                      courses?.filter((course) => course.status === true).length
                    })`}
                  </p>
                </div>
                <ArrowRight />
              </Button>
            )}
        </div>
        {courses &&
        courses?.filter((course) => course.status === true).length > 0 ? (
          courses
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

export default CoursesAll;
