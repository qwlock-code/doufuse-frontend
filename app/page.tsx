import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { GalleryPreview } from '@/components/landing/GalleryPreview'
import { FAQ } from '@/components/landing/FAQ'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <GalleryPreview />
      <FAQ />
    </>
  )
}
