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
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
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
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { SheetDescription } from "./ui/sheet";

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
  const [emoji, setEmoji] = useState<string | null>("📖");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const isMobile = useIsMobile();
  const theme = useTheme();

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
        <DialogContent aria-describedby="create-dialog-description">
          <DialogHeader>
            <DialogTitle>{`Create new ${currentType}`}</DialogTitle>

            <SheetDescription className="sr-only">
              {`Create a new ${currentType} and start building your content!`}
            </SheetDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-8 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Title</FormLabel>
                      <div className="flex items-center gap-2">
                        <Dialog
                          open={isOpenEmoji}
                          onOpenChange={setIsOpenEmoji}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size={"icon"}
                              className="text-xl"
                              variant={"outline"}
                            >
                              {emoji}
                            </Button>
                          </DialogTrigger>
                          <DialogContent
                            aria-describedby="emoji-picker-description"
                            className="!max-w-90 w-auto sm:!max-w-200"
                          >
                            <DialogHeader>
                              <DialogTitle>Pick an emoji</DialogTitle>

                              <SheetDescription className="sr-only">
                                Select an emoji to represent your content
                              </SheetDescription>
                            </DialogHeader>
                            <div className="mx-auto scroll">
                              <Picker
                                data={data}
                                onEmojiSelect={(e: { native: string }) => {
                                  setEmoji(e.native);
                                  setIsOpenEmoji(!isOpenEmoji);
                                }}
                                theme={theme.theme}
                                perLine={isMobile ? 7 : 10}
                                previewPosition="none"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>

                        <FormControl>
                          <Input placeholder="Discrete Math" {...field} />
                        </FormControl>
                      </div>
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
          </Form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
