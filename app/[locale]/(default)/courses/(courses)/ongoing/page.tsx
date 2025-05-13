"use client";

import { CourseCard } from "@/components/course-card";
import { processResponse } from "@/lib/response-process";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { CourseCardSkeleton } from "@/components/skeleton/course-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function CoursesOngoing() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<CourseInterface[]>();
  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch(`/api/course/get-ongoing`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      setCourses(response.data);
    } else {
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <div className="col-span-12 grid grid-cols-12 gap-6 max-w-6xl w-full">
      <div className="col-span-full flex items-center gap-2">
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={() => router.push("/courses")}
        >
          <ArrowLeft />
        </Button>
        {isLoading ? (
          <Skeleton className="w-30 h-5" />
        ) : (
          <p className="text-sm text-muted-foreground">{`Found ${courses?.length} course(s)`}</p>
        )}
      </div>
      <>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index: number) => (
              <CourseCardSkeleton
                key={index}
                className="col-span-12 md:col-span-6 2xl:col-span-4"
              />
            ))
          : courses?.map((course) => (
              <CourseCard
                key={course._id}
                className="col-span-12 md:col-span-6 2xl:col-span-4"
                course={course}
              />
            ))}
      </>
    </div>
  );
}

export default CoursesOngoing;
