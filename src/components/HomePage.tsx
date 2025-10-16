import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ArrowRight, TrendingUp, Users, Award, Smartphone } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface HomePageProps {
  language: string
  onNavigate: (tab: string) => void
}

export function HomePage({ language, onNavigate }: HomePageProps) {
  const content = {
    en: {
      hero: {
        title: "Empowering Rural Entrepreneurs",
        subtitle: "Bridge the information gap with government schemes and digital tools",
        description: "Access crucial information about government benefits and learn how digital tools can transform your business. Everything delivered in your local language.",
        cta: "Get Started Today"
      },
      stats: [
        { icon: Users, label: "Entrepreneurs Helped", value: "50,000+" },
        { icon: Award, label: "Government Schemes", value: "100+" },
        { icon: Smartphone, label: "Digital Tools", value: "25+" },
        { icon: TrendingUp, label: "Average Income Increase", value: "40%" }
      ],
      features: [
        {
          title: "Government Schemes",
          description: "Discover financial assistance, subsidies, and support programs available for rural entrepreneurs",
          action: "Browse Schemes",
          tab: "schemes"
        },
        {
          title: "Digital Tools Guide",
          description: "Learn how digital tools can increase your profits and reach more customers",
          action: "Explore Tools",
          tab: "tools"
        },
        {
          title: "Local Language Support",
          description: "Access all information in Hindi, Marathi, and English for better understanding",
          action: "Change Language",
          tab: "home"
        }
      ],
      benefits: {
        title: "Why Choose Our Platform?",
        items: [
          "Information in local languages (Hindi, Marathi)",
          "Step-by-step guidance for government schemes",
          "Practical digital tools with real benefits",
          "Cultural relevance for Maharashtra entrepreneurs",
          "Free access to all resources and guides"
        ]
      }
    },
    hi: {
      hero: {
        title: "ग्रामीण उद्यमियों को सशक्त बनाना",
        subtitle: "सरकारी योजनाओं और डिजिटल उपकरणों के साथ जानकारी के अंतर को पाटें",
        description: "सरकारी लाभों के बारे में महत्वपूर्ण जानकारी प्राप्त करें और जानें कि डिजिटल उपकरण आपके व्यवसाय को कैसे बदल सकते हैं। सब कुछ आपकी स्थानीय भाषा में।",
        cta: "आज ही शुरू करें"
      },
      stats: [
        { icon: Users, label: "उद्यमियों की सहायता", value: "50,000+" },
        { icon: Award, label: "सरकारी योजनाएं", value: "100+" },
        { icon: Smartphone, label: "डिजिटल उपकरण", value: "25+" },
        { icon: TrendingUp, label: "औसत आय वृद्धि", value: "40%" }
      ],
      features: [
        {
          title: "सरकारी योजनाएं",
          description: "ग्रामीण उद्यमियों के लिए उपलब्ध वित्तीय सहायता, सब्सिडी और सहायता कार्यक्रम खोजें",
          action: "योजनाएं देखें",
          tab: "schemes"
        },
        {
          title: "डिजिटल उपकरण गाइड",
          description: "जानें कि डिजिटल उपकरण आपके मुनाफे को कैसे बढ़ा सकते हैं और अधिक ग्राहकों तक पहुंच सकते हैं",
          action: "उपकरण देखें",
          tab: "tools"
        },
        {
          title: "स्थानीय भाषा समर्थन",
          description: "बेहतर समझ के लिए हिंदी, मराठी और अंग्रेजी में सभी जानकारी प्राप्त करें",
          action: "भाषा बदलें",
          tab: "home"
        }
      ],
      benefits: {
        title: "हमारा प्लेटफॉर्म क्यों चुनें?",
        items: [
          "स्थानीय भाषाओं में जानकारी (हिंदी, मराठी)",
          "सरकारी योजनाओं के लिए चरणबद्ध मार्गदर्शन",
          "वास्तविक लाभों के साथ व्यावहारिक डिजिटल उपकरण",
          "महाराष्ट्र के उद्यमियों के लिए सांस्कृतिक प्रासंगिकता",
          "सभी संसाधनों और गाइड तक मुफ्त पहुंच"
        ]
      }
    },
    mr: {
      hero: {
        title: "ग्रामीण उद्योजकांना सशक्त बनवणे",
        subtitle: "सरकारी योजना आणि डिजिटल साधनांसह माहितीचे अंतर भरून काढा",
        description: "सरकारी फायद्यांबद्दल महत्त्वाची माहिती मिळवा आणि डिजिटल साधने तुमच्या व्यवसायाचे कसे रूपांतर करू शकतात ते शिका. सर्व काही तुमच्या स्थानिक भाषेत.",
        cta: "आजच सुरुवात करा"
      },
      stats: [
        { icon: Users, label: "उद्योजकांना मदत", value: "50,000+" },
        { icon: Award, label: "सरकारी योजना", value: "100+" },
        { icon: Smartphone, label: "डिजिटल साधने", value: "25+" },
        { icon: TrendingUp, label: "सरासरी उत्पन्न वाढ", value: "40%" }
      ],
      features: [
        {
          title: "सरकारी योजना",
          description: "ग्रामीण उद्योजकांसाठी उपलब्ध आर्थिक मदत, सबसिडी आणि सहाय्यता कार्यक्रम शोधा",
          action: "योजना पहा",
          tab: "schemes"
        },
        {
          title: "डिजिटल साधने मार्गदर्शक",
          description: "डिजिटल साधने तुमचा नफा कसा वाढवू शकतात आणि अधिक ग्राहकांपर्यंत कसे पोहोचू शकतात ते शिका",
          action: "साधने पहा",
          tab: "tools"
        },
        {
          title: "स्थानिक भाषा समर्थन",
          description: "चांगल्या समजुतीसाठी हिंदी, मराठी आणि इंग्रजीमध्ये सर्व माहित��� मिळवा",
          action: "भाषा बदला",
          tab: "home"
        }
      ],
      benefits: {
        title: "आमचे प्लॅटफॉर्म का निवडावे?",
        items: [
          "स्थानिक भाषांमध्ये माहिती (हिंदी, मराठी)",
          "सरकारी योजनांसाठी टप्प्याटप्प्याने मार्गदर्शन",
          "वास्तविक फायद्यांसह व्यावहारिक डिजिटल साधने",
          "महाराष्ट्रातील उद्योजकांसाठी सांस्कृतिक प्रासंगिकता",
          "सर्व संसाधने आणि मार्गदर्शकांमध्ये मोफत प्रवेश"
        ]
      }
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden shadow-lg">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1594179131702-112ff2a880e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGVudHJlcHJlbmV1cnMlMjBpbmRpYSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1OTA1Njg2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Rural entrepreneurs in Maharashtra"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-2xl mx-auto px-6 text-white text-center">
            <div>
              <h1 className="text-4xl md:text-5xl mb-4 text-white">{currentContent.hero.title}</h1>
              <h2 className="text-xl md:text-2xl mb-6 text-gray-100">{currentContent.hero.subtitle}</h2>
              <p className="text-lg mb-8 text-gray-200">{currentContent.hero.description}</p>
              <Button 
                size="lg" 
                onClick={() => onNavigate('schemes')}
              >
                {currentContent.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {currentContent.stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-2xl">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {currentContent.features.map((feature, index) => {
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => onNavigate(feature.tab)}
                  className="w-full"
                >
                  {feature.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Benefits Section */}
      <section className="bg-muted rounded-lg p-8">
        <h2 className="text-center mb-6">{currentContent.benefits.title}</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {currentContent.benefits.items.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 bg-background p-4 rounded-lg border"
            >
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <p>{benefit}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}