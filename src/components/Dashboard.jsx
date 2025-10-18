import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { 
  Home, 
  BarChart3, 
  Briefcase, 
  MessageSquare, 
  Calendar, 
  Mail, 
  Files, 
  Settings,
  Plus,
  Search,
  Bell,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import logoDark from '../assets/logo-dark.jpg'
import logoLight from '../assets/logo-light.png'

const Dashboard = ({ user, onLogout, isDark = false, onToggleTheme }) => {
  const [activeTab, setActiveTab] = useState('home')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'workspace', label: 'Workspace', icon: Briefcase },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'files', label: 'Files', icon: Files },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ]

  const mockData = {
    stats: [
      { label: 'Tasks Today', value: 6, trend: '+2' },
      { label: 'Tasks This Week', value: 18, trend: '+5' },
      { label: 'Next Cue', value: 'Thu.', trend: 'Tomorrow' },
      { label: 'Date', value: 'Nov.', trend: '2024' }
    ],
    roadmapData: [
      { name: 'Backlog', value: 12, color: '#8B5CF6' },
      { name: 'Doing', value: 8, color: '#06B6D4' },
      { name: 'Review', value: 5, color: '#F59E0B' },
      { name: 'Done', value: 23, color: '#10B981' }
    ],
    recentActivity: [
      { id: 1, user: 'Alex Johnson', action: 'completed the design system', time: '5:58 am', avatar: 'AJ' },
      { id: 2, user: 'Jorri Small', action: 'started a new project', time: '1 hr 54', avatar: 'JS' },
      { id: 3, user: 'We can', action: 'shared the details', time: '10:52', avatar: 'WC' }
    ],
    emails: [
      { id: 1, from: 'Alex Johnson', subject: 'Project update - the design system is complete', time: '30 Jun', unread: true },
      { id: 2, from: 'Openai', subject: 'New features when LR started am-in', time: 'Thu', unread: false },
      { id: 3, from: 'Acme Inc', subject: 'Premium target set', time: '4', unread: false },
      { id: 4, from: 'John Doe', subject: 'Lunchroom day - I\'ll locate the details', time: 'Apr', unread: false }
    ]
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  BLinkOS
                </h1>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  The creative platform for everyone.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white">
                You Started
              </Button>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Empower creators everywhere
                  </p>
                </CardContent>
              </Card>

              <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    The cybering system for every creator
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Roadmap */}
            <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Next 6 months</span>
                    <Progress value={65} className="w-32" />
                  </div>
                  <div className="text-sm text-blue-600">Next 5 months</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>HeroUI Dashboard</CardTitle>
                  <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Create web apps instantly with MCP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/heroui-dashboard">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      Launch HeroUI Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>Documentation</CardTitle>
                  <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Read docs and quickstart guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/docs">
                    <Button variant="outline" className="w-full">
                      View Documentation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockData.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardContent className="p-4">
                      <div className="text-center space-y-2">
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {stat.value}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {stat.label}
                        </div>
                        <div className="text-xs text-green-600">
                          {stat.trend}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Roadmap Progress */}
            <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
                  Roadmap 6 Months
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.roadmapData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                      <XAxis 
                        dataKey="name" 
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
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                          {activity.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'chat':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                AI Chat
              </h2>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Light Theme Chat */}
              <Card className="bg-white border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900">AI Chat</CardTitle>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Hello! How can I assist you today?</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Overview</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        This is a summary of the notes. It contains the key points and important 
                        information discussed during the meeting.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Country</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-600">Age Mean</div>
                          <div className="text-sm text-gray-600">Age Median</div>
                          <div className="text-sm text-gray-600">Age Std</div>
                        </div>
                        <div className="w-20 h-16 bg-gray-200 rounded flex items-end justify-center space-x-1 p-2">
                          <div className="w-2 bg-gray-400 rounded-t" style={{height: '30%'}}></div>
                          <div className="w-2 bg-gray-500 rounded-t" style={{height: '50%'}}></div>
                          <div className="w-2 bg-gray-600 rounded-t" style={{height: '70%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Files className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="bg-gray-800 text-white rounded-full w-8 h-8 p-0">
                      N
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Dark Theme Chat */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">AI Chat</CardTitle>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">Hello! How can I assist you today</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Summary</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <BarChart3 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">Overview</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        This is a summary of the notes. It contains the key points and important 
                        information discussed during the meeting.
                      </p>
                    </div>

                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h4 className="font-medium text-white mb-3">Country</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-300">Age Mean</div>
                          <div className="text-sm text-gray-300">Age Median</div>
                          <div className="text-sm text-gray-300">Age Std.</div>
                        </div>
                        <div className="w-20 h-16 bg-gray-600 rounded flex items-end justify-center space-x-1 p-2">
                          <div className="w-2 bg-blue-400 rounded-t" style={{height: '30%'}}></div>
                          <div className="w-2 bg-blue-500 rounded-t" style={{height: '50%'}}></div>
                          <div className="w-2 bg-blue-600 rounded-t" style={{height: '70%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        <TrendingUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <Files className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="bg-blue-600 text-white rounded-full w-8 h-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'email':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Email
              </h2>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New File
              </Button>
            </div>

            <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {mockData.emails.map((email, index) => (
                    <div
                      key={email.id}
                      className={`flex items-center space-x-4 p-4 hover:bg-gray-50 ${
                        isDark ? 'hover:bg-gray-700' : ''
                      } ${index !== mockData.emails.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                          {email.from.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {email.from}
                          </span>
                          {email.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} truncate`}>
                          {email.subject}
                        </p>
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {email.time}
                      </div>
                      <ChevronRight className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <div className={`text-6xl ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>
                🚧
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Coming Soon
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                This section is under development
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} border-r ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={isDark ? logoDark : logoLight}
              alt="BLinkOS"
              className="w-8 h-8 object-contain"
            />
            <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              BLinkOS
            </span>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w                  {item.path ? (
                    <Link to={item.path} className="w-full">
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${activeTab === item.id ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${activeTab === item.id ? (isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900') : (isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Button>
                  )}          )
            })}
          </nav>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                {user?.name || 'User'}
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} capitalize`}>
                {activeTab}
              </h1>
              {activeTab === 'dashboard' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Live
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {formatDate(currentTime)} • {formatTime(currentTime)}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleTheme}
                className={isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                <Bell className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
