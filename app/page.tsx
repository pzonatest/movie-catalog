import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-8">Welcome to Movie Catalog</h1>
      <p className="text-xl mb-12 max-w-2xl text-center">
        Explore our collection of movies across various categories. 
        Use our search and sorting features to find your next favorite film.
      </p>
      <Link 
        href="/movies" 
        className="border border-gray-400 text-gray-200 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        Browse Movies
      </Link>
    </div>
  )
}

