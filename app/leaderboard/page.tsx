'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'

const leaderboardData = [
  { rank: 1, name: 'CraftMaster', patterns: 45, likes: 2340, avatar: '#DC2626' },
  { rank: 2, name: 'BeadQueen', patterns: 38, likes: 1890, avatar: '#F97316' },
  { rank: 3, name: 'PixelArtist', patterns: 32, likes: 1650, avatar: '#FBBF24' },
  { rank: 4, name: 'FuseFan', patterns: 28, likes: 1420, avatar: '#22C55E' },
  { rank: 5, name: 'CreativeCrafter', patterns: 25, likes: 1280, avatar: '#3B82F6' },
  { rank: 6, name: 'ArtisticAmy', patterns: 22, likes: 1150, avatar: '#8B5CF6' },
  { rank: 7, name: 'BeadBoss', patterns: 20, likes: 980, avatar: '#EC4899' },
  { rank: 8, name: 'PatternPro', patterns: 18, likes: 890, avatar: '#14B8A6' },
]

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'alltime' | 'monthly' | 'weekly'>('alltime')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Leaderboard</h1>
              <p className="text-white/80">Top creators and most loved patterns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            {(['alltime', 'monthly', 'weekly'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  period === p
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {p === 'alltime' ? 'All Time' : p === 'monthly' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 2nd Place */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 transform md:-translate-y-4 order-1">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
                  <span className="text-4xl">👑</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900">{leaderboardData[1].name}</h3>
              <p className="text-gray-500 text-sm mb-3">@{leaderboardData[1].name.toLowerCase()}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <div className="font-bold text-orange-600">{leaderboardData[1].likes.toLocaleString()}</div>
                  <div className="text-gray-500">Likes</div>
                </div>
                <div>
                  <div className="font-bold text-gray-700">{leaderboardData[1].patterns}</div>
                  <div className="text-gray-500">Patterns</div>
                </div>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-yellow-400 order-2">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-5xl">👑</span>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
              </div>
              <h3 className="font-bold text-xl text-gray-900">{leaderboardData[0].name}</h3>
              <p className="text-gray-500 text-sm mb-3">@{leaderboardData[0].name.toLowerCase()}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <div className="font-bold text-yellow-600">{leaderboardData[0].likes.toLocaleString()}</div>
                  <div className="text-gray-500">Likes</div>
                </div>
                <div>
                  <div className="font-bold text-gray-700">{leaderboardData[0].patterns}</div>
                  <div className="text-gray-500">Patterns</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 transform md:-translate-y-4 order-3">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
                  <span className="text-4xl">🏅</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900">{leaderboardData[2].name}</h3>
              <p className="text-gray-500 text-sm mb-3">@{leaderboardData[2].name.toLowerCase()}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <div className="font-bold text-amber-600">{leaderboardData[2].likes.toLocaleString()}</div>
                  <div className="text-gray-500">Likes</div>
                </div>
                <div>
                  <div className="font-bold text-gray-700">{leaderboardData[2].patterns}</div>
                  <div className="text-gray-500">Patterns</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-gray-900">Top Creators</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {leaderboardData.slice(3).map((creator, index) => (
              <div 
                key={creator.rank}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center font-bold text-gray-400">
                  #{creator.rank + 1}
                </div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: creator.avatar }}
                >
                  {creator.name[0]}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{creator.name}</div>
                  <div className="text-sm text-gray-500">{creator.patterns} patterns</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-600">{creator.likes.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">likes</div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
