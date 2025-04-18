"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowUpRight, Square, SquareDashed } from "lucide-react";
import { Button } from "./ui/button";

function EditorMenubar({
  isDarkTheme,
  isPlainBackground,
  setIsPlainBackground,
  isChatOpen,
  setIsChatOpen,
}: {
  isDarkTheme: boolean;
  isPlainBackground: boolean;
  setIsPlainBackground: (value: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
}) {
  return (
    <Menubar className="col-span-full sticky z-10 top-16 dark:border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Export to</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>PDF</MenubarItem>
              <MenubarItem>HTML</MenubarItem>
              <MenubarItem>Markdown</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>AI tools</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Translate to</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>English</MenubarItem>
              <MenubarItem>Vietnamese</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem onSelect={() => window.open("/chat", "_blank")}>
            Asking
            <MenubarShortcut>
              <ArrowUpRight />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Summarize</MenubarItem>
          <MenubarItem>Generate from knownledge</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className="hidden 2xl:flex hover:bg-transparent data-[state=open]:bg-transparent"
          onClick={() => {
            setIsChatOpen(!isChatOpen);
          }}
        >
          {isChatOpen ? "Close ask AI" : "Open ask AI"}
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem disabled>Type / to insert</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {isDarkTheme && (
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="px-2 py-1 h-7 rounded-sm text-sm font-medium"
                  onClick={() => {
                    setIsPlainBackground(!isPlainBackground);
                  }}
                  size="sm"
                  variant={isPlainBackground ? "ghost" : "secondary"}
                >
                  {isPlainBackground ? <SquareDashed /> : <Square />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>
                  {"Switch to " +
                    (isPlainBackground
                      ? "default background"
                      : "transparent background")}
                </p>
              </TooltipContent>
            </Tooltip>
          </MenubarTrigger>
        </MenubarMenu>
      )}
    </Menubar>
  );
}
export default EditorMenubar;
