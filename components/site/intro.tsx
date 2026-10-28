"use client"
import { useEffect, useRef } from "react"
import { WORDMARK } from "./wordmark-paths"

const { viewBox: VB, glyphs: G, zoomOrigin: ORIGIN, zoomSolidRadius: SOLID_R } = WORDMARK

// Al replegarse "ebi", el punto se mueve hasta quedar pegado a la W
// y todo se corre para que "W." quede centrado.
const DOT_SHIFT = G.e.x - G.dot.x // -1365
const RECENTER = (G.dot.x - G.e.x) / 2 // 682.5

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const range = (p: number, from: number, to: number) => clamp((p - from) / (to - from))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Portada: "Webi." sobre la textura. Con el scroll, "ebi" se repliega dentro
 * de la W y la cámara entra por el vértice central de la W hasta llenar la
 * pantalla, que queda en crema y da paso al sitio.
 */
export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const zoomRef = useRef<SVGGElement>(null)
  const shiftRef = useRef<SVGGElement>(null)
  const ebiRef = useRef<SVGGElement>(null)
  const dotRef = useRef<SVGGElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const uiRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current!
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.static = "true"
      return
    }

    let maxScale = 60
    let raf = 0

    // Escala necesaria para que la zona sólida de la W cubra toda la pantalla
    const measure = () => {
      const svg = svgRef.current!
      const r = svg.getBoundingClientRect()
      const unitPx = r.width / VB.w
      const ox = r.left + ((ORIGIN.x + RECENTER - VB.x) / VB.w) * r.width
      const oy = r.top + ((ORIGIN.y - VB.y) / VB.h) * r.height
      const vw = window.innerWidth
      const vh = window.innerHeight
      const far = Math.max(Math.hypot(ox, oy), Math.hypot(vw - ox, oy), Math.hypot(ox, vh - oy), Math.hypot(vw - ox, vh - oy))
      maxScale = (far / (SOLID_R * unitPx)) * 1.15
    }

    const update = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = clamp(-rect.top / total)

      // 1. Se replegan las letras
      const t1 = easeInOut(range(p, 0.02, 0.24))
      ebiRef.current!.style.opacity = String(1 - range(t1, 0, 0.55))
      dotRef.current!.setAttribute("transform", `translate(${DOT_SHIFT * t1} 0)`)
      shiftRef.current!.setAttribute("transform", `translate(${RECENTER * t1} 0)`)

      // 2. Zoom dentro de la W
      const t2 = range(p, 0.26, 0.86)
      const s = Math.pow(maxScale, Math.pow(t2, 1.35))
      const ox = ORIGIN.x + RECENTER
      zoomRef.current!.setAttribute(
        "transform",
        `translate(${ox} ${ORIGIN.y}) scale(${s}) translate(${-ox} ${-ORIGIN.y})`
      )
      dotRef.current!.style.opacity = String(1 - range(t2, 0.02, 0.18))

      // Fondo y textos
      bgRef.current!.style.transform = `scale(${1 + 0.35 * t2})`
      bgRef.current!.style.opacity = String(1 - 0.7 * t2)
      uiRef.current!.style.opacity = String(1 - range(p, 0, 0.07))
      coverRef.current!.style.opacity = String(range(p, 0.8, 0.86))

      // El navbar pasa a modo claro cuando la W ya llenó la pantalla
      section.dataset.nav = p > 0.8 ? "light" : "dark"
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      data-nav="dark"
      className="intro relative h-[300svh] bg-black data-[static=true]:h-[100svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Textura de fondo */}
        <div
          ref={bgRef}
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, transparent 25%, rgba(0,0,0,.55) 70%, #000 100%), linear-gradient(to bottom, rgba(0,0,0,0) 55%, #000 100%), url('/work/hero.webp') center/cover no-repeat",
          }}
        />

        <h1 className="sr-only">
          Webi. Estudio digital en Paraná, Entre Ríos: sistemas de gestión a medida, productos SaaS y sitios web
        </h1>

        {/* Wordmark vectorial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            ref={svgRef}
            aria-hidden
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            className="intro-mark w-[clamp(280px,56vw,880px)] overflow-visible"
          >
            <g ref={zoomRef}>
              <g ref={shiftRef}>
                <path d={G.W.d} fill="var(--cream)" />
                <g ref={ebiRef} fill="var(--cream)">
                  <path d={G.e.d} />
                  <path d={G.b.d} />
                  <path d={G.i.d} />
                </g>
                <g ref={dotRef}>
                  <path d={G.dot.d} fill="var(--yellow)" />
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Textos de la portada */}
        <div className="intro-ui pointer-events-none absolute inset-x-0 bottom-0">
          <div ref={uiRef}>
          <div className="wrap flex items-end justify-between gap-6 pb-8 sm:pb-10">
            <p className="label text-cream/60 max-sm:hidden">
              Estudio digital · {"Paraná, Entre Ríos"}
            </p>
            <div className="flex flex-col items-center gap-3 max-sm:mx-auto">
              <span className="label text-cream/45 !tracking-[0.3em]">Scroll</span>
              <span className="intro-scroll-line block h-10 w-px bg-gradient-to-b from-yellow to-transparent" />
            </div>
            <p className="label text-cream/60 max-sm:hidden">Sistemas · Productos · Web</p>
          </div>
          </div>
        </div>

        {/* Crema final: la W ya llenó la pantalla */}
        <div ref={coverRef} aria-hidden className="pointer-events-none absolute inset-0 bg-cream opacity-0" />
      </div>

      <style>{`
        .intro-mark { animation: intro-in 1.4s var(--ease-out) both 0.15s; }
        .intro-ui { animation: intro-fade 1s ease both 0.9s; }
        .intro-scroll-line { transform-origin: top; animation: intro-line 2.2s var(--ease-out) infinite 1.6s; }
        @keyframes intro-in { from { opacity: 0; transform: translateY(24px); filter: blur(6px); } }
        @keyframes intro-fade { from { opacity: 0; } }
        @keyframes intro-line {
          0% { transform: scaleY(0); opacity: 1; }
          60% { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-mark, .intro-ui, .intro-scroll-line { animation: none; }
        }
      `}</style>
    </section>
  )
}
