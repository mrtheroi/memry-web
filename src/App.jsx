import { MotionConfig } from 'motion/react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { BuiltFor } from './components/organisms/BuiltFor'
import { Footer } from './components/organisms/Footer'
import { GetStarted } from './components/organisms/GetStarted'
import { Hero } from './components/organisms/Hero'
import { HowItWorks } from './components/organisms/HowItWorks'
import { Intro } from './components/organisms/Intro'
import { Nav } from './components/organisms/Nav'
import { Privacy } from './components/organisms/Privacy'
import { WhyMemry } from './components/organisms/WhyMemry'

export default function App() {
  const reduced = usePrefersReducedMotion()
  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <div id="top" className="relative">
        <Nav />
        <main id="main">
          <Hero />
          <Intro />
          <HowItWorks />
          <BuiltFor />
          <WhyMemry />
          <GetStarted />
          <Privacy />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
