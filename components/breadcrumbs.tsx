"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsTablet } from "@/hooks/use-tablet";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Course as CourseInterface } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "./ui/skeleton";

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  home: "Home",
  courses: "Courses",
  all: "All",
  completed: "Completed",
  ongoing: "Ongoing",
  search: "Search",
  pages: "Pages",
  chat: "Chat",
  library: "Library",
  settings: "Settings",
  inbox: "Inbox",
  calendar: "Calendar",
  course: "Course Details",
  lessons: "Lessons",
  page: "Page Details",
  folders: "Folders",
  tests: "Tests",
  projects: "Projects",
  documents: "Documents",
  "ask-ai": "Ask AI",
  en: "English",
  vi: "Tiếng Việt",
};

export default function Breadcrumbs() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const params = useParams();
  const pathSegments = pathname.split("/").filter(Boolean).slice(1);
  const isTablet = useIsTablet();
  const shouldShorten = isTablet
    ? pathSegments.length >= 3
    : pathSegments.length >= 5;
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<CourseInterface>();

  const fetchCourse = async () => {
    if (!courseId) return;
    const res = await fetch(`/api/course/${courseId}`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: true,
    });
    console.log("Course data:", response);

    if (response.success) {
      setCourse(response.data);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCourse().then(() => setIsLoading(false));
  }, [params.courseId]);

  return (
    <Breadcrumb>
      {isLoading ? (
        <Skeleton className="h-5 w-60" />
      ) : (
        <BreadcrumbList>
          {/* Mục đầu tiên */}
          <BreadcrumbItem>
            <Link className="text-primary" href="/home">
              <Home size={18} className="sm:hidden" />
              <div className="hidden sm:flex">Notebook</div>
            </Link>
          </BreadcrumbItem>

          {shouldShorten ? (
            <div className="hidden sm:flex items-center gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {pathSegments.slice(0, -1).map((segment, index) => {
                      const path = `/${pathSegments
                        .slice(0, index + 1)
                        .join("/")}`;
                      return (
                        <DropdownMenuItem key={path}>
                          <Link href={path}>
                            {segment == course?._id
                              ? course?.title
                              : breadcrumbMap[segment] || segment}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </div>
          ) : (
            pathSegments.slice(0, -1).map((segment, index) => {
              const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
              return (
                <div key={path} className="hidden sm:flex items-center gap-2">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <Link className="text-primary" href={path}>
                      {segment == course?._id
                        ? course?.title
                        : breadcrumbMap[segment] || segment}
                    </Link>
                  </BreadcrumbItem>
                </div>
              );
            })
          )}

          {/* Mục cuối cùng */}
          {pathSegments.length >= 1 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate w-30">
                  {breadcrumbMap[pathSegments[pathSegments.length - 1]] ==
                    course?._id ||
                  pathSegments[pathSegments.length - 1] == course?._id
                    ? course?.title
                    : breadcrumbMap[pathSegments[pathSegments.length - 1]] ||
                      pathSegments[pathSegments.length - 1]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
}
