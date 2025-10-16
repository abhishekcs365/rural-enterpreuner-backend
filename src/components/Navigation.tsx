import { Button } from './ui/button'
import { LanguageSelector } from './LanguageSelector'
import { Home, FileText, Smartphone, Phone, Menu, Star, Sprout } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useState } from 'react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  language: string
  onLanguageChange: (language: string) => void
}

export function Navigation({ activeTab, onTabChange, language, onLanguageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const content = {
    en: {
      home: "Home",
      schemes: "Government Schemes",
      tools: "Digital Tools",
      success: "Success Stories",
      contact: "Contact",
      title: "Rural Entrepreneur Hub"
    },
    hi: {
      home: "होम",
      schemes: "सरकारी योजनाएं",
      tools: "डिजिटल उपकरण",
      success: "सफलता की कहानियां",
      contact: "संपर्क",
      title: "ग्रामीण उद्यमी केंद्र"
    },
    mr: {
      home: "मुख्यपृष्ठ",
      schemes: "सरकारी योजना",
      tools: "डिजिटल साधने",
      success: "यशाच्या गोष्टी",
      contact: "संपर्क",
      title: "ग्रामीण उद्योजक केंद्र"
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const navigation = [
    { id: 'home', label: currentContent.home, icon: Home },
    { id: 'schemes', label: currentContent.schemes, icon: FileText },
    { id: 'tools', label: currentContent.tools, icon: Smartphone },
    { id: 'success', label: currentContent.success, icon: Star },
    { id: 'contact', label: currentContent.contact, icon: Phone }
  ]

  const NavItems = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-2' : 'flex-wrap gap-1'}`}>
      {navigation.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant={activeTab === id ? 'default' : 'ghost'}
          onClick={() => {
            onTabChange(id)
            if (mobile) setIsOpen(false)
          }}
          className={`${mobile ? 'justify-start w-full' : ''}`}
          size={mobile ? 'default' : 'sm'}
        >
          <Icon className="h-4 w-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  )

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg text-foreground">{currentContent.title}</h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavItems />
          </div>

          {/* Language Selector and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={onLanguageChange} 
            />
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-6">
                  <h2 className="text-lg font-semibold">{currentContent.title}</h2>
                  <NavItems mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}