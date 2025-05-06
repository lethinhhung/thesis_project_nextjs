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

export function NavLessons({ lessons }: { lessons?: LessonInterface[] }) {
  const router = useRouter();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent lessons</SidebarGroupLabel>
      <SidebarMenu>
        {lessons?.map((lesson) => (
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
