"use client"
import { useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import { SITE, whatsappLink } from "@/lib/site"

const INTERESTS = ["Sistema a medida", "Sitio web", "Ecommerce", ".budgets", "Yatay", ".anclaje", ".clinika", "Otro"]

const field =
  "w-full border-0 border-b border-[var(--line-dark)] bg-transparent py-3 text-lg text-cream placeholder:text-cream/30 focus:border-yellow focus:outline-none transition-colors"

type Status = "idle" | "sending" | "sent" | "error"

export function Contact() {
  const [interest, setInterest] = useState<string>("Sistema a medida")
  const [status, setStatus] = useState<Status>("idle")
  const [waText, setWaText] = useState("")

  // El formulario manda la consulta por mail (app/api/contact). Si falla, ofrece WhatsApp.
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setWaText(
      [`Hola Webi! Soy ${data.name}${data.company ? ` de ${data.company}` : ""}.`, `Me interesa: ${interest}.`, data.message]
        .filter(Boolean)
        .join("\n"),
    )
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interest }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus("sent")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contacto" data-nav="dark" aria-labelledby="contacto-title" className="bg-ink text-cream">
      <div className="wrap py-[clamp(6rem,11vw,10rem)]">
        <p className="label label-line text-yellow reveal">Contacto</p>
        <h2 id="contacto-title" className="display mt-8 max-w-[13ch] reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
          ¿Tenés un proyecto? Hablemos<span className="text-yellow">.</span>
        </h2>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-16 md:grid-cols-12">
          <div className="space-y-10 md:col-span-4">
            <div className="reveal">
              <p className="label text-cream/40">Email</p>
              <a href={`mailto:${SITE.email}`} className="mt-3 block text-xl transition-colors hover:text-yellow sm:text-2xl">
                {SITE.email}
              </a>
            </div>
            <div className="reveal" style={{ "--delay": "0.05s" } as React.CSSProperties}>
              <p className="label text-cream/40">WhatsApp</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-xl transition-colors hover:text-yellow sm:text-2xl"
              >
                {SITE.whatsappLabel}
              </a>
            </div>
            <div className="reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              <p className="label text-cream/40">Estudio</p>
              <p className="mt-3 text-xl sm:text-2xl">
                {SITE.city}, {SITE.region}
              </p>
            </div>
            <p className="reveal max-w-[34ch] text-sm leading-relaxed text-cream/45" style={{ "--delay": "0.15s" } as React.CSSProperties}>
              Respondemos en menos de 24 horas hábiles. Cada consulta la lee una persona del equipo.
            </p>
          </div>

          <form onSubmit={onSubmit} className="reveal relative space-y-10 md:col-span-7 md:col-start-6" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            <fieldset>
              <legend className="label text-cream/40">Me interesa</legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={interest === i}
                    onClick={() => setInterest(i)}
                    className={`border px-4 py-2 text-sm transition-colors duration-300 ${
                      interest === i
                        ? "border-yellow bg-yellow text-ink"
                        : "border-[var(--line-dark)] text-cream/70 hover:border-cream/50"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-10 sm:grid-cols-2">
              <label className="block">
                <span className="label text-cream/40">Nombre</span>
                <input name="name" required maxLength={120} autoComplete="name" placeholder="Tu nombre" className={field} />
              </label>
              <label className="block">
                <span className="label text-cream/40">Empresa</span>
                <input name="company" maxLength={160} autoComplete="organization" placeholder="Opcional" className={field} />
              </label>
              <label className="block">
                <span className="label text-cream/40">Email</span>
                <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="Para responderte" className={field} />
              </label>
              <label className="block">
                <span className="label text-cream/40">Teléfono</span>
                <input name="phone" type="tel" maxLength={60} autoComplete="tel" placeholder="Opcional" className={field} />
              </label>
            </div>

            {/* Honeypot anti-spam: oculto para personas */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <label className="block">
              <span className="label text-cream/40">Contanos</span>
              <textarea
                name="message"
                required
                maxLength={5000}
                rows={3}
                placeholder="Qué necesitás resolver, plazos, lo que quieras."
                className={`${field} resize-none`}
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-6">
              <p className="max-w-[44ch] text-sm text-cream/40" aria-live="polite">
                {status === "sent" ? (
                  <span className="flex items-center gap-2 text-cream">
                    <Check size={16} strokeWidth={1.5} className="shrink-0 text-yellow" /> ¡Gracias! Recibimos tu consulta y te respondemos pronto.
                  </span>
                ) : status === "error" ? (
                  <span className="text-cream/70">
                    No pudimos enviarla.{" "}
                    <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="text-yellow underline underline-offset-4">
                      Mandala por WhatsApp
                    </a>
                  </span>
                ) : (
                  <>
                    Te respondemos a tu mail. ¿Preferís WhatsApp?{" "}
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-cream/70 underline underline-offset-4 hover:text-yellow">
                      Escribinos
                    </a>
                  </>
                )}
              </p>
              <button type="submit" disabled={status === "sending"} className="btn btn-solid disabled:opacity-60">
                {status === "sending" ? "Enviando…" : "Enviar consulta"} <ArrowUpRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
