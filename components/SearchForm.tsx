'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (query.trim()) {
        const searchQuery = encodeURIComponent(query.trim())
        // Use push instead of replace to ensure navigation triggers
        router.push(`/?q=${searchQuery}`)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Search error:', error)
    }
    
    // Add a slight delay before setting loading to false
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleClear = () => {
    setQuery('')
    router.push('/')
  }

  return (
    <div className="w-full max-w-[500px] mx-auto px-4">
      <form onSubmit={handleSubmit} className="flex sm:flex-row items-center gap-2 sm:gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a topic..."
            className="pl-10 rounded-3xl w-full"
            disabled={isLoading}
          />
          {query.length > 0 && !isLoading && (
            <div 
              className='absolute inset-y-0 right-3 flex items-center text-slate-600 dark:text-gray-400 hover:cursor-pointer'
              onClick={handleClear}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </div>
          )}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <LoadingButton 
          type="submit"
          isLoading={isLoading}
          loadingText="Searching..."
          disabled={!query.trim()}
          className="sm:w-full sm:w-auto"
        >
          Search
        </LoadingButton>
      </form>
    </div>
  )
}

