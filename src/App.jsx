import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import HeroUIDashboard from './components/HeroUIDashboard.jsx'
import DocumentationPage from './components/DocumentationPage.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user session and theme preference on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('blinkos_user')
    const savedTheme = localStorage.getItem('blinkos_theme')
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('blinkos_user')
      }
    }
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
    
    setIsLoading(false)
  }, [])

  // Update theme class on document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('blinkos_theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleLogin = (loginData) => {
    setUser(loginData.user)
    localStorage.setItem('blinkos_user', JSON.stringify(loginData.user))
    localStorage.setItem('blinkos_token', loginData.token)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('blinkos_user')
    localStorage.removeItem('blinkos_token')
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  // Show loading spinner while checking for saved session
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/blinkos-ui/' : '/'}>
      <Routes>
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} isDark={isDark} /> : <Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} isDark={isDark} onToggleTheme={toggleTheme} /> : <Navigate to="/login" replace />} />
        <Route path="/heroui-dashboard" element={user ? <HeroUIDashboard isDark={isDark} /> : <Navigate to="/login" replace />} />
        <Route path="/docs/:docName?" element={user ? <DocumentationPage isDark={isDark} /> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={user ? <SettingsPage isDark={isDark} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App
