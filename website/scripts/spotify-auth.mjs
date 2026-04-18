#!/usr/bin/env node
// One-time script to get a Spotify refresh token.
// Usage:
//   Step 1: node scripts/spotify-auth.mjs
//           Open the printed URL, authorize, copy the `code` from the redirect URL
//   Step 2: node scripts/spotify-auth.mjs <code>
//           Copy the printed refresh_token into .env.local

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
try {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([^#=\s]+)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
} catch {}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';

const code = process.argv[2];

if (!code) {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'user-top-read',
  });
  console.log('\nOpen this URL in your browser:\n');
  console.log(`https://accounts.spotify.com/authorize?${params}\n`);
  console.log('After authorizing, copy the `code` value from the redirect URL and run:');
  console.log('  node scripts/spotify-auth.mjs <code>\n');
} else {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT_URI }),
  });
  const data = await res.json();
  if (data.refresh_token) {
    console.log('\nSuccess! Add this to .env.local:\n');
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  } else {
    console.error('Error:', JSON.stringify(data, null, 2));
  }
}
