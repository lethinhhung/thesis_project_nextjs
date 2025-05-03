"use client";
import { Skeleton } from "@/components/ui/skeleton";

function CourseSkeleton() {
  return (
    <div className="flex flex-col items-center mx-auto h-full w-full max-w-7xl rounded-xl">
      <div className="w-full flex p-2 md:p-4 flex-col gap-4 border-b border-dashed">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>

        <div className="">
          <Skeleton className="h-5 w-1/2" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>

      <div className="flex w-full p-2 md:p-4">
        <Skeleton className="h-9 w-1/2" />
      </div>

      <div className="flex w-full p-2 md:p-4">
        <Skeleton className="h-50 w-full" />
      </div>
    </div>
  );
}

export default CourseSkeleton;
