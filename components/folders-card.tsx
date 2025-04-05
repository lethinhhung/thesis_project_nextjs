"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Page } from "@/interfaces/page";
import { cn } from "@/lib/utils";

export function FoldersCard({
  page,
  onClick,
  className,
}: {
  page: Page;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "duration-200 border-dashed hover:border-solid shadow-none",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex flex-wrap items-center gap-1">
            {page.title}

            {page.status && <CheckCircle2 size={"1rem"} />}
          </div>
        </CardTitle>
        <CardDescription className="">{page.summary}</CardDescription>
        <CardDescription>{page.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {page.tags.map((tag, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{tag}</CardTitle>
                <CardDescription className="line-clamp-2">
                  This is page description This is page description This is page
                  This is page description This is page description description
                  This is page description
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
