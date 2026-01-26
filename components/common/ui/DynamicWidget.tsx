"use client";

import { ReactNode, useEffect, useState } from "react";

interface DynamicWidgetProps {
  children: ReactNode;
  title: string;
  updateInterval?: number;
  className?: string;
}

const DynamicWidget = ({
  children,
  title,
  updateInterval = 30000,
  className = "",
}: DynamicWidgetProps) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return (
    <div className={`dynamic-widget ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
      <div className="widget-content">{children}</div>
    </div>
  );
};

export default DynamicWidget;
