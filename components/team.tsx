"use client"

import { useEffect, useRef } from "react"
import { Code2, Palette, TrendingUp } from "lucide-react"

const team = [
  {
    name: "Director Creativo",
    role: "Estrategia Digital",
    icon: Code2,
    initials: "DC",
  },
  {
    name: "Disenadora UX/UI",
    role: "Diseno de Interfaces",
    icon: Palette,
    initials: "UX",
  },
  {
    name: "Especialista Digital",
    role: "Marketing y Redes",
    icon: TrendingUp,
    initials: "ED",
  },
]

export function Team() {
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
    <section ref={sectionRef} id="equipo" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          <div>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Nuestro Equipo
            </p>
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              El equipo detras de cada proyecto
            </h2>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-4 text-muted-foreground leading-relaxed text-lg">
              Profesionales comprometidos con entregar soluciones que
              generan resultados reales.
            </p>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className={`reveal opacity-0 translate-y-8 transition-all duration-700 group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="aspect-[3/4] relative flex flex-col items-center justify-center gap-6 p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_30%,rgba(232,88,12,0.06),transparent)]" />
                  <div className="relative w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <member.icon size={40} className="text-primary" />
                  </div>
                  <div className="relative text-center">
                    <h3 className="text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
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
      `}</style>
    </section>
  )
}
