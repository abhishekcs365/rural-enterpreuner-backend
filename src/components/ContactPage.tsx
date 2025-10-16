import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Phone, Mail, MapPin, Clock, MessageSquare, HelpCircle } from 'lucide-react'

interface ContactPageProps {
  language: string
}

export function ContactPage({ language }: ContactPageProps) {
  const content = {
    en: {
      title: "Get Help & Support",
      subtitle: "We're here to help you succeed with government schemes and digital tools",
      form: {
        title: "Send us a Message",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        subject: "Subject",
        message: "Your Message",
        submit: "Send Message",
        namePlaceholder: "Enter your full name",
        emailPlaceholder: "your.email@example.com",
        phonePlaceholder: "+91 98765 43210",
        subjectPlaceholder: "What do you need help with?",
        messagePlaceholder: "Describe your question or issue in detail..."
      },
      helpline: {
        title: "24/7 Helpline",
        description: "Get instant help in your preferred language",
        phone: "1800-XXX-XXXX",
        whatsapp: "WhatsApp Support"
      },
      office: {
        title: "Regional Office",
        address: "Rural Development Center\nPune, Maharashtra 411001",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 9:00 AM - 1:00 PM"
      },
      faqs: [
        {
          question: "How do I apply for government schemes?",
          answer: "Each scheme has different application processes. Visit our Government Schemes section for step-by-step guides."
        },
        {
          question: "Are digital tools really beneficial for rural businesses?",
          answer: "Yes! Our research shows 40% average income increase for entrepreneurs using digital tools properly."
        },
        {
          question: "Is this service completely free?",
          answer: "Absolutely! All our resources, guides, and support are completely free for rural entrepreneurs."
        }
      ]
    },
    hi: {
      title: "सहायता और समर्थन प्राप्त करें",
      subtitle: "हम सरकारी योजनाओं और डिजिटल उपकरणों के साथ आपकी सफलता में मदद करने के लिए यहाँ हैं",
      form: {
        title: "हमें संदेश भेजें",
        name: "पूरा नाम",
        email: "ईमेल पता",
        phone: "फोन नंबर",
        subject: "विषय",
        message: "आपका संदेश",
        submit: "संदेश भेजें",
        namePlaceholder: "अपना पूरा नाम दर्ज करें",
        emailPlaceholder: "your.email@example.com",
        phonePlaceholder: "+91 98765 43210",
        subjectPlaceholder: "आपको किस चीज़ में मदद चाहिए?",
        messagePlaceholder: "अपने प्रश्न या समस्या का विस्तार से वर्णन करें..."
      },
      helpline: {
        title: "24/7 हेल्पलाइन",
        description: "अपनी पसंदीदा भाषा में तुरंत सहायता प्राप्त करें",
        phone: "1800-XXX-XXXX",
        whatsapp: "व्हाट्सऐप सहायता"
      },
      office: {
        title: "क्षेत्रीय कार्यालय",
        address: "ग्रामीण विकास केंद्र\nपुणे, महाराष्ट्र 411001",
        hours: "सोम-शुक्र: सुबह 9:00 - शाम 6:00\nशनि: सुबह 9:00 - दोपहर 1:00"
      },
      faqs: [
        {
          question: "मैं सरकारी योजनाओं के लिए कैसे आवेदन करूं?",
          answer: "प्रत्येक योजना की अलग आवेदन प्रक्रिया है। चरणबद्ध गाइड के लिए हमारा सरकारी योजनाएं सेक्शन देखें।"
        },
        {
          question: "क्या डिजिटल उपकरण वास्तव में ग्रामीण व्यवसायों के लिए फायदेमंद हैं?",
          answer: "हाँ! हमारे शोध से पता चलता है कि डिजिटल उपकरणों का सही उपयोग करने वाले उद्यमियों की औसत आय में 40% वृद्धि होती है।"
        },
        {
          question: "क्या यह सेवा पूरी तरह से मुफ्त है?",
          answer: "बिल्कुल! हमारे सभी संसाधन, गाइड और सहायता ग्रामीण उद्यमियों के लिए पूरी तरह से मुफ्त हैं।"
        }
      ]
    },
    mr: {
      title: "मदत आणि सहाय्य मिळवा",
      subtitle: "सरकारी योजना आणि डिजिटल साधनांसह तुमच्या यशात मदत करण्यासाठी आम्ही येथे आहोत",
      form: {
        title: "आम्हाला संदेश पाठवा",
        name: "पूर्ण नाव",
        email: "ईमेल पत्ता",
        phone: "फोन नंबर",
        subject: "विषय",
        message: "तुमचा संदेश",
        submit: "संदेश पाठवा",
        namePlaceholder: "तुमचे पूर्ण नाव टाका",
        emailPlaceholder: "your.email@example.com",
        phonePlaceholder: "+91 98765 43210",
        subjectPlaceholder: "तुम्हाला कशात मदत हवी?",
        messagePlaceholder: "तुमच्या प्रश्न किंवा समस्येचे तपशीलवार वर्णन करा..."
      },
      helpline: {
        title: "24/7 हेल्पलाइन",
        description: "तुमच्या आवडत्या भाषेत तत्काळ मदत मिळवा",
        phone: "1800-XXX-XXXX",
        whatsapp: "व्हाट्सअॅप सपोर्ट"
      },
      office: {
        title: "प्रादेशिक कार्यालय",
        address: "ग्रामीण विकास केंद्र\nपुणे, महाराष्ट्र 411001",
        hours: "सोम-शुक्र: सकाळी 9:00 - संध्याकाळी 6:00\nशनि: सकाळी 9:00 - दुपारी 1:00"
      },
      faqs: [
        {
          question: "मी सरकारी योजनांसाठी कसा अर्ज करू?",
          answer: "प्रत्येक योजनेची वेगळी अर्ज प्रक्रिया असते. टप्प्याटप्प्याच्या मार्गदर्शनासाठी आमचा सरकारी योजना विभाग पहा।"
        },
        {
          question: "डिजिटल साधने खरोखरच ग्रामीण व्यवसायांसाठी फायदेशीर आहेत का?",
          answer: "होय! आमच्या संशोधनानुसार डिजिटल साधनांचा योग्य वापर करणाऱ्या उद्योजकांच्या सरासरी उत्पन्नात 40% वाढ होते."
        },
        {
          question: "ही सेवा पूर्णपणे मोफत आहे का?",
          answer: "नक्कीच! आमची सर्व संसाधने, मार्गदर्शक आणि सहाय्य ग्रामीण उद्योजकांसाठी पूर्णपणे मोफत आहेत."
        }
      ]
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1>{currentContent.title}</h1>
        <p className="text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {currentContent.form.title}
            </CardTitle>
            <CardDescription>
              We'll respond within 24 hours in your preferred language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{currentContent.form.name}</Label>
                <Input
                  id="name"
                  placeholder={currentContent.form.namePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{currentContent.form.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={currentContent.form.phonePlaceholder}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{currentContent.form.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={currentContent.form.emailPlaceholder}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">{currentContent.form.subject}</Label>
              <Input
                id="subject"
                placeholder={currentContent.form.subjectPlaceholder}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">{currentContent.form.message}</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder={currentContent.form.messagePlaceholder}
              />
            </div>
            
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              {currentContent.form.submit}
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Helpline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {currentContent.helpline.title}
              </CardTitle>
              <CardDescription>{currentContent.helpline.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">{currentContent.helpline.phone}</span>
              </div>
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                {currentContent.helpline.whatsapp}
              </Button>
            </CardContent>
          </Card>

          {/* Office Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {currentContent.office.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="whitespace-pre-line">{currentContent.office.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">
                    {currentContent.office.hours}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentContent.faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}