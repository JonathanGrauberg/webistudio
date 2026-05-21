"use client"

import { useEffect, useRef } from "react"
import { MonitorSmartphone, ShoppingCart, Building2, Factory, Leaf, Gem } from "lucide-react"

const projects = [
  { name: "Centro Medico", icon: Building2, category: "Sistema Web" },
  { name: "OICSA", icon: Factory, category: "Sistema de Stock" },
  { name: "Ecoservicios", icon: Leaf, category: "Presupuestacion" },
  { name: "Neostone", icon: Gem, category: "Plataforma Corporativa" },
  { name: "Art y Deco Lizz", icon: ShoppingCart, category: "Ecommerce" },
  { name: "Invitaciones Digitales", icon: MonitorSmartphone, category: "Desarrollo Web" },
]

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in")
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            PROYECTOS
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
            Empresas que confian en Webi. para impulsar sus procesos digitales
          </p>
        </div>

        {/* Scrolling marquee */}
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 relative overflow-hidden">
          <div className="flex animate-marquee gap-6">
            {[...projects, ...projects].map((project, i) => (
              <div
                key={i}
                className="group shrink-0 w-72 p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <project.icon size={26} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                <p className="text-sm text-primary mt-1 font-medium">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
