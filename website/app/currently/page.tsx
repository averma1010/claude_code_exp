'use client';

import readingData from '@/content/data/reading.json';
import watchingData from '@/content/data/watching.json';
import { useEffect, useState } from 'react';

interface ArticleData {
  title: string;
  publication: string;
  url: string;
  date: string;
  image?: string;
  description?: string;
}


interface MovieData {
  title: string;
  year: string;
  poster: string;
  imdbId: string;
  plot: string;
  director: string;
  runtime: string;
  genre: string;
}

export default function CurrentlyPage() {
  const reading = readingData as string[]; // Now it's just an array of URLs
  const watching = watchingData as string[]; // Array of IMDB IDs
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setIsLoadingArticles(true);
        
        const response = await fetch('/api/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ urls: reading }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setArticles(data.articles);
        } else {
          console.error('Failed to fetch article data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching article data:', error);
      } finally {
        setIsLoadingArticles(false);
      }
    };

    fetchArticleData();
  }, [reading]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoadingMovies(true);
        
        const response = await fetch('/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imdbIds: watching }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setMovies(data.movies);
        } else {
          console.error('Failed to fetch movie data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setIsLoadingMovies(false);
      }
    };

    fetchMovieData();
  }, [watching]);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-12">Currently</h1>

      {/* Reading Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          Reading
        </h2>
        {isLoadingArticles ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-ft-text/70">Loading articles...</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {articles.map((article, index) => (
              <div key={index} className="group cursor-pointer">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ft-border/30 mb-2">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.style.display = 'none';

                          const fallback = img.nextElementSibling as HTMLElement | null;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}

                      />
                    ) : null}
                    <div 
                      className={`w-full h-full flex items-center justify-center text-ft-text/60 p-4 ${article.image ? 'hidden' : 'flex'}`}
                      style={{ display: article.image ? 'none' : 'flex' }}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">📄</div>
                        <span className="text-sm font-medium">
                          {article.publication}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ellipsis overflow-hidden group-hover:text-blue-400 transition-colors" 
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {article.title}
                    </h3>
                    <p className="text-xs text-ft-text/60 mt-1">
                      {article.publication} • {new Date(article.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </a>
              </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Listening Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          Listening
        </h2>
        <div className="bg-ft-border/30 rounded-lg p-6">
          <p className="text-ft-text/70 mb-4">
            Connect your Spotify account to see what I&apos;m currently listening to.
          </p>
          <div className="text-sm text-ft-text/60">
            <p>To enable: Set up Spotify API credentials in environment variables</p>
            <p className="mt-2">
              See <code className="bg-ft-border px-2 py-1 rounded">README.md</code> for setup instructions
            </p>
          </div>
        </div>
      </section>

      {/* Watching Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          Watched
        </h2>
        {isLoadingMovies ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-ft-text/70">Loading movies...</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movies.map((movie, index) => (
              <div key={movie.imdbId} className="group cursor-pointer">
                <a
                  href={`https://www.imdb.com/title/${movie.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-ft-border/30">
                    {movie.poster && movie.poster !== 'N/A' ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-ft-text/60">
                        <span className="text-center px-4">
                          {movie.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-ellipsis overflow-hidden group-hover:text-blue-400 transition-colors" 
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {movie.title}
                    </h3>
                    <p className="text-xs text-ft-text/60 mt-1">{movie.year}</p>
                  </div>
                </a>
              </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
