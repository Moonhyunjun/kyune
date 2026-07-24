import Link from "next/link";

/**
 * 주문 완료 페이지(app/checkout/success/page.tsx)의 주문 내역 아래에 넣는
 * 구매 → 구독 업셀 카드. 구매 직후가 구독 전환율이 가장 높은 순간이다.
 */
export default function SuccessUpsell() {
  return (
    <div className="mx-auto mt-12 max-w-md border border-line bg-white p-8">
      <p className="font-mono text-[11px] tracking-[0.2em] text-mist">
        NEXT STEP
      </p>
      <h2 className="mt-4 text-[16px] font-medium leading-relaxed">
        오브제가 자리를 잡으면,
        <br />그 안은 저희가 채워드릴까요?
      </h2>
      <p className="mt-3 text-[13px] leading-7 text-mist">
        KYUNE이 성분과 브랜드를 검증해 셀렉한 영양제가 매달 리추얼에 맞춰
        도착합니다. 구독자에게는 얼리 구독 혜택을 드려요.
      </p>
      <Link
        href="/subscribe"
        className="mt-6 inline-block bg-ink px-8 py-3.5 text-[13px] tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
      >
        영양제 구독 알아보기
      </Link>
    </div>
  );
}
