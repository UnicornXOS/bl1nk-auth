// New component for API usage metrics
import React from "react";
import { Card, CardBody, CardHeader, Divider, Progress, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ApiProviderProps {
  name: string;
  logo: string;
  usage: number;
  limit: number;
  color: string;
}

function ApiProvider({ name, logo, usage, limit, color }: ApiProviderProps) {
  const percentage = Math.round((usage / limit) * 100);
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon icon={logo} className="w-5 h-5" />
          <span className="font-medium">{name}</span>
        </div>
        <div className="text-sm text-default-500">
          {usage.toLocaleString()} / {limit.toLocaleString()} tokens
        </div>
      </div>
      <Progress 
        value={percentage} 
        color={color as "primary" | "success" | "warning" | "danger"} 
        size="sm"
        className="mb-1"
      />
      <div className="flex justify-between text-xs text-default-400">
        <span>{percentage}% used</span>
        <span>{(limit - usage).toLocaleString()} tokens remaining</span>
      </div>
    </div>
  );
}

export function ApiUsage() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <h3 className="text-lg font-semibold">API Usage</h3>
      </CardHeader>
      <Divider />
      <CardBody>
        <ApiProvider 
          name="OpenAI" 
          logo="logos:openai-icon" 
          usage={750000} 
          limit={1000000} 
          color="primary" 
        />
        <ApiProvider 
          name="Anthropic" 
          logo="logos:anthropic" 
          usage={320000} 
          limit={500000} 
          color="success" 
        />
        <ApiProvider 
          name="Voyage AI" 
          logo="lucide:box" 
          usage={80000} 
          limit={200000} 
          color="warning" 
        />
        <ApiProvider 
          name="Gemini" 
          logo="logos:google-icon" 
          usage={150000} 
          limit={500000} 
          color="danger" 
        />
        
        <Divider className="my-4" />
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Free Tier Status</span>
          <Chip color="success" variant="flat" size="sm">Active</Chip>
        </div>
      </CardBody>
    </Card>
  );
}