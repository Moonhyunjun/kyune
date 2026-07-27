"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center border border-line">
          <button
            type="button"
            aria-label="수량 줄이기"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-mist transition-colors hover:text-ink"
          >
            −
          </button>
          <span className="w-8 text-center text-[14px]">{quantity}</span>
          <button
            type="button"
            aria-label="수량 늘리기"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2.5 text-mist transition-colors hover:text-ink"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            add(slug, quantity);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className="flex-1 border border-ink py-4 text-[13px] tracking-[0.14em] transition-colors hover:bg-white"
        >
          {added ? "장바구니에 담았습니다" : "장바구니 담기"}
        </button>
        <button
          type="button"
          onClick={() => {
            add(slug, quantity);
            router.push("/checkout");
          }}
          className="flex-1 bg-ink py-4 text-[13px] tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
        >
          바로 구매하기
        </button>
      </div>
    </div>
  );
}
