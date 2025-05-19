"use client";

import { ChevronsUpDown, Dot, Inbox, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavControls } from "./nav-controls";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const t = useTranslations("common");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <SidebarMenu>
        <Skeleton className="w-full h-12" />
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.image || "/placeholder.svg"}
                  alt={session?.user?.name || "Guest"}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user?.name?.charAt(0).toUpperCase() || "G"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name || "Guest"}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal ">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image || "/placeholder.svg"}
                    alt={session?.user?.name || "Guest"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user?.name?.charAt(0).toUpperCase() || "G"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name || "Guest"}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email}
                  </span>
                </div>
              </div>

              <div className="flex md:hidden items-center gap-2">
                <NavControls />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings />
                {t("settings")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-between items-center"
                onClick={() => router.push("/inbox")}
              >
                <div className="flex items-center gap-2">
                  <Inbox />
                  {t("inbox")}
                </div>
                <Dot className="text-sky-500" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              {t("sign_out")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
