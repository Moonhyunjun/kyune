"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct, formatKRW } from "@/lib/products";

export default function CartPage() {
  const { items, setQuantity, remove, totalPrice, ready } = useCart();

  if (!ready) return <div className="min-h-[50vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-[14px] text-mist">장바구니가 비어 있습니다.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block border-b border-ink pb-1 text-[13px] tracking-[0.14em]"
        >
          제품 보러 가기 →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-[13px] tracking-[0.2em] text-mist">CART</h1>

      <ul className="mt-10 border-t border-line">
        {items.map((item) => {
          const p = getProduct(item.slug);
          if (!p) return null;
          return (
            <li
              key={item.slug}
              className="flex items-center gap-6 border-b border-line py-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={p.nameKo}
                className="h-20 w-20 shrink-0 bg-white object-cover"
              />
              <div className="flex-1">
                <Link href={`/shop/${p.slug}`} className="text-[14px]">
                  {p.name}
                </Link>
                <p className="mt-0.5 text-[12px] text-mist">{p.nameKo}</p>
                <p className="mt-1 text-[13px]">{formatKRW(p.price)}</p>
              </div>
              <div className="flex items-center border border-line">
                <button
                  type="button"
                  aria-label="수량 줄이기"
                  onClick={() => setQuantity(item.slug, item.quantity - 1)}
                  className="px-3 py-1.5 text-mist hover:text-ink"
                >
                  −
                </button>
                <span className="w-7 text-center text-[13px]">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label="수량 늘리기"
                  onClick={() => setQuantity(item.slug, item.quantity + 1)}
                  className="px-3 py-1.5 text-mist hover:text-ink"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(item.slug)}
                className="text-[12px] text-mist hover:text-ink"
              >
                삭제
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex items-baseline justify-between">
        <span className="text-[13px] text-mist">총 결제 금액</span>
        <span className="text-lg font-medium">{formatKRW(totalPrice)}</span>
      </div>
      <p className="mt-1 text-right text-[12px] text-mist">배송비 무료</p>

      <Link
        href="/checkout"
        className="mt-10 block bg-ink py-4 text-center text-[13px] tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
      >
        주문하기
      </Link>
    </div>
  );
}
