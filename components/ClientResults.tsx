'use client'

import { useState } from "react"
import TweetCard from "./TweetCard"
import SortButtons from "./SortButtons"

interface Post {
  id: string
  content: string
  author: string
  username: string
  image: string
  likes: number
  retweets: number
  comments: number
  similarity: number
}

export default function ClientResults({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [originalPosts] = useState([...initialPosts])

  const handleSort = (sortBy: string) => {
    if (!sortBy) return
    const sortedPosts = [...originalPosts].sort((a, b) => {
      if (sortBy === 'similarity') {
        return b.similarity - a.similarity
      }
      return (b[sortBy as keyof Post] as number) - (a[sortBy as keyof Post] as number)
    })
    setPosts(sortedPosts)
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        <SortButtons onSort={handleSort} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <TweetCard
                content={post.content}
                author={post.author}
                username={post.username}
                image={post.image}
                likes={post.likes}
                retweets={post.retweets}
                comments={post.comments}
                showActionButtons={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 