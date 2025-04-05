"use client";

import { MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavCourses({
  courses,
}: {
  courses: {
    name: string;
    url: string;
    emoji: string;
  }[];
}) {
  const router = useRouter();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Recent courses</SidebarGroupLabel>
      <SidebarMenu>
        {courses.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton onClick={() => router.push(item.url)}>
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => router.push("/courses")}
            className="text-sidebar-foreground/70"
          >
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
