"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FailInner() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") ?? "결제가 정상적으로 처리되지 않았습니다.";
  const code = searchParams.get("code");

  return (
    <div className="py-32 text-center">
      <p className="text-[15px]">결제에 실패했습니다</p>
      <p className="mx-auto mt-4 max-w-md text-[13px] leading-7 text-mist">
        {message}
        {code ? ` (${code})` : ""}
      </p>
      <div className="mt-10 flex justify-center gap-8">
        <Link
          href="/checkout"
          className="border-b border-ink pb-1 text-[13px] tracking-[0.14em]"
        >
          다시 시도하기 →
        </Link>
        <Link
          href="/cart"
          className="border-b border-line pb-1 text-[13px] text-mist hover:border-ink hover:text-ink"
        >
          장바구니로
        </Link>
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <Suspense fallback={<div className="py-32" />}>
        <FailInner />
      </Suspense>
    </div>
  );
}
