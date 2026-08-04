"use client"
//components\hero.tsx
import { useRef } from "react"
import { Linkedin, Instagram } from "lucide-react"

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Satoshi';
          src: url('/fonts/Satoshi-Black.woff2') format('woff2'),
               url('/fonts/Satoshi-Black.woff') format('woff');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }

        .hero-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000000;
        }

        .hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,0) 0%,
              rgba(0,0,0,0.2) 40%,
              rgba(0,0,0,0.8) 75%,
              #000000 95%,
              #000000 100%
            ),
            radial-gradient(
              circle at 50% 40%,
              transparent 20%,
              rgba(0,0,0,0.4) 60%,
              #000000 100%
            ),
            url('/hero.png') center/cover no-repeat;
        }

        .hero-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.1);
          z-index: 1;
          pointer-events: none;
        }

        .hero-center {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-title {
          font-family: 'Satoshi', sans-serif;
          font-weight: 900;
          font-size: clamp(100px, 18vw, 260px);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin: 0;
          user-select: none;
          opacity: 0;
          transform: translateY(20px);
          animation: fade-up 0.7s ease forwards 0.3s;
        }

        .hero-title .dot {
          color: #fcc107;
        }

        .global-socials {
          position: fixed;
          left: 1.8rem;
          bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 18px;
          z-index: 100;
          opacity: 0;
          animation: fade-in 0.5s ease forwards 1s;
        }

        .social-link {
          color: rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s, transform 0.2s, filter 0.2s;
          filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.8));
        }

        .social-link:hover {
          color: #fcc107;
          transform: translateX(3px);
          filter: drop-shadow(0px 0px 8px rgba(252,193,7,0.5));
        }

        .hero-byline {
          position: absolute;
          right: 1.8rem;
          bottom: 2.5rem;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          z-index: 20;
          opacity: 0;
          animation: fade-in 0.5s ease forwards 1.1s;
        }

        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
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
        }

        .scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, #fcc107, transparent);
        }

        @keyframes fade-up {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in {
          to { opacity: 1; }
        }

        @media (max-width: 600px) {
          .global-socials { left: 1rem; bottom: 2rem; gap: 14px; }
          .hero-byline { right: 1rem; bottom: 2rem; }
          .hero-scroll { bottom: 2rem; }
        }
      `}</style>

      <section ref={sectionRef} className="hero-root" id="inicio">
        <div className="hero-center">
          <h1 className="hero-title">
            Webi<span className="dot">.</span>
          </h1>
        </div>

        <p className="hero-byline">by Grauberg</p>

        <div className="hero-scroll">
          <span className="scroll-label">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="global-socials">
        <a href="https://www.linkedin.com/company/webi-studio/" target="_blank" rel="noopener noreferrer" className="social-link">
          <Linkedin size={20} />
        </a>
        <a href="https://www.instagram.com/webi.by.grauberg/" target="_blank" rel="noopener noreferrer" className="social-link">
          <Instagram size={20} />
        </a>
        <a href="https://wa.me/5493436959359" target="_blank" rel="noopener noreferrer" className="social-link">
          <WhatsAppIcon />
        </a>
      </div>
    </>
  )
}