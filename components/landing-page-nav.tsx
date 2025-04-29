"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="w-full h-16 flex items-center justify-between px-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Notebok
      </h4>
      <Button onClick={() => router.push("/home")}>
        Home <ArrowRight />
      </Button>
    </div>
  );
}
