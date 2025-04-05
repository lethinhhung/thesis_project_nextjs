"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const formSchema = z
    .object({
      username: z
        .string()
        .min(2, {
          message: "username_required",
        })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: "username_contain",
        }),
      email: z.string().email({
        message: "email_required",
      }),
      password: z
        .string()
        .min(8, {
          message: "password_required",
        })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          {
            message: "password_contain",
          }
        ),
      confirmPassword: z.string().min(8, {
        message: "confirm_password_required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password_not_match",
      path: ["confirmPassword"],
    });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleBack = (
    e: ReactMouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    path?: string
  ) => {
    e.preventDefault();
    if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <Image
              width={1000}
              height={1000}
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">{"create_account"}</h1>
                  <p className="text-muted-foreground text-balance">
                    {"join_study"}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"username"}</FormLabel>
                      <FormControl>
                        <Input placeholder="user" {...field} />
                      </FormControl>
                      <FormDescription>
                        {"your_unique_display_name"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"password"}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{"use_strong_password"}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"confirm_password"}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{"re_enter_password"}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center text-sm">
                  {"already_have_account"}{" "}
                  <a
                    href="#"
                    className="underline underline-offset-4"
                    onClick={(e) => handleBack(e, "/login")}
                  >
                    {"sign_in"}
                  </a>
                </div>
                <div className="flex flex-row justify-between">
                  <Button variant={"secondary"} onClick={(e) => handleBack(e)}>
                    {"back"}
                  </Button>
                  <Button type="submit">{"submit"}</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
