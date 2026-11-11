import { z } from "zod"
import { SITE } from "@/lib/site"

/**
 * Consultas del formulario de contacto → mail vía Resend.
 *
 * Variables de entorno (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  (obligatoria) clave de https://resend.com/api-keys
 *   CONTACT_TO      (opcional) a dónde llegan; por defecto SITE.email
 *   CONTACT_FROM    (opcional) remitente; por defecto soporte@webistudio.net
 *                   (dominio ya verificado en Resend, el mismo que usa .budgets).
 */

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().default(""),
  phone: z.string().trim().max(60).optional().default(""),
  interest: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(1).max(5000),
  // Honeypot: los humanos no lo ven, los bots lo llenan
  website: z.string().optional().default(""),
})

// Límite simple por IP (por instancia): 5 envíos cada 10 minutos
const hits = new Map<string, number[]>()
const WINDOW = 10 * 60 * 1000
function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key) return Response.json({ error: "not_configured" }, { status: 503 })

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 })

  const parsed = schema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 })
  const d = parsed.data
  // Bot: respondemos ok pero no mandamos nada
  if (d.website) return Response.json({ ok: true })

  const rows: [string, string][] = [
    ["Nombre", d.name],
    ["Email", d.email],
    ["Empresa", d.company],
    ["Teléfono", d.phone],
    ["Le interesa", d.interest],
  ].filter(([, v]) => v) as [string, string][]

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", d.message].join("\n")
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px;color:#0a0a0a">
      <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#888;margin:0 0 16px">Nueva consulta · webistudio.net</p>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 0;padding:16px;background:#f3f1ec;font-size:15px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</p>
      <p style="margin:20px 0 0;font-size:13px;color:#888">Respondé este mail para contestarle directo a ${esc(d.name)}.</p>
    </div>`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Webi. Consultas <soporte@webistudio.net>",
      to: [process.env.CONTACT_TO || SITE.email],
      reply_to: d.email,
      subject: `Consulta de ${d.name}${d.interest ? ` · ${d.interest}` : ""}`,
      text,
      html,
    }),
  })

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""))
    return Response.json({ error: "send_failed" }, { status: 502 })
  }
  return Response.json({ ok: true })
}
