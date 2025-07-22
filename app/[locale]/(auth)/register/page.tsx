"use client";

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
import { MouseEvent as ReactMouseEvent, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { signIn } from "next-auth/react";
import { processResponse } from "@/lib/response-process";
import { Loader } from "lucide-react";

function Register() {
  const router = useRouter();
  const t = useTranslations("register");
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z
    .object({
      username: z
        .string()
        .min(2, {
          message: t("username_required"),
        })
        .regex(/^[a-zA-Z0-9_]+$/, {
          message: t("username_contain"),
        }),
      email: z.string().email({
        message: t("email_required"),
      }),
      password: z
        .string()
        .min(8, {
          message: t("password_required"),
        })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          {
            message: t("password_contain"),
          }
        ),
      confirmPassword: z.string().min(8, {
        message: t("confirm_password_required"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("password_not_match"),
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
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
      const data = await processResponse(res);

      if (data.data) {
        await signIn("credentials", {
          username: data.data.username,
          password: values.password,
          redirect: false,
          callbackUrl: "/home",
        });
        router.push("/home");
      }

      // nếu ok thì làm gì đó
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
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
    <div className={"flex flex-col gap-6"}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <Image
              width={1000}
              height={1000}
              src="/cover.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">{t("create_account")}</h1>
                  <p className="text-muted-foreground text-balance">
                    {t("join_study")}
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("username")}</FormLabel>
                      <FormControl>
                        <Input placeholder="user" {...field} />
                      </FormControl>
                      <FormDescription>
                        {t("your_unique_display_name")}
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
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("use_strong_password")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirm_password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("re_enter_password")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center text-sm">
                  {t("already_have_account")}{" "}
                  <a
                    href="#"
                    className="underline underline-offset-4"
                    onClick={(e) => handleBack(e, "/login")}
                  >
                    {t("sign_in")}
                  </a>
                </div>
                <div className="flex flex-row justify-end">
                  {/* <Button
                    type="button"
                    variant={"secondary"}
                    onClick={(e) => handleBack(e)}
                  >
                    {t("back")}
                  </Button> */}
                  <Button type="submit" className="min-w-20">
                    {isLoading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      t("submit")
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
