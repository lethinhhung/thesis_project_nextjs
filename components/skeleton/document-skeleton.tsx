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

export function DocumentCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-1/2 h-5" />
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          <Skeleton className="w-full h-16" />
        </CardDescription>
        <CardDescription>
          <Skeleton className="w-1/3 h-5" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-5" />
      </CardContent>
    </Card>
  );
}
