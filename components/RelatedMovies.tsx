import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface Movie {
  id: number
  title: string
  poster: string
  rating: number
}

interface RelatedMoviesProps {
  movies: Movie[]
}

export default function RelatedMovies({ movies }: RelatedMoviesProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id} className="block">
            <div className="border border-gray-800 rounded-md overflow-hidden hover:border-gray-600 transition-colors">
              <Image
                src={movie.poster}
                alt={`${movie.title} poster`}
                width={300}
                height={450}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{movie.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

