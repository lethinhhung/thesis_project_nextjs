"use client";

import { CourseCard } from "@/components/course-card";
import { Skeleton } from "@/components/ui/skeleton";
import { processResponse } from "@/lib/response-process";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";

function CoursesOngoing() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<CourseInterface[]>();

  const fetchData = async () => {
    const res = await fetch(`/api/course/get-ongoing`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });
    console.log("Data:", response);

    if (response.success) {
      setCourses(response.data);
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full max-w-7xl h-full min-h-80" />;
  }
  return (
    <div className="col-span-12 grid grid-cols-12 gap-6 max-w-6xl w-full">
      {courses?.map((course) => (
        <CourseCard
          key={course._id}
          className="col-span-12 md:col-span-6 2xl:col-span-4"
          course={course}
        />
      ))}
    </div>
  );
}

export default CoursesOngoing;
