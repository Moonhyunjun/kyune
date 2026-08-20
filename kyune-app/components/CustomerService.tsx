import Link from "next/link";

/**
 * 사이트 하단 고객 문의 블록 — 푸터 위에 상시 노출.
 * 전화·이메일·반품 접수 창구를 한 자리에 모아 두고 문의 페이지로 연결한다.
 */
const channels: {
  label: string;
  lines: { text: string; href?: string }[];
}[] = [
  {
    label: "Call",
    lines: [
      { text: "070-8057-8998", href: "tel:07080578998" },
      { text: "평일 10:00 – 18:00" },
      { text: "점심 13:00 – 14:00" },
      { text: "주말 · 공휴일 휴무" },
    ],
  },
  {
    label: "E-mail",
    lines: [
      { text: "info@kyune.kr", href: "mailto:info@kyune.kr" },
      { text: "24시간 접수" },
      { text: "영업일 기준 1–2일 내 회신" },
    ],
  },
  {
    label: "Return",
    lines: [
      { text: "서울특별시 강남구 선릉로 704," },
      { text: "12층 1246-3호 청담빌딩(청담동)" },
      { text: "반품 전 고객센터로 접수해주세요" },
    ],
  },
];

const guides = [
  { href: "/refund", label: "교환 · 반품 안내" },
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
];

export default function CustomerService() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.32em] text-mist">
            Customer Service
          </h2>
          <Link
            href="/contact"
            className="text-[12px] tracking-[0.06em] text-ink underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            문의 남기기
          </Link>
        </div>

        <p className="mt-6 max-w-md text-[14px] leading-8 text-mist">
          주문, 배송, 교환에 관해 궁금한 점이 있으시면 편하게 연락 주세요.
          제작 문의도 같은 창구로 받습니다.
        </p>

        <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-8">
          {channels.map((c) => (
            <div key={c.label}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist">
                {c.label}
              </h3>
              <ul className="mt-4 space-y-1.5">
                {c.lines.map((l, i) => (
                  <li
                    key={i}
                    className={
                      i === 0
                        ? "text-[15px] leading-7"
                        : "text-[13px] leading-6 text-mist"
                    }
                  >
                    {l.href ? (
                      <a
                        href={l.href}
                        className="transition-opacity hover:opacity-60"
                      >
                        {l.text}
                      </a>
                    ) : (
                      l.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-line pt-6">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="text-[12px] text-mist transition-colors hover:text-accent"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
