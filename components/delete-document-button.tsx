"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// ...existing imports...
import { toast } from "sonner";

export function DeleteDocumentButton({
  variant,
  documentId,
  onDelete,
  fetchDocuments,
}: {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  documentId?: string;
  onDelete?: () => void;
  fetchDocuments: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!documentId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/document/delete/${documentId}`, {
        method: "DELETE",
      });

      const response = await res.json();

      if (response.success) {
        const audio = new Audio("/notification.mp3");
        audio.play();
        toast.success("Document deleted successfully");
        onDelete?.();
      } else {
        const audio = new Audio("/notification.mp3");
        audio.play();
        toast.error("Failed to delete document", {
          description: response.error.details,
        });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.error("Failed to delete document");
    } finally {
      setIsLoading(false);
      setOpen(false);
      fetchDocuments();
    }
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant={variant} size="icon" className="p-2">
                <Trash size={16} />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this document?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone, and all associated data will be
              permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={isLoading}
              className="min-w-20"
            >
              {isLoading ? <Loader className="animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
