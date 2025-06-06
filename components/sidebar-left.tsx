"use client";

import {
  Briefcase,
  Home,
  // LayoutDashboard,
  LibraryBig,
  Sparkles,
  // Book,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavConversations } from "@/components/nav-conversations";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavControls } from "./nav-controls";
import { NavCourses } from "./nav-courses";
// import { NavPinned } from "./nav-pinned";
// import { usePathname } from "next/navigation";
import { LessonCard as LessonInterface } from "@/interfaces/lesson";
import { Course as CourseInterface } from "@/interfaces/course";
import { processResponse } from "@/lib/response-process";
import { useEffect, useState } from "react";
import { NavLessons } from "./nav-lessons";
import { NavSkeleton } from "./skeleton/nav-skeleton";
import { useTranslations } from "next-intl";

// This is sample data.

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, open } = useSidebar();
  const t = useTranslations("common");
  // const pathname = usePathname();
  // const isChatPage =
  //   pathname.startsWith("/en/chat") || pathname.startsWith("/vi/chat");
  const [result, setResult] = useState<{
    courses: CourseInterface[];
    lessons: LessonInterface[];
  }>();
  const [isLoading, setIsLoading] = useState(true);

  const data = {
    navMain: [
      {
        title: t("home"),
        url: "/home",
        icon: Home,
      },
      {
        title: t("courses"),
        url: "/courses",
        icon: Briefcase,
      },
      // {
      //   title: "Pages",
      //   url: "/pages",
      //   icon: Book,
      // },
      {
        title: t("chat"),
        url: "/chat",
        icon: Sparkles,
      },
      // {
      //   title: "Dashboard",
      //   url: "/dashboard",
      //   icon: LayoutDashboard,
      // },
      {
        title: t("library"),
        url: "/library",
        icon: LibraryBig,
      },
    ],

    conversations: [
      {
        name: "Personal Life Management",
        emoji: "🏠",
        pages: [
          {
            name: "Daily Journal & Reflection",
            url: "#",
            emoji: "📔",
          },
          {
            name: "Health & Wellness Tracker",
            url: "#",
            emoji: "🍏",
          },
          {
            name: "Personal Growth & Learning Goals",
            url: "#",
            emoji: "🌟",
          },
        ],
      },
      {
        name: "Professional Development",
        emoji: "💼",
        pages: [
          {
            name: "Career Objectives & Milestones",
            url: "#",
            emoji: "🎯",
          },
          {
            name: "Skill Acquisition & Training Log",
            url: "#",
            emoji: "🧠",
          },
          {
            name: "Networking Contacts & Events",
            url: "#",
            emoji: "🤝",
          },
        ],
      },
      {
        name: "Creative Projects",
        emoji: "🎨",
        pages: [
          {
            name: "Writing Ideas & Story Outlines",
            url: "#",
            emoji: "✍️",
          },
          {
            name: "Art & Design Portfolio",
            url: "#",
            emoji: "🖼️",
          },
          {
            name: "Music Composition & Practice Log",
            url: "#",
            emoji: "🎵",
          },
        ],
      },
      {
        name: "Home Management",
        emoji: "🏡",
        pages: [
          {
            name: "Household Budget & Expense Tracking",
            url: "#",
            emoji: "💰",
          },
          {
            name: "Home Maintenance Schedule & Tasks",
            url: "#",
            emoji: "🔧",
          },
          {
            name: "Family Calendar & Event Planning",
            url: "#",
            emoji: "📅",
          },
        ],
      },
      {
        name: "Travel & Adventure",
        emoji: "🧳",
        pages: [
          {
            name: "Trip Planning & Itineraries",
            url: "#",
            emoji: "🗺️",
          },
          {
            name: "Travel Bucket List & Inspiration",
            url: "#",
            emoji: "🌎",
          },
          {
            name: "Travel Journal & Photo Gallery",
            url: "#",
            emoji: "📸",
          },
        ],
      },
    ],
  };

  const fetchData = async () => {
    const res = await fetch(`/api/data/get-limit-courses-and-lessons`, {
      method: "GET",
    });
    const response = await processResponse(res, {
      success: false,
      error: false,
    });

    if (response.success) {
      setResult(response.data);
    }
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <Sidebar collapsible="icon" className="border-r-0 z-40" {...props}>
      <SidebarHeader className="md:gap-0">
        <NavUser />
        {!isMobile && <NavControls isSidebarOpen={open} />}
        <NavMain items={data.navMain} />
      </SidebarHeader>

      <SidebarContent className="scrollbar">
        {isLoading ? (
          <NavSkeleton />
        ) : (
          <>
            {/* {isChatPage && (
              <NavConversations isChatPage conversations={data.conversations} />
            )} */}
            {/* <NavPinned conversations={data.conversations} /> */}
            {result?.lessons && result?.lessons.length > 0 && (
              <NavLessons lessons={result?.lessons} />
            )}
            {result?.courses && result?.courses.length > 0 && (
              <NavCourses courses={result?.courses} />
            )}
            {/* {!isChatPage && (
              <NavConversations conversations={data.conversations} />
            )} */}
          </>
        )}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
