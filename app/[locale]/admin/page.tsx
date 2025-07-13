import { getAllUsersAPI, getSystemStatsAPI } from "@/lib/services/user.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/interfaces/user";
import { SystemStats } from "@/interfaces/system-stats";
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
import {
  Info,
  Trash,
  Users,
  BookOpen,
  FileText,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  PuzzleIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { notFound } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "admin") {
    return notFound();
  }

  // Fetch both users and system stats
  const [usersResponse, statsResponse] = await Promise.all([
    getAllUsersAPI(session?.accessToken || ""),
    getSystemStatsAPI(session?.accessToken || ""),
  ]);

  const users: User[] = usersResponse.data.data.users;
  const stats: SystemStats = statsResponse.data.data;

  return (
    <div>
      <AdminNav />
      <div className="p-4 space-y-6">
        {/* System Statistics */}
        <div className="max-w-4xl mx-auto">
          {/* <h2 className="text-2xl font-bold mb-4">System Statistics</h2> */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Total users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">Total courses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lessons</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLessons}</div>
                <p className="text-xs text-muted-foreground">Total lessons</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDocuments}</div>
                <p className="text-xs text-muted-foreground">Total documents</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tests</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTests}</div>
                <p className="text-xs text-muted-foreground">Total tests</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Projects</CardTitle>
                <PuzzleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProjects}</div>
                <p className="text-xs text-muted-foreground">Total projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chats</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalChats}</div>
                <p className="text-xs text-muted-foreground">Total chats</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Users Table */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Users Management</CardTitle>
            <CardDescription>Manage all users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Total {users.length}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Username</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">
                    Create at
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-bold">{user.username}</TableCell>
                    <TableCell
                      className="text-sm text-muted-foreground hidden
                      sm:table-cell"
                    >
                      {user.email}
                    </TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
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
