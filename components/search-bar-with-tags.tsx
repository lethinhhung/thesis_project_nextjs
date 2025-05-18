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
  DialogFooter,
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
import { Loader, RefreshCcw, Tag } from "lucide-react";
import SortButton from "./sort-button";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchContext } from "./search-provider";
import { Skeleton } from "./ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { processResponse } from "@/lib/response-process";
import { TagWithTotalCourse } from "@/interfaces/tag";

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
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<TagWithTotalCourse[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const router = useRouter();
  const pathname = usePathname();
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

  const handleTagsChange = (tagTitle: string) => {
    const newSelectedTags = selectedTags.includes(tagTitle)
      ? selectedTags.filter((t) => t !== tagTitle)
      : [...selectedTags, tagTitle];

    setSelectedTags(newSelectedTags);

    const params = new URLSearchParams(searchParams);
    if (newSelectedTags.length > 0) {
      params.set("tags", newSelectedTags.join(","));
    } else {
      params.delete("tags");
    }
    params.set("page", "1");
    params.set("limit", "12");
    if (!params.get("sortBy")) params.set("sortBy", "title");
    if (!params.get("order")) params.set("order", "asc");
    router.push(`/courses/search?${params.toString()}`);
  };

  useDebounce(
    () => {
      // Chỉ thực hiện chuyển hướng khi đang ở trang search
      if (!pathname.includes("/courses/search")) {
        return;
      }

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
    if (!pathname.includes("/courses/search") && e.target.value) {
      router.push(`/courses/search?query=${e.target.value}`);
    }
  };

  const fetchTags = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/tag/get-all`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: false,
    });

    if (response.success) {
      setTags(response.data);
    } else {
      setTags([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    setPage(parseInt(params.get("page") || "1"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("page")]);

  useEffect(() => {
    // Đồng bộ selected tags từ URL
    const tagsParam = searchParams.get("tags");
    if (tagsParam) {
      setSelectedTags(tagsParam.split(","));
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

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
                    className="border border-dashed relative"
                  >
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <>
                        <Tag />
                        {selectedTags.length > 0 && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {selectedTags.length}
                          </div>
                        )}
                      </>
                    )}
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
                {tags.map((tag) => (
                  <Badge
                    onClick={() => handleTagsChange(tag.title)}
                    variant={
                      selectedTags.includes(tag.title) ? "default" : "secondary"
                    }
                    className={cn(
                      "cursor-pointer transition-colors break-all line-clamp-1 max-w-60",
                      selectedTags.includes(tag.title)
                        ? "hover:bg-primary/80"
                        : "hover:bg-secondary/80"
                    )}
                    key={tag.title}
                  >
                    {tag.title} ({tag.totalCourses})
                  </Badge>
                ))}
              </div>
              <DialogFooter>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  type="button"
                  onClick={() => fetchTags()}
                >
                  {isLoading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <RefreshCcw />
                  )}
                </Button>
              </DialogFooter>
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
        ) : withPagination ? (
          <Pagination className="mt-auto w-full rounded-xl bg-transparent">
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
        ) : null)}
    </div>
  );
}

export default SearchBarWithTags;
