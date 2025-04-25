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
import { Edit, Loader } from "lucide-react";
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
import { useEffect, useState } from "react";
import { User } from "@/interfaces/user";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { processResponse } from "@/lib/response-process";

interface UpdateData {
  name?: string;
  bio?: string;
  avatar?: File | null;
}

function Settings() {
  const { data: session, update } = useSession();
  const [userData, setUserData] = useState<User>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updateData, setUpdateData] = useState<UpdateData>();
  const [isDialogLoading, setIsDialogLoading] = useState(false);

  const user = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "guest@email.com",
    // You can add a default avatar or handle null case
    avatar: session?.user?.image || "/placeholder.svg",
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUpdateData((prev) => ({
        ...prev,
        avatar: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async () => {
    setIsDialogLoading(true);
    try {
      const form = new FormData();
      if (updateData?.avatar) {
        form.append("avatar", updateData?.avatar);
      }
      form.append("name", updateData?.name || "");
      form.append("bio", updateData?.bio || "");

      const res = await fetch(`/api/user/update-profile`, {
        method: "PUT",
        body: form,
      });

      // const res = await response.json();
      // if (!res.success) {
      //   setIsDialogOpen(false);
      //   toast.error("Error fetching user data");
      //   fetchUserData();
      // } else {
      //   await update();
      //   setIsDialogOpen(false);
      //   toast.success("Profile updated successfully");
      //   fetchUserData();
      // }

      await processResponse(res);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsDialogOpen(false);
      fetchUserData();
      await update();

      setIsDialogLoading(false);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/user/profile");
    const response = await processResponse(res, {
      success: false,
      error: true,
    });

    if (response.success) {
      setUserData(response.data);
      setUpdateData({
        name: response.data.profile.name,
        bio: response.data.profile.bio,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center mx-auto h-full w-full max-w-3xl rounded-xl">
      <div className="flex w-full items-center justify-between">
        {isLoading ? (
          <div className="flex w-full items-center p-2 md:p-4 gap-4">
            <Skeleton className="w-12 h-12 md:w-18 md:h-18 rounded-full aspect-square" />

            <Skeleton className="w-full h-13" />
          </div>
        ) : (
          <>
            <div className="flex w-full items-center p-2 md:p-4 gap-4">
              <Avatar className="w-12 h-12 md:w-18 md:h-18 rounded-full">
                <AvatarImage
                  src={userData?.profile?.avatar || user.avatar}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="rounded-full">
                  {userData?.profile?.name.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                {userData?.username || user.name} |{" "}
                {userData?.profile?.name || user.name}
                <p className="text-sm text-muted-foreground">
                  {userData?.email || user.email}
                </p>
              </h3>
            </div>
            <div className="flex items-center gap-2 p-2 md:p-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      <Input
                        placeholder="handsome"
                        spellCheck={false}
                        value={updateData?.name}
                        id="name"
                        className="col-span-3"
                        onChange={(e) =>
                          setUpdateData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="avatar" className="justify-self-end">
                        Avatar
                      </Label>
                      <Input
                        id="avatar"
                        type="file"
                        className="col-span-3"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="justify-self-end">
                        About
                      </Label>
                      <Textarea
                        id="description"
                        value={updateData?.bio}
                        spellCheck={false}
                        placeholder="Tell us about yourself..."
                        className="col-span-3 resize-none h-40 scrollbar"
                        onChange={(e) =>
                          setUpdateData((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      className="w-full sm:w-32"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      {isDialogLoading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </div>
      {isLoading ? (
        <div className="w-full p-4">
          <Skeleton className="w-full h-50" />
        </div>
      ) : (
        <>
          <div className="flex p-4 w-full flex-col border border-dashed rounded-xl">
            <p className="text-sm text-muted-foreground">About</p>
            <p className="p-2 w-full">{userData?.profile?.bio || ""}</p>
          </div>
          <Card className="w-full shadow-none border border-dashed">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default Settings;
