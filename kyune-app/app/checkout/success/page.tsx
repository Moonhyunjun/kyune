"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { formatKRW } from "@/lib/products";
import SuccessUpsell from "@/components/SuccessUpsell";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";

interface ConfirmedPayment {
  orderId: string;
  orderName: string;
  approvedAt: string;
  totalAmount: number;
  method: string;
  receiptUrl: string | null;
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const { clear } = useCart();
  const [state, setState] = useState<
    | { status: "confirming" }
    | { status: "done"; payment: ConfirmedPayment }
    | { status: "error"; message: string }
  >({ status: "confirming" });
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;

    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = Number(searchParams.get("amount"));

    const pendingRaw = sessionStorage.getItem("kyune-pending-order");
    const pending = pendingRaw ? JSON.parse(pendingRaw) : null;

    if (!paymentKey || !orderId || !amount || !pending?.items) {
      setState({
        status: "error",
        message: "주문 정보를 찾을 수 없습니다. 결제가 진행되지 않았다면 다시 시도해주세요.",
      });
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/payments/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
            items: pending.items,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setState({
            status: "error",
            message: data.message ?? "결제 승인에 실패했습니다.",
          });
          return;
        }
        sessionStorage.removeItem("kyune-pending-order");
        clear();
        setState({ status: "done", payment: data });
      } catch {
        setState({
          status: "error",
          message: "네트워크 오류로 결제 확인에 실패했습니다. 고객센터로 문의해주세요.",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.status === "confirming") {
    return (
      <div className="py-32 text-center">
        <p className="text-[14px] text-mist">결제를 확인하고 있습니다...</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="py-32 text-center">
        <p className="text-[15px]">결제 확인에 실패했습니다</p>
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-7 text-mist">
          {state.message}
        </p>
        <Link
          href="/cart"
          className="mt-10 inline-block border-b border-ink pb-1 text-[13px] tracking-[0.14em]"
        >
          장바구니로 돌아가기 →
        </Link>
      </div>
    );
  }

  const { payment } = state;
  return (
    <div className="py-24">
      <div className="text-center">
        <p className="font-serif text-3xl tracking-wide">Thank you.</p>
        <p className="mt-6 text-[14px] leading-8 text-mist">
          주문이 완료되었습니다. 제작이 시작되면
          <br />
          문자로 진행 상황을 안내드립니다.
        </p>
      </div>

      <dl className="mx-auto mt-14 max-w-sm border-t border-line text-[13px]">
        {(
          [
            ["주문번호", payment.orderId],
            ["주문명", payment.orderName],
            ["결제수단", payment.method],
            ["결제금액", formatKRW(payment.totalAmount)],
            ["승인시각", new Date(payment.approvedAt).toLocaleString("ko-KR")],
          ] as [string, string][]
        ).map(([k, v]) => (
          <div key={k} className="flex border-b border-line py-3">
            <dt className="w-24 shrink-0 text-mist">{k}</dt>
            <dd className="break-all">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 flex justify-center gap-8">
        {payment.receiptUrl && (
          <a
            href={payment.receiptUrl}
            target="_blank"
            rel="noreferrer"
            className="border-b border-line pb-1 text-[13px] text-mist hover:border-ink hover:text-ink"
          >
            영수증 보기
          </a>
        )}
        <Link
          href="/shop"
          className="border-b border-ink pb-1 text-[13px] tracking-[0.14em]"
        >
          쇼핑 계속하기 →
        </Link>
      </div>

      {SUPPLEMENTS_ENABLED && <SuccessUpsell />}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <Suspense
        fallback={
          <div className="py-32 text-center">
            <p className="text-[14px] text-mist">결제를 확인하고 있습니다...</p>
          </div>
        }
      >
        <SuccessInner />
      </Suspense>
    </div>
  );
}
