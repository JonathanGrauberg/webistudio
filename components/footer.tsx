"use client"

import { Mail } from "lucide-react"

const footerLinks = {
  servicios: [
    { label: "Sistemas Web a Medida", href: "#servicios" },
    { label: "Desarrollo Web", href: "#servicios" },
    { label: "Ecommerce", href: "#servicios" },
    { label: "Gestion de Redes", href: "#planes" },
  ],
  empresa: [
    { label: "Inicio", href: "#inicio" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Equipo", href: "#equipo" },
    { label: "Contacto", href: "#contacto" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <a href="#inicio" className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-foreground">Webi</span>
              <span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              Estudio digital enfocado en desarrollo web y soluciones
              digitales para empresas.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <a
                href="mailto:hola@webi.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                hola@webi.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Recibí novedades sobre desarrollo web y soluciones digitales.
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 transition-all"
                aria-label="Email para newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {'Copyright \u00A9 2026 Webi. Todos los derechos reservados.'}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terminos de Uso
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Politica de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
