"use client";

import CourseLessons from "@/components/course-lessons";
import { LessonCard } from "@/interfaces/lesson";
import { processResponse } from "@/lib/response-process";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Lessons() {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonCard[]>([]);
  const params = useParams();
  const courseId = params.courseId as string;

  const fetchLessons = async () => {
    const res = await fetch(`/api/lesson/get-all/${courseId}`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: false,
    });
    console.log("Course data:", response);

    if (response.success) {
      setLessons(response.data);
    }
  };

  useEffect(() => {
    fetchLessons().then(() => setIsLoading(false));
  }, []);

  return <CourseLessons lessons={lessons} isLoading={isLoading} />;
}

export default Lessons;
