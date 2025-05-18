"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  return (
    <div className="flex flex-col gap-4 items-center mx-auto w-full max-w-7xl rounded-xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Home page</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  );
}

export default Home;
