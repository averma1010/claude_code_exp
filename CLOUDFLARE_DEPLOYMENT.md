# Cloudflare Pages Deployment Configuration

## Issue
The deployment was failing because Cloudflare Pages tried to deploy the entire `.next` build directory, which contained webpack cache files exceeding the 25 MiB file size limit.

## Solution
The Next.js project has been configured for static export mode, which generates optimized static files in the `out` directory without large cache files.

## Required Cloudflare Pages Settings

To complete the deployment fix, update your Cloudflare Pages project settings:

1. Go to your Cloudflare Pages dashboard
2. Select your project
3. Go to **Settings** > **Builds & deployments**
4. Update the following settings:

   - **Build command**: `cd website && npm install && npm run build`
   - **Build output directory**: `website/out`
   - **Root directory**: (leave empty or set to `/`)

   OR if you've set the root directory to `website`:

   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `website`

5. Save the settings and trigger a new deployment

## What Changed

- Added `output: 'export'` to `website/next.config.mjs` to enable static export mode
- Next.js now generates static HTML files in the `out` directory
- The `out` directory contains only necessary files, all under 25 MiB

## Verification

After updating the Cloudflare settings, the next deployment should:
- Build successfully without file size errors
- Deploy all static pages correctly
- Serve your website from Cloudflare's CDN
