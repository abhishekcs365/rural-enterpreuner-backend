import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Languages, CheckCircle } from 'lucide-react'
import { motion } from 'motion/react'

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void
}

export function LanguageSelection({ onLanguageSelect }: LanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      description: 'Continue in English'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      description: 'हिंदी में जारी रखें'
    },
    {
      code: 'mr',
      name: 'Marathi',
      nativeName: 'मराठी',
      description: 'मराठीत सुरू ठेवा'
    }
  ]

  const content = {
    en: {
      title: "Welcome to Rural Entrepreneur Hub",
      subtitle: "Choose your preferred language to get started",
      continue: "Continue"
    },
    hi: {
      title: "ग्रामीण उद्यमी केंद्र में आपका स्वागत है",
      subtitle: "शुरू करने के लिए अपनी पसंदीदा भाषा चुनें",
      continue: "जारी रखें"
    },
    mr: {
      title: "ग्रामीण उद्योजक केंद्रात आपले स्वागत आहे",
      subtitle: "सुरुवात करण्यासाठी आपली आवडती भाषा निवडा",
      continue: "पुढे जा"
    }
  }

  const currentContent = selectedLanguage ? content[selectedLanguage as keyof typeof content] : content.en

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1574096457326-9b53cb1717c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYWhhcmFzaHRyYSUyMHJ1cmFsJTIwbGFuZHNjYXBlJTIwZmllbGRzJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1OTA1OTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
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
              <Languages className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{currentContent.title}</CardTitle>
            <CardDescription className="text-base">{currentContent.subtitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {languages.map((lang) => (
                <motion.div
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    className={`w-full p-4 h-auto justify-start relative ${
                      selectedLanguage === lang.code ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedLanguage(lang.code)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="text-left">
                        <div className="font-medium text-lg">{lang.nativeName}</div>
                        <div className="text-sm opacity-70">{lang.description}</div>
                      </div>
                      {selectedLanguage === lang.code && (
                        <CheckCircle className="h-5 w-5 ml-auto text-primary-foreground" />
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>

            {selectedLanguage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4"
              >
                <Button 
                  onClick={() => onLanguageSelect(selectedLanguage)} 
                  className="w-full"
                  size="lg"
                >
                  {currentContent.continue}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}