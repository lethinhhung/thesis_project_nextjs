"use client";

import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

function ButtonWithBadge({
  isBadgeVisible,
  badgeColor,
  size,
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isBadgeVisible?: boolean;
    badgeColor?: string;
  }) {
  return (
    <Button
      size={size}
      variant={variant}
      className={cn("relative", className)}
      {...props}
    >
      {children}
      <div
        hidden={!isBadgeVisible}
        className={cn(
          "w-1 h-1 absolute top-1 right-1 rounded-full",
          badgeColor
        )}
      ></div>
    </Button>
  );
}
export default ButtonWithBadge;
