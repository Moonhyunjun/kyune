import Link from "next/link";

/** 홈 하단의 영양제 구독 안내 섹션 — Collection tiles 아래에 배치 */
export default function SubscribeCta() {
  return (
    <section className="bg-ink px-6 py-20 text-center sm:py-28">
      <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-paper/50">
        Supplement Subscription
      </p>
      <p
        className="reveal mx-auto mt-6 max-w-3xl text-2xl font-bold leading-[1.4] tracking-[-0.02em] text-paper sm:text-[36px]"
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
        className="reveal mt-10 inline-block bg-paper px-8 py-3.5 text-[13px] font-bold uppercase tracking-[0.3em] text-ink transition-colors hover:bg-cream"
        data-d="3"
      >
        Subscribe
      </Link>
    </section>
  );
}
