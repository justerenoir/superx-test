'use client'

type SortButtonsProps = {
  onSort: (sortBy: string) => void
}

export default function SortButtons({ onSort }: SortButtonsProps) {
  return (
    <div className="mb-4 flex justify-end">
      <select 
        onChange={(e) => onSort(e.target.value)}
        className="px-4 py-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        defaultValue="similarity"
      >
        <option value="similarity">Most Relevant</option>
        <option value="likes">Most Likes</option>
        <option value="comments">Most Comments</option>
        <option value="retweets">Most Retweets</option>
      </select>
    </div>
  )
} 