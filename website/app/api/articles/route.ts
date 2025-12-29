import { NextResponse } from 'next/server';

interface ArticleData {
  title: string;
  publication: string;
  url: string;
  date: string;
  image?: string;
  description?: string;
}

async function fetchArticleMetadata(url: string): Promise<ArticleData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PersonalWebsiteBot/1.0)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extract title from Open Graph, Twitter, or title tag
    const ogTitleMatch = html.match(/<meta[^>]*(?:property="og:title"|name="twitter:title")[^>]*content="([^"]*)"[^>]*>/i);
    const titleMatch = html.match(/<title[^>]*>([^<]*)</i);
    const title = ogTitleMatch ? ogTitleMatch[1].trim() : (titleMatch ? titleMatch[1].trim() : new URL(url).pathname);
    
    // Extract publication/site name from various meta tags
    const siteNameMatch = html.match(/<meta[^>]*(?:property="og:site_name"|name="application-name"|name="site_name")[^>]*content="([^"]*)"[^>]*>/i) ||
                         html.match(/<meta[^>]*content="([^"]*)"[^>]*(?:property="og:site_name"|name="application-name"|name="site_name")[^>]*>/i);
    
    let publication = siteNameMatch ? siteNameMatch[1].trim() : '';
    
    // Fallback to domain name if no site name found
    if (!publication) {
      const domain = new URL(url).hostname;
      publication = domain.replace(/^www\./, '');
    }
    
    // Extract cover image from Open Graph, Twitter Cards, or other meta tags
    const imageMatch = html.match(/<meta[^>]*(?:property="og:image"|name="twitter:image"|property="twitter:image"|name="twitter:image:src")[^>]*content="([^"]*)"[^>]*>/i) ||
                      html.match(/<meta[^>]*content="([^"]*)"[^>]*(?:property="og:image"|name="twitter:image"|property="twitter:image"|name="twitter:image:src")[^>]*>/i) ||
                      html.match(/<link[^>]*rel="image_src"[^>]*href="([^"]*)"[^>]*>/i);
    
    let image = imageMatch ? imageMatch[1].trim() : undefined;
    
    // Convert relative URLs to absolute
    if (image && !image.startsWith('http')) {
      const baseUrl = new URL(url);
      if (image.startsWith('//')) {
        image = `${baseUrl.protocol}${image}`;
      } else if (image.startsWith('/')) {
        image = `${baseUrl.origin}${image}`;
      } else {
        image = `${baseUrl.origin}/${image}`;
      }
    }
    
    // Extract description
    const descMatch = html.match(/<meta[^>]*(?:property="og:description"|name="description"|name="twitter:description")[^>]*content="([^"]*)"[^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : undefined;
    
    // Get current date as article date (since we're adding it "currently")
    const currentDate = new Date().toISOString().split('T')[0];
    
    return {
      title: title.substring(0, 100), // Limit title length
      publication,
      url,
      date: currentDate,
      image,
      description: description?.substring(0, 200), // Limit description length
    };
  } catch (error) {
    console.error(`Failed to fetch article metadata for ${url}:`, error);
    
    // Return basic data even if scraping fails
    const domain = new URL(url).hostname.replace(/^www\./, '');
    const currentDate = new Date().toISOString().split('T')[0];
    
    return {
      title: url,
      publication: domain,
      url,
      date: currentDate,
      image: undefined,
      description: undefined,
    };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { success: false, error: 'URL is required' },
      { status: 400 }
    );
  }
  
  try {
    const articleData = await fetchArticleMetadata(url);
    
    if (!articleData) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      article: articleData,
    });
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();
    
    if (!Array.isArray(urls)) {
      return NextResponse.json(
        { success: false, error: 'urls must be an array' },
        { status: 400 }
      );
    }
    
    const articles = await Promise.all(
      urls.map(async (url: string) => {
        return await fetchArticleMetadata(url);
      })
    );
    
    const validArticles = articles.filter(article => article !== null);
    
    return NextResponse.json({
      success: true,
      articles: validArticles,
    });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles data' },
      { status: 500 }
    );
  }
}