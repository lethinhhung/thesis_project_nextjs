"use client";

import { Book, MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { Course as CourseInterface } from "@/interfaces/course";
import { useTranslations } from "next-intl";

export function NavCourses({ courses }: { courses?: CourseInterface[] }) {
  const router = useRouter();
  const t = useTranslations("common");
  return (
    // <SidebarGroup className="group-data-[collapsible=icon]:hidden">
    <SidebarGroup>
      <SidebarGroupLabel className="gap-1">
        <Book size={16} />
        {t("recent_courses")}
      </SidebarGroupLabel>
      <SidebarMenu>
        {courses
          ?.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .slice(0, 6)
          .map((course) => (
            <SidebarMenuItem key={course._id}>
              <SidebarMenuButton
                onClick={() => router.push(`/courses/${course._id}`)}
              >
                <span>{course?.customization?.emoji}</span>
                <span>{course.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => router.push("/courses")}
            className="text-sidebar-foreground/70"
          >
            <MoreHorizontal />
            <span>{t("more")}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
