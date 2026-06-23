"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const tabs = [
  {
    id: "automatizacion",
    label: "Automatización",
    stat: "−80%",
    statLabel: "tareas manuales",
    content:
      "Diseñamos sistemas que eliminan procesos repetitivos y reducen errores operativos. Tu equipo deja de perder tiempo en lo mecánico y se enfoca en lo que genera valor real.",
  },
  {
    id: "centralizacion",
    label: "Centralización",
    stat: "1 lugar",
    statLabel: "toda tu operación",
    content:
      "Stock, clientes, presupuestos, facturación — todo en una sola plataforma. Sin Excel cruzados, sin información duplicada, sin depender de personas clave para saber qué pasa.",
  },
]

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState("automatizacion")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const active = tabs.find((t) => t.id === activeTab)!

  return (
    <section ref={sectionRef} className="vp-section">
      <style>{`
        .vp-section {
          background: #000;
          padding: 120px 0;
          overflow: hidden;
        }

        .vp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* LEFT */
        .vp-left {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .vp-left.in { opacity: 1; transform: translateX(0); }

        .vp-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.5rem;
        }

        .vp-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 2.5rem;
        }

        .vp-heading em {
          font-style: normal;
          color: #fcc107;
        }

        /* Tabs */
        .vp-tabs {
          display: flex;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          overflow: hidden;
          width: fit-content;
          margin-bottom: 2rem;
        }

        .vp-tab {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.6rem 1.4rem;
          background: transparent;
          color: rgba(255,255,255,0.35);
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .vp-tab:first-child {
          border-right: 1px solid rgba(255,255,255,0.1);
        }

        .vp-tab.active {
          background: #fcc107;
          color: #000;
          font-weight: 700;
        }

        .vp-body {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.5);
          margin-bottom: 2.5rem;
          min-height: 80px;
        }

        .vp-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          transition: gap 0.2s;
        }
        .vp-cta:hover { gap: 14px; color: #fcc107; }
        .vp-cta svg { transition: transform 0.2s; }
        .vp-cta:hover svg { transform: translateX(3px); }

        /* RIGHT */
        .vp-right {
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .vp-right.in { opacity: 1; transform: translateX(0); }

        .vp-stat-block {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .vp-stat-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #fcc107, transparent);
        }

        .vp-stat-number {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(4rem, 8vw, 7rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .vp-stat-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 3rem;
        }

        .vp-divider {
          width: 32px;
          height: 1px;
          background: #fcc107;
          margin-bottom: 3rem;
        }

        .vp-metrics {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .vp-metric-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .vp-metric-bar-wrap {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }

        .vp-metric-fill {
          position: absolute;
          left: 0; top: 0; height: 100%;
          background: #fcc107;
          transition: width 1s ease 0.5s;
        }

        .vp-metric-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          min-width: 90px;
          text-align: right;
        }

        @media (max-width: 900px) {
          .vp-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .vp-right { transition-delay: 0s; }
        }

        @media (max-width: 600px) {
          .vp-section { padding: 80px 0; }
          .vp-inner { padding: 0 1.5rem; }
        }
      `}</style>

      <div className="vp-inner">
        {/* LEFT */}
        <div className={`vp-left${visible ? " in" : ""}`}>
          <p className="vp-eyebrow">Propuesta de valor</p>
          <h2 className="vp-heading">
            Sistemas que hacen<br />
            el trabajo <em>por vos</em>
          </h2>

          <div className="vp-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`vp-tab${activeTab === tab.id ? " active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="vp-body">{active.content}</p>

          <a href="#contacto" className="vp-cta">
            Hablemos <ArrowRight size={14} />
          </a>
        </div>

        {/* RIGHT */}
        <div className={`vp-right${visible ? " in" : ""}`}>
          <div className="vp-stat-block">
            <div className="vp-stat-number">{active.stat}</div>
            <div className="vp-stat-label">{active.statLabel}</div>
            <div className="vp-divider" />
            <div className="vp-metrics">
              {[
                { label: "Tiempo operativo", pct: visible ? "72%" : "0%" },
                { label: "Errores manuales", pct: visible ? "91%" : "0%" },
                { label: "Visibilidad del negocio", pct: visible ? "85%" : "0%" },
              ].map((m) => (
                <div key={m.label} className="vp-metric-row">
                  <div className="vp-metric-bar-wrap">
                    <div className="vp-metric-fill" style={{ width: m.pct }} />
                  </div>
                  <span className="vp-metric-text">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}