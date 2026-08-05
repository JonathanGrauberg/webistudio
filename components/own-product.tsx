"use client"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, QrCode, Calculator, TrendingUp, Sparkles, FileText, CheckCircle2 } from "lucide-react"
import Image from "next/image"

// Definimos cada Slide con su imagen, documento o pantalla, y su copy correspondiente
const slides = [
  {
    id: "dashboard",
    src: "/budgets-dashboard.png",
    label: "Dashboard Central",
    url: "budgets.webistudio.net/dashboard",
    icon: TrendingUp,
    badge: "Control Total",
    title: "Métricas y ventas en tiempo real",
    description: "Visión clara de presupuestos pendientes, aprobados, facturación mensual y rendimiento comercial sin depender de planillas complejas.",
  },
  {
    id: "Branding",
    src: "/budgets-branding.png",
    label: "Branding",
    url: "budgets.webistudio.net/branding",
    icon: Sparkles,
    badge: "Identidad Visual",
    title: "Tu marca, tu estilo, tu identidad",
    description: "Personaliza tu ecosistema con tu logo y colores. Cada presupuesto, orden de trabajo y remito reflejará la identidad de tu empresa.",
  },
  {
    id: "quote-pdf",
    src: "/docs/presupuesto-pdf.png", // 👈 Captura de un Presupuesto formal emitido
    label: "Presupuesto PDF",
    url: "budgets.webistudio.net/presupuestos/view",
    icon: Calculator,
    badge: "Documento Comercial",
    title: "Presupuestos profesionales en PDF",
    description: "Generación automática de cotizaciones detalladas por m², insumos o unidades, con tu branding, condiciones de pago y listo para enviar por WhatsApp.",
  },
  {
    id: "work-order-qr",
    src: "/docs/orden-de-trabajo.png", // 👈 Captura de la OT con QR / Modo Kiosco
    label: "Orden de Trabajo (OT)",
    url: "budgets.webistudio.net/ot/000004",
    icon: QrCode,
    badge: "Taller & Producción",
    title: "Órdenes de Trabajo inteligentes con QR",
    description: "Tu equipo escanea el QR desde cualquier tablet o celular: ven checklist de tareas, herramientas necesarias, notas por voz y estado de producción.",
  },
  {
    id: "receipt-delivery",
    src: "/docs/remito-recibo.png", // 👈 Captura del Remito / Recibo de cobro
    label: "Remito y Recibo",
    url: "budgets.webistudio.net/remitos/0001",
    icon: FileText,
    badge: "Entrega y Cobranza",
    title: "Remitos de entrega y Recibos oficiales",
    description: "Cierra el circuito registrando entregas de material y pagos parciales o totales. Cero reclamos por entregas o saldos impagos.",
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
    }, 5000) // 5 segundos para dar tiempo a leer el texto
    return () => clearInterval(interval)
  }, [paused])

  const currentSlide = slides[activeSlide]
  const IconComponent = currentSlide.icon

  return (
    <section ref={sectionRef} id="budgets" className="own-product-section">
      <style>{`
        .own-product-section {
          background: #000;
          padding: 80px 0;
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
          grid-template-columns: 0.95fr 1.05fr;
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
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1rem;
          background: rgba(252,193,7,0.08);
          padding: 4px 12px;
          border-radius: 100px;
          border: 1px solid rgba(252,193,7,0.2);
        }

        .op-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(1.8rem, 2.8vw, 2.3rem);
          line-height: 1.12;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 1.25rem 0;
        }

        .op-heading em {
          font-style: normal;
          color: #fcc107;
        }

        /* Slide Dynamic Card Left */
        .op-dynamic-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .op-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.75rem;
        }

        .op-card-icon {
          width: 34px;
          height: 34px;
          background: rgba(252,193,7,0.12);
          border: 1px solid rgba(252,193,7,0.3);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fcc107;
          flex-shrink: 0;
        }

        .op-card-badge {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fcc107;
        }

        .op-card-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 800;
          font-size: 1.15rem;
          color: #fff;
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
        }

        .op-card-desc {
          font-family: 'Satoshi', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.55);
        }

        .op-cta-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
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
          padding: 0.85rem 1.6rem;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .op-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(252,193,7,0.3);
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
          background: radial-gradient(circle at 30% 20%, rgba(252,193,7,0.14), transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .op-browser {
          position: relative;
          z-index: 1;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 32px 64px -20px rgba(0,0,0,0.8);
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
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          transition: opacity 0.8s ease;
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
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
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

        /* Selectores de Slide inferiores */
        /* Selectores de Slide inferiores dinámicos */
        .op-selector-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .op-selector-btn {
          flex: 1 1 calc(25% - 8px); /* Intenta ocupar un cuarto, pero flexibiliza */
          min-width: 110px; /* Evita que las pestañas se hagan diminutas */
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 12px;
          color: rgba(255,255,255,0.4);
          font-family: 'Satoshi', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .op-selector-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .op-selector-btn.active {
          background: rgba(252,193,7,0.12);
          border-color: #fcc107;
          color: #fcc107;
        }

        /* En celulares, permitimos scroll horizontal suave si son muchas pestañas */
        @media (max-width: 600px) {
          .op-selector-list {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
          }
          .op-selector-btn {
            flex: 0 0 auto;
            min-width: max-content;
          }
        }
      `}</style>

      <div className="own-product-inner">
        <div className="own-product-grid">
          {/* Columna Izquierda: Información dinámica */}
          <div className={`op-copy${visible ? " in" : ""}`}>
            <div className="op-eyebrow">
              <Sparkles size={12} /> Ecosistema de Gestión SaaS
            </div>
            <h2 className="op-heading">
              Un flujo operativo <em>unificado</em>.
            </h2>

            {/* Tarjeta dinámica sincronizada con el slide activo */}
            <div className="op-dynamic-card">
              <div className="op-card-header">
                <div className="op-card-icon">
                  <IconComponent size={18} />
                </div>
                <span className="op-card-badge">{currentSlide.badge}</span>
              </div>
              <div className="op-card-title">{currentSlide.title}</div>
              <div className="op-card-desc">{currentSlide.description}</div>
            </div>

            <div className="op-cta-group">
              <a
                href="https://budgets.webistudio.net"
                target="_blank"
                rel="noopener noreferrer"
                className="op-cta"
              >
                Probar .budgets Gratis
                <ArrowUpRight size={17} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Columna Derecha: Mockup con capturas */}
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
                <div className="op-browser-url">
                  {currentSlide.url}
                </div>
              </div>

              <div className="op-browser-body">
                <div className="op-live-badge">
                  {currentSlide.label}
                </div>

                {slides.map((s, i) => (
                  <div key={s.id} className={`op-slide${i === activeSlide ? " active" : ""}`}>
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

            {/* Botones selectores directos abajo de la pantalla */}
            <div className="op-selector-list">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(i)}
                  className={`op-selector-btn${i === activeSlide ? " active" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}