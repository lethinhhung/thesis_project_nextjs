"use client";

import {
  Settings,
  User,
  Home,
  Briefcase,
  Sparkles,
  LayoutDashboard,
  LibraryBig,
  Book,
  Inbox,
  // Plus,
  // Library,
  Loader,
  Languages,
  Sun,
  Moon,
  SunMoon,
  NotebookText,
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
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { processResponse } from "@/lib/response-process";
import { Course as CourseInterface } from "@/interfaces/course";
import { LessonCard as LessonInterface } from "@/interfaces/lesson";
import { format } from "date-fns";
import { enUS as en } from "date-fns/locale/en-US";
import { vi } from "date-fns/locale/vi";
import { useLocale } from "next-intl";
import { Document as DocumentInterface } from "@/interfaces/document";
import { useTheme } from "next-themes";

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

// const actionsItems = [
//   {
//     title: "New course",
//     url: "/courses",
//     icon: Briefcase,
//     action: <Plus />,
//   },
//   { title: "New page", url: "/pages", icon: Book, action: <Plus /> },
//   {
//     title: "New document",
//     url: "/library",
//     icon: Library,
//     action: <Plus />,
//   },
//   {
//     title: "New chat",
//     url: "/chat",
//     icon: Sparkles,
//     action: <Plus />,
//   },
// ];

const languages = [
  { code: "en", name: "English" },
  { code: "vi", name: "Tiếng Việt" },
];

export default function SearchBarDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [result, setResult] = useState<{
    courses: CourseInterface[];
    lessons: LessonInterface[];
    documents: DocumentInterface[];
  }>({
    courses: [],
    lessons: [],
    documents: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const locale = useLocale();
  const dateFnsLocales = {
    vi,
    en,
  };

  const currentDateFnsLocale = dateFnsLocales[locale as "vi" | "en"] || vi;

  const initialLocale = useLocale();
  const [localeLang, setLocaleLang] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [icon, setIcon] = useState(<Sun />);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setLocaleLang(initialLocale);
  }, [initialLocale]);

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

  useEffect(() => {
    setIcon(
      theme === "light" ? <Sun /> : theme === "dark" ? <Moon /> : <SunMoon />
    );
  }, [theme]);

  const handleModeSwitch = () => {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    );
  };

  const handleClick = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const handleLangSwitch = () => {
    const newLocale = localeLang === "en" ? "vi" : "en";
    setLocaleLang(newLocale);

    const pathWithoutLocale = pathname.replace(/^\/(en|vi)/, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.replace(newPath);
  };

  const handleSearch = (searchValue: string) => {
    setIsLoading(true);
    if (searchValue === "") {
      setIsLoading(false);
      return;
    }

    const fetchSearch = async () => {
      try {
        const res = await fetch(`/api/data/search?query=${searchValue}`, {
          method: "GET",
        });
        const response = await processResponse(res, {
          success: false,
          error: true,
        });

        if (response.success) {
          setResult({
            courses: response.data?.courses ?? [],
            lessons: response.data?.lessons ?? [],
            documents: response.data?.documents ?? [],
          });
        } else {
          console.error("Search failed:", response.error);
          setResult({ courses: [], lessons: [], documents: [] });
        }
      } catch (error) {
        console.error("Search error:", error);
        setResult({ courses: [], lessons: [], documents: [] });
      }
    };

    fetchSearch().finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchValue);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      {/* <CommandInput
        value={searchValue}
        onValueChange={(v) => {
          // Thay đổi logic xử lý input để loại bỏ khoảng trắng dư thừa
          const trimmedValue = v.replace(/\s+/g, " ").trim();
          setSearchValue(trimmedValue);
          if (trimmedValue === "") {
            setResult({ courses: [], lessons: [], documents: [] });
            return;
          }
          handleSearch(trimmedValue);
        }}
        placeholder="Search for everything..."
      /> */}

      <CommandInput
        value={searchValue}
        onValueChange={(v) => {
          const trimmedValue = v.trimStart();
          setSearchValue(trimmedValue);
        }}
        placeholder="Search for everything..."
      />

      <CommandList className="scrollbar max-h-100">
        {isLoading ? (
          <div className="flex w-full min-h-50 justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <>
            <CommandEmpty>No results found.</CommandEmpty>

            {result?.courses && result.courses.length > 0 && (
              <>
                <CommandGroup
                  heading={searchValue ? "Courses" : "Recent course results"}
                >
                  {result.courses.map((course) => (
                    <CommandItem
                      value={`${course.title} ${course.description}`}
                      onSelect={() => handleClick(`/courses/${course._id}`)}
                      key={course._id}
                    >
                      <span>{course.customization.emoji}</span>
                      <span className="break-all line-clamp-1">
                        {course.title}
                      </span>
                      <CommandShortcut>
                        {format(new Date(course?.createdAt), "P", {
                          locale: currentDateFnsLocale,
                        })}
                      </CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {result?.lessons && result.lessons.length > 0 && (
              <>
                <CommandGroup
                  heading={searchValue ? "Lessons" : "Recent lesson results"}
                >
                  {result.lessons.map((lesson) => (
                    <CommandItem
                      value={`${lesson.title} ${lesson.courseId.title}`}
                      onSelect={() =>
                        handleClick(
                          `/courses/${lesson.courseId._id}/lessons/${lesson._id}`
                        )
                      }
                      key={lesson._id}
                    >
                      <NotebookText />
                      <span className="break-all line-clamp-1">
                        {lesson.title}
                      </span>

                      <CommandShortcut className="max-w-30 sm:max-w-50 break-all line-clamp-1">
                        {lesson.courseId.title}
                      </CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {result?.documents && result.documents.length > 0 && (
              <>
                <CommandGroup
                  heading={
                    searchValue ? "Documents" : "Recent document results"
                  }
                >
                  {result.documents.map((document) => (
                    <CommandItem
                      value={`${document.title}`}
                      onSelect={() => handleClick(`/library`)}
                      key={document._id}
                    >
                      <span className="break-all line-clamp-1">
                        {document.title}
                      </span>

                      <CommandShortcut className="max-w-30 sm:max-w-50 break-all line-clamp-1">
                        {format(new Date(document?.createdAt), "P", {
                          locale: currentDateFnsLocale,
                        })}
                      </CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}
            {/* <CommandGroup heading="Documents">
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
            <CommandSeparator /> */}
            {/* <CommandGroup heading="Actions">
              {actionsItems.map((item) => (
                <CommandItem
                  onSelect={() => handleClick(item.url)}
                  key={item.url}
                >
                  <item.icon />
                  <span>{item.title}</span>
                  <CommandShortcut>{item.action}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator /> */}
            <CommandGroup heading="Navigation">
              {navigattionItems.map((item) => (
                <CommandItem
                  onSelect={() => handleClick(item.url)}
                  key={item.url}
                >
                  <item.icon />
                  <span>{item.title}</span>
                  <CommandShortcut>{item.url}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Controls">
              <CommandItem
                value="appearance dark light mode"
                onSelect={() => handleModeSwitch()}
              >
                {icon}
                <span>Appearance</span>
                <CommandShortcut className="flex items-center">
                  {theme === "light"
                    ? "Light"
                    : theme === "dark"
                    ? "Dark"
                    : "System"}
                </CommandShortcut>
              </CommandItem>
              <CommandItem
                value="languages english vietnamese"
                onSelect={() => handleLangSwitch()}
              >
                <Languages />
                <span>Languagues</span>
                <CommandShortcut className="flex items-center">
                  <p>{languages.find((lang) => lang.code === locale)?.name}</p>
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
