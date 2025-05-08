"use client";

import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DownloadDocumentButton({
  documentId,
  variant = "ghost",
}: {
  documentId: string;
  variant?: "ghost" | "outline";
}) {
  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/document/download/${documentId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      const filename =
        contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
        "document";

      // Create blob from response
      const blob = await response.blob();

      // Create temporary download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      const audio = new Audio("/notification.mp3");
      audio.play();
      toast.error("Failed to download file");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleDownload} size="icon" variant={variant}>
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
