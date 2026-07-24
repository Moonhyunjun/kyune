import Link from "next/link";
import { formatKRW, type Product } from "@/lib/products";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.nameKo}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {typeof index === "number" && (
          <span className="absolute left-2.5 top-2.5 font-mono text-[9px] tracking-[0.2em] text-mist">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] transition-colors group-hover:text-accent">
          {product.name}
        </p>
        <p className="shrink-0 font-mono text-[11px] text-ink/70">
          {formatKRW(product.price)}
        </p>
      </div>
    </Link>
  );
}
