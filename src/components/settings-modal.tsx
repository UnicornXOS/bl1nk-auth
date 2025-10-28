// New component for settings modal
import React from "react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Tabs,
  Tab,
  Input,
  Switch,
  Divider,
  Select,
  SelectItem
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function SettingsModal({ isOpen, onOpenChange }: SettingsModalProps) {
  const [selectedTab, setSelectedTab] = React.useState("general");
  
  const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];
  
  const languages = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:settings" className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody className="p-0">
              <div className="flex">
                <div className="w-48 border-r border-gray-200 h-full py-4">
                  <Tabs 
                    aria-label="Settings tabs" 
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as string)}
                    orientation="vertical"
                    color="primary"
                    variant="light"
                    classNames={{
                      tabList: "gap-0",
                      cursor: "w-1",
                      tab: "justify-start h-12 px-4"
                    }}
                  >
                    <Tab 
                      key="general" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:sliders" className="w-4 h-4" />
                          <span>General</span>
                        </div>
                      }
                    />
                    <Tab 
                      key="account" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:user" className="w-4 h-4" />
                          <span>Account</span>
                        </div>
                      }
                    />
                    <Tab 
                      key="api" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:key" className="w-4 h-4" />
                          <span>API Keys</span>
                        </div>
                      }
                    />
                    <Tab 
                      key="notifications" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:bell" className="w-4 h-4" />
                          <span>Notifications</span>
                        </div>
                      }
                    />
                    <Tab 
                      key="billing" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:credit-card" className="w-4 h-4" />
                          <span>Billing</span>
                        </div>
                      }
                    />
                    <Tab 
                      key="advanced" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:settings-2" className="w-4 h-4" />
                          <span>Advanced</span>
                        </div>
                      }
                    />
                  </Tabs>
                </div>
                
                <div className="flex-1 p-6">
                  {selectedTab === "general" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Appearance</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                            <Select 
                              label="Select theme" 
                              placeholder="Select a theme"
                              defaultSelectedKeys={["light"]}
                              className="max-w-xs"
                            >
                              {themes.map((theme) => (
                                <SelectItem key={theme.value} value={theme.value}>
                                  {theme.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <Select 
                              label="Select language" 
                              placeholder="Select a language"
                              defaultSelectedKeys={["en"]}
                              className="max-w-xs"
                            >
                              {languages.map((language) => (
                                <SelectItem key={language.value} value={language.value}>
                                  {language.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Compact Mode</p>
                              <p className="text-xs text-gray-500">Use a more compact layout</p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Animations</p>
                              <p className="text-xs text-gray-500">Enable UI animations</p>
                            </div>
                            <Switch defaultSelected />
                          </div>
                        </div>
                      </div>
                      
                      <Divider />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Dashboard Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Auto-refresh</p>
                              <p className="text-xs text-gray-500">Automatically refresh dashboard data</p>
                            </div>
                            <Switch defaultSelected />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Show tooltips</p>
                              <p className="text-xs text-gray-500">Display helpful tooltips</p>
                            </div>
                            <Switch defaultSelected />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedTab === "account" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Account Information</h3>
                        <div className="space-y-4">
                          <Input
                            label="Name"
                            placeholder="Your name"
                            defaultValue="Admin User"
                          />
                          <Input
                            label="Email"
                            placeholder="Your email"
                            defaultValue="admin@blinkos.com"
                            type="email"
                          />
                          <Input
                            label="Company"
                            placeholder="Your company"
                            defaultValue="BLinkOS Inc."
                          />
                        </div>
                      </div>
                      
                      <Divider />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Security</h3>
                        <div className="space-y-4">
                          <Button 
                            color="primary" 
                            variant="flat"
                            startContent={<Icon icon="lucide:lock" className="w-4 h-4" />}
                          >
                            Change Password
                          </Button>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Two-factor authentication</p>
                              <p className="text-xs text-gray-500">Add an extra layer of security</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedTab === "api" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">API Keys</h3>
                        <div className="space-y-4">
                          <div className="border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">OpenAI</p>
                                <p className="text-xs text-gray-500">Last used: 2 hours ago</p>
                              </div>
                              <Chip color="success" size="sm">Active</Chip>
                            </div>
                            <div className="flex mt-2">
                              <Input
                                type="password"
                                value="sk-••••••••••••••••••••••••••••••"
                                readOnly
                                className="flex-1"
                              />
                              <Button 
                                isIconOnly 
                                variant="flat" 
                                color="primary"
                                className="ml-2"
                              >
                                <Icon icon="lucide:copy" className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">Anthropic</p>
                                <p className="text-xs text-gray-500">Last used: 1 day ago</p>
                              </div>
                              <Chip color="success" size="sm">Active</Chip>
                            </div>
                            <div className="flex mt-2">
                              <Input
                                type="password"
                                value="sk-ant-••••••••••••••••••••••••••"
                                readOnly
                                className="flex-1"
                              />
                              <Button 
                                isIconOnly 
                                variant="flat" 
                                color="primary"
                                className="ml-2"
                              >
                                <Icon icon="lucide:copy" className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <Button 
                            color="primary" 
                            startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                          >
                            Add New API Key
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedTab !== "general" && selectedTab !== "account" && selectedTab !== "api" && (
                    <div className="flex flex-col items-center justify-center h-64">
                      <Icon icon="lucide:construction" className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-500">This section is under construction</p>
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}