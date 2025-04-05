"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        404
      </h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link href="/home">
        <Button>
          <Home /> Go back to home
        </Button>
      </Link>
    </div>
  );
}
