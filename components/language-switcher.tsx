"use client";

import { Languages } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "vi", name: "Tiếng Việt" },
];

// export function LanguageSwitcher({
//   isSidebarOpen = true,
//   ...props
// }: React.ComponentProps<"button"> &
//   VariantProps<typeof buttonVariants> & { isSidebarOpen?: boolean }) {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const handleSwitch = () => {
//     const newLocale = locale === "en" ? "vi" : "en";

//     // Xử lý để loại bỏ locale hiện tại khỏi pathname
//     const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";
//     const newPath = `/${newLocale}${pathWithoutLocale}`;

//     router.replace(newPath);
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <Button {...props} onClick={handleSwitch}>
//             <Languages />
//           </Button>
//         </TooltipTrigger>
//         <TooltipContent side={isSidebarOpen ? "top" : "right"}>
//           <p>Current: {languages.find((lang) => lang.code === locale)?.name}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

export function LanguageSwitcher({
  isSidebarOpen = true,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { isSidebarOpen?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const initialLocale = useLocale();
  const [locale, setLocale] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    setLocale(initialLocale);
  }, [initialLocale]);

  if (!mounted || !locale) return null; // Avoid rendering during SSR

  const handleSwitch = () => {
    const newLocale = locale === "en" ? "vi" : "en";
    setLocale(newLocale);

    const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.replace(newPath);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...props} onClick={handleSwitch}>
            <Languages />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={isSidebarOpen ? "top" : "right"}>
          <p>Current: {languages.find((lang) => lang.code === locale)?.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
