"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Search } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function Pages({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mx-auto h-full w-full max-w-7xl rounded-xl">
      <Tabs defaultValue="pages" className="w-full">
        <Collapsible className="flex flex-wrap gap-1 sm:gap-2 items-center sticky top-18 z-10 transition-all duration-300 pr-26">
          <TabsList className="">
            <TabsTrigger onClick={() => router.push("/pages")} value="pages">
              Pages
            </TabsTrigger>
            <TabsTrigger
              onClick={() => router.push("/pages/folders")}
              value="folder"
            >
              Folder
            </TabsTrigger>
          </TabsList>

          <CollapsibleTrigger asChild>
            <Button size={"icon"} variant={"secondary"} className="rounded-lg">
              <Search />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="">
            <Input
              placeholder={"Search"}
              autoFocus
              className="border-dashed bg-secondary"
            />
          </CollapsibleContent>
        </Collapsible>
        {children}
      </Tabs>
    </div>
  );
}

export default Pages;
