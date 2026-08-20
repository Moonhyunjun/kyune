import Link from "next/link";
import { products, formatKRW, getProduct } from "@/lib/products";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const morningCount = products.filter((p) => p.category === "morning").length;
  const nightCount = products.filter((p) => p.category === "night").length;
  const furnitureCount = products.filter(
    (p) => p.category === "furniture"
  ).length;

  // Signature 타일 — 구독 운영 시에는 알약케이스 + 구독, 그 외에는 대표 오브제 2점.
  const signature = SUPPLEMENTS_ENABLED
    ? []
    : [getProduct("bedtime-box"), getProduct("incense-holder")].filter(
        (p): p is NonNullable<typeof p> => Boolean(p)
      );
  const pillOrganizer = getProduct("pill-organizer");

  // 카드사 심사 기간에는 캡슐이 보이는 인물컷을 쓰지 않는다.
  // 상품을 내려도 히어로에 알약이 크게 보이면 심사 취지에 어긋난다.
  const heroImage = SUPPLEMENTS_ENABLED
    ? "/refs/portrait-hero.jpg"
    : "/refs/portrait-band.jpg";
  const bandImage = SUPPLEMENTS_ENABLED
    ? "/refs/portrait-band.jpg"
    : "/products/wind-down-station.jpg";
  const bannerImage = SUPPLEMENTS_ENABLED
    ? "/refs/portrait-square.jpg"
    : "/products/nightstand-dock.jpg";

  const collections = [
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
    {
      href: "/shop?category=furniture",
      label: "Furniture",
      count: furnitureCount,
      image: "/products/daily-shape-table.jpg",
      alt: "KYUNE Furniture",
    },
  ].filter((c) => c.count > 0);

  return (
    <div>
      {/* Hero — 풀블리드 인물컷, 투명 헤더 뒤까지 화면 전체를 채운다 */}
      <section className="relative h-svh min-h-[540px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/45 to-transparent" />
        {/* 좌측 하단 — 소개글과 SHOP 버튼 */}
        <div className="absolute bottom-0 left-0 max-w-lg px-5 pb-12 sm:px-8 sm:pb-16">
          <h1 className="max-w-sm text-[13px] font-medium leading-7 text-white sm:text-[13.5px] sm:leading-[1.9]">
            KYUNE는 리빙 웰니스 브랜드입니다. 매일 쓰는 웰니스 소품을 스틸로
            만들어요. 합리적인 가격에, 좀 다른 물건을 제안합니다.
          </h1>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-85"
          >
            Shop
          </Link>
        </div>
      </section>

      {/* Signature — 주력 제품 */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="mb-7 text-[11px] font-medium uppercase tracking-[0.24em] text-mist">
          Signature
        </h2>
        <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2">
          {SUPPLEMENTS_ENABLED ? (
            <>
              <Link href="/shop/pill-organizer" className="group block">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/products/pill-organizer.jpg"
                    alt="필 오거나이저"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-paper px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.26em] transition-colors group-hover:bg-ink group-hover:text-paper">
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
                    <span className="bg-paper px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.26em] transition-colors group-hover:bg-ink group-hover:text-paper">
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
            </>
          ) : (
            signature.map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.nameKo}
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:aspect-[4/3]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-paper px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.26em] transition-colors group-hover:bg-ink group-hover:text-paper">
                      {p.name}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <p className="text-[14px] leading-7">
                    {p.nameKo} — {p.description.split(".")[0]}
                  </p>
                  <p className="shrink-0 font-mono text-[13px] text-ink/80">
                    {formatKRW(p.price)}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Morning / Night collections — 상품이 있는 컬렉션만 */}
      {collections.length > 1 && (
        <section className="grid gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6">
          {collections.map((c) => (
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
                <span className="bg-paper px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.26em] transition-colors group-hover:bg-ink group-hover:text-paper">
                  {c.label} ({c.count})
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* Ritual statement — 풀블리드 인물컷 밴드 */}
      <section className="relative mt-14 overflow-hidden sm:mt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bandImage}
          alt=""
          className="h-[52vh] min-h-[380px] w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/35 px-6 text-center">
          <p className="reveal font-mono text-[11px] uppercase tracking-[0.32em] text-white/75">
            Kyune Ritual
          </p>
          <p
            className="reveal mx-auto mt-6 max-w-2xl text-xl font-medium leading-[1.55] tracking-[-0.01em] text-white sm:text-[26px]"
            data-d="1"
          >
            아침과 밤, 하루의 양 끝을 정돈하는 일.
            <br /> 웰니스는 거기서 시작됩니다.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="mb-7 text-[11px] font-medium uppercase tracking-[0.24em] text-mist">
          New In
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-4 lg:gap-y-20">
          {products.map((p, i) => (
            <div key={p.slug} className="reveal" data-d={String(i % 4)}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* 하단 배너 — 인물컷 + 카피 스플릿 */}
      <section className="grid sm:grid-cols-2">
        <div className="relative min-h-[320px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bannerImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-ink px-6 py-20 sm:px-12 sm:py-28">
          {SUPPLEMENTS_ENABLED ? (
            <>
              <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-paper/50">
                Supplement Subscription
              </p>
              <p
                className="reveal mt-6 max-w-md text-xl font-medium leading-[1.55] tracking-[-0.01em] text-paper sm:text-[26px]"
                data-d="1"
              >
                오브제는 한 번,
                <br />그 안은 매달 새롭게.
              </p>
              <p
                className="reveal mt-6 max-w-md text-[14px] leading-8 text-paper/75"
                data-d="2"
              >
                KYUNE이 성분과 브랜드를 검증해 셀렉한 영양제가 매달 리추얼에
                맞춰 도착합니다. 월 59,000원부터, 1·3·6·12개월 플랜.
              </p>
              <Link
                href="/subscribe"
                className="reveal mt-10 inline-block w-fit bg-paper px-7 py-3 text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:bg-cream"
                data-d="3"
              >
                Subscribe
              </Link>
            </>
          ) : (
            <>
              <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-paper/50">
                Kyune — Living Wellness
              </p>
              <p
                className="reveal mt-6 max-w-md text-[15px] leading-8 text-paper/75"
                data-d="1"
              >
                KYUNE는 리빙 웰니스 브랜드입니다.
                <br />
                <br />
                매일 쓰는 웰니스 소품을 스틸로 만들어요.
                <br />
                합리적인 가격에, 좀 다른 물건을 제안합니다.
              </p>
              <p
                className="reveal mt-10 max-w-md text-xl font-medium leading-[1.55] tracking-[-0.01em] text-paper sm:text-[26px]"
                data-d="2"
              >
                당연한 시간을
                <br />
                다시 보게 만드는 물건.
              </p>
              <p
                className="reveal mt-6 max-w-md text-[15px] leading-8 text-paper/75"
                data-d="3"
              >
                약 먹는 시간, 향 피우는 시간, 잠드는 시간.
                <br />
                누구나 있는 시간인데 아무도 신경 안 쓰는 시간.
                <br />
                거기에 놓일 물건을 고민하고,
                <br />
                스틸을 접어서 만들어요.
              </p>
              <Link
                href="/about"
                className="reveal mt-10 inline-block w-fit bg-paper px-7 py-3 text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:bg-cream"
                data-d="4"
              >
                About
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
