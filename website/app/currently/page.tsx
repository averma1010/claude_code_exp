import readingData from '@/content/data/reading.json';
import watchingData from '@/content/data/watching.json';

interface ReadingItem {
  date: string;
  title: string;
  publication: string;
  url: string;
}

interface WatchingItem {
  title: string;
  year: number;
  imdbId: string;
  status: string;
  currentSeason?: number;
  currentEpisode?: number;
  type: 'movie' | 'series';
}

export default function CurrentlyPage() {
  const reading = readingData as ReadingItem[];
  const watching = watchingData as WatchingItem[];

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-12">Currently</h1>

      {/* Reading Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          📖 Reading
        </h2>
        <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
          {reading.map((item, index) => (
            <div key={index} className="group">
              <span className="text-ft-text/60 text-sm">
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              {' - '}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium"
              >
                {item.title}
              </a>
              <span className="text-ft-text/70"> - {item.publication}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Listening Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-ft-border">
          🎵 Listening
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
          🎬 Watching
        </h2>
        <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
          {watching.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-1">
                <a
                  href={`https://www.imdb.com/title/${item.imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium inline-flex items-center gap-2"
                >
                  {item.title} ({item.year})
                  <span className="text-sm">→</span>
                </a>
                {item.type === 'series' && item.status === 'watching' && (
                  <p className="text-ft-text/70 text-sm mt-1">
                    Currently watching S{item.currentSeason}E{item.currentEpisode}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
