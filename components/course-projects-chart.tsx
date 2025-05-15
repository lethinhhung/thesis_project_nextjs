"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Project } from "@/interfaces/project";

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  ongoing: {
    label: "Ongoing",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function CourseProjectsChart({ projects }: { projects: Project[] }) {
  const chartData = [
    {
      completed: projects.filter((p) => p.status).length,
      ongoing: projects.filter((p) => !p.status).length,
    },
  ];

  const totalProjects = chartData[0].completed + chartData[0].ongoing;

  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-40">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            cx="50%"
            cy="65%"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalProjects.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Projects
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="ongoing"
              fill="var(--color-ongoing)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-completed)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <CardFooter className="flex-col gap-2 text-sm">
          {/* <div className="flex items-center gap-2 font-medium leading-none">
          {`Total ${totalProjects.toLocaleString()} projects`}
        </div> */}
          <div className="leading-none text-muted-foreground">{`Completed: ${chartData[0].completed}`}</div>
          <div className="leading-none text-muted-foreground">{`Ongoing: ${chartData[0].ongoing}`}</div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
