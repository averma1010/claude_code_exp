# Personal Website Plan

## Overview
A simple, dev-focused personal website with three main sections:
1. **Blog/Articles** - Share writings and thoughts
2. **Gallery** - Photos and videos showcase
3. **Currently** - What you're listening to, reading, watching

## Tech Stack Recommendation

### Option 1: Next.js (Recommended)
**Pros:**
- Modern React framework with excellent DX
- Built-in routing, SSR/SSG support
- Great for SEO
- Easy API routes for dynamic data
- Huge ecosystem and community
- Perfect Vercel integration

**Stack:**
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS (simple, utility-first)
- **Content**: MDX for blog posts
- **Media Storage**: Cloudinary (free tier) or Vercel Blob
- **Database**: Not needed initially, can add later
- **Deployment**: Vercel (free tier)

### Option 2: Astro (Lighter Alternative)
**Pros:**
- Even simpler and lighter
- Perfect for content-heavy sites
- Island architecture (ship less JS)
- Can use any framework or none

## Architecture & Features

### 1. Blog/Articles Section
**Content Management:**
- Store articles as MDX files in `/content/posts/` directory
- Frontmatter for metadata (title, date, tags, excerpt)
- Support for code syntax highlighting
- Reading time estimation
- Tag/category filtering

**File Structure:**
```
/content
  /posts
    /2024-01-15-my-first-post.mdx
    /2024-02-20-another-post.mdx
```

**Features:**
- List view with excerpts
- Individual post pages
- Simple search/filter
- RSS feed

### 2. Gallery Section
**Media Management:**
- Upload photos/videos to cloud storage (Cloudinary recommended)
- Store metadata in JSON file or small database
- Lazy loading for performance
- Lightbox for full-screen view

**Storage Options:**
- **Cloudinary** (Free: 25GB storage, 25GB bandwidth/month)
- **Vercel Blob** (Free: 500MB)
- **AWS S3 + CloudFront** (Pay-as-you-go, very cheap)

**File Structure:**
```
/content
  /gallery
    /metadata.json  # [{id, url, title, date, type}]
```

**Features:**
- Grid layout with masonry or standard grid
- Filter by type (photo/video)
- Captions and dates
- Responsive images

### 3. Currently Section
**Data Sources:**

**Spotify Integration:**
- Use Spotify Web API
- Show "Now Playing" or "Recently Played"
- Can update automatically via API
- Requires Spotify Developer account (free)

**Reading & Watching:**
- Manual updates via JSON file
- Optional: Integrate with Goodreads API or Literal.club
- Optional: TMDB API for movies/TV

**File Structure:**
```
/content
  /currently
    /now.json
```

**Example JSON:**
```json
{
  "reading": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "cover": "url",
      "progress": "60%",
      "started": "2024-01-15"
    }
  ],
  "watching": [
    {
      "title": "Show/Movie",
      "type": "series",
      "season": 2,
      "episode": 5
    }
  ],
  "listening": {
    "spotify_embed": "spotify-track-id"
  }
}
```

## Design Philosophy

**Simple Dev Aesthetic:**
- Monospace fonts (e.g., JetBrains Mono, IBM Plex Mono)
- Minimal color palette (2-3 colors max)
- High contrast, readable text
- Clean typography
- Subtle animations
- Dark mode support

**Design Inspirations:**
- Brutalist web design
- Terminal/CLI aesthetics
- Swiss/minimalist design
- Sites like: paco.me, rauno.me, leerob.io

## Project Structure (Next.js)

