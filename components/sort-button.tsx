"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CalendarClock, SortAsc, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

// ...existing code...
export function SortButton({
  variant,
  className,
}: {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
}) {
  const searchParams = useSearchParams();
  const t = useTranslations("common");
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const [sortField, setSortField] = useState<string>(
    params.get("sortBy") || "title"
  );
  const [sortOrder, setSortOrder] = useState<string>(
    params.get("order") || "asc"
  );

  const [filterStatus, setFilterStatus] = useState<string | null>(
    params.get("status") || null
  );

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    updateURL(sortField, newOrder);
  };

  const handleSortFieldChange = (field: string) => {
    setSortField(field);
    updateURL(field, sortOrder);
  };

  const handleStatusFilter = (status: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (status === null) {
      newParams.delete("status");
    } else {
      newParams.set("status", status);
    }
    newParams.set("page", "1");
    router.push(`/courses/search?${newParams.toString()}`);
    setFilterStatus(status);
  };

  const updateURL = (field: string, order: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", field);
    newParams.set("order", order);
    newParams.set("page", "1");
    newParams.set("limit", "12");
    router.push(`/courses/search?${newParams.toString()}`);
  };

  const getSortIcon = () => {
    return sortOrder === "asc" ? (
      <SortAsc />
    ) : (
      <SortAsc className="rotate-180" />
    );
  };

  return (
    <TooltipProvider>
      <DropdownMenu modal={false}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={variant}
                className={cn("border border-dashed", className)}
              >
                {getSortIcon()}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">
            {t("sorting_and_filtering")}
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="space-y-1">
          <DropdownMenuLabel className="flex items-center gap-2 justify-between">
            {t("sort_by")}
            <Button
              onClick={handleSortOrderChange}
              size={"icon"}
              variant={"outline"}
            >
              {getSortIcon()}
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={cn(sortField === "status" && "bg-accent")}
            >
              {t("status")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleStatusFilter(null)}
                className={cn(filterStatus === null && "bg-accent")}
              >
                {t("all")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilter("true")}
                className={cn(filterStatus === "true" && "bg-accent")}
              >
                {t("completed")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilter("false")}
                className={cn(filterStatus === "false" && "bg-accent")}
              >
                {t("ongoing")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem
            onClick={() => handleSortFieldChange("title")}
            className={cn(sortField === "title" && "bg-accent")}
          >
            {t("title")}
            <DropdownMenuShortcut>
              <Tag />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortFieldChange("date")}
            className={cn(sortField === "date" && "bg-accent")}
          >
            {t("date")}
            <DropdownMenuShortcut>
              <CalendarClock />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
export default SortButton;
