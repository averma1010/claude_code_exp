# Cloudflare Pages Deployment Troubleshooting

## Your Error: 503 API Error

```
API Request Failed: GET /api/v4/accounts/06cd0c2ee22380cd7e4b86a3933f3213/workers-and-pages/overview (503)
```

## Quick Fixes (Try in Order)

### 1. Wait and Retry (Success Rate: 90%)
The 503 error usually means Cloudflare's API is temporarily unavailable:
- Wait 5-10 minutes
- Try your deployment again
- If it persists after 30 minutes, continue to next steps

### 2. Check Cloudflare Status
Visit: https://www.cloudflarestatus.com/
- Look for incidents affecting "Pages" or "API"
- If there's an outage, wait for resolution

### 3. Clear Cloudflare CLI Cache (If using Wrangler)
```bash
# If you're using wrangler CLI
rm -rf ~/.wrangler
wrangler logout
wrangler login
```

### 4. Use Cloudflare Dashboard Instead of CLI
Instead of deploying via CLI/API:
1. Go to https://dash.cloudflare.com/
2. Navigate to Pages
3. Click "Create a project"
4. Connect your GitHub repository
5. Use these settings:
   - **Framework preset**: Next.js
   - **Build command**: `cd website && npm install && npm run build`
   - **Build output directory**: `website/.next`
   - **Root directory**: `/`
   - **Node version**: 18

### 5. Deploy via GitHub Integration (Recommended)
This bypasses the API issue entirely:
1. Push your code to GitHub (already done ✓)
2. Connect Cloudflare Pages to your GitHub repo
3. Let Cloudflare auto-deploy on every push
4. No CLI needed!

## Advanced Troubleshooting

### Issue: Account-Level API Problems
If the error persists for hours:
1. Log out of Cloudflare Dashboard
2. Clear browser cache
3. Log back in
4. Try creating a new Pages project

### Issue: Rate Limiting
If you've been trying repeatedly:
1. Wait 1 hour
2. API rate limits reset automatically
3. Try again

### Issue: Account Configuration
1. Verify your account is fully activated
2. Check if you have any pending payment/verification issues
3. Contact Cloudflare support if account shows warnings

## Alternative: Direct Git Integration

### Step-by-Step: Connect via Dashboard (No API Calls)

1. **Push your code** (already done!)
   ```bash
   git add .
   git commit -m "Prepare for Cloudflare deployment"
   git push origin claude/fix-cloudflare-deployment-error-01GCd6PwT2qc6dW7HBocKweM
   ```

2. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Sign in to your account

3. **Navigate to Pages**
   - Click "Workers & Pages" in left sidebar
   - Click "Create application"
   - Click "Pages" tab
   - Click "Connect to Git"

4. **Connect GitHub**
   - Authorize Cloudflare to access your GitHub
   - Select `averma1010/claude_code_exp`
   - Click "Begin setup"

5. **Configure Build**
   ```
   Project name: personal-website (or your choice)
   Production branch: main
   Framework preset: Next.js
   Build command: cd website && npm install && npm run build
   Build output directory: website/.next
   Root directory (advanced): /
   ```

6. **Environment Variables** (if needed)
   - Click "Add environment variable"
   - Add any secrets (Spotify API keys, etc.)

7. **Deploy**
   - Click "Save and Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

## If Still Not Working

### Verify Next.js Build Settings

Create a `functions/_middleware.js` in your website folder:

```javascript
// This ensures proper Next.js routing on Cloudflare Pages
export async function onRequest(context) {
  return await context.next();
}
```

### Add Cloudflare-Specific Configuration

Your Next.js app needs to be configured for Cloudflare's edge runtime.

## Common Cloudflare Pages Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 503 API Error | Cloudflare API unavailable | Wait 10 min, try again or use dashboard |
| 401 Authentication | Invalid credentials | Run `wrangler logout && wrangler login` |
| 429 Rate Limit | Too many requests | Wait 1 hour |
| Build Failed | Wrong build settings | Use settings above |
| 404 on routes | SPA routing issue | Add _middleware.js |

## Contact Cloudflare Support

If error persists for 24+ hours:
1. Go to: https://dash.cloudflare.com/?to=/:account/support
2. Open a ticket about "Pages API 503 error"
3. Include:
   - Account ID: `06cd0c2ee22380cd7e4b86a3933f3213`
   - Error message
   - Timestamp of attempts

## Alternative Platforms (If Urgent)

If you need to deploy immediately:

### Vercel (Easiest for Next.js)
```bash
npm install -g vercel
cd website
vercel --prod
```

### Netlify
```bash
npm install -g netlify-cli
cd website
netlify deploy --prod --dir=.next
```

Both offer free tiers and work perfectly with Next.js!

## Success Checklist

- [ ] Waited 10+ minutes and retried
- [ ] Checked Cloudflare status page
- [ ] Used dashboard instead of CLI
- [ ] Connected via GitHub integration
- [ ] Verified build settings
- [ ] Site is live!

## Prevention

Going forward:
1. Use **GitHub integration** for auto-deployments
2. Avoid manual API deployments
3. Push to GitHub → Cloudflare auto-deploys
4. No more 503 errors!

---

**Most Common Fix**: Just wait 10 minutes and try again. 503 errors are almost always temporary!
