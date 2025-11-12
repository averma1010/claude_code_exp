# Personal Website - Updated Plan

## Design & Layout

**Inspiration:** fromjason.xyz style - clean, minimal, focused on content

**Navigation:**
- Simple horizontal navigation bar at top
- 3 tabs: **Blog** | **Gallery** | **Currently**
- Minimal, clean design
- Focus on readability and content

**Design Aesthetic:**
- Clean typography
- Generous whitespace
- Simple color palette
- Responsive design
- No distractions

## Tech Stack

**Framework:** Next.js 14+ with App Router
**Styling:** Tailwind CSS
**Content:** MDX for blog posts
**Deployment:** Self-hosted or cloud alternatives (see below)

## Three Sections - Detailed

### 1. Blog/Articles Tab

**Substack-style expandable posts:**
- Show article title + first 2-3 sentences as preview
- "Read more" button to expand inline
- No navigation to separate pages (everything on one page)
- Chronological order (newest first)
- Clean, readable typography

**Data Structure:**
```
/content/posts/
  2024-11-12-post-title.mdx
  2024-11-10-another-post.mdx
```

**UI Behavior:**
- Collapsed: Title + excerpt + date + "Read more →"
- Expanded: Full article content + "Show less ↑"
- Smooth animation between states
- Can have multiple posts expanded at once

### 2. Gallery Tab

**Photos & Videos:**
- Responsive grid layout
- Click to view full size
- Support for both images and videos
- Captions/dates optional
- Lazy loading for performance

**Storage:** Cloudinary (free tier: 25GB)

### 3. Currently Tab

**Three Sections:**

**📖 Reading**
- Chronological log of article links
- Format: `[Date] Article Title - Publication`
- Clicking opens article in new tab
- Most recent at top
- Simple list format

Example:
```
Nov 12, 2024 - How to Build a Personal Website - CSS Tricks
Nov 10, 2024 - The Future of Web Development - Smashing Magazine
Nov 08, 2024 - Understanding React Server Components - Vercel Blog
```

**🎵 Listening**
- Spotify "Now Playing" widget (embedded player)
- Shows current/recent track
- Optional: Recently played list

**🎬 Watching**
- List of movies/shows with IMDB links
- Format: `Movie/Show Title (Year)` → links to IMDB
- Can add status: "Watching", "Finished", etc.
- Simple list with poster images (optional)

Example:
```
[Poster] The Godfather (1972) - IMDB →
[Poster] Breaking Bad (2008) - Currently watching S3E5 - IMDB →
```

## Data Storage

### File-Based Approach (Recommended)

**Blog Posts:**
```
/content/posts/*.mdx
```

**Reading Links:**
```json
// /content/reading.json
[
  {
    "date": "2024-11-12",
    "title": "Article Title",
    "publication": "Publication Name",
    "url": "https://...",
  }
]
```

**Watching:**
```json
// /content/watching.json
[
  {
    "title": "The Godfather",
    "year": 1972,
    "imdb": "tt0068646",
    "status": "finished",
    "poster": "url or null"
  }
]
```

**Gallery:**
```json
// /content/gallery.json
[
  {
    "id": "1",
    "url": "cloudinary-url",
    "type": "image",
    "title": "Photo caption",
    "date": "2024-11-12"
  }
]
```

**Benefits:**
- Version controlled (git)
- Easy to update (just edit JSON files)
- No database needed
- Fast and simple

## Deployment Options (No Vercel)

### Option 1: Traditional VPS Hosting ⭐ Recommended

**Providers:**
- **DigitalOcean** ($4-6/month) - Droplet with Node.js
- **Linode/Akamai** ($5/month) - Similar to DO
- **Vultr** ($3.50-6/month) - Good performance
- **Hetzner** (€4/month ~$4.30) - Great value, EU-based

**Setup:**
1. Spin up Ubuntu VPS
2. Install Node.js, nginx
3. Clone repo, build Next.js app
4. Use PM2 to keep app running
5. Nginx as reverse proxy
6. Setup SSL with Let's Encrypt (free)
7. Point domain to VPS IP

**Pros:**
- Full control
- Predictable costs
- Can run other services too
- Root access

**Cons:**
- Need to manage server
- Manual deployments (can automate with GitHub Actions)

### Option 2: Cloudflare Pages ⭐ Great Free Option

**Features:**
- Free hosting
- Unlimited bandwidth
- Automatic deployments from GitHub
- Built-in CDN
- SSL included
- Great DX (similar to Vercel)

**Setup:**
1. Connect GitHub repo
2. Configure build settings
3. Deploy!

**Limits:**
- 500 builds/month (free tier)
- Perfect for personal sites

### Option 3: Netlify

