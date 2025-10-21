import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import logoDark from '../assets/logo-dark.jpg'
import logoLight from '../assets/logo-light.png'

const Login = ({ onLogin, isDark = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Please enter your email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter your password'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    setErrors({})
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Demo login - accept any valid email/password
      if (formData.email && formData.password.length >= 6) {
        onLogin({
          user: {
            id: '1',
            email: formData.email,
            name: formData.email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
          },
          token: 'demo-jwt-token'
        })
      } else {
        setErrors({ general: 'Invalid email or password' })
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className={`shadow-2xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <CardHeader className="space-y-6 pb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex justify-center"
            >
              <img
                src={isDark ? logoDark : logoLight}
                alt="BLinkOS Logo"
                className="w-24 h-24 object-contain"
              />
            </motion.div>
            <div className="text-center space-y-2">
              <CardTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome to BLinkOS
              </CardTitle>
              <CardDescription className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                LLM is Everything - The creative platform for everyone
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                        : 'bg-white border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`pr-10 transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500' 
                        : isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                          : 'bg-white border-gray-300'
                    }`}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    ) : (
                      <Eye className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-md"
                >
                  <p className="text-sm text-red-600">{errors.general}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`} />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className={`px-2 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                    Demo Account
                  </span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  Try the demo with any email and password (6+ characters):
                </p>
                <div className="space-y-1 text-xs font-mono">
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Email: demo@blinkos.com
                  </p>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Password: demo123
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
              onClick={() => alert('Sign up functionality would be implemented here')}
            >
              Sign up
            </Button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
