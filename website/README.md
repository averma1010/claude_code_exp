# Personal Website

A simple, elegant personal website with Financial Times-inspired design.

## Features

- **Blog**: Expandable blog posts with MDX support (Substack-style)
- **Gallery**: Photo and video showcase with lightbox
- **Currently**: Track what you're reading, watching, and listening to

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- MDX for blog posts
- File-based content management

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

Create a `.env.local` file in the root directory with:

```env
# OMDb API (for movie data in watching section)
OMDB_API_KEY=your_omdb_api_key

# Cloudinary (for gallery images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
```

**Get OMDb API Key**: Visit [OMDbAPI.com](http://www.omdbapi.com/apikey.aspx) to get a free API key for movie data.

### Build

```bash
npm run build
npm start
```

## Content Management

### Adding Blog Posts

Create a new `.mdx` file in `/content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2024-11-12"
excerpt: "First few sentences that appear in the preview..."
---

Your full post content here in Markdown...
```

### Adding Reading Links

Edit `/content/data/reading.json` - just add URLs:

```json
[
  "https://css-tricks.com/article-title/",
  "https://www.smashingmagazine.com/2024/11/article/",
  "https://vercel.com/blog/post-title"
]
```

The system will automatically fetch the article title, publication name, and date.

### Adding Movies/Shows

Edit `/content/data/watching.json` - just add IMDB IDs:

```json
[
  "tt1234567",
  "tt2345678",
  "tt3456789"
]
```

To find IMDB IDs: Go to any movie's IMDB page, the ID is in the URL (e.g., `imdb.com/title/tt1234567/`)

### Adding Gallery Items

Edit `/content/data/gallery.json`:

```json
{
  "id": "unique-id",
  "type": "image",
  "url": "https://your-image-url.com/photo.jpg",
  "title": "Photo Title",
  "date": "2024-11-12"
}
```

For best results, upload images to Cloudinary or a similar service.

## Deployment

### Cloudflare Pages (Recommended)

1. Push your code to GitHub
2. Connect repository to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `.next`
5. Deploy!

### Other Options

- **Netlify**: Similar to Cloudflare Pages
- **VPS**: Build and serve with Node.js
- **Vercel**: Works out of the box
- **AWS Amplify**: Connect GitHub repo

## Customization

### Change Colors

Edit `tailwind.config.ts` to modify the Financial Times-inspired color scheme:

```typescript
colors: {
  ft: {
    pink: '#FFF1E5',    // Background
    text: '#33302E',    // Text color
    accent: '#990F3D',  // Links and accents
    border: '#E8D9CC',  // Borders
  },
}
```

### Change Name

Edit `components/Navigation.tsx` and update "Your Name".

## License

MIT
