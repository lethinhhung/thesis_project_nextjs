"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import "./[locale]/globals.css";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            404
          </h1>
          <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/home">
            <Button>
              <Home /> Go back to home
            </Button>
          </Link>
        </div>
      </body>
    </html>
  );
}
