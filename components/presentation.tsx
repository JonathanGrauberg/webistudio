"use client"
//components\presentation.tsx
import { useEffect, useRef, useState } from "react"

const capabilities = [
  {
    index: "01",
    title: "Automatización",
    desc: "Eliminamos tareas manuales repetitivas con sistemas que trabajan por vos, 24/7, sin errores ni intervención humana.",
  },
  {
    index: "02",
    title: "Centralización",
    desc: "Toda la información crítica de tu empresa en un solo lugar. Stock, clientes, presupuestos y facturación accesibles en tiempo real.",
  },
  {
    index: "03",
    title: "Optimización",
    desc: "Mejoramos los flujos de trabajo existentes para que tu equipo rinda al máximo con el menor esfuerzo operativo.",
  },
  {
    index: "04",
    title: "Integración",
    desc: "Conectamos tus herramientas actuales — CRM, ERP, APIs externas — en un ecosistema coherente que no requiere doble carga de datos.",
  },
  {
    index: "05",
    title: "Seguridad",
    desc: "Infraestructura con cifrado, backups automáticos y control de accesos por roles. Tus datos protegidos sin que tengas que pensar en eso.",
  },
  {
    index: "06",
    title: "Analítica",
    desc: "Dashboards en tiempo real para visualizar las métricas que importan y tomar decisiones basadas en datos, no en intuición.",
  },
]

export function Presentation() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="nosotros" className="cp-section">
      <style>{`
        .cp-section {
          background: #000;
          padding: 120px 0;
          overflow: hidden;
        }

        .cp-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Layout split */
        .cp-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .cp-split.in { opacity: 1; transform: translateY(0); }

        /* LEFT — sticky */
        .cp-left {
          background: #000;
          padding: 3.5rem 3rem;
          position: sticky;
          top: 80px;
          height: fit-content;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
          align-self: start;
        }

        .cp-left::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #fcc107, transparent);
        }

        .cp-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.2rem;
        }

        .cp-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 2.8vw, 2.8rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 1.25rem;
        }

        .cp-heading s {
          color: rgba(255,255,255,0.18);
          text-decoration-color: rgba(255,255,255,0.12);
        }

        .cp-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .cp-sub {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }

        /* Active indicator */
        .cp-active-display {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 2rem;
        }

        .cp-active-index {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 4.5rem;
          line-height: 1;
          letter-spacing: -0.05em;
          color: rgba(255,255,255,0.05);
          margin-bottom: 0.5rem;
          transition: color 0.4s ease;
        }

        .cp-active-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.6);
          margin-bottom: 0.75rem;
          transition: color 0.3s;
        }

        .cp-active-desc {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.3);
          transition: color 0.3s;
        }

        /* Progress dots */
        .cp-dots {
          display: flex;
          gap: 6px;
          margin-top: 1.5rem;
        }

        .cp-dot {
          width: 20px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          transition: background 0.3s, width 0.3s;
        }

        .cp-dot.on {
          background: #fcc107;
          width: 32px;
        }

        /* RIGHT — rows */
        .cp-right {
          background: #000;
        }

        .cp-row {
          padding: 2rem 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 1.25rem;
          align-items: start;
          cursor: default;
          position: relative;
          transition: background 0.25s ease;
        }

        .cp-row:last-child { border-bottom: none; }

        .cp-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #fcc107;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cp-row.active {
          background: rgba(255,255,255,0.02);
        }

        .cp-row.active::before {
          transform: scaleY(1);
        }

        .cp-row-index {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.15);
          padding-top: 3px;
          transition: color 0.2s;
        }
        .cp-row.active .cp-row-index { color: #fcc107; }

        .cp-row-content { display: flex; flex-direction: column; gap: 0.5rem; }

        .cp-row-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 1.05rem;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.45);
          line-height: 1.2;
          transition: color 0.25s;
        }
        .cp-row.active .cp-row-title { color: #fff; }

        .cp-row-desc {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.82rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0);
          max-height: 0;
          overflow: hidden;
          transition: color 0.3s ease 0.1s, max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cp-row.active .cp-row-desc {
          color: rgba(255,255,255,0.35);
          max-height: 100px;
        }

        @media (max-width: 900px) {
          .cp-split { grid-template-columns: 1fr; }
          .cp-left { position: static; padding: 2.5rem 2rem; }
          .cp-active-display { display: none; }
        }

        @media (max-width: 600px) {
          .cp-section { padding: 80px 0; }
          .cp-inner { padding: 0 1.5rem; }
          .cp-row { padding: 1.5rem; }
        }
      `}</style>

      <div className="cp-inner">
        <div className={`cp-split${visible ? " in" : ""}`}>

          {/* LEFT sticky */}
          <div className="cp-left">
            <div>
              <p className="cp-eyebrow">Cómo trabajamos</p>
              <h2 className="cp-heading">
                <s>un servicio</s><br /><em>una solución</em>
              </h2>
              <p className="cp-sub">
                Cada empresa es un caso distinto. Estas son las capacidades que combinamos para resolver el tuyo.
              </p>
            </div>

            <div className="cp-active-display">
              <div className="cp-active-index">{capabilities[active].index}</div>
              <div className="cp-active-title">{capabilities[active].title}</div>
              <div className="cp-active-desc">{capabilities[active].desc}</div>
              <div className="cp-dots">
                {capabilities.map((_, i) => (
                  <div key={i} className={`cp-dot${i === active ? " on" : ""}`} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT rows */}
          <div className="cp-right">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className={`cp-row${active === i ? " active" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <div className="cp-row-index">{cap.index}</div>
                <div className="cp-row-content">
                  <div className="cp-row-title">{cap.title}</div>
                  <div className="cp-row-desc">{cap.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}