"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Test as TestInterface } from "@/interfaces/test";
import { Card, CardContent, CardFooter } from "./ui/card";

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function CourseTestsChart({ data }: { data: TestInterface[] }) {
  return (
    <Card>
      <CardContent className="px-4">
        <ChartContainer
          config={chartConfig}
          className="min-h-30 max-h-50 w-full"
        >
          <LineChart className="p-1" accessibilityLayer data={data}>
            <CartesianGrid vertical />
            <XAxis
              dataKey="title"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
              interval="preserveStartEnd"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type={"natural"}
              strokeWidth={2}
              dataKey="score"
              fill="var(--chart-1)"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Total ${data.length} tests`}
        </div>
        <div className="leading-none text-muted-foreground">
          {`Average score: ${(
            data.reduce((acc, test) => acc + test.score, 0) / data.length
          ).toFixed(2)}`}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CourseTestsChart;
