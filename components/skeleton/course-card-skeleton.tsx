"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function CourseCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "pt-0 duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer ",
        className
      )}
    >
      <Skeleton className="h-50 w-full rounded-xl rounded-b-none" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skeleton className="h-5 w-1/2" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-20" />
        </CardDescription>
        <CardDescription>
          <Skeleton className="h-20 w-full" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-5 w-full" />
      </CardContent>
    </Card>
  );
}
