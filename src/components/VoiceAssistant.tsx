import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { motion } from 'motion/react'

interface VoiceAssistantProps {
  language: string
  onNavigate: (tab: string) => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
}

interface Window {
  SpeechRecognition: new () => SpeechRecognition
  webkitSpeechRecognition: new () => SpeechRecognition
}

declare var window: Window

export function VoiceAssistant({ language, onNavigate }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  const commands = {
    en: {
      schemes: ['schemes', 'government schemes', 'show schemes', 'योजना'],
      tools: ['tools', 'digital tools', 'show tools', 'साधन'],
      success: ['success stories', 'success', 'stories', 'यश कथा', 'सफलता'],
      home: ['home', 'dashboard', 'main page', 'होम'],
      contact: ['contact', 'help', 'support', 'संपर्क']
    },
    hi: {
      schemes: ['योजना', 'योजनाएं', 'सरकारी योजना', 'schemes'],
      tools: ['साधन', 'उपकरण', 'डिजिटल साधन', 'tools'],
      success: ['यश कथा', 'सफलता', 'कहानी', 'success stories'],
      home: ['होम', 'घर', 'मुख्य', 'home'],
      contact: ['संपर्क', 'सहायता', 'मदद', 'contact']
    },
    mr: {
      schemes: ['योजना', 'सरकारी योजना', 'schemes'],
      tools: ['साधने', 'डिजिटल साधने', 'tools'],
      success: ['यश कथा', 'यशाच्या गोष्टी', 'success stories'],
      home: ['होम', 'मुख्यपृष्ठ', 'home'],
      contact: ['संपर्क', 'मदत', 'contact']
    }
  }

  const responses = {
    en: {
      listening: "Listening... Try saying 'Show schemes' or 'Success stories'",
      navigating: "Opening",
      notUnderstood: "I didn't understand that. Try saying 'Show schemes', 'Digital tools', or 'Success stories'",
      unsupported: "Voice recognition is not supported in your browser"
    },
    hi: {
      listening: "सुन रहा हूँ... 'योजनाएं दिखाओ' या 'यश कथा' कहकर देखें",
      navigating: "खोल रहा हूँ",
      notUnderstood: "मैं समझ नहीं पाया। 'योजनाएं दिखाओ', 'डिजिटल साधन', या 'यश कथा' कहकर देखें",
      unsupported: "आपके ब्राउज़र में आवाज़ पहचान सपोर्ट नहीं है"
    },
    mr: {
      listening: "ऐकत आहे... 'योजना दाखवा' किंवा 'यश कथा' म्हणून पहा",
      navigating: "उघडत आहे",
      notUnderstood: "मला समजले नाही. 'योजना दाखवा', 'डिजिटल साधने', किंवा 'यश कथा' म्हणून पहा",
      unsupported: "तुमच्या ब्राउझरमध्ये आवाज ओळख सपोर्ट नाही"
    }
  }

  const currentCommands = commands[language as keyof typeof commands] || commands.en
  const currentResponses = responses[language as keyof typeof responses] || responses.en

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
        setTranscript(currentResponses.listening)
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          processCommand(finalTranscript.toLowerCase().trim())
        } else {
          setTranscript(interimTranscript)
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        setTranscript('')
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognition)
    }
  }, [language])

  const processCommand = (command: string) => {
    setTranscript(command)
    
    // Check for navigation commands
    for (const [action, keywords] of Object.entries(currentCommands)) {
      if (keywords.some(keyword => command.includes(keyword.toLowerCase()))) {
        setTranscript(`${currentResponses.navigating} ${action}...`)
        
        setTimeout(() => {
          if (action === 'success') {
            onNavigate('success')
          } else {
            onNavigate(action)
          }
          setTranscript('')
        }, 1000)
        return
      }
    }

    // If no command matched
    setTranscript(currentResponses.notUnderstood)
    setTimeout(() => setTranscript(''), 3000)
  }

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop()
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  if (!isSupported) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 opacity-50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">{currentResponses.unsupported}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex flex-col items-start gap-2">
        {/* Transcript Display */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="max-w-80">
              <CardContent className="p-3">
                <p className="text-sm">{transcript}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Voice Assistant Button */}
        <div className="flex gap-2">
          {transcript && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => speakText(transcript)}
              className="h-14 w-14 rounded-full shadow-lg"
            >
              <Volume2 className="h-6 w-6" />
            </Button>
          )}
          
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`h-14 w-14 rounded-full shadow-lg transition-all ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-primary hover:bg-primary/90'
            }`}
            size="icon"
          >
            {isListening ? (
              <MicOff className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Listening Animation */}
      {isListening && (
        <motion.div
          className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  )
}