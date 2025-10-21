// New component for documentation page
import React from "react";
import { Tabs, Tab, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TopBar } from "../components/top-bar";
import { Footer } from "../components/footer";
import { ChatBox } from "../components/chat-box";

export function DocumentationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 shrink-0">
            <Card className="sticky top-8">
              <CardBody className="p-0">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Documentation</h2>
                </div>
                
                <div className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <a 
                        href="#introduction" 
                        className="flex items-center px-3 py-2 text-sm rounded-md bg-blue-50 text-blue-700"
                      >
                        <Icon icon="lucide:book-open" className="w-4 h-4 mr-2" />
                        Introduction
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#getting-started" 
                        className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <Icon icon="lucide:play" className="w-4 h-4 mr-2" />
                        Getting Started
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#api-reference" 
                        className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <Icon icon="lucide:code" className="w-4 h-4 mr-2" />
                        API Reference
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#examples" 
                        className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <Icon icon="lucide:layout" className="w-4 h-4 mr-2" />
                        Examples
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tutorials" 
                        className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <Icon icon="lucide:graduation-cap" className="w-4 h-4 mr-2" />
                        Tutorials
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#faq" 
                        className="flex items-center px-3 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        <Icon icon="lucide:help-circle" className="w-4 h-4 mr-2" />
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div className="flex-1">
            <div className="prose max-w-none">
              <h1 id="introduction">BLinkOS Documentation</h1>
              <p className="lead">
                Welcome to the BLinkOS documentation. Here you'll find comprehensive guides and documentation to help you start working with BLinkOS as quickly as possible.
              </p>
              
              <Tabs aria-label="Documentation tabs" color="primary" variant="underlined">
                <Tab key="overview" title="Overview">
                  <div className="py-4">
                    <h2>What is BLinkOS?</h2>
                    <p>
                      BLinkOS is an Enterprise-Grade Context Management Proxy for LLMs. It helps companies of all sizes connect with their customers and create long-lasting relationships through the power of AI.
                    </p>
                    
                    <h3>Key Features</h3>
                    <ul>
                      <li><strong>Caching:</strong> 30-50% savings through intelligent caching</li>
                      <li><strong>Context Optimization:</strong> 20-40% savings through advanced context management</li>
                      <li><strong>Smart Routing:</strong> Route requests to the most appropriate LLM provider</li>
                      <li><strong>Customer-Owned Keys:</strong> Use your own API keys for maximum security</li>
                    </ul>
                    
                    <h3>Architecture</h3>
                    <p>
                      BLinkOS acts as a proxy between your application and LLM providers. It optimizes requests, manages context, and reduces costs while maintaining high quality responses.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4">
                      <pre className="text-sm">
                        {`┌──────────────────────────────────────────────────┐
│         CUSTOMER'S API KEYS (Customer Owns)      │
│  - OpenAI Key                                    │
│  - Claude Key                                    │
│  - Gemini Key                                    │
│  - (stored encrypted in our vault)              │
└──────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────┐
│    OUR PROXY SERVICE (High-End Context Mgmt)     │
│                                                  │
│  Layer 1: Smart Routing                         │
│  - Uses customer's keys                          │
│  - Selects provider based on task complexity    │
│                                                  │
│  Layer 2: Caching (30-50% savings)              │
│  - Redis exact match                            │
│  - Vector semantic cache                        │
│                                                  │
│  Layer 3: Context Enhancement (20-40% savings)  │
│  - Voyage Embeddings (200M free)                │
│  - Voyage Reranking (200M free)                 │
│  - Graph-based context                          │
│                                                  │
│  Layer 4: Prompt Optimization (15-25% savings)  │
│  - Token compression                            │
│  - Context pruning                              │
│                                                  │
│  Layer 5: Quality Control                       │
│  - HITL feedback                                │
│  - A/B testing                                  │
└──────────────────────────────────────────────────┘
                        ↓
            OPTIMIZED AI RESPONSES
        (70-85% cost reduction for customer)`}
                      </pre>
                    </div>
                  </div>
                </Tab>
                <Tab key="quickstart" title="Quick Start">
                  <div className="py-4">
                    <h2>Quick Start Guide</h2>
                    <p>
                      Get up and running with BLinkOS in minutes. Follow these simple steps to start optimizing your LLM usage.
                    </p>
                    
                    <h3>Step 1: Sign Up</h3>
                    <p>
                      Create an account on the BLinkOS platform.
                    </p>
                    
                    <h3>Step 2: Add Your API Keys</h3>
                    <p>
                      Add your existing LLM provider API keys to the BLinkOS vault.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4">
                      <pre className="text-sm">
                        {`// Example API key configuration
{
  "openai": {
    "apiKey": "sk-...",
    "organization": "org-..."
  },
  "anthropic": {
    "apiKey": "sk-ant-..."
  }
}`}
                      </pre>
                    </div>
                    
                    <h3>Step 3: Integrate the SDK</h3>
                    <p>
                      Install our SDK and update your code to use BLinkOS as a proxy.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4">
                      <pre className="text-sm">
                        {`// Install the SDK
npm install @blinkos/sdk

// Update your code
import { BLinkOS } from '@blinkos/sdk';

const blinkos = new BLinkOS({
  apiKey: 'your-blinkos-api-key',
  userId: 'your-user-id'
});

// Make a request
const response = await blinkos.complete({
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Tell me about BLinkOS.' }
  ],
  model: 'gpt-4o' // Will use your OpenAI key
});`}
                      </pre>
                    </div>
                  </div>
                </Tab>
                <Tab key="api" title="API Reference">
                  <div className="py-4">
                    <h2>API Reference</h2>
                    <p>
                      Explore the BLinkOS API endpoints and parameters.
                    </p>
                    
                    <h3>Authentication</h3>
                    <p>
                      All API requests require authentication using your BLinkOS API key.
                    </p>
                    
                    <h3>Endpoints</h3>
                    <div className="space-y-4">
                      <div>
                        <h4>POST /v1/complete</h4>
                        <p>Complete a chat conversation using an LLM.</p>
                      </div>
                      
                      <div>
                        <h4>POST /v1/embed</h4>
                        <p>Generate embeddings for text.</p>
                      </div>
                      
                      <div>
                        <h4>POST /v1/rerank</h4>
                        <p>Rerank documents based on relevance to a query.</p>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
              
              <Divider className="my-8" />
              
              <h2 id="getting-started">Getting Started</h2>
              <p>
                Follow our step-by-step guide to get started with BLinkOS.
              </p>
              
              <h3>Prerequisites</h3>
              <ul>
                <li>Node.js 16 or higher</li>
                <li>API keys for at least one LLM provider</li>
                <li>BLinkOS account</li>
              </ul>
              
              <h3>Installation</h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4">
                <pre className="text-sm">
                  {`npm install @blinkos/sdk`}
                </pre>
              </div>
              
              <h3>Basic Usage</h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4">
                <pre className="text-sm">
                  {`import { BLinkOS } from '@blinkos/sdk';

// Initialize the client
const blinkos = new BLinkOS({
  apiKey: 'your-blinkos-api-key',
  userId: 'your-user-id'
});

// Make a request
async function main() {
  const response = await blinkos.complete({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Tell me about BLinkOS.' }
    ],
    model: 'gpt-4o'
  });
  
  console.log(response.content);
}

main().catch(console.error);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ChatBox />
    </div>
  );
}