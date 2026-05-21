"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight, Monitor, Cog, ShoppingCart, Share2 } from "lucide-react"

const services = [
  {
    title: "Sistemas Web a Medida",
    description:
      "Plataformas personalizadas segun los procesos internos de tu empresa. Automatizacion, gestion de datos y control total.",
    icon: Cog,
    highlight: true,
  },
  {
    title: "Desarrollo Web",
    description:
      "Landing pages, paginas institucionales y ecommerce. Sitios modernos, rapidos y optimizados para convertir visitantes en clientes.",
    icon: Monitor,
    highlight: false,
  },
  {
    title: "Ecommerce",
    description:
      "Tiendas online profesionales con catalogo, carrito de compras, pagos integrados y gestion de pedidos.",
    icon: ShoppingCart,
    highlight: false,
  },
  {
    title: "Gestion de Redes Sociales",
    description:
      "Planificacion, creacion de contenido, diseno y publicacion. Mantene tu presencia digital activa y profesional.",
    icon: Share2,
    highlight: false,
  },
]

export function Services() {
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
    <section ref={sectionRef} id="servicios" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Nuestros Servicios
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SERVICIOS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className={`reveal opacity-0 translate-y-8 transition-all duration-700 group relative overflow-hidden rounded-xl border p-6 ${
                service.highlight
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-card"
              } hover:border-primary/40 hover:bg-primary/5 cursor-pointer`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon size={28} className="text-primary" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <h3
                  className={`text-lg font-bold ${
                    service.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
                  {service.title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary shrink-0 mt-1 transition-colors"
                />
              </div>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
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
