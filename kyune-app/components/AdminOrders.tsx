"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { allProducts } from "@/lib/products";

export interface AdminOrder {
  order_id: string;
  payment_key: string | null;
  amount: number;
  status: string;
  items: { slug: string; quantity: number }[];
  created_at: string;
}

const nameOf = (slug: string) =>
  allProducts.find((p) => p.slug === slug)?.nameKo ?? slug;

function itemsLabel(items: AdminOrder["items"]) {
  if (!Array.isArray(items) || items.length === 0) return "-";
  return items
    .map((i) => `${nameOf(i.slug)}${i.quantity > 1 ? ` ×${i.quantity}` : ""}`)
    .join(", ");
}

/** 주문 목록 + 결제 취소 액션 (관리자 전용, /admin에서만 렌더) */
export default function AdminOrders({ orders }: { orders: AdminOrder[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [manual, setManual] = useState("");

  const cancel = async (query: string) => {
    if (
      !window.confirm(
        `이 결제를 전액 취소할까요?\n${query}\n\n취소 후 되돌릴 수 없습니다.`
      )
    )
      return;
    setBusy(query);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const json = (await res.json()) as { message?: string };
      setMsg({
        ok: res.ok,
        text: json.message ?? (res.ok ? "취소 완료" : "취소 실패"),
      });
      if (res.ok) router.refresh();
    } catch {
      setMsg({ ok: false, text: "요청에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      {msg && (
        <p
          className={`mb-6 border px-4 py-3 text-[13px] leading-6 ${
            msg.ok
              ? "border-line bg-cream text-ink"
              : "border-accent/40 bg-accent/5 text-accent"
          }`}
        >
          {msg.text}
        </p>
      )}

      {/* 주문 목록 */}
      {orders.length === 0 ? (
        <p className="border-t border-line pt-10 text-[13px] leading-7 text-mist">
          저장된 주문이 없습니다. 아래에서 주문번호로 직접 취소할 수 있어요.
        </p>
      ) : (
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[640px] text-left text-[12.5px] leading-6">
            <thead>
              <tr className="border-b border-line font-mono text-[10.5px] uppercase tracking-[0.16em] text-mist">
                <th className="py-3 pr-4 font-medium">일시</th>
                <th className="py-3 pr-4 font-medium">주문번호</th>
                <th className="py-3 pr-4 font-medium">상품</th>
                <th className="py-3 pr-4 font-medium">금액</th>
                <th className="py-3 pr-4 font-medium">상태</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.order_id} className="border-b border-line">
                  <td className="py-3.5 pr-4 whitespace-nowrap text-mist">
                    {new Date(o.created_at).toLocaleString("ko-KR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-3.5 pr-4 font-mono text-[11.5px]">
                    {o.order_id}
                  </td>
                  <td className="py-3.5 pr-4">{itemsLabel(o.items)}</td>
                  <td className="py-3.5 pr-4 whitespace-nowrap font-mono">
                    {o.amount.toLocaleString("ko-KR")}원
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={`font-mono text-[11px] tracking-[0.08em] ${
                        o.status === "PAID" ? "text-ink" : "text-mist"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {o.status === "PAID" && (
                      <button
                        onClick={() => cancel(o.order_id)}
                        disabled={busy !== null}
                        className="border border-ink px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
                      >
                        {busy === o.order_id ? "취소 중…" : "결제 취소"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 직접 취소 — DB에 없는 결제(심사 담당자 테스트 결제 등)용 */}
      <div className="mt-16 border-t border-line pt-10">
        <h2 className="text-[12px] font-medium uppercase tracking-[0.2em]">
          주문번호로 직접 취소
        </h2>
        <p className="mt-2 text-[12.5px] leading-6 text-mist">
          목록에 없는 결제는 토스 상점관리자에 표시된 주문번호(KYUNE_…) 또는
          paymentKey를 붙여넣어 취소할 수 있어요.
        </p>
        <form
          className="mt-5 flex max-w-xl gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (manual.trim()) cancel(manual.trim());
          }}
        >
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="KYUNE_… 또는 paymentKey"
            className="min-w-0 flex-1 border border-line bg-paper px-4 py-2.5 font-mono text-[12px] outline-none placeholder:text-hint focus:border-ink"
          />
          <button
            type="submit"
            disabled={busy !== null || !manual.trim()}
            className="shrink-0 border border-ink px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper disabled:opacity-40"
          >
            취소 실행
          </button>
        </form>
      </div>
    </div>
  );
}
