"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col gap-4 items-center mx-auto h-2000 w-full max-w-7xl rounded-xl">
      <div className="w-full flex">
        <Card className="w-full dark:border-dashed">
          <CardContent>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Welcome back to Notebok.
            </h2>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div className="w-full columns-sm space-y-4">
        <Card className="w-full break-inside-avoid-column dark:border-dashed">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>5 ongoing courses, 2 completed</CardDescription>
            </CardHeader>
            <div className="px-6">
              <Button size={"icon"} variant={"ghost"}>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="w-full break-inside-avoid-column">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Pages</CardTitle>
              <CardDescription>20 pages, 5 folders</CardDescription>
            </CardHeader>
            <div className="px-6">
              <Button size={"icon"} variant={"ghost"}>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="w-full break-inside-avoid-column">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <div className="px-6">
              <Button size={"icon"} variant={"ghost"}>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="w-full break-inside-avoid-column">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Library</CardTitle>
              <CardDescription>10 documents processed</CardDescription>
            </CardHeader>
            <div className="px-6">
              <Button size={"icon"} variant={"ghost"}>
                <ArrowRight />
              </Button>
            </div>
          </div>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Home;