**Features:**
- Similar to Cloudflare Pages
- Free tier: 100GB bandwidth/month
- Automatic deployments
- Good build tools

### Option 4: AWS (S3 + CloudFront) or AWS Amplify

**S3 + CloudFront:**
- Export Next.js as static site
- Host on S3
- CloudFront CDN
- Very cheap (~$1-5/month depending on traffic)

**AWS Amplify:**
- Similar to Vercel/Netlify
- Free tier: 15GB bandwidth/month
- Automatic deployments

### Option 5: Self-Host at Home

**Requirements:**
- Raspberry Pi or old computer
- Dynamic DNS service (free)
- Port forwarding on router
- Cloudflare tunnel (free) or similar

**Pros:**
- Completely free (after hardware)
- Full control
- Learning experience

**Cons:**
- Reliability depends on home internet
- Need to maintain hardware
- Security considerations

## Recommended Deployment Path

**For Simplicity:** **Cloudflare Pages** (free, easy)
**For Control:** **DigitalOcean Droplet** ($6/month)
**For Cost:** **Home server + Cloudflare Tunnel** (free)

## Project Structure

```
personal-website/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Homepage (or redirect to /blog)
│   ├── blog/
│   │   └── page.tsx            # Expandable blog posts
│   ├── gallery/
│   │   └── page.tsx            # Photo/video grid
│   ├── currently/
│   │   └── page.tsx            # Reading, listening, watching
│   └── api/
│       └── spotify/
│           └── now-playing/
│               └── route.ts    # Spotify API
├── components/
│   ├── Navigation.tsx          # Top navigation bar
│   ├── ExpandablePost.tsx      # Substack-style post
│   ├── ReadingList.tsx
│   ├── WatchingList.tsx
│   └── SpotifyPlayer.tsx
├── content/
│   ├── posts/*.mdx            # Blog posts
│   ├── reading.json           # Reading links
│   ├── watching.json          # Movie/show IMDB links
│   └── gallery.json           # Gallery metadata
├── lib/
│   ├── mdx.ts
│   ├── content.ts             # Load JSON data
│   └── spotify.ts
├── public/
├── styles/
│   └── globals.css
└── package.json
```

## Navigation Design

```
┌─────────────────────────────────────────────┐
│  Your Name                                   │
│  Blog  |  Gallery  |  Currently              │
└─────────────────────────────────────────────┘
│                                              │
│  [Content for selected tab]                 │
│                                              │
└─────────────────────────────────────────────┘
```

## Implementation Steps

### Phase 1: Setup & Blog
1. Create Next.js project
2. Setup Tailwind CSS
3. Create navigation component (3 tabs)
4. Build expandable blog post component
5. Add MDX support
6. Create 2-3 sample posts
7. Deploy to Cloudflare Pages

### Phase 2: Currently Page
1. Create reading list component (JSON-based)
2. Create watching list component (IMDB links)
3. Setup Spotify Developer account
4. Integrate Spotify API for now playing
5. Add sample data

### Phase 3: Gallery
1. Setup Cloudinary account
2. Build gallery component
3. Add sample photos/videos
4. Implement lightbox

### Phase 4: Polish & Deploy
1. Responsive design refinements
2. Performance optimization
3. SEO metadata
4. Setup custom domain
5. Production deployment

## Quick Start

```bash
# Create project
npx create-next-app@latest personal-website --typescript --tailwind --app

# Install dependencies
cd personal-website
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter

# Development
npm run dev

# Build
npm run build

# For static export (if using S3/Cloudflare Pages)
# Add to next.config.js: output: 'export'
npm run build
```

## Domain Setup

Once you buy your domain:

1. **For VPS:** Point A record to VPS IP
2. **For Cloudflare Pages:** Follow Cloudflare DNS setup
3. **For other hosts:** Update nameservers or DNS records

## Estimated Costs

### Minimal Setup
- Domain: $12/year
- Cloudflare Pages: Free
- Cloudinary: Free (25GB)
- **Total: $12/year**

### VPS Setup
- Domain: $12/year
- DigitalOcean Droplet: $6/month = $72/year
- Cloudinary: Free
- **Total: $84/year**

### Home Server
- Domain: $12/year
- Cloudflare Tunnel: Free
- Cloudinary: Free
- Hardware: One-time cost (or reuse old laptop)
- **Total: $12/year**

---

## Ready to Build?

Let me know and I'll:
1. ✅ Scaffold the entire Next.js project
2. ✅ Create the 3-tab navigation
3. ✅ Build expandable blog posts (Substack style)
4. ✅ Setup reading/watching lists with links
5. ✅ Prepare for deployment

Which deployment option interests you most?
