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
import { Textarea } from "./ui/textarea";
import { DatePickerPopover } from "./date-picker-popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";

export function CreateNewTestProject({
  courseId,
  refetchData,
  variant,
  size,
}: {
  courseId: string;
  refetchData?: () => Promise<void>;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reset = (e: boolean) => {
    setOpen(e);
    setTimeout(() => {
      setIsLoading(false);
      testForm.reset();
      projectForm.reset();
    }, 100);
  };

  const testSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
    description: z.string().min(1, {
      message: "Description required",
    }),
    //any date
    date: z.date(),
    score: z.number().min(0, {
      message: "Score required",
    }),
  });

  // 1. Define your form.
  const testForm = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      score: 0,
    },
  });

  const projectSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
    description: z.string().min(1, {
      message: "Description required",
    }),
    status: z.boolean(),
  });

  // 1. Define your form.
  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: false,
    },
  });

  const onTestSubmit = async (values: z.infer<typeof testSchema>) => {
    setIsLoading(true);
    const submitting = {
      ...values,
      date: values.date.toISOString(),
    };
    try {
      const res = await fetch(`/api/test/create/${courseId}`, {
        method: "POST",
        body: JSON.stringify(submitting),
      });

      await processResponse(res);
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      if (refetchData) refetchData();
      reset(false);
    }
  };

  const onProjectSubmit = async (values: z.infer<typeof projectSchema>) => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/project/create/${courseId}`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      await processResponse(res);
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      if (refetchData) refetchData();
      reset(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        reset(e);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={variant} size={size} onClick={() => setOpen(true)}>
          new
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="create-dialog-description">
        <DialogHeader>
          <DialogTitle>{`Create new`}</DialogTitle>

          <SheetDescription className="sr-only">
            {`Create new`}
          </SheetDescription>
        </DialogHeader>

        <Tabs defaultValue="test">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="test">Test</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
          </TabsList>
          <TabsContent value="test">
            <Form {...testForm}>
              <form onSubmit={testForm.handleSubmit(onTestSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={testForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Title</FormLabel>

                        <FormControl>
                          <Input placeholder="Test" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={testForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Description</FormLabel>

                        <FormControl>
                          <Textarea
                            spellCheck={false}
                            placeholder="Test description"
                            {...field}
                            className="col-span-3 resize-none h-18 scrollbar"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 w-full">
                    <FormField
                      control={testForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="grid gap-3 flex-1">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <DatePickerPopover
                              date={field.value}
                              setDate={(date) => field.onChange(date)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={testForm.control}
                      name="score"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel>Score</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              max={10}
                              step={0.01}
                              placeholder="Score (0-10)"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
          </TabsContent>
          <TabsContent value="project">
            <Form {...projectForm}>
              <form onSubmit={projectForm.handleSubmit(onProjectSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={projectForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Title</FormLabel>

                        <FormControl>
                          <Input placeholder="Project" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={projectForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>Description</FormLabel>

                        <FormControl>
                          <Textarea
                            spellCheck={false}
                            placeholder="Project description"
                            {...field}
                            className="col-span-3 resize-none h-18 scrollbar"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={projectForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel>
                          Completed{" "}
                          <p className="text-sm text-muted-foreground">No</p>
                        </FormLabel>

                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
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
          </TabsContent>
        </Tabs>

        {/* <Form {...projectForm}>
              <form onSubmit={projectForm.handleSubmit(onDocumentSubmit)}>
                <div className="flex flex-col gap-8 py-4">
                  <FormField
                    control={projectForm.control}
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
                    control={projectForm.control}
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
            </Form> */}
      </DialogContent>
    </Dialog>
  );
}
