import Link from "next/link";

/** 주문 완료 화면의 구매 → 구독 업셀 카드 */
export default function SuccessUpsell() {
  return (
    <div className="mx-auto mt-14 max-w-sm border border-line bg-cream/60 p-8 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-mist">
        Next Step
      </p>
      <p className="mt-4 font-serif text-xl leading-relaxed">
        오브제가 자리를 잡으면,
        <br />그 안은 저희가 채워드릴까요?
      </p>
      <p className="mt-4 text-[13px] leading-7 text-mist">
        KYUNE이 검증하고 셀렉한 영양제가 매달 리추얼에 맞춰 도착합니다.
        구독자에게는 얼리 구독 혜택을 드려요.
      </p>
      <Link
        href="/subscribe"
        className="mt-6 inline-block border-b border-ink pb-1 text-[13px] tracking-[0.14em] transition-opacity hover:opacity-60"
      >
        영양제 구독 알아보기 →
      </Link>
    </div>
  );
}
