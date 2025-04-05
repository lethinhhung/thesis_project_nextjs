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

import { BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { DeleteButton } from "@/components/delete-button";
import { DownloadButton } from "@/components/download-button";
import { Document } from "@/interfaces/document";

function DocumentPreview({
  document,
  header,
}: {
  document: Document | null;
  header: boolean;
}) {
  return (
    <div className="w-full h-full flex">
      {document ? (
        <div className="h-full w-full rounded-xl flex flex-col">
          <Card
            hidden={!header}
            className="flex w-full sticky top-0 left-0 z-10 rounded-xl border border-dashed shadow-none"
          >
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-1">
                  {document?.title}
                  {document?.status && (
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
                  )}
                </div>
              </CardTitle>
              <CardDescription>{document?.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap ">
                {document?.tags.map((tag) => (
                  <Badge key={tag} variant={"secondary"}>
                    {tag}
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
                        disabled={!document?.status}
                        size={"icon"}
                        variant={"ghost"}
                      >
                        <Sparkles />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ask AI</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DeleteButton variant="ghost" type="document" />

                <DownloadButton variant={"ghost"} />
              </div>
            </CardFooter>
          </Card>

          <div className="flex flex-col py-2 gap-2 w-full rounded-xl overflow-y-auto scrollbar">
            <Card className="w-full bg-background rounded-xl border border-dashed shadow-none">
              <CardContent>{document?.description}</CardContent>
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
                <img
                  alt="Document preview"
                  src="/placeholder.svg"
                  className="inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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
