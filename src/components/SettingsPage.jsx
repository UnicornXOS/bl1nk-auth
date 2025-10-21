import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Save, XCircle, CheckCircle2, Database, Key, Cloud, Globe } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = ({ isDark }) => {
  const [settings, setSettings] = useState({
    openaiApiKey: '',
    anthropicApiKey: '',
    googleApiKey: '',
    qdrantUrl: '',
    qdrantApiKey: '',
    voyageAiApiKey: '',
    voyageAiRerankEndpoint: '',
    voyageAiEmbeddingEndpoint: '',
  });

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedSettings = localStorage.getItem('blinkos_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem('blinkos_settings', JSON.stringify(settings));
    toast.success('Settings saved successfully!', {
      style: {
        backgroundColor: isDark ? '#22C55E' : '#D1FAE5',
        color: isDark ? '#FFFFFF' : '#10B981',
      },
    });
  };

  const handleReset = () => {
    setSettings({
      openaiApiKey: '',
      anthropicApiKey: '',
      googleApiKey: '',
      qdrantUrl: '',
      qdrantApiKey: '',
      voyageAiApiKey: '',
      voyageAiRerankEndpoint: '',
      voyageAiEmbeddingEndpoint: '',
    });
    localStorage.removeItem('blinkos_settings');
    toast.info('Settings reset to default.', {
      style: {
        backgroundColor: isDark ? '#F59E0B' : '#FEF3C7',
        color: isDark ? '#FFFFFF' : '#D97706',
      },
    });
  };

  const inputClass = isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900';
  const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="p-6 space-y-6">
      <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Application Settings</h2>
      <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Configure your AI providers and database connections.</p>

      <Tabs defaultValue="ai-providers" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <TabsTrigger value="ai-providers" className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}>AI Providers</TabsTrigger>
          <TabsTrigger value="database" className={isDark ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white' : ''}>Database & Vector DB</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-providers" className="mt-6">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>AI Provider API Keys</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Enter your API keys for various AI services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openaiApiKey" className={labelClass}>OpenAI API Key</Label>
                <Input
                  id="openaiApiKey"
                  type="password"
                  placeholder="sk-..."
                  value={settings.openaiApiKey}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="anthropicApiKey" className={labelClass}>Anthropic API Key</Label>
                <Input
                  id="anthropicApiKey"
                  type="password"
                  placeholder="sk-..."
                  value={settings.anthropicApiKey}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="googleApiKey" className={labelClass}>Google API Key</Label>
                <Input
                  id="googleApiKey"
                  type="password"
                  placeholder="AIza..."
                  value={settings.googleApiKey}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>Database & Vector Database Settings</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Configure connection details for your databases.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Qdrant</h3>
              <div>
                <Label htmlFor="qdrantUrl" className={labelClass}>Qdrant URL</Label>
                <Input
                  id="qdrantUrl"
                  type="text"
                  placeholder="http://localhost:6333"
                  value={settings.qdrantUrl}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="qdrantApiKey" className={labelClass}>Qdrant API Key (Optional)</Label>
                <Input
                  id="qdrantApiKey"
                  type="password"
                  placeholder="Your Qdrant API Key"
                  value={settings.qdrantApiKey}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <Separator className={isDark ? 'bg-gray-700' : 'bg-gray-200'} />
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Voyage AI</h3>
              <div>
                <Label htmlFor="voyageAiApiKey" className={labelClass}>Voyage AI API Key</Label>
                <Input
                  id="voyageAiApiKey"
                  type="password"
                  placeholder="Your Voyage AI API Key"
                  value={settings.voyageAiApiKey}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="voyageAiRerankEndpoint" className={labelClass}>Voyage AI Rerank Endpoint</Label>
                <Input
                  id="voyageAiRerankEndpoint"
                  type="text"
                  placeholder="https://api.voyageai.com/v1/rerank"
                  value={settings.voyageAiRerankEndpoint}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <Label htmlFor="voyageAiEmbeddingEndpoint" className={labelClass}>Voyage AI Embedding Endpoint</Label>
                <Input
                  id="voyageAiEmbeddingEndpoint"
                  type="text"
                  placeholder="https://api.voyageai.com/v1/embeddings"
                  value={settings.voyageAiEmbeddingEndpoint}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button onClick={handleReset} variant="outline" className={isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}>
          <XCircle className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
