'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Movie from './Movie'

interface Movie {
  id: number
  title: string
  category: string
  description: string
  poster: string
  rating: number
}

interface MovieListProps {
  initialCategory: string
  initialSearch: string
  initialSort: string
  initialPage: number
}

export default function MovieList({ initialCategory, initialSearch, initialSort, initialPage }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState(initialCategory)
  const [search, setSearch] = useState(initialSearch)
  const [sort, setSort] = useState(initialSort)
  const [page, setPage] = useState(initialPage)
  const router = useRouter()

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/movies?category=${category}&search=${search}&sort=${sort}&page=${page}`)
        const data = await response.json()
        setMovies(data.movies)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error('Failed to fetch movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [category, search, sort, page])

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (sort) params.set('sort', sort)
    if (page !== 1) params.set('page', page.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }, [search, sort, page, router])

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="mb-8 flex justify-between items-center">
          <div className="w-64 h-10 bg-gray-800 rounded animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border border-gray-800 rounded-md animate-pulse h-[420px]">
              <div className="h-64 bg-gray-800 rounded-t-md"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="mb-8 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search movies..."
          className="px-4 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-gray-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <select
          className="px-4 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-gray-500"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value)
            setPage(1)
          }}
        >
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release Date</option>
        </select>
      </div>
      {movies.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-bold mb-4">No movies found</p>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {movies.map((movie) => (
              <Movie key={movie.id} {...movie} />
            ))}
          </div>
          <div className="mt-12 flex justify-center space-x-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded-md border ${
                  pageNum === page ? 'border-gray-400 text-gray-200' : 'border-gray-700 text-gray-400'
                } hover:border-gray-500 transition-colors`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

