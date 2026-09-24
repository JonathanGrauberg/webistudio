"use client"
//components\portfolio.tsx
import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"

type ProjectGroup = "sistemas" | "webs"

interface Project {
  name: string
  logo?: string
  category: string
  description: string
  backgroundImage: string
  group: ProjectGroup
  url?: string
}

const rows: { group: ProjectGroup; title: string; subtitle: string }[] = [
  { group: "sistemas", title: "Sistemas a medida", subtitle: "Software de gestión hecho para cada operación" },
  { group: "webs", title: "Webs, Ecommerce & Contenido", subtitle: "Presencia digital que convierte" },
]

const projects: Project[] = [
  // ── Sistemas a medida ──
  {
    name: "Centro Medico",
    logo: "/logos/igm.png",
    category: "Sistema Web",
    description: "Sistema digital para centros médicos que simplifica la carga de archivos clínicos y automatiza usuarios, mejorando la gestión y reduciendo el uso de papel.",
    backgroundImage: "/projects/igm.png",
    group: "sistemas",
  },
  {
    name: "OICSA",
    logo: "/logos/oicsa.png",
    category: "Sistema de Stock",
    description: "Software de gestión desarrollado a medida para optimizar el control de stock, vales internos y logística operativa en empresas industriales.",
    backgroundImage: "/projects/oicsa.png",
    group: "sistemas",
  },
  {
    name: "Ecoservicios",
    logo: "/logos/ecoservicios.png",
    category: "Sistema + Marketing",
    description: "Plataforma de gestión comercial con presupuestos, stock, clientes y generación automática de PDFs personalizados.",
    backgroundImage: "/projects/ecoservicios.png",
    group: "sistemas",
  },
  {
    name: "Neostone",
    logo: "/logos/neostone.png",
    category: "Plataforma Corporativa",
    description: "Plataforma corporativa con catálogo dinámico y cotización en tiempo real. Orientada a clientes B2B, optimiza la gestión comercial digital.",
    backgroundImage: "/projects/neostone.png",
    group: "sistemas",
  },

  // ── Webs, Ecommerce & Contenido ──
  {
    name: "SEM Emergencias",
    category: "Sitio Institucional",
    description: "Sitio institucional para un servicio de emergencias médicas 24 hs en Paraná. Coberturas para personas y empresas, contactos de emergencia y llamado directo en un clic.",
    backgroundImage: "/projects/sem.png",
    group: "webs",
    url: "https://www.sememergencias.com.ar",
  },
  {
    name: "Oxymoron Legal",
    category: "Sitio Corporativo",
    description: "Sitio para estudio jurídico boutique especializado en derecho internacional e intangibles. Diseño editorial y sobrio, enfocado en agendar consultas.",
    backgroundImage: "/projects/oxymoron-legal.png",
    group: "webs",
    url: "https://legal.oxymoron.com.ar",
  },
  {
    name: "Oxymoron",
    category: "Sitio Corporativo",
    description: "Sitio corporativo para consultora en profesionalización de empresas: servicios, equipo, novedades y contacto.",
    backgroundImage: "/projects/oxymoron.png",
    group: "webs",
    url: "https://oxymoron.com.ar",
  },
  // TODO: sumar captura en /projects/rosedeko.png (el dominio rosedeko.shop no resolvía al armarlo)
  // {
  //   name: "Rosedeko",
  //   category: "Ecommerce",
  //   description: "Tienda online con catálogo, carrito y pagos integrados.",
  //   backgroundImage: "/projects/rosedeko.png",
  //   group: "webs",
  //   url: "https://rosedeko.shop",
  // },
  {
    name: "Art y Deco Lizz",
    logo: "/logos/artydeco.png",
    category: "Ecommerce",
    description: "Ecommerce con carrito, pagos integrados y gestión de pedidos. Incluye panel de administración y diseño enfocado en conversión.",
    backgroundImage: "/projects/artydeco.png",
    group: "webs",
  },
  {
    name: "Quede Verde",
    logo: "/logos/quedeverde.png",
    category: "Ecommerce",
    description: "Ecommerce de marca propia con foco en diseño, experiencia de usuario y conversión. Desarrollo integral desde branding hasta venta online optimizada.",
    backgroundImage: "/projects/quedeverde.png",
    group: "webs",
  },
  {
    name: "Solen",
    logo: "/logos/solen.png",
    category: "Web + Contenido",
    description: "Sitio web corporativo para empresa de energía solar junto a contenido audiovisual para redes. Orientado a captar clientes y comunicar servicios técnicos.",
    backgroundImage: "/projects/solen.png",
    group: "webs",
  },
  {
    name: "Invitaciones Digitales",
    category: "Desarrollo Web",
    description: "Invitaciones digitales con RSVP, recordatorios, cuenta regresiva y base de datos de invitados. Experiencia interactiva y totalmente personalizable.",
    backgroundImage: "/projects/invitaciones.png",
    group: "webs",
  },
  {
    name: "Nova Piscinas - CDU",
    logo: "/logos/nova.png",
    category: "Edición de Video",
    description: "Edición continua de contenido audiovisual para redes sociales. Optimización de material semanal para mejorar alcance, impacto visual y presencia digital.",
    backgroundImage: "/projects/nova.png",
    group: "webs",
  },
  {
    name: "Ecoef",
    logo: "/logos/ecoef.png",
    category: "Marketing & Branding",
    description: "Gestión integral de marca con contenido para redes, cartelería, piezas gráficas y recursos digitales. Desarrollo de identidad y presencia comercial consistente.",
    backgroundImage: "/projects/ecoef.png",
    group: "webs",
  },
]

function ProjectRow({
  title,
  subtitle,
  items,
  selectedIndex,
  onSelect,
}: {
  title: string
  subtitle: string
  items: { project: Project; index: number }[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollPosition = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollPosition)
      window.addEventListener("resize", checkScrollPosition)
      checkScrollPosition()
      return () => {
        carousel.removeEventListener("scroll", checkScrollPosition)
        window.removeEventListener("resize", checkScrollPosition)
      }
    }
  }, [checkScrollPosition])

  const scrollCarousel = useCallback((direction: "left" | "right") => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth"
      })
    }
  }, [])

  return (
    <div>
      {/* Row title — estilo Netflix */}
      <div className="flex items-baseline gap-3 px-2 sm:px-6 md:px-8 mb-1">
        <h3 className="text-white font-bold text-base sm:text-lg md:text-xl tracking-tight">
          {title}<span className="text-primary">.</span>
        </h3>
        <p className="hidden sm:block text-white/40 text-xs sm:text-sm">{subtitle}</p>
      </div>

      <div className="relative">
        {/* Scroll arrows */}
        <button
          onClick={() => scrollCarousel("left")}
          className={`absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollCarousel("right")}
          className={`absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Cards */}
        <div
          ref={carouselRef}
          className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-3 sm:py-4 px-2 sm:px-6 md:px-8 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map(({ project, index }) => {
            const isSelected = index === selectedIndex

            return (
              <button
                key={project.name}
                onClick={() => onSelect(index)}
                className={`group relative shrink-0 rounded-xl overflow-hidden transition-all duration-300
                  w-36 sm:w-44 md:w-52 aspect-[4/3]
                  ${isSelected
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-black scale-105 z-10"
                    : "opacity-70 hover:opacity-100 hover:scale-[1.02]"
                  }`}
              >
                <Image
                  src={project.backgroundImage}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-colors duration-300 ${
                  isSelected ? "bg-black/30" : "bg-black/50 group-hover:bg-black/40"
                }`} />

                {/* Icon badge */}
                <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden transition-all duration-300 ${
                  isSelected ? "-translate-y-1" : ""
                }`}>
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/15 rounded-lg text-white font-bold text-sm sm:text-base">
                      {project.name.charAt(0)}<span className="text-primary">.</span>
                    </div>
                  )}
                </div>

                {/* Name & category */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/80 to-transparent text-left">
                  <p className={`font-semibold text-xs sm:text-sm transition-colors ${
                    isSelected ? "text-white" : "text-white/90"
                  }`}>
                    {project.name}
                  </p>
                  <p className={`text-[10px] sm:text-xs mt-0.5 transition-colors ${
                    isSelected ? "text-primary" : "text-white/60"
                  }`}>
                    {project.category}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null

  // Reveal animations for carousel and other elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in")
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Separate observer just for the title
  useEffect(() => {
    if (!titleRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setTitleVisible(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  // Deselect when clicking outside the section
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setSelectedIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectProject = useCallback((index: number) => {
    if (index !== selectedIndex) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedIndex(index)
        setTimeout(() => setIsTransitioning(false), 50)
      }, 200)
    }
  }, [selectedIndex])

  const handlePrevProject = useCallback(() => {
    const current = selectedIndex ?? 0
    handleSelectProject(current === 0 ? projects.length - 1 : current - 1)
  }, [selectedIndex, handleSelectProject])

  const handleNextProject = useCallback(() => {
    const current = selectedIndex ?? -1
    handleSelectProject(current === projects.length - 1 ? 0 : current + 1)
  }, [selectedIndex, handleSelectProject])

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevProject()
      if (e.key === "ArrowRight") handleNextProject()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, handlePrevProject, handleNextProject])

  // Ficha del proyecto seleccionado — se abre entre las dos filas
  const projectInfo = (
    <div
      className={`grid transition-all duration-500 ease-in-out ${
        selectedProject ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div
          className={`max-w-xl px-2 sm:px-6 md:px-8 py-4 sm:py-8 transition-all duration-500 ${
            selectedProject && !isTransitioning
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {selectedProject && (
            <>
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-semibold tracking-wider uppercase bg-primary/20 text-primary rounded-full mb-3 sm:mb-4 backdrop-blur-sm border border-primary/30">
                {selectedProject.category}
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
                {selectedProject.name.toUpperCase()}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300/90 leading-relaxed max-w-lg">
                {selectedProject.description}
              </p>
              {selectedProject.url && (
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary hover:gap-3 transition-all"
                >
                  Visitar sitio <ArrowUpRight size={16} />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className={`relative overflow-hidden bg-black transition-all duration-700 ease-in-out ${
        selectedProject ? "min-h-[90vh] lg:min-h-screen" : "min-h-0"
      }`}
    >
      {/* Background images — only visible when a project is selected */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={project.name}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === selectedIndex && !isTransitioning ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={project.backgroundImage}
              alt={project.name}
              fill
              className="object-cover scale-105"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main layout */}
      <div className={`relative z-10 flex flex-col transition-all duration-700 ease-in-out px-4 sm:px-8 md:px-12 lg:px-16 py-10 lg:py-16 ${
        selectedProject ? "min-h-[90vh] lg:min-h-screen" : "min-h-0"
      }`}>

        {/* Title — animates size and position based on selection */}
        <div
          ref={titleRef}
          className={`text-center transition-all duration-700 ease-in-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${
            selectedProject ? "mt-0 mb-6 sm:mb-8" : "mt-8 mb-6 sm:mb-8"
          }`}
        >
          <p className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase mb-2">
            Portfolio
          </p>
          <h2
            className={`font-bold tracking-tight text-white transition-all duration-700 ease-in-out ${
              selectedProject
                ? "text-3xl sm:text-4xl md:text-5xl"
                : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            PROYECTOS
          </h2>
          <p className="text-primary/60 text-xs sm:text-sm font-medium tracking-widest uppercase mb-2">Hacé click en la empresa</p>
        </div>

        <div className="flex-1" />

        {/* Carousels — la ficha del proyecto se abre entre las dos filas */}
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 flex flex-col gap-4 sm:gap-6">
          {rows.map((row, rowIndex) => (
            <div key={row.group} className="contents">
              {rowIndex === 1 && projectInfo}
              <ProjectRow
                title={row.title}
                subtitle={row.subtitle}
                items={projects
                  .map((project, index) => ({ project, index }))
                  .filter(({ project }) => project.group === row.group)}
                selectedIndex={selectedIndex}
                onSelect={handleSelectProject}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
