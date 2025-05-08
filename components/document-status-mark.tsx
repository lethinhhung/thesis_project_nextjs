import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

export function DocumentStatusMark({
  status,
  className,
}: {
  status: "processing" | "completed" | "failed";
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn(className)}>
          {status === "processing" && (
            <Loader2 className="animate-spin" size={16} />
          )}
          {status === "completed" && <CheckCircle2 size={16} />}
          {status === "failed" && <XCircle size={16} />}
        </TooltipTrigger>
        <TooltipContent>
          {status === "processing" && "Processing"}
          {status === "completed" && "Completed"}
          {status === "failed" && "Failed"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
