"use client"

import { useEffect, useRef, useState } from "react"
import { Cog, Database, Zap, Network, Shield, BarChart3 } from "lucide-react"

const cards = [
  {
    icon: Cog,
    title: "Automatización",
    subtitle: "Procesos inteligentes",
    desc: "Eliminamos tareas manuales repetitivas con sistemas que trabajan por vos, 24/7, sin errores.",
    gradient: "linear-gradient(180deg, rgba(30,30,30,0.2) 0%, rgba(252,193,7,0.05) 100%)",
  },
  {
    icon: Database,
    title: "Centralización",
    subtitle: "Un solo lugar",
    desc: "Toda la información de tu empresa accesible desde una plataforma unificada y segura.",
    gradient: "linear-gradient(180deg, rgba(30,30,30,0.2) 0%, rgba(59,130,246,0.05) 100%)",
  },
  {
    icon: Zap,
    title: "Optimización",
    subtitle: "Máxima eficiencia",
    desc: "Mejoramos flujos de trabajo para que tu equipo rinda al máximo con el mínimo esfuerzo.",
    gradient: "linear-gradient(180deg, rgba(30,30,30,0.2) 0%, rgba(252,193,7,0.05) 100%)",
  },
  {
    icon: Network,
    title: "Integración",
    subtitle: "Todo conectado",
    desc: "Conectamos tus herramientas existentes: CRM, ERP, APIs y servicios externos en un ecosistema coherente.",
    gradient: "linear-gradient(180deg, rgba(30,30,30,0.2) 0%, rgba(168,85,247,0.05) 100%)",
  },
  {
    icon: Shield,
    title: "Seguridad",
    subtitle: "Datos protegidos",
    desc: "Infraestructura robusta con cifrado, backups automáticos y control de accesos por roles.",
    gradient: "linear-gradient(180deg, rgba(30,30,30,0.2) 0%, rgba(34,197,94,0.05) 100%)",
  },
  {
    icon: BarChart3,
    title: "Analítica",
    subtitle: "Decisiones con datos",
    desc: "Dashboards en tiempo real para visualizar métricas clave y tomar decisiones informadas.",
    gradient: "linear-gradient(180deg, rgba(30,30,30,0.2) 0%, rgba(239,68,68,0.05) 100%)",
  },
]

