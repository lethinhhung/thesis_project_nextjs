"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
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
import { DeleteDocumentButton } from "./delete-document-button";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { DownloadDocumentButton } from "./download-document-button";
import { useIsTablet } from "@/hooks/use-tablet";
import { DocumentStatusMark } from "./document-status-mark";
import { getDocumentMeta } from "@/lib/getDocumentMeta";

function DocumentPreviewMobile({
  document,
  open,
  onOpenChange,
  fetchDocuments,
}: {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fetchDocuments: () => void;
}) {
  const isTablet = useIsTablet();
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  if (!document) {
    return null;
  }

  if (!isTablet) {
    return null;
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} autoFocus={open}>
      <DrawerContent onInteractOutside={() => onOpenChange(false)}>
        <div className="flex justify-between w-full max-w-5xl mx-auto">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex items-center gap-1 w-full">
                {document?.title}
                <DocumentStatusMark status={document.status} />
              </div>
            </DrawerTitle>
            <DrawerDescription>
              {document?.createdAt
                ? format(new Date(document.createdAt), "PPPP", {
                    locale: currentDateFnsLocale,
                  })
                : "No date"}
            </DrawerDescription>
            <DrawerDescription className="flex gap-1 items-center">
              <Badge>{getDocumentMeta(document.fileUrl).type}</Badge>
              {`${(document.size / (1024 * 1024)).toFixed(2)} MB`}
            </DrawerDescription>
            <div className="flex gap-2 flex-wrap">
              {document?.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={"secondary"}
                  className="break-all line-clamp-1 max-w-60"
                >
                  {tag.title}
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
            <DeleteDocumentButton
              variant="ghost"
              documentId={document?._id}
              fetchDocuments={fetchDocuments}
            />

            <DownloadDocumentButton
              variant={"ghost"}
              documentId={document?._id}
            />
          </div>
        </div>
        <div className="flex p-2 justify-center overflow-y-auto h-full w-full">
          <div className="max-w-3xl">
            <DocumentPreview
              fetchDocuments={fetchDocuments}
              document={document}
            />
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
