import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  language: string
}

export function SearchBar({ onSearch, placeholder, language }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const placeholderText = {
    en: placeholder || "Search schemes, tools, or benefits...",
    hi: placeholder || "योजनाएं, उपकरण या लाभ खोजें...",
    mr: placeholder || "योजना, साधने किंवा फायदे शोधा..."
  }

  const currentPlaceholder = placeholderText[language as keyof typeof placeholderText] || placeholderText.en

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={currentPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  )
}