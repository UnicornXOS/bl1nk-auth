// New component for cost savings chart
import React from "react";
import { Card, CardBody, CardHeader, Divider, Tabs, Tab } from "@heroui/react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

const data = [
  { name: "Jan", original: 42000, optimized: 12600, saved: 29400 },
  { name: "Feb", original: 38000, optimized: 11400, saved: 26600 },
  { name: "Mar", original: 45000, optimized: 13500, saved: 31500 },
  { name: "Apr", original: 40000, optimized: 12000, saved: 28000 },
  { name: "May", original: 43000, optimized: 12900, saved: 30100 },
  { name: "Jun", original: 48000, optimized: 14400, saved: 33600 },
  { name: "Jul", original: 50000, optimized: 15000, saved: 35000 },
];

export function CostSavingsChart() {
  const [selected, setSelected] = React.useState("monthly");
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cost Savings Analysis</h3>
          <Tabs 
            aria-label="Time period" 
            size="sm" 
            color="primary"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
            variant="light"
          >
            <Tab key="weekly" title="Weekly" />
            <Tab key="monthly" title="Monthly" />
            <Tab key="yearly" title="Yearly" />
          </Tabs>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="pt-4 pb-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorOriginal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Area
                type="monotone"
                dataKey="original"
                name="Original Cost"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorOriginal)"
              />
              <Area
                type="monotone"
                dataKey="optimized"
                name="Optimized Cost"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorOptimized)"
              />
              <Area
                type="monotone"
                dataKey="saved"
                name="Savings"
                stroke="#ffc658"
                fillOpacity={1}
                fill="url(#colorSaved)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}