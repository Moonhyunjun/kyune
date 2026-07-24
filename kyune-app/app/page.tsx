import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SubscribeCta from "@/components/SubscribeCta";

export default function Home() {
  const morningCount = products.filter((p) => p.category === "morning").length;
  const nightCount = products.filter((p) => p.category === "night").length;

  return (
    <div>
      {/* Campaign hero */}
      <Link href="/shop" className="group relative block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero.jpg"
          alt="KYUNE Ritual 01"
          className="aspect-[16/10] w-full object-cover sm:aspect-[16/7]"
        />
        <span className="absolute bottom-6 left-6 bg-paper px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.26em] transition-colors group-hover:bg-ink group-hover:text-paper sm:bottom-8 sm:left-8">
          Ritual 01
        </span>
      </Link>

      {/* Products */}
      <section className="px-4 py-12 sm:px-6">
        <h2 className="mb-7 text-[11px] font-bold uppercase tracking-[0.24em]">
          New In
        </h2>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <div key={p.slug} className="reveal" data-d={String(i % 4)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Ritual statement */}
      <section className="border-y border-line bg-cream/60 px-6 py-20 text-center sm:py-28">
        <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-mist">
          Kyune Ritual
        </p>
        <p
          className="reveal mx-auto mt-6 max-w-2xl font-serif text-2xl leading-relaxed sm:text-[32px] sm:leading-[1.6]"
          data-d="1"
        >
          아침과 밤, 하루의 양 끝을 정돈하는 일.
          <br /> 웰니스는 거기서 시작됩니다.
        </p>
      </section>

      {/* Collection tiles */}
      <section className="grid sm:grid-cols-2">
        {[
          {
            href: "/shop?category=morning",
            label: "Morning",
            count: morningCount,
            image: "/products/morning-dose-tray.jpg",
            alt: "KYUNE Morning Ritual",
          },
          {
            href: "/shop?category=night",
            label: "Night",
            count: nightCount,
            image: "/products/wind-down-station.jpg",
            alt: "KYUNE Night Ritual",
          },
        ].map((c) => (
          <Link key={c.label} href={c.href} className="group relative block overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt={c.alt}
              className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-paper px-6 py-3 text-[13px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:bg-ink group-hover:text-paper">
                {c.label} ({c.count})
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Subscription */}
      <SubscribeCta />
    </div>
  );
}
