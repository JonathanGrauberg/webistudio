"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Webi. nos desarrollo un sistema de gestion que transformo por completo nuestra operativa diaria. Ahora tenemos todo centralizado y accesible desde cualquier dispositivo.",
    author: "Centro Medico",
    role: "Cliente de Webi.",
  },
  {
    quote:
      "El sistema de stock que nos crearon nos permitio automatizar procesos que antes hacíamos a mano. La eficiencia del equipo mejoro notablemente.",
    author: "OICSA",
    role: "Cliente de Webi.",
  },
  {
    quote:
      "Necesitabamos una plataforma de presupuestacion a medida y Webi. entendio exactamente lo que buscabamos. El resultado supero nuestras expectativas.",
    author: "Ecoservicios",
    role: "Cliente de Webi.",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)

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

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Testimonios
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              LO QUE DICEN
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
              aria-label="Testimonio siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 grid md:grid-cols-2 gap-6">
          {[current, (current + 1) % testimonials.length].map((idx, i) => (
            <div
              key={`${idx}-${i}`}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <Quote size={32} className="text-primary mb-6" />
              <p className="text-foreground text-lg leading-relaxed mb-8">
                {`"${testimonials[idx].quote}"`}
              </p>
              <div>
                <p className="font-bold text-foreground">
                  {testimonials[idx].author}
                </p>
                <p className="text-primary text-sm mt-1">
                  {testimonials[idx].role}
                </p>
              </div>
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
