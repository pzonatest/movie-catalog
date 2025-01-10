import MovieList from "@/components/MovieList";
import categories from "@/data/categories.json";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/ /g, "-"),
  }));
}

type CategoryParams = Promise<{ category: string }>;

export async function generateMetadata(props: { params: CategoryParams }) {
  const params = await props.params;
  const category = params.category.replace(/-/g, " ");
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: `${formattedCategory} Movies | Movie Catalog`,
    description: `Browse our collection of ${formattedCategory} movies.`,
  };
}

export default async function CategoryPage({
  params,
}: { params: CategoryParams }) {
  const { category } = await params;
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.replace(/-/g, " ").slice(1);

  if (!categories.map((c) => c.toLowerCase()).includes(category)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{formattedCategory} Movies</h1>
      <MovieList
        initialCategory={formattedCategory}
        initialSearch=""
        initialSort=""
        initialPage={1}
      />
    </div>
  );
}
