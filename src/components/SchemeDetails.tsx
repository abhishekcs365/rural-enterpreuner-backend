import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Checkbox } from './ui/checkbox'
import { Separator } from './ui/separator'
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  FileText, 
  Phone, 
  MapPin, 
  DollarSign,
  Users,
  AlertCircle
} from 'lucide-react'

interface Document {
  id: string
  name: string
  required: boolean
  description: string
  completed: boolean
}

interface SchemeDetailsProps {
  schemeId: number
  language: string
  onBack: () => void
}

export function SchemeDetails({ schemeId, language, onBack }: SchemeDetailsProps) {
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([])

  const schemes = {
    en: {
      1: {
        title: "Pradhan Mantri Mudra Yojana",
        category: "Finance",
        description: "Provides loans up to ₹10 lakh for micro and small enterprises without collateral",
        amount: "₹50,000 - ₹10 lakh",
        eligibility: "Any citizen above 18 years with a viable business plan",
        processingTime: "15-30 days",
        benefits: [
          "No collateral required",
          "Low interest rates (8-12%)",
          "Quick processing",
          "Government guarantee",
          "Flexible repayment options"
        ],
        documents: [
          {
            id: "aadhar",
            name: "Aadhar Card",
            required: true,
            description: "Identity and address proof",
            completed: false
          },
          {
            id: "pan",
            name: "PAN Card",
            required: true,
            description: "Tax identification",
            completed: false
          },
          {
            id: "business_plan",
            name: "Business Plan",
            required: true,
            description: "Detailed business proposal",
            completed: false
          },
          {
            id: "bank_statements",
            name: "Bank Statements (6 months)",
            required: true,
            description: "Financial history",
            completed: false
          },
          {
            id: "income_proof",
            name: "Income Proof",
            required: false,
            description: "Salary slip or ITR",
            completed: false
          }
        ],
        applicationSteps: [
          "Visit nearest bank or apply online",
          "Submit required documents",
          "Bank verification and site visit",
          "Loan approval and disbursement"
        ],
        contacts: [
          { type: "Phone", value: "1800-XXX-MUDRA" },
          { type: "Website", value: "mudra.org.in" },
          { type: "Email", value: "info@mudra.org.in" }
        ]
      }
    },
    hi: {
      1: {
        title: "प्रधानमंत्री मुद्रा योजना",
        category: "वित्त",
        description: "सूक्ष्म और लघु उद्यमों के लिए बिना गारंटी के ₹10 लाख तक का ऋण प्रदान करता है",
        amount: "₹50,000 - ₹10 लाख",
        eligibility: "व्यावहारिक व्यावसायिक योजना के साथ 18 वर्ष से अधिक आयु का कोई भी नागरिक",
        processingTime: "15-30 दिन",
        benefits: [
          "कोई गारंटी की आवश्यकता नहीं",
          "कम ब्याज दरें (8-12%)",
          "त्वरित प्रसंस्करण",
          "सरकारी गारंटी",
          "लचीले पुनर्भुगतान विकल्प"
        ],
        documents: [
          {
            id: "aadhar",
            name: "आधार कार्ड",
            required: true,
            description: "पहचान और पता प्रमाण",
            completed: false
          },
          {
            id: "pan",
            name: "पैन कार्ड",
            required: true,
            description: "कर पहचान",
            completed: false
          },
          {
            id: "business_plan",
            name: "व्यावसायिक योजना",
            required: true,
            description: "विस्तृत व्यावसायिक प्रस्ताव",
            completed: false
          },
          {
            id: "bank_statements",
            name: "बैंक स्टेटमेंट (6 महीने)",
            required: true,
            description: "वित्तीय इतिहास",
            completed: false
          },
          {
            id: "income_proof",
            name: "आय प्रमाण",
            required: false,
            description: "वेतन पर्ची या ITR",
            completed: false
          }
        ],
        applicationSteps: [
          "निकटतम बैंक में जाएं या ऑनलाइन आवेदन करें",
          "आवश्यक दस्तावेज जमा करें",
          "बैंक सत्यापन और साइट विजिट",
          "ऋण अनुमोदन और वितरण"
        ],
        contacts: [
          { type: "फोन", value: "1800-XXX-MUDRA" },
          { type: "वेबसाइट", value: "mudra.org.in" },
          { type: "ईमेल", value: "info@mudra.org.in" }
        ]
      }
    },
    mr: {
      1: {
        title: "प्रधानमंत्री मुद्रा योजना",
        category: "वित्त",
        description: "सूक्ष्म आणि लहान उद्योगांसाठी तारणाशिवाय ₹10 लाख पर्यंत कर्ज प्रदान करते",
        amount: "₹50,000 - ₹10 लाख",
        eligibility: "व्यावहारिक व्यावसायिक योजनेसह 18 वर्षांपेक्षा जास्त वयाचे कोणतेही नागरिक",
        processingTime: "15-30 दिवस",
        benefits: [
          "तारणाची गरज नाही",
          "कमी व्याज दर (8-12%)",
          "जलद प्रक्रिया",
          "सरकारी हमी",
          "लवचिक परतफेड पर्याय"
        ],
        documents: [
          {
            id: "aadhar",
            name: "आधार कार्ड",
            required: true,
            description: "ओळख आणि पत्ता पुरावा",
            completed: false
          },
          {
            id: "pan",
            name: "पॅन कार्ड",
            required: true,
            description: "कर ओळख",
            completed: false
          },
          {
            id: "business_plan",
            name: "व्यावसायिक योजना",
            required: true,
            description: "तपशीलवार व्यावसायिक प्रस्ताव",
            completed: false
          },
          {
            id: "bank_statements",
            name: "बँक स्टेटमेंट (6 महिने)",
            required: true,
            description: "आर्थिक इतिहास",
            completed: false
          },
          {
            id: "income_proof",
            name: "उत्पन्न पुरावा",
            required: false,
            description: "पगार पर्ची किंवा ITR",
            completed: false
          }
        ],
        applicationSteps: [
          "जवळच्या बँकेत जा किंवा ऑनलाइन अर्ज करा",
          "आवश्यक कागदपत्रे सादर करा",
          "बँक पडताळणी आणि साइट भेट",
          "कर्ज मंजूरी आणि वितरण"
        ],
        contacts: [
          { type: "फोन", value: "1800-XXX-MUDRA" },
          { type: "वेबसाइट", value: "mudra.org.in" },
          { type: "ईमेल", value: "info@mudra.org.in" }
        ]
      }
    }
  }

  const currentContent = schemes[language as keyof typeof schemes] || schemes.en
  const scheme = currentContent[schemeId as keyof typeof currentContent]

  if (!scheme) {
    return (
      <div className="text-center py-8">
        <p>Scheme not found</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    )
  }

  const handleDocumentCheck = (documentId: string, checked: boolean) => {
    if (checked) {
      setCheckedDocuments([...checkedDocuments, documentId])
    } else {
      setCheckedDocuments(checkedDocuments.filter(id => id !== documentId))
    }
  }

  const requiredDocuments = scheme.documents.filter(doc => doc.required)
  const optionalDocuments = scheme.documents.filter(doc => !doc.required)
  const completionPercentage = (checkedDocuments.length / scheme.documents.length) * 100

  const labels = {
    en: {
      backButton: "Back to Schemes",
      overview: "Overview",
      eligibility: "Eligibility",
      amount: "Loan Amount",
      processing: "Processing Time",
      benefits: "Key Benefits",
      documents: "Required Documents",
      optional: "Optional Documents",
      completion: "Document Completion",
      applicationProcess: "Application Process",
      contacts: "Contact Information",
      applyNow: "Apply Now",
      checklistTitle: "Document Checklist",
      step: "Step"
    },
    hi: {
      backButton: "योजनाओं पर वापस जाएं",
      overview: "अवलोकन",
      eligibility: "योग्यता",
      amount: "ऋण राशि",
      processing: "प्रसंस्करण समय",
      benefits: "मुख्य लाभ",
      documents: "आवश्यक दस्तावेज",
      optional: "वैकल्पिक दस्तावेज",
      completion: "दस्तावेज पूर्णता",
      applicationProcess: "आवेदन प्रक्रिया",
      contacts: "संपर्क जानकारी",
      applyNow: "अभी आवेदन करें",
      checklistTitle: "दस्तावेज चेकलिस्ट",
      step: "चरण"
    },
    mr: {
      backButton: "योजनांकडे परत जा",
      overview: "विहंगावलोकन",
      eligibility: "पात्रता",
      amount: "कर्ज रक्कम",
      processing: "प्रक्रिया वेळ",
      benefits: "मुख्य फायदे",
      documents: "आवश्यक कागदपत्रे",
      optional: "वैकल्पिक कागदपत्रे",
      completion: "कागदपत्र पूर्णता",
      applicationProcess: "अर्ज प्रक्रिया",
      contacts: "संपर्क माहिती",
      applyNow: "आता अर्ज करा",
      checklistTitle: "कागदपत्र चेकलिस्ट",
      step: "टप्पा"
    }
  }

  const currentLabels = labels[language as keyof typeof labels] || labels.en

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {currentLabels.backButton}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{scheme.title}</CardTitle>
                  <Badge className="mt-2" variant="secondary">{scheme.category}</Badge>
                </div>
              </div>
              <CardDescription className="text-base">{scheme.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">{currentLabels.amount}</p>
                    <p className="font-medium">{scheme.amount}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">{currentLabels.processing}</p>
                    <p className="font-medium">{scheme.processingTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">{currentLabels.eligibility}</p>
                    <p className="font-medium text-sm">{scheme.eligibility}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">{currentLabels.benefits}</h4>
                <ul className="space-y-2">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle>{currentLabels.applicationProcess}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheme.applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {currentLabels.checklistTitle}
              </CardTitle>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentLabels.completion}</span>
                  <span>{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-3 text-sm">{currentLabels.documents}</h5>
                <div className="space-y-3">
                  {requiredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-start gap-3">
                      <Checkbox
                        id={doc.id}
                        checked={checkedDocuments.includes(doc.id)}
                        onCheckedChange={(checked) => handleDocumentCheck(doc.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={doc.id}
                          className="text-sm font-medium cursor-pointer flex items-center gap-1"
                        >
                          {doc.name}
                          <AlertCircle className="h-3 w-3 text-red-500" />
                        </label>
                        <p className="text-xs text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {optionalDocuments.length > 0 && (
                <div>
                  <h5 className="font-medium mb-3 text-sm">{currentLabels.optional}</h5>
                  <div className="space-y-3">
                    {optionalDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-start gap-3">
                        <Checkbox
                          id={doc.id}
                          checked={checkedDocuments.includes(doc.id)}
                          onCheckedChange={(checked) => handleDocumentCheck(doc.id, checked as boolean)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={doc.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {doc.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{doc.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                {currentLabels.contacts}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheme.contacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{contact.type}:</span>
                  <span className="font-medium">{contact.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Apply Button */}
          <Button className="w-full" size="lg">
            {currentLabels.applyNow}
          </Button>
        </div>
      </div>
    </div>
  )
}