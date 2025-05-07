"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, MailOpen } from "lucide-react";
import { DeleteButton } from "@/components/delete-document-button";
import { Mail as MailInterface } from "@/interfaces/mail";

function MailPreview({ mail }: { mail: MailInterface | null }) {
  return (
    <div className="w-full min-h-full relative flex">
      {mail ? (
        <ScrollArea className="h-full w-full rounded-xl">
          <Card className="hidden lg:flex w-full sticky top-0 left-0 z-10 rounded-xl border border-dashed shadow-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle>{mail?.from}</CardTitle>
              {mail?.title}
              <CardDescription>{mail?.date}</CardDescription>
              <div className="flex justify-end gap-2">
                <Button size={"icon"} variant={"ghost"}>
                  {mail?.status ? <MailOpen /> : <Mail />}
                </Button>
                <DeleteButton variant={"ghost"} type="mail" />
              </div>
            </CardHeader>
          </Card>

          <div className="w-full flex flex-col gap-2 py-2">
            <Card className="border border-dashed flex flex-col gap-2 shadow-none">
              <CardContent>{mail?.content}</CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex items-center justify-center w-full h-full gap-2">
          <MailOpen />
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Select a mail to preview
          </h4>
        </div>
      )}
    </div>
  );
}

export default MailPreview;
