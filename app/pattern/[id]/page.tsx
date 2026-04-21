import Link from 'next/link'
import { ArrowLeft, Heart, MessageCircle, Download, Share2 } from 'lucide-react'

// 模拟数据，实际项目中应从 Supabase 或 API 获取
const samplePatterns: Record<string, any> = {
  '1': { id: 1, name: 'Heart Pattern', author: 'CraftLover', likes: 234, comments: 12, color: '#DC2626' },
  '2': { id: 2, name: 'Star Wars', author: 'PixelMaster', likes: 189, comments: 8, color: '#FBBF24' },
  '3': { id: 3, name: 'Flower Garden', author: 'ArtisticAmy', likes: 156, comments: 5, color: '#22C55E' },
}

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export default function PatternDetailPage({ params }: { params: { id: string } }) {
  const pattern = samplePatterns[params.id]

  if (!pattern) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pattern not found</h1>
          <Link href="/gallery" className="text-red-600 hover:text-red-700 font-medium">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="aspect-square grid grid-cols-12 gap-1">
              {Array.from({ length: 144 }).map((_, i) => (
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{pattern.name}</h1>
              <p className="text-gray-600">by <span className="font-medium">{pattern.author}</span></p>
            </div>

            <div className="flex items-center gap-6 py-4 border-t border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-medium">{pattern.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{pattern.comments}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                Like
              </button>
              <button className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>

            <button className="w-full bg-white text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share Pattern
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}