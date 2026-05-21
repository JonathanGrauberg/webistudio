"use client"

import { useEffect, useRef } from "react"
import { Mail, ArrowRight } from "lucide-react"

export function Contact() {
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
    <section ref={sectionRef} id="contacto" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 text-primary text-sm font-medium tracking-widest uppercase mb-4">
              Contacto
            </p>
            <h2
              className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Empecemos tu{" "}
              <span className="text-primary">proyecto</span>
            </h2>
            <p className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-6 text-muted-foreground text-lg leading-relaxed max-w-lg">
              Contanos sobre tu empresa y lo que necesitas. Evaluamos cada
              proyecto de forma personalizada para ofrecerte la mejor
              solucion.
            </p>
            <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-8 flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <a href="mailto:hola@webi.com" className="text-muted-foreground hover:text-primary transition-colors">
                hola@webi.com
              </a>
            </div>
          </div>

          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <form
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium text-foreground mb-2 block">
                  Empresa
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label htmlFor="service" className="text-sm font-medium text-foreground mb-2 block">
                  Servicio de interes
                </label>
                <select
                  id="service"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona un servicio</option>
                  <option value="sistemas">Sistemas Web a Medida</option>
                  <option value="web">Desarrollo Web</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="redes">Gestion de Redes Sociales</option>
                  <option value="ads">Google Ads / Meta Ads</option>
                  <option value="audiovisual">Produccion Audiovisual</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Contanos sobre tu proyecto..."
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-medium rounded-lg hover:bg-primary/90 transition-all duration-200"
              >
                Enviar Mensaje
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>
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
