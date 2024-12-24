'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CategorySidebar() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full md:w-64 mb-12 md:mb-0">
        <h2 className="text-xl font-bold mb-6">Categories</h2>
        <div className="space-y-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-8 bg-gray-800 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full md:w-64 mb-12 md:mb-0">
      <h2 className="text-xl font-bold mb-6">Categories</h2>
      <ul className="space-y-4">
        <li>
          <Link
            href="/movies"
            className={`block p-2 rounded-md border ${
              pathname === '/movies' ? 'border-gray-400 text-gray-200' : 'border-gray-800 text-gray-400'
            } hover:border-gray-600 transition-colors`}
          >
            All Movies
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Link
              href={`/categories/${category.toLowerCase().replace(/ /g, '-')}`}
              className={`block p-2 rounded-md border ${
                pathname === `/categories/${category.toLowerCase().replace(/ /g, '-')}` ? 'border-gray-400 text-gray-200' : 'border-gray-800 text-gray-400'
              } hover:border-gray-600 transition-colors`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

