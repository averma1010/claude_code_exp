# Decap CMS Setup Guide

Your website now has a Content Management System (CMS) powered by Decap CMS! This means you can add and edit content through a user-friendly interface instead of editing code files directly.

## Accessing the CMS

### Local Development
1. Start your development server:
   ```bash
   npm run dev
   ```

2. In a separate terminal, start the Decap CMS backend:
   ```bash
   npx decap-server
   ```

3. Open your browser and go to:
   ```
   http://localhost:3000/admin
   ```

You should see the CMS login screen. Click "Login" and you're in!

### Production (After Deployment)

Once deployed, visit:
```
https://yourdomain.com/admin
```

For production, you'll need to set up GitHub OAuth (see below).

## What Can You Manage?

The CMS gives you visual editors for all your content:

### 📝 Blog Posts
- Create new blog posts with a rich text editor
- Set title, date, and excerpt
- Write in Markdown with live preview
- Posts automatically get saved as `.mdx` files

### 📖 Reading List
- Add articles/links you're reading
- Fields: Date, Title, Publication, URL
- Displays on the "Currently" page

### 🎬 Watching List
- Add movies and TV series you're watching
- Fields: Title, Year, IMDB ID, Status, Current Season/Episode
- Automatically links to IMDB
- Displays on the "Currently" page

### 📷 Gallery
- Add images and videos
- Fields: ID, Type (image/video), URL, Title, Date
- Displays in masonry grid on Gallery page

## How to Add Content

### Adding a Blog Post

1. Go to `/admin` in your browser
2. Click "Blog Posts" in the sidebar
3. Click "New Blog Post"
4. Fill in:
   - **Title**: Your post title
   - **Date**: Publication date (defaults to today)
   - **Excerpt**: Short summary (shows on blog list)
   - **Body**: Your full post content (supports Markdown)
5. Click "Publish" → "Publish now"

The file will be saved to `content/posts/YYYY-MM-DD-your-title.mdx`

### Adding a Movie/Show

1. Go to `/admin`
2. Click "Watching List"
3. Scroll to "Watching Items" and click "Add Watching Items"
4. Fill in the fields:
   - **Title**: Movie or show name
   - **Year**: Release year
   - **IMDB ID**: Find this from the IMDB URL (e.g., `tt0068646` from `imdb.com/title/tt0068646`)
   - **Type**: Select "movie" or "series"
   - **Status**: watching, finished, or planned
   - **Current Season/Episode**: Only for series you're currently watching
5. Click "Publish"

### Adding a Reading Item

1. Go to `/admin`
2. Click "Reading List"
3. Click "Add Reading Items"
4. Fill in: Date, Title, Publication, URL
5. Click "Publish"

### Adding Gallery Items

1. Go to `/admin`
2. Click "Gallery"
3. Click "Add Gallery Items"
4. Fill in:
   - **ID**: Unique number (e.g., "10", "11")
   - **Type**: "image" or "video"
   - **URL**: Direct link to the image/video
   - **Title**: Caption/title
   - **Date**: When it was taken/created
5. Click "Publish"

## GitHub OAuth Setup (For Production)

To use the CMS on your deployed website, you need to set up GitHub authentication:

### Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
   Or visit: https://github.com/settings/developers

2. Click "New OAuth App"

3. Fill in the details:
   - **Application name**: "Your Website CMS" (or any name)
   - **Homepage URL**: `https://yourdomain.com`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
     (If not using Netlify, use: `https://yourdomain.com/admin`)

4. Click "Register application"

5. Copy your **Client ID**

6. Click "Generate a new client secret" and copy the **Client Secret**

### Step 2: Configure Your Deployment

#### Option A: Using Netlify (Recommended)

1. Go to your Netlify site settings
2. Navigate to "Access control" → "OAuth"
3. Under "Authentication providers", click "Install provider"
4. Select "GitHub"
5. Enter your Client ID and Client Secret
6. Save

#### Option B: Using Vercel or Other Platforms

You'll need to set up a separate authentication backend. Options:
- Use [Netlify's Git Gateway](https://github.com/netlify/git-gateway)
- Use [Decap CMS with GitHub Backend](https://decapcms.org/docs/github-backend/)
- Self-host an auth server

### Step 3: Update Your CMS Config

Edit `public/admin/config.yml` and update:
```yaml
backend:
  name: github
  repo: yourusername/your-repo-name  # Update this!
  branch: main  # Or master, depending on your setup
```

## Tips & Tricks

### Markdown Formatting

In blog posts, you can use:
- `# Heading 1`, `## Heading 2`, etc.
- `**bold**` and `*italic*`
- `[link text](url)` for links
- `` `code` `` for inline code
- Images: `![alt text](image-url)`
- Lists, blockquotes, and more!

### Managing Images

Currently, images are referenced by URL. Options:
1. Use Unsplash URLs (like the gallery examples)
2. Host images in your repo under `/public/images/`
3. Use a service like Cloudinary or Imgur

To use local images:
1. Add image to `/public/images/your-image.jpg`
2. Reference in CMS as `/images/your-image.jpg`

### Finding IMDB IDs

1. Go to IMDB and search for the movie/show
2. Look at the URL: `https://www.imdb.com/title/tt0068646/`
3. The ID is `tt0068646`

### Content Storage

All your content is stored as files in your git repository:
- Blog posts: `content/posts/*.mdx`
- Reading/Watching/Gallery: `content/data/*.json`

This means:
- ✅ Full version history via git
- ✅ Easy backups
- ✅ Can still edit files directly if needed
- ✅ Content is portable and never locked in

## Troubleshooting

### "Config file not found"
- Make sure you're accessing `/admin` not `/admin/`
- Check that `public/admin/config.yml` exists

### Changes not showing up
- Refresh the page
- Clear your browser cache
- In development, restart `npx decap-server`

### Can't login (production)
- Verify GitHub OAuth app is configured
- Check the callback URL matches your deployment
- Make sure the repo name in config.yml is correct

### "Failed to persist entry"
- Check that your branch name in config.yml is correct
- Verify you have write access to the repository
- Try logging out and back in

## Need Help?

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GitHub OAuth Setup Guide](https://decapcms.org/docs/github-backend/)
- Check your browser console for error messages

---

Happy content creating! 🎉
