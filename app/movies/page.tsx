import MovieList from '@/components/MovieList'
import CategorySidebar from '@/components/CategorySidebar'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default function MoviesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : ''
  const search = typeof searchParams.search === 'string' ? searchParams.search : ''
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : ''
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategorySidebar />
      </Suspense>
      <Suspense fallback={<div>Loading movies...</div>}>
        <MovieList initialCategory={category} initialSearch={search} initialSort={sort} initialPage={page} />
      </Suspense>
    </div>
  )
}

