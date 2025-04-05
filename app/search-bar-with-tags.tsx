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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        "w-full sticky top-0 left-0 z-10 flex flex-wrap flex-col items-center p-1 rounded-xl border border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="flex flex-row flex-wrap gap-2 p-2 w-full">
        <Input
          onChange={(e) => navigate(`/courses/search`)}
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

      <Pagination
        hidden={!withPagination}
        className="mt-auto w-full rounded-xl bg-transparent"
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPreviousNoTitle href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive className="border border-dashed">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNextNoTitle href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default SearchBarWithTags;
