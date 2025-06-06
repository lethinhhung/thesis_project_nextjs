"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VariantProps } from "class-variance-authority";

// export function DarkModeSwitcher({
//   isSidebarOpen = true,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & { isSidebarOpen?: boolean }) {
//   const [icon, setIcon] = useState(<Sun />);
//   const { theme, setTheme } = useTheme();

//   useEffect(() => {
//     setIcon(
//       theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <SunMoon />
//     );
//   }, [theme]);

//   const handleSwitch = () => {
//     setTheme(
//       theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
//     );
//   };
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button {...props} onClick={handleSwitch}>
//             {icon}
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent side={isSidebarOpen ? "top" : "right"}>
//           <p>Change appearance</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }
export function DarkModeSwitcher({
  isSidebarOpen = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { isSidebarOpen?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [icon, setIcon] = useState(<Sun />);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIcon(
        theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <SunMoon />
      );
    }
  }, [theme, mounted]);

  if (!mounted) return null; // Avoid rendering during SSR

  const handleSwitch = () => {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...props} onClick={handleSwitch}>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={isSidebarOpen ? "top" : "right"}>
          <p>
            {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
