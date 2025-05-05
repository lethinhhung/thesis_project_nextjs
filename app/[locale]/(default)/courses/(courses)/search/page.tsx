"use client";

import { CourseCard } from "@/components/course-card";
import { processResponse } from "@/lib/response-process";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { CourseCardSkeleton } from "@/components/skeleton/course-card-skeleton";
import { useSearch } from "@/components/search-provider";
import { useRouter, useSearchParams } from "next/navigation";

function CoursesSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<CourseInterface[]>();
  const { query } = useSearch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchCourses = async () => {
    const params = new URLSearchParams();

    // Thêm các tham số tìm kiếm nếu có
    if (query) params.append("query", query);
    if (searchParams.get("tags"))
      params.append("tags", searchParams.get("tags")!);
    if (searchParams.get("status"))
      params.append("status", searchParams.get("status")!);

    // Cập nhật URL với các tham số mới
    router.push(`/courses/search?${params.toString()}`);

    const res = await fetch(
      // `/api/course/search?query=react&tags=frontend,web&status=false`,
      `/api/course/search?query=${query}`,
      {
        method: "GET",
      }
    );
    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    console.log("response", response.data);

    if (response.success) {
      setResults(response.data);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (!query) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    const timeout = setTimeout(() => {
      searchCourses().then(() => setIsLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="col-span-12 grid grid-cols-12 gap-6 max-w-6xl w-full">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index: number) => (
          <CourseCardSkeleton
            key={index}
            className="col-span-12 md:col-span-6 2xl:col-span-4"
          />
        ))
      ) : results?.length === 0 && query ? (
        <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
          <small className="text-sm font-medium leading-none">
            No results found for <strong>{query}</strong>
          </small>
        </div>
      ) : results?.length === 0 && !query ? (
        <div className="col-span-full min-h-50 flex justify-center items-center flex-col gap-2">
          <small className="text-sm font-medium leading-none">
            No results found. Please enter a search term.
          </small>
        </div>
      ) : (
        results?.map((result) => (
          <CourseCard
            key={result._id.toString()}
            className="col-span-12 md:col-span-6 2xl:col-span-4"
            course={result}
          />
        ))
      )}
    </div>
  );
}

export default CoursesSearch;
