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
import { useParams, useRouter } from "next/navigation";
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

export function CreateNewSmall({ type }: { type: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const courseId = params.courseId as string;

  const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
        form.reset();
        router.push(`/courses/${courseId}/lessons/${lesson.data._id}`);
      } else {
        form.reset();
        console.error("Error creating lesson:", lesson.error.details);
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>new</Button>
        </DialogTrigger>
        <DialogContent aria-describedby="create-dialog-description">
          <DialogHeader>
            <DialogTitle>{`Create new ${type}`}</DialogTitle>

            <SheetDescription className="sr-only">
              {`Create a new ${type}`}
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
    </>
  );
}
