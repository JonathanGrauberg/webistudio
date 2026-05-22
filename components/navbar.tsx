"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

// Filena font: import in your globals.css or layout.tsx:
// @import url('https://fonts.cdnfonts.com/css/filena');
// Then set: --font-filena: 'Filena', sans-serif;
// On <html> or <body>: font-family: var(--font-filena);

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Que hacemos", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 1.25rem 2.5rem;
        }

        .navbar-logo {
          font-size: 1.6rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #ffffff;
          text-decoration: none;
          font-family: 'Satoshi', sans-serif;
          line-height: 1;
        }

        .navbar-logo-dot {
          color: #fcc107;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-link {
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
          font-family: var(--font-filena, 'Satoshi', sans-serif);
        }

        .navbar-link:hover {
          color: #ffffff;
        }

        .navbar-mobile-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          padding: 4px;
          display: none;
        }

        .navbar-mobile-menu {
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .navbar-mobile-link {
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
          font-family: var(--font-filena, 'Satoshi', sans-serif);
        }

        .navbar-mobile-link:hover { color: #ffffff; }

        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .navbar-mobile-btn { display: block; }
          .navbar-inner { padding: 1rem 1.5rem; }
        }
      `}</style>

      <nav className={`navbar${isScrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          <a href="#inicio" className="navbar-logo">
            W<span className="navbar-logo-dot">.</span>
          </a>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="navbar-mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="navbar-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar-mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
