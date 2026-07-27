import Link from "next/link";

/** 홈 하단의 영양제 구독 안내 섹션 — Collection tiles 아래에 배치 */
export default function SubscribeCta() {
  return (
    <section className="bg-ink px-6 py-20 text-center sm:py-28">
      <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-paper/50">
        Supplement Subscription
      </p>
      <p
        className="reveal mx-auto mt-6 max-w-2xl text-xl font-medium leading-[1.55] tracking-[-0.01em] text-paper sm:text-[26px]"
        data-d="1"
      >
        오브제는 한 번,
        <br />그 안은 매달 새롭게.
      </p>
      <p
        className="reveal mx-auto mt-6 max-w-md text-[14px] leading-8 text-paper/75"
        data-d="2"
      >
        KYUNE이 성분과 브랜드를 검증해 셀렉한 영양제가 매달 리추얼에 맞춰
        도착합니다. 월 59,000원부터, 1·3·6·12개월 플랜.
      </p>
      <Link
        href="/subscribe"
        className="reveal mt-10 inline-block bg-paper px-7 py-3 text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:bg-cream"
        data-d="3"
      >
        Subscribe
      </Link>
    </section>
  );
}
