import Link from "next/link";
import { products, formatKRW, getProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SubscribeCta from "@/components/SubscribeCta";

export default function Home() {
  const morningCount = products.filter((p) => p.category === "morning").length;
  const nightCount = products.filter((p) => p.category === "night").length;
  const pillOrganizer = getProduct("pill-organizer");

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
        <span className="absolute bottom-6 left-6 bg-paper px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.26em] transition-colors group-hover:bg-ink group-hover:text-paper sm:bottom-8 sm:left-8">
          Ritual 01
        </span>
      </Link>

      {/* Signature — 주력: 알약케이스 + 구독 */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="mb-7 text-[12px] font-bold uppercase tracking-[0.24em]">
          Signature
        </h2>
        <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2">
          <Link
            href="/shop/pill-organizer"
            className="group block"
          >
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/pill-organizer.jpg"
                alt="필 오거나이저"
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-paper px-6 py-3 text-[13px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:bg-ink group-hover:text-paper">
                  Pill Organizer
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <p className="text-[14px] leading-7">
                필 오거나이저 — 일주일의 질서를 접어 넣은 케이스
              </p>
              {pillOrganizer && (
                <p className="shrink-0 font-mono text-[13px] text-ink/80">
                  {formatKRW(pillOrganizer.price)}
                </p>
              )}
            </div>
          </Link>
          <Link href="/subscribe" className="group block">
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/products/supplement-tower.jpg"
                alt="영양제 구독"
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-paper px-6 py-3 text-[13px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:bg-ink group-hover:text-paper">
                  Subscription
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <p className="text-[14px] leading-7">
                영양제 구독 — 매달 셀렉해 채워드리는 리추얼
              </p>
              <p className="shrink-0 font-mono text-[13px] text-ink/80">
                월 59,000원~
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Morning / Night collections */}
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
          <Link
            key={c.label}
            href={c.href}
            className="group relative block overflow-hidden"
          >
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

      {/* Ritual statement */}
      <section className="border-y border-line bg-cream/60 px-6 py-20 text-center sm:py-28">
        <p className="reveal font-mono text-[11px] uppercase tracking-[0.32em] text-mist">
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

      {/* Products */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="mb-7 text-[12px] font-bold uppercase tracking-[0.24em]">
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

      {/* Subscription */}
      <SubscribeCta />
    </div>
  );
}
