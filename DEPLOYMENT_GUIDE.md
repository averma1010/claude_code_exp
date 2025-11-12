# Deployment Guide

Your personal website is now ready to deploy! Here's how to get it live.

## Quick Start - Run Locally

```bash
cd website
npm install
npm run dev
```

Visit `http://localhost:3000` to see your site!

## Deployment Options

### Option 1: Cloudflare Pages (Recommended - Free & Easy)

**Why Cloudflare Pages:**
- Completely free
- Unlimited bandwidth
- Automatic deployments from GitHub
- Built-in CDN (super fast worldwide)
- Zero configuration needed

**Steps:**

1. **Push to GitHub** (already done! ✅)

2. **Sign up for Cloudflare Pages**
   - Go to https://pages.cloudflare.com
   - Sign up for free account

3. **Connect Repository**
   - Click "Create a project"
   - Connect your GitHub account
   - Select your repository (`averma1010/claude_code_exp`)

4. **Configure Build Settings**
   ```
   Build command: cd website && npm install && npm run build
   Build output directory: website/.next
   Root directory: /
   Framework preset: Next.js
   Node version: 18 or higher
   ```

5. **Deploy!**
   - Click "Save and Deploy"
   - Wait 2-3 minutes
   - Your site will be live at: `your-project.pages.dev`

6. **Add Custom Domain** (after buying one)
   - Go to your project settings
   - Click "Custom domains"
   - Add your domain and follow DNS instructions

**Benefits:**
- Free SSL certificate
- Automatic deployments on every git push
- Preview deployments for branches
- Rollback to previous versions easily

---

### Option 2: DigitalOcean Droplet (Full Control)

**Cost:** $6/month

**Steps:**

1. **Create Droplet**
   - Go to DigitalOcean.com
   - Create Ubuntu 22.04 droplet ($6/month)
   - Choose datacenter closest to your users

2. **SSH into server**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   apt-get install -y nodejs
   ```

4. **Install nginx**
   ```bash
   apt-get install -y nginx
   ```

5. **Clone your repository**
   ```bash
   cd /var/www
   git clone https://github.com/averma1010/claude_code_exp.git
   cd claude_code_exp/website
   npm install
   npm run build
   ```

6. **Setup PM2 (process manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "website" -- start
   pm2 startup
   pm2 save
   ```

7. **Configure nginx**
   Create `/etc/nginx/sites-available/website`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   ln -s /etc/nginx/sites-available/website /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   apt-get install -y certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com
   ```

9. **Point your domain**
   - Add A record pointing to your droplet IP

**Auto-deploy on push (optional):**
```bash
# Create webhook handler script
cd /var/www/claude_code_exp
nano deploy.sh
```

```bash
#!/bin/bash
cd /var/www/claude_code_exp
git pull origin main
cd website
npm install
npm run build
pm2 restart website
```

Make executable:
```bash
chmod +x deploy.sh
```

---

### Option 3: Netlify (Alternative Free Option)

1. Sign up at netlify.com
2. Connect GitHub repo
3. Build settings:
   - Base directory: `website`
   - Build command: `npm run build`
   - Publish directory: `website/.next`
4. Deploy!

---

### Option 4: AWS Amplify

1. Sign up for AWS
2. Go to AWS Amplify console
3. Connect GitHub repository
4. Build settings (auto-detected for Next.js)
5. Deploy!

Free tier: 15GB bandwidth/month

---

## Domain Name Setup

### Buy Domain

Recommended registrars:
- **Namecheap** (~$10-12/year) - Easy to use
- **Cloudflare** (~$10/year) - If using Cloudflare Pages
- **Porkbun** (~$10/year) - Good prices
- **Google Domains** / **Squarespace** (~$12/year)

### Connect Domain

**For Cloudflare Pages:**
1. Transfer nameservers to Cloudflare (recommended)
2. Or add CNAME record: `your-project.pages.dev`

**For DigitalOcean:**
1. Add A record pointing to your droplet IP
2. Add AAAA record if you have IPv6

**For Netlify:**
1. Add custom domain in Netlify dashboard
2. Update DNS records as instructed

---

## Content Updates

### Adding Blog Posts

1. Create new file: `website/content/posts/YYYY-MM-DD-title.mdx`
2. Add frontmatter:
   ```mdx
   ---
   title: "Post Title"
   date: "2024-11-12"
   excerpt: "First few sentences..."
   ---

   Your content here...
   ```
3. Commit and push - auto-deploys!

### Updating Reading List

Edit `website/content/data/reading.json`:
```json
{
  "date": "2024-11-12",
  "title": "Article Title",
  "publication": "Publication",
  "url": "https://..."
}
```

### Updating Movies/Shows

Edit `website/content/data/watching.json`:
```json
{
  "title": "Movie",
  "year": 2024,
  "imdbId": "tt1234567",
  "status": "finished",
  "type": "movie"
}
```

### Adding Photos/Videos

1. Upload to Cloudinary (free account)
2. Edit `website/content/data/gallery.json`:
   ```json
   {
     "id": "unique-id",
     "type": "image",
     "url": "cloudinary-url",
     "title": "Photo caption",
     "date": "2024-11-12"
   }
   ```

---

## Customization

### Change Your Name

Edit `website/components/Navigation.tsx` - line 22:
```tsx
<h1 className="text-2xl font-bold">
  <Link href="/blog">Your Name Here</Link>
