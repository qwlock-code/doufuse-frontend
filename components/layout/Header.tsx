'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Upload, Heart, Trophy, ChevronDown } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white text-center py-2 px-4 text-sm font-medium">
        <span className="inline-flex items-center gap-2">
          <span className="animate-bounce">🔥</span>
          Welcome to Do-U-Fuse! Create amazing fuse bead patterns for free.
          <span className="animate-bounce">🔥</span>
        </span>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <circle cx="10" cy="10" r="5" fill="#FBBF24"/>
                <circle cx="22" cy="10" r="5" fill="#3B82F6"/>
                <circle cx="16" cy="22" r="5" fill="#22C55E"/>
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">Do-U-Fuse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-red-600 font-medium transition-colors">
              Home
            </Link>
            
            {/* Gallery Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-red-600 font-medium transition-colors">
                Gallery
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2">
                  <Link href="/gallery" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                    Community Gallery
                  </Link>
                  <Link href="/leaderboard" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trophy className="w-4 h-4" />
                    Leaderboard
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/editor" className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-colors">
              <Upload className="w-4 h-4" />
              Create Pattern
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-red-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100 animate-in">
            <div className="flex flex-col gap-2">
              <Link 
                href="/" 
                className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/gallery" 
                className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/leaderboard" 
                className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link 
                href="/editor" 
                className="mx-4 mt-2 flex items-center justify-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                <Upload className="w-4 h-4" />
                Create Pattern
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