export function Presentation() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .pres-section {
          position: relative;
          padding: 7rem 2rem 9rem;
          background: #000000;
          overflow: hidden;
          font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
        }

        .pres-header {
          text-align: center;
          margin-bottom: 5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pres-header.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pres-title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin: 0;
        }

        .pres-title span {
          color: rgba(255,255,255,0.25);
          text-decoration: line-through;
          margin-right: 0.3em;
        }

        .pres-sub {
          font-size: 0.95rem;
          color: #666666;
          max-width: 480px;
          margin: 1.2rem auto 0;
          line-height: 1.6;
        }

        /* Contenedor del grupo de columnas alineado y centrado */
        .pres-container {
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .pres-track {
          display: flex;
          align-items: stretch;
          gap: 12px;
          height: 540px; /* Proporción estilizada de Fey */
          width: max-content;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
        }

        .pres-track.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Tarjeta Base - Look semi-transparente oscuro de Fey */
        .pres-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          background: linear-gradient(180deg, rgba(20,20,20,0.5) 0%, rgba(12,12,12,0.7) 100%);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          cursor: pointer;
          overflow: hidden;
          width: 90px; 
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.5s ease;
          will-change: width;
        }

        /* Ajuste de anchos cuando hay foco */
        .pres-track.has-active .pres-card:not(.active) {
          width: 72px;
          border-color: rgba(255,255,255,0.02);
        }

        /* Tarjeta Expandida idéntica al bloque central de Fey */
        .pres-card.active {
          width: 460px;
          border-color: rgba(255, 255, 255, 0.12);
          background: rgba(20, 20, 20, 0.8);
          box-shadow: 0 40px 80px -15px rgba(0,0,0,0.9);
        }

        /* Modo de escritura vertical nativo de CSS: Centrado horizontal perfecto sin bugs */
        .card-vertical-wrapper {
          position: absolute;
          top: 45px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .card-vertical {
          writing-mode: vertical-lr; /* Lectura premium de arriba a abajo */
          white-space: nowrap;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.75);
          transition: color 0.3s ease;
        }

        .pres-card:hover .card-vertical {
          color: #ffffff;
        }

        /* Atenúa las otras tarjetas colapsadas si hay una activa */
        .pres-track.has-active .pres-card:not(.active) .card-vertical {
          color: rgba(255,255,255,0.3);
        }

        .pres-card.active .card-vertical-wrapper {
          opacity: 0;
        }

        /* Mini icono en la base de la tarjeta colapsada */
        .card-collapsed-icon {
          position: absolute;
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.3);
          transition: opacity 0.2s ease, color 0.3s ease;
        }

        .pres-track.has-active .pres-card:not(.active) .card-collapsed-icon {
          color: rgba(255, 255, 255, 0.15);
        }

        .pres-card.active .card-collapsed-icon {
          opacity: 0;
        }

        /* Contenido de la ventana expandida */
        .card-content {
          position: absolute;
          inset: 0;
          padding: 3.5rem 3rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }

        .pres-card.active .card-content {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 0.4s ease 0.25s;
        }

        /* Título arriba en la tarjeta abierta */
        .card-title-top {
          font-size: 1.15rem;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        /* Bloque inferior de texto */
        .card-body-bottom {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-desc {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.6;
          margin: 0;
          max-width: 95%;
        }

        /* Trigger de acción inferior estilo Fey (Preview financials) */
        .card-action-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #ffffff;
          opacity: 0.85;
          transition: opacity 0.2s ease;
        }

        .card-action-trigger:hover {
          opacity: 1;
        }

        /* Adaptación Responsive Mobile */
        @media (max-width: 900px) {
          .pres-container { padding: 0 1rem; }
          .pres-track {
            flex-direction: column;
            height: auto;
            width: 100%;
            gap: 12px;
          }

          .pres-card {
            width: 100% !important;
            height: 72px;
          }

          .pres-card.active {
            height: 280px;
          }

          .card-vertical-wrapper {
            top: 50%;
            left: 2rem;
            right: auto;
            transform: translateY(-50%);
          }

          .card-vertical {
            writing-mode: horizontal-tb;
          }

          .card-collapsed-icon {
            right: 2rem;
            left: auto;
            top: 50%;
            bottom: auto;
            transform: translateY(-50%);
          }

          .card-content { padding: 2rem; }
        }
      `}</style>

      <section ref={sectionRef} className="pres-section" id="nosotros">
        {/* Header */}
        <div className={`pres-header${visible ? " visible" : ""}`}>
          <h2 className="pres-title">
            <span>One</span> Clientes
          </h2>
          <p className="pres-sub">
            Construimos plataformas que transforman la forma en que tu empresa opera y crece.
          </p>
        </div>

        {/* Track de tarjetas interactivo */}
        <div className="pres-container">
          <div 
            className={`pres-track${visible ? " visible" : ""}${active !== null ? " has-active" : ""}`}
            onMouseLeave={() => setActive(null)}
          >
            {cards.map((card, i) => {
              const Icon = card.icon
              const isActive = active === i

              return (
                <div
                  key={i}
                  className={`pres-card${isActive ? " active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  style={{
                    background: isActive ? card.gradient : undefined
                  }}
                >
                  {/* Icono en la base (colapsado) */}
                  <div className="card-collapsed-icon">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>

                  {/* Wrapper del texto vertical (colapsado) */}
                  <div className="card-vertical-wrapper">
                    <div className="card-vertical">{card.title}</div>
                  </div>

                  {/* Contenido Completo (Expandido) */}
                  <div className="card-content">
                    {/* Título superior */}
                    <div className="card-title-top">
                      {card.title}
                    </div>
                    
                    {/* Descripción y Trigger abajo */}
                    <div className="card-body-bottom">
                      <p className="card-desc">{card.desc}</p>
                      <div className="card-action-trigger">
                        <Icon size={15} strokeWidth={2} />
                        <span>{card.subtitle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}