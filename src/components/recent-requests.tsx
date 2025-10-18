// New component for recent requests
import React from "react";
import { Card, CardBody, CardHeader, Divider, Chip, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const recentRequests = [
  {
    id: "req-001",
    timestamp: "2023-07-15 14:32:45",
    provider: "OpenAI",
    model: "gpt-4o",
    status: "completed",
    tokens: {
      input: 245,
      output: 1024,
      saved: 180
    }
  },
  {
    id: "req-002",
    timestamp: "2023-07-15 14:30:12",
    provider: "Anthropic",
    model: "claude-3-opus",
    status: "completed",
    tokens: {
      input: 512,
      output: 2048,
      saved: 350
    }
  },
  {
    id: "req-003",
    timestamp: "2023-07-15 14:28:55",
    provider: "OpenAI",
    model: "gpt-4o",
    status: "cached",
    tokens: {
      input: 180,
      output: 720,
      saved: 900
    }
  },
  {
    id: "req-004",
    timestamp: "2023-07-15 14:25:30",
    provider: "Gemini",
    model: "gemini-pro",
    status: "error",
    tokens: {
      input: 320,
      output: 0,
      saved: 0
    }
  }
];

export function RecentRequests() {
  const getStatusChip = (status: string) => {
    switch (status) {
      case "completed":
        return <Chip color="success" size="sm" variant="flat">Completed</Chip>;
      case "cached":
        return <Chip color="primary" size="sm" variant="flat">Cached</Chip>;
      case "error":
        return <Chip color="danger" size="sm" variant="flat">Error</Chip>;
      default:
        return <Chip color="warning" size="sm" variant="flat">Processing</Chip>;
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "OpenAI":
        return "logos:openai-icon";
      case "Anthropic":
        return "logos:anthropic";
      case "Gemini":
        return "logos:google-icon";
      default:
        return "lucide:box";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Requests</h3>
        <Button size="sm" variant="light" color="primary">
          View All
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="p-0">
        <div className="divide-y divide-default-200">
          {recentRequests.map((request) => (
            <div key={request.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Icon icon={getProviderIcon(request.provider)} className="w-5 h-5" />
                  <div>
                    <p className="font-medium">{request.model}</p>
                    <p className="text-xs text-default-500">{request.timestamp}</p>
                  </div>
                </div>
                {getStatusChip(request.status)}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center">
                  <p className="text-xs text-default-500">Input</p>
                  <p className="font-medium">{request.tokens.input} tokens</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-default-500">Output</p>
                  <p className="font-medium">{request.tokens.output} tokens</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-default-500">Saved</p>
                  <p className="font-medium text-green-500">{request.tokens.saved} tokens</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}