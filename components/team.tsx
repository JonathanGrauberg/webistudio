"use client"
//components\team.tsx
import { useEffect, useRef, useState } from "react"

const team = [
  {
    initials: "DC",
    name: "Director Creativo",
    role: "Estrategia Digital",
    description: "Visión de negocio convertida en arquitectura digital. Define la dirección de cada proyecto desde la primera reunión hasta el deploy.",
    skills: ["Arquitectura", "Producto", "Estrategia"],
  },
  {
    initials: "UX",
    name: "Diseñadora UX/UI",
    role: "Interfaces & Experiencia",
    description: "Cada pantalla tiene un por qué. Diseña flujos que las personas entienden sin manual y que las empresas pueden sostener en el tiempo.",
    skills: ["Figma", "Design System", "Prototipado"],
  },
  {
    initials: "ED",
    name: "Especialista Digital",
    role: "Marketing & Redes",
    description: "Conecta lo que construimos con las personas que lo necesitan. Estrategia de contenido, campañas y presencia que genera tracción real.",
    skills: ["SEO", "Campañas", "Contenido"],
  },
]

export function Team() {
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
    <section ref={sectionRef} id="equipo" className="team-section">
      <style>{`
        .team-section {
          background: #000;
          padding: 120px 0;
          overflow: hidden;
        }

        .team-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Header */
        .team-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .team-header.in { opacity: 1; transform: translateY(0); }

        .team-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.2rem;
        }

        .team-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
        }

        .team-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .team-subtitle {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          margin: 0;
          align-self: end;
        }

        /* Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .team-card {
          background: #000;
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          cursor: default;
        }

        .team-card.in { opacity: 1; transform: translateY(0); }
        .team-card:nth-child(1) { transition-delay: 0.1s; }
        .team-card:nth-child(2) { transition-delay: 0.2s; }
        .team-card:nth-child(3) { transition-delay: 0.3s; }

        /* Línea amarilla top al hover */
        .team-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: #fcc107;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .team-card:hover::before { transform: scaleX(1); }

        /* Initials grande de fondo */
        .team-card-bg {
          position: absolute;
          top: -10px;
          right: -10px;
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 7rem;
          line-height: 1;
          color: rgba(255,255,255,0.03);
          letter-spacing: -0.05em;
          user-select: none;
          pointer-events: none;
          transition: color 0.4s ease;
        }
        .team-card:hover .team-card-bg {
          color: rgba(252,193,7,0.05);
        }

        .team-card-number {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          margin-bottom: 2rem;
        }

        .team-card-initials {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 2rem;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 0.25rem;
          line-height: 1;
        }

        .team-card-role {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.5rem;
        }

        .team-card-name {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .team-card-desc {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.4);
          margin-bottom: 2rem;
        }

        .team-card-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .team-skill {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 3px 10px;
          transition: color 0.2s, border-color 0.2s;
        }

        .team-card:hover .team-skill {
          color: rgba(252,193,7,0.6);
          border-color: rgba(252,193,7,0.2);
        }

        @media (max-width: 900px) {
          .team-header { grid-template-columns: 1fr; gap: 16px; }
          .team-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .team-section { padding: 80px 0; }
          .team-inner { padding: 0 1.5rem; }
          .team-header { margin-bottom: 48px; }
        }
      `}</style>

      <div className="team-inner">
        <div className={`team-header${visible ? " in" : ""}`}>
          <div>
            <p className="team-eyebrow">Nuestro equipo</p>
            <h2 className="team-heading">
              Las personas<br />detrás del <em>código</em>
            </h2>
          </div>
          <p className="team-subtitle">
            Tres roles, un solo objetivo: que lo que construimos funcione y escale. Sin intermediarios, sin agencias de por medio.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <div
              key={i}
              className={`team-card${visible ? " in" : ""}`}
            >
              <div className="team-card-bg">{member.initials}</div>
              <div className="team-card-number">0{i + 1}</div>
              <div className="team-card-initials">{member.initials}</div>
              <div className="team-card-role">{member.role}</div>
              <div className="team-card-name">{member.name}</div>
              <p className="team-card-desc">{member.description}</p>
              <div className="team-card-skills">
                {member.skills.map((s) => (
                  <span key={s} className="team-skill">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}