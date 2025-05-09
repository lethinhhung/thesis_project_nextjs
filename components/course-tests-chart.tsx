"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  score: {
    label: "Score",
    color: "#2563eb",
  },
} satisfies ChartConfig;

function CourseTestsChart({
  data,
}: {
  data: { test: string; score: number }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="min-h-30 max-h-50 w-full">
      <LineChart className="p-1" accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="test"
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
          fill="var(--color-score)"
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
  );
}

export default CourseTestsChart;
