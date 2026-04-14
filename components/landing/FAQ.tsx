'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'What are fuse beads?',
    answer: 'Fuse beads (also known as Perler beads, Hama beads, or iron beads) are small plastic beads that can be arranged on a pegboard to create colorful pixel art designs. Once arranged, they are fused together using an iron, creating a solid plastic piece.'
  },
  {
    question: 'Is Do-U-Fuse really free to use?',
    answer: 'Yes! Do-U-Fuse is 100% free to use. No registration required, no hidden fees, no watermarks on your creations. We believe everyone should be able to create beautiful bead patterns without barriers.'
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support JPG and PNG images up to 10MB. For best results, use high-quality images with clear colors and good contrast. Complex images may need some manual editing after conversion.'
  },
  {
    question: 'How does the color matching work?',
    answer: 'Our algorithm analyzes each pixel of your image and matches it to the closest color in our custom Do-U-Fuse palette using color distance calculation. You can adjust the grid size to control the level of detail in your pattern.'
  },
  {
    question: 'Can I edit the pattern after conversion?',
    answer: 'Absolutely! Our editor includes brush, fill, and eraser tools. You can adjust individual beads, change colors, fill areas, and fine-tune your pattern until it is perfect.'
  },
  {
    question: 'What grid sizes are available?',
    answer: 'You can create patterns from 10x10 up to 100x100 beads. Smaller grids create simpler patterns, while larger grids allow for more detailed designs. Most users find 29x29 to 50x50 works best for most projects.'
  },
  {
    question: 'How do I save and share my patterns?',
    answer: 'You can download your pattern as a PNG image with or without color codes. You can also share your patterns to our community gallery where other users can view, like, and comment on your creations.'
  },
  {
    question: 'Can I use patterns commercially?',
    answer: 'The patterns you create are yours to use however you like! However, please respect others\' work in our gallery. Do not copy or reproduce patterns created by other users without permission.'
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-red-200 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-left">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 bg-gray-50 animate-in">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="mailto:support@doufuse.com" 
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  )
}
