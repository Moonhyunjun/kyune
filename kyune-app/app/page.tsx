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
      {/* Campaign hero — two-tone pink + candy capsules (CSS only) */}
      <Link href="/shop" className="group relative block overflow-hidden">
        <div className="relative aspect-[16/11] w-full sm:aspect-[16/7]">
          {/* two-tone backdrop */}
          <div className="absolute inset-x-0 top-0 h-[62%] bg-[#f483ac]" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[#f9c1d6]" />

          {/* floating capsules */}
          {[
            { top: "12%", left: "58%", w: 26, h: 64, r: "28deg", d: "0s" },
            { top: "34%", left: "72%", w: 20, h: 50, r: "-18deg", d: "0.8s" },
            { top: "58%", left: "63%", w: 22, h: 56, r: "40deg", d: "1.6s" },
            { top: "20%", left: "84%", w: 18, h: 44, r: "12deg", d: "2.2s" },
            { top: "55%", left: "88%", w: 24, h: 60, r: "-32deg", d: "0.4s" },
            { top: "70%", left: "76%", w: 16, h: 40, r: "20deg", d: "1.2s" },
          ].map((c, i) => (
            <span
              key={i}
              className="capsule absolute hidden overflow-hidden rounded-full shadow-[0_14px_24px_rgba(168,25,77,0.28)] sm:block"
              style={{
                top: c.top,
                left: c.left,
                width: c.w,
                height: c.h,
                ["--r" as string]: c.r,
                ["--d" as string]: c.d,
              }}
            >
              <span className="block h-1/2 w-full bg-[#fbe7bb]" />
              <span className="block h-1/2 w-full bg-[#f0bd53]" />
            </span>
          ))}

          {/* copy */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink/70">
              Kyune® Morning &amp; Night Rituals
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black leading-[1.2] tracking-[-0.02em] text-ink sm:text-6xl sm:leading-[1.15]">
              하루의 양 끝을
              <br />
              정돈하는 리추얼
            </h1>
            <span className="mt-8 inline-block w-fit rounded-full bg-paper px-7 py-3 text-[13px] font-bold uppercase tracking-[0.26em] text-ink transition-colors group-hover:bg-ink group-hover:text-paper">
              Shop Ritual 01
            </span>
          </div>
        </div>
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
                className="aspect-square w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-paper px-7 py-3 text-[13px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:bg-ink group-hover:text-paper">
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
                className="aspect-square w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-paper px-7 py-3 text-[13px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:bg-ink group-hover:text-paper">
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
      <section className="grid gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6">
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
              className="aspect-square w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-paper px-7 py-3 text-[13px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:bg-ink group-hover:text-paper">
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
