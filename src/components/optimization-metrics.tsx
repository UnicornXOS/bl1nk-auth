// New component for optimization metrics
import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip 
} from "recharts";

const data = [
  { name: "Caching", value: 40, color: "#0088FE" },
  { name: "Context Pruning", value: 25, color: "#00C49F" },
  { name: "Token Compression", value: 20, color: "#FFBB28" },
  { name: "Smart Routing", value: 15, color: "#FF8042" },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function OptimizationMetrics() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">Optimization Breakdown</h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <Divider className="my-4" />
        
        <div className="text-sm text-default-600">
          <p className="mb-2">
            <span className="font-medium">Total Optimization Rate:</span> 70% cost reduction
          </p>
          <p>
            Caching provides the highest savings at 40%, followed by context pruning at 25%. 
            Further optimizations through token compression and smart routing contribute an 
            additional 35% in cost reduction.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}