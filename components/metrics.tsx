"use client"

import { useEffect, useRef, useState } from "react"

const metrics = [
  { value: 6, suffix: "+", label: "Proyectos\nEntregados" },
  { value: 3, suffix: "+", label: "Sistemas\nActivos" },
  { value: 100, suffix: "%", label: "Soluciones\nPersonalizadas" },
  { value: 5, suffix: "+", label: "Clientes\nSatisfechos" },
]

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number
  suffix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )
    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(232,88,12,0.08),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Soluciones Digitales
            </p>
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-primary">SOLUCIONES</span>
              <br />
              DIGITALES
            </h2>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-6 text-muted-foreground text-lg leading-relaxed max-w-lg">
              Con cada proyecto, ponemos foco en resolver problemas reales
              y construir herramientas que generen valor concreto para cada
              empresa.
            </p>
          </div>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 grid grid-cols-2 gap-6">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <p
                  className="text-4xl md:text-5xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    isVisible={isVisible}
                  />
                </p>
                <p className="text-muted-foreground text-sm mt-2 whitespace-pre-line leading-relaxed">
                  {metric.label}
                </p>
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
