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
    slug: "daily-dose-stand",
    name: "Daily Dose Stand",
    nameKo: "데일리 도즈 스탠드",
    category: "morning",
    price: 98000,
    description:
      "하루치의 자리. 아침에 비우고, 밤에 다시 채웁니다. 일곱 개의 컵이 일주일의 리듬을 만듭니다.",
    material: "스테인리스 스틸 304",
    size: "W210 × D60 × H40 mm",
    finish: "헤어라인",
    weight: "0.6 kg",
    leadTime: "주문 후 약 7일 소요",
    image: "/products/daily-dose-stand.jpg",
    supplement: true,
  },
  {
    slug: "pill-organizer",
    name: "Pill Organizer",
    nameKo: "필 오거나이저",
    category: "morning",
    price: 76000,
    description:
      "일주일의 질서를 접어 넣은 케이스. 직각으로 여닫는 촉감이 의식의 일부가 됩니다.",
    material: "스테인리스 스틸 304",
    size: "W180 × D80 × H22 mm",
    finish: "무광 비드블라스트",
    weight: "0.4 kg",
    leadTime: "주문 후 약 7일 소요",
    image: "/products/pill-organizer.jpg",
    supplement: true,
  },
  {
    slug: "supplement-tower",
    name: "Supplement Tower",
    nameKo: "서플리먼트 타워",
    category: "morning",
    price: 120000,
    description:
      "라벨이 한눈에 보이도록, 병들이 한 단씩 물러섭니다. 가시적인 질서.",
    material: "철 (SPCC)",
    size: "W240 × D140 × H180 mm",
    finish: "무광 파우더코팅 (차콜)",
    weight: "1.8 kg",
    leadTime: "주문 후 약 14일 소요",
    image: "/products/supplement-tower.jpg",
    supplement: true,
  },
  {
    slug: "morning-dose-tray",
    name: "Morning Dose Tray",
    nameKo: "모닝 도즈 트레이",
    category: "morning",
    price: 88000,
    description: "물 한 잔, 알약, 오늘의 한 줄. 아침이 시작되는 자리.",
    material: "스테인리스 스틸 304",
    size: "W280 × D160 × H18 mm",
    finish: "헤어라인",
    weight: "0.9 kg",
    leadTime: "주문 후 약 7일 소요",
    image: "/products/morning-dose-tray.jpg",
    supplement: true,
  },
  {
    slug: "bedtime-box",
    name: "Bedtime Box",
    nameKo: "베드타임 박스",
    category: "night",
    price: 132000,
    description:
      "폰을 넣고 뚜껑을 닫는 것으로 하루를 끕니다. 측면 타공으로 케이블이 지나갑니다.",
    material: "철 (SPCC)",
    size: "W190 × D110 × H35 mm",
    finish: "무광 파우더코팅 (차콜)",
    weight: "1.1 kg",
    leadTime: "주문 후 약 14일 소요",
    image: "/products/bedtime-box.jpg",
  },
  {
    slug: "nightstand-dock",
    name: "Nightstand Dock",
    nameKo: "나이트스탠드 독",
    category: "night",
    price: 108000,
    description:
      "폰, 안경, 책, 물컵. 밤의 자리는 정해져 있습니다. 밤에 넣고, 아침에 꺼냅니다.",
    material: "스테인리스 스틸 304",
    size: "W300 × D180 × H24 mm",
    finish: "무광 비드블라스트",
    weight: "1.2 kg",
    leadTime: "주문 후 약 14일 소요",
    image: "/products/nightstand-dock.jpg",
  },
  {
    slug: "wind-down-station",
    name: "Wind-down Station",
    nameKo: "윈드다운 스테이션",
    category: "night",
    price: 86000,
    description:
      "폰을 넣고, 향을 피웁니다. 벽 위에 만든 멈춤의 자리. 무타공 접착 마운트.",
    material: "스테인리스 스틸 304",
    size: "W220 × D90 × H120 mm",
    finish: "헤어라인",
    weight: "0.8 kg",
    leadTime: "주문 후 약 7일 소요",
    image: "/products/wind-down-station.jpg",
  },
  {
    slug: "incense-holder",
    name: "Incense Holder",
    nameKo: "인센스 홀더",
    category: "night",
    price: 54000,
    description: "향이 타는 동안은, 아무것도 하지 않아도 됩니다.",
    material: "황동",
    size: "W180 × D40 × H14 mm",
    finish: "헤어라인",
    weight: "0.3 kg",
    leadTime: "재고 보유 시 2일 내 출고",
    image: "/products/incense-holder.jpg",
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
