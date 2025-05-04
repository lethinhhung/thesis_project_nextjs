"use client";

import { LessonCard as LessonCardInterface } from "@/interfaces/lesson";
import SortButton from "./sort-button";
import { CreateNewSmall } from "./create-new-small";
import { LessonCard } from "./lesson-card";
import { LessonCardRecentSkeleton } from "./skeleton/lesson-card-recent-skeleton";

function CourseLessons({
  lessons,
  isLoading,
}: {
  lessons: LessonCardInterface[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4">
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
export default CourseLessons;
