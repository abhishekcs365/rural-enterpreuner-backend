import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Alert, AlertDescription } from './ui/alert'
import { User, MapPin, Briefcase, AlertCircle } from 'lucide-react'
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

interface ProfileSetupProps {
  language: string
  onProfileComplete: (profileData: ProfileData) => void
}

export function ProfileSetup({ language, onProfileComplete }: ProfileSetupProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    age: '',
    address: '',
    district: '',
    occupation: '',
    businessType: '',
    businessDescription: '',
    monthlyIncome: '',
    businessExperience: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const content = {
    en: {
      title: "Complete Your Profile",
      subtitle: "Help us recommend the best government schemes for your business",
      personalInfo: "Personal Information",
      businessInfo: "Business Information",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      ageLabel: "Age",
      agePlaceholder: "Enter your age",
      addressLabel: "Address",
      addressPlaceholder: "Enter your complete address",
      districtLabel: "District",
      districtPlaceholder: "Select your district",
      occupationLabel: "Primary Occupation",
      occupationPlaceholder: "Select your occupation",
      businessTypeLabel: "Business Type",
      businessTypePlaceholder: "Select your business type",
      businessDescLabel: "Business Description",
      businessDescPlaceholder: "Describe your current or planned business (optional)",
      monthlyIncomeLabel: "Monthly Income Range",
      monthlyIncomePlaceholder: "Select your income range",
      experienceLabel: "Business Experience",
      experiencePlaceholder: "Select your experience level",
      completeProfile: "Complete Profile",
      requiredField: "This field is required",
      districts: [
        "Pune", "Mumbai", "Nashik", "Nagpur", "Aurangabad", "Solapur", "Amravati", 
        "Sangli", "Kolhapur", "Ahmednagar", "Satara", "Dhule", "Latur", "Osmanabad",
        "Beed", "Parbhani", "Hingoli", "Nanded", "Yavatmal", "Akola", "Washim",
        "Buldhana", "Jalgaon", "Nandurbar", "Ratnagiri", "Sindhudurg", "Raigad",
        "Thane", "Palghar", "Bhandara", "Gondiya", "Gadchiroli", "Chandrapur", "Wardha"
      ],
      occupations: [
        "Farmer", "Dairy Farmer", "Poultry Farmer", "Fish Farmer", "Vegetable Vendor",
        "Grocery Shop Owner", "Tailor", "Carpenter", "Blacksmith", "Potter",
        "Handicraft Maker", "Food Processing", "Textile Worker", "Auto Driver",
        "Small Trader", "Mechanic", "Electrician", "Plumber", "Beautician", "Barber"
      ],
      businessTypes: [
        "Agriculture", "Dairy", "Poultry", "Fishery", "Retail Shop", "Food Business",
        "Handicrafts", "Textiles", "Manufacturing", "Service Business", "Trading",
        "Auto/Transport", "Beauty/Salon", "Repair Services", "Other"
      ],
      incomeRanges: [
        "Below ₹10,000", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000", 
        "₹50,000 - ₹1,00,000", "Above ₹1,00,000"
      ],
      experienceLevels: [
        "No Experience", "Less than 1 year", "1-3 years", "3-5 years", "More than 5 years"
      ]
    },
    hi: {
      title: "अपनी प्रोफाइल पूरी करें",
      subtitle: "आपके व्यवसाय के लिए सर्वोत्तम सरकारी योजनाओं की सिफारिश करने में हमारी सहायता करें",
      personalInfo: "व्यक्तिगत जानकारी",
      businessInfo: "व्यावसायिक जानकारी",
      nameLabel: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      ageLabel: "आयु",
      agePlaceholder: "अपनी आयु दर्ज करें",
      addressLabel: "पता",
      addressPlaceholder: "अपना पूरा पता दर्ज करें",
      districtLabel: "जिला",
      districtPlaceholder: "अपना जिला चुनें",
      occupationLabel: "मुख्य व्यवसाय",
      occupationPlaceholder: "अपना व्यवसाय चुनें",
      businessTypeLabel: "व्यावसायिक प्रकार",
      businessTypePlaceholder: "अपने व्यवसाय का प्रकार चुनें",
      businessDescLabel: "व्यावसायिक विवरण",
      businessDescPlaceholder: "अपने वर्तमान या नियोजित व्यवसाय का वर्णन करें (वैकल्पिक)",
      monthlyIncomeLabel: "मासिक आय सीमा",
      monthlyIncomePlaceholder: "अपनी आय सीमा चुनें",
      experienceLabel: "व्यावसायिक अनुभव",
      experiencePlaceholder: "अपना अनुभव स्तर चुनें",
      completeProfile: "प्रोफाइल पूरी करें",
      requiredField: "यह फील्ड आवश्यक है",
      districts: [
        "पुणे", "मुंबई", "नाशिक", "नागपुर", "औरंगाबाद", "सोलापुर", "अमरावती",
        "सांगली", "कोल्हापुर", "अहमदनगर", "सतारा", "धुले", "लातूर", "उस्मानाबाद",
        "बीड", "परभणी", "हिंगोली", "नांदेड", "यवतमाल", "अकोला", "वाशिम",
        "बुलढाणा", "जलगांव", "नंदुरबार", "रत्नागिरी", "सिंधुदुर्ग", "रायगड",
        "ठाणे", "पालघर", "भंडारा", "गोंदिया", "गडचिरोली", "चंद्रपुर", "वर्धा"
      ],
      occupations: [
        "किसान", "डेयरी किसान", "मुर्गी पालक", "मछली पालक", "सब्जी विक्रेता",
        "किराना दुकान मालिक", "दर्जी", "बढ़ई", "लोहार", "कुम्हार",
        "हस्तशिल्प निर्माता", "खाद्य प्रसंस्करण", "कपड़ा मजदूर", "ऑटो चालक",
        "छोटा व्यापारी", "मैकेनिक", "इलेक्ट्रीशियन", "प्लंबर", "ब्यूटीशियन", "नाई"
      ],
      businessTypes: [
        "कृषि", "डेयरी", "मुर्गी पालन", "मत्स्य पालन", "खुदरा दुकान", "खाद्य व्यवसाय",
        "हस्तशिल्प", "कपड़ा", "विनिर्माण", "सेवा व्यवसाय", "व्यापार",
        "ऑटो/परिवहन", "सौंदर्य/सैलून", "मरम्मत सेवाएं", "अन्य"
      ],
      incomeRanges: [
        "₹10,000 से कम", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000",
        "₹50,000 - ₹1,00,000", "₹1,00,000 से अधिक"
      ],
      experienceLevels: [
        "कोई अनुभव नहीं", "1 साल से कम", "1-3 साल", "3-5 साल", "5 साल से अधिक"
      ]
    },
    mr: {
      title: "तुमची प्रोफाइल पूर्ण करा",
      subtitle: "तुमच्या व्यवसायासाठी सर्वोत्तम सरकारी योजनांची शिफारस करण्यात आम्हाला मदत करा",
      personalInfo: "वैयक्तिक माहिती",
      businessInfo: "व्यावसायिक माहिती",
      nameLabel: "पूर्ण नाव",
      namePlaceholder: "तुमचे पूर्ण नाव प्रविष्ट करा",
      ageLabel: "वय",
      agePlaceholder: "तुमचे वय प्रविष्ट करा",
      addressLabel: "पत्ता",
      addressPlaceholder: "तुमचा संपूर्ण पत्ता प्रविष्ट करा",
      districtLabel: "जिल्हा",
      districtPlaceholder: "तुमचा जिल्हा निवडा",
      occupationLabel: "मुख्य व्यवसाय",
      occupationPlaceholder: "तुमचा व्यवसाय निवडा",
      businessTypeLabel: "व्यावसायिक प्रकार",
      businessTypePlaceholder: "तुमच्या व्यवसायाचा प्रकार निवडा",
      businessDescLabel: "व्यावसायिक वर्णन",
      businessDescPlaceholder: "तुमच्या सध्याच्या किंवा नियोजित व्यवसायाचे वर्णन करा (वैकल्पिक)",
      monthlyIncomeLabel: "मासिक उत्पन्न श्रेणी",
      monthlyIncomePlaceholder: "तुमची उत्पन्न श्रेणी निवडा",
      experienceLabel: "व्यावसायिक अनुभव",
      experiencePlaceholder: "तुमचा अनुभव पातळी निवडा",
      completeProfile: "प्रोफाइल पूर्ण करा",
      requiredField: "हे फील्ड आवश्यक आहे",
      districts: [
        "पुणे", "मुंबई", "नाशिक", "नागपूर", "औरंगाबाद", "सोलापूर", "अमरावती",
        "सांगली", "कोल्हापूर", "अहमदनगर", "सातारा", "धुळे", "लातूर", "उस्मानाबाद",
        "बीड", "परभणी", "हिंगोली", "नांदेड", "यवतमाळ", "अकोला", "वाशिम",
        "बुलढाणा", "जळगाव", "नंदुरबार", "रत्नागिरी", "सिंधुदुर्ग", "रायगड",
        "ठाणे", "पालघर", "भंडारा", "गोंदिया", "गडचिरोली", "चंद्रपूर", "वर्धा"
      ],
      occupations: [
        "शेतकरी", "दुग्धव्यवसायी", "कुक्कुटपालक", "मत्स्यपालक", "भाजी विक्रेता",
        "किराणा दुकान मालक", "शिंपी", "सुतार", "लोहार", "कुंभार",
        "हस्तकला निर्माता", "अन्न प्रक्रिया", "कापड कामगार", "ऑटो चालक",
        "छोटा व्यापारी", "मेकॅनिक", "इलेक्ट्रिशियन", "प्लंबर", "ब्युटिशियन", "नाऊ"
      ],
      businessTypes: [
        "शेती", "दुग्धव्यवसाय", "कुक्कुटपालन", "मत्स्यपालन", "किरकोळ दुकान", "अन्न व्यवसाय",
        "हस्तकला", "कापड", "उत्पादन", "सेवा व्यवसाय", "व्यापार",
        "ऑटो/वाहतूक", "सौंदर्य/सलून", "दुरुस्ती सेवा", "इतर"
      ],
      incomeRanges: [
        "₹10,000 पेक्षा कमी", "₹10,000 - ₹25,000", "₹25,000 - ₹50,000",
        "₹50,000 - ₹1,00,000", "₹1,00,000 पेक्षा जास्त"
      ],
      experienceLevels: [
        "कोणताही अनुभव नाही", "1 वर्षापेक्षा कमी", "1-3 वर्षे", "3-5 वर्षे", "5 वर्षांपेक्षा जास्त"
      ]
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateRequired = (value: string, fieldName: string) => {
    if (!value.trim()) {
      return currentContent.requiredField
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors: Record<string, string> = {}

    // Validate required fields
    const requiredFields = ['name', 'age', 'address', 'district', 'occupation', 'businessType', 'monthlyIncome', 'businessExperience']
    
    requiredFields.forEach(field => {
      const error = validateRequired(formData[field as keyof ProfileData], field)
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate profile completion
    setTimeout(() => {
      setIsLoading(false)
      onProfileComplete(formData)
    }, 1500)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1703145219083-6037d97decb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHBhdHRlcm5zJTIwZ2VvbWV0cmljJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NTkwNTk4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-xl bg-white/95 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{currentContent.title}</CardTitle>
            <CardDescription className="text-base">{currentContent.subtitle}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">{currentContent.personalInfo}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{currentContent.nameLabel} *</Label>
                    <Input
                      id="name"
                      placeholder={currentContent.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.name}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">{currentContent.ageLabel} *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder={currentContent.agePlaceholder}
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className={errors.age ? 'border-destructive' : ''}
                    />
                    {errors.age && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.age}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{currentContent.addressLabel} *</Label>
                  <Textarea
                    id="address"
                    placeholder={currentContent.addressPlaceholder}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'border-destructive' : ''}
                  />
                  {errors.address && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.address}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">{currentContent.districtLabel} *</Label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger className={errors.district ? 'border-destructive' : ''}>
                      <SelectValue placeholder={currentContent.districtPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentContent.districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.district && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.district}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">{currentContent.businessInfo}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">{currentContent.occupationLabel} *</Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
                      <SelectTrigger className={errors.occupation ? 'border-destructive' : ''}>
                        <SelectValue placeholder={currentContent.occupationPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {currentContent.occupations.map((occupation) => (
                          <SelectItem key={occupation} value={occupation}>
                            {occupation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.occupation && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.occupation}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">{currentContent.businessTypeLabel} *</Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger className={errors.businessType ? 'border-destructive' : ''}>
                        <SelectValue placeholder={currentContent.businessTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {currentContent.businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.businessType}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">{currentContent.businessDescLabel}</Label>
                  <Textarea
                    id="businessDescription"
                    placeholder={currentContent.businessDescPlaceholder}
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">{currentContent.monthlyIncomeLabel} *</Label>
                    <Select value={formData.monthlyIncome} onValueChange={(value) => handleInputChange('monthlyIncome', value)}>
                      <SelectTrigger className={errors.monthlyIncome ? 'border-destructive' : ''}>
                        <SelectValue placeholder={currentContent.monthlyIncomePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {currentContent.incomeRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.monthlyIncome && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.monthlyIncome}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessExperience">{currentContent.experienceLabel} *</Label>
                    <Select value={formData.businessExperience} onValueChange={(value) => handleInputChange('businessExperience', value)}>
                      <SelectTrigger className={errors.businessExperience ? 'border-destructive' : ''}>
                        <SelectValue placeholder={currentContent.experiencePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {currentContent.experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.businessExperience && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.businessExperience}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Setting up your profile...' : currentContent.completeProfile}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}