```
personal-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── blog/
│   │   ├── page.tsx        # Blog list
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post
│   ├── gallery/
│   │   └── page.tsx        # Gallery page
│   ├── currently/
│   │   └── page.tsx        # Currently page
│   └── api/
│       └── spotify/
│           └── route.ts    # Spotify API endpoint
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BlogCard.tsx
│   └── GalleryGrid.tsx
├── content/
│   ├── posts/              # MDX blog posts
│   ├── gallery/            # Gallery metadata
│   └── currently/          # Currently data
├── lib/
│   ├── mdx.ts             # MDX utilities
│   └── spotify.ts         # Spotify API helpers
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Data Storage Strategy

### Phase 1: File-Based (Launch Fast)
- **Blog**: MDX files in repo
- **Gallery**: JSON metadata + Cloudinary URLs
- **Currently**: JSON file, manual updates
- **Benefits**: Simple, no database needed, git-tracked

### Phase 2: Hybrid (Add Interactivity)
- Keep blog as MDX files
- Add **Vercel Postgres** or **PlanetScale** (free tier) for:
  - Gallery metadata
  - View counts
  - Comments (optional)
- **Currently**: Keep JSON or add to database

### Phase 3: Full CMS (Optional)
- Integrate headless CMS like **Sanity** or **Contentful**
- Manage all content through UI
- Better for non-technical content updates

## Deployment Strategy

### Recommended: Vercel
**Why:**
- One-click deployment from GitHub
- Automatic preview deployments for PRs
- Edge functions for API routes
- Built-in analytics
- Free SSL certificates
- Free tier is generous

**Setup:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings (auto-detected for Next.js)
4. Set environment variables (Spotify API keys, etc.)
5. Deploy!

**Free Tier Limits:**
- 100GB bandwidth/month
- Unlimited projects
- Unlimited preview deployments

### Alternative: Netlify
Similar to Vercel, great free tier, slightly different features.

### Alternative: Cloudflare Pages
Fast, generous free tier, good if using Cloudflare for other services.

## Environment Variables Needed

```env
# Spotify API (for Currently section)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Cloudinary (for Gallery)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Development Roadmap

### MVP (Week 1-2)
- [ ] Setup Next.js project with Tailwind
- [ ] Create basic layout with navigation
- [ ] Implement homepage
- [ ] Build blog section (MDX rendering)
- [ ] Add 2-3 sample blog posts
- [ ] Deploy to Vercel

### Phase 2 (Week 3)
- [ ] Setup Cloudinary account
- [ ] Build gallery page
- [ ] Add sample photos/videos
- [ ] Implement responsive grid

### Phase 3 (Week 4)
- [ ] Setup Spotify Developer account
- [ ] Build Currently page
- [ ] Integrate Spotify API
- [ ] Add reading/watching manual updates

### Enhancements (Ongoing)
- [ ] Add dark mode toggle
- [ ] Implement search for blog
- [ ] Add RSS feed
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Open Graph images
- [ ] Comments system (optional)

## Cost Breakdown

**Free Tier (Recommended Start):**
- Hosting: Vercel (Free)
- Media Storage: Cloudinary (Free - 25GB)
- Domain: ~$12/year (Namecheap, Google Domains)
- **Total: ~$12/year**

**With Some Usage:**
- Hosting: Vercel (Free or $20/month for Pro if needed)
- Media Storage: Cloudinary (Free to ~$89/month)
- Database: Vercel Postgres ($0.30/month minimum)
- **Total: ~$12-100/year** depending on traffic

## Next Steps

1. **Choose tech stack** (I recommend Next.js + Tailwind)
2. **Setup project structure**
3. **Design mockup** (optional, can design in browser)
4. **Build MVP** (homepage + blog)
5. **Deploy early** (get it live, iterate fast)
6. **Add features incrementally**

## Quick Start Commands

```bash
# Create Next.js project
npx create-next-app@latest personal-website --typescript --tailwind --app

# Install additional dependencies
cd personal-website
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install gray-matter reading-time

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel
```

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **MDX**: https://mdxjs.com/
- **Spotify Web API**: https://developer.spotify.com/documentation/web-api
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Vercel Deployment**: https://vercel.com/docs

---

**Ready to start building?** Let me know and I can scaffold the entire project structure for you!
