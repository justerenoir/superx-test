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

  const handleSubmit = async (searchQuery?: string) => {
    setIsLoading(true)
    
    try {
      const finalQuery = searchQuery || query.trim();
      if (finalQuery) {
        const encodedQuery = encodeURIComponent(finalQuery)
        // Use push instead of replace to ensure navigation triggers
        router.push(`/?q=${encodedQuery}`)
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

  const categories = [
    'Crypto',
    'Marketing',
    'Money Twitter',
    'Dev/Coding',
    'Build in Public',
    'Politics'
  ];

  const handleCategoryClick = (category: string) => {
    setQuery(category)
    handleSubmit(category)
  }

  return (
    <div className="w-full max-w-[500px] mx-auto px-4">
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex sm:flex-row items-center gap-2 sm:gap-4">
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

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="px-4 py-2 bg-blue-100 border border-blue-300 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

