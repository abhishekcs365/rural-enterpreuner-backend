import { useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Alert, AlertDescription } from './ui/alert'
import { Upload, FileText, Languages, Download, Loader2 } from 'lucide-react'

interface PDFTranslatorProps {
  language: string
}

export function PDFTranslator({ language }: PDFTranslatorProps) {
  const [file, setFile] = useState<File | null>(null)
  const [translating, setTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('en')

  const content = {
    en: {
      title: 'PDF Translator',
      subtitle: 'Translate government notices and documents from regional languages',
      uploadTitle: 'Upload PDF Document',
      uploadDesc: 'Upload a PDF file in Marathi, Hindi or English',
      dragDrop: 'Drag and drop your PDF here, or click to browse',
      fileSelected: 'File selected',
      translateTo: 'Translate to',
      translateButton: 'Translate Document',
      translating: 'Translating...',
      downloadButton: 'Download Translation',
      note: 'Note: This is a demo feature. In production, this would use a PDF parsing library and translation API.',
      languages: {
        en: 'English',
        hi: 'Hindi',
        mr: 'Marathi'
      }
    },
    hi: {
      title: 'पीडीएफ अनुवादक',
      subtitle: 'क्षेत्रीय भाषाओं से सरकारी नोटिस और दस्तावेजों का अनुवाद करें',
      uploadTitle: 'पीडीएफ दस्तावेज़ अपलोड करें',
      uploadDesc: 'मराठी, हिंदी या अंग्रेजी में पीडीएफ फाइल अपलोड करें',
      dragDrop: 'अपनी पीडीएफ यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
      fileSelected: 'फाइल चयनित',
      translateTo: 'इसमें अनुवाद करें',
      translateButton: 'दस्तावेज़ का अनुवाद करें',
      translating: 'अनुवाद हो रहा है...',
      downloadButton: 'अनुवाद डाउनलोड करें',
      note: 'नोट: यह एक डेमो सुविधा है। उत्पादन में, यह पीडीएफ पार्सिंग लाइब्रेरी और अनुवाद एपीआई का उपयोग करेगा।',
      languages: {
        en: 'अंग्रेज़ी',
        hi: 'हिंदी',
        mr: 'मराठी'
      }
    },
    mr: {
      title: 'पीडीएफ अनुवादक',
      subtitle: 'प्रादेशिक भाषांमधून सरकारी नोटीस आणि कागदपत्रांचे भाषांतर करा',
      uploadTitle: 'पीडीएफ दस्तऐवज अपलोड करा',
      uploadDesc: 'मराठी, हिंदी किंवा इंग्रजीमध्ये पीडीएफ फाइल अपलोड करा',
      dragDrop: 'तुमची पीडीएफ येथे ड्रॅग आणि ड्रॉप करा, किंवा ब्राउझ करण्यासाठी क्लिक करा',
      fileSelected: 'फाइल निवडली',
      translateTo: 'यात भाषांतर करा',
      translateButton: 'दस्तऐवजाचे भाषांतर करा',
      translating: 'भाषांतर होत आहे...',
      downloadButton: 'भाषांतर डाउनलोड करा',
      note: 'टीप: हे डेमो वैशिष्ट्य आहे. उत्पादनात, हे पीडीएफ पार्सिंग लायब्ररी आणि भाषांतर एपीआय वापरेल।',
      languages: {
        en: 'इंग्रजी',
        hi: 'हिंदी',
        mr: 'मराठी'
      }
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setTranslatedText('')
      }
    }
  }

  const handleTranslate = async () => {
    if (!file) return

    setTranslating(true)
    
    // Simulate translation process
    setTimeout(() => {
      // Mock translated content
      const mockTranslation = `
Sample Translated Document

Government of Maharashtra
Agriculture Department Scheme Notice

Dear Rural Entrepreneurs,

This document has been translated from ${file.name}.

The Maharashtra Government announces a new subsidy scheme for:
- Agricultural equipment purchase (50% subsidy)
- Organic farming initiatives (₹25,000 grant)
- Water conservation projects (₹50,000 subsidy)

Eligibility Criteria:
1. Must be a resident of Maharashtra
2. Landholding: 1-5 acres
3. Annual income: Below ₹3,00,000

Application Process:
1. Visit nearest Taluka office
2. Submit required documents
3. Fill application form
4. Await approval within 30 days

For more information, contact your local agriculture officer.

Note: This is a simulated translation for demonstration purposes.
      `
      setTranslatedText(mockTranslation)
      setTranslating(false)
    }, 3000)
  }

  const handleDownload = () => {
    const blob = new Blob([translatedText], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `translated_${file?.name.replace('.pdf', '.txt')}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
          >
            <Languages className="w-12 h-12 text-white" />
          </motion.div>
        </div>
        <h1 className="text-3xl mb-2">{currentContent.title}</h1>
        <p className="text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      {/* Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>{currentContent.uploadTitle}</CardTitle>
          <CardDescription>{currentContent.uploadDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">{currentContent.dragDrop}</p>
            {file && (
              <div className="flex items-center justify-center gap-2 mt-4 text-primary">
                <FileText className="w-5 h-5" />
                <span>{file.name}</span>
              </div>
            )}
          </motion.div>

          {/* Language Selection */}
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm mb-2">{currentContent.translateTo}</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['en', 'hi', 'mr'] as const).map((lang) => (
                    <Button
                      key={lang}
                      variant={targetLanguage === lang ? 'default' : 'outline'}
                      onClick={() => setTargetLanguage(lang)}
                      className="w-full"
                    >
                      {currentContent.languages[lang]}
                    </Button>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleTranslate}
                  disabled={translating}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="lg"
                >
                  {translating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {currentContent.translating}
                    </>
                  ) : (
                    <>
                      <Languages className="w-5 h-5 mr-2" />
                      {currentContent.translateButton}
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Translated Content */}
          {translatedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <pre className="whitespace-pre-wrap text-sm">{translatedText}</pre>
                </CardContent>
              </Card>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {currentContent.downloadButton}
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Info Note */}
          <Alert>
            <AlertDescription className="text-sm">
              {currentContent.note}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
