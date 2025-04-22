"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Settings() {
  const { data: session } = useSession();

  const user = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "",
    // You can add a default avatar or handle null case
    avatar: session?.user?.image || "/images/avatar.png",
  };
  return (
    <div className="flex flex-col gap-4 items-center mx-auto h-full w-full max-w-3xl rounded-xl">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center p-2 md:p-4 gap-4">
          <Avatar className="w-12 h-12 md:w-18 md:h-18 rounded-full">
            <AvatarImage className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
            <AvatarFallback className="rounded-full">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {user.name}
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </h3>
        </div>
        <div className="flex items-center gap-2 p-2 md:p-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogDescription>
                  {
                    "Make changes to your profile here. Click save when you're done."
                  }
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="justify-self-end">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="justify-self-end">
                    Avatar
                  </Label>
                  <Input id="picture" type="file" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="justify-self-end">
                    About
                  </Label>
                  <Textarea
                    spellCheck={false}
                    placeholder="Tell us about yourself..."
                    className="col-span-3 resize-none h-40 scrollbar"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex p-4 flex-col border border-dashed rounded-xl">
        <p className="text-sm text-muted-foreground">About</p>
        <p className="p-2">
          The king, seeing how much happier his subjects were, realized the
          error of his ways and repealed the joke tax.
        </p>
      </div>
      <Card className="w-full shadow-none border border-dashed">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default Settings;
