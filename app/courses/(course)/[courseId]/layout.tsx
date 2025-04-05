"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartColumnIncreasing,
  Folder,
  Image,
  MoreHorizontal,
  Search,
  Sparkles,
  SquareLibrary,
  TableOfContents,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import SortButton from "@/components/sort-button";
import CourseDashboard from "@/components/course-dashboard";
import CourseLessons from "@/components/course-lessons";
import CourseDocument from "@/components/course-document";
import CourseTestsProjects from "@/components/course-tests-projects";
import { useParams, useRouter } from "next/navigation";

const badges = [
  { title: "Math" },
  { title: "Physics" },
  { title: "Chemistry" },
  { title: "Biology" },
  { title: "Computer Science" },
];

function Course({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { courseId } = useParams();
  const tabTop = useRef<HTMLDivElement | null>(null);
  const [tab, setTab] = useState("dashboard");

  const scrollToTabTop = () => {
    const navbarHeight = 56;
    if (tabTop.current) {
      const topOffset =
        tabTop.current.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto h-full w-full max-w-7xl rounded-xl">
      <div className="w-full flex p-2 md:p-4 flex-col gap-4 border-b border-dashed">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent
            className={
              "text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            }
          >
            <div className="flex mb-4">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="inset-0 h-[30vh] w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CollapsibleContent>
          <div className="flex justify-between items-center">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {"Javascript in web development" + (isExpanded ? " 💻" : "")}
              <p className="text-sm text-muted-foreground">12/10/2021</p>
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <CollapsibleTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Image />
                </Button>
              </CollapsibleTrigger>
              <Button size={"icon"} variant={"ghost"}>
                <MoreHorizontal />
              </Button>
            </div>
          </div>
        </Collapsible>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge
              onClick={() => console.log(badge.title)}
              variant={"secondary"}
              className="cursor-pointer"
              key={badge.title}
            >
              {badge.title}
            </Badge>
          ))}
        </div>
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </div>

      <Tabs
        value={tab}
        onValueChange={setTab}
        ref={tabTop}
        defaultValue="dashboard"
        className="w-full py-4"
      >
        <Collapsible className="flex flex-wrap gap-1 sm:gap-2 items-center mx-2 md:mx-4 sticky top-16 z-10 transition-all duration-300 pr-26">
          <TabsList>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}`);
                scrollToTabTop();
              }}
              value="dashboard"
            >
              <ChartColumnIncreasing />
              <div className="hidden lg:flex">Dashboard</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/lessons`);
                scrollToTabTop();
              }}
              value="lessons"
            >
              <TableOfContents />
              <div className="hidden lg:flex">Lessons</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/documents`);
                scrollToTabTop();
              }}
              value="documents"
            >
              <SquareLibrary />
              <div className="hidden lg:flex">Documents</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/tests`);
                scrollToTabTop();
              }}
              value="tests"
            >
              <Folder />
              <div className="hidden lg:flex">Tests & Projects</div>
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push(`/courses/${courseId}/ask-ai`);
                scrollToTabTop();
              }}
              value="ask"
            >
              <Sparkles />
              <div className="hidden lg:flex">Ask AI</div>
            </TabsTrigger>
          </TabsList>

          <CollapsibleTrigger asChild>
            <Button size={"icon"} variant={"secondary"} className="rounded-lg">
              <Search />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="">
            <Input
              placeholder={"Search"}
              autoFocus
              className="border-dashed bg-secondary"
            />
          </CollapsibleContent>
        </Collapsible>
        {/* <TabsContent value="dashboard">
          <CourseDashboard
            lessons={lessons}
            documents={documents}
            setTab={setTab}
            scrollToTabTop={scrollToTabTop}
          />
        </TabsContent>
        <TabsContent className="" value="lessons">
          <CourseLessons lessons={lessons} />
        </TabsContent>
        <TabsContent className="" value="documents">
          <CourseDocument documents={documents} />
        </TabsContent>
        <TabsContent className="" value="tests">
          <CourseTestsProjects />
        </TabsContent>
        <TabsContent value="ask">
          <div className="w-full flex p-2 md:p-4 flex-col gap-4">
            <div className="w-full flex justify-between items-center sticky top-16">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Ask AI
              </h4>
              <div className="flex gap-2 items-center">
                <SortButton variant={"secondary"} />

                <Button>new</Button>
              </div>
            </div>
            <div className="w-full flex grid grid-col-1 sm:px-2 md:grid-cols-2 2xl:grid-cols-3 gap-4">
              Content
            </div>
          </div>
        </TabsContent> */}
        {children}
      </Tabs>
    </div>
  );
}

export default Course;
