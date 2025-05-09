"use client";

import { Loader } from "lucide-react";
import { Button } from "./ui/button";
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
import { SheetDescription } from "./ui/sheet";
import { getDocumentMeta } from "@/lib/getDocumentMeta";
import { Badge } from "./ui/badge";

export function CreateNewSmall({
  type,
  courseId,
  lessonId,
  refetchData,
}: {
  type: "lesson" | "document";
  courseId?: string;
  lessonId?: string;
  refetchData?: () => Promise<void>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<File | null>(null);

  const reset = (e: boolean) => {
    setOpen(e);
    setTimeout(() => {
      setDocument(null);
      setIsLoading(false);
      lessonForm.reset();
      documentForm.reset();
    }, 100);
  };

  const lessonSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
  });

  // 1. Define your form.
  const lessonForm = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
    },
  });

  const documentSchema = z.object({
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
            "application/msword", // .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            "application/vnd.ms-excel", // .xls
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
            "application/vnd.ms-powerpoint", // .ppt
            "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
            "text/plain", // .txt
            "text/markdown", // .md
            "application/rtf", // .rtf
          ].includes(document.type),
        {
          message:
            "Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, MD, and RTF files are allowed",
        }
      ),
  });

  // 1. Define your form.
  const documentForm = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      document: undefined,
    },
  });

  const onLessonSubmit = async (values: z.infer<typeof lessonSchema>) => {
    console.log("Submitting...", values);
    setIsLoading(true);
    const submitting = {
      ...values,
      aiGenerated: false,
    };
    try {
      const res = await fetch(`/api/lesson/create/${courseId}`, {
        method: "POST",
        body: JSON.stringify(submitting),
      });

      const lesson = await processResponse(res);
      if (lesson.success) {
        router.push(`/courses/${courseId}/lessons/${lesson.data._id}`);
      } else {
        console.error("Error creating lesson:", lesson.error.details);
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      if (refetchData) refetchData();
      reset(false);
    }
  };

  const onDocumentSubmit = async (values: z.infer<typeof documentSchema>) => {
    console.log("Submitting...", values);
    setIsLoading(true);
    const submitting = new FormData();
    submitting.append("title", values.title);
    submitting.append("document", values.document);
    if (lessonId) {
      submitting.append("lessonId", lessonId);
    }
    if (courseId) {
      submitting.append("courseId", courseId);
    }
    try {
      const res = await fetch("/api/document/create", {
        method: "POST",
        body: submitting,
      });

      const response = await processResponse(res);

      if (response.success) {
      } else {
        console.error("Error creating document:", response.error.details);
      }
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      if (refetchData) refetchData();
      reset(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          reset(e);
        }}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>new</Button>
        </DialogTrigger>
        <DialogContent aria-describedby="create-dialog-description">
          <DialogHeader>
            <DialogTitle>{`Create new ${type} for this course`}</DialogTitle>

            <SheetDescription className="sr-only">
              {`Create a new ${type}`}
            </SheetDescription>
          </DialogHeader>
          {type == "lesson" && (
            <Form {...lessonForm}>
              <form onSubmit={lessonForm.handleSubmit(onLessonSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={lessonForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Title</FormLabel>

                        <FormControl>
                          <Input placeholder="Introduction" {...field} />
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

          {type == "document" && (
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
    </>
  );
}
