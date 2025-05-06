"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Course as CourseInterface } from "@/interfaces/course";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "./ui/button";
import { SheetDescription } from "./ui/sheet";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Textarea } from "./ui/textarea";
import { Loader } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";
import Image from "next/image";
import { toast } from "sonner";

export function EditCourse({
  openEdit,
  setOpenEdit,
  course,
  fetchCourse,
}: {
  openEdit: boolean;
  setOpenEdit: (open: boolean) => void;
  course?: CourseInterface;
  fetchCourse: () => void;
}) {
  const [emoji, setEmoji] = useState<string | null>(
    course?.customization.emoji || "📚"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<string | null>(null);
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
      title: course?.title || "",
      description: course?.description || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting...", values);
    setIsLoading(true);
    const submitting = {
      ...values,
      aiGenerated: false,
      emoji: emoji,
    };
    try {
      const res = await fetch(`/api/course/update-details/${course?._id}`, {
        method: "PATCH",
        body: JSON.stringify(submitting),
      });

      const response = await processResponse(res);

      if (response.success) {
      } else {
        form.reset();
        console.error("Error creating course:", response.error.details);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      form.reset();
      setOpenEdit(false);
      setCover(null);
      setIsLoading(false);
      fetchCourse();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const url = URL.createObjectURL(file);
      setFile(file);
      setCover(url);
    }
  };

  const handleUpdateImage = async () => {
    if (!file || !cover) {
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.error("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    try {
      const form = new FormData();

      if (file) {
        form.append("image", file);
      }

      const res = await fetch(`/api/course/update-cover/${course?._id}`, {
        method: "PATCH",
        body: form,
      });

      await processResponse(res);
    } catch (error) {
      console.error("Error updating profile:", error);
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.error("Failed to update profile");
    } finally {
      setFile(null);
      setCover(null);
      setIsLoading(false);
      fetchCourse();
      setOpenEdit(false);
    }
  };

  return (
    <Dialog
      open={openEdit}
      onOpenChange={(e) => {
        setOpenEdit(e);
        setCover(null);
        setFile(null);
      }}
    >
      <DialogContent aria-describedby="create-dialog-description">
        <DialogHeader>
          <DialogTitle>{`Edit course`}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="cover">Cover</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
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
                    onClick={() => setOpenEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="min-w-32" type="submit">
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Update details"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="cover" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Image
                className="w-full h-80 object-cover rounded-md dark:brightness-[0.7]"
                src={cover ? cover : "/placeholder.svg"}
                alt="cover"
                width={600}
                height={300}
              />
              <Input
                id="avatar"
                type="file"
                className="col-span-3"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  setOpenEdit(false);
                  setCover(null);
                  setFile(null);
                }}
              >
                Cancel
              </Button>
              <Button className="min-w-32" onClick={handleUpdateImage}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update cover"
                )}
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
