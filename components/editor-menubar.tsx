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
import {
  ArrowRightToLine,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Loader,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { schema } from "./blocknote";

function EditorMenubar({
  editor,
  isPlainBackground,
  setIsPlainBackground,
  isChatOpen,
  setIsChatOpen,
  editorRef,
  isLoading,
  save,
  markDown,
}: {
  editor: typeof schema.BlockNoteEditor;
  isPlainBackground: boolean;
  setIsPlainBackground: (value: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
  editorRef: React.RefObject<HTMLDivElement> | null;
  isLoading: boolean;
  save: () => void;
  markDown: string;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isClearBackground, setIsClearBackground] = useState(false);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("File downloaded successfully!");
  };

  const downloadMarkdown = async () => {
    document.body.style.cursor = "wait";
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    const blob = new Blob([markdown], { type: "text/markdown" });
    downloadBlob(blob, "markdown.md");
    document.body.style.cursor = "auto";
  };

  const downloadHTML = async () => {
    document.body.style.cursor = "wait";
    const html = await editor.blocksToFullHTML(editor.document);
    const blob = new Blob([html], { type: "text/html" });
    downloadBlob(blob, "html.html");
    document.body.style.cursor = "auto";
  };

  // const downloadPDF = async () => {
  //   document.body.style.cursor = "wait";
  //   if (!editorRef?.current) {
  //     console.log("null");

  //     document.body.style.cursor = "auto";
  //     return;
  //   }

  //   const canvas = await html2canvas(editorRef?.current);
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("pdf.pdf");
  //   document.body.style.cursor = "auto";
  //   toast.success("File downloaded successfully!");
  // };

  const downloadPDF = async () => {
    document.body.style.cursor = "wait";

    if (!editorRef?.current) {
      document.body.style.cursor = "auto";
      toast.error("Editor not found.");
      return;
    }

    const clone = editorRef.current.cloneNode(true) as HTMLElement;
    clone.style.width = "794px"; // A4 width in px (96 DPI)
    clone.style.minHeight = "auto";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.background = "white";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2, // higher quality
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = (pdfWidth * 4) / imgWidth; // scale image to match PDF width (4 is approx for 2x scale and 96 DPI)
    const scaledHeight = (imgHeight * ratio) / 4;

    let position = 0;

    while (position < scaledHeight) {
      pdf.addImage(imgData, "PNG", 0, 0 - position, pdfWidth, scaledHeight);

      position += pdfHeight;
      if (position < scaledHeight) pdf.addPage();
    }

    document.body.removeChild(clone);
    pdf.save("document.pdf");
    document.body.style.cursor = "auto";
    toast.success("File downloaded successfully!");
  };

  const copyText = () => {
    const text = markDown;
    navigator.clipboard
      .writeText(text?.toString() || "")
      .then(() => toast.success("Copied to clipboard!"))
      .catch((err) => {
        console.error("Err:", err);
      });
  };

  return (
    <AnimatePresence initial={false}>
      <div className="w-full pb-4 pt-2 2xl:pt-4 flex justify-end col-span-full sticky z-10 top-14 2xl:top-14">
        <motion.div
          className=""
          initial={false}
          animate={{
            width: isCollapsed ? "85px" : "100%",
          }}
          transition={{
            duration: 0,
            ease: "easeInOut",
          }}
        >
          <Menubar
            autoFocus={false}
            className={`justify-between shadow-sm ${
              isClearBackground
                ? "bg-foreground/95 supports-[backdrop-filter]:bg-foreground/60 text-background/95"
                : "bg-background/95 supports-[backdrop-filter]:bg-background/60 text-foreground/95"
            } backdrop-blur`}
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
                    <MenubarItem
                      onClick={(e) => {
                        e.preventDefault();
                        save();
                      }}
                    >
                      Save
                      <MenubarShortcut>
                        {isLoading && <Loader className="animate-spin" />}
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={copyText}>Copy text</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPlainBackground(!isPlainBackground);
                      }}
                    >
                      Transparent background
                      <MenubarShortcut>
                        {isPlainBackground ? <ToggleRight /> : <ToggleLeft />}
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem
                      onClick={(e) => {
                        e.preventDefault();
                        setIsClearBackground(!isClearBackground);
                      }}
                    >
                      Clear menubar background
                      <MenubarShortcut>
                        {isClearBackground ? <ToggleRight /> : <ToggleLeft />}
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => setIsCollapsed(!isCollapsed)}>
                      Collapse menubar
                      <MenubarShortcut>
                        <ArrowRightToLine />
                      </MenubarShortcut>
                    </MenubarItem>
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
                      className="hidden 2xl:flex hover:bg-transparent data-[state=open]:bg-transparent"
                      onClick={() => {
                        setIsChatOpen(!isChatOpen);
                      }}
                    >
                      {isChatOpen ? "Close ask AI" : "Open ask AI"}
                    </MenubarItem>
                    <MenubarItem
                      onSelect={() => window.open("/chat", "_blank")}
                    >
                      Chat
                      <MenubarShortcut>
                        <ArrowUpRight />
                      </MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>Summarize</MenubarItem>
                    <MenubarItem>Generate from knownledge</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                  <MenubarTrigger>Help</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem disabled>Type / to insert</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </div>
            )}

            <div className="flex justify-end items-center gap-2">
              <div className="px-2 border-r">
                {isLoading ? (
                  <Loader className="animate-spin" size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}
              </div>

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
                      <p>{isCollapsed ? "Menu" : "Collapse"}</p>
                    </TooltipContent>
                  </Tooltip>
                </MenubarTrigger>
              </MenubarMenu>
            </div>
          </Menubar>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default EditorMenubar;
