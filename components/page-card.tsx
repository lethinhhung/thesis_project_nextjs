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
import { Badge } from "./ui/badge";

export function PageCard({
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
        "duration-200 dark:border-dashed hover:shadow-lg dark:hover:border-solid cursor-pointer",
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
        <div className="flex flex-wrap gap-2">
          {page.tags.map((tag, index) => (
            <Badge variant={"outline"} key={index}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
