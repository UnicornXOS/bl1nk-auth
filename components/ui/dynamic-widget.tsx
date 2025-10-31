'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface DynamicWidgetProps {
  children: ReactNode;
  title: string;
  updateInterval?: number;
  className?: string;
}

const DynamicWidget = ({
  children,
  title,
  updateInterval = 30000, // 30 seconds
  className = ''
}: DynamicWidgetProps) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`dynamic-widget ${className}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
      <div className="widget-content">
        {children}
      </div>
    </motion.div>
  );
};

export default DynamicWidget;