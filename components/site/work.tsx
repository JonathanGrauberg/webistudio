"use client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Eye, Monitor, ShoppingBag, Smartphone, X } from "lucide-react"
import { MORE_WORKS, WORKS, whatsappLink, type Work } from "@/lib/site"
import { setScrollLocked } from "./smooth-scroll"

type Filter = "Todos" | "Sitio web" | "Sistema"
const FILTERS: Filter[] = ["Todos", "Sitio web", "Sistema"]

const wantOne = (w: Work) =>
  whatsappLink(`Hola Webi! Quiero ${w.kind === "Sistema" ? "un sistema" : "un sitio"} como ${w.name}.`)

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")

// ── Tarjeta tipo producto ──────────────────────────────────────────

function ProductCard({ work, onOpen }: { work: Work; onOpen: () => void }) {
  const live = Boolean(work.url)
  return (
    <li className="group flex flex-col">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${live ? "Ver en vivo" : "Ver detalle de"} ${work.name}`}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-[3px] bg-sand text-left"
      >
        <Image
          src={work.image.src}
          alt={`${work.name} — ${work.category}`}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover object-top transition-transform duration-[1.1s] ease-[var(--ease-out)] group-hover:scale-[1.05]"
        />
        <span
          className={`absolute top-2.5 left-2.5 px-2 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-ink uppercase backdrop-blur-sm sm:top-3 sm:left-3 ${
            work.own ? "bg-yellow" : "bg-cream/90"
          } ${live ? "max-sm:hidden" : ""}`}
        >
          {work.own ? "Producto .webi" : work.kind}
        </span>
        {live && (
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-ink/75 px-2 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-cream uppercase backdrop-blur-sm sm:top-3 sm:right-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7ddc9b]" /> En vivo
          </span>
        )}
        {/* "Vista rápida" que sube al pasar el mouse */}
        <span className="absolute inset-x-2.5 bottom-2.5 flex translate-y-[calc(100%+0.75rem)] items-center justify-center gap-2 bg-ink py-3 text-[0.68rem] font-medium tracking-[0.18em] text-cream uppercase transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0 max-md:hidden">
          <Eye size={14} strokeWidth={1.5} /> {live ? "Vista en vivo" : "Ver detalle"}
        </span>
      </button>

      <div className="mt-3.5 flex flex-1 flex-col sm:mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[0.98rem] leading-tight font-medium tracking-[-0.015em] sm:text-lg">{work.name}</h3>
          <a
            href={wantOne(work)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Quiero uno como ${work.name}`}
            title="Quiero uno así"
            className="-mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-light)] transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
          </a>
        </div>
        <p className="mt-1 text-xs text-ink/50 sm:text-sm">{work.category}</p>

        {/* El "precio" */}
        <div className="mt-auto pt-3">
          {live ? (
            <button type="button" onClick={onOpen} className="flex items-center gap-1.5 text-sm font-medium">
              Ver en vivo <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ) : (
            <button type="button" onClick={onOpen} className="text-sm font-medium text-ink/45">
              Sistema interno
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

// ── "Y muchos más": cierre de la grilla ────────────────────────────

function MoreCard() {
  return (
    <li className="group flex flex-col">
      <a
        href="#mas-trabajos"
        className="relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-[3px] bg-ink p-4 text-cream sm:p-5"
      >
        <span className="text-[0.6rem] font-medium tracking-[0.18em] text-cream/50 uppercase">Y la lista sigue</span>
        <span className="text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[0.95] font-medium tracking-[-0.04em]">
          + muchos
          <br />
          más<span className="text-yellow">.</span>
        </span>
        <span aria-hidden className="pointer-events-none absolute -right-4 -bottom-10 text-[9rem] leading-none font-black tracking-[-0.06em] text-cream/[0.04] transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-x-2">
          W.
        </span>
      </a>

      <div className="mt-3.5 flex flex-1 flex-col sm:mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[0.98rem] leading-tight font-medium tracking-[-0.015em] sm:text-lg">Y muchos más</h3>
          <a
            href={whatsappLink("Hola Webi! Me gustaría ver más trabajos de ustedes.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pedir más trabajos por WhatsApp"
            title="Pedí el portfolio completo"
            className="-mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-light)] transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
          >
            <ShoppingBag size={14} strokeWidth={1.5} />
          </a>
        </div>
        <p className="mt-1 text-xs text-ink/50 sm:text-sm">Landings, ecommerce, sitios institucionales</p>
        <div className="mt-auto pt-3">
          <a href="#mas-trabajos" className="flex items-center gap-1.5 text-sm font-medium">
            Ver la lista <ArrowUpRight size={14} strokeWidth={1.5} className="rotate-90" />
          </a>
        </div>
      </div>
    </li>
  )
}

// ── Vista rápida: el sitio funcionando adentro ──────────────────────

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, label: "Escritorio", icon: Monitor },
  mobile: { width: 390, height: 844, label: "Celular", icon: Smartphone },
} as const
type Viewport = keyof typeof VIEWPORTS
const BAR_H = 34

function LiveFrame({ work, viewport }: { work: Work; viewport: Viewport }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const vp = VIEWPORTS[viewport]

  useEffect(() => {
    setLoaded(false)
  }, [work.id, viewport])

  const mobile = viewport === "mobile"
  // Lo que suma el marco alrededor del sitio: borde del teléfono o barra del navegador
  const frameX = mobile ? 16 : 0
  const frameY = mobile ? 16 : BAR_H

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const fit = () => {
      const r = box.getBoundingClientRect()
      setScale(Math.max(0, Math.min((r.width - frameX) / vp.width, (r.height - frameY) / vp.height)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    return () => ro.disconnect()
  }, [vp.width, vp.height, frameX, frameY])

  const w = vp.width * scale
  const h = vp.height * scale

  return (
    <div ref={boxRef} className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className={`flex shrink-0 flex-col overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] ${
          mobile ? "rounded-[30px] border-[8px] border-ink bg-ink" : "rounded-[5px] bg-ink"
        }`}
        style={{ width: w + frameX }}
      >
        {!mobile && work.url && (
          <div className="flex shrink-0 items-center gap-3 px-3.5" style={{ height: BAR_H }}>
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cream/20" />
              <span className="h-2 w-2 rounded-full bg-cream/20" />
              <span className="h-2 w-2 rounded-full bg-cream/20" />
            </span>
            <span className="mx-auto truncate rounded-full bg-cream/10 px-4 py-1 text-[0.7rem] text-cream/70">{host(work.url)}</span>
            <span className="flex items-center gap-1.5 text-[0.6rem] font-medium tracking-[0.18em] text-cream/70 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7ddc9b]" /> En vivo
            </span>
          </div>
        )}
        <div className={`relative overflow-hidden bg-white ${mobile ? "rounded-[22px]" : ""}`} style={{ width: w, height: h }}>
          {/* Captura mientras carga el sitio real */}
          {!loaded && <Image src={work.image.src} alt="" fill sizes="60vw" className="object-cover object-top" />}
          {scale > 0 && work.url && (
            <iframe
              key={`${work.id}-${viewport}`}
              src={work.url}
              title={`${work.name} en vivo`}
              onLoad={() => setLoaded(true)}
              className={`absolute top-0 left-0 origin-top-left border-0 bg-white transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              style={{ width: vp.width, height: vp.height, transform: `scale(${scale})` }}
            />
          )}
        </div>
      </div>
      {!loaded && work.url && (
        <span className="label absolute bottom-3 left-1/2 -translate-x-1/2 bg-ink/80 px-3 py-2 whitespace-nowrap text-cream">
          Cargando en vivo…
        </span>
      )}
    </div>
  )
}

function QuickView({ work, onClose }: { work: Work; onClose: () => void }) {
  const [viewport, setViewport] = useState<Viewport>("desktop")
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setViewport("mobile")
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    setScrollLocked(true)
    window.addEventListener("keydown", onKey)
    return () => {
      setScrollLocked(false)
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const live = Boolean(work.url)

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent
      aria-labelledby="qv-title"
      className="qv fixed inset-0 z-[60] flex items-stretch justify-center bg-ink/70 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="qv-panel relative grid h-full w-full max-w-[1400px] grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-cream text-ink md:h-[min(860px,92vh)] md:grid-cols-[1fr_360px] md:grid-rows-1 md:rounded-[4px]"
      >
        {/* Vista */}
        <div className="relative min-h-[56svh] bg-sand p-4 sm:p-8 md:min-h-0">
          {live ? (
            <LiveFrame work={work} viewport={viewport} />
          ) : (
            <div className="relative h-full w-full overflow-hidden rounded-[4px]">
              <Image src={work.image.src} alt={`${work.name} — ${work.category}`} fill sizes="70vw" className="object-cover" />
            </div>
          )}
        </div>

        {/* Ficha */}
        <aside className="flex max-h-[44svh] flex-col gap-5 overflow-y-auto border-t border-[var(--line-light)] p-5 sm:p-6 md:max-h-none md:gap-6 md:border-t-0 md:border-l md:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="label text-ink/50">{work.kind}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="-mt-2 -mr-2 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-cream"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <div>
            <h3 id="qv-title" className="text-3xl font-medium tracking-[-0.035em]">{work.name}</h3>
            <p className="mt-1 text-sm text-ink/50">{work.category}</p>
          </div>

          <p className="leading-relaxed text-ink/70 max-md:text-sm">{work.description}</p>

          {live && (
            <fieldset>
              <legend className="label text-ink/50">Verlo en</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(Object.keys(VIEWPORTS) as Viewport[]).map((k) => {
                  const V = VIEWPORTS[k]
                  const active = viewport === k
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setViewport(k)}
                      className={`flex items-center justify-center gap-2 border py-2.5 text-sm transition-colors ${
                        active ? "border-ink bg-ink text-cream" : "border-[var(--line-light)] hover:border-ink"
                      }`}
                    >
                      <V.icon size={15} strokeWidth={1.5} /> {V.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-auto flex flex-col gap-2 pt-2">
            <a href={wantOne(work)} target="_blank" rel="noopener noreferrer" className="btn btn-solid justify-center">
              <ShoppingBag size={15} strokeWidth={1.5} /> Quiero uno así
            </a>
            {live && (
              <a href={work.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark justify-center">
                Abrir el sitio <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .qv { animation: qv-fade .35s ease both; }
        .qv-panel { animation: qv-up .55s var(--ease-out) both; }
        @keyframes qv-fade { from { opacity: 0; } }
        @keyframes qv-up { from { opacity: 0; transform: translateY(24px) scale(.985); } }
        @media (prefers-reduced-motion: reduce) { .qv, .qv-panel { animation: none; } }
      `}</style>
    </div>
  )
}

// ── Sección ────────────────────────────────────────────────────────

export function WorkSection() {
  const [filter, setFilter] = useState<Filter>("Todos")
  const [openId, setOpenId] = useState<string | null>(null)

  const counts = useMemo(
    () => ({
      Todos: WORKS.length,
      "Sitio web": WORKS.filter((w) => w.kind === "Sitio web").length,
      Sistema: WORKS.filter((w) => w.kind === "Sistema").length,
    }),
    []
  )
  const items = filter === "Todos" ? WORKS : WORKS.filter((w) => w.kind === filter)
  const open = WORKS.find((w) => w.id === openId)
  const close = useCallback(() => setOpenId(null), [])

  return (
    <section id="trabajos" data-nav="light" aria-labelledby="trabajos-title" className="bg-cream text-ink">
      <div className="wrap py-[clamp(6rem,11vw,10rem)]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label label-line text-ink/60 reveal">Trabajos</p>
            <h2 id="trabajos-title" className="heading mt-8 reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              La vidriera<span className="text-yellow">.</span>
            </h2>
          </div>
          <p className="lead self-end text-ink/55 md:col-span-4 md:col-start-9 reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            Elegí un trabajo y miralo funcionando en vivo, en escritorio o en celular. Si te gusta, pedí uno así.
          </p>
        </div>

        {/* Barra de tienda */}
        <div className="reveal mt-[clamp(3rem,6vw,5rem)] flex flex-wrap items-center justify-between gap-4 border-y border-[var(--line-light)] py-4">
          <div role="group" aria-label="Filtrar trabajos" className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2 text-sm transition-colors duration-300 ${
                  filter === f ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"
                }`}
              >
                {f === "Todos" ? "Todos" : f === "Sistema" ? "Sistemas" : "Sitios web"}
                <sup className="ml-1 text-[0.65rem] opacity-60">{counts[f]}</sup>
              </button>
            ))}
          </div>
          <p className="text-sm text-ink/45">
            {items.length} {items.length === 1 ? "trabajo" : "trabajos"}
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 md:gap-y-14 xl:grid-cols-4">
          {items.map((w) => (
            <ProductCard key={w.id} work={w} onOpen={() => setOpenId(w.id)} />
          ))}
          {filter !== "Sistema" && <MoreCard />}
        </ul>

        {/* Otros trabajos */}
        <div id="mas-trabajos" className="mt-[clamp(5rem,9vw,8rem)] grid scroll-mt-24 gap-8 md:grid-cols-12">
          <p className="label self-start text-ink/50 md:col-span-3 reveal">También trabajamos con</p>
          <ul className="border-t border-[var(--line-light)] md:col-span-9">
            {MORE_WORKS.map((w, i) => (
              <li
                key={w.name}
                className="reveal flex items-baseline justify-between gap-6 border-b border-[var(--line-light)] py-5"
                style={{ "--delay": `${i * 0.05}s` } as React.CSSProperties}
              >
                <span className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">{w.name}</span>
                <span className="text-sm text-ink/50">{w.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {open && <QuickView work={open} onClose={close} />}
    </section>
  )
}
