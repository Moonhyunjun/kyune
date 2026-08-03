import type { ReactNode } from "react";

/** 약관·정책 문서 공통 레이아웃 — 조문 중심의 긴 텍스트를 읽기 좋게. */
export default function LegalPage({
  eyebrow,
  title,
  updatedAt,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-mist">
        {eyebrow}
      </p>
      <h1 className="mt-6 text-[24px] font-medium leading-[1.35] tracking-[-0.015em] sm:text-[30px]">
        {title}
      </h1>
      <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-mist">
        시행일 {updatedAt}
      </p>
      {intro && (
        <div className="mt-8 text-[14px] leading-8 text-mist">{intro}</div>
      )}
      <div className="mt-12 border-t border-line pt-12">{children}</div>
    </div>
  );
}

/** 조(條) 단위 블록. */
export function Article({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-11">
      <h2 className="text-[15px] font-medium leading-7">{title}</h2>
      <div className="mt-3 space-y-3 text-[14px] leading-8 text-ink/85">
        {children}
      </div>
    </section>
  );
}

/** 항 번호가 붙는 목록. */
export function Clauses({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="shrink-0 font-mono text-[12px] leading-8 text-mist">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** 사업자 정보 등 항목 나열용. */
export function InfoTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="space-y-2.5 border border-line bg-cream/50 px-6 py-6 text-[13px] leading-7">
      {rows.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
          <dt className="w-40 shrink-0 text-mist">{k}</dt>
          <dd className="flex-1">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
