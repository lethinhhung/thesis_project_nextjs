"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BookOpen, Sparkles } from "lucide-react";
import { Document } from "@/interfaces/document";
import Image from "next/image";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { DownloadDocumentButton } from "./download-document-button";
import { DeleteDocumentButton } from "./delete-document-button";
import { DocumentStatusMark } from "./document-status-mark";
import { getDocumentMeta } from "@/lib/getDocumentMeta";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { useIsTablet } from "@/hooks/use-tablet";

function DocumentPreview({
  open,
  onOpenChange,
  document,
  fetchDocuments,
  responsive = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: Document | null;
  fetchDocuments: () => void;
  responsive?: boolean;
}) {
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };
  const isTablet = useIsTablet();

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  if (!document) return null;

  if (!responsive || isTablet) {
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
            <div className="w-full max-w-5xl h-full flex">
              {document ? (
                <div className="h-full w-full rounded-xl flex flex-col">
                  <div className="flex flex-col py-2 gap-2 w-full rounded-xl overflow-y-auto scrollbar">
                    <Card className="w-full bg-background rounded-xl border border-dashed shadow-none">
                      <CardContent>
                        {/* {document?.description} */}
                        AI sumarry
                      </CardContent>
                      <CardFooter>
                        <div className="w-full flex justify-end">
                          <Button size={"sm"} variant={"ghost"}>
                            <Sparkles />
                            Re-summarize
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                    <Card className="w-full h-150 bg-background rounded-xl border border-dashed shadow-none">
                      <CardContent className="h-full">
                        <Image
                          width={1000}
                          height={1000}
                          alt="Document preview"
                          src="/placeholder.svg"
                          className="inset-0 h-full w-full object-cover dark:brightness-[0.7]"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full gap-2">
                  <BookOpen />
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Select a document to preview
                  </h4>
                </div>
              )}
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

  return (
    <div className="w-full h-full flex">
      {document ? (
        <div className="h-full w-full rounded-xl flex flex-col">
          <Card className="flex w-full sticky top-0 left-0 z-10 rounded-xl border border-dashed shadow-none ">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                  {document?.title}
                  <DocumentStatusMark status={document?.status} />
                </div>
                <Badge>{getDocumentMeta(document.fileUrl).type}</Badge>
              </CardTitle>
              <CardDescription>
                {format(new Date(document?.createdAt), "PPPP", {
                  locale: currentDateFnsLocale,
                })}
              </CardDescription>

              <CardDescription>
                {`${(document.size / (1024 * 1024)).toFixed(2)} MB`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap ">
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
            </CardContent>
            <CardFooter>
              <div className="w-full flex gap-2 justify-end">
                <DeleteDocumentButton
                  variant="ghost"
                  documentId={document._id}
                  fetchDocuments={fetchDocuments}
                />

                <DownloadDocumentButton
                  variant={"ghost"}
                  documentId={document._id}
                />
              </div>
            </CardFooter>
          </Card>

          <div className="flex flex-col py-2 gap-2 w-full rounded-xl overflow-y-auto scrollbar">
            <Card className="w-full bg-background rounded-xl border border-dashed shadow-none">
              <CardContent>
                {/* {document?.description} */}
                AI sumarry
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-end">
                  <Button size={"sm"} variant={"ghost"}>
                    <Sparkles />
                    Re-summarize
                  </Button>
                </div>
              </CardFooter>
            </Card>
            <Card className="w-full h-150 bg-background rounded-xl border border-dashed shadow-none">
              <CardContent className="h-full">
                <Image
                  width={1000}
                  height={1000}
                  alt="Document preview"
                  src="/placeholder.svg"
                  className="inset-0 h-full w-full object-cover dark:brightness-[0.7]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full gap-2">
          <BookOpen />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Select a document to preview
          </h4>
        </div>
      )}
    </div>
  );
}

export default DocumentPreview;
