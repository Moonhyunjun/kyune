import Link from "next/link";
import { formatKRW, type Product } from "@/lib/products";

/**
 * 제품 카드 — 화이트 플레이트 위에 제품 컷만 크게, 이름·가격은 중앙 정렬.
 * 누끼(흰 배경) 제품 컷 기준으로 설계됐고, 일반 사진도 플레이트 안에
 * 통째로 떠 있는 형태로 표시된다.
 */
export default function ProductCard({
  product,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.nameKo}
          className="max-h-[76%] max-w-[76%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 text-center">
        <p className="text-[13px] leading-6 transition-colors group-hover:text-accent">
          {product.nameKo}
        </p>
        <p className="mt-1 font-mono text-[13px] text-ink/70">
          {formatKRW(product.price)}
        </p>
      </div>
    </Link>
  );
}
