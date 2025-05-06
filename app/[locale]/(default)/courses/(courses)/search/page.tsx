/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { CourseCard } from "@/components/course-card";
import { processResponse } from "@/lib/response-process";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { CourseCardSkeleton } from "@/components/skeleton/course-card-skeleton";
import { useSearch } from "@/components/search-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface SearchResults {
  courses: CourseInterface[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

function CoursesSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<SearchResults>();
  const { query, setTotalPage, setLoading } = useSearch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchCourses = async () => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);

    if (query) params.set("query", query);

    // Default values
    if (!params.get("page")) params.set("page", "1");
    if (!params.get("limit")) params.set("limit", "2");
    if (!params.get("sortBy")) params.set("sortBy", "createdAt");
    if (!params.get("order")) params.set("order", "desc");

    // Update URL with search params
    // router.push(`/courses/search?${params.toString()}`);
    const res = await fetch(`/api/course/search?${params.toString()}`, {
      method: "GET",
    });

    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      setTotalPage(response.data.pagination.totalPages);
      setResults(response.data);
    }
    setLoading(false);
  };

  const navSearchCourses = async () => {
    const params = new URLSearchParams(searchParams);

    if (query) params.set("query", query);

    // Default values
    if (!params.get("page")) params.set("page", "1");
    if (!params.get("limit")) params.set("limit", "2");
    if (!params.get("sortBy")) params.set("sortBy", "createdAt");
    if (!params.get("order")) params.set("order", "desc");

    // Update URL with search params
    // router.push(`/courses/search?${params.toString()}`);
    const res = await fetch(`/api/course/search?${params.toString()}`, {
      method: "GET",
    });

    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      setTotalPage(response.data.pagination.totalPages);
      setResults(response.data);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    navSearchCourses().then(() => setIsLoading(false));
  }, [
    searchParams.get("page"),
    searchParams.get("sortBy"),
    searchParams.get("order"),
    searchParams.get("status"),
    searchParams.get("tags"),
  ]); // Re-run when query changes

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      searchCourses().then(() => setIsLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchParams.get("query")]); // Re-run when query changes

  return (
    <div className="col-span-12 flex flex-col gap-6 max-w-6xl w-full">
      {/* Results Grid */}
      <div className="grid grid-cols-12 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <CourseCardSkeleton
              key={index}
              className="col-span-12 md:col-span-6 2xl:col-span-4"
            />
          ))
        ) : results?.courses.length === 0 ? (
          <div className="col-span-full min-h-100 flex justify-center items-center flex-col gap-8">
            <small className="text-sm font-medium leading-none">
              {query ? (
                <>
                  No results found for <strong>{query}</strong>
                </>
              ) : (
                "No results found. Please enter a search term."
              )}
            </small>
            <Button onClick={() => router.push("/courses")}>
              Back to Courses
            </Button>
          </div>
        ) : (
          results?.courses.map((course) => (
            <CourseCard
              key={course._id.toString()}
              className="col-span-12 md:col-span-6 2xl:col-span-4"
              course={course}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CoursesSearch;
