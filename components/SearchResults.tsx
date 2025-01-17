import { createClient } from '@supabase/supabase-js'
import TweetCard from './TweetCard'
import { Card } from "@/components/ui/card"
import { useState } from "react"
import SortButtons from "./SortButtons"
import ClientResults from './ClientResults'


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function searchPosts(query: string) {
  try {
    // Get the embedding for the search query
    const embedding = await getEmbedding(query)
    console.log('Generated embedding for query:', query)

    // Log the parameters being sent to Supabase
    console.log('Calling match_posts with params:', {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 5
    })

    // Make the RPC call
    const { data, error } = await supabase.rpc('match_posts', {
      query_embedding: embedding,
      match_threshold: 0.25,
      match_count: 5
    })

    if (error) {
      console.error('Supabase RPC error:', error)
      throw error
    }

    // Log the results
    console.log('Search results:', data)

    // If no results, try a direct query to check if posts exist
    if (!data || data.length === 0) {
      const { data: allPosts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .limit(1)
      
      if (postsError) {
        console.error('Error checking posts table:', postsError)
      } else {
        console.log('Posts exist in table:', allPosts)
      }
    }

    return data
  } catch (error) {
    console.error('Detailed error in searchPosts:', error)
    throw new Error(`Failed to search posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function getEmbedding(text: string) {
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: text,
        model: "text-embedding-3-small"
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const { data } = await response.json()
    return data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

interface SearchResultsProps {
  searchParams: Promise<{ q?: string }> | { q?: string }
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const params = await searchParams
  const query = params?.q

  if (!query) return null

  try {
    const results = await searchPosts(query)

    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold">Search Results for "{query}"</h2>
        {results && results.length > 0 ? (
          <>
            <ClientResults initialPosts={results} />
          </>
        ) : (
          <Card className="p-6">
            <p>No results found for "{query}". Try a different search term.</p>
          </Card>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error in SearchResults component:', error)
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <p className="text-red-600">
          An error occurred while searching. Please try again later.
          {error instanceof Error ? ` (${error.message})` : ''}
        </p>
      </Card>
    )
  }
} 