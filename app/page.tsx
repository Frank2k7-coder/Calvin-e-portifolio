'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Portfolio from '@/components/portfolio'
import About from '@/components/about'
import Achievements from '@/components/achievements'
import VideoProjects from '@/components/video-projects'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
       <About />
      <Portfolio />
       <VideoProjects />
     
      <Achievements />
     
      <Contact />
      <Footer />
    </main>
  )
}
