import Link from 'next/link'
// import Image from 'next/image'
import { Star } from 'lucide-react'

interface MovieProps {
  id: number
  title: string
  description: string
  category: string
  poster: string
  rating: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Movie({ id, title, description, category, poster, rating }: MovieProps) {
  return (
    <Link href={`/movies/${id}`} className="block">
      <div className="border border-gray-800 rounded-md overflow-hidden hover:border-gray-600 transition-colors h-[420px] flex flex-col">
        <div className="relative h-64 bg-gray-800">
          {/* <Image
            src={poster}
            alt={`${title} poster`}
            layout="fill"
            objectFit="cover"
          /> */}
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-xl mb-2 line-clamp-1">{title}</h2>
            <p className="text-gray-400 mb-2 text-sm line-clamp-2">{description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">{category}</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

