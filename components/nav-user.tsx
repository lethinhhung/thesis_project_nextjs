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
import { useEffect, useState } from "react";
import { User } from "@/interfaces/user";
import { processResponse } from "@/lib/response-process";
import { Skeleton } from "./ui/skeleton";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { data: session } = useSession();

  const [user, setUser] = useState<User>();

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (session) {
      const res = await fetch(`/api/user/profile`, {
        method: "GET",
      });
      const response = await processResponse(res, {
        success: false,
        error: true,
      });

      if (response.success) {
        setUser(response.data);
      }
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarMenu>
      {isLoading ? (
        <Skeleton className="w-full h-12" />
      ) : (
        <SidebarMenuItem>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.profile?.avatar}
                    alt={user?.username}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.username}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
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
                      src={user?.profile?.avatar}
                      alt={user?.username}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.username}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
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
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onClick={() => router.push("/inbox")}
                >
                  <div className="flex items-center gap-2">
                    <Inbox />
                    Inbox
                  </div>
                  <Dot className="text-sky-500" />
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
