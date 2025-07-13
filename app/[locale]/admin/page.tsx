import { getAllUsersAPI } from "@/lib/services/user.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/interfaces/user";
import { AdminNav } from "@/components/admin-nav";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { notFound } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "admin") {
    return notFound();
  }
  const users: User[] = (await getAllUsersAPI(session?.accessToken || "")).data
    .data.users;

  return (
    <div>
      <AdminNav />
      <div className="p-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent>
            <Table>
              <TableCaption>Total {users.length}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Create at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-bold">{user.username}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size={"icon"} variant={"ghost"}>
                            <Info />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{user.username}</DialogTitle>
                            <DialogDescription>
                              {user.profile?.name}
                            </DialogDescription>
                          </DialogHeader>

                          <p className="text-sm">Email: {user.email}</p>

                          <p className="text-sm">Role: {user.role}</p>
                          <p className="text-sm">Bio: {user.profile?.bio}</p>
                          <p className="text-sm">
                            Created at:{" "}
                            {new Date(user.createdAt).toLocaleString()}
                          </p>
                          <p className="text-sm">
                            Updated at:{" "}
                            {new Date(user.updatedAt).toLocaleString()}
                          </p>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size={"icon"} variant={"destructive"}>
                            <Trash />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete {user.username}?</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this user? This
                              action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <AdminDeleteButton userId={user._id} />

                            <DialogClose asChild>
                              <Button>Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
