'use client'

import { Palette, Download, Edit3, Grid3X3, Zap, Users } from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: '48 Brand Colors',
    description: 'Custom Do-U-Fuse color palette designed for beautiful bead patterns. Match any design vision.',
    color: 'red',
  },
  {
    icon: Grid3X3,
    title: 'Adjustable Grid Size',
    description: 'Create patterns from 10x10 up to 100x100 grids. Perfect for any project size.',
    color: 'orange',
  },
  {
    icon: Edit3,
    title: 'Easy Editor',
    description: 'Intuitive brush, fill, and eraser tools. Undo/redo support for hassle-free editing.',
    color: 'yellow',
  },
  {
    icon: Download,
    title: 'PNG Export',
    description: 'Download your patterns as high-quality PNG images. Print-ready at any size.',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description: 'Upload an image and get a bead pattern in seconds with our smart color matching.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Community Gallery',
    description: 'Share your creations, get likes, and browse patterns from other crafters.',
    color: 'purple',
  },
]

const colorClasses = {
  red: 'bg-red-100 text-red-600',
  orange: 'bg-orange-100 text-orange-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
}

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Create Magic</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed for both beginners and experienced bead artists.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-6 py-3 rounded-full border border-red-100">
            <span className="text-2xl">🎨</span>
            <span className="text-gray-700 font-medium">
              Try it now - it's completely free!
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
