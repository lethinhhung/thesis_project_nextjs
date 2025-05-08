"use client";

import { CreateNewSmall } from "@/components/create-new-small";
import { LessonCard } from "@/components/lesson-card";
import { LessonCardRecentSkeleton } from "@/components/skeleton/lesson-card-recent-skeleton";
import SortButton from "@/components/sort-button";
import { LessonCard as LessonCardInterface } from "@/interfaces/lesson";
import { processResponse } from "@/lib/response-process";
import { scrollToTabTop } from "@/lib/scrollToTabTop";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function Lessons() {
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonCardInterface[]>([]);
  const params = useParams();
  const courseId = params.courseId as string;
  const tabTop = useRef<HTMLDivElement>(null);

  const fetchLessons = async () => {
    setIsLoading(true);
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
    } else {
      setLessons([]);
    }
  };

  useEffect(() => {
    fetchLessons()
      .then(() => setIsLoading(false))
      .then(() => scrollToTabTop(tabTop, 116));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4" ref={tabTop}>
      <div className="w-full flex justify-between items-center sticky top-16">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Lessons ({lessons.length})
        </h4>
        <div className="flex gap-2 items-center">
          <SortButton variant={"secondary"} />

          <CreateNewSmall type="lesson" />
        </div>
      </div>
      <div className="w-full flex grid grid-cols-1 sm:px-2 md:grid-cols-2 2xl:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index: number) => (
            <LessonCardRecentSkeleton key={index} className="col-span-1" />
          ))
        ) : lessons.length == 0 ? (
          <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
            <small className="text-sm font-medium leading-none">
              No lessons found
            </small>
          </div>
        ) : (
          lessons.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              className="col-span-1"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Lessons;
