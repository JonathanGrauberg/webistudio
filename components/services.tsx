"use client"
//components\services.tsx
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Monitor, Cog, ShoppingCart, Share2 } from "lucide-react"

const services = [
  {
    index: "01",
    title: "Sistemas Web a Medida",
    tag: "Core",
    description:
      "Plataformas diseñadas desde cero según los procesos reales de tu empresa. Sin templates, sin compromisos. Automatización, gestión de datos y control total en una sola herramienta.",
    items: ["Panel de administración", "Roles y permisos", "Integración con APIs"],
    icon: Cog,
    featured: true,
  },
  {
    index: "02",
    title: "Desarrollo Web",
    tag: "Presencia",
    description:
      "Sitios modernos, rápidos y optimizados para convertir visitas en consultas. Desde una landing page hasta un sitio institucional completo.",
    items: ["Landing pages", "SEO técnico", "Mobile first"],
    icon: Monitor,
    featured: false,
  },
  {
    index: "03",
    title: "Ecommerce",
    tag: "Ventas",
    description:
      "Tiendas online con catálogo, carrito, pagos integrados y gestión de pedidos. Todo lo que necesitás para vender sin fricciones.",
    items: ["Pagos integrados", "Gestión de stock", "Panel de pedidos"],
    icon: ShoppingCart,
    featured: false,
  },
  {
    index: "04",
    title: "Gestión de Redes",
    tag: "Presencia",
    description:
      "Contenido planificado, diseñado y publicado. Presencia digital consistente que construye marca semana a semana.",
    items: ["Estrategia de contenido", "Diseño de piezas", "Reporte mensual"],
    icon: Share2,
    featured: false,
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="sv-section">
      <style>{`
        .sv-section {
          background: #000;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .sv-section::before {
          content: '';
          position: absolute;
          top: -120px; left: 0;
          width: 100%; height: 120px;
          background: linear-gradient(to bottom, transparent, #000);
          pointer-events: none;
        }

        .sv-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Header */
        .sv-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
          margin-bottom: 72px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sv-header.in { opacity: 1; transform: translateY(0); }

        .sv-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.2rem;
        }

        .sv-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
        }

        .sv-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .sv-header-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .sv-sub {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }

        .sv-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.7rem 1.4rem;
          transition: all 0.2s;
        }
        .sv-cta:hover {
          border-color: #fcc107;
          color: #fcc107;
          gap: 14px;
        }

        /* Featured + grid */
        .sv-featured {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
          margin-bottom: 1px;
          background: rgba(255,255,255,0.07);
        }
        .sv-featured.in { opacity: 1; transform: translateY(0); }

        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .sv-grid.in { opacity: 1; transform: translateY(0); }

        /* Card base */
        .sv-card {
          background: #000;
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: background 0.3s ease;
        }
        .sv-card:hover { background: #0a0a0a; }

        .sv-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: #fcc107;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .sv-card:hover::before { transform: scaleX(1); }

        /* Featured card */
        .sv-card-featured {
          background: #000;
          padding: 3rem 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .sv-card-featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #fcc107, transparent);
        }

        .sv-card-featured-bg {
          position: absolute;
          bottom: -20px; right: -10px;
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 10rem;
          line-height: 1;
          color: rgba(252,193,7,0.03);
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.05em;
        }

        .sv-card-bg {
          position: absolute;
          bottom: -10px; right: -5px;
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 7rem;
          line-height: 1;
          color: rgba(255,255,255,0.025);
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.05em;
          transition: color 0.4s;
        }
        .sv-card:hover .sv-card-bg { color: rgba(252,193,7,0.04); }

        .sv-tag {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sv-tag::before {
          content: '';
          display: inline-block;
          width: 16px; height: 1px;
          background: #fcc107;
        }

        .sv-card-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 1.4rem;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .sv-card-featured .sv-card-title {
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          margin-bottom: 1.25rem;
        }

        .sv-card-desc {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1.75rem;
        }

        .sv-card-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sv-card-item {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.2s;
        }
        .sv-card:hover .sv-card-item,
        .sv-card-featured:hover .sv-card-item { color: rgba(255,255,255,0.4); }

        .sv-card-item::before {
          content: '';
          width: 14px; height: 1px;
          background: rgba(252,193,7,0.4);
          flex-shrink: 0;
        }

        .sv-card-index {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.15);
          margin-bottom: 1.75rem;
        }

        /* Featured right panel — CTA visual */
        .sv-featured-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: flex-start;
        }

        .sv-featured-stat {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 1.5rem;
          width: 100%;
        }

        .sv-featured-stat-num {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 3rem;
          letter-spacing: -0.04em;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.25rem;
        }

        .sv-featured-stat-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .sv-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fcc107;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .sv-link:hover { gap: 14px; }

        @media (max-width: 900px) {
          .sv-header { grid-template-columns: 1fr; gap: 20px; }
          .sv-grid { grid-template-columns: 1fr; }
          .sv-card-featured { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 600px) {
          .sv-section { padding: 80px 0; }
          .sv-inner { padding: 0 1.5rem; }
          .sv-header { margin-bottom: 48px; }
        }
      `}</style>

      <div className="sv-inner">
        {/* Header */}
        <div className={`sv-header${visible ? " in" : ""}`}>
          <div>
            <p className="sv-eyebrow">Nuestros servicios</p>
            <h2 className="sv-heading">
              Lo que<br />construimos <em>para vos</em>
            </h2>
          </div>
          <div className="sv-header-right">
            <p className="sv-sub">
              Cada servicio está pensado para resolver un problema concreto. Sin paquetes genéricos — solo lo que tu negocio necesita.
            </p>
            <a href="#contacto" className="sv-cta">
              Hablar con un especialista <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Featured */}
        <div className={`sv-featured${visible ? " in" : ""}`}>
          <div className="sv-card-featured">
            <div className="sv-card-featured-bg">01</div>
            <div>
              <div className="sv-tag">Core</div>
              <h3 className="sv-card-title">Sistemas Web<br />a Medida</h3>
              <p className="sv-card-desc">
                Plataformas diseñadas desde cero según los procesos reales de tu empresa. Sin templates, sin compromisos. Automatización, gestión de datos y control total en una sola herramienta.
              </p>
              <div className="sv-card-items">
                {["Panel de administración", "Roles y permisos", "Integración con APIs"].map(item => (
                  <span key={item} className="sv-card-item">{item}</span>
                ))}
              </div>
            </div>
            <div className="sv-featured-right">
              <div className="sv-featured-stat">
                <div className="sv-featured-stat-num">100%</div>
                <div className="sv-featured-stat-label">Soluciones personalizadas</div>
              </div>
              <div className="sv-featured-stat">
                <div className="sv-featured-stat-num">−80%</div>
                <div className="sv-featured-stat-label">Tareas manuales eliminadas</div>
              </div>
              <a href="#contacto" className="sv-link">
                Empezar un proyecto <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Grid 3 servicios */}
        <div className={`sv-grid${visible ? " in" : ""}`}>
          {services.slice(1).map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="sv-card">
                <div className="sv-card-bg">{s.index}</div>
                <div className="sv-card-index">{s.index}</div>
                <div className="sv-tag">{s.tag}</div>
                <h3 className="sv-card-title">{s.title}</h3>
                <p className="sv-card-desc">{s.description}</p>
                <div className="sv-card-items">
                  {s.items.map(item => (
                    <span key={item} className="sv-card-item">{item}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}