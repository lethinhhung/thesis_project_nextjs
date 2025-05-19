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
import { LessonName } from "@/interfaces/lesson";
import { useTranslations } from "next-intl";

export default function Breadcrumbs() {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("common");
  const pathname = usePathname();
  const params = useParams();
  const pathSegments = pathname.split("/").filter(Boolean).slice(1);
  const isTablet = useIsTablet();
  const shouldShorten = isTablet
    ? pathSegments.length >= 2
    : pathSegments.length >= 5;
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [course, setCourse] = useState<CourseInterface>();
  const [lesson, setLesson] = useState<LessonName>();

  const breadcrumbMap: Record<string, string> = {
    dashboard: t("dashboard"),
    home: t("home"),
    courses: t("courses"),
    all: t("all"),
    completed: t("completed"),
    ongoing: t("ongoing"),
    search: t("search"),
    pages: t("pages"),
    chat: t("chat"),
    library: t("library"),
    settings: t("settings"),
    inbox: t("inbox"),
    calendar: t("calendar"),
    course: t("course_details"),
    lessons: t("lessons"),
    page: t("page_details"),
    folders: t("folders"),
    tests: t("tests_and_projects"),
    projects: t("projects"),
    documents: t("documents"),
    "ask-ai": t("ask_ai"),
    en: t("english"),
    vi: t("vietnamese"),
  };

  const fetchData = async () => {
    if (courseId) {
      const res = await fetch(`/api/course/${courseId}`, {
        method: "GET",
      });
      const response = await processResponse(res, {
        success: false,
        error: true,
      });

      if (response.success) {
        setCourse(response.data);
      }
    }

    if (lessonId) {
      const res = await fetch(`/api/lesson/${lessonId}`, {
        method: "GET",
      });
      const response = await processResponse(res, {
        success: false,
        error: true,
      });

      if (response.success) {
        setLesson(response.data);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.courseId, params.lessonId]);

  function resolveBreadcrumbLabel(segment: string): string {
    if (segment === course?._id) return course?.title;
    if (segment === lesson?._id) return lesson?.title;
    return breadcrumbMap[segment] || segment;
  }

  const breadcrumbItems = pathSegments.slice(0, -1).map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { label: resolveBreadcrumbLabel(segment), path };
  });

  const lastLabel = resolveBreadcrumbLabel(
    pathSegments[pathSegments.length - 1]
  );

  return (
    <Breadcrumb>
      {isLoading ? (
        <Skeleton className="h-5 w-40 sm:w-60" />
      ) : (
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/home" className="text-primary">
              <Home size={18} className="sm:hidden" />
              <div className="hidden sm:flex">Notebok</div>
            </Link>
          </BreadcrumbItem>

          {shouldShorten ? (
            <div className="flex items-center gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {breadcrumbItems.map(({ label, path }) => (
                      <DropdownMenuItem key={path}>
                        <Link href={path}>{label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </div>
          ) : (
            breadcrumbItems.map(({ label, path }) => (
              <div key={path} className="flex items-center gap-2">
                <BreadcrumbSeparator />
                <BreadcrumbItem className="truncate max-w-20 2xl:max-w-40">
                  <Link className="text-primary" href={path}>
                    {label}
                  </Link>
                </BreadcrumbItem>
              </div>
            ))
          )}

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="truncate max-w-30 sm:max-w-40 lg:max-w-50 2xl:max-w-80">
              {lastLabel}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      )}
    </Breadcrumb>
  );
}
