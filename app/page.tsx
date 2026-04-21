import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { GalleryPreview } from '@/components/landing/GalleryPreview'
import { FAQ } from '@/components/landing/FAQ'
import PerlerGenerator from '@/components/perler/PerlerGenerator'

export default function HomePage() {
  return (
    <>
      <PerlerGenerator />
      <Hero />
      <Features />
      <HowItWorks />
      <GalleryPreview />
      <FAQ />
    </>
  )
}
