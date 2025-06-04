"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Document } from "@/interfaces/document";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { getDocumentMeta } from "@/lib/getDocumentMeta";

export function DocumentCard({
  document,
  onClick,
  className,
  variant = "default",
}: {
  document: Document;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  variant?: "default" | "sm";
}) {
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;
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
          <div className="flex items-center justify-between gap-1 line-clamp-1">
            {document.title}
            <Badge>{getDocumentMeta(document.fileUrl).type}</Badge>
            {/* {document.status && <CheckCircle2 size={"1rem"} />} */}
          </div>
        </CardTitle>
        {/* {variant == "default" && (
          <CardDescription className="line-clamp-3 min-h-[4rem]">
            Ai dwa dwa dwa da dwa dwa daw daw dawd wad ad aw d a
          </CardDescription>
        )} */}
        <CardDescription>
          {format(new Date(document?.createdAt), "P", {
            locale: currentDateFnsLocale,
          })}
        </CardDescription>
      </CardHeader>
      {variant == "default" && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag, index) => (
              <Badge
                variant={"outline"}
                key={index}
                className="break-all line-clamp-1 max-w-60"
              >
                {tag.title}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
