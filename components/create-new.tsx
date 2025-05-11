"use client";

import {
  // Book,
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
import { getDocumentMeta } from "@/lib/getDocumentMeta";
import { Badge } from "./ui/badge";
import { Tag } from "lucide-react";

const createItems = [
  { title: "Course", type: "course", icon: <Briefcase /> },
  { title: "Tag", type: "tag", icon: <Tag /> },
  // { title: "Page", type: "page", icon: <Book /> },
  { title: "Document", type: "document", icon: <LibraryBig /> },
  { title: "Chat", type: "chat", icon: <Sparkles /> },
];

export function CreateNew() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>("📖");
  const [document, setDocument] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const isMobile = useIsMobile();
  const theme = useTheme();

  const reset = (e: boolean) => {
    setIsOpen(e);
    setTimeout(() => {
      setCurrentType(null);
      setEmoji("📖");
      setDocument(null);
      setIsLoading(false);
      courseForm.reset();
      documentForm.reset();
    }, 100);
  };

  const courseFormSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
    description: z.string().min(1, {
      message: "Description required",
    }),
  });

  // 1. Define your form.
  const courseForm = useForm<z.infer<typeof courseFormSchema>>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const tagFormSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
  });

  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const documentFormSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
    document: z
      .instanceof(File)
      .refine((document) => !!document && document.size > 0, {
        message: "File is required",
      })
      .refine((document) => document.size <= 50 * 1024 * 1024, {
        message: "File size must be less than 50MB",
      })
      .refine(
        (document) =>
          [
            "application/pdf", // .pdf
            // "application/msword", // .doc
            // "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            // "application/vnd.ms-excel", // .xls
            // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
            // "application/vnd.ms-powerpoint", // .ppt
            // "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
            // "text/plain", // .txt
            // "text/markdown", // .md
            // "application/rtf", // .rtf
          ].includes(document.type),
        {
          message:
            // "Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, MD, and RTF files are allowed",
            "Only PDF file is allowed",
        }
      ),
  });

  // 1. Define your form.
  const documentForm = useForm<z.infer<typeof documentFormSchema>>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      title: "",
      document: undefined,
    },
  });

  const handleOpen = (type: string) => {
    if (type == "chat") {
      router.push("/chat?new-chat=true");
      return;
    }
    setCurrentType(type);
    console.log(`Creating new ${type}`);
    setIsOpen(true);
  };

  const onCourseSubmit = async (values: z.infer<typeof courseFormSchema>) => {
    setIsLoading(true);
    const submitting = {
      ...values,
      aiGenerated: false,
      emoji: emoji,
    };
    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        body: JSON.stringify(submitting),
      });

      const response = await processResponse(res);

      if (response.success) {
        router.push(`/courses/${response.data._id}`);
      } else {
        console.error("Error creating course:", response.error.details);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      reset(false);
    }
  };

  const onTagSubmit = async (values: z.infer<typeof tagFormSchema>) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tag/create", {
        method: "POST",
        body: JSON.stringify(values),
      });

      await processResponse(res, {
        success: true,
        error: true,
      });
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      reset(false);
    }
  };

  const onDocumentSubmit = async (
    values: z.infer<typeof documentFormSchema>
  ) => {
    setIsLoading(true);
    const submitting = new FormData();
    submitting.append("title", values.title);
    submitting.append("document", values.document);

    try {
      const res = await fetch("/api/document/create", {
        method: "POST",
        body: submitting,
      });

      const response = await processResponse(res);

      if (response.success) {
        router.push("/library");
      } else {
        console.error("Error creating document:", response.error.details);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      reset(false);
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
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          reset(e);
        }}
      >
        <DialogContent aria-describedby="create-dialog-description">
          <DialogHeader>
            <DialogTitle>{`Create new ${currentType}`}</DialogTitle>

            <SheetDescription className="sr-only">
              {`Create a new ${currentType} and start building your content!`}
            </SheetDescription>
          </DialogHeader>
          {currentType == "course" && (
            <Form {...courseForm}>
              <form onSubmit={courseForm.handleSubmit(onCourseSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={courseForm.control}
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
                            <Input
                              spellCheck={false}
                              placeholder="Discrete Math"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={courseForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Description</FormLabel>

                        <FormControl>
                          <Textarea
                            spellCheck={false}
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
                    onClick={() => {
                      reset(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="min-w-20" type="submit">
                    {isLoading ? <Loader className="animate-spin" /> : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          {currentType == "tag" && (
            <Form {...tagForm}>
              <form onSubmit={tagForm.handleSubmit(onTagSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={tagForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Title</FormLabel>

                        <FormControl>
                          <Input
                            spellCheck={false}
                            placeholder="React"
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
                    onClick={() => {
                      reset(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="min-w-20" type="submit">
                    {isLoading ? <Loader className="animate-spin" /> : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}

          {currentType == "document" && (
            <Form {...documentForm}>
              <form onSubmit={documentForm.handleSubmit(onDocumentSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={documentForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            spellCheck={false}
                            placeholder="Document title"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={documentForm.control}
                    name="document"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>
                          Document file
                          {document && (
                            <Badge>
                              {" "}
                              {getDocumentMeta(document?.name ?? null)?.type}
                            </Badge>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setDocument(file);

                              field.onChange(file);
                            }}
                          />
                        </FormControl>
                        {document && (
                          <div className="flex w-full items-center justify-end">
                            <p className="text-sm text-muted-foreground">{`${(
                              document.size /
                              (1024 * 1024)
                            ).toFixed(2)} MB`}</p>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      reset(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="min-w-20" type="submit">
                    {isLoading ? <Loader className="animate-spin" /> : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
