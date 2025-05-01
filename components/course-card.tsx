"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Course as CourseInterface } from "@/interfaces/course";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";

export function CourseCard({
  course,
  className,
}: {
  course: CourseInterface;
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
      onClick={() => router.push(`/courses/${course._id}`)}
      className={cn(
        "pt-0 duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer ",
        className
      )}
    >
      <Image
        width={1000}
        height={1000}
        src="/placeholder.svg"
        alt="Course Image"
        className="object-cover h-50 w-full rounded-xl rounded-b-none dark:brightness-[0.2] dark:grayscale"
      />
      <CardHeader>
        <CardTitle className="line-clamp-1 flex items-center gap-2 leading-[1.3]">
          {/* {course.emoji}  */}
          {course.title}
          {course.status && <CheckCircle2 size={18} />}
        </CardTitle>
        <CardDescription>
          {format(new Date(course?.createdAt), "P", {
            locale: currentDateFnsLocale,
          })}
        </CardDescription>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-nowrap gap-2 overflow-hidden">
          {course.tags.map((tag, index) => (
            <Badge variant={"outline"} key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2 min-h-[1.5rem]">
        <Progress value={course.status ? 100 : 33}></Progress>
      </CardFooter>
    </Card>
  );
}
