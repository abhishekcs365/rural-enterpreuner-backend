import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ExternalLink, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { schemesData, iconMap } from './schemes-data'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'

interface GovernmentSchemesProps {
  language: string
  onSchemeSelect?: (schemeId: number) => void
}

export function GovernmentSchemes({ language, onSchemeSelect }: GovernmentSchemesProps) {
  const currentContent = schemesData[language as keyof typeof schemesData] || schemesData.en

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1>{currentContent.title}</h1>
        <p className="text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      {/* Carousel Section - Quick Browse */}
      <div className="relative">
        <h2 className="mb-4">{currentContent.browseSchemes}</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {currentContent.schemes.map((scheme) => {
              const IconComponent = iconMap[scheme.icon as keyof typeof iconMap]
              
              return (
                <CarouselItem key={scheme.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className="hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
                    onClick={() => onSchemeSelect && onSchemeSelect(scheme.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-2 bg-primary rounded-lg">
                          <IconComponent className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <Badge variant="secondary">
                          {scheme.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{scheme.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow flex flex-col">
                      <div className="space-y-2 flex-grow">
                        <div className="inline-block px-3 py-1 rounded-md bg-secondary text-sm">
                          {scheme.amount}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-xs">{currentContent.startDate}: {scheme.startDate}</span>
                            <span className="text-xs">{currentContent.endDate}: {scheme.endDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        {onSchemeSelect && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              onSchemeSelect(scheme.id)
                            }}
                            variant="outline"
                            className="flex-1"
                            size="sm"
                          >
                            {currentContent.learnMore}
                          </Button>
                        )}
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(scheme.url, '_blank')
                          }}
                          className="flex-1"
                          size="sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {currentContent.visitWebsite}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {/* Grid View - All Schemes */}
      <div>
        <h2 className="mb-4">{currentContent.allSchemes}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentContent.schemes.map((scheme) => {
            const IconComponent = iconMap[scheme.icon as keyof typeof iconMap]
            
            return (
              <Card key={scheme.id} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-primary rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <Badge variant="secondary">
                      {scheme.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{scheme.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow flex flex-col">
                  <div className="space-y-2 flex-grow">
                    <div className="inline-block px-3 py-1 rounded-md bg-secondary text-sm">
                      {scheme.amount}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-xs">{currentContent.startDate}: {scheme.startDate}</span>
                        <span className="text-xs">{currentContent.endDate}: {scheme.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {onSchemeSelect && (
                      <Button
                        onClick={() => onSchemeSelect(scheme.id)}
                        variant="outline"
                        className="flex-1"
                        size="sm"
                      >
                        {currentContent.learnMore}
                      </Button>
                    )}
                    <Button
                      onClick={() => window.open(scheme.url, '_blank')}
                      className="flex-1"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {currentContent.visitWebsite}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
