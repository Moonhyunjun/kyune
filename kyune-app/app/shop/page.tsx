import type { Metadata } from "next";
import Link from "next/link";
import { products, type Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description: "아침과 밤의 리추얼을 담는 KYUNE 오브제 전체 제품.",
};

const allCategories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "morning", label: "MORNING" },
  { key: "night", label: "NIGHT" },
];

/** 상품이 하나도 없는 카테고리 탭은 노출하지 않는다. */
const categories = allCategories.filter(
  (c) => c.key === "all" || products.some((p) => p.category === c.key)
);

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active =
    category === "morning" || category === "night" ? category : "all";
  const list =
    active === "all" ? products : products.filter((p) => p.category === active);

  const countOf = (key: Category | "all") =>
    key === "all"
      ? products.length
      : products.filter((p) => p.category === key).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="reveal flex items-baseline gap-4">
        <h1 className="text-2xl font-bold uppercase tracking-[0.14em] sm:text-3xl">
          Shop
        </h1>
        <span className="font-mono text-[11px] tracking-[0.18em] text-mist">
          {list.length} ITEMS
        </span>
      </div>

      {/* 실제 카테고리가 하나뿐이면 필터 자체가 무의미하므로 감춘다. */}
      <div
        className={`reveal mt-8 flex gap-7 border-b border-line pb-4 ${
          categories.length > 2 ? "" : "hidden"
        }`}
        data-d="1"
      >
        {categories.map((c) => (
          <Link
            key={c.key}
            href={c.key === "all" ? "/shop" : `/shop?category=${c.key}`}
            className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
              active === c.key
                ? "border-b-2 border-accent pb-[15px] text-ink"
                : "text-mist hover:text-accent"
            }`}
          >
            {c.label}
            <span className="ml-1.5 text-[10px] text-mist">
              ({countOf(c.key)})
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-4 lg:gap-y-20">
        {list.map((p, i) => (
          <div key={p.slug} className="reveal" data-d={String(i % 3)}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
