'use client';

import { useState } from 'react';
import galleryData from '@/content/data/gallery.json';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
}

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const gallery = galleryData as GalleryItem[];

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-12">Gallery</h1>

      {gallery.length === 0 ? (
        <p className="text-lg text-ft-text/70">No photos or videos yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-square bg-ft-border rounded-lg overflow-hidden mb-3">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                )}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-ft-text/60">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
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
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                className="max-w-full max-h-[85vh] object-contain"
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                className="max-w-full max-h-[85vh]"
              />
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
