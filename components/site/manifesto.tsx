import Image from "next/image"
import { BRANDS } from "@/lib/site"

const STATS = [
  { value: "4+", label: "Años de experiencia" },
  { value: "20+", label: "Empresas que confían en nosotros" },
  { value: "7", label: "Sistemas en producción" },
  { value: "3", label: "Productos propios" },
]

/** Primera pantalla después de entrar en la W: declaración, números y marcas. */
export function Manifesto() {
  return (
    <section
      data-nav="light"
      aria-labelledby="manifesto-title"
      className="relative z-10 -mt-[38svh] bg-cream text-ink [.intro[data-static=true]+&]:mt-0"
    >
      <div className="wrap pt-[clamp(3.5rem,6vw,5.5rem)] pb-[clamp(4rem,8vw,7rem)]">
        <p className="label label-line text-ink/60 reveal">Estudio digital · Paraná, Entre Ríos</p>

        <h2 id="manifesto-title" className="display mt-8 max-w-[15ch] reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
          Software que ordena empresas<span className="text-yellow">.</span>
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
          <p className="lead text-ink/65 md:col-span-6 lg:col-span-5 reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            Diseñamos y desarrollamos sistemas de gestión a medida, productos propios y sitios web
            para empresas que quieren trabajar mejor. Sin plantillas: cada proyecto parte de cómo
            funciona tu negocio de verdad.
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t sm:grid-cols-4 border-[var(--line-light)] pt-6 md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            {STATS.map((s, i) => (
              <div key={s.label} className="reveal" style={{ "--delay": `${0.25 + i * 0.08}s` } as React.CSSProperties}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-none tracking-[-0.05em]">{s.value}</dd>
                <dd className="mt-3 text-sm leading-snug text-ink/55">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Franja de marcas */}
      <div className="border-y border-[var(--line-light)] py-10 sm:py-12">
        <div className="wrap mb-8 flex items-center justify-between">
          <p className="label text-ink/50">Marcas que trabajan con nosotros</p>
          <p className="label text-ink/30 max-sm:hidden">{BRANDS.length} marcas</p>
        </div>
        <div className="marquee-mask overflow-hidden">
          <ul className="marquee items-center" aria-label="Clientes">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <li key={`${b.name}-${i}`} aria-hidden={i >= BRANDS.length} className="flex shrink-0 items-center px-[clamp(1.75rem,3.5vw,3.5rem)]">
                <Image
                  src={b.src}
                  alt={i < BRANDS.length ? b.name : ""}
                  width={b.width}
                  height={b.height}
                  className="h-[clamp(26px,3vw,40px)] w-auto opacity-55 invert transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
