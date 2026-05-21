"use client"

import { useEffect, useRef } from "react"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Plan Esencial",
    price: "80",
    description: "Ideal para mantener presencia activa en redes con contenido profesional.",
    features: [
      "2 publicaciones semanales",
      "3 historias semanales",
      "Copys profesionales",
      "Adaptacion visual",
      "Programacion y publicacion",
    ],
    highlight: false,
  },
  {
    name: "Plan Creacion",
    price: "110",
    description: "Para marcas que necesitan contenido original y planificacion estrategica.",
    features: [
      "2 a 3 publicaciones semanales",
      "3 a 4 historias semanales",
      "Diseño de piezas graficas",
      "Carruseles y reels basicos",
      "Planificacion mensual",
      "Creacion de contenido",
    ],
    highlight: true,
  },
  {
    name: "Plan Intensivo",
    price: "200",
    description: "Gestion completa y estrategica para marcas que buscan crecimiento real.",
    features: [
      "4 a 5 publicaciones semanales",
      "Historias frecuentes",
      "Carruseles y reels editados",
      "Optimizacion de perfil",
      "Planificacion estrategica",
      "Contenido premium",
    ],
    highlight: false,
  },
]

export function Plans() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in")
        })
      },
      { threshold: 0.05 }
    )
    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="planes" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Gestion de Redes Sociales
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            PLANES
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed text-lg">
            Elegí el plan que mejor se adapte a tu marca. Los valores pueden
            ajustarse segun necesidades especificas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal opacity-0 translate-y-8 transition-all duration-700 group relative rounded-2xl p-8 ${
                plan.highlight
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-border bg-card"
              } hover:border-primary/60 transition-all duration-300`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Star size={12} />
                  Recomendado
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">USD</span>
                <span
                  className="text-5xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">/mes</span>
              </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contacto"
                className={`mt-8 w-full inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary border border-border text-foreground hover:bg-primary/10 hover:border-primary/40"
                }`}
              >
                Solicitar Plan
              </a>
            </div>
          ))}
        </div>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-500 mt-12 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Tambien disponible como adicional: landing page optimizada e
            integracion con campañas publicitarias.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-medium rounded-lg hover:bg-primary/90 transition-all duration-200"
          >
            Solicitar Plan Premium
          </a>
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
