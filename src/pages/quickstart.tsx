// New component for quickstart page
import React from "react";
import { Card, CardBody, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TopBar } from "../components/top-bar";
import { Footer } from "../components/footer";

export function QuickStartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Quick Start Guide</h1>
          <p className="text-gray-600 mb-8">
            Get up and running with BLinkOS in minutes
          </p>
          
          <Card className="mb-8">
            <CardBody className="p-6">
              <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>A BLinkOS account (sign up <a href="/signup" className="text-blue-600 hover:underline">here</a> if you don't have one)</span>
                </li>
                <li className="flex items-start">
                  <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>API keys from at least one LLM provider (OpenAI, Anthropic, etc.)</span>
                </li>
                <li className="flex items-start">
                  <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Node.js 16 or higher (for SDK integration)</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 1: Create a Project</h2>
              <Card>
                <CardBody className="p-6">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        1
                      </div>
                      <div>
                        <p>Log in to your BLinkOS dashboard</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        2
                      </div>
                      <div>
                        <p>Click the "New Project" button in the sidebar</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        3
                      </div>
                      <div>
                        <p>Enter a name for your project and click "Create"</p>
                      </div>
                    </li>
                  </ol>
                </CardBody>
              </Card>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 2: Add Your API Keys</h2>
              <Card>
                <CardBody className="p-6">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        1
                      </div>
                      <div>
                        <p>Navigate to the "API Keys" section in your dashboard</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        2
                      </div>
                      <div>
                        <p>Click "Add New API Key"</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        3
                      </div>
                      <div>
                        <p>Select the provider (OpenAI, Anthropic, etc.) and enter your API key</p>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-2">
                          <p className="text-sm text-gray-600">
                            <Icon icon="lucide:shield" className="inline-block mr-1" />
                            Your API keys are encrypted and stored securely. BLinkOS never shares or resells your API keys.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ol>
                </CardBody>
              </Card>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 3: Integrate the SDK</h2>
              <Card>
                <CardBody className="p-6">
                  <Tabs aria-label="SDK integration" color="primary" variant="underlined">
                    <Tab key="nodejs" title="Node.js">
                      <div className="py-4">
                        <h3 className="text-lg font-medium mb-3">Install the SDK</h3>
                        <div className="bg-gray-900 text-white p-3 rounded-md mb-4">
                          <pre className="text-sm">npm install @blinkos/sdk</pre>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-3">Basic Usage</h3>
                        <div className="bg-gray-900 text-white p-3 rounded-md">
                          <pre className="text-sm">{`import { BLinkOS } from '@blinkos/sdk';

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

main().catch(console.error);`}</pre>
                        </div>
                      </div>
                    </Tab>
                    <Tab key="python" title="Python">
                      <div className="py-4">
                        <h3 className="text-lg font-medium mb-3">Install the SDK</h3>
                        <div className="bg-gray-900 text-white p-3 rounded-md mb-4">
                          <pre className="text-sm">pip install blinkos</pre>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-3">Basic Usage</h3>
                        <div className="bg-gray-900 text-white p-3 rounded-md">
                          <pre className="text-sm">{`from blinkos import BLinkOS

# Initialize the client
blinkos = BLinkOS(
    api_key="your-blinkos-api-key",
    user_id="your-user-id"
)

# Make a request
response = blinkos.complete(
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Tell me about BLinkOS."}
    ],
    model="gpt-4o"
)

print(response.content)`}</pre>
                        </div>
                      </div>
                    </Tab>
                    <Tab key="typescript" title="TypeScript">
                      <div className="py-4">
                        <h3 className="text-lg font-medium mb-3">Install the SDK</h3>
                        <div className="bg-gray-900 text-white p-3 rounded-md mb-4">
                          <pre className="text-sm">npm install @blinkos/sdk</pre>
                        </div>
                        
                        <h3 className="text-lg font-medium mb-3">Basic Usage</h3>
                        <div className="bg-gray-900 text-white p-3 rounded-md">
                          <pre className="text-sm">{`import { BLinkOS, LLMRequest, LLMResponse } from '@blinkos/sdk';

// Initialize the client
const blinkos = new BLinkOS({
  apiKey: 'your-blinkos-api-key',
  userId: 'your-user-id'
});

// Make a request
async function main(): Promise<void> {
  const request: LLMRequest = {
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Tell me about BLinkOS.' }
    ],
    model: 'gpt-4o',
    userId: 'your-user-id'
  };
  
  const response: LLMResponse = await blinkos.complete(request);
  console.log(response.content);
}

main().catch(console.error);`}</pre>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </CardBody>
              </Card>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 4: Monitor Your Savings</h2>
              <Card>
                <CardBody className="p-6">
                  <p className="mb-4">
                    Once you've integrated BLinkOS, you can monitor your savings and usage in the dashboard.
                  </p>
                  
                  <div className="flex items-center gap-8 mt-6">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <Icon icon="lucide:bar-chart-2" className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-sm font-medium">Usage Analytics</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <Icon icon="lucide:dollar-sign" className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">Cost Savings</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                        <Icon icon="lucide:zap" className="w-8 h-8 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium">Optimization</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          
          <Divider className="my-8" />
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-6">
              If you have any questions or need assistance, our support team is here to help.
            </p>
            <div className="flex justify-center gap-4">
              <Card className="w-full max-w-xs">
                <CardBody className="p-4 text-center">
                  <Icon icon="lucide:book-open" className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium mb-1">Documentation</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Explore our detailed documentation
                  </p>
                  <a href="/documentation" className="text-blue-600 text-sm font-medium hover:underline">
                    View Docs
                  </a>
                </CardBody>
              </Card>
              
              <Card className="w-full max-w-xs">
                <CardBody className="p-4 text-center">
                  <Icon icon="lucide:message-circle" className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium mb-1">Support</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Contact our support team
                  </p>
                  <a href="/contact" className="text-blue-600 text-sm font-medium hover:underline">
                    Get Support
                  </a>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}