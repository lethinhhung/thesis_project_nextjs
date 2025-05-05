"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
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
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const [sortField, setSortField] = useState<string>(
    params.get("sortBy") || "title"
  );
  const [sortOrder, setSortOrder] = useState<string>(
    params.get("order") || "asc"
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

  const updateURL = (field: string, order: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", field);
    newParams.set("order", order);
    newParams.set("page", "1"); // Reset to the first page when sorting changes
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
          <TooltipContent side="top">Sorting</TooltipContent>
        </Tooltip>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center justify-between">
            Sort by
            <Button
              onClick={handleSortOrderChange}
              size={"icon"}
              variant={"outline"}
            >
              {getSortIcon()}
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleSortFieldChange("title")}
            className={cn(sortField === "title" && "bg-accent")}
          >
            Title
            <DropdownMenuShortcut>
              <Tag />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSortFieldChange("date")}
            className={cn(sortField === "date" && "bg-accent")}
          >
            Date
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
