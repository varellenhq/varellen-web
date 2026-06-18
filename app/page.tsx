import { Hero } from '@/components/sections/hero'
import { Mission } from '@/components/sections/mission'
import { ServicesSection } from '@/components/sections/services-section'
import { Philosophy } from '@/components/sections/philosophy'
import { IndustriesSection } from '@/components/sections/industries-section'
import { WhyVarellen } from '@/components/sections/why-varellen'
import { FounderMessage } from '@/components/sections/founder-message'
import { ContactCta } from '@/components/sections/contact-cta'

export default function Page() {
  return (
    <main>
      <Hero />
      <Mission />
      <ServicesSection />
      <Philosophy />
      <IndustriesSection />
      <WhyVarellen />
      <FounderMessage />
      <ContactCta />
    </main>
  )
}
