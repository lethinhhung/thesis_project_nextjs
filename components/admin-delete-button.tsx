"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function AdminDeleteButton({ userId }: { userId: string }) {
  const handleDelete = async () => {
    const response = await fetch(`/api/user/delete/${userId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      window.location.reload();
    } else {
      toast.error("Failed to delete user");
    }
  };

  return (
    <Button variant={"destructive"} onClick={() => handleDelete()}>
      Delete
    </Button>
  );
}
