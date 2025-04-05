"use client";

import { Send, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function ChatSmall() {
  return (
    <div className="bg-secondary">
      <ScrollArea className="h-80 px-2">
        <div className="flex flex-col gap-2 py-2 space-y-2">
          <div className="w-full pl-6 flex justify-end">
            <div className="flex flex-col space-y-2 items-end flex-wrap bg-background word-break break-all border border-dashed p-2 rounded-lg">
              <div>What is the capital of France and US?</div>
              <User size={12} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex flex-wrap word-break break-all">
              The capital of France is Paris and the capital of US is Washington
              D.C.
            </div>
          </div>
          <div className="w-full pl-6 flex justify-end">
            <div className="flex flex-col space-y-2 items-end flex-wrap bg-background word-break break-all border border-dashed p-2 rounded-lg">
              <div>What is the capital of France and US?</div>
              <User size={12} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex flex-wrap word-break break-all">
              The capital of France is Paris and the capital of US is Washington
              D.C.
            </div>
          </div>
          <div className="w-full pl-6 flex justify-end">
            <div className="flex flex-col space-y-2 items-end flex-wrap bg-background word-break break-all border border-dashed p-2 rounded-lg">
              <div>What is the capital of France and US?</div>
              <User size={12} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex flex-wrap word-break break-all">
              The capital of France is Paris and the capital of US is Washington
              D.C.
            </div>
          </div>
          <div className="w-full pl-6 flex justify-end">
            <div className="flex flex-col space-y-2 items-end flex-wrap bg-background word-break break-all border border-dashed p-2 rounded-lg">
              <div>What is the capital of France and US?</div>
              <User size={12} />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex flex-wrap word-break break-all">
              The capital of France is Paris and the capital of US is Washington
              D.C.
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="flex gap-1 px-2 pt-2">
        <Input className="border-foreground" />
        <Button size={"icon"}>
          <Send />
        </Button>
      </div>
    </div>
  );
}
export default ChatSmall;
