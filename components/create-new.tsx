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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

  const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
    description: z.string().min(1, {
      message: "Description required",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleOpen = (type: string) => {
    setCurrentType(type);
    console.log(`Creating new ${type}`);
    setOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting...", values);
    setIsLoading(true);
    const submitting = {
      ...values,
      aiGenerated: false,
    };
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
        <Form {...form}>
          <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>{`Create new ${currentType}`}</DialogTitle>
                <DialogDescription>
                  {`Create a new ${currentType} and start building your content!`}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-8 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Discrete Math" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Description</FormLabel>

                      <FormControl>
                        <Textarea
                          className="resize-none h-40 scrollbar"
                          placeholder="Discrete mathematics is the study of mathematical structures that are countable or otherwise distinct and separable. Examples of structures that are discrete are combinations, graphs, and logical statements. Discrete structures can be finite or infinite."
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="min-w-20" type="submit">
                  {isLoading ? <Loader className="animate-spin" /> : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Form>
      </Dialog>
    </TooltipProvider>
  );
}
