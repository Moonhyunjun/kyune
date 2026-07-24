"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useCart } from "@/lib/cart";
import { getProduct, formatKRW } from "@/lib/products";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY ?? "";

type TossPayments = Awaited<ReturnType<typeof loadTossPayments>>;
type Payment = ReturnType<TossPayments["payment"]>;

type Method = "CARD" | "TRANSFER" | "VIRTUAL_ACCOUNT";

const methods: { key: Method; label: string; desc: string }[] = [
  { key: "CARD", label: "카드", desc: "신용·체크카드" },
  { key: "TRANSFER", label: "계좌이체", desc: "실시간 계좌이체" },
  { key: "VIRTUAL_ACCOUNT", label: "가상계좌", desc: "무통장 입금" },
];

function getCustomerKey(): string {
  const KEY = "kyune-customer-key";
  let v = localStorage.getItem(KEY);
  if (!v) {
    v = "cust_" + crypto.randomUUID();
    localStorage.setItem(KEY, v);
  }
  return v;
}

export default function CheckoutPage() {
  const { items, totalPrice, ready } = useCart();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [method, setMethod] = useState<Method>("CARD");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // 토스 결제창 SDK 로드 (API 개별 연동 — 일반 클라이언트 키 사용)
  useEffect(() => {
    if (!ready || items.length === 0 || initialized.current) return;
    if (!clientKey) {
      setError(
        "결제 키가 설정되지 않았습니다. .env.local의 NEXT_PUBLIC_TOSS_CLIENT_KEY를 확인하세요."
      );
      return;
    }
    initialized.current = true;

    (async () => {
      try {
        const toss = await loadTossPayments(clientKey);
        setPayment(toss.payment({ customerKey: getCustomerKey() }));
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "결제 모듈을 불러오지 못했습니다."
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, items.length]);

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-[14px] text-mist">주문할 상품이 없습니다.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block border-b border-ink pb-1 text-[13px] tracking-[0.14em]"
        >
          제품 보러 가기 →
        </Link>
      </div>
    );
  }

  const orderName =
    items.length === 1
      ? getProduct(items[0].slug)?.name ?? "KYUNE 주문"
      : `${getProduct(items[0].slug)?.name ?? "KYUNE"} 외 ${items.length - 1}건`;

  async function pay() {
    if (!payment) return;
    if (!customerName.trim() || !customerPhone.trim()) {
      setError("주문자 이름과 연락처를 입력해주세요.");
      return;
    }
    setError(null);
    setPaying(true);

    // 주문 정보(장바구니)를 성공 페이지에서 서버 검증에 쓰도록 저장
    const orderId = "KYUNE_" + crypto.randomUUID().replace(/-/g, "").slice(0, 20);
    sessionStorage.setItem(
      "kyune-pending-order",
      JSON.stringify({ orderId, items, customerName, customerPhone })
    );

    const common = {
      amount: { currency: "KRW" as const, value: totalPrice },
      orderId,
      orderName,
      successUrl: window.location.origin + "/checkout/success",
      failUrl: window.location.origin + "/checkout/fail",
      customerName,
      customerEmail: customerEmail || undefined,
      customerMobilePhone: customerPhone.replace(/\D/g, "") || undefined,
    };

    try {
      if (method === "CARD") {
        await payment.requestPayment({
          method: "CARD",
          ...common,
          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
      } else if (method === "TRANSFER") {
        await payment.requestPayment({ method: "TRANSFER", ...common });
      } else {
        await payment.requestPayment({
          method: "VIRTUAL_ACCOUNT",
          ...common,
          virtualAccount: { validHours: 72 },
        });
      }
    } catch (e) {
      // 사용자가 결제창을 닫은 경우 등
      setError(e instanceof Error ? e.message : "결제가 취소되었습니다.");
      setPaying(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-[13px] tracking-[0.2em] text-mist">CHECKOUT</h1>

      {/* 주문 요약 */}
      <ul className="mt-10 border-t border-line">
        {items.map((item) => {
          const p = getProduct(item.slug);
          if (!p) return null;
          return (
            <li
              key={item.slug}
              className="flex justify-between border-b border-line py-4 text-[13px]"
            >
              <span>
                {p.name} <span className="text-mist">× {item.quantity}</span>
              </span>
              <span>{formatKRW(p.price * item.quantity)}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex justify-between text-[14px]">
        <span className="text-mist">총 결제 금액</span>
        <span className="font-medium">{formatKRW(totalPrice)}</span>
      </div>

      {/* 주문자 정보 */}
      <div className="mt-12 space-y-4">
        <h2 className="text-[13px] tracking-[0.14em] text-mist">주문자 정보</h2>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="이름 *"
          className="w-full border border-line bg-white px-4 py-3 text-[14px] outline-none focus:border-ink"
        />
        <input
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="연락처 * (예: 010-0000-0000)"
          className="w-full border border-line bg-white px-4 py-3 text-[14px] outline-none focus:border-ink"
        />
        <input
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="이메일 (선택)"
          type="email"
          className="w-full border border-line bg-white px-4 py-3 text-[14px] outline-none focus:border-ink"
        />
      </div>

      {/* 결제 수단 선택 — 선택 후 토스 결제창이 열립니다 */}
      <div className="mt-12">
        <h2 className="text-[13px] tracking-[0.14em] text-mist">결제 수단</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {methods.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMethod(m.key)}
              className={`border px-5 py-4 text-left transition-colors ${
                method === m.key
                  ? "border-ink bg-white"
                  : "border-line bg-cream hover:border-mist"
              }`}
            >
              <p className="text-[14px] font-medium">{m.label}</p>
              <p className="mt-0.5 text-[12px] text-mist">{m.desc}</p>
            </button>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-6 text-mist">
          결제하기를 누르면 토스페이먼츠 안전 결제창이 열립니다.
        </p>
      </div>

      {error && (
        <p className="mt-6 text-[13px] leading-6 text-red-600">{error}</p>
      )}

      <button
        type="button"
        disabled={!payment || paying}
        onClick={pay}
        className="mt-8 w-full rounded-full bg-ink py-4 text-[13px] tracking-[0.14em] text-paper transition-opacity hover:opacity-85 disabled:opacity-40"
      >
        {paying ? "결제 진행 중..." : `${formatKRW(totalPrice)} 결제하기`}
      </button>
    </div>
  );
}
