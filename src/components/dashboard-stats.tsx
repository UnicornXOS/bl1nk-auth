// New component for dashboard statistics
import React from "react";
import { Card, CardBody, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: "primary" | "success" | "warning" | "danger";
  change?: number;
  subtitle?: string;
}

export function StatCard({ title, value, icon, color, change, subtitle }: StatCardProps) {
  const getColorClass = () => {
    switch (color) {
      case "primary": return "text-blue-500";
      case "success": return "text-green-500";
      case "warning": return "text-amber-500";
      case "danger": return "text-red-500";
      default: return "text-blue-500";
    }
  };

  const getBgClass = () => {
    switch (color) {
      case "primary": return "bg-blue-100";
      case "success": return "bg-green-100";
      case "warning": return "bg-amber-100";
      case "danger": return "bg-red-100";
      default: return "bg-blue-100";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardBody className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-default-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {subtitle && <p className="text-xs text-default-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${getBgClass()}`}>
            <Icon icon={icon} className={`w-6 h-6 ${getColorClass()}`} />
          </div>
        </div>
        
        {change !== undefined && (
          <div className="flex items-center mt-4">
            <Icon 
              icon={change >= 0 ? "lucide:trending-up" : "lucide:trending-down"} 
              className={change >= 0 ? "text-green-500 w-4 h-4" : "text-red-500 w-4 h-4"} 
            />
            <span className={`text-xs ml-1 ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {Math.abs(change)}% {change >= 0 ? "increase" : "decrease"}
            </span>
            <span className="text-xs text-default-400 ml-1">vs last month</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Cost Savings"
        value="$35,420"
        icon="lucide:dollar-sign"
        color="success"
        change={12.5}
        subtitle="This month"
      />
      <StatCard
        title="API Requests"
        value="1.2M"
        icon="lucide:activity"
        color="primary"
        change={8.3}
        subtitle="Last 30 days"
      />
      <StatCard
        title="Cache Hit Rate"
        value="42.8%"
        icon="lucide:database"
        color="warning"
        change={3.7}
        subtitle="Avg. efficiency"
      />
      <StatCard
        title="Context Reduction"
        value="68.5%"
        icon="lucide:scissors"
        color="danger"
        change={5.2}
        subtitle="Token optimization"
      />
    </div>
  );
}