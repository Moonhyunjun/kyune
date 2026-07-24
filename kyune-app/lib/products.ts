export type Category = "morning" | "night";

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
}

/**
 * KYUNE — 하루를 정돈하는 리추얼 오브제.
 * MORNING: 서플리먼트 리추얼 / NIGHT: 디지털 선셋.
 * material은 실제 생산 스펙 확정 시(스틸→알루미늄 검토 중) 여기만 수정하면 됨.
 * 이미지는 public/products/ 아래. 권장: 1:1, 최소 1200×1200px.
 */
export const products: Product[] = [
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
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatKRW(value: number): string {
  return new Intl.NumberFormat("ko-KR").format(value) + "원";
}
