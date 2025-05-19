"use client";

import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Breadcrumbs from "@/components/breadcrumbs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CreateNew } from "@/components/create-new";
import { useTranslations } from "next-intl";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("common");
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
            <CreateNew />

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
                  {isOpen ? t("hide_sidebar") : t("show_sidebar")}
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
