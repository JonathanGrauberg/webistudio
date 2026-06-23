"use client"
//components\metrics.tsx
import { useEffect, useRef, useState } from "react"

const metrics = [
  { value: 13,   suffix: "+", label: "Proyectos entregados" },
  { value: 7,   suffix: "+", label: "Sistemas activos" },
  { value: 100, suffix: "%", label: "Soluciones personalizadas" },
  { value: 20,   suffix: "+", label: "Clientes satisfechos" },
]

function AnimatedCounter({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const increment = target / (2000 / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, target])
  return <span>{count}{suffix}</span>
}

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null)
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
    <section ref={sectionRef} className="metrics-section">
      <style>{`
        .metrics-section {
          background: #000;
          padding: 120px 0;
          overflow: hidden;
        }

        .metrics-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Header */
        .metrics-header {
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .metrics-header.in { opacity: 1; transform: translateY(0); }

        .metrics-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.2rem;
        }

        .metrics-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0 0 1.5rem;
        }

        .metrics-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .metrics-sub {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          max-width: 480px;
          margin: 0;
        }

        /* Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .metrics-card {
          background: #000;
          padding: 2.5rem 2rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .metrics-card.in { opacity: 1; transform: translateY(0); }
        .metrics-card:nth-child(1) { transition-delay: 0.05s; }
        .metrics-card:nth-child(2) { transition-delay: 0.12s; }
        .metrics-card:nth-child(3) { transition-delay: 0.19s; }
        .metrics-card:nth-child(4) { transition-delay: 0.26s; }

        .metrics-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: #fcc107;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .metrics-card:hover::before { transform: scaleX(1); }

        .metrics-card-num {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(3rem, 5vw, 4.5rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }
        .metrics-card:hover .metrics-card-num { color: #fcc107; }

        .metrics-card-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .metrics-section { padding: 80px 0; }
          .metrics-inner { padding: 0 1.5rem; }
          .metrics-header { margin-bottom: 48px; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="metrics-inner">
        <div className={`metrics-header${visible ? " in" : ""}`}>
          <p className="metrics-eyebrow">En números</p>
          <h2 className="metrics-heading">
            Resultados<br />que <em>hablan</em>
          </h2>
          <p className="metrics-sub">
            Cada número representa un problema resuelto y una empresa que opera mejor de lo que operaba antes.
          </p>
        </div>

        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={i} className={`metrics-card${visible ? " in" : ""}`}>
              <div className="metrics-card-num">
                <AnimatedCounter target={m.value} suffix={m.suffix} isVisible={visible} />
              </div>
              <div className="metrics-card-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}