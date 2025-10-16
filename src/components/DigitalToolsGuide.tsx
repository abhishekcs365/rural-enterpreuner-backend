import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Smartphone, Wifi, DollarSign, TrendingUp, Users, ShoppingCart, Camera, MessageSquare, FileText } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { PDFTranslator } from './PDFTranslator'

interface DigitalToolsGuideProps {
  language: string
}

export function DigitalToolsGuide({ language }: DigitalToolsGuideProps) {
  const [showPDFTranslator, setShowPDFTranslator] = useState(false)

  const content = {
    en: {
      title: "Digital Tools for Rural Entrepreneurs",
      subtitle: "Discover how digital tools can transform your business and increase profits",
      heroText: "Embrace technology to grow your business and reach more customers",
      pdfTranslatorSection: "Document Translation",
      tools: [
        {
          id: 1,
          title: "Mobile Banking & UPI",
          description: "Accept digital payments from customers instantly",
          category: "Finance",
          difficulty: "Easy",
          icon: Smartphone,
          benefits: ["No cash handling", "Instant payments", "Transaction records", "Government scheme payments"],
          steps: ["Download any UPI app", "Link your bank account", "Create UPI ID", "Start accepting payments"],
          businessImpact: "Increase sales by 30-40% by accepting digital payments"
        },
        {
          id: 2,
          title: "WhatsApp Business",
          description: "Connect with customers and showcase your products",
          category: "Communication",
          difficulty: "Easy",
          icon: MessageSquare,
          benefits: ["Free messaging", "Product catalog", "Customer support", "Broadcast messages"],
          steps: ["Download WhatsApp Business", "Set up business profile", "Add product catalog", "Share with customers"],
          businessImpact: "Reach 10x more customers with zero marketing cost"
        },
        {
          id: 3,
          title: "Online Marketplaces",
          description: "Sell products on platforms like Amazon, Flipkart",
          category: "Sales",
          difficulty: "Medium",
          icon: ShoppingCart,
          benefits: ["Pan-India reach", "Built-in customers", "Payment security", "Logistics support"],
          steps: ["Register as seller", "Upload product photos", "Set competitive prices", "Handle orders"],
          businessImpact: "Access to millions of customers across India"
        },
        {
          id: 4,
          title: "Social Media Marketing",
          description: "Use Facebook, Instagram to promote your business",
          category: "Marketing",
          difficulty: "Medium",
          icon: Camera,
          benefits: ["Free promotion", "Targeted advertising", "Customer feedback", "Brand building"],
          steps: ["Create business page", "Post product photos", "Engage with customers", "Run affordable ads"],
          businessImpact: "Build brand awareness and customer loyalty"
        },
        {
          id: 5,
          title: "PDF Document Translator",
          description: "Translate government documents and notices to your language",
          category: "Productivity",
          difficulty: "Easy",
          icon: FileText,
          benefits: ["Instant translation", "Support for multiple languages", "Understand government notices", "Free to use"],
          steps: ["Upload PDF document", "Select target language", "Get translated text", "Download results"],
          businessImpact: "Understand official documents in your preferred language"
        }
      ],
      getStarted: "Get Started",
      watchTutorial: "Watch Tutorial",
      useTool: "Use Tool",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard"
    },
    hi: {
      title: "ग्रामीण उद्यमियों के लिए डिजिटल उपकरण",
      subtitle: "जानें कि डिजिटल उपकरण आपके व्यवसाय को कैसे बदल सकते हैं और मुनाफा बढ़ा सकते हैं",
      heroText: "अपने व्यवसाय को बढ़ाने और अधिक ग्राहकों तक पहुंचने के लिए तकनीक अपनाएं",
      tools: [
        {
          id: 1,
          title: "मोबाइल बैंकिंग और UPI",
          description: "ग्राहकों से तुरंत डिजिटल भुगतान स्वीकार करें",
          category: "वित्त",
          difficulty: "आसान",
          icon: Smartphone,
          benefits: ["नकद लेन-देन नहीं", "तत्काल भुगतान", "लेन-देन रिकॉर्ड", "सरकारी योजना भुगतान"],
          steps: ["कोई भी UPI ऐप डाउनलोड करें", "अपना बैंक खाता लिंक करें", "UPI ID बनाएं", "भुगतान स्वीकार करना शुरू करें"],
          businessImpact: "डिजिटल भुगतान स्वीकार करके बिक्री में 30-40% वृद्धि"
        },
        {
          id: 2,
          title: "व्हाट्सऐप बिजनेस",
          description: "ग्राहकों से जुड़ें और अपने उत्पादों को दिखाएं",
          category: "संचार",
          difficulty: "आसान",
          icon: MessageSquare,
          benefits: ["मुफ्त संदेश", "उत्पाद कैटलॉग", "ग्राहक सहायता", "ब्रॉडकास्ट संदेश"],
          steps: ["व्हाट्सऐप बिजनेस डाउनलोड करें", "व्यवसाय प्रोफ़ाइल सेट करें", "उत्पाद कैटलॉग जोड़ें", "ग्राहकों के साथ साझा करें"],
          businessImpact: "शून्य मार्केटिंग लागत के साथ 10 गुना अधिक ग्राहकों तक पहुंचें"
        },
        {
          id: 3,
          title: "ऑनलाइन मार्केटप्लेस",
          description: "अमेज़न, फ्लिपकार्ट जैसे प्लेटफॉर्म पर उत्पाद बेचें",
          category: "बिक्री",
          difficulty: "मध्यम",
          icon: ShoppingCart,
          benefits: ["पूरे भारत में पहुंच", "बने-बनाए ग्राहक", "भुगतान सुरक्षा", "लॉजिस्टिक्स सहायता"],
          steps: ["विक्रेता के रूप में पंजीकरण करें", "उत्पाद फ़ोटो अपलोड करें", "प्रतिस्पर्धी मूल्य निर्धारण", "ऑर्डर संभालें"],
          businessImpact: "भारत भर के लाखों ग्राहकों तक पहुंच"
        },
        {
          id: 4,
          title: "सोशल मीडिया मार्केटिंग",
          description: "अपने व्यवसाय को बढ़ावा देने के लिए फेसबुक, इंस्टाग्राम का उपयोग करें",
          category: "मार्केटिंग",
          difficulty: "मध्यम",
          icon: Camera,
          benefits: ["मुफ्त प्रचार", "लक्षित विज्ञापन", "ग्राहक प्रतिक्रिया", "ब्रांड निर्माण"],
          steps: ["व्यवसाय पेज बनाएं", "उत्पाद फ़ोटो पोस्ट करें", "ग्राहकों से जुड़ें", "किफायती विज्ञापन चलाएं"],
          businessImpact: "ब्रांड जागरूकता और ग्राहक वफादारी का निर्माण"
        },
        {
          id: 5,
          title: "पीडीएफ दस्तावेज़ अनुवादक",
          description: "सरकारी दस्तावेजों और नोटिसों का अपनी भाषा में अनुवाद करें",
          category: "उत्पादकता",
          difficulty: "आसान",
          icon: FileText,
          benefits: ["तुरंत अनुवाद", "कई भाषाओं के लिए समर्थन", "सरकारी नोटिस समझें", "उपयोग करने के लिए मुफ़्त"],
          steps: ["पीडीएफ दस्तावेज़ अपलोड करें", "लक्ष्य भाषा चुनें", "अनुवादित पाठ प्राप्त करें", "परिणाम डाउनलोड करें"],
          businessImpact: "अपनी पसंदीदा भाषा में आधिकारिक दस्तावेज़ समझें"
        }
      ],
      getStarted: "शुरू करें",
      watchTutorial: "ट्यूटोरियल देखें",
      useTool: "उपकरण का उपयोग करें",
      easy: "आसान",
      medium: "मध्यम",
      hard: "कठिन"
    },
    mr: {
      title: "ग्रामीण उद्योजकांसाठी डिजिटल साधने",
      subtitle: "डिजिटल साधने तुमच्या व्यवसायाचे कसे रूपांतर करू शकतात आणि नफा कसा वाढवू शकतात ते जाणून घ्या",
      heroText: "तुमचा व्यवसाय वाढवण्यासाठी आणि अधिक ग्राहकांपर्यंत पोहोचण्यासाठी तंत्रज्ञान स्वीकारा",
      tools: [
        {
          id: 1,
          title: "मोबाइल बँकिंग आणि UPI",
          description: "ग्राहकांकडून तातडीने डिजिटल पेमेंट स्वीकारा",
          category: "वित्त",
          difficulty: "सोपे",
          icon: Smartphone,
          benefits: ["रोख व्यवहार नाही", "तत्काळ पेमेंट", "व्यवहार रेकॉर्ड", "सरकारी योजना पेमेंट"],
          steps: ["कोणतेही UPI अॅप डाउनलोड करा", "तुमचे बँक खाते लिंक करा", "UPI ID तयार करा", "पेमेंट स्वीकारणे सुरू करा"],
          businessImpact: "डिजिटल पेमेंट स्वीकारून विक्री 30-40% वाढवा"
        },
        {
          id: 2,
          title: "व्हाट्सअॅप बिझनेस",
          description: "ग्राहकांशी जुळवून घ्या आणि तुमची उत्पादने दाखवा",
          category: "संवाद",
          difficulty: "सोपे",
          icon: MessageSquare,
          benefits: ["मोफत संदेश", "उत्पादन कॅटलॉग", "ग्राहक सेवा", "ब्रॉडकास्ट संदेश"],
          steps: ["व्हाट्सअॅप बिझनेस डाउनलोड करा", "व्यवसाय प्रोफाइल सेट करा", "उत्पादन कॅटलॉग जोडा", "ग्राहकांसोबत शेअर करा"],
          businessImpact: "शून्य मार्केटिंग खर्चाने 10 पट जास्त ग्राहकांपर्यंत पोहोचा"
        },
        {
          id: 3,
          title: "ऑनलाइन मार्केटप्लेस",
          description: "अॅमेझॉन, फ्लिपकार्ट सारख्या प्लॅटफॉर्मवर उत्पादने विका",
          category: "विक्री",
          difficulty: "मध्यम",
          icon: ShoppingCart,
          benefits: ["संपूर्ण भारतात पोहोच", "तयार ग्राहक", "पेमेंट सुरक्षा", "लॉजिस्टिक्स सहाय्य"],
          steps: ["विक्रेता म्हणून नोंदणी करा", "उत्पादन फोटो अपलोड करा", "स्पर्धात्मक किंमती सेट करा", "ऑर्डर हाताळा"],
          businessImpact: "भारतातील लाखो ग्राहकांपर्यंत पोहोच"
        },
        {
          id: 4,
          title: "सोशल मीडिया मार्केटिंग",
          description: "तुमच्या व्यवसायाला प्रोत्साहन देण्यासाठी फेसबुक, इन्स्टाग्राम वापरा",
          category: "मार्केटिंग",
          difficulty: "मध्यम",
          icon: Camera,
          benefits: ["मोफत जाहिरात", "लक्ष्यित जाहिरात", "ग्राहक प्रतिक्रिया", "ब्रँड बिल्डिंग"],
          steps: ["व्यवसाय पेज तयार करा", "उत्पादन फोटो पोस्ट करा", "ग्राहकांशी संवाद साधा", "परवडणार्‍या जाहिराती चालवा"],
          businessImpact: "ब्रँड जागरूकता आणि ग्राहक निष्ठा निर्माण करा"
        },
        {
          id: 5,
          title: "पीडीएफ दस्तऐवज अनुवादक",
          description: "सरकारी कागदपत्रे आणि नोटीसींचे तुमच्या भाषेत भाषांतर करा",
          category: "उत्पादकता",
          difficulty: "सोपे",
          icon: FileText,
          benefits: ["तात्काळ भाषांतर", "अनेक भाषांसाठी समर्थन", "सरकारी नोटीसा समजून घ्या", "वापरण्यास मोफत"],
          steps: ["पीडीएफ दस्तऐवज अपलोड करा", "लक्ष्य भाषा निवडा", "भाषांतरित मजकूर मिळवा", "परिणाम डाउनलोड करा"],
          businessImpact: "तुमच्या पसंतीच्या भाषेत अधिकृत कागदपत्रे समजून घ्या"
        }
      ],
      getStarted: "सुरू करा",
      watchTutorial: "ट्यूटोरियल पहा",
      useTool: "साधन वापरा",
      easy: "सोपे",
      medium: "मध्यम",
      hard: "कठीण"
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Hard': 'bg-red-100 text-red-800',
      'आसान': 'bg-green-100 text-green-800',
      'मध्यम': 'bg-yellow-100 text-yellow-800',
      'कठिन': 'bg-red-100 text-red-800',
      'सोपे': 'bg-green-100 text-green-800'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Finance': 'bg-blue-100 text-blue-800',
      'Communication': 'bg-green-100 text-green-800',
      'Sales': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-orange-100 text-orange-800',
      'Productivity': 'bg-teal-100 text-teal-800',
      'वित्त': 'bg-blue-100 text-blue-800',
      'संचार': 'bg-green-100 text-green-800',
      'बिक्री': 'bg-purple-100 text-purple-800',
      'मार्केटिंग': 'bg-orange-100 text-orange-800',
      'उत्पादकता': 'bg-teal-100 text-teal-800',
      'संवाद': 'bg-green-100 text-green-800',
      'विक्री': 'bg-purple-100 text-purple-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1631157397401-f0048dc02721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHNtYXJ0cGhvbmUlMjBydXJhbHxlbnwxfHx8fDE3NTkwNTY4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Digital technology for rural entrepreneurs"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-white">{currentContent.title}</h1>
            <p className="text-lg">{currentContent.heroText}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {currentContent.tools.map((tool) => {
          const IconComponent = tool.icon
          return (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getCategoryColor(tool.category)} variant="secondary">
                          {tool.category}
                        </Badge>
                        <Badge className={getDifficultyColor(tool.difficulty)} variant="secondary">
                          {tool.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800 mb-1">Business Impact:</p>
                  <p className="text-sm text-green-700">{tool.businessImpact}</p>
                </div>

                <div>
                  <p className="font-medium mb-2">Key Benefits:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {tool.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">Getting Started:</p>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    {tool.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/10 text-primary text-xs rounded-full flex items-center justify-center mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-2 pt-2">
                  {tool.id === 5 ? (
                    <Button 
                      className="flex-1" 
                      onClick={() => setShowPDFTranslator(!showPDFTranslator)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {currentContent.useTool}
                    </Button>
                  ) : (
                    <>
                      <Button className="flex-1">
                        <Smartphone className="h-4 w-4 mr-2" />
                        {currentContent.getStarted}
                      </Button>
                      <Button variant="outline">
                        {currentContent.watchTutorial}
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* PDF Translator Section */}
      {showPDFTranslator && (
        <div className="mt-8">
          <PDFTranslator language={language} />
        </div>
      )}
    </div>
  )
}