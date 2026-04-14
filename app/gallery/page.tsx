'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Eye, Search, Filter } from 'lucide-react'

const samplePatterns = [
  { id: 1, name: 'Heart Pattern', author: 'CraftLover', likes: 234, comments: 12, views: 1234, color: '#DC2626' },
  { id: 2, name: 'Star Wars', author: 'PixelMaster', likes: 189, comments: 8, views: 892, color: '#FBBF24' },
  { id: 3, name: 'Flower Garden', author: 'ArtisticAmy', likes: 156, comments: 5, views: 567, color: '#22C55E' },
  { id: 4, name: 'Rainbow Cat', author: 'CreativeCat', likes: 298, comments: 15, views: 2100, color: '#EC4899' },
  { id: 5, name: 'Ocean Wave', author: 'SeaLover', likes: 145, comments: 7, views: 456, color: '#0EA5E9' },
  { id: 6, name: 'Sunset Beach', author: 'DreamArtist', likes: 178, comments: 10, views: 789, color: '#F97316' },
  { id: 7, name: 'Mushroom', author: 'ForestGamer', likes: 112, comments: 4, views: 345, color: '#DC2626' },
  { id: 8, name: 'Galaxy', author: 'SpaceFan', likes: 267, comments: 18, views: 1567, color: '#8B5CF6' },
]

export default function GalleryPage() {
  const [patterns] = useState(samplePatterns)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filteredPatterns = patterns
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                 p.author.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes
      if (sortBy === 'recent') return b.id - a.id
      if (sortBy === 'views') return b.views - a.views
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Gallery</h1>
          <p className="text-gray-600">Explore amazing fuse bead patterns created by our community</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patterns or creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatterns.map((pattern) => (
            <Link 
              key={pattern.id} 
              href={`/pattern/${pattern.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Preview */}
              <div className="aspect-square p-4 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="w-full h-full grid grid-cols-8 gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square rounded-sm"
                      style={{ 
                        backgroundColor: pattern.color,
                        opacity: 0.6 + (i % 4) * 0.1
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                  {pattern.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  by {pattern.author}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{pattern.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{pattern.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{pattern.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPatterns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No patterns found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-red-600 font-medium hover:text-red-700"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
