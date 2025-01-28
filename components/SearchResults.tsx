import { createClient } from '@supabase/supabase-js'
import TweetCard from './TweetCard'
import { Card } from "@/components/ui/card"
import { useState } from "react"
import SortButtons from "./SortButtons"
import ClientResults from './ClientResults'
import { milvusClient, COLLECTION_NAME } from '@/utils/milvus/client'

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

async function searchPosts(query: string) {
  try {
    const embedding = await getEmbedding(query)
    console.log('Generated embedding for query:', query)

    await milvusClient.loadCollection({
      collection_name: COLLECTION_NAME
    });

    const searchResponse = await milvusClient.search({
      collection_name: COLLECTION_NAME,
      vectors: [embedding],
      output_fields: ['content', 'author', 'username', 'image', 'likes', 'retweets', 'comments'],
      search_params: { anns_field: "embedding", topk: 20, metric_type: "L2", params: JSON.stringify({ nprobe: 10 }) },
      limit: 20
    });

    // Log the searchResponse to understand its structure
    console.log('Search response:', searchResponse);

    // Check if results is an array and iterate over it directly
    if (!searchResponse.results || !Array.isArray(searchResponse.results)) {
      console.log('No results found or results are not in expected format');
      return [];
    }

    // Define a type for the result object
    interface SearchResult {
      content: string;
      author: string;
      username: string;
      image: string;
      likes: string | number;
      retweets: string | number;
      comments: string | number;
      score?: number;
    }

    // Map the results to ensure they match the SearchResult type
    const results = searchResponse.results.map((result: any) => ({
      content: result.content || '',
      author: result.author || '',
      username: result.username || '',
      image: result.image || '',
      likes: result.likes || 0,
      retweets: result.retweets || 0,
      comments: result.comments || 0,
      score: result.score
    })) as SearchResult[];

    // Format results - accessing the data directly
    const formattedResults = results.map((result, index) => ({
      id: `milvus-${index}`,
      content: result.content,
      author: result.author,
      username: result.username,
      image: result.image,
      likes: Number(result.likes) || 0,
      retweets: Number(result.retweets) || 0,
      comments: Number(result.comments) || 0,
      similarity: (1 - (result.score || 0)) * 100
    }));

    // Explicitly define types for 'a' and 'b'
    formattedResults.sort((a: { similarity: number }, b: { similarity: number }) => b.similarity - a.similarity);
    console.log('Search results:', formattedResults);

    return formattedResults;
  } catch (error) {
    console.error('Detailed error in searchPosts:', error)
    throw new Error(`Failed to search posts: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

interface SearchResultsProps {
  searchParams: { q?: string }
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const query = searchParams?.q

  if (!query) return null

  try {
    const results = await searchPosts(query)

    return (
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Search Results for "{query}"</h2>
        {results && results.length > 0 ? (
          <ClientResults initialPosts={results} />
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