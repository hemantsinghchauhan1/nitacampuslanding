import React from 'react'
import { HeroSection } from '@/components/landing/HeroSection'
import { LaunchCountdown } from '@/components/landing/LaunchCountdown'
import { AboutSection } from '@/components/landing/AboutSection'

export default function MarketingPage() {
  return (
    <main>
      <HeroSection />
      <LaunchCountdown />
      <AboutSection />
    </main>
  )
}
