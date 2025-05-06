"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Document } from "@/interfaces/document";
import { cn } from "@/lib/utils";

export function DocumentCard({
  document,
  onClick,
  className,
}: {
  document: Document;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-1 line-clamp-1">
            {document.title}

            {document.status && <CheckCircle2 size={"1rem"} />}
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          {document.summary}
        </CardDescription>
        <CardDescription>{document.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {document.tags.map((tag, index) => (
            <Badge
              variant={"outline"}
              key={index}
              className="break-all line-clamp-1 max-w-60"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      {/* <CardFooter
        className="flex lg:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-2 h-full w-full justify-end">
          <DeleteButton type="document" variant="ghost" />

          <DownloadButton variant="ghost" />
        </div>
      </CardFooter> */}
    </Card>
  );
}
