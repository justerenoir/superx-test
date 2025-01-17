'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

interface TweetCardProps {
  content: string
  author: string
  username: string
  image: string
  likes: number
  retweets: number
  comments: number
  showActionButtons: boolean
}

export default function TweetCard({
  content,
  author,
  username,
  image,
  likes,
  retweets,
  comments,
  showActionButtons
}: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isRetweeted, setIsRetweeted] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
    } else {
      setIsLiked(true)
    }
  }

  return (
    <div className="relative mb-16">
      {/* Main Tweet Card */}
      <div className="border border-gray-200 p-4 rounded-xl hover:bg-gray-50 transition-colors min-h-[180px] flex">
        <div className="flex space-x-3 w-full">
          {/* Author Image */}
          <div className="flex-shrink-0">
            <Image
              src={image}
              alt={author}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>

          {/* Content Container */}
          <div className="flex-1 flex flex-col justify-between min-h-[180px]">
            <div>
              {/* Author Info */}
              <div className="flex items-center space-x-2">
                <span className="font-bold">{author}</span>
                <span className="text-gray-500">{username}</span>
              </div>

              {/* Tweet Content */}
              <p className="mt-2 text-gray-900">{content}</p>
            </div>

            {/* Engagement Metrics */}
            <div className="flex justify-between mt-4 text-gray-500 max-w-md">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{comments}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{retweets}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Card */}
      {showActionButtons && (
      <div className="absolute -bottom-14 right-4 p-2 flex space-x-2">
        
          <Link href={`/remix?content=${encodeURIComponent(content)}`}>
            <button 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-green-50 transition-colors ${
                isRetweeted ? 'text-green-600' : 'text-gray-600'
              }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={isRetweeted ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
              <path d="M20 3v4"/>
              <path d="M22 5h-4"/>
              <path d="M4 17v2"/>
              <path d="M5 18H3"/>
            </svg>
            <span>Remix</span>
            </button>
          </Link>
        
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-red-50 transition-colors ${
            isLiked ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      )}
    </div>
  )
} 