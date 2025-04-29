"use client";

import CourseLessons from "@/components/course-lessons";
import { Skeleton } from "@/components/ui/skeleton";
import { Lesson } from "@/interfaces/lesson";
import { processResponse } from "@/lib/response-process";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Lessons() {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const params = useParams();
  const courseId = params.courseId as string;

  const fetchLessons = async () => {
    const res = await fetch(`/api/lesson/get-all/${courseId}`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });
    console.log("Course data:", response);

    if (response.success) {
      setLessons(response.data);
    }
  };

  useEffect(() => {
    fetchLessons().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full max-w-7xl h-full min-h-80" />;
  }
  return <CourseLessons lessons={lessons} />;
}

export default Lessons;
