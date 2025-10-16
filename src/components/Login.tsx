import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { LogIn, Eye, EyeOff } from 'lucide-react'

interface LoginProps {
  language: string
  onLoginSuccess: () => void
}

export function Login({ language, onLoginSuccess }: LoginProps) {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Login to access your account',
      userIdLabel: 'User ID',
      passwordLabel: 'Password',
      loginButton: 'Login',
      errorInvalid: 'Invalid User ID or Password',
      userIdPlaceholder: 'Enter your User ID',
      passwordPlaceholder: 'Enter your password'
    },
    hi: {
      title: 'फिर से स्वागत है',
      subtitle: 'अपने खाते में प्रवेश करें',
      userIdLabel: 'यूजर आईडी',
      passwordLabel: 'पासवर्ड',
      loginButton: 'लॉगिन करें',
      errorInvalid: 'अमान्य यूजर आईडी या पासवर्ड',
      userIdPlaceholder: 'अपनी यूजर आईडी दर्ज करें',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें'
    },
    mr: {
      title: 'परत स्वागत आहे',
      subtitle: 'तुमच्या खात्यात प्रवेश करा',
      userIdLabel: 'यूजर आयडी',
      passwordLabel: 'पासवर्ड',
      loginButton: 'लॉगिन करा',
      errorInvalid: 'अवैध यूजर आयडी किंवा पासवर्ड',
      userIdPlaceholder: 'तुमचा यूजर आयडी टाका',
      passwordPlaceholder: 'तुमचा पासवर्ड टाका'
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const savedUserData = localStorage.getItem('userData')
    if (savedUserData) {
      const userData = JSON.parse(savedUserData)
      if (userData.userId === userId && userData.password === password) {
        onLoginSuccess()
      } else {
        setError(currentContent.errorInvalid)
      }
    } else {
      setError(currentContent.errorInvalid)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1604357209793-fca5dca89f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-green-500/30 to-blue-500/30 backdrop-blur-sm" />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="backdrop-blur-lg bg-white/95 border-2 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <LogIn className="w-10 h-10 text-white" />
            </motion.div>
            <CardTitle className="text-2xl">{currentContent.title}</CardTitle>
            <CardDescription>{currentContent.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="userId">{currentContent.userIdLabel}</Label>
                <Input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder={currentContent.userIdPlaceholder}
                  required
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{currentContent.passwordLabel}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={currentContent.passwordPlaceholder}
                    required
                    className="bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white shadow-lg"
                  size="lg"
                >
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    {currentContent.loginButton}
                    <LogIn className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
