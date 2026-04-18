import articlesCache from '@/content/data/articles-cache.json';
import moviesCache from '@/content/data/movies-cache.json';
import spotifyCache from '@/content/data/spotify-cache.json';

interface ArticleData {
  title: string;
  publication: string;
  url: string;
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

interface SpotifyTrack {
  title: string;
  artist: string;
  album: string;
  albumImage: string | null;
  songUrl: string;
}

export default function CurrentlyPage() {
  const articles = articlesCache as ArticleData[];
  const movies = moviesCache as MovieData[];
  const topTracks = spotifyCache as SpotifyTrack[];

  const leftTracks = topTracks.slice(0, 3);
  const rightTracks = topTracks.slice(3, 5);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-12">Currently</h1>

      {/* Reading Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          Reading
        </h2>
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
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-ft-text/60 p-4">
                        <div className="text-center">
                          <div className="text-2xl mb-2">📄</div>
                          <span className="text-sm font-medium">{article.publication}</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3
                      className="text-sm font-medium text-ellipsis overflow-hidden group-hover:text-blue-400 transition-colors"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-xs text-ft-text/60 mt-1">{article.publication}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Watching Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          Watched
        </h2>
        <div className="max-h-[640px] overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movies.map((movie) => (
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
                        <span className="text-center px-4">{movie.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="mt-2">
                    <h3
                      className="text-sm font-medium text-ellipsis overflow-hidden group-hover:text-blue-400 transition-colors"
                      style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                      {movie.title}
                    </h3>
                    <p className="text-xs text-ft-text/60 mt-1">{movie.year}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotify Section */}
      {topTracks.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
            Listening
          </h2>
          <p className="text-xs uppercase tracking-widest text-ft-text/50 mb-3">Top Tracks</p>
          <div className="grid grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-3">
              {leftTracks.map((track, i) => (
                <a
                  key={i}
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <span className="text-sm text-ft-text/40 w-4">{i + 1}</span>
                  {track.albumImage && (
                    <img
                      src={track.albumImage}
                      alt={track.album}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium group-hover:text-blue-400 transition-colors">{track.title}</p>
                    <p className="text-xs text-ft-text/60">{track.artist}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {rightTracks.map((track, i) => (
                <a
                  key={i + 3}
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <span className="text-sm text-ft-text/40 w-4">{i + 4}</span>
                  {track.albumImage && (
                    <img
                      src={track.albumImage}
                      alt={track.album}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium group-hover:text-blue-400 transition-colors">{track.title}</p>
                    <p className="text-xs text-ft-text/60">{track.artist}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
