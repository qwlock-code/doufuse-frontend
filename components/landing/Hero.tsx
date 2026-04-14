'use client'

import Link from 'next/link'
import { Upload, ArrowRight, Sparkles, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-50 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-orange-200 rounded-full opacity-50 animate-bounce" />
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-50 animate-ping" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              100% Free - No Registration Required
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create Amazing{' '}
              <span className="gradient-text">Fuse Bead</span>{' '}
              Patterns
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Transform your images into beautiful bead patterns instantly. 
              Choose from 48 colors, customize your grid, and download ready-to-use templates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/editor"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg shadow-red-200"
              >
                <Upload className="w-5 h-5" />
                Create Pattern
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all border border-gray-200"
              >
                View Gallery
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex justify-center md:justify-start gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">48+</div>
                <div className="text-sm text-gray-500">Colors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">100%</div>
                <div className="text-sm text-gray-500">Free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">PNG</div>
                <div className="text-sm text-gray-500">Export</div>
              </div>
            </div>
          </div>

          {/* Right Content - Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
              {/* Pattern Preview */}
              <div className="grid grid-cols-9 gap-1 mb-6">
                {[
                  '#DC2626', '#F97316', '#FBBF24', '#22C55E', '#14B8A6',
                  '#2563EB', '#7C3AED', '#EC4899', '#DC2626', '#F97316',
                  '#FBBF24', '#22C55E', '#14B8A6', '#2563EB', '#7C3AED',
                  '#EC4899', '#DC2626', '#F97316', '#FBBF24', '#22C55E',
                  '#14B8A6', '#2563EB', '#7C3AED', '#EC4899', '#DC2626',
                  '#F97316', '#FBBF24', '#22C55E', '#14B8A6', '#2563EB',
                  '#7C3AED', '#EC4899', '#DC2626', '#F97316', '#FBBF24',
                  '#22C55E', '#14B8A6', '#2563EB', '#7C3AED', '#EC4899',
                  '#DC2626', '#F97316', '#FBBF24', '#22C55E', '#14B8A6',
                  '#2563EB', '#7C3AED', '#EC4899', '#DC2626', '#F97316',
                ].map((color, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-sm shadow-inner"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Info Bar */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>29 x 29 Grid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>48 Colors</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="text-sm font-medium">PNG Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
