import { SITE, whatsappLink } from "@/lib/site"
import { WORDMARK } from "./wordmark-paths"

const { viewBox: VB, glyphs: G } = WORDMARK

const COLUMNS = [
  {
    title: "Sitio",
    links: [
      { label: "Trabajos", href: "#trabajos" },
      { label: "Productos", href: "#productos" },
      { label: "Servicios", href: "#servicios" },
      { label: "Estudio", href: "#estudio" },
    ],
  },
  {
    title: "Productos",
    links: [
      { label: ".budgets", href: "https://budgets.webistudio.net" },
      { label: "Yatay", href: "#yatay" },
      { label: ".clinika", href: "#clinika" },
    ],
  },
  {
    title: "Seguinos",
    links: [
      { label: "Instagram", href: SITE.socials.instagram },
      { label: "LinkedIn", href: SITE.socials.linkedin },
      { label: "WhatsApp", href: whatsappLink() },
    ],
  },
]

export function Footer() {
  return (
    <footer data-nav="dark" className="overflow-hidden border-t border-[var(--line-dark)] bg-ink text-cream">
      <div className="wrap pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="max-w-[30ch] leading-relaxed text-cream/55">
              Estudio digital en {SITE.city}, {SITE.region}. Sistemas a medida, productos propios y sitios web.
            </p>
            <a href={`mailto:${SITE.email}`} className="link mt-8 text-cream">
              {SITE.email}
            </a>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title} className="md:col-span-2 md:first-of-type:col-start-7">
              <p className="label text-cream/35">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => {
                  const external = l.href.startsWith("http")
                  return (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-cream/75 transition-colors hover:text-yellow"
                      >
                        {l.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Firma */}
        <svg
          aria-hidden
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          className="mt-24 mb-[clamp(1.5rem,3vw,3rem)] block h-auto w-full"
        >
          <g fill="var(--cream)" opacity="0.96">
            <path d={G.W.d} />
            <path d={G.e.d} />
            <path d={G.b.d} />
            <path d={G.i.d} />
          </g>
          <path d={G.dot.d} fill="var(--yellow)" />
        </svg>
      </div>

      <div className="border-t border-[var(--line-dark)]">
        <div className="wrap flex flex-col gap-3 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}. Todos los derechos reservados.</p>
          <p>by Grauberg</p>
        </div>
      </div>
    </footer>
  )
}
