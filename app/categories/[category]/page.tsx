import { notFound } from 'next/navigation'
import MovieList from '@/components/MovieList'
import categories from '@/data/categories.json'

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/ /g, '-'),
  }))
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const category = params.category.replace(/-/g, ' ')
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${formattedCategory} Movies | Movie Catalog`,
    description: `Browse our collection of ${formattedCategory} movies.`,
  }
}

export default async function CategoryPage({ params }: { params: { category: string }}) {
  const { category} = await params
  const formattedCategory = category.charAt(0).toUpperCase() + category.replace(/-/g, ' ').slice(1)

  if (!categories.map(c => c.toLowerCase()).includes(category)) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{formattedCategory} Movies</h1>
      <MovieList initialCategory={formattedCategory} initialSearch="" initialSort="" initialPage={1} />
    </div>
  )
}

