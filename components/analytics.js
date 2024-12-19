"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "Camp001", ammunitions: 186, soldiers: 80 },
  { month: "Camp002", ammunitions: 305, soldiers: 200 },
  { month: "Camp003", ammunitions: 237, soldiers: 120 },
  { month: "Camp004", ammunitions: 73, soldiers: 190 },
  { month: "Camp005", ammunitions: 209, soldiers: 130 },
  { month: "Camp006", ammunitions: 214, soldiers: 140 },
]

const chartConfig = {
  desktop: {
    label: "Ammunitions",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Soldiers",
    color: "hsl(var(--chart-2))",
  },
} 

export function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>Camps</CardDescription>
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
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="soldiers" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="ammunitions" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      
        <div className="leading-none text-muted-foreground">
          Showing total ammunitions and soldiers.
        </div>
      </CardFooter>
    </Card>
  )
}
