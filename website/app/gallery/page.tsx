'use client';

import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
  width?: number;
  height?: number;
}

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from Cloudinary
  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      if (data.success) {
        setGallery(data.images);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-12">Gallery</h1>

      {loading ? (
        <p className="text-lg text-ft-text/70">Loading gallery...</p>
      ) : gallery.length === 0 ? (
        <p className="text-lg text-ft-text/70">No photos yet. Check back soon!</p>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer mb-6 break-inside-avoid"
              onClick={() => setSelectedItem(item)}
            >
              <div className="bg-ft-border rounded-lg overflow-hidden">
                {item.type === 'image' ? (
                  <CldImage
                    src={item.id}
                    alt={item.title}
                    width={item.width || 400}
                    height={item.height || 300}
                    className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <video
                    className="w-full h-auto object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${item.id}.jpg`}
                  >
                    <source src={item.url} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div className="max-w-5xl max-h-[90vh] relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-ft-accent"
            >
              ✕
            </button>
            {selectedItem.type === 'image' ? (
              <CldImage
                src={selectedItem.id}
                alt={selectedItem.title}
                width={selectedItem.width || 1200}
                height={selectedItem.height || 800}
                className="max-w-full max-h-[85vh] object-contain"
              />
            ) : (
              <video
                className="max-w-full max-h-[85vh] object-contain"
                controls
                playsInline
                preload="metadata"
              >
                <source src={selectedItem.url} type="video/mp4" />
              </video>
            )}
            <div className="text-white mt-4 text-center">
              <h3 className="text-xl font-medium">{selectedItem.title}</h3>
              <p className="text-sm text-white/70 mt-1">
                {new Date(selectedItem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
