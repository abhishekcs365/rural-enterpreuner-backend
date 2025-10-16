import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  Lightbulb,
  Target
} from 'lucide-react'
import { motion } from 'motion/react'

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

interface PersonalizedSchemesProps {
  language: string
  profileData: ProfileData
  onContinueToApp: () => void
}

export function PersonalizedSchemes({ language, profileData, onContinueToApp }: PersonalizedSchemesProps) {
  const content = {
    en: {
      title: "Recommended Schemes for You",
      subtitle: "Based on your profile, here are the government schemes that best match your needs",
      personalizedFor: "Personalized for",
      highMatch: "High Match",
      mediumMatch: "Medium Match",
      potentialBenefit: "Potential Benefit",
      continueToApp: "Continue to Dashboard",
      whyRecommended: "Why this is recommended for you:",
      nextSteps: "Next Steps:",
      perfectMatch: "Perfect Match!",
      goodMatch: "Good Match",
      worth: "Worth up to"
    },
    hi: {
      title: "आपके लिए अनुशंसित योजनाएं",
      subtitle: "आपकी प्रोफाइल के आधार पर, यहां वे सरकारी योजनाएं हैं जो आपकी आवश्यकताओं से सबसे अच्छी तरह मेल खाती हैं",
      personalizedFor: "व्यक्तिगत रूप से",
      highMatch: "उच्च मैच",
      mediumMatch: "मध्यम मैच",
      potentialBenefit: "संभावित लाभ",
      continueToApp: "डैशबोर्ड पर जाएं",
      whyRecommended: "यह आपके लिए क्यों अनुशंसित है:",
      nextSteps: "अगले चरण:",
      perfectMatch: "परफेक्ट मैच!",
      goodMatch: "अच्छा मैच",
      worth: "तक का मूल्य"
    },
    mr: {
      title: "तुमच्यासाठी शिफारस केलेल्या योजना",
      subtitle: "तुमच्या प्रोफाइलच्या आधारावर, तुमच्या गरजांशी सर्वोत्तम जुळणाऱ्या सरकारी योजना येथे आहेत",
      personalizedFor: "वैयक्तिकरित्या",
      highMatch: "उच्च जुळणी",
      mediumMatch: "मध्यम जुळणी",
      potentialBenefit: "संभाव्य फायदा",
      continueToApp: "डॅशबोर्डवर जा",
      whyRecommended: "हे तुमच्यासाठी का शिफारस केले आहे:",
      nextSteps: "पुढील पावले:",
      perfectMatch: "परफेक्ट मॅच!",
      goodMatch: "चांगली मॅच",
      worth: "पर्यंतचे मूल्य"
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  // Generate personalized scheme recommendations based on profile
  const getPersonalizedSchemes = () => {
    const schemes = []

    // Agriculture-related schemes
    if (profileData.occupation.toLowerCase().includes('farmer') || 
        profileData.businessType.toLowerCase().includes('agriculture')) {
      schemes.push({
        id: 1,
        title: language === 'hi' ? 'प्रधानमंत्री किसान सम्मान निधि' : 
              language === 'mr' ? 'प्रधानमंत्री किसान सम्मान निधी' : 
              'PM Kisan Samman Nidhi',
        description: language === 'hi' ? 'छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की आर्थिक सहायता' :
                    language === 'mr' ? 'लहान आणि सीमांत शेतकऱ्यांना दरवर्षी ₹6,000 आर्थिक सहाय्य' :
                    'Financial assistance of ₹6,000 per year to small and marginal farmers',
        matchLevel: 'high',
        benefit: '₹6,000/year',
        reasons: language === 'hi' ? [
          'आप कृषि क्षेत्र में काम करते हैं',
          'छोटे किसानों के लिए योजना',
          'तत्काल वित्तीय सहायता'
        ] : language === 'mr' ? [
          'तुम्ही शेती क्षेत्रात काम करता',
          'लहान शेतकऱ्यांसाठी योजना',  
          'तत्काल आर्थिक सहाय्य'
        ] : [
          'You work in agriculture sector',
          'Scheme for small farmers',
          'Immediate financial assistance'
        ],
        nextSteps: language === 'hi' ? [
          'आधार कार्ड तैयार रखें',
          'बैंक खाता विवरण',
          'भूमि के कागजात'
        ] : language === 'mr' ? [
          'आधार कार्ड तयार ठेवा',
          'बँक खाते तपशील',
          'जमिनीची कागदपत्रे'
        ] : [
          'Keep Aadhar card ready',
          'Bank account details',
          'Land documents'
        ]
      })
    }

    // Dairy-related schemes
    if (profileData.occupation.toLowerCase().includes('dairy') || 
        profileData.businessType.toLowerCase().includes('dairy')) {
      schemes.push({
        id: 2,
        title: language === 'hi' ? 'राष्ट्रीय पशुधन मिशन' : 
              language === 'mr' ? 'राष्ट्रीय पशुधन मिशन' : 
              'National Livestock Mission',
        description: language === 'hi' ? 'डेयरी व्यवसाय के लिए सब्सिडी और वित्तीय सहायता' :
                    language === 'mr' ? 'दुग्धव्यवसायासाठी सबसिडी आणि आर्थिक सहाय्य' :
                    'Subsidy and financial assistance for dairy business',
        matchLevel: 'high',
        benefit: '₹50,000-₹5 lakh',
        reasons: language === 'hi' ? [
          'डेयरी व्यवसाय में रुचि',
          'पशुपालन के लिए समर्थन',
          '50% तक सब्सिडी'
        ] : language === 'mr' ? [
          'दुग्धव्यवसायात रस',
          'पशुपालनासाठी समर्थन',
          '50% पर्यंत सबसिडी'
        ] : [
          'Interest in dairy business',
          'Support for animal husbandry',
          'Up to 50% subsidy'
        ],
        nextSteps: language === 'hi' ? [
          'व्यवसाय योजना तैयार करें',
          'पशु चिकित्सक प्रमाण पत्र',
          'बैंक से संपर्क करें'
        ] : language === 'mr' ? [
          'व्यवसाय योजना तयार करा',
          'पशुवैद्य प्रमाणपत्र',
          'बँकेशी संपर्क साधा'
        ] : [
          'Prepare business plan',
          'Veterinary certificate',
          'Contact bank'
        ]
      })
    }

    // MUDRA loan for small businesses
    if (profileData.businessType !== '' && !profileData.occupation.toLowerCase().includes('farmer')) {
      schemes.push({
        id: 3,
        title: language === 'hi' ? 'प्रधानमंत्री मुद्रा योजना' : 
              language === 'mr' ? 'प्रधानमंत्री मुद्रा योजना' : 
              'PM MUDRA Yojana',
        description: language === 'hi' ? 'छोटे व्यवसायों के लिए बिना गारंटी के ऋण' :
                    language === 'mr' ? 'छोटे व्यवसायांसाठी गारंटीशिवाय कर्ज' :
                    'Collateral-free loans for small businesses',
        matchLevel: profileData.businessExperience === 'No Experience' ? 'medium' : 'high',
        benefit: '₹50,000-₹10 lakh',
        reasons: language === 'hi' ? [
          'छोटे व्यवसाय के लिए उपयुक्त',
          'बिना गारंटी के ऋण',
          'कम ब्याज दर'
        ] : language === 'mr' ? [
          'छोट्या व्यवसायासाठी योग्य',
          'गारंटीशिवाय कर्ज',
          'कमी व्याजदर'
        ] : [
          'Suitable for small business',
          'No collateral required',
          'Low interest rates'
        ],
        nextSteps: language === 'hi' ? [
          'व्यवसाय योजना बनाएं',
          'आधार और पैन कार्ड',
          'बैंक में आवेदन करें'
        ] : language === 'mr' ? [
          'व्यवसाय योजना करा',
          'आधार आणि पॅन कार्ड',
          'बँकेत अर्ज करा'
        ] : [
          'Create business plan',
          'Aadhar and PAN card',
          'Apply at bank'
        ]
      })
    }

    // Skill development if no experience
    if (profileData.businessExperience === 'No Experience' || 
        profileData.businessExperience === 'Less than 1 year') {
      schemes.push({
        id: 4,
        title: language === 'hi' ? 'प्रधानमंत्री कौशल विकास योजना' : 
              language === 'mr' ? 'प्रधानमंत्री कौशल्य विकास योजना' : 
              'PM Skill Development Scheme',
        description: language === 'hi' ? 'मुफ्त कौशल प्रशिक्षण और प्रमाणन' :
                    language === 'mr' ? 'मोफत कौशल्य प्रशिक्षण आणि प्रमाणन' :
                    'Free skill training and certification',
        matchLevel: 'medium',
        benefit: 'Free Training + ₹8,000',
        reasons: language === 'hi' ? [
          'नया व्यवसाय शुरू करने में सहायक',
          'मुफ्त प्रशिक्षण',
          'प्रमाण पत्र मिलता है'
        ] : language === 'mr' ? [
          'नवीन व्यवसाय सुरू करण्यास उपयुक्त',
          'मोफत प्रशिक्षण',
          'प्रमाणपत्र मिळते'
        ] : [
          'Helpful for starting new business',
          'Free training provided',
          'Certificate awarded'
        ],
        nextSteps: language === 'hi' ? [
          'प्रशिक्षण केंद्र खोजें',
          'कोर्स का चयन करें',
          'ऑनलाइन पंजीकरण करें'
        ] : language === 'mr' ? [
          'प्रशिक्षण केंद्र शोधा',
          'कोर्स निवडा',
          'ऑनलाइन नोंदणी करा'
        ] : [
          'Find training center',
          'Choose course',
          'Register online'
        ]
      })
    }

    return schemes
  }

  const personalizedSchemes = getPersonalizedSchemes()

  return (
    <div 
      className="min-h-screen p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1574096457326-9b53cb1717c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtYWhhcmFzaHRyYSUyMHJ1cmFsJTIwbGFuZHNjYXBlJTIwZmllbGRzJTIwbW91bnRhaW5zfGVufDF8fHx8MTc1OTA1OTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{currentContent.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{currentContent.subtitle}</p>
          
          <Alert className="max-w-md mx-auto">
            <Star className="h-4 w-4" />
            <AlertDescription>
              <strong>{currentContent.personalizedFor} {profileData.name}</strong> - {profileData.occupation} in {profileData.district}
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Recommended Schemes */}
        <div className="space-y-6">
          {personalizedSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white/95 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{scheme.title}</CardTitle>
                        <Badge 
                          className={scheme.matchLevel === 'high' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {scheme.matchLevel === 'high' ? currentContent.perfectMatch : currentContent.goodMatch}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{scheme.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{currentContent.potentialBenefit}</div>
                      <div className="text-lg font-semibold text-green-600">{scheme.benefit}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        {currentContent.whyRecommended}
                      </h4>
                      <ul className="space-y-1">
                        {scheme.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        {currentContent.nextSteps}
                      </h4>
                      <ul className="space-y-1">
                        {scheme.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium">{idx + 1}</span>
                            </div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="text-center p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
                  <div className="text-2xl font-bold text-green-600">
                    ₹{personalizedSchemes.length * 25000}+
                  </div>
                  <div className="text-sm text-muted-foreground">{currentContent.worth}</div>
                </div>
                <div className="space-y-2">
                  <Users className="h-8 w-8 text-blue-600 mx-auto" />
                  <div className="text-2xl font-bold text-blue-600">{personalizedSchemes.length}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'मैचिंग योजनाएं' : 
                     language === 'mr' ? 'जुळणाऱ्या योजना' : 
                     'Matching Schemes'}
                  </div>
                </div>
                <div className="space-y-2">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto" />
                  <div className="text-2xl font-bold text-purple-600">90%</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'hi' ? 'सफलता दर' : 
                     language === 'mr' ? 'यश दर' : 
                     'Success Rate'}
                  </div>
                </div>
              </div>

              <Button onClick={onContinueToApp} size="lg" className="px-8">
                {currentContent.continueToApp}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}