"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PaginationNextNoTitle,
  PaginationPreviousNoTitle,
} from "@/components/custom-ui/pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import SortButton from "./sort-button";
import { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchContext } from "./search-provider";
import { Skeleton } from "./ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";

const badges = [
  { title: "All", total: "50" },
  { title: "Math", total: "7" },
  { title: "Physics", total: "5" },
  { title: "Chemistry", total: "8" },
  { title: "Biology", total: "6" },
  { title: "Computer Science", total: "9" },
  { title: "Artificial Intelligence", total: "10" },
  { title: "Data Science", total: "7" },
  { title: "Machine Learning", total: "9" },
  { title: "Web Development", total: "6" },
  { title: "Software Engineering", total: "8" },
  { title: "Cybersecurity", total: "5" },
  { title: "Cloud Computing", total: "7" },
  { title: "Networking", total: "4" },
  { title: "Game Development", total: "10" },
  { title: "UI/UX Design", total: "3" },
  { title: "Blockchain", total: "5" },
  { title: "Embedded Systems", total: "6" },
  { title: "Mobile Development", total: "8" },
  { title: "Databases", total: "9" },
  { title: "Software Testing", total: "4" },
];

function getPageNumbers(current: number, total: number) {
  const delta = 1;
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}

function SearchBarWithTags({
  className,
  placeholder,
  withPagination = true,
}: {
  className?: string;
  placeholder?: string;
  withPagination?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalPage, loading } = useContext(SearchContext);

  const params = new URLSearchParams(searchParams);
  const [page, setPage] = useState(parseInt(params.get("page") || "1"));

  const handlePageChange = (newPage: number) => {
    // Cập nhật URL với page mới
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    // Chuyển hướng với params mới
    router.push(`/courses/search?${params.toString()}`);
  };

  useDebounce(
    () => {
      const params = new URLSearchParams(searchParams);
      const page = params.get("page") || "1";
      const limit = params.get("limit") || "12";
      const sortBy = params.get("sortBy") || "createdAt";
      const order = params.get("order") || "desc";

      if (searchValue) params.set("query", searchValue);
      else params.delete("query");
      params.set("page", page);
      params.set("limit", limit);
      params.set("sortBy", sortBy);
      params.set("order", order);

      router.push(`/courses/search?${params.toString()}`);
    },
    500,
    [searchValue]
  );

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setPage(parseInt(params.get("page") || "1"));
  }, [searchParams.get("page")]);

  return (
    <div
      className={cn(
        "w-full sticky top-0 left-0 z-10 flex flex-wrap flex-col items-center p-1 rounded-xl border border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="flex flex-row flex-wrap gap-2 p-2 w-full">
        <Input
          spellCheck={false}
          onChange={handleSearch}
          className="flex-1 border border-dashed"
          placeholder={placeholder}
        />

        <SortButton variant={"ghost"} />

        <TooltipProvider>
          <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="border border-dashed"
                  >
                    <Tag />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Tags</TooltipContent>
            </Tooltip>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tags</DialogTitle>
                <DialogDescription>Filter by tags</DialogDescription>
              </DialogHeader>
              <div className="w-full flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge
                    onClick={() => console.log(badge.title)}
                    variant={"secondary"}
                    className="cursor-pointer"
                    key={badge.title}
                  >
                    {badge.title} ({badge.total})
                  </Badge>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </TooltipProvider>
      </div>

      {searchParams.toString() &&
        (loading ? (
          <div className="flex w-full mx-auto gap-2 justify-center items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-9" />
            ))}
          </div>
        ) : (
          totalPage > 1 && (
            <Pagination
              hidden={!withPagination}
              className="mt-auto w-full rounded-xl bg-transparent"
            >
              <PaginationContent>
                {page !== 1 && (
                  <PaginationItem>
                    <PaginationPreviousNoTitle
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange((page - 1) as number);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </PaginationItem>
                )}

                {getPageNumbers(page, totalPage).map((p, index) => (
                  <PaginationItem key={index}>
                    {p === "..." ? (
                      <PaginationEllipsis className="hidden sm:flex" />
                    ) : (
                      <PaginationLink
                        isActive={p === page}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(p as number);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {p}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {page !== totalPage && (
                  <PaginationItem>
                    <PaginationNextNoTitle
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange((page + 1) as number);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )
        ))}
    </div>
  );
}

export default SearchBarWithTags;
