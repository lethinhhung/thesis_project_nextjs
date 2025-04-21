"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  account: "Account",
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
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isTablet = useIsTablet();
  const shouldShorten = isTablet
    ? pathSegments.length >= 3
    : pathSegments.length >= 5;

  return (
    <Breadcrumb>
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
                          {breadcrumbMap[segment] || segment}
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
                    {breadcrumbMap[segment] || segment}
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
                {breadcrumbMap[pathSegments[pathSegments.length - 1]] ||
                  pathSegments[pathSegments.length - 1]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
