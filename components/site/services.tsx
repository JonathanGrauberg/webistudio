const SERVICES = [
  {
    title: "Sistemas a medida",
    description:
      "Plataformas de gestión diseñadas desde cero según cómo trabaja tu empresa: stock, clientes, presupuestos, vales, flota, facturación. Todo en un solo lugar y con permisos por rol.",
    tags: ["CRM y ERP", "Paneles de gestión", "Integraciones y APIs", "Automatizaciones"],
  },
  {
    title: "Sitios web",
    description:
      "Sitios corporativos e institucionales rápidos, cuidados en cada detalle y pensados para que te encuentren en Google y te consulten.",
    tags: ["Diseño a medida", "SEO técnico", "Rendimiento", "Mobile first"],
  },
  {
    title: "Ecommerce",
    description: "Tiendas online con catálogo, pagos integrados y gestión de pedidos, listas para vender desde el primer día.",
    tags: ["Mercado Pago", "Catálogo y stock", "Panel de pedidos"],
  },
  {
    title: "Marketing y contenido",
    description: "Acompañamos el lanzamiento con pauta en Google y Meta, contenido para redes y producción audiovisual con drone.",
    tags: ["Google Ads", "Meta Ads", "Contenido", "Drone"],
  },
]

const PROCESS = [
  { title: "Diagnóstico", text: "Entendemos cómo funciona tu operación hoy y qué hay que resolver primero." },
  { title: "Diseño", text: "Definimos flujos y pantallas con tu equipo antes de escribir una línea de código." },
  { title: "Desarrollo", text: "Construimos por etapas, con entregas que podés probar desde la primera semana." },
  { title: "Acompañamiento", text: "Capacitamos, medimos y mejoramos. El sistema crece con tu empresa." },
]

export function Services() {
  return (
    <section id="servicios" data-nav="dark" aria-labelledby="servicios-title" className="bg-ink text-cream">
      <div className="wrap py-[clamp(6rem,11vw,10rem)]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label label-line text-yellow reveal">Servicios</p>
            <h2 id="servicios-title" className="heading mt-8 reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              Lo que hacemos, de punta a punta.
            </h2>
          </div>
          <p className="lead self-end text-cream/55 md:col-span-4 md:col-start-9 reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            Un solo equipo para pensar, diseñar, desarrollar y mantener. Sin intermediarios.
          </p>
        </div>

        <ol className="mt-[clamp(3.5rem,7vw,6rem)] border-t border-[var(--line-dark)]">
          {SERVICES.map((s, i) => (
            <li
              key={s.title}
              className="group reveal relative grid gap-4 border-b border-[var(--line-dark)] py-10 md:grid-cols-12 md:gap-8 md:py-12"
            >
              <span aria-hidden className="absolute top-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-yellow transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100" />
              <span className="label self-start text-cream/35 md:col-span-1 md:pt-4">0{i + 1}</span>
              <h3 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em] md:col-span-4">
                {s.title}
              </h3>
              <div className="md:col-span-6 md:col-start-7">
                <p className="leading-relaxed text-cream/60">{s.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="border border-[var(--line-dark)] px-3 py-1.5 text-xs text-cream/60">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* Proceso */}
        <div className="mt-[clamp(5rem,9vw,8rem)]">
          <p className="label text-cream/50 reveal">Cómo trabajamos</p>
          <ol className="mt-10 grid border-t border-l border-[var(--line-dark)] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p.title} className="reveal border-r border-b border-[var(--line-dark)] p-8 lg:p-10" style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}>
                <span className="text-sm text-yellow">0{i + 1}</span>
                <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/55">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
