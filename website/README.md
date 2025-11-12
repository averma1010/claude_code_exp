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

Edit `/content/data/reading.json`:

```json
{
  "date": "2024-11-12",
  "title": "Article Title",
  "publication": "Publication Name",
  "url": "https://..."
}
```

### Adding Movies/Shows

Edit `/content/data/watching.json`:

```json
{
  "title": "Movie Title",
  "year": 2024,
  "imdbId": "tt1234567",
  "status": "finished",
  "type": "movie"
}
```

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
