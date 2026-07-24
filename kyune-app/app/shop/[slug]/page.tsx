import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, formatKRW } from "@/lib/products";
import AddToCart from "@/components/AddToCart";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const index = products.findIndex((p) => p.slug === product.slug);

  const specs: [string, string][] = [
    ["MATERIAL", product.material],
    ["SIZE", product.size],
    ["FINISH", product.finish],
    ["WEIGHT", product.weight],
    ["LEAD TIME", product.leadTime],
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <nav className="reveal flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-mist">
        <Link href="/shop" className="transition-colors hover:text-ink">
          SHOP
        </Link>
        <span>/</span>
        <span className="text-ink/70">
          {String(index + 1).padStart(2, "0")} — {product.name.toUpperCase()}
        </span>
      </nav>

      <div className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal self-start lg:sticky lg:top-24" data-d="1">
          <div className="overflow-hidden border border-line bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.nameKo}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="reveal lg:pt-4" data-d="2">
          <h1 className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1 text-[14px] text-mist">{product.nameKo}</p>
          <p className="mt-6 font-mono text-lg">{formatKRW(product.price)}</p>

          <p className="mt-8 max-w-md text-[14px] leading-8 text-ink/80">
            {product.description}
          </p>

          <dl className="mt-10 border-t border-line">
            {specs.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline border-b border-line py-3.5"
              >
                <dt className="w-28 shrink-0 font-mono text-[11px] tracking-[0.14em] text-mist">
                  {k}
                </dt>
                <dd className="text-[13px]">{v}</dd>
              </div>
            ))}
          </dl>

          <AddToCart slug={product.slug} />

          <p className="mt-8 text-[12px] leading-6 text-mist">
            관리법 — 부드러운 마른 천으로 닦아주세요. 물기가 닿은 경우 바로
            건조하면 오래 사용할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
