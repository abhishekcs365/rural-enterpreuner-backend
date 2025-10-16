import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface Notification {
  id: string
  type: 'scheme' | 'reminder' | 'success' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionLabel?: string
  onAction?: () => void
}

interface NotificationSystemProps {
  language: string
  onNavigate: (tab: string) => void
}

export function NotificationSystem({ language, onNavigate }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  const content = {
    en: {
      notifications: "Notifications",
      noNotifications: "No new notifications",
      markAllRead: "Mark all as read",
      newScheme: "New Scheme Match",
      reminder: "Application Reminder",
      success: "Success Update",
      info: "Information Update",
      sampleNotifications: [
        {
          type: 'scheme' as const,
          title: "New Scheme Match Found!",
          message: "PM Kisan Samman Nidhi matches your profile. You could receive ₹6,000 annually.",
          actionLabel: "View Scheme"
        },
        {
          type: 'reminder' as const,
          title: "Document Submission Reminder",
          message: "Your Mudra loan application is pending. Submit remaining documents within 5 days.",
          actionLabel: "Complete Application"
        },
        {
          type: 'success' as const,
          title: "Application Status Update",
          message: "Your PM-KISAN application has been approved! Expect first installment in your account.",
          actionLabel: "View Details"
        }
      ]
    },
    hi: {
      notifications: "सूचनाएं",
      noNotifications: "कोई नई सूचना नहीं",
      markAllRead: "सभी को पढ़ा हुआ चिह्नित करें",
      newScheme: "नई योजना मैच",
      reminder: "आवेदन अनुस्मारक",
      success: "सफलता अपडेट",
      info: "जानकारी अपडेट",
      sampleNotifications: [
        {
          type: 'scheme' as const,
          title: "नई योजना मैच मिली!",
          message: "पीएम किसान सम्मान निधि आपकी प्रोफाइल से मेल खाती है। आपको सालाना ₹6,000 मिल सकते हैं।",
          actionLabel: "योजना देखें"
        },
        {
          type: 'reminder' as const,
          title: "दस्तावेज जमा करने की अनुस्मारक",
          message: "आपका मुद्रा लोन आवेदन लंबित है। 5 दिनों के भीतर बचे हुए दस्तावेज जमा करें।",
          actionLabel: "आवेदन पूरा करें"
        },
        {
          type: 'success' as const,
          title: "आवेदन स्थिति अपडेट",
          message: "आपका पीएम-किसान आवेदन स्वीकृत हो गया है! आपके खाते में पहली किस्त की उम्मीद करें।",
          actionLabel: "विवरण देखें"
        }
      ]
    },
    mr: {
      notifications: "सूचना",
      noNotifications: "कोणत्या नव्या सूचना नाहीत",
      markAllRead: "सर्व वाचलेली म्हणून चिन्हांकित करा",
      newScheme: "नवीन योजना मॅच",
      reminder: "अर्ज स्मरणपत्र",
      success: "यश अपडेट",
      info: "माहिती अपडेट",
      sampleNotifications: [
        {
          type: 'scheme' as const,
          title: "नवीन योजना मॅच सापडला!",
          message: "पीएम किसान सम्मान निधी तुमच्या प्रोफाइलशी जुळते. तुम्हाला वार्षिक ₹6,000 मिळू शकतात.",
          actionLabel: "योजना पहा"
        },
        {
          type: 'reminder' as const,
          title: "कागदपत्र सादर करण्याचे स्मरणपत्र",
          message: "तुमचा मुद्रा लोन अर्ज प्रलंबित आहे. 5 दिवसांत उरलेली कागदपत्रे सादर करा.",
          actionLabel: "अर्ज पूर्ण करा"
        },
        {
          type: 'success' as const,
          title: "अर्ज स्थिती अपडेट",
          message: "तुमचा पीएम-किसान अर्ज मंजूर झाला आहे! तुमच्या खात्यात पहिल्या हप्त्याची अपेक्षा करा.",
          actionLabel: "तपशील पहा"
        }
      ]
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  useEffect(() => {
    // Simulate receiving notifications after some time
    const timer = setTimeout(() => {
      const sampleNotifications: Notification[] = currentContent.sampleNotifications.map((notif, index) => ({
        id: `notif-${index}`,
        type: notif.type,
        title: notif.title,
        message: notif.message,
        timestamp: new Date(Date.now() - index * 1000 * 60 * 60), // Stagger timestamps
        read: false,
        actionLabel: notif.actionLabel,
        onAction: () => {
          if (notif.type === 'scheme') {
            onNavigate('schemes')
          } else {
            onNavigate('schemes')
          }
          setShowNotifications(false)
        }
      }))
      
      setNotifications(sampleNotifications)
      setHasUnread(true)
    }, 5000) // Show notifications after 5 seconds

    return () => clearTimeout(timer)
  }, [language])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    setHasUnread(false)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'scheme':
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'reminder':
        return <Bell className="h-5 w-5 text-orange-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative h-14 w-14 rounded-full shadow-lg bg-white hover:bg-muted"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {unreadCount}
            </motion.div>
          )}
        </Button>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 max-h-[32rem] z-50"
          >
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{currentContent.notifications}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs self-start p-0 h-auto"
                  >
                    {currentContent.markAllRead}
                  </Button>
                )}
              </CardHeader>
              
              <CardContent className="p-0 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">{currentContent.noNotifications}</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 hover:bg-muted/50 transition-colors ${
                          !notification.read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium">{notification.title}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeNotification(notification.id)}
                                  className="h-4 w-4 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {notification.actionLabel && notification.onAction && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    notification.onAction?.()
                                    markAsRead(notification.id)
                                  }}
                                  className="text-xs h-7"
                                >
                                  {notification.actionLabel}
                                </Button>
                              )}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}