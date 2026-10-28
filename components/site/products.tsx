import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { PRODUCTS, type Product } from "@/lib/site"

const STATUS_STYLE: Record<Product["status"], string> = {
  Disponible: "text-[#7ddc9b] before:bg-[#7ddc9b] before:animate-pulse",
  Nuevo: "text-yellow before:bg-yellow",
  "En desarrollo": "text-cream/60 before:bg-cream/60",
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const flip = index % 2 === 1
  const external = product.cta.href.startsWith("http")

  return (
    <article
      id={product.id}
      aria-labelledby={`${product.id}-title`}
      className="grid items-center gap-10 border-t border-[var(--line-dark)] py-[clamp(4rem,8vw,7.5rem)] lg:grid-cols-12 lg:gap-16"
    >
      {/* Texto */}
      <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
        <div className="reveal flex items-center justify-between gap-6">
          <span className="label text-cream/40">0{index + 1} — {product.kicker}</span>
          <span className={`label !tracking-[0.2em] before:block before:h-1.5 before:w-1.5 before:rounded-full ${STATUS_STYLE[product.status]}`}>
            {product.status}
          </span>
        </div>

        <Image
          src={product.logo.src}
          alt={product.name}
          width={product.logo.width}
          height={product.logo.height}
          className="reveal mt-10 h-[clamp(34px,4vw,52px)] w-auto"
          style={{ "--delay": "0.05s" } as React.CSSProperties}
        />

        <h3
          id={`${product.id}-title`}
          className="reveal mt-8 text-[clamp(1.75rem,2.8vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]"
          style={{ "--delay": "0.1s" } as React.CSSProperties}
        >
          {product.title}
        </h3>
        <p className="reveal mt-6 max-w-[46ch] leading-relaxed text-cream/60" style={{ "--delay": "0.15s" } as React.CSSProperties}>
          {product.description}
        </p>

        <ul className="reveal mt-8 grid grid-cols-2 border-t border-[var(--line-dark)]" style={{ "--delay": "0.2s" } as React.CSSProperties}>
          {product.features.map((f, i) => (
            <li
              key={f}
              className={`border-b border-[var(--line-dark)] py-3.5 text-sm text-cream/75 ${i % 2 === 0 ? "pr-4" : "border-l pl-4"}`}
            >
              {f}
            </li>
          ))}
        </ul>

        <a
          href={product.cta.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="reveal link mt-10 text-cream"
          style={{ "--delay": "0.25s" } as React.CSSProperties}
        >
          {product.cta.label} <ArrowUpRight size={15} strokeWidth={1.5} />
        </a>
      </div>

      {/* Imagen */}
      <div className={`reveal relative lg:col-span-7 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-6"}`} style={{ "--delay": "0.1s" } as React.CSSProperties}>
        <figure className="overflow-hidden rounded-[6px] border border-[var(--line-dark)] bg-ink-2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-1.5 border-b border-[var(--line-dark)] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-cream/15" />
            <span className="h-2 w-2 rounded-full bg-cream/15" />
            <span className="h-2 w-2 rounded-full bg-cream/15" />
          </div>
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="block h-auto w-full"
          />
        </figure>

        {product.mobile && (
          <Image
            src={product.mobile.src}
            alt={product.mobile.alt}
            width={product.mobile.width}
            height={product.mobile.height}
            sizes="200px"
            className={`absolute -bottom-10 w-[26%] max-w-[210px] rounded-[18px] border-[5px] border-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ${
              flip ? "-right-4 sm:-right-6" : "-left-4 sm:-left-6"
            }`}
          />
        )}
      </div>
    </article>
  )
}

export function Products() {
  return (
    <section id="productos" data-nav="dark" aria-labelledby="productos-title" className="bg-ink text-cream">
      <div className="wrap pt-[clamp(6rem,11vw,10rem)]">
        <div className="grid gap-10 pb-[clamp(3rem,6vw,5rem)] md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label label-line text-yellow reveal">Productos propios</p>
            <h2 id="productos-title" className="heading mt-8 reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
              Software <span className="text-cream/40">.webi</span>, listo para usar.
            </h2>
          </div>
          <p className="lead self-end text-cream/55 md:col-span-4 md:col-start-9 reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            Además de trabajar a medida, construimos nuestros propios sistemas. Nacen de problemas
            reales de nuestros clientes y hoy los usan negocios todos los días.
          </p>
        </div>

        {PRODUCTS.map((p, i) => (
          <ProductRow key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
