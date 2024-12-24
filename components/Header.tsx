import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-800 py-4 mb-8">
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl">Movie Catalog</Link>
        <div className="space-x-8">
          <Link href="/movies" className="hover:text-gray-400 transition-colors">Movies</Link>
          <Link href="/categories/action" className="hover:text-gray-400 transition-colors">Categories</Link>
        </div>
      </nav>
    </header>
  )
}

