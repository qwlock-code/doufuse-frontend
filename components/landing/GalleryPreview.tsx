'use client'

import Link from 'next/link'
import { ArrowRight, Heart, Star } from 'lucide-react'

// Sample patterns for preview
const samplePatterns = [
  { name: 'Heart Pattern', author: 'CraftLover', likes: 234, color: '#DC2626' },
  { name: 'Star Wars', author: 'PixelMaster', likes: 189, color: '#FBBF24' },
  { name: 'Flower Garden', author: 'ArtisticAmy', likes: 156, color: '#22C55E' },
  { name: 'Rainbow Cat', author: 'CreativeCat', likes: 298, color: '#EC4899' },
]

export function GalleryPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Community <span className="text-red-400">Gallery</span>
            </h2>
            <p className="text-gray-400 max-w-lg">
              Explore amazing patterns created by our community. Get inspired and share your own creations!
            </p>
          </div>
          
          <Link 
            href="/gallery"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-red-400 font-semibold hover:text-red-300 transition-colors"
          >
            View All Patterns
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pattern Grid Preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {samplePatterns.map((pattern, index) => (
            <div 
              key={index}
              className="group bg-gray-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-red-400 transition-all"
            >
              {/* Pattern Preview */}
              <div className="aspect-square p-4 bg-gradient-to-br from-gray-700 to-gray-900">
                <div className="w-full h-full grid grid-cols-6 gap-1 opacity-80">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square rounded-sm"
                      style={{ 
                        backgroundColor: index % 2 === 0 
                          ? ['#DC2626', '#F97316', '#FBBF24', '#22C55E', '#3B82F6', '#8B5CF6'][i % 6]
                          : ['#EC4899', '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24', '#F97316'][i % 6]
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Pattern Info */}
              <div className="p-4">
                <h3 className="font-semibold mb-1 group-hover:text-red-400 transition-colors">
                  {pattern.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  by {pattern.author}
                </p>
                <div className="flex items-center gap-1 text-gray-400">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{pattern.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">1,000+</div>
            <div className="text-gray-400">Patterns Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">500+</div>
            <div className="text-gray-400">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">5,000+</div>
            <div className="text-gray-400">Likes Given</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-gray-400">Free Forever</div>
          </div>
        </div>
      </div>
    </section>
  )
}
