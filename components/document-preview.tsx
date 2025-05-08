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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Document } from "@/interfaces/document";
import Image from "next/image";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { DownloadDocumentButton } from "./download-document-button";
import { DeleteDocumentButton } from "./delete-document-button";

function DocumentPreview({
  document,
  fetchDocuments,
}: {
  document: Document | null;
  fetchDocuments: () => void;
}) {
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  if (!document) return null;
  return (
    <div className="w-full h-full flex">
      {document ? (
        <div className="h-full w-full rounded-xl flex flex-col">
          <Card className="hidden lg:flex w-full sticky top-0 left-0 z-10 rounded-xl border border-dashed shadow-none ">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-1">
                  {document?.title}
                  {/* {document?.status && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CheckCircle2 size={"1rem"} />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          This document? has been processed
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )} */}
                </div>
              </CardTitle>
              <CardDescription>
                {format(new Date(document?.createdAt), "PPPP", {
                  locale: currentDateFnsLocale,
                })}
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        // disabled={!document?.status}
                        size={"icon"}
                        variant={"ghost"}
                      >
                        <Sparkles />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ask AI</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

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
