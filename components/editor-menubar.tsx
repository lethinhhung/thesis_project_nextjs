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
import { ArrowUpRight, ChevronRight, Square, SquareDashed } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { Divider } from "./blocks/divider";
import { Quote } from "./blocks/quote";
import { Heading4 } from "./blocks/heading4";
import { InlineCode } from "./blocks/inline-code";
import { Muted } from "./blocks/muted";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    divider: Divider,
    quote: Quote,
    heading4: Heading4,
    inlinecode: InlineCode,
    muted: Muted,
  },
});

function EditorMenubar({
  editor,
  isDarkTheme,
  isPlainBackground,
  setIsPlainBackground,
  isChatOpen,
  setIsChatOpen,
  editorRef,
}: {
  editor: typeof schema.BlockNoteEditor;
  isDarkTheme: boolean;
  isPlainBackground: boolean;
  setIsPlainBackground: (value: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
  editorRef: React.RefObject<HTMLDivElement> | null;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadMarkdown = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    const blob = new Blob([markdown], { type: "text/markdown" });
    downloadBlob(blob, "markdown.md");
  };

  const downloadHTML = async () => {
    const html = await editor.blocksToFullHTML(editor.document);
    const blob = new Blob([html], { type: "text/html" });
    downloadBlob(blob, "html.html");
  };

  const downloadPDF = async () => {
    if (!editorRef?.current) {
      console.log("null");
      return;
    }

    const canvas = await html2canvas(editorRef?.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("pdf.pdf");
  };

  return (
    <AnimatePresence initial={false}>
      <div className="w-full pb-4 pt-2 2xl:pt-4 flex justify-end col-span-full sticky z-10 top-14 2xl:top-14">
        <motion.div
          className=""
          initial={false}
          animate={{
            width: isCollapsed ? "42px" : "100%",
          }}
          transition={{
            duration: 0,
            ease: "easeInOut",
          }}
        >
          <Menubar
            autoFocus={false}
            className="justify-between shadow-sm dark:border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            {!isCollapsed && (
              <div className="flex gap-1">
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarSub>
                      <MenubarSubTrigger>Export to</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem onClick={downloadPDF}>PDF</MenubarItem>
                        <MenubarItem onClick={downloadHTML}>HTML</MenubarItem>
                        <MenubarItem onClick={downloadMarkdown}>
                          Markdown
                        </MenubarItem>
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
                    <MenubarItem
                      onSelect={() => window.open("/chat", "_blank")}
                    >
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
              </div>
            )}

            <MenubarMenu>
              <MenubarTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="px-2 py-1 h-7 rounded-sm text-sm font-medium"
                      size="sm"
                      variant={"ghost"}
                      onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                      <motion.div
                        animate={{ rotate: isCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight />
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Collapse</p>
                  </TooltipContent>
                </Tooltip>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default EditorMenubar;
