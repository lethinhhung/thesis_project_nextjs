"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", completed: 4, ongoing: 1 },
  { month: "February", completed: 2, ongoing: 5 },
  { month: "March", completed: 2, ongoing: 1 },
  { month: "April", completed: 6, ongoing: 3 },
  { month: "May", completed: 1, ongoing: 2 },
  { month: "June", completed: 4, ongoing: 5 },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  ongoing: {
    label: "Ongoing",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig;

// interface TotalBarChartProps extends React.ComponentProps<"div"> {
//   className: string;
//   chartData: [
//     {
//       month: string;
//       completed: number;
//       ongoing: number;
//     }
//   ];
// }

export function TotalBarChart() {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="tracking-tight text-sm font-normal">Total courses</div>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">15</div>
          <CardDescription>January - June 2024</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="completed"
              stackId="a"
              fill="var(--color-completed)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="ongoing"
              stackId="a"
              fill="var(--color-ongoing)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