</h1>
```

### Change Colors

Edit `website/tailwind.config.ts`:
```typescript
colors: {
  ft: {
    pink: '#FFF1E5',    // Background color
    text: '#33302E',    // Main text
    accent: '#990F3D',  // Links/accents
    border: '#E8D9CC',  // Borders
  },
}
```

### Change Fonts

Edit `website/tailwind.config.ts`:
```typescript
fontFamily: {
  serif: ['Georgia', 'Times New Roman', 'serif'],
  // or: serif: ['Crimson Pro', 'Georgia', 'serif'],
}
```

If using custom font, add to `website/app/layout.tsx`.

---

## Spotify Integration (Optional)

To show "Now Playing" on Currently page:

1. **Create Spotify Developer App**
   - Go to https://developer.spotify.com/dashboard
   - Create new app
   - Get Client ID and Client Secret

2. **Get Refresh Token**
   - Use this tool: https://spotify-refresh-token.vercel.app/
   - Or follow Spotify OAuth flow

3. **Add Environment Variables**
   Create `website/.env.local`:
   ```env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REFRESH_TOKEN=your_refresh_token
   ```

4. **Add to Cloudflare Pages:**
   - Go to Settings > Environment Variables
   - Add the three Spotify variables

(Implementation code for Spotify API not included yet - can add later)

---

## Performance Tips

1. **Optimize Images**
   - Use Cloudinary auto-optimization
   - Or compress before uploading

2. **Enable Caching**
   - Cloudflare Pages: automatic
   - VPS: configure nginx caching

3. **Monitor Performance**
   - Use Google PageSpeed Insights
   - Check Web Vitals

---

## Troubleshooting

**Build fails:**
```bash
cd website
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

**Git issues:**
```bash
git status
git add .
git commit -m "description"
git push
```

**Port already in use:**
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

---

## Next Steps

1. ✅ Choose deployment platform (Cloudflare Pages recommended)
2. ✅ Buy domain name
3. ✅ Deploy site
4. ✅ Add custom domain
5. ✅ Update "Your Name" in navigation
6. ✅ Replace sample content with your own
7. ✅ Share your new website!

---

## Cost Summary

**Minimal (Recommended):**
- Domain: $10-12/year
- Cloudflare Pages: Free
- Cloudinary: Free (25GB)
- **Total: ~$12/year**

**With VPS Control:**
- Domain: $12/year
- DigitalOcean: $72/year ($6/month)
- **Total: ~$84/year**

---

Good luck! 🚀

Questions? Check the README.md in the website folder or refer to:
- Next.js docs: https://nextjs.org/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Tailwind CSS: https://tailwindcss.com/docs
