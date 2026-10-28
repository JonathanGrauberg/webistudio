"use client"
import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/** Frena o reanuda el scroll suave (para modales y el menú mobile). */
export function setScrollLocked(locked: boolean) {
  const lenis = window.__lenis
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? "hidden" : ""
}

/**
 * Scroll suave con Lenis, con la misma sensación que legal.oxymoron.com.ar:
 * ni rápido ni lento, con un frenado progresivo. Los links a #secciones
 * también se desplazan con la misma curva.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      anchors: { offset: 0, duration: 1.6 },
    })
    window.__lenis = lenis

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
