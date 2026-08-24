import { SUPPLEMENTS_ENABLED } from "./flags";

export type Category = "morning" | "night" | "furniture";

export interface Product {
  slug: string;
  name: string;
  nameKo: string;
  category: Category;
  price: number; // KRW
  description: string;
  material: string;
  size: string;
  finish: string;
  weight: string;
  leadTime: string;
  image: string;
  /** 영양제·알약 관련 상품. 건강기능식품판매업 신고 전까지 노출하지 않는다. */
  supplement?: boolean;
  /**
   * 주문제작 상품. 사이즈·마감을 협의해 개별 생산하므로 즉시 구매 대신
   * 문의를 받는다. price가 0이면 가격도 문의로 표시된다.
   * 청약철회 제한 고지가 상세 페이지에 함께 노출된다.
   */
  madeToOrder?: boolean;
}

/**
 * KYUNE — 하루를 정돈하는 리추얼 오브제.
 * MORNING: 서플리먼트 리추얼 / NIGHT: 디지털 선셋.
 * material은 실제 생산 스펙 확정 시(스틸→알루미늄 검토 중) 여기만 수정하면 됨.
 * 이미지는 public/products/ 아래. 권장: 1:1, 최소 1200×1200px.
 */
const allProducts: Product[] = [
  {
    slug: "incense-holder",
    name: "Incense Holder",
    nameKo: "인센스 홀더",
    category: "night",
    price: 54000,
    description:
      "돛처럼 세운 스틸 한 장이 향을 붙듭니다. 향이 타는 동안은, 아무것도 하지 않아도 됩니다.",
    material: "스테인리스 스틸 304",
    size: "W95 × D70 × H210 mm",
    finish: "헤어라인 브러시",
    weight: "0.5 kg",
    leadTime: "재고 보유 시 2일 내 출고",
    image: "/products/incense-holder.jpg",
  },
  {
    slug: "petal-pill-case",
    name: "Blossom Pill Case",
    nameKo: "블라썸 필 케이스",
    category: "morning",
    price: 0,
    description:
      "다섯 장의 꽃잎이 한가운데로 모입니다. 잎마다 하루치를 나눠 담고, 가장자리 자석으로 조용히 닫힙니다. 손 안에서 피고 지는 케이스.",
    material: "스테인리스 스틸 316",
    size: "W110 × D110 × H24 mm",
    finish: "무광 비드블라스트 · CNC 가공 + 프레스 엠보싱",
    weight: "약 240 g",
    leadTime: "한정 200점 · 주문 후 약 14일 소요",
    image: "/products/petal-pill-case.jpg",
    supplement: true,
    madeToOrder: true,
  },
  {
    slug: "shell-pill-case",
    name: "Shell Pill Case",
    nameKo: "셸 필 케이스",
    category: "morning",
    price: 0,
    description:
      "조개의 성장선을 그대로 눌러 담았습니다. 뾰족한 염보가 힌지가 되고, 넓은 끝이 자석으로 맞물립니다. 손 안에서 열리는 감각까지 설계했습니다.",
    material: "스테인리스 스틸 316",
    size: "L120 × W65 × H18 mm",
    finish: "헤어라인 브러시 · CNC 가공 + 프레스 엠보싱",
    weight: "약 230 g",
    leadTime: "한정 200점 · 주문 후 약 14일 소요",
    image: "/products/shell-pill-case.jpg",
    supplement: true,
    madeToOrder: true,
  },
  {
    slug: "daily-shape-seat",
    name: "Daily Shape Seat",
    nameKo: "데일리 셰이프 시트",
    category: "furniture",
    price: 0,
    description:
      "면과 면이 직각으로 만나 등받이가 됩니다. 앉는 자리와 기대는 자리, 두 개의 면으로 충분합니다.",
    material: "스틸 (분체도장)",
    size: "주문 시 협의",
    finish: "무광 블랙 파우더코팅",
    weight: "사이즈에 따라 상이",
    leadTime: "협의 후 약 3~4주 소요",
    image: "/products/daily-shape-seat.jpg",
    madeToOrder: true,
  },
  {
    slug: "daily-shape-table",
    name: "Daily Shape Table",
    nameKo: "데일리 셰이프 테이블",
    category: "furniture",
    price: 0,
    description:
      "하나의 판을 접어 상판과 다리를 만듭니다. 옆에 두면 사이드 테이블, 앞에 두면 스툴이 됩니다.",
    material: "스틸 (분체도장)",
    size: "주문 시 협의",
    finish: "무광 블랙 파우더코팅",
    weight: "사이즈에 따라 상이",
    leadTime: "협의 후 약 3~4주 소요",
    image: "/products/daily-shape-table.jpg",
    madeToOrder: true,
  },
];

/** 사이트에 노출되는 상품. 심사 기간 동안 영양제·알약 관련 상품은 제외된다. */
export const products: Product[] = SUPPLEMENTS_ENABLED
  ? allProducts
  : allProducts.filter((p) => !p.supplement);

export { allProducts };

/** 노출 중인 상품만 조회한다. 숨겨진 상품의 상세 페이지는 404가 된다. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatKRW(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value) + "원";
}
