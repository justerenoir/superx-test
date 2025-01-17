'use client'

import { useState } from "react"
import TweetCard from "./TweetCard"
import SortButtons from "./SortButtons"

export default function ClientResults({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [originalPosts] = useState([...initialPosts])

  const handleSort = (sortBy: string) => {
    if (!sortBy) return
    const sortedPosts = [...originalPosts].sort((a, b) => {
      if (sortBy === 'similarity') {
        return b.similarity - a.similarity
      }
      return (b[sortBy] || 0) - (a[sortBy] || 0)
    })
    setPosts(sortedPosts)
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-4">
        <SortButtons onSort={handleSort} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map((post: any) => (
            <div key={post.id} className="relative">
              <TweetCard
                content={post.content}
                author={post.author || "Anonymous"}
                username={post.username || "@anonymous"}
                image={post.image || "https://randomuser.me/api/portraits/men/1.jpg"}
                likes={post.likes || 0}
                retweets={post.retweets || 0}
                comments={post.comments || 0}
                showActionButtons={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 