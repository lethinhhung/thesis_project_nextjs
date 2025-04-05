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

interface Course {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  type: string;
  status: boolean;
  date: string;
}

export function CourseCard({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/courses/course1`)}
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
        <CardTitle className="line-clamp-1 flex items-center gap-2">
          {course.emoji} {course.title}
          {course.status && <CheckCircle2 size={18} />}
        </CardTitle>
        <CardDescription>{course.date}</CardDescription>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          {course.summary}
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
