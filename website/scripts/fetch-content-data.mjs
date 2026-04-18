#!/usr/bin/env node
// Run with: node scripts/fetch-content-data.mjs
// Reads reading.json + watching.json, fetches metadata, writes cache files.
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Load .env.local manually
const envPath = join(root, '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/);
    if (match) process.env[match[1]] = match[2].trim();
  }
} catch {}

const readingUrls = JSON.parse(readFileSync(join(root, 'content/data/reading.json'), 'utf8'));
const watchingIds = JSON.parse(readFileSync(join(root, 'content/data/watching.json'), 'utf8'));

async function fetchArticleMetadata(url) {
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PersonalWebsiteBot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    const ogTitle = html.match(/<meta[^>]*(?:property="og:title"|name="twitter:title")[^>]*content="([^"]*)"[^>]*>/i);
    const titleTag = html.match(/<title[^>]*>([^<]*)</i);
    const title = ogTitle ? ogTitle[1].trim() : (titleTag ? titleTag[1].trim() : new URL(url).pathname);

    const siteNameMatch = html.match(/<meta[^>]*(?:property="og:site_name"|name="application-name")[^>]*content="([^"]*)"[^>]*>/i)
                       || html.match(/<meta[^>]*content="([^"]*)"[^>]*(?:property="og:site_name"|name="application-name")[^>]*>/i);
    let publication = siteNameMatch ? siteNameMatch[1].trim() : new URL(url).hostname.replace(/^www\./, '');

    const imageMatch = html.match(/<meta[^>]*(?:property="og:image"|name="twitter:image")[^>]*content="([^"]*)"[^>]*>/i)
                    || html.match(/<meta[^>]*content="([^"]*)"[^>]*(?:property="og:image"|name="twitter:image")[^>]*>/i);
    let image = imageMatch ? imageMatch[1].trim() : undefined;
    if (image && !image.startsWith('http')) {
      const base = new URL(url);
      image = image.startsWith('//') ? `${base.protocol}${image}` : image.startsWith('/') ? `${base.origin}${image}` : `${base.origin}/${image}`;
    }

    const descMatch = html.match(/<meta[^>]*(?:property="og:description"|name="description")[^>]*content="([^"]*)"[^>]*>/i);
    const description = descMatch ? descMatch[1].trim().substring(0, 200) : undefined;

    return { title: title.substring(0, 100), publication, url, image, description };
  } catch (err) {
    console.warn(`  Failed ${url}: ${err.message}`);
    return { title: url, publication: new URL(url).hostname.replace(/^www\./, ''), url };
  }
}

async function fetchMovieData(imdbId) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) throw new Error('OMDB_API_KEY not set');
  try {
    const res = await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`);
    const data = await res.json();
    if (data.Response === 'False') throw new Error(data.Error);
    return { title: data.Title, year: data.Year, poster: data.Poster, imdbId: data.imdbID, plot: data.Plot, director: data.Director, runtime: data.Runtime, genre: data.Genre };
  } catch (err) {
    console.warn(`  Failed ${imdbId}: ${err.message}`);
    return null;
  }
}

async function fetchSpotifyTopTracks() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    console.warn('  Spotify env vars not set, skipping.');
    return [];
  }
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  });
  const { access_token } = await tokenRes.json();
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=short_term', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const data = await res.json();
  return (data.items ?? []).map(track => ({
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    albumImage: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
  }));
}

console.log(`Fetching ${readingUrls.length} articles...`);
const articles = [];
for (const url of readingUrls) {
  console.log(` ${url}`);
  articles.push(await fetchArticleMetadata(url));
}
writeFileSync(join(root, 'content/data/articles-cache.json'), JSON.stringify(articles, null, 2));
console.log('Wrote content/data/articles-cache.json');

console.log(`\nFetching ${watchingIds.length} movies...`);
const movies = [];
for (const id of watchingIds) {
  console.log(` ${id}`);
  const m = await fetchMovieData(id);
  if (m) movies.push(m);
}
writeFileSync(join(root, 'content/data/movies-cache.json'), JSON.stringify(movies, null, 2));
console.log('Wrote content/data/movies-cache.json');

console.log('\nFetching Spotify top tracks...');
const spotifyTracks = await fetchSpotifyTopTracks();
writeFileSync(join(root, 'content/data/spotify-cache.json'), JSON.stringify(spotifyTracks, null, 2));
console.log('Wrote content/data/spotify-cache.json');
