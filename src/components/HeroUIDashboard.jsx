/**
 * HeroUIDashboard Component
 * 
 * SECURITY NOTE: This component handles API key display for demonstration purposes.
 * - API keys are masked for display (showing only last 4 characters)
 * - Actual API keys should be stored securely server-side with proper encryption
 * - Environment variables are used for configuration, not hardcoded credentials
 * - Client-side storage of API keys should be avoided in production
 */
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Settings, 
  Key, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Activity,
  BarChart3,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2
} from 'lucide-react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const HeroUIDashboard = ({ isDark = false }) => {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'OpenAI GPT-4', key: process.env.REACT_APP_OPENAI_KEY ? '****' + process.env.REACT_APP_OPENAI_KEY.slice(-4) : 'Not configured', status: 'active', usage: 85 },
    { id: 2, name: 'Anthropic Claude', key: process.env.REACT_APP_ANTHROPIC_KEY ? '****' + process.env.REACT_APP_ANTHROPIC_KEY.slice(-4) : 'Not configured', status: 'active', usage: 62 },
    { id: 3, name: 'Google Gemini', key: process.env.REACT_APP_GOOGLE_KEY ? '****' + process.env.REACT_APP_GOOGLE_KEY.slice(-4) : 'Not configured', status: 'inactive', usage: 0 }
  ])
  const [newApiKey, setNewApiKey] = useState({ name: '', key: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  // Mock data for charts
  const costSavingsData = [
    { month: 'Jan', original: 1200, optimized: 800, savings: 400 },
    { month: 'Feb', original: 1400, optimized: 900, savings: 500 },
    { month: 'Mar', original: 1600, optimized: 950, savings: 650 },
    { month: 'Apr', original: 1800, optimized: 1100, savings: 700 },
    { month: 'May', original: 2000, optimized: 1200, savings: 800 },
    { month: 'Jun', original: 2200, optimized: 1300, savings: 900 }
  ]

  const apiUsageData = [
    { name: 'OpenAI', value: 45, color: '#10B981' },
    { name: 'Anthropic', value: 30, color: '#3B82F6' },
    { name: 'Google', value: 15, color: '#F59E0B' },
    { name: 'Others', value: 10, color: '#8B5CF6' }
  ]

  const recentRequests = [
    { id: 1, endpoint: '/v1/chat/completions', model: 'gpt-4', tokens: 1250, cost: '$0.025', time: '2 min ago', status: 'success' },
    { id: 2, endpoint: '/v1/embeddings', model: 'text-embedding-ada-002', tokens: 800, cost: '$0.008', time: '5 min ago', status: 'success' },
    { id: 3, endpoint: '/v1/chat/completions', model: 'claude-3-sonnet', tokens: 2100, cost: '$0.042', time: '8 min ago', status: 'success' },
    { id: 4, endpoint: '/v1/chat/completions', model: 'gpt-3.5-turbo', tokens: 950, cost: '$0.019', time: '12 min ago', status: 'cached' }
  ]

  const handleAddApiKey = () => {
    if (newApiKey.name && newApiKey.key) {
      // Store only masked version for display, actual key should be stored securely server-side
      const maskedKey = newApiKey.key.length > 4 ? '****' + newApiKey.key.slice(-4) : '****'
      setApiKeys([...apiKeys, {
        id: Date.now(),
        name: newApiKey.name,
        key: maskedKey,
        status: 'active',
        usage: 0
      }])
      // TODO: Send actual key to secure server endpoint for storage
      // await storeApiKeySecurely(newApiKey.name, newApiKey.key)
      setNewApiKey({ name: '', key: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteApiKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const toggleApiKeyStatus = (id) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            AI Memory Proxy Dashboard
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Enterprise Context Management & Cost Optimization
          </p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Activity className="h-3 w-3 mr-1" />
          System Active
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Monthly Savings
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    $900
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    API Requests
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    24.8K
                  </p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-blue-600 mr-1" />
                <span className="text-xs text-blue-600">+8.2% from last week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Cache Hit Rate
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    87.3%
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-purple-600 mr-1" />
                <span className="text-xs text-purple-600">+3.1% from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Active Models
                  </p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    12
                  </p>
                </div>
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <CheckCircle2 className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">All systems operational</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cost Savings Chart */}
        <div className="lg:col-span-2">
          <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
                Cost Savings Over Time
              </CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Monthly comparison of original vs optimized costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costSavingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="month" 
                      stroke={isDark ? '#9CA3AF' : '#6B7280'}
                      fontSize={12}
                    />
                    <YAxis 
                      stroke={isDark ? '#9CA3AF' : '#6B7280'}
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                        border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDark ? '#FFFFFF' : '#000000'
                      }}
                    />
                    <Bar dataKey="original" fill="#EF4444" name="Original Cost" />
                    <Bar dataKey="optimized" fill="#10B981" name="Optimized Cost" />
                    <Bar dataKey="savings" fill="#3B82F6" name="Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Usage Pie Chart */}
        <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
              API Usage Distribution
            </CardTitle>
            <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Usage by provider
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={apiUsageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {apiUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {apiUsageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.name}</span>
                  </div>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Management */}
      <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
                API Keys Management
              </CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Manage your AI provider API keys
              </CardDescription>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Key
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border rounded-lg space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="keyName">Provider Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., OpenAI GPT-4"
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your API key"
                    value={newApiKey.key}
                    onChange={(e) => setNewApiKey({...newApiKey, key: e.target.value})}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddApiKey} size="sm">Add Key</Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            </motion.div>
          )}

          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-gray-400" />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {apiKey.name}
                    </span>
                  </div>
                  <Badge 
                    variant={apiKey.status === 'active' ? 'default' : 'secondary'}
                    className={apiKey.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {apiKey.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    Usage: {apiKey.usage}%
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => toggleApiKeyStatus(apiKey.id)}
                      variant="outline"
                      size="sm"
                    >
                      {apiKey.status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      onClick={() => handleDeleteApiKey(apiKey.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
            Recent API Requests
          </CardTitle>
          <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Latest requests processed through the proxy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  isDark ? 'border-gray-600' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    request.status === 'success' ? 'bg-green-500' : 
                    request.status === 'cached' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {request.endpoint}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {request.model} • {request.tokens} tokens
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {request.cost}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {request.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HeroUIDashboard
