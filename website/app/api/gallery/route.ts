import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:personal-gallery')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    const images = result.resources.map((resource: any) => ({
      id: resource.public_id,
      type: resource.resource_type,
      url: resource.secure_url,
      title: resource.display_name || resource.public_id.split('/').pop(),
      date: resource.created_at,
      width: resource.width,
      height: resource.height,
    }));

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}