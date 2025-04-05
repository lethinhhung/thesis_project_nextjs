"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";
import Breadcrumbs from "@/components/breadcrumbs";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const createItems = [
  { title: "Course", url: "/course", icon: <Briefcase /> },
  { title: "Page", url: "/page", icon: <Book /> },
  { title: "Document", url: "/document", icon: <LibraryBig /> },
  { title: "Chat", url: "/chat", icon: <Sparkles /> },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning className="scrollbar">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
              <header className="z-30 sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <SidebarRight hidden={!isOpen} className="hidden 2xl:flex" />
          </SidebarProvider>
          <Toaster
            theme={
              theme === "light" || theme === "dark" || theme === "system"
                ? theme
                : undefined
            }
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
