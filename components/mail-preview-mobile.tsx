"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, MailOpen } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import MailPreview from "./mail-preview";
import { Mail as MailInterface } from "@/interfaces/mail";
import DeleteButton from "./delete-document-button";

function MailPreviewMobile({
  mail,
  open,
  onOpenChange,
}: {
  mail: MailInterface | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} autoFocus={open}>
      <DrawerContent>
        <div className="flex justify-between w-full">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-1">
                  {mail?.title} {mail?.status && <CheckCircle2 size={"1rem"} />}
                </div>
              </div>
            </DrawerTitle>
            <DrawerDescription>{mail?.date}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 gap-2 flex items-center">
            <DeleteButton type="mail" variant={"ghost"} />

            <Button variant={"ghost"} size={"icon"}>
              {mail?.status ? <MailOpen /> : <Mail />}
            </Button>
          </div>
        </div>
        <div className="flex p-2 justify-center overflow-y-auto h-full w-full">
          <div className="max-w-xl">
            <MailPreview mail={mail} />
          </div>
        </div>
        <DrawerFooter className="flex">
          <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default MailPreviewMobile;
