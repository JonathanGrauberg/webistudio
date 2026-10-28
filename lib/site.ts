// Datos del estudio y contenido del sitio, en un solo lugar.

export const SITE = {
  name: "Webi.",
  legalName: "Webi Studio",
  url: "https://webistudio.net",
  // TODO: confirmar que esta casilla exista (webistudio.net tiene correo en Hostinger)
  email: "hola@webistudio.net",
  whatsapp: "5493436959359",
  whatsappLabel: "+54 9 343 695 9359",
  city: "Paraná",
  region: "Entre Ríos",
  country: "Argentina",
  description:
    "Estudio digital en Paraná, Entre Ríos. Desarrollamos sistemas de gestión a medida, productos SaaS y sitios web para empresas de Argentina.",
  socials: {
    instagram: "https://www.instagram.com/webi.by.grauberg/",
    linkedin: "https://www.linkedin.com/company/webi-studio/",
  },
} as const

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`

// ── Productos propios ──────────────────────────────────────────────

export type ProductStatus = "Disponible" | "Nuevo" | "En desarrollo"

export interface Product {
  id: string
  name: string
  logo: { src: string; width: number; height: number }
  status: ProductStatus
  kicker: string
  title: string
  description: string
  features: string[]
  image: { src: string; width: number; height: number; alt: string }
  /** Captura vertical opcional (se muestra como celular sobre la principal) */
  mobile?: { src: string; width: number; height: number; alt: string }
  cta: { label: string; href: string }
}

export const PRODUCTS: Product[] = [
  {
    id: "budgets",
    name: ".budgets",
    logo: { src: "/products/budgets-logo.png", width: 1080, height: 300 },
    status: "Disponible",
    kicker: "Gestión comercial",
    title: "Presupuestá, cobrá y controlá tu negocio en un solo lugar.",
    description:
      "Presupuestos con tu marca en segundos, órdenes de trabajo, remitos y recibos, stock, gastos y cobros con Mercado Pago. Lo usan comercios y talleres todos los días.",
    features: ["Presupuestos en PDF con tu marca", "Órdenes de trabajo con QR", "Cobros con Mercado Pago", "Stock, gastos y tareas"],
    image: { src: "/work/budgets-dashboard.webp", width: 1600, height: 759, alt: "Panel principal de .budgets con métricas de ventas y presupuestos" },
    cta: { label: "Probar .budgets", href: "https://budgets.webistudio.net" },
  },
  {
    id: "yatay",
    name: "Yatay",
    logo: { src: "/products/yatay-marca-blanco.png", width: 720, height: 261 },
    status: "Nuevo",
    kicker: "Gestión gastronómica",
    title: "Tu local, en orden de la carta a la caja.",
    description:
      "Para restaurantes, bares, cafeterías y heladerías. Carta QR, pedidos a cocina y barra, sala, caja, reservas online, compras y métricas. Hecho en Paraná, para Argentina y España.",
    features: ["Carta QR por mesa", "Pedidos a cocina y barra", "Caja y reservas online", "Métricas del local"],
    image: { src: "/work/yatay.webp", width: 1600, height: 1000, alt: "Portada de Yatay, sistema de gestión gastronómica" },
    mobile: { src: "/work/yatay-carta.webp", width: 430, height: 932, alt: "Carta digital de un restaurante en Yatay vista desde el celular" },
    // TODO: pasar a https://yatay.app cuando esté el dominio
    cta: { label: "Conocer Yatay", href: "https://app-resto-tawny.vercel.app" },
  },
  {
    id: "clinika",
    name: ".clinika",
    logo: { src: "/products/clinika-logo-white.png", width: 704, height: 230 },
    status: "En desarrollo",
    kicker: "Gestión médica",
    title: "La gestión de tu clínica, simple.",
    description:
      "Turnos por profesional, pacientes, estudios y facturación en una plataforma pensada para centros de salud, con auditoría desde el primer día. Estamos sumando clínicas para la primera etapa.",
    features: ["Agenda de turnos", "Historia de pacientes", "Estudios y facturación", "Auditoría de accesos"],
    image: { src: "/work/clinika-turnos.webp", width: 1533, height: 727, alt: "Agenda semanal de turnos en .clinika" },
    cta: { label: "Quiero probarlo", href: whatsappLink("Hola! Me interesa probar .clinika") },
  },
]

// ── Trabajos ───────────────────────────────────────────────────────

export type WorkKind = "Sistema" | "Sitio web"

export interface Work {
  id: string
  name: string
  kind: WorkKind
  category: string
  description: string
  image: { src: string; width: number; height: number }
  url?: string
  /** Producto propio de Webi (se marca distinto en la vidriera) */
  own?: boolean
}

export const WORKS: Work[] = [
  {
    id: "oicsa",
    name: "OIC.SA",
    kind: "Sistema",
    category: "CRM y gestión operativa",
    description:
      "Sistema interno para una de las constructoras viales más importantes de Entre Ríos: stock, vales de combustible que se presentan en estaciones, flota por patente e instaladores.",
    image: { src: "/work/oicsa.webp", width: 1600, height: 900 },
  },
  {
    id: "budgets-work",
    name: ".budgets",
    kind: "Sistema",
    category: "Producto propio · Gestión comercial",
    description: "Presupuestos con tu marca, órdenes de trabajo con QR, remitos, stock y cobros con Mercado Pago. Lo usan comercios y talleres todos los días.",
    image: { src: "/work/budgets-dashboard.webp", width: 1600, height: 759 },
    url: "https://budgets.webistudio.net",
    own: true,
  },
  {
    id: "neostone",
    name: "Neostone",
    kind: "Sitio web",
    category: "Sitio corporativo",
    description: "Sitio para una empresa de amoblamientos de Crespo: colecciones, showrooms y experiencia en realidad virtual.",
    image: { src: "/work/neostone.webp", width: 1600, height: 1000 },
    // TODO: pasar a https://neostone.com.ar cuando estén los DNS
    url: "https://nuevaneostone.vercel.app",
  },
  {
    id: "yatay-work",
    name: "Yatay",
    kind: "Sistema",
    category: "Producto propio · Gastronomía",
    description: "Gestión para restaurantes, bares y cafeterías: carta QR por mesa, pedidos a cocina y barra, caja, reservas online y métricas.",
    image: { src: "/work/yatay.webp", width: 1600, height: 1000 },
    // TODO: pasar a https://yatay.app cuando esté el dominio
    url: "https://app-resto-tawny.vercel.app",
    own: true,
  },
  {
    id: "ecoservicios",
    name: "Ecoservicios",
    kind: "Sistema",
    category: "Gestión comercial",
    description: "Plataforma de presupuestos, stock y clientes, con generación automática de documentos en PDF con la marca de la empresa.",
    image: { src: "/work/ecoservicios.webp", width: 1600, height: 900 },
  },
  {
    id: "mysandy",
    name: "My Sandy",
    kind: "Sitio web",
    category: "Sitio de marca",
    description: "Sitio editorial para una tienda de indumentaria de Paraná: propósito, ubicación y contacto, con la estética de la marca.",
    image: { src: "/work/mysandy.webp", width: 1600, height: 1000 },
    url: "https://my-sandy-one.vercel.app",
  },
  {
    id: "clinika-work",
    name: ".clinika",
    kind: "Sistema",
    category: "Producto propio · Salud",
    description: "Turnos por profesional, pacientes, estudios y facturación para centros de salud, con auditoría desde el primer día. En desarrollo.",
    image: { src: "/work/clinika-turnos.webp", width: 1533, height: 727 },
    own: true,
  },
  {
    id: "oxymoron",
    name: "Oxymoron",
    kind: "Sitio web",
    category: "Sitio corporativo",
    description: "Sitio para una consultora en profesionalización de empresas y gestión de entidades deportivas.",
    image: { src: "/work/oxymoron.webp", width: 1600, height: 1000 },
    url: "https://oxymoron.com.ar",
  },
  {
    id: "oxymoron-legal",
    name: "Oxymoron Legal",
    kind: "Sitio web",
    category: "Estudio jurídico",
    description: "Sitio para un estudio boutique de derecho internacional e intangibles, pensado para agendar consultas.",
    image: { src: "/work/oxymoron-legal.webp", width: 1600, height: 1000 },
    url: "https://legal.oxymoron.com.ar",
  },
  {
    id: "igm",
    name: "Centro Médico",
    kind: "Sistema",
    category: "Gestión de archivos clínicos",
    description: "Sistema para centros médicos que digitaliza la carga de estudios y automatiza el alta de usuarios.",
    image: { src: "/work/igm.webp", width: 1600, height: 900 },
  },
  {
    id: "sem",
    name: "SEM Emergencias",
    kind: "Sitio web",
    category: "Sitio institucional",
    description: "Sitio para un servicio de emergencias médicas 24 hs: coberturas, contactos de emergencia y llamado en un clic.",
    image: { src: "/work/sem.webp", width: 1600, height: 1000 },
    url: "https://www.sememergencias.com.ar",
  },
]

/** Trabajos anteriores, en lista compacta */
export const MORE_WORKS = [
  { name: "Art y Deco Lizz", category: "Ecommerce" },
  { name: "Quede Verde", category: "Ecommerce" },
  { name: "Solen", category: "Sitio web y contenido" },
  { name: "Nova Piscinas", category: "Contenido audiovisual" },
  { name: "Invitaciones digitales", category: "Desarrollo web" },
]

/** Logos de la franja de marcas (blancos, generados en public/brands) */
export const BRANDS = [
  { name: "OIC.SA", src: "/brands/oicsa.png", width: 535, height: 160 },
  { name: "Neostone", src: "/brands/neostone.png", width: 230, height: 160 },
  { name: "Ecoservicios", src: "/brands/ecoservicios.png", width: 394, height: 160 },
  { name: "Oxymoron", src: "/brands/oxymoron.png", width: 689, height: 160 },
  { name: "My Sandy", src: "/brands/mysandy.png", width: 178, height: 160 },
  { name: "Yatay", src: "/brands/yatay.png", width: 441, height: 160 },
  { name: "Centro Médico", src: "/brands/igm.png", width: 141, height: 160 },
  { name: "Nova Piscinas", src: "/brands/nova.png", width: 242, height: 160 },
  { name: "Quede Verde", src: "/brands/quedeverde.png", width: 113, height: 160 },
  { name: "Solen", src: "/brands/solen.png", width: 160, height: 160 },
  { name: "Art y Deco Lizz", src: "/brands/artydeco.png", width: 160, height: 160 },
]
