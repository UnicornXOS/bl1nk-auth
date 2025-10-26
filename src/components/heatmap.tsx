// New component for heatmap visualization
import React from "react";
import { Card, CardBody, CardHeader, Divider, Tabs, Tab } from "@heroui/react";
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis,
  Tooltip, 
  Cell,
  Rectangle
} from "recharts";

// Sample data for the heatmap
const generateData = () => {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  days.forEach((day, dayIndex) => {
    hours.forEach((hour) => {
      // Generate random values with higher probability during business hours
      let value;
      if (hour >= 9 && hour <= 17 && dayIndex < 5) {
        // Business hours on weekdays
        value = Math.floor(Math.random() * 80) + 20; // 20-100
      } else if ((hour >= 7 && hour <= 22) && dayIndex < 5) {
        // Extended hours on weekdays
        value = Math.floor(Math.random() * 50) + 10; // 10-60
      } else {
        // Off hours
        value = Math.floor(Math.random() * 30); // 0-30
      }
      
      data.push({
        day: dayIndex,
        hour,
        value
      });
    });
  });
  
  return data;
};

const apiUsageData = generateData();
const cachingData = generateData();
const costData = generateData();

// Custom tooltip for the heatmap
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const formattedHour = `${data.hour}:00 - ${data.hour + 1}:00`;
    
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium">{days[data.day]}, {formattedHour}</p>
        <p className="text-sm text-gray-600">Value: <span className="font-medium">{data.value}</span></p>
      </div>
    );
  }
  
  return null;
};

// Custom heatmap cell component
const HeatmapCell = (props) => {
  const { x, y, width, height, value } = props;
  
  // Calculate color based on value (0-100)
  const getColor = (value) => {
    // From light blue to dark blue
    if (value < 20) return '#EBF5FB';
    if (value < 40) return '#AED6F1';
    if (value < 60) return '#5DADE2';
    if (value < 80) return '#2E86C1';
    return '#1B4F72';
  };
  
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={getColor(value)}
      className="transition-all duration-300 hover:opacity-80"
    />
  );
};

export function Heatmap() {
  const [selected, setSelected] = React.useState("api-usage");
  
  const getData = () => {
    switch (selected) {
      case "api-usage":
        return apiUsageData;
      case "caching":
        return cachingData;
      case "cost":
        return costData;
      default:
        return apiUsageData;
    }
  };
  
  const getTitle = () => {
    switch (selected) {
      case "api-usage":
        return "API Usage Heatmap";
      case "caching":
        return "Cache Hit Rate Heatmap";
      case "cost":
        return "Cost Distribution Heatmap";
      default:
        return "Heatmap";
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{getTitle()}</h3>
          <Tabs 
            aria-label="Heatmap data" 
            size="sm" 
            color="primary"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
            variant="light"
          >
            <Tab key="api-usage" title="API Usage" />
            <Tab key="caching" title="Caching" />
            <Tab key="cost" title="Cost" />
          </Tabs>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="pt-4 pb-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                type="number" 
                dataKey="hour" 
                name="Hour" 
                domain={[0, 23]}
                tickCount={12}
                tick={{ fontSize: 12 }}
                label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="day" 
                name="Day" 
                domain={[0, 6]} 
                tickCount={7}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][value]}
                label={{ value: 'Day of Week', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis 
                type="number"
                dataKey="value"
                range={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter 
                data={getData()} 
                shape={<HeatmapCell />}
              >
                {getData().map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center items-center mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#EBF5FB]"></div>
            <span className="text-xs ml-1 mr-3">Low</span>
            <div className="w-4 h-4 bg-[#AED6F1]"></div>
            <div className="w-4 h-4 bg-[#5DADE2]"></div>
            <div className="w-4 h-4 bg-[#2E86C1]"></div>
            <div className="w-4 h-4 bg-[#1B4F72]"></div>
            <span className="text-xs ml-1">High</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}