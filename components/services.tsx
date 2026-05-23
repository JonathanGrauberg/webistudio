"use client"

import { useEffect, useRef } from "react"
import { ArrowUpRight, Monitor, Cog, ShoppingCart, Share2 } from "lucide-react"

const services = [
  {
    title: "Sistemas Web a Medida",
    description:
      "Plataformas personalizadas según los procesos internos de tu empresa. Automatización, gestión de datos y control total.",
    icon: Cog,
    highlight: true,
  },
  {
    title: "Desarrollo Web",
    description:
      "Landing pages, páginas institucionales y ecommerce. Sitios modernos, rápidos y optimizados para convertir visitantes en clientes.",
    icon: Monitor,
    highlight: false,
  },
  {
    title: "Ecommerce",
    description:
      "Tiendas online profesionales con catálogo, carrito de compras, pagos integrados y gestión de pedidos.",
    icon: ShoppingCart,
    highlight: false,
  },
  {
    title: "Gestión de Redes Sociales",
    description:
      "Planificación, creación de contenido, diseño y publicación. Mantené tu presencia digital activa y profesional.",
    icon: Share2,
    highlight: false,
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.05 }
    )
    const elements = sectionRef.current?.querySelectorAll(".reveal")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .services-section {
  background: #000000;
  padding: 8rem 2rem;
  position: relative;
  z-index: 5; /* 🔥 CLAVE */
}

/* 🔥 CONEXIÓN VISUAL CON HERO */
.services-section::before {
  content: '';
  position: absolute;
  top: -120px;
  left: 0;
  width: 100%;
  height: 120px;
  background: linear-gradient(to bottom, transparent, #000000);
  pointer-events: none;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.services-header {
  margin-bottom: 5rem;
}

.services-tag {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fcc107;
  margin-bottom: 1rem;
}

.services-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

/* Cards */
.service-card {
  background: rgba(20,20,20,0.9);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
}

.service-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255,255,255,0.2);
  background: rgba(30,30,30,0.95);
}

.service-card.highlighted {
  border-color: rgba(252,193,7,0.4);
  background: rgba(252,193,7,0.05);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: white;
}

.service-card.highlighted .icon-wrapper {
  color: #fcc107;
  background: rgba(252,193,7,0.1);
}

.card-title {
  font-size: 1.2rem;
  color: #ffffff;
}

.arrow-icon {
  color: rgba(255,255,255,0.4);
}

.service-card:hover .arrow-icon {
  color: white;
}

.card-desc {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.6);
  margin-top: 1rem;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s ease;
}

.reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
      `}</style>

      <section ref={sectionRef} id="servicios" className="services-section">
        <div className="services-container">

          <div className="services-header reveal">
            <span className="services-tag">Nuestros Servicios</span>
            <h2 className="services-title">SERVICIOS</h2>
          </div>

          <div className="services-grid">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className={`service-card reveal ${service.highlight ? "highlighted" : ""}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="icon-wrapper">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div className="card-header-flex">
                    <h3 className="card-title">{service.title}</h3>
                    <ArrowUpRight size={16} className="arrow-icon" />
                  </div>

                  <p className="card-desc">{service.description}</p>
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}