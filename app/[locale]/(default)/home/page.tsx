"use client";

import { Button } from "@/components/ui/button";
// import { TotalBarChart } from "@/components/total-bar-chart";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("home");

  if (status === "loading") {
    return (
      <Skeleton className="flex flex-col gap-4 p-4 items-center mx-auto w-full max-w-7xl rounded-xl" />
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 items-center mx-auto w-full max-w-7xl rounded-xl">
      <div className="flex w-full justify-start">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {`${t("welcome")} ${session?.user?.name}`}
        </h3>
      </div>

      {/* <div className="w-full">
        <TotalBarChart />
      </div> */}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("courses")}</CardTitle>
          <CardDescription>{t("view_courses")}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button size={"sm"} onClick={() => router.push("/courses")}>
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("chat")}</CardTitle>
          <CardDescription>{t("view_chat")}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button size={"sm"} onClick={() => router.push("/chat")}>
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("library")}</CardTitle>
          <CardDescription>{t("view_library")}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button size={"sm"} onClick={() => router.push("/library")}>
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;
