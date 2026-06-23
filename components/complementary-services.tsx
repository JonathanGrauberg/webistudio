"use client"
//components\complementary-services.tsx
import { useEffect, useRef, useState } from "react"

const services = [
  {
    index: "01",
    title: "Google Ads & Meta Ads",
    tag: "Pauta digital",
    description:
      "Campañas con objetivos claros y presupuesto controlado. Diseñamos la estrategia, segmentamos la audiencia y optimizamos semana a semana para que cada peso invertido tenga retorno medible.",
    items: ["Search & Display", "Meta / Instagram", "Reportes semanales"],
  },
  {
    index: "02",
    title: "Producción con Drone",
    tag: "Audiovisual",
    description:
      "Tomas aéreas y material audiovisual profesional para proyectos que necesitan diferenciarse visualmente. Ideal para inmuebles, eventos, industria y comunicación de marca.",
    items: ["Tomas aéreas 4K", "Edición incluida", "Entrega rápida"],
  },
]

export function ComplementaryServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="cs-section">
      <style>{`
        .cs-section {
          background: #000;
          padding: 120px 0;
          overflow: hidden;
        }

        .cs-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        .cs-header {
          margin-bottom: 64px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cs-header.in { opacity: 1; transform: translateY(0); }

        .cs-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.2rem;
        }

        .cs-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 1rem;
        }

        .cs-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .cs-sub {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          max-width: 500px;
          margin: 0;
        }

        /* Cards */
        .cs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .cs-card {
          background: #000;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .cs-card.in { opacity: 1; transform: translateY(0); }
        .cs-card:nth-child(1) { transition-delay: 0.1s; }
        .cs-card:nth-child(2) { transition-delay: 0.2s; }

        .cs-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: #fcc107;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .cs-card:hover::before { transform: scaleX(1); }

        /* Número de fondo */
        .cs-card-bg {
          position: absolute;
          bottom: -20px;
          right: -10px;
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 9rem;
          line-height: 1;
          color: rgba(255,255,255,0.025);
          user-select: none;
          pointer-events: none;
          transition: color 0.4s;
        }
        .cs-card:hover .cs-card-bg { color: rgba(252,193,7,0.04); }

        .cs-card-tag {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cs-card-tag::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: #fcc107;
        }

        .cs-card-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 1.6rem;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 1.25rem;
          line-height: 1.1;
        }

        .cs-card-desc {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2rem;
        }

        .cs-card-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cs-card-item {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.2s;
        }
        .cs-card:hover .cs-card-item { color: rgba(255,255,255,0.35); }

        .cs-card-item::before {
          content: '';
          width: 16px;
          height: 1px;
          background: rgba(252,193,7,0.4);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .cs-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .cs-section { padding: 80px 0; }
          .cs-inner { padding: 0 1.5rem; }
          .cs-header { margin-bottom: 40px; }
          .cs-card { padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="cs-inner">
        <div className={`cs-header${visible ? " in" : ""}`}>
          <p className="cs-eyebrow">Servicios complementarios</p>
          <h2 className="cs-heading">
            Más allá del<br /><em>desarrollo</em>
          </h2>
          <p className="cs-sub">
            Servicios opcionales que se suman a cualquier proyecto cuando el cliente necesita más alcance o más impacto visual.
          </p>
        </div>

        <div className="cs-grid">
          {services.map((s, i) => (
            <div key={i} className={`cs-card${visible ? " in" : ""}`}>
              <div className="cs-card-bg">{s.index}</div>
              <div className="cs-card-tag">{s.tag}</div>
              <h3 className="cs-card-title">{s.title}</h3>
              <p className="cs-card-desc">{s.description}</p>
              <div className="cs-card-items">
                {s.items.map((item) => (
                  <span key={item} className="cs-card-item">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}