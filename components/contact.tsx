"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contacto" className="ct-section">
      <style>{`
        .ct-section {
          background: #000;
          padding: 120px 0;
          overflow: hidden;
        }

        .ct-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2.5rem;
        }

        /* Header */
        .ct-header {
          margin-bottom: 72px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ct-header.in { opacity: 1; transform: translateY(0); }

        .ct-eyebrow {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #fcc107;
          margin-bottom: 1.2rem;
        }

        .ct-heading {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #fff;
          margin: 0 0 1.5rem;
        }

        .ct-heading em {
          font-style: normal;
          color: #fcc107;
        }

        .ct-sub {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          max-width: 480px;
          margin: 0;
        }

        /* Layout */
        .ct-body {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .ct-body.in { opacity: 1; transform: translateY(0); }

        /* Left panel */
        .ct-left {
          background: #000;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .ct-left::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #fcc107, transparent);
        }

        .ct-left-bg {
          position: absolute;
          bottom: -20px; right: -10px;
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: 9rem;
          line-height: 1;
          color: rgba(252,193,7,0.03);
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.05em;
        }

        .ct-info-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 0.4rem;
        }

        .ct-info-value {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        a.ct-info-value:hover { color: #fcc107; }

        .ct-info-block {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .ct-promise {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 2rem;
        }

        .ct-promise-text {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.25);
        }

        .ct-promise-text strong {
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        /* Right panel — form */
        .ct-right {
          background: #000;
          padding: 3rem 2.5rem;
          position: relative;
        }

        .ct-right::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        /* Form fields */
        .ct-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 1px;
        }

        .ct-field {
          background: #000;
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: background 0.2s;
        }
        .ct-field:focus-within { background: #0a0a0a; }

        .ct-field-full {
          background: #000;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1px;
          transition: background 0.2s;
        }
        .ct-field-full:focus-within { background: #0a0a0a; }

        .ct-label {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .ct-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: #fff;
          width: 100%;
        }
        .ct-input::placeholder { color: rgba(255,255,255,0.15); }

        .ct-select {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: #fff;
          width: 100%;
          cursor: pointer;
          -webkit-appearance: none;
        }
        .ct-select option { background: #111; color: #fff; }

        .ct-textarea {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.95rem;
          font-weight: 300;
          color: #fff;
          width: 100%;
          resize: none;
          min-height: 100px;
        }
        .ct-textarea::placeholder { color: rgba(255,255,255,0.15); }

        /* Submit */
        .ct-submit-row {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .ct-submit-note {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.15);
        }

        .ct-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #000;
          background: #fcc107;
          border: none;
          padding: 0.9rem 2rem;
          cursor: pointer;
          transition: gap 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .ct-btn:hover { gap: 16px; background: #ffd43b; }

        .ct-sent {
          font-family: 'Satoshi', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ct-sent::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #fcc107;
        }

        @media (max-width: 900px) {
          .ct-body { grid-template-columns: 1fr; }
          .ct-left { padding: 2.5rem 2rem; min-height: auto; }
        }
        @media (max-width: 600px) {
          .ct-section { padding: 80px 0; }
          .ct-inner { padding: 0 1.5rem; }
          .ct-header { margin-bottom: 48px; }
          .ct-row { grid-template-columns: 1fr; }
          .ct-submit-row { flex-direction: column; align-items: flex-start; }
          .ct-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="ct-inner">
        <div className={`ct-header${visible ? " in" : ""}`}>
          <p className="ct-eyebrow">Contacto</p>
          <h2 className="ct-heading">
            Empecemos<br />tu <em>proyecto</em>
          </h2>
          <p className="ct-sub">
            Contanos qué necesita tu empresa. Evaluamos cada caso de forma personalizada — sin formularios genéricos, sin respuestas automáticas.
          </p>
        </div>

        <div className={`ct-body${visible ? " in" : ""}`}>
          {/* Left */}
          <div className="ct-left">
            <div className="ct-left-bg">W.</div>
            <div className="ct-info-block">
              <div>
                <div className="ct-info-label">Email</div>
                <a href="mailto:hola@webi.com.ar" className="ct-info-value">hola@webi.com.ar</a>
              </div>
              <div>
                <div className="ct-info-label">WhatsApp</div>
                <a href="https://wa.me/5493436959359" className="ct-info-value">+54 9 3436959359</a>
              </div>
              <div>
                <div className="ct-info-label">Ubicación</div>
                <span className="ct-info-value">Paraná, Entre Ríos — Argentina</span>
              </div>
            </div>
            <div className="ct-promise">
              <p className="ct-promise-text">
                <strong>Respondemos en menos de 24hs.</strong> Cada consulta la lee una persona real del equipo, no un bot.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="ct-right">
            {sent ? (
              <div style={{ padding: "3rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="ct-sent">Mensaje enviado</div>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "0.9rem", fontWeight: 300, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                  Gracias. Te contactamos en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <div className="ct-row">
                  <div className="ct-field">
                    <label className="ct-label">Nombre</label>
                    <input className="ct-input" type="text" placeholder="Tu nombre" required />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Email</label>
                    <input className="ct-input" type="email" placeholder="tu@email.com" required />
                  </div>
                </div>
                <div className="ct-field-full">
                  <label className="ct-label">Empresa</label>
                  <input className="ct-input" type="text" placeholder="Nombre de tu empresa" />
                </div>
                <div className="ct-field-full">
                  <label className="ct-label">Servicio de interés</label>
                  <select className="ct-select" defaultValue="">
                    <option value="" disabled>Seleccioná un servicio</option>
                    <option value="sistemas">Sistemas Web a Medida</option>
                    <option value="web">Desarrollo Web</option>
                    <option value="ecommerce">Ecommerce</option>
                    <option value="redes">Gestión de Redes Sociales</option>
                    <option value="ads">Google Ads / Meta Ads</option>
                    <option value="audiovisual">Producción Audiovisual</option>
                  </select>
                </div>
                <div className="ct-field-full">
                  <label className="ct-label">Mensaje</label>
                  <textarea className="ct-textarea" placeholder="Contanos sobre tu proyecto..." required />
                </div>
                <div className="ct-submit-row">
                  <span className="ct-submit-note">Sin spam. Solo te contactamos si lo pedís.</span>
                  <button type="submit" className="ct-btn">
                    Enviar <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}