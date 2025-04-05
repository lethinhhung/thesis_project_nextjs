"use client";

import * as React from "react";
import {
  Briefcase,
  Home,
  LayoutDashboard,
  LibraryBig,
  Sparkles,
  Book,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavConversations } from "@/components/nav-conversations";
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
import { NavPinned } from "./nav-pinned";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "kongtrua",
    email: "thung260803@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: Briefcase,
    },
    {
      title: "Pages",
      url: "/pages",
      icon: Book,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: Sparkles,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Library",
      url: "/library",
      icon: LibraryBig,
    },
  ],

  courses: [
    {
      name: "Data Science & Statistical Analysis",
      url: "/courses/hehe",
      emoji: "📊",
    },
    {
      name: "Mechanical Engineering & Product Design",
      url: "/courses/hehe",
      emoji: "⚙️",
    },
    {
      name: "Biotechnology & Biomedical Science",
      url: "/courses/hehe",
      emoji: "🧬",
    },
    {
      name: "Business Management & Corporate Strategy",
      url: "/courses/hehe",
      emoji: "🏢",
    },
    {
      name: "Personal Finance & Stock Market Investment",
      url: "/courses/hehe",
      emoji: "💰",
    },
    {
      name: "Digital Marketing & Brand Management",
      url: "/courses/hehe",
      emoji: "📈",
    },
    {
      name: "Photography & Professional Editing",
      url: "/courses/hehe",
      emoji: "📷",
    },
    {
      name: "Music Composition & Audio Production",
      url: "/courses/hehe",
      emoji: "🎵",
    },
    {
      name: "Graphic Design with Photoshop & Illustrator",
      url: "/courses/hehe",
      emoji: "🎨",
    },
    {
      name: "Creative Writing & Storytelling",
      url: "/courses/hehe",
      emoji: "✍️",
    },
    {
      name: "Fitness Training & Strength Workouts",
      url: "/courses/hehe",
      emoji: "💪",
    },
    {
      name: "English Communication & IELTS Preparation",
      url: "/courses/hehe",
      emoji: "🗣️",
    },
    {
      name: "Critical Thinking & Problem Solving",
      url: "/courses/hehe",
      emoji: "🧐",
    },
    {
      name: "Time Management & Productivity",
      url: "/courses/hehe",
      emoji: "⏳",
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

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { isMobile, open } = useSidebar();
  const pathname = usePathname();
  const isChatPage = pathname.startsWith("/chat");
  return (
    <Sidebar collapsible="icon" className="border-r-0 z-40" {...props}>
      <SidebarHeader className="md:gap-0">
        <NavUser />
        {!isMobile && <NavControls isSidebarOpen={open} />}
        <NavMain items={data.navMain} />
      </SidebarHeader>
      {
        <SidebarContent className="scrollbar">
          {isChatPage && (
            <NavConversations isChatPage conversations={data.conversations} />
          )}
          <NavPinned conversations={data.conversations} />
          <NavCourses courses={data.courses} />
          {!isChatPage && (
            <NavConversations conversations={data.conversations} />
          )}
        </SidebarContent>
      }
      <SidebarRail />
    </Sidebar>
  );
}
