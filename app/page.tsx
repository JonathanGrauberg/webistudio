import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Presentation } from "@/components/presentation"
import { Services } from "@/components/services"
import { ValueProposition } from "@/components/value-proposition"
import { Portfolio } from "@/components/portfolio"
import { Metrics } from "@/components/metrics"
import { Plans } from "@/components/plans"
import { ComplementaryServices } from "@/components/complementary-services"
import { Team } from "@/components/team"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Presentation />
      <Services />
      <ValueProposition />
      <Portfolio />
      <Metrics />
      <Plans />
      <ComplementaryServices />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
