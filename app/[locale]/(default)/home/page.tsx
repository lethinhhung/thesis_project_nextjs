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
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 p-4 items-center mx-auto w-full max-w-7xl rounded-xl">
      <div className="flex w-full justify-start">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {`Welcome back ${session?.user?.name}`}
        </h3>
      </div>

      {/* <div className="w-full">
        <TotalBarChart />
      </div> */}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Go to all courses</CardTitle>
          <CardDescription>To view all courses</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button size={"sm"} onClick={() => router.push("/courses")}>
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Go to chat</CardTitle>
          <CardDescription>To start a new chat</CardDescription>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button size={"sm"} onClick={() => router.push("/chat")}>
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Go to library</CardTitle>
          <CardDescription>To view all ducments</CardDescription>
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
