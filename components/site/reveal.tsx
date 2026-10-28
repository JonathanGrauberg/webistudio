"use client"
import { useEffect } from "react"

/**
 * Un solo observador para toda la página: cualquier elemento con la clase
 * `.reveal` aparece cuando entra en pantalla. Permite que las secciones sean
 * Server Components (sin JS propio).
 */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)")
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
