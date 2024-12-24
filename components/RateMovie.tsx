'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface RateMovieProps {
  initialRating?: number
  onRate: (rating: number) => void
}

export default function RateMovie({ initialRating = 0, onRate }: RateMovieProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRate = (newRating: number) => {
    setRating(newRating)
    onRate(newRating)
  }

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none"
        >
          <Star
            className={`w-8 h-8 ${
              star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'
            } hover:text-yellow-300 transition-colors`}
            fill={star <= (hover || rating) ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  )
}

