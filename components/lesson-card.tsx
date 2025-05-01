"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LessonCard as LessonCardInterface } from "@/interfaces/lesson";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { capitalizeFirstLetter } from "@/lib/capitalize-first-letter";
import { useLocale } from "next-intl";

export function LessonCard({
  lesson,
  className,
}: {
  lesson: LessonCardInterface;
  className?: string;
}) {
  const router = useRouter();
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;
  return (
    <Card
      key={lesson.title}
      className={cn(
        "duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer ",
        className
      )}
      onClick={() =>
        router.push(`/courses/${lesson.courseId._id}/lessons/${lesson._id}`)
      }
    >
      <CardHeader>
        <CardTitle className="line-clamp-2">{lesson.title}</CardTitle>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          {/* {lesson.courseId?.title} */}
          AI summary
        </CardDescription>
        <CardDescription className="line-clamp-1">
          {/* {lesson?.updatedAt?.toString()} */}
          {capitalizeFirstLetter(
            format(new Date(lesson?.createdAt), "P", {
              locale: currentDateFnsLocale,
            })
          )}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
