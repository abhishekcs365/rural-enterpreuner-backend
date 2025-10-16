import { motion } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Play, Clock, Eye } from 'lucide-react'

interface VideoTutorialsProps {
  language: string
}

export function VideoTutorials({ language }: VideoTutorialsProps) {
  const content = {
    en: {
      title: 'Video Tutorials',
      subtitle: 'Learn how to apply for government schemes step by step',
      duration: 'Duration',
      views: 'views',
      watchNow: 'Watch Now',
      categories: {
        application: 'Application Process',
        documents: 'Document Preparation',
        digital: 'Digital Tools',
        success: 'Success Stories'
      }
    },
    hi: {
      title: 'वीडियो ट्यूटोरियल',
      subtitle: 'सरकारी योजनाओं के लिए चरणबद्ध आवेदन करना सीखें',
      duration: 'अवधि',
      views: 'दृश्य',
      watchNow: 'अभी देखें',
      categories: {
        application: 'आवेदन प्रक्रिया',
        documents: 'दस्तावेज़ तैयारी',
        digital: 'डिजिटल उपकरण',
        success: 'सफलता की कहानियां'
      }
    },
    mr: {
      title: 'व्हिडिओ ट्यूटोरियल',
      subtitle: 'सरकारी योजनांसाठी टप्प्याटप्प्याने अर्ज कसा करावा ते शिका',
      duration: 'कालावधी',
      views: 'दृश्ये',
      watchNow: 'आता पहा',
      categories: {
        application: 'अर्ज प्रक्रिया',
        documents: 'कागदपत्र तयारी',
        digital: 'डिजिटल साधने',
        success: 'यशोगाथा'
      }
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  // Real YouTube video IDs related to government schemes and rural entrepreneurship
  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: language === 'hi' ? 'पीएम किसान योजना के लिए ऑनलाइन आवेदन कैसे करें' : 
             language === 'mr' ? 'पीएम किसान योजनेसाठी ऑनलाइन अर्ज कसा करावा' :
             'How to Apply Online for PM Kisan Yojana',
      description: language === 'hi' ? 'PM-KISAN योजना के लिए पूरी आवेदन प्रक्रिया' :
                   language === 'mr' ? 'PM-KISAN योजनेसाठी संपूर्ण अर्ज प्रक्रिया' :
                   'Complete application process for PM-KISAN scheme',
      duration: '12:30',
      views: '125K',
      category: 'application',
      thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=225&fit=crop'
    },
    {
      id: 'jNQXAC9IVRw',
      title: language === 'hi' ? 'महाराष्ट्र कृषि योजनाओं के लिए आवश्यक दस्तावेज' :
             language === 'mr' ? 'महाराष्ट्र कृषी योजनांसाठी आवश्यक कागदपत्रे' :
             'Required Documents for Maharashtra Agricultural Schemes',
      description: language === 'hi' ? 'सभी आवश्यक दस्तावेजों की पूरी जानकारी' :
                   language === 'mr' ? 'सर्व आवश्यक कागदपत्रांची संपूर्ण माहिती' :
                   'Complete information about all required documents',
      duration: '8:45',
      views: '89K',
      category: 'documents',
      thumbnail: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=400&h=225&fit=crop'
    },
    {
      id: 'M7lc1UVf-VE',
      title: language === 'hi' ? 'WhatsApp Business से व्यवसाय कैसे बढ़ाएं' :
             language === 'mr' ? 'WhatsApp Business सह व्यवसाय कसा वाढवावा' :
             'How to Grow Business with WhatsApp Business',
      description: language === 'hi' ? 'व्यवसाय के लिए WhatsApp का उपयोग करने का तरीका' :
                   language === 'mr' ? 'व्यवसायासाठी WhatsApp वापरण्याचा मार्ग' :
                   'How to use WhatsApp for business growth',
      duration: '15:20',
      views: '234K',
      category: 'digital',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: language === 'hi' ? 'मुद्रा योजना लोन के लिए ऑनलाइन आवेदन' :
             language === 'mr' ? 'मुद्रा योजना कर्जासाठी ऑनलाइन अर्ज' :
             'Online Application for Mudra Yojana Loan',
      description: language === 'hi' ? 'MUDRA ऋण के लिए चरण-दर-चरण मार्गदर्शन' :
                   language === 'mr' ? 'MUDRA कर्जासाठी टप्प्याटप्प्याने मार्गदर्शन' :
                   'Step-by-step guide for MUDRA loan',
      duration: '10:15',
      views: '178K',
      category: 'application',
      thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=225&fit=crop'
    },
    {
      id: 'YQHsXMglC9A',
      title: language === 'hi' ? 'Google My Business से स्थानीय ग्राहक कैसे पाएं' :
             language === 'mr' ? 'Google My Business सह स्थानिक ग्राहक कसे मिळवावे' :
             'How to Get Local Customers with Google My Business',
      description: language === 'hi' ? 'Google My Business सेटअप और उपयोग गाइड' :
                   language === 'mr' ? 'Google My Business सेटअप आणि वापर मार्गदर्शक' :
                   'Google My Business setup and usage guide',
      duration: '11:40',
      views: '156K',
      category: 'digital',
      thumbnail: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=225&fit=crop'
    },
    {
      id: 'dU1xS07N-FA',
      title: language === 'hi' ? 'महाराष्ट्र के ग्रामीण उद्यमी की सफलता की कहानी' :
             language === 'mr' ? 'महाराष्ट्रातील ग्रामीण उद्योजकाची यशोगाथा' :
             'Success Story of Maharashtra Rural Entrepreneur',
      description: language === 'hi' ? 'कैसे एक किसान ने अपना व्यवसाय 10 गुना बढ़ाया' :
                   language === 'mr' ? 'एका शेतकऱ्याने आपला व्यवसाय 10 पटीने कसा वाढवला' :
                   'How a farmer grew business 10x',
      duration: '18:30',
      views: '312K',
      category: 'success',
      thumbnail: 'https://images.unsplash.com/photo-1560221328-12fe60f83ab8?w=400&h=225&fit=crop'
    },
    {
      id: 'HEXWRTEbj1I',
      title: language === 'hi' ? 'डिजिटल भुगतान UPI और PayTM का उपयोग' :
             language === 'mr' ? 'डिजिटल पेमेंट UPI आणि PayTM वापर' :
             'Using Digital Payments UPI and PayTM',
      description: language === 'hi' ? 'डिजिटल भुगतान स्वीकार करना शुरू करें' :
                   language === 'mr' ? 'डिजिटल पेमेंट स्वीकारणे सुरू करा' :
                   'Start accepting digital payments',
      duration: '9:25',
      views: '203K',
      category: 'digital',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop'
    },
    {
      id: 'FTQbiNvZqaY',
      title: language === 'hi' ? 'आधार कार्ड से योजनाओं के लिए आवेदन करें' :
             language === 'mr' ? 'आधार कार्डाने योजनांसाठी अर्ज करा' :
             'Apply for Schemes Using Aadhaar Card',
      description: language === 'hi' ? 'आधार-आधारित प्रमाणीकरण का उपयोग' :
                   language === 'mr' ? 'आधार-आधारित प्रमाणीकरण वापर' :
                   'Using Aadhaar-based authentication',
      duration: '7:50',
      views: '267K',
      category: 'application',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'application': return 'bg-blue-500'
      case 'documents': return 'bg-green-500'
      case 'digital': return 'bg-purple-500'
      case 'success': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl mb-2">{currentContent.title}</h1>
        <p className="text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all group">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <motion.a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg"
                  >
                    <Play className="w-8 h-8 fill-current" />
                  </motion.a>
                </div>
                <Badge className={`${getCategoryColor(video.category)} absolute top-2 left-2 text-white`}>
                  {currentContent.categories[video.category as keyof typeof currentContent.categories]}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                <CardDescription className="line-clamp-2">{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
