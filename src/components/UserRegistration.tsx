import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Alert, AlertDescription } from './ui/alert'
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from 'motion/react'

interface UserRegistrationProps {
  language: string
  onRegistrationComplete: (userData: { userId: string; password: string }) => void
}

export function UserRegistration({ language, onRegistrationComplete }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const content = {
    en: {
      title: "Create Your Account",
      subtitle: "Register to access personalized government schemes and business tools",
      userIdLabel: "User ID",
      userIdPlaceholder: "Enter a unique user ID",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a strong password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Re-enter your password",
      createAccount: "Create Account",
      userIdTaken: "This User ID is already taken",
      passwordMismatch: "Passwords do not match",
      weakPassword: "Password must be at least 8 characters with letters and numbers",
      userIdInvalid: "User ID must be at least 3 characters long",
      registrationSuccess: "Account created successfully!",
      requirements: "Requirements:",
      reqUserId: "User ID: 3+ characters",
      reqPassword: "Password: 8+ characters with letters & numbers",
      reqMatch: "Passwords must match"
    },
    hi: {
      title: "अपना खाता बनाएं",
      subtitle: "व्यक्तिगत सरकारी योजनाओं और व्यावसायिक उपकरणों तक पहुंचने के लिए पंजीकरण करें",
      userIdLabel: "उपयोगकर्ता आईडी",
      userIdPlaceholder: "एक अनूठी उपयोगकर्ता आईडी दर्ज करें",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "एक मजबूत पासवर्ड बनाएं",
      confirmPasswordLabel: "पासवर्ड की पुष्टि ���रें",
      confirmPasswordPlaceholder: "अपना पासवर्ड फिर से दर्ज करें",
      createAccount: "खाता बनाएं",
      userIdTaken: "यह उपयोगकर्ता आईडी पहले से ली गई है",
      passwordMismatch: "पासवर्ड मेल नहीं खाते",
      weakPassword: "पासवर्ड कम से कम 8 अक्षर का होना चाहिए जिसमें अक्षर और संख्या हों",
      userIdInvalid: "उपयोगकर्ता आईडी कम से कम 3 अक्षर लंबी होनी चाहिए",
      registrationSuccess: "खाता सफलतापूर्वक बनाया गया!",
      requirements: "आवश्यकताएं:",
      reqUserId: "उपयोगकर्ता आईडी: 3+ अक्षर",
      reqPassword: "पासवर्ड: 8+ अक्षर अक्षरों और संख्याओं के साथ",
      reqMatch: "पासवर्ड मेल खाने चाहिए"
    },
    mr: {
      title: "तुमचे खाते तयार करा",
      subtitle: "वैयक्तिक सरकारी योजना आणि व्यावसायिक साधनांमध्ये प्रवेश मिळविण्यासाठी नोंदणी करा",
      userIdLabel: "वापरकर्ता आयडी",
      userIdPlaceholder: "एक अनन्य वापरकर्ता आयडी प्रविष्ट करा",
      passwordLabel: "पासवर्ड",
      passwordPlaceholder: "एक मजबूत पासवर्ड तयार करा",
      confirmPasswordLabel: "पासवर्डची पुष्टी करा",
      confirmPasswordPlaceholder: "तुमचा पासवर्ड पुन्हा प्रविष्ट करा",
      createAccount: "खाते तयार करा",
      userIdTaken: "हा वापरकर्ता आयडी आधीच घेतला आहे",
      passwordMismatch: "पासवर्ड जुळत नाहीत",
      weakPassword: "पासवर्ड कमीत कमी 8 अक्षरांचा असावा ज्यात अक्षरे आणि संख्या असावी",
      userIdInvalid: "वापरकर्ता आयडी कमीत कमी 3 अक्षर लांब असावा",
      registrationSuccess: "खाते यशस्वीरित्या तयार केले!",
      requirements: "आवश्यकता:",
      reqUserId: "वापरकर्ता आयडी: 3+ अक्षरे",
      reqPassword: "पासवर्ड: 8+ अक्षरे अक्षरे आणि संख्यांसह",
      reqMatch: "पासवर्ड जुळले पाहिजेत"
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const validateUserId = (userId: string) => {
    if (userId.length < 3) {
      return currentContent.userIdInvalid
    }
    // Simulate checking if user ID is taken
    const takenIds = ['admin', 'test', 'user123']
    if (takenIds.includes(userId.toLowerCase())) {
      return currentContent.userIdTaken
    }
    return ''
  }

  const validatePassword = (password: string) => {
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    if (password.length < 8 || !hasLetter || !hasNumber) {
      return currentContent.weakPassword
    }
    return ''
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors: Record<string, string> = {}

    // Validate user ID
    const userIdError = validateUserId(formData.userId)
    if (userIdError) newErrors.userId = userIdError

    // Validate password
    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = currentContent.passwordMismatch
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false)
      onRegistrationComplete({
        userId: formData.userId,
        password: formData.password
      })
    }, 1500)
  }

  const getPasswordStrength = () => {
    const { password } = formData
    if (password.length === 0) return 0
    if (password.length < 4) return 25
    if (password.length < 8) return 50
    if (password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password)) return 100
    return 75
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1676386615569-82e519779625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGluZGlhbiUyMHZpbGxhZ2UlMjBzdW5zZXQlMjBnb2xkZW4lMjBsaWdodHxlbnwxfHx8fDE3NTkwNTk4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{currentContent.title}</CardTitle>
            <CardDescription className="text-base">{currentContent.subtitle}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User ID Field */}
              <div className="space-y-2">
                <Label htmlFor="userId">{currentContent.userIdLabel}</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder={currentContent.userIdPlaceholder}
                  value={formData.userId}
                  onChange={(e) => handleInputChange('userId', e.target.value)}
                  className={errors.userId ? 'border-destructive' : ''}
                />
                {errors.userId && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.userId}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{currentContent.passwordLabel}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={currentContent.passwordPlaceholder}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          passwordStrength < 50 ? 'bg-red-500' :
                          passwordStrength < 75 ? 'bg-yellow-500' :
                          passwordStrength < 100 ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{currentContent.confirmPasswordLabel}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={currentContent.confirmPasswordPlaceholder}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.confirmPassword}</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Requirements */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">{currentContent.requirements}</h4>
                <ul className="text-sm space-y-1">
                  <li className={`flex items-center gap-2 ${formData.userId.length >= 3 ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-3 w-3" />
                    {currentContent.reqUserId}
                  </li>
                  <li className={`flex items-center gap-2 ${passwordStrength === 100 ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-3 w-3" />
                    {currentContent.reqPassword}
                  </li>
                  <li className={`flex items-center gap-2 ${formData.password && formData.password === formData.confirmPassword ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className="h-3 w-3" />
                    {currentContent.reqMatch}
                  </li>
                </ul>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : currentContent.createAccount}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}