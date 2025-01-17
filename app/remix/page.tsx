'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import TweetCard from '@/components/TweetCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Copy, RefreshCw, Check } from 'lucide-react'

function RemixContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const originalContent = searchParams.get('content')
  const [remixedContent, setRemixedContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const generateRemix = async () => {
    if (!originalContent) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/remix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: originalContent }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate remix')
      }

      const data = await response.json()
      setRemixedContent(data.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (remixedContent) {
      await navigator.clipboard.writeText(remixedContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
<main className="px-4 py-4 sm:py-8">
  <div className="container mx-auto max-w-7xl">
    <div className="mb-6 sm:mb-8">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-4"
      >
        ← Back
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold">Remix Post</h1>
    </div>

    <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Original Post */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Original Post</h2>
            {originalContent && (
              <TweetCard
                content={originalContent}
                author="Original Author"
                username="@original"
                image="https://randomuser.me/api/portraits/men/1.jpg"
                likes={0}
                retweets={0}
                comments={0}
                showActionButtons={false}
              />
            )}
          </div>

          {/* Remixed Content */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Remixed Version</h2>
            {isLoading ? (
              <Card className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Generating remix...</span>
              </Card>
            ) : error ? (
              <Card className="p-6 text-red-500">
                {error}
              </Card>
            ) : remixedContent ? (
              <Card className="p-6">
                <div className="prose dark:prose-invert max-w-none mb-4">
                  {remixedContent}
                </div>
                <div className="flex gap-2 justify-end mt-6 border-t pt-4">
                  <Button 
                    variant="outline" 
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={generateRemix}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <Button onClick={generateRemix}>
                  Generate Remix
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function RemixPage() {
  return (
    <Suspense fallback={
      <div className="p-4">
        <Card className="p-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading...</span>
        </Card>
      </div>
    }>
      <RemixContent />
    </Suspense>
  )
} 