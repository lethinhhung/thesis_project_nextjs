"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { processResponse } from "@/lib/response-process";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { LessonWithContent } from "@/interfaces/lesson";

export function EditLesson({
  openEdit,
  setOpenEdit,
  lesson,
  fetchLesson,
}: {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  lesson: LessonWithContent;
  fetchLesson: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title required",
    }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: lesson.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const submitting = {
      ...values,
    };
    try {
      const res = await fetch(`/api/lesson/update/${lesson._id}`, {
        method: "PATCH",
        body: JSON.stringify(submitting),
      });

      const response = await processResponse(res);

      if (response.success) {
      } else {
        console.error("Error updating lesson:", response.error.details);
      }
    } catch (error) {
      console.error("Error updating lesson:", error);
    } finally {
      form.reset();
      setOpenEdit(false);
      setIsLoading(false);
      fetchLesson();
    }
  };

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
      <DialogContent aria-describedby="create-dialog-description">
        <DialogHeader>
          <DialogTitle>{`Edit course`}</DialogTitle>
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
                      <Input placeholder="Discrete Math" {...field} />
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
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </Button>
              <Button className="min-w-32" type="submit">
                {isLoading ? <Loader className="animate-spin" /> : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
