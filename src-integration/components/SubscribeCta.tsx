import Link from "next/link";

/**
 * 홈(app/page.tsx)에 넣는 영양제 구독 안내 섹션.
 * 기존 "Brand statement" 섹션 바로 위 또는 아래에 배치하면 자연스럽다.
 */
export default function SubscribeCta() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-mist">
          SUPPLEMENT SUBSCRIPTION
        </p>
        <p className="mt-8 font-serif text-2xl leading-relaxed tracking-wide sm:text-3xl">
          오브제는 한 번,
          <br />그 안은 매달 새롭게
        </p>
        <p className="mx-auto mt-8 max-w-lg text-[14px] leading-8 text-mist">
          KYUNE이 성분과 브랜드를 검증해 셀렉한 영양제가 매달 리추얼에 맞춰
          도착합니다. 월 59,000원부터, 1·3·6·12개월 플랜.
        </p>
        <Link
          href="/subscribe"
          className="mt-10 inline-block border-b border-ink pb-1 text-[13px] tracking-[0.14em] transition-opacity hover:opacity-60"
        >
          영양제 구독 알아보기 →
        </Link>
      </div>
    </section>
  );
}
