"use client";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function LessonCardRecentSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer ",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-40" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-20 w-full" />
        </CardDescription>
        <CardDescription>
          <Skeleton className="h-5 w-20" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
