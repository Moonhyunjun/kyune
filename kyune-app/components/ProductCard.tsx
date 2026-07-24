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
      <div className="relative overflow-hidden rounded-xl bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.nameKo}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {typeof index === "number" && (
          <span className="absolute left-2.5 top-2.5 font-mono text-[10px] tracking-[0.2em] text-mist">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <p className="text-[13px] font-medium uppercase tracking-[0.1em] transition-colors group-hover:text-accent">
          {product.name}
        </p>
        <p className="shrink-0 font-mono text-[12.5px] text-ink/80">
          {formatKRW(product.price)}
        </p>
      </div>
    </Link>
  );
}
