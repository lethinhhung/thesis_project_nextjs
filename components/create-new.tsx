"use client";

import {
  Book,
  Briefcase,
  LibraryBig,
  Loader,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CreateCourse } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { useRouter } from "next/navigation";

const createItems = [
  { title: "Course", type: "course", icon: <Briefcase /> },
  { title: "Page", type: "page", icon: <Book /> },
  { title: "Document", type: "document", icon: <LibraryBig /> },
  { title: "Chat", type: "chat", icon: <Sparkles /> },
];

export function CreateNew() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentType, setCurrentType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState<CreateCourse>({
    title: "",
    description: "",
    aiGenerated: false,
  });

  const handleOpen = (type: string) => {
    setCurrentType(type);
    console.log(`Creating new ${type}`);
    setOpen(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        body: JSON.stringify(submitting),
      });

      const course = await processResponse(res);
      if (course.success) {
        router.push(`/courses/${course.data._id}`);
      } else {
        console.error("Error creating course:", course.error.details);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <TooltipProvider>
      <DropdownMenu modal={false}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Plus />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Create</TooltipContent>
        </Tooltip>
        <DropdownMenuContent>
          <DropdownMenuLabel>Create new</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {createItems.map((item) => (
            <DropdownMenuItem
              key={item.type}
              onClick={() => handleOpen(item.type)}
            >
              {item.icon}
              {item.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`Create new ${currentType}`}</DialogTitle>
            <DialogDescription>
              {`Create a new ${currentType} and start building your content!`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="justify-self-end">
                Title
              </Label>
              <Input
                placeholder="Discrete Math"
                spellCheck={false}
                id="title"
                className="col-span-3"
                value={submitting?.title}
                onChange={(e) => {
                  setSubmitting({
                    ...submitting,
                    title: e.target.value,
                  });
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="justify-self-end">
                Description
              </Label>
              <Textarea
                id="description"
                spellCheck={false}
                placeholder="Discrete mathematics is the study of mathematical structures that are countable or otherwise distinct and separable. Examples of structures that are discrete are combinations, graphs, and logical statements. Discrete structures can be finite or infinite."
                className="col-span-3 resize-none h-40 scrollbar"
                onChange={(e) => {
                  setSubmitting({
                    ...submitting,
                    description: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="submit">
              {isLoading ? <Loader className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
