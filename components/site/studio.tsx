const TEAM = [
  {
    role: "Dirección y desarrollo",
    text: "Visión de negocio convertida en arquitectura. Acompaña cada proyecto desde la primera reunión hasta que está funcionando.",
  },
  {
    role: "Diseño UX/UI",
    text: "Cada pantalla tiene un porqué. Flujos que la gente entiende sin manual y que la empresa puede sostener en el tiempo.",
  },
  {
    role: "Marketing y contenido",
    text: "Conecta lo que construimos con las personas que lo necesitan: campañas, contenido y presencia que generan consultas.",
  },
]

const PRINCIPLES = [
  "Hablás directo con quien diseña y programa.",
  "Construimos por etapas: ves avances desde la primera semana.",
  "El código y los datos son tuyos.",
  "Seguimos acompañando después de la entrega.",
]

export function Studio() {
  return (
    <section id="estudio" data-nav="light" aria-labelledby="estudio-title" className="bg-cream text-ink">
      <div className="wrap py-[clamp(6rem,11vw,10rem)]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label label-line text-ink/60 reveal">El estudio</p>
            <h2 id="estudio-title" className="heading mt-8 reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              Un equipo chico, a propósito.
            </h2>
          </div>
          <div className="md:col-span-5 md:col-start-8 md:pt-20">
            <p className="lead text-ink/65 reveal" style={{ "--delay": "0.15s" } as React.CSSProperties}>
              Somos un estudio de Paraná, Entre Ríos, y hace más de 4 años que trabajamos con
              empresas de todo el país. Preferimos pocos proyectos bien hechos a muchos a medias: por eso cada cliente tiene
              al equipo completo pensando en su problema.
            </p>
            <ul className="mt-10 border-t border-[var(--line-light)]">
              {PRINCIPLES.map((p, i) => (
                <li
                  key={p}
                  className="reveal flex gap-5 border-b border-[var(--line-light)] py-4 text-[0.95rem]"
                  style={{ "--delay": `${0.2 + i * 0.05}s` } as React.CSSProperties}
                >
                  <span className="text-yellow">—</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-[clamp(4rem,8vw,7rem)] grid border-t border-l border-[var(--line-light)] md:grid-cols-3">
          {TEAM.map((m, i) => (
            <li key={m.role} className="reveal border-r border-b border-[var(--line-light)] p-8 lg:p-10" style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}>
              <span className="label text-ink/40">0{i + 1}</span>
              <h3 className="mt-12 text-2xl font-medium tracking-[-0.03em]">{m.role}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{m.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
