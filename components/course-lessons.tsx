"use client";

import { LessonCard } from "@/interfaces/lesson";
import { LessonCardLarge } from "./lesson-card-large";
import SortButton from "./sort-button";
import { CreateNewSmall } from "./create-new-small";

function CourseLessons({ lessons }: { lessons: LessonCard[] }) {
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
        {lessons.map((lesson) => (
          <LessonCardLarge
            key={lesson._id}
            lesson={lesson}
            className="col-span-1"
          />
        ))}
      </div>
    </div>
  );
}
export default CourseLessons;
