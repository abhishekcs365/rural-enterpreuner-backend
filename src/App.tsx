import { useState, useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import { GovernmentSchemes } from './components/GovernmentSchemes'
import { DigitalToolsGuide } from './components/DigitalToolsGuide'
import { ContactPage } from './components/ContactPage'
import { SuccessStories } from './components/SuccessStories'
import { SchemeDetails } from './components/SchemeDetails'
import { VoiceAssistant } from './components/VoiceAssistant'
import { NotificationSystem } from './components/NotificationSystem'
import { SearchBar } from './components/SearchBar'
import { LanguageSelection } from './components/LanguageSelection'
import { UserRegistration } from './components/UserRegistration'
import { ProfileSetup } from './components/ProfileSetup'
import { PersonalizedSchemes } from './components/PersonalizedSchemes'
import { Login } from './components/Login'

interface UserData {
  userId: string
  password: string
}

interface ProfileData {
  name: string
  age: string
  address: string
  district: string
  occupation: string
  businessType: string
  businessDescription: string
  monthlyIncome: string
  businessExperience: string
}

type OnboardingStep = 'language' | 'registration' | 'profile' | 'schemes' | 'login' | 'complete'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [language, setLanguage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedScheme, setSelectedScheme] = useState<number | null>(null)
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('language')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  // Check if user has completed onboarding on app load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage')
    const savedUserData = localStorage.getItem('userData')
    const savedProfileData = localStorage.getItem('profileData')
    
    if (savedLanguage && savedUserData && savedProfileData) {
      setLanguage(savedLanguage)
      setUserData(JSON.parse(savedUserData))
      setProfileData(JSON.parse(savedProfileData))
      setOnboardingStep('complete')
    } else if (savedLanguage) {
      setLanguage(savedLanguage)
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData))
        setOnboardingStep('profile')
      } else {
        setOnboardingStep('registration')
      }
    }
  }, [])

  const handleLanguageSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage)
    localStorage.setItem('userLanguage', selectedLanguage)
    setOnboardingStep('registration')
  }

  const handleRegistrationComplete = (userData: UserData) => {
    setUserData(userData)
    localStorage.setItem('userData', JSON.stringify(userData))
    setOnboardingStep('login')
  }

  const handleProfileComplete = (profileData: ProfileData) => {
    setProfileData(profileData)
    localStorage.setItem('profileData', JSON.stringify(profileData))
    setOnboardingStep('schemes')
  }

  const handleLoginSuccess = () => {
    setOnboardingStep('profile')
  }

  const handleContinueToApp = () => {
    setOnboardingStep('complete')
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // If user searches, show relevant content
    if (query) {
      setActiveTab('schemes')
    }
  }

  const handleSchemeSelect = (schemeId: number) => {
    setSelectedScheme(schemeId)
  }

  const handleBackToSchemes = () => {
    setSelectedScheme(null)
  }

  const renderContent = () => {
    // If a scheme is selected, show scheme details
    if (selectedScheme && activeTab === 'schemes') {
      return (
        <SchemeDetails 
          schemeId={selectedScheme} 
          language={language} 
          onBack={handleBackToSchemes}
        />
      )
    }

    switch (activeTab) {
      case 'schemes':
        return <GovernmentSchemes language={language} onSchemeSelect={handleSchemeSelect} />
      case 'tools':
        return <DigitalToolsGuide language={language} />
      case 'contact':
        return <ContactPage language={language} />
      case 'success':
        return <SuccessStories language={language} />
      default:
        return <HomePage language={language} onNavigate={setActiveTab} />
    }
  }

  // Show onboarding flow if not completed
  if (onboardingStep !== 'complete') {
    switch (onboardingStep) {
      case 'language':
        return <LanguageSelection onLanguageSelect={handleLanguageSelect} />
      case 'registration':
        return <UserRegistration language={language} onRegistrationComplete={handleRegistrationComplete} />
      case 'login':
        return <Login language={language} onLoginSuccess={handleLoginSuccess} />
      case 'profile':
        return <ProfileSetup language={language} onProfileComplete={handleProfileComplete} />
      case 'schemes':
        return profileData ? (
          <PersonalizedSchemes 
            language={language} 
            profileData={profileData} 
            onContinueToApp={handleContinueToApp} 
          />
        ) : null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar - Show on schemes and tools pages */}
        {(activeTab === 'schemes' || activeTab === 'tools') && (
          <div className="mb-8">
            <SearchBar 
              onSearch={handleSearch}
              language={language}
            />
          </div>
        )}
        
        {renderContent()}
      </main>

      {/* Voice Assistant */}
      <VoiceAssistant language={language} onNavigate={setActiveTab} />

      {/* Notification System */}
      <NotificationSystem language={language} onNavigate={setActiveTab} />

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              {language === 'hi' 
                ? 'महाराष्ट्र के ग्रामीण उद्यमियों के लिए सूचना सेतु'
                : language === 'mr' 
                ? 'महाराष्ट्रातील ग्रामीण उद्योजकांसाठी माहिती सेतू'
                : 'Information Bridge for Rural Entrepreneurs in Maharashtra'
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'hi' 
                ? '© 2024 ग्रामीण उद्यमी केंद्र. सभी अधिकार सुरक्षित।'
                : language === 'mr' 
                ? '© 2024 ग्रामीण उद्योजक केंद्र. सर्व हक्क राखीव.'
                : '© 2024 Rural Entrepreneur Hub. All rights reserved.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}