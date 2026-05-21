"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Cog, Database, Zap } from "lucide-react"

export function Presentation() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Sobre Webi.
            </p>
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tu equipo de desarrollo digital dedicado
            </h2>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-6 text-muted-foreground leading-relaxed text-lg">
              Somos un estudio digital enfocado en construir plataformas y
              sistemas web que se adaptan a los procesos reales de cada
              empresa. Trabajamos de cerca con nuestros clientes para
              entregar soluciones funcionales, escalables y con impacto
              directo en su operacion.
            </p>
            <a
              href="#contacto"
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-8 group inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
            >
              Contactanos
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 grid grid-cols-1 gap-6">
            {[
              {
                icon: Cog,
                title: "Automatizacion",
                desc: "Eliminamos tareas manuales repetitivas con sistemas que trabajan por vos.",
              },
              {
                icon: Database,
                title: "Centralizacion",
                desc: "Toda la informacion de tu empresa accesible desde un solo lugar.",
              },
              {
                icon: Zap,
                title: "Optimizacion",
                desc: "Mejoramos flujos de trabajo para que tu equipo sea mas eficiente.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group flex gap-5 p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                  <p className="text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
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
