"use client";

import { ArrowRight, Github } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DarkModeSwitcher } from "./dark-mode-switcher";
import { LanguageSwitcher } from "./language-switcher";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="w-full h-16 flex items-center justify-between px-4">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Notebok
      </h4>

      <div className="flex items-center gap-2">
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                href={"https://github.com/lethinhhung/thesis_project_nextjs"}
              >
                <Button variant={"ghost"} size={"sm"}>
                  <Github />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Frontend Repo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                href={"https://github.com/lethinhhung/thesis_project_backend"}
              >
                <Button variant={"ghost"} size={"sm"}>
                  <Github />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Backend Repo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                href={"https://lethinhhung.vercel.app/projects"}
              >
                <Button variant={"ghost"} size={"sm"}>
                  <Github />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>More details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DarkModeSwitcher variant={"ghost"} size={"sm"} />
        <LanguageSwitcher variant={"ghost"} size={"sm"} />
        <Separator orientation="vertical" className="!h-8 mr-2" />
        <Button onClick={() => router.push("/home")} size={"sm"}>
          <p className="hidden sm:flex">Home</p>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
