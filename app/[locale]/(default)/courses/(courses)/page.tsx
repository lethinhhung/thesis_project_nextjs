"use client";

import { CourseCard } from "@/components/course-card";
import { LessonCardLarge } from "@/components/lesson-card-large";
import { Button } from "@/components/ui/button";
import { Lesson } from "@/interfaces/lesson";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "@/components/ui/skeleton";

const lessons: Lesson[] = [
  {
    id: "lesson-001",
    title: "Introduction to JavaScript",
    description:
      "Learn the basics of JavaScript, including syntax, variables, and data types.",
    date: "2025-03-10",
  },
  {
    id: "lesson-002",
    title: "React Components and Props",
    description:
      "Understand how to build reusable components and pass data using props in React.",
    date: "2025-03-12",
  },
  {
    id: "lesson-003",
    title: "Data Structures: Arrays and Linked Lists",
    description:
      "Explore the fundamentals of arrays and linked lists, their operations, and use cases.",
    date: "2025-03-15",
  },
];

function CoursesAll() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<CourseInterface[]>();

  const fetchCourse = async () => {
    const res = await fetch(`/api/course/get-all`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });
    console.log("Course data:", response);

    if (response.success) {
      setCourses(response.data);
    }
  };

  useEffect(() => {
    fetchCourse().then(() => setIsLoading(false));
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
        {lessons.map((lesson) => (
          <LessonCardLarge
            key={lesson.id}
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

          <Button
            variant={"ghost"}
            onClick={() => router.push("/courses/ongoing")}
          >
            <div className="flex items-center gap-1">
              View all<p className="text-sm text-muted-foreground">(10)</p>
            </div>
            <ArrowRight />
          </Button>
        </div>
        {courses?.map((course) => (
          <CourseCard
            key={course._id}
            className="col-span-12 md:col-span-6 2xl:col-span-4"
            course={course}
          />
        ))}
      </div>

      <div className="col-span-12 grid grid-cols-12 gap-6">
        <div className="col-span-12 flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Completed courses
          </h4>
          <Button
            variant={"ghost"}
            onClick={() => router.push("/courses/completed")}
          >
            <div className="flex items-center gap-1">
              View all<p className="text-sm text-muted-foreground">(5)</p>
            </div>
            <ArrowRight />
          </Button>
        </div>
        {courses?.map((course) => (
          <CourseCard
            key={course._id}
            className="col-span-12 md:col-span-6 2xl:col-span-4"
            course={course}
          />
        ))}
      </div>
    </div>
  );
}

export default CoursesAll;
