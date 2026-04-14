'use client'

import { Upload, Wand2, Download } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload Your Image',
    description: 'Drag and drop or click to upload any image (JPG, PNG). Max file size: 10MB.',
    color: 'from-red-500 to-rose-500',
  },
  {
    number: 2,
    icon: Wand2,
    title: 'Auto-Convert',
    description: 'Our smart algorithm converts your image to a bead pattern using the Do-U-Fuse color palette.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    number: 3,
    icon: Download,
    title: 'Download & Create',
    description: 'Export as PNG, edit if needed, and start creating your fuse bead masterpiece!',
    color: 'from-green-500 to-emerald-500',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From image to bead pattern in under a minute. No experience needed.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-200 via-orange-200 to-green-200 -translate-y-1/2 z-0" />
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Step Circle */}
                <div className="relative inline-block mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-gray-700">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Preview */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-400 to-purple-500 w-32 h-32 mx-auto rounded-2xl shadow-lg" />
              <p className="mt-3 text-sm font-medium text-gray-500">Original Image</p>
            </div>
            
            <div className="hidden md:flex justify-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">→</span>
              </div>
            </div>
            <div className="md:hidden flex justify-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">↓</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="grid grid-cols-8 gap-1 w-32 mx-auto mb-3">
                {['#EC4899', '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444', '#EC4899',
                  '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444', '#EC4899', '#8B5CF6',
                  '#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6',
                  '#22C55E', '#FBBF24', '#F97316', '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6', '#22C55E',
                  '#FBBF24', '#F97316', '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24',
                  '#F97316', '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24', '#F97316',
                  '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444',
                  '#EC4899', '#8B5CF6', '#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444', '#EC4899'
                ].map((color, i) => (
                  <div key={i} className="aspect-square rounded-sm" style={{ backgroundColor: color }} />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-500">Bead Pattern</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
