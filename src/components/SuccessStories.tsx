import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { MapPin, TrendingUp, Users } from 'lucide-react'

interface SuccessStoriesProps {
  language: string
}

export function SuccessStories({ language }: SuccessStoriesProps) {
  const content = {
    en: {
      title: "Success Stories",
      subtitle: "Real entrepreneurs who transformed their lives with government schemes and digital tools",
      stories: [
        {
          id: 1,
          name: "Priya Sharma",
          age: 34,
          location: "Satara, Maharashtra",
          business: "Organic Farming & Direct Sales",
          scheme: "PM-KISAN + Mudra Loan",
          beforeIncome: "₹8,000/month",
          afterIncome: "₹35,000/month",
          story: "Started with just 2 acres, used PM-KISAN support and Mudra loan to expand organic farming. Now sells directly to customers through WhatsApp Business.",
          digitalTools: ["WhatsApp Business", "UPI Payments", "Social Media"],
          timeframe: "18 months",
          image: "https://images.unsplash.com/photo-1709552645252-f80c79dfb05d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHdvbWVuJTIwZW50cmVwcmVuZXVyJTIwaW5kaWF8ZW58MXx8fHwxNzU5MDU3OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: 2,
          name: "Rajesh Patil",
          age: 42,
          location: "Pune, Maharashtra",
          business: "Dairy Farming & Processing",
          scheme: "Animal Husbandry Scheme",
          beforeIncome: "₹12,000/month",
          afterIncome: "₹48,000/month",
          story: "Expanded from 3 cows to 15 cows using government subsidy. Started online milk delivery service and dairy products through digital platforms.",
          digitalTools: ["Online Marketplace", "Digital Payments", "Delivery Apps"],
          timeframe: "24 months",
          image: "https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXJzJTIwc3VjY2VzcyUyMHN0b3J5JTIwcnVyYWx8ZW58MXx8fHwxNzU5MDU3OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: 3,
          name: "Sunita Desai",
          age: 38,
          location: "Nashik, Maharashtra",
          business: "Handicrafts & Textiles",
          scheme: "Skill India + Stand-Up India",
          beforeIncome: "₹5,000/month",
          afterIncome: "₹28,000/month",
          story: "Learned new skills through Skill India, got loan through Stand-Up India scheme. Now sells handicrafts online across India.",
          digitalTools: ["E-commerce Platforms", "Instagram Marketing", "UPI Payments"],
          timeframe: "15 months",
          image: "https://images.unsplash.com/photo-1646578486121-67aed93c4f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGhhbmRpY3JhZnRzJTIwdGV4dGlsZXMlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzU5MDU5ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      keyAchievements: "Key Achievements",
      digitalToolsUsed: "Digital Tools Used",
      timeToSuccess: "Time to Success",
      inspiration: "Get Inspired",
      inspirationText: "These entrepreneurs started just like you. With the right schemes and digital tools, you can achieve similar success."
    },
    hi: {
      title: "सफलता की कहानियां",
      subtitle: "वास्तविक उद्यमी जिन्होंने सरकारी योजनाओं और डिजिटल उपकरणों से अपना जीवन बदला",
      stories: [
        {
          id: 1,
          name: "प्रिया शर्मा",
          age: 34,
          location: "सतारा, महाराष्ट्र",
          business: "जैविक खेती और प्रत्यक्ष बिक्री",
          scheme: "पीएम-किसान + मुद्रा लोन",
          beforeIncome: "₹8,000/माह",
          afterIncome: "₹35,000/माह",
          story: "केवल 2 एकड़ से शुरुआत की, पीएम-किसान सहायता और मुद्रा लोन का उपयोग करके जैविक खेती का विस्तार किया। अब व्हाट्सऐप बिजनेस के माध्यम से सीधे ग्राहकों को बेचती हैं।",
          digitalTools: ["व्हाट्सऐप बिजनेस", "UPI भुगतान", "सोशल मीडिया"],
          timeframe: "18 महीने",
          image: "https://images.unsplash.com/photo-1709552645252-f80c79dfb05d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHdvbWVuJTIwZW50cmVwcmVuZXVyJTIwaW5kaWF8ZW58MXx8fHwxNzU5MDU3OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: 2,
          name: "राजेश पाटील",
          age: 42,
          location: "पुणे, महाराष्ट्र",
          business: "डेयरी फार्मिंग और प्रसंस्करण",
          scheme: "पशुपालन योजना",
          beforeIncome: "₹12,000/माह",
          afterIncome: "₹48,000/माह",
          story: "सरकारी सब्सिडी का उपयोग करके 3 गायों से 15 गायों तक विस्तार किया। डिजिटल प्लेटफॉर्म के माध्यम से ऑनलाइन दूध वितरण सेवा और डेयरी उत्पाद शुरू किए।",
          digitalTools: ["ऑनलाइन मार्केटप्लेस", "डिजिटल भुगतान", "डिलीवरी ऐप्स"],
          timeframe: "24 महीने",
          image: "https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXJzJTIwc3VjY2VzcyUyMHN0b3J5JTIwcnVyYWx8ZW58MXx8fHwxNzU5MDU3OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: 3,
          name: "सुनीता देसाई",
          age: 38,
          location: "नासिक, महाराष्ट्र",
          business: "हस्तशिल्प और वस्त्र",
          scheme: "स्किल इंडिया + स्टैंड-अप इंडिया",
          beforeIncome: "₹5,000/माह",
          afterIncome: "₹28,000/माह",
          story: "स्किल इंडिया के माध्यम से नए कौशल सीखे, स्टैंड-अप इंडिया योजना के माध्यम से लोन मिला। अब पूरे भारत में ऑनलाइन हस्तशिल्प बेचती हैं।",
          digitalTools: ["ई-कॉमर्स प्लेटफॉर्म", "इंस्टाग्राम मार्केटिंग", "UPI भुगतान"],
          timeframe: "15 महीने",
          image: "https://images.unsplash.com/photo-1646578486121-67aed93c4f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGhhbmRpY3JhZnRzJTIwdGV4dGlsZXMlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzU5MDU5ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      keyAchievements: "मुख्य उपलब्धियां",
      digitalToolsUsed: "उपयोग किए गए डिजिटल उपकरण",
      timeToSuccess: "सफलता का समय",
      inspiration: "प्रेरणा लें",
      inspirationText: "ये उद्यमी आपकी तरह ही शुरुआत हुई थी। सही योजनाओं और डिजिटल उपकरणों के साथ, आप भी इसी तरह की सफलता हासिल कर सकते हैं।"
    },
    mr: {
      title: "यशाच्या गोष्टी",
      subtitle: "वास्तविक उद्योजक ज्यांनी सरकारी योजना आणि डिजिटल साधनांनी आपले जीवन बदलले",
      stories: [
        {
          id: 1,
          name: "प्रिया शर्मा",
          age: 34,
          location: "सातारा, महाराष्ट्र",
          business: "सेंद्रिय शेती आणि थेट विक्री",
          scheme: "पीएम-किसान + मुद्रा लोन",
          beforeIncome: "₹8,000/महिना",
          afterIncome: "₹35,000/महिना",
          story: "फक्त 2 एकर जमिनीपासून सुरुवात केली, पीएम-किसान सहाय्य आणि मुद्रा लोन वापरून सेंद्रिय शेतीचा विस्तार केला। आता व्हाट्सअॅप बिझनेसद्वारे थेट ग्राहकांना विकते.",
          digitalTools: ["व्हाट्सअॅप बिझनेस", "UPI पेमेंट", "सोशल मीडिया"],
          timeframe: "18 महिने",
          image: "https://images.unsplash.com/photo-1709552645252-f80c79dfb05d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHdvbWVuJTIwZW50cmVwcmVuZXVyJTIwaW5kaWF8ZW58MXx8fHwxNzU5MDU3OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: 2,
          name: "राजेश पाटील",
          age: 42,
          location: "पुणे, महाराष्ट्र",
          business: "दुग्धशाळा आणि प्रक्रिया",
          scheme: "पशुसंवर्धन योजना",
          beforeIncome: "₹12,000/महिना",
          afterIncome: "₹48,000/महिना",
          story: "सरकारी अनुदान वापरून 3 गायींपासून 15 गायींपर्यंत विस्तार केला. डिजिटल प्लॅटफॉर्मद्वारे ऑनलाइन दूध वितरण सेवा आणि दुग्धजन्य पदार्थ सुरू केले.",
          digitalTools: ["ऑनलाइन मार्केटप्लेस", "डिजिटल पेमेंट", "डिलिव्हरी अॅप्स"],
          timeframe: "24 महिने",
          image: "https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXJzJTIwc3VjY2VzcyUyMHN0b3J5JTIwcnVyYWx8ZW58MXx8fHwxNzU5MDU3OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        },
        {
          id: 3,
          name: "सुनीता देसाई",
          age: 38,
          location: "नाशिक, महाराष्ट्र",
          business: "हस्तकला आणि वस्त्र",
          scheme: "स्किल इंडिया + स्टँड-अप इंडिया",
          beforeIncome: "₹5,000/महिना",
          afterIncome: "₹28,000/महिना",
          story: "स्किल इंडियाद्वारे नवीन कौशल्ये शिकली, स्टँड-अप इंडिया योजनेद्वारे कर्ज मिळाले. आता संपूर्ण भारतात ऑनलाइन हस्तकला विकते.",
          digitalTools: ["ई-कॉमर्स प्लॅटफॉर्म", "इन्स्टाग्राम मार्केटिंग", "UPI पेमेंट"],
          timeframe: "15 महिने",
          image: "https://images.unsplash.com/photo-1646578486121-67aed93c4f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGhhbmRpY3JhZnRzJTIwdGV4dGlsZXMlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzU5MDU5ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
      ],
      keyAchievements: "मुख्य यश",
      digitalToolsUsed: "वापरलेली डिजिटल साधने",
      timeToSuccess: "यशाचा काळ",
      inspiration: "प्रेरणा घ्या",
      inspirationText: "हे उद्योजक तुमच्यासारखेच सुरुवात केली होती. योग्य योजना आणि डिजिटल साधनांसह, तुम्हीही अशाच यशा मिळवू शकता."
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1>{currentContent.title}</h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">{currentContent.subtitle}</p>
      </div>

      <div className="space-y-8">
        {currentContent.stories.map((story) => (
          <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              
              <div className="md:col-span-2 p-6">
                <CardHeader className="p-0 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{story.name}, {story.age}</CardTitle>
                      <div className="flex items-center gap-1 text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{story.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800" variant="secondary">
                      {story.timeframe}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-primary">{story.business}</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Scheme Used:</span> {story.scheme}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="p-0 space-y-4">
                  <p className="text-sm leading-relaxed">{story.story}</p>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 bg-muted/30 rounded-lg px-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Before</p>
                      <p className="font-medium text-red-600">{story.beforeIncome}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">After</p>
                      <p className="font-medium text-green-600 flex items-center justify-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {story.afterIncome}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {currentContent.digitalToolsUsed}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {story.digitalTools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Inspiration Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="text-center p-8">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="mb-4">{currentContent.inspiration}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {currentContent.inspirationText}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}