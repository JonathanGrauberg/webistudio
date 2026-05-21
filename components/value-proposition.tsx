"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, BarChart3, Lock, Zap } from "lucide-react"

const tabs = [
  {
    id: "automatizacion",
    label: "Automatizacion",
    icon: Zap,
    content:
      "Desarrollamos sistemas que eliminan procesos manuales, reducen errores y permiten que tu equipo se enfoque en lo que realmente importa. Cada solucion se disena segun la operatoria real de tu empresa.",
  },
  {
    id: "centralizacion",
    label: "Centralizacion",
    icon: Lock,
    content:
      "Creamos plataformas que centralizan toda la informacion critica de tu negocio en un solo lugar. Stock, clientes, presupuestos, facturacion: todo accesible, organizado y en tiempo real.",
  },
]

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState("automatizacion")

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

  const activeTabData = tabs.find((t) => t.id === activeTab)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual panel */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 relative aspect-[4/3] rounded-xl overflow-hidden bg-card border border-border">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(232,88,12,0.1),transparent)]" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 p-8">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
                {activeTabData && <activeTabData.icon size={48} className="text-primary" />}
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-2 rounded-full bg-primary/40" />
                  <div className="w-12 h-2 rounded-full bg-primary/20" />
                  <div className="w-20 h-2 rounded-full bg-primary/30" />
                </div>
                <BarChart3 size={48} className="text-primary/30" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-2 rounded-full bg-primary/20" />
                  <div className="w-16 h-2 rounded-full bg-primary/40" />
                  <div className="w-12 h-2 rounded-full bg-primary/30" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Propuesta de Valor
            </p>
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl font-bold leading-tight text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Impulsamos el crecimiento digital de tu negocio
            </h2>

            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-8 flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground bg-card border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-6 text-muted-foreground leading-relaxed text-lg">
              {activeTabData?.content}
            </p>

            <a
              href="#contacto"
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-[400ms] mt-8 group inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
            >
              Conocer mas
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
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
