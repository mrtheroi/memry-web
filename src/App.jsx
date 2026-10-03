import { MotionConfig } from 'motion/react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { Agents } from './components/organisms/Agents'
import { ClosingCta } from './components/organisms/ClosingCta'
import { Community } from './components/organisms/Community'
import { FAQ } from './components/organisms/FAQ'
import { Footer } from './components/organisms/Footer'
import { GetStarted } from './components/organisms/GetStarted'
import { Hero } from './components/organisms/Hero'
import { HowItWorks } from './components/organisms/HowItWorks'
import { Nav } from './components/organisms/Nav'
import { Problem } from './components/organisms/Problem'
import { Outcomes } from './components/organisms/Outcomes'
import { Security } from './components/organisms/Security'
import { UseCases } from './components/organisms/UseCases'

export default function App() {
  const reduced = usePrefersReducedMotion()
  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <div id="top" className="relative">
        <Nav />
        <main id="main">
          <Hero />
          <Problem />
          <Outcomes />
          <HowItWorks />
          <Agents />
          <UseCases />
          <Security />
          <Community />
          <FAQ />
          <GetStarted />
          <ClosingCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
