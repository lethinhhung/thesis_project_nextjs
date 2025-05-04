import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export function CompletedMark({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CheckCircle2 className={cn(className)} size={size} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Completed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
