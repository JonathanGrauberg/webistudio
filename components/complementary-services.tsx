"use client"

import { useEffect, useRef } from "react"
import { Megaphone, Video } from "lucide-react"

const services = [
  {
    icon: Megaphone,
    title: "Google Ads y Meta Ads",
    description:
      "Campañas publicitarias estrategicas en las principales plataformas digitales para amplificar tu alcance y generar resultados medibles.",
  },
  {
    icon: Video,
    title: "Produccion Audiovisual con Drone",
    description:
      "Material audiovisual profesional con tomas aereas para elevar la comunicacion visual de tu marca o proyecto.",
  },
]

export function ComplementaryServices() {
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
    <section ref={sectionRef} className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Servicios Complementarios
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-2xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Potencia tu proyecto con servicios adicionales
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed text-lg">
            En conjunto con especialistas, ofrecemos servicios opcionales
            que pueden sumarse a cualquier proyecto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal opacity-0 translate-y-8 transition-all duration-700 group p-8 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all duration-300`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon size={30} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}
