"use client";

import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Book,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LibraryBig,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Breadcrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAutoSignOut } from "@/hooks/use-auto-signout";

const createItems = [
  { title: "Course", url: "/course", icon: <Briefcase /> },
  { title: "Page", url: "/page", icon: <Book /> },
  { title: "Document", url: "/document", icon: <LibraryBig /> },
  { title: "Chat", url: "/chat", icon: <Sparkles /> },
];

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  useAutoSignOut();
  return (
    <SidebarProvider className="">
      <SidebarLeft />
      <SidebarInset>
        <header className="z-40 sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />

            <Breadcrumbs />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>

          <div className="flex items-center gap-2 px-2">
            <TooltipProvider>
              <DropdownMenu modal={false}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button size={"icon"} variant={"ghost"}>
                        <Plus />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Create</TooltipContent>
                </Tooltip>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Create new</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {createItems.map((item) => (
                    <DropdownMenuItem key={item.url}>
                      {item.icon}
                      {item.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden 2xl:flex"
                  >
                    {isOpen ? <ChevronRight /> : <ChevronLeft />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isOpen ? "Hide sidebar" : "Show sidebar"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 max-w-full">
          {children}
        </div>
      </SidebarInset>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 1 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden sticky top-0 h-svh border-l 2xl:flex"
          >
            <SidebarRight />
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarProvider>
  );
}
