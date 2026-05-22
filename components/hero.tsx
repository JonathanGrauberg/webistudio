"use client"

import { useEffect, useRef, useState } from "react"
import { Linkedin, Instagram } from "lucide-react"

// WhatsApp icon as inline SVG since lucide doesn't have it
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    const section = sectionRef.current
    section?.addEventListener("mousemove", handleMouseMove)
    return () => section?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap');

        .hero-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0a0a0a;
          font-family: 'Satoshi', sans-serif;
        }

        /* Subtle radial texture like the mesh/grid in the reference */
        .hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%),
            repeating-conic-gradient(rgba(255,255,255,0.015) 0deg, transparent 0.5deg, transparent 4deg);
          background-size: 100% 100%, 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* Radial burst lines from center (like in the image) */
        .hero-burst {
          position: absolute;
          inset: 0;
          background: repeating-conic-gradient(
            from 0deg at 50% 55%,
            rgba(255,255,255,0.018) 0deg 2deg,
            transparent 2deg 8deg
          );
          z-index: 0;
          pointer-events: none;
        }

        .hero-glow {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(252,193,7,0.055) 0%, transparent 65%);
          pointer-events: none;
          z-index: 1;
          transition: left 0.15s ease-out, top 0.15s ease-out;
        }

        /* Center content */
        .hero-center {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
          user-select: none;
        }

        .hero-above {
          font-size: clamp(0.75rem, 1.2vw, 0.95rem);
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-bottom: 0.6rem;
          opacity: 0;
          animation: fade-up 0.6s ease forwards 0.2s;
        }

        .hero-brand {
          font-size: clamp(6rem, 18vw, 17rem);
          font-weight: 700;
          line-height: 0.85;
          letter-spacing: -0.03em;
          color: #ffffff;
          opacity: 0;
          animation: fade-up 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.35s;
          display: flex;
          align-items: flex-end;
        }

        .hero-dot {
          color: #fcc107;
          display: inline-block;
          animation: dot-float 3.5s ease-in-out infinite 1.8s;
          line-height: 1;
        }

        @keyframes dot-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-below {
          font-size: clamp(0.75rem, 1.2vw, 0.95rem);
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          margin-top: 1rem;
          line-height: 1.7;
          opacity: 0;
          animation: fade-up 0.6s ease forwards 0.55s;
        }

        /* Social icons — bottom left, fixed */
        .hero-socials {
          position: fixed;
          left: 1.8rem;
          bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 20;
          opacity: 0;
          animation: fade-in 0.5s ease forwards 1s;
        }

        .social-link {
          color: rgba(255,255,255,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s, transform 0.2s;
          text-decoration: none;
        }

        .social-link:hover {
          color: #fcc107;
          transform: translateX(3px);
        }

        /* By Grauberg — bottom right */
        .hero-byline {
          position: fixed;
          right: 1.8rem;
          bottom: 2rem;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          font-family: 'Satoshi', sans-serif;
          z-index: 20;
          opacity: 0;
          animation: fade-in 0.5s ease forwards 1.1s;
        }

        /* Scroll indicator — bottom center */
        .hero-scroll {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 20;
          opacity: 0;
          animation: fade-in 0.5s ease forwards 1.3s;
        }

        .scroll-label {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          font-family: 'Satoshi', sans-serif;
        }

        .scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, #fcc107, transparent);
          animation: scroll-pulse 2s ease-in-out infinite;
          transform-origin: top;
        }

        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        @keyframes fade-up {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          to { opacity: 1; }
        }

        .hero-above, .hero-below {
          transform: translateY(12px);
        }

        .hero-brand {
          transform: translateY(32px);
        }

        @media (max-width: 600px) {
          .hero-socials { left: 1rem; bottom: 2rem; }
          .hero-byline { right: 1rem; }
        }
      `}</style>

      <section ref={sectionRef} className="hero-root" id="inicio">
        <div className="hero-burst" />

        {mounted && (
          <div
            className="hero-glow"
            style={{
              left: `calc(${mousePos.x * 100}% - 350px)`,
              top: `calc(${mousePos.y * 100}% - 350px)`,
            }}
          />
        )}

        <div className="hero-center">
          
          <div className="hero-brand">
            Webi<span className="hero-dot">.</span>
          </div>
          
        </div>

        {/* Social icons — bottom left */}
        <div className="hero-socials">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>

        {/* By Grauberg */}
        <p className="hero-byline">by Grauberg</p>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  )
}
