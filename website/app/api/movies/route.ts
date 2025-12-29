import { NextResponse } from 'next/server';

interface MovieData {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Plot: string;
  Director: string;
  Runtime: string;
  Genre: string;
}

async function fetchMovieData(imdbId: string): Promise<MovieData | null> {
  const apiKey = process.env.OMDB_API_KEY;
  
  if (!apiKey) {
    console.error('OMDB_API_KEY not found in environment variables');
    return null;
  }

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === 'False') {
      console.error(`Movie not found: ${data.Error}`);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie data for ${imdbId}:`, error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imdbId = searchParams.get('imdbId');
  
  if (!imdbId) {
    return NextResponse.json(
      { success: false, error: 'IMDB ID is required' },
      { status: 400 }
    );
  }
  
  try {
    const movieData = await fetchMovieData(imdbId);
    
    if (!movieData) {
      return NextResponse.json(
        { success: false, error: 'Movie not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      movie: {
        title: movieData.Title,
        year: movieData.Year,
        poster: movieData.Poster,
        imdbId: movieData.imdbID,
        plot: movieData.Plot,
        director: movieData.Director,
        runtime: movieData.Runtime,
        genre: movieData.Genre,
      },
    });
  } catch (error) {
    console.error('Failed to fetch movie:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movie data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { imdbIds } = await request.json();
    
    if (!Array.isArray(imdbIds)) {
      return NextResponse.json(
        { success: false, error: 'imdbIds must be an array' },
        { status: 400 }
      );
    }
    
    const movies = await Promise.all(
      imdbIds.map(async (imdbId: string) => {
        const movieData = await fetchMovieData(imdbId);
        return movieData ? {
          title: movieData.Title,
          year: movieData.Year,
          poster: movieData.Poster,
          imdbId: movieData.imdbID,
          plot: movieData.Plot,
          director: movieData.Director,
          runtime: movieData.Runtime,
          genre: movieData.Genre,
        } : null;
      })
    );
    
    const validMovies = movies.filter(movie => movie !== null);
    
    return NextResponse.json({
      success: true,
      movies: validMovies,
    });
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movies data' },
      { status: 500 }
    );
  }
}