import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { SITE } from "@/lib/site"
import "./globals.css"

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "./fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
})

const TITLE = "Webi. Estudio digital | Sistemas a medida y desarrollo web en Paraná"

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s | Webi.",
  },
  description: SITE.description,
  applicationName: "Webi.",
  keywords: [
    "estudio digital",
    "desarrollo web Paraná",
    "sistemas a medida",
    "software de gestión",
    "diseño web Entre Ríos",
    "desarrollo de software Argentina",
    "CRM a medida",
    "sistema de presupuestos",
    "software para restaurantes",
    "software para clínicas",
  ],
  authors: [{ name: "Webi Studio", url: SITE.url }],
  creator: "Webi Studio",
  publisher: "Webi Studio",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Webi.",
    title: TITLE,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
}

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
}

// Datos estructurados: quiénes somos, dónde estamos y qué productos tenemos
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#organization`,
      name: SITE.legalName,
      alternateName: "Webi.",
      url: SITE.url,
      logo: `${SITE.url}/icon.png`,
      image: `${SITE.url}/opengraph-image.jpg`,
      description: SITE.description,
      email: SITE.email,
      telephone: `+${SITE.whatsapp}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: "AR",
      },
      areaServed: { "@type": "Country", name: "Argentina" },
      sameAs: [SITE.socials.instagram, SITE.socials.linkedin],
      knowsAbout: ["Desarrollo de software a medida", "Desarrollo web", "Ecommerce", "Sistemas de gestión", "SEO"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: "Webi.",
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: ".budgets",
      url: "https://budgets.webistudio.net",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Windows",
      description: "Software de gestión comercial: presupuestos, órdenes de trabajo, remitos, stock y cobros con Mercado Pago.",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Yatay",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Gestión gastronómica para restaurantes, bares y cafeterías: carta QR, pedidos, caja y reservas.",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={satoshi.variable} suppressHydrationWarning>
      <head>
        {/* Marca la página como "con JS" antes de pintar, para las animaciones de aparición */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
