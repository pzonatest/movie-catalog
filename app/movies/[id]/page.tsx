/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, use } from 'react';
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Play, Star } from 'lucide-react'
import TrailerModal from '@/components/TrailerModal'
import RateMovie from '@/components/RateMovie'
import RelatedMovies from '@/components/RelatedMovies'
import movies from '@/data/movies.json'

export default function MoviePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const movie = movies.find(m => m.id === parseInt(params.id))

  if (!movie) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 relative">
        <Image
          src={movie.poster}
          alt={`${movie.title} poster`}
          width={1200}
          height={675}
          className="rounded-lg shadow-lg"
        />
        <button
          onClick={() => setIsTrailerOpen(true)}
          className="absolute bottom-4 right-4 bg-gray-900 text-gray-200 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition-colors"
        >
          <Play size={20} />
          <span>Watch Trailer</span>
        </button>
      </div>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
      </div>
      <div className="border border-gray-800 p-8 rounded-lg mb-12">
        <p className="text-lg mb-6">{movie.description}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
            <p className="flex items-center">
              <strong>Rating:</strong>
              <Star className="w-5 h-5 text-yellow-400 ml-2 mr-1" />
              <span>{movie.rating}/10</span>
            </p>
            <div className="mt-4">
              <p className="font-bold mb-2">Rate this movie:</p>
              <RateMovie initialRating={userRating} onRate={setUserRating} />
            </div>
          </div>
          <div>
            <p><strong>Category:</strong> {movie.category}</p>
            <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      <div className="space-y-6 mb-12">
        {movie.reviews.map((review, index) => (
          <div key={index} className="border border-gray-800 p-6 rounded-lg">
            <p className="font-bold">{review.author}</p>
            <p className="text-gray-400 mb-2">Rating: {review.rating}/5</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-6">Additional Information</h2>
      <div className="border border-gray-800 p-8 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Awards</h3>
        <ul className="list-disc list-inside mb-6">
          {movie.awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-4">Box Office</h3>
        <p><strong>Budget:</strong> ${movie.boxOffice.budget.toLocaleString()}</p>
        <p><strong>Gross:</strong> ${movie.boxOffice.gross.toLocaleString()}</p>
        <h3 className="text-xl font-bold mt-6 mb-4">Trivia</h3>
        <ul className="list-disc list-inside mb-6">
          {movie.trivia.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-4">Memorable Quotes</h3>
        <ul className="list-disc list-inside mb-6">
          {movie.quotes.map((quote, index) => (
            <li key={index}>"{quote}"</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-4">Soundtrack</h3>
        <ul className="list-disc list-inside mb-6">
          {movie.soundtrack.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mb-4">Behind the Scenes</h3>
        <ul className="list-disc list-inside mb-6">
          {movie.behindTheScenes.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl font-bold mt-12 mb-6">Related Movies</h2>
      <RelatedMovies movies={movies.filter(m => movie.relatedMovies.includes(m.title)).map(m => ({
        id: m.id,
        title: m.title,
        poster: m.poster,
        rating: m.rating
      }))} />
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={movie.trailer}
      />
    </div>
  )
}

