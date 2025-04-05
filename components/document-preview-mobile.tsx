"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import DocumentPreview from "./document-preview";
import { Document } from "@/interfaces/document";
import DeleteButton from "./delete-button";
import DownloadButton from "./download-button";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";

function DocumentPreviewMobile({
  document,
  open,
  onOpenChange,
  header,
}: {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  header: boolean;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} autoFocus={open}>
      <DrawerContent onInteractOutside={() => onOpenChange(false)}>
        <div className="flex justify-between w-full max-w-5xl mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-1">
                  {document?.title}{" "}
                  {document?.status && <CheckCircle2 size={"1rem"} />}
                </div>
              </div>
            </DrawerTitle>
            <DrawerDescription>{document?.date}</DrawerDescription>
            <div className="flex gap-2 flex-wrap">
              {document?.tags.map((tag, index) => (
                <Badge key={index} variant={"secondary"}>
                  {tag}
                </Badge>
              ))}
            </div>
          </DrawerHeader>
          <div className="p-2 flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"icon"} variant={"ghost"}>
                    <Sparkles />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Ask AI</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DeleteButton type="document" variant="ghost" />

            <DownloadButton variant={"ghost"} />
          </div>
        </div>
        <div className="flex p-2 justify-center overflow-y-auto h-full w-full">
          <div className="max-w-3xl">
            <DocumentPreview document={document} header={header} />
          </div>
        </div>
        <DrawerFooter className="flex">
          <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DocumentPreviewMobile;
