"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Home,
  Briefcase,
  Sparkles,
  LayoutDashboard,
  LibraryBig,
  Book,
  Inbox,
  Plus,
  Library,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import LanguageSwitcher from "./language-switcher";
import { DarkModeSwitcher } from "./dark-mode-switcher";

const navigattionItems = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Courses", url: "/courses", icon: Briefcase },
  { title: "Pages", url: "/pages", icon: Book },
  { title: "Chat", url: "/chat", icon: Sparkles },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Library", url: "/library", icon: LibraryBig },
  { title: "Account", url: "/account", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Inbox", url: "/inbox", icon: Inbox },
];

const actionsItems = [
  {
    title: "New course",
    url: "/courses",
    icon: Briefcase,
    action: <Plus />,
  },
  { title: "New page", url: "/pages", icon: Book, action: <Plus /> },
  {
    title: "New document",
    url: "/library",
    icon: Library,
    action: <Plus />,
  },
  {
    title: "New chat",
    url: "/chat",
    icon: Sparkles,
    action: <Plus />,
  },
];

export default function SearchBarDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, open]);

  const router = useRouter();

  const handleClick = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for everything..." />
      <CommandList className="scrollbar max-h-100">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Courses">
          <CommandItem>
            <Calendar />
            <span>React</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Node.js</span>
          </CommandItem>
          <CommandItem>
            <Calculator />
            <span>AI</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Documents">
          <CommandItem>
            <User />
            <span>Javascript</span>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Embedding vectors</span>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Blockchain</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Pages">
          <CommandItem>
            <User />
            <span>Javascript basics</span>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Chapter 2: Digged in</span>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Chapter 1: Introduction</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          {actionsItems.map((item) => (
            <CommandItem onSelect={() => handleClick(item.url)} key={item.url}>
              <item.icon />
              <span>{item.title}</span>
              <CommandShortcut>{item.action}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Navigation">
          {navigattionItems.map((item) => (
            <CommandItem onSelect={() => handleClick(item.url)} key={item.url}>
              <item.icon />
              <span>{item.title}</span>
              <CommandShortcut>{item.url}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Controls">
          <CommandItem value="appearance dark light mode">
            <span>Appearance</span>
            <CommandShortcut className="flex items-center">
              <DarkModeSwitcher className="w-4 h-4" variant={"ghost"} />
            </CommandShortcut>
          </CommandItem>
          <CommandItem value="languages english vietnamese">
            <span>Languagues</span>
            <CommandShortcut className="flex items-center">
              {/* <LanguageSwitcher className="w-4 h-4" variant={"ghost"} /> */}
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
