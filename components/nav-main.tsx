"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { lazy, Suspense, useState } from "react";

const SearchBarDialog = lazy(() => import("@/components/search-bar-dialog"));

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent, url: string) => {
    router.push(url);
    e.preventDefault();
  };

  return (
    <>
      {/* Lazy load SearchBarDialog */}
      <Suspense>
        <SearchBarDialog open={open} setOpen={setOpen} />
      </Suspense>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              <Search />
              <span>Search</span>
              <p className="text-sm text-muted-foreground">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">ctrl + J</span>
                </kbd>
              </p>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={pathname === item.url}>
              <a href={item.url} onClick={(e) => handleClick(e, item.url)}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </>
  );
}
