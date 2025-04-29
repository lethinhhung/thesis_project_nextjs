"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lesson } from "@/interfaces/lesson";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function LessonCardLarge({
  lesson,
  className,
}: {
  lesson: Lesson;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Card
      key={lesson.title}
      className={cn(
        "duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer ",
        className
      )}
      onClick={() =>
        router.push(`/courses/${lesson.courseId}/lessons/${lesson._id}`)
      }
    >
      <CardHeader>
        <CardTitle className="line-clamp-2">{lesson.title}</CardTitle>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          {/* {lesson.description} */}
        </CardDescription>
        <CardDescription className="line-clamp-1">
          {lesson?.updatedAt?.toString()}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
