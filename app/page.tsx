import { Navbar } from "@/components/site/navbar"
import { Intro } from "@/components/site/intro"
import { Manifesto } from "@/components/site/manifesto"
import { Products } from "@/components/site/products"
import { WorkSection } from "@/components/site/work"
import { Services } from "@/components/site/services"
import { Studio } from "@/components/site/studio"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { RevealObserver } from "@/components/site/reveal"
import { SmoothScroll } from "@/components/site/smooth-scroll"

// Secciones alternadas negro / crema
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Intro />
        <Manifesto />
        <Products />
        <WorkSection />
        <Services />
        <Studio />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
      <SmoothScroll />
    </>
  )
}
