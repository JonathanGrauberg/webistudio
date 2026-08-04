"use client"
//components\own-product.tsx
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Zap, Lock, Layers } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: Zap,
    title: "Automatización real",
    description: "Presupuestos, seguimiento y estados que se actualizan solos. Lo mismo que le vendemos a cada cliente.",
  },
  {
    icon: Layers,
    title: "Cero código heredado",
    description: "Se reescribe y mejora con cada iteración. Es el laboratorio donde probamos antes de llevarlo a producción de clientes.",
  },
  {
    icon: Lock,
    title: "Uso diario interno",
    description: "No es una demo. Es el sistema que usamos todos los días para gestionar nuestro propio negocio.",
  },
]

const slides = [
  {
    src: "/budgets-dashboard.png",
    label: "Dashboard",
    url: "budgets.webistudio.net/dashboard",
  },
  {
    src: "/budgets-branding.png",
    label: "Branding",
    url: "budgets.webistudio.net/configuracion/branding",
  },
]

export function OwnProduct() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setActiveSlide((i) => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [paused])

  return (
    <section ref={sectionRef} id="budgets" className="own-product-section">
      <style>{`
        .own-product-section {
          background: #000;
          padding: 72px 0;
          overflow: hidden;
          position: relative;
        }

        .own-product-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        .own-product-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 56px;
          align-items: center;
        }

        /* Left column */
        .op-copy {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .op-copy.in { opacity: 1; transform: translateY(0); }

        .op-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1rem;
        }

        .op-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(1.7rem, 2.6vw, 2.25rem);
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 1.1rem 0;
        }

        .op-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .op-subtitle {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255,255,255,0.45);
          margin: 0 0 1.75rem 0;
          max-width: 440px;
        }

        .op-features {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 1.75rem;
        }

        .op-feature {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
        }

        .op-feature-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border: 1px solid rgba(252,193,7,0.25);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fcc107;
        }

        .op-feature-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #fff;
          margin-bottom: 0.2rem;
          letter-spacing: -0.01em;
        }

        .op-feature-desc {
          font-family: 'Satoshi', sans-serif;
          font-weight: 300;
          font-size: 0.8rem;
          line-height: 1.55;
          color: rgba(255,255,255,0.4);
        }

        .op-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Satoshi', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: -0.01em;
          color: #000;
          background: #fcc107;
          padding: 0.8rem 1.5rem;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .op-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(252,193,7,0.25);
        }

        .op-cta svg {
          transition: transform 0.25s ease;
        }
        .op-cta:hover svg {
          transform: translate(2px, -2px);
        }

        /* Right column — browser mockup */
        .op-mockup-wrap {
          position: relative;
          opacity: 0;
          transform: translateY(32px) scale(0.98);
          transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s;
        }
        .op-mockup-wrap.in { opacity: 1; transform: translateY(0) scale(1); }

        .op-glow {
          position: absolute;
          inset: -40px;
          background: radial-gradient(circle at 30% 20%, rgba(252,193,7,0.12), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .op-browser {
          position: relative;
          z-index: 1;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 32px 64px -20px rgba(0,0,0,0.6);
        }

        .op-browser-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.8rem 1rem;
          background: #111;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .op-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
        }

        .op-browser-url {
          flex: 1;
          min-width: 0;
          margin-left: 0.5rem;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          line-height: 1.4;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          animation: op-url-fade 0.5s ease;
        }

        @keyframes op-url-fade {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .op-browser-body {
          position: relative;
          aspect-ratio: 2160 / 1025;
          background: #000;
        }

        .op-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        .op-slide.active {
          opacity: 1;
        }

        .op-live-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(252,193,7,0.3);
          border-radius: 100px;
          padding: 5px 12px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fcc107;
        }

        .op-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fcc107;
          box-shadow: 0 0 0 0 rgba(252,193,7,0.6);
          animation: op-pulse 2s infinite;
        }

        @keyframes op-pulse {
          0% { box-shadow: 0 0 0 0 rgba(252,193,7,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(252,193,7,0); }
          100% { box-shadow: 0 0 0 0 rgba(252,193,7,0); }
        }

        /* Dots pagination */
        .op-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 0.85rem 0 0 0;
        }

        .op-pagination-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.3s ease, width 0.3s ease;
        }

        .op-pagination-dot.active {
          background: #fcc107;
          width: 18px;
          border-radius: 3px;
        }

        @media (max-width: 900px) {
          .own-product-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .op-mockup-wrap { order: -1; }
        }

        @media (max-width: 600px) {
          .own-product-section { padding: 56px 0; }
          .own-product-inner { padding: 0 1.5rem; }
        }
      `}</style>

      <div className="own-product-inner">
        <div className="own-product-grid">
          <div className={`op-copy${visible ? " in" : ""}`}>
            <p className="op-eyebrow">Lo que usamos nosotros</p>
            <h2 className="op-heading">
              Construimos herramientas.<br />
              Empezamos por <em>las nuestras</em>.
            </h2>
            <p className="op-subtitle">
              .budgets es el sistema de presupuestos y gestión que usamos día a día en Webi. No es un mockup del portfolio: es el mismo estándar que le entregamos a cada cliente, corriendo en nuestro propio negocio.
            </p>

            <div className="op-features">
              {features.map((f, i) => (
                <div className="op-feature" key={i}>
                  <div className="op-feature-icon">
                    <f.icon size={15} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="op-feature-title">{f.title}</div>
                    <div className="op-feature-desc">{f.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://budgets.webistudio.net"
              target="_blank"
              rel="noopener noreferrer"
              className="op-cta"
            >
              Probar .budgets
              <ArrowUpRight size={17} strokeWidth={2.5} />
            </a>
          </div>

          <div
            className={`op-mockup-wrap${visible ? " in" : ""}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="op-glow" />
            <div className="op-browser">
              <div className="op-browser-bar">
                <span className="op-dot" />
                <span className="op-dot" />
                <span className="op-dot" />
                <div className="op-browser-url" key={activeSlide}>
                  {slides[activeSlide].url}
                </div>
              </div>
              <div className="op-browser-body">
                <div className="op-live-badge">
                  <span className="op-live-dot" />
                  En producción
                </div>
                {slides.map((s, i) => (
                  <div key={s.src} className={`op-slide${i === activeSlide ? " active" : ""}`}>
                    <Image
                      src={s.src}
                      alt={`.budgets — ${s.label}`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="op-pagination">
              {slides.map((s, i) => (
                <button
                  key={s.url}
                  onClick={() => setActiveSlide(i)}
                  className={`op-pagination-dot${i === activeSlide ? " active" : ""}`}
                  aria-label={`Ver ${s.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}