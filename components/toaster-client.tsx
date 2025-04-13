"use client";

import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

export default function ToasterClient() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={
        theme === "light" || theme === "dark" || theme === "system"
          ? theme
          : undefined
      }
    />
  );
}
