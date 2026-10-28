"use client"
import { useEffect, useState } from "react"
import { SITE, whatsappLink } from "@/lib/site"
import { setScrollLocked } from "./smooth-scroll"

const LINKS = [
  { label: "Trabajos", href: "#trabajos" },
  { label: "Productos", href: "#productos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Estudio", href: "#estudio" },
]

/**
 * Navbar fijo y transparente. Toma el color de la sección que tiene debajo
 * (cada sección declara data-nav="dark" | "light").
 */
export function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const probe = 32
      const sections = document.querySelectorAll<HTMLElement>("[data-nav]")
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) {
          setTheme(s.dataset.nav === "light" ? "light" : "dark")
          break
        }
      }
      // Se esconde al bajar y vuelve al subir (pero nunca durante la portada)
      const intro = document.getElementById("inicio")
      const pastIntro = intro ? intro.getBoundingClientRect().bottom < 0 : y > 200
      setSolid(pastIntro)
      const delta = y - lastY
      if (!pastIntro) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      if (Math.abs(delta) > 6) lastY = y
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // La barra de scroll toma el mismo tema (ver globals.css)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    setScrollLocked(open)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const light = theme === "light" && !open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,color,background-color] duration-500 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-full" : ""
        } ${light ? "text-ink" : "text-cream"} ${
          solid && !open ? (light ? "bg-cream/85 backdrop-blur-md" : "bg-ink/80 backdrop-blur-md") : ""
        }`}
      >
        <nav className="wrap flex h-[4.5rem] items-center justify-between" aria-label="Principal">
          <a href="#inicio" aria-label="Webi. — inicio" className="text-[1.6rem] font-black leading-none tracking-[-0.04em]" onClick={() => setOpen(false)}>
            W<span className="text-yellow">.</span>
          </a>

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="label opacity-70 transition-opacity hover:opacity-100">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contacto" className={`btn !py-2.5 !px-4 max-md:hidden ${light ? "btn-dark" : "btn-light"}`}>
            Hablemos
          </a>

          <button
            type="button"
            className="relative -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-6 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </nav>
      </header>

      {/* Menú mobile */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-40 flex flex-col bg-ink px-[var(--gutter)] pt-28 pb-10 text-cream transition-[opacity,visibility] duration-500 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {[...LINKS, { label: "Contacto", href: "#contacto" }].map((l, i) => (
            <li key={l.href} className="border-b border-[var(--line-dark)]">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 text-4xl font-medium tracking-[-0.04em]"
              >
                {l.label}
                <span className="label text-cream/40">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 text-cream/60">
          <a href={`mailto:${SITE.email}`} className="text-lg">{SITE.email}</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-lg">
            WhatsApp {SITE.whatsappLabel}
          </a>
        </div>
      </div>
    </>
  )
}
