"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Abstract background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(232,88,12,0.15),transparent)]" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-32 w-full">
        <div className="max-w-3xl">
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-6">
              Estudio Digital
            </p>
          </div>

          <h1
            className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Creamos{" "}
            <span className="text-primary">soluciones digitales</span>{" "}
            para tu empresa
          </h1>

          <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Desarrollo de sistemas web a medida, plataformas digitales y
            gestion de redes sociales. Automatizamos y optimizamos los
            procesos de tu negocio.
          </p>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-medium rounded-lg hover:bg-primary/90 transition-all duration-200"
            >
              Iniciar proyecto
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 font-medium rounded-lg hover:bg-secondary transition-all duration-200"
            >
              Conocer servicios
            </a>
          </div>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-[400ms] mt-12 flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>+6</p>
              <p className="text-sm text-muted-foreground mt-1">
                Proyectos entregados
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>100%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Soluciones a medida
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>24/7</p>
              <p className="text-sm text-muted-foreground mt-1">
                Soporte continuo
              </p>
            </div>
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
