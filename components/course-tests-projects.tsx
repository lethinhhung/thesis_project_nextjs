"use client";

import { Settings } from "lucide-react";
import SortButton from "./sort-button";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import CourseTestsChart from "./course-tests-chart";

const testsData = [
  { test: "Essay", score: 9, date: "1/1/2021" },
  { test: "Mid-term", score: 8, date: "1/3/2021" },
  { test: "End-term", score: 10, date: "1/5/2021" },
];

function CourseTestsProjects() {
  return (
    <div className="w-full flex p-2 md:p-4 flex-col gap-4">
      <div className="w-full flex justify-between items-center sticky top-16">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tests & Projects
        </h4>
        <div className="flex gap-2 items-center">
          <SortButton variant={"secondary"} />

          <Button>new</Button>
        </div>
      </div>
      <div className="w-full flex grid grid-cols-1 sm:px-2 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Tests</CardTitle>
              <Button size={"sm"} variant={"ghost"}>
                <Settings />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CourseTestsChart data={testsData} />
          </CardContent>
          <CardContent className="space-y-4">
            {testsData.map((test, index) => (
              <Card key={index} className="p-4">
                <div className="flex flex-row items-center justify-between">
                  <CardHeader className="px-2">
                    <CardTitle>{test.test}</CardTitle>
                    <CardDescription>{test.date}</CardDescription>
                  </CardHeader>
                  <div className="px-2">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                      {test.score}
                    </h2>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Projects</CardTitle>
              <Button size={"sm"} variant={"ghost"}>
                <Settings />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4"></CardContent>
        </Card>
      </div>
    </div>
  );
}
export default CourseTestsProjects;
