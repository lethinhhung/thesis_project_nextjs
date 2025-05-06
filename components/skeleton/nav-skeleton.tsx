"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Skeleton } from "../ui/skeleton";
export function NavSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel className="py-2">
            <Skeleton className="w-14 h-4" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={index} className="px-2 py-1">
                  <Skeleton className="w-full h-6" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
