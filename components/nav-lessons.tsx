"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { LessonCard as LessonInterface } from "@/interfaces/lesson";
import { useTranslations } from "next-intl";
import { NotepadText } from "lucide-react";

export function NavLessons({ lessons }: { lessons?: LessonInterface[] }) {
  const router = useRouter();
  const t = useTranslations("common");
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="gap-1">
        <NotepadText size={16} />
        {t("recent_lessons")}
      </SidebarGroupLabel>
      <SidebarMenu>
        {lessons
          ?.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .map((lesson) => (
            <SidebarMenuItem key={lesson._id}>
              <SidebarMenuButton
                onClick={() =>
                  router.push(
                    `/courses/${lesson.courseId._id}/lessons/${lesson._id}`
                  )
                }
              >
                <span>{lesson.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
