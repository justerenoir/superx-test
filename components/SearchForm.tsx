'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
        // Use replace instead of push to avoid stacking history entries
        router.replace(`/?q=${encodeURIComponent(query.trim())}`)
      } else {
        router.replace('/')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setQuery('')
    router.replace('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex mx-auto max-w-2xl gap-4">
      <div className="relative w-full">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for posts..."
          className="pl-10 rounded-3xl"
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
      <Button type="submit" disabled={isLoading || !query.trim()}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  )
}

