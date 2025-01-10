import movies from "@/data/movies.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Simulate API latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = 10;

  let filteredMovies = movies;

  if (category) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.category === category,
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredMovies = filteredMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchLower) ||
        movie.description.toLowerCase().includes(searchLower),
    );
  }

  if (sort) {
    filteredMovies.sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "releaseDate")
        return (
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredMovies.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    movies: paginatedMovies,
    totalPages,
    currentPage: page,
  });
}
