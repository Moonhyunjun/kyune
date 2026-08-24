import type { Metadata } from "next";
import Link from "next/link";
import ScrollScrub from "@/components/ScrollScrub";

export const metadata: Metadata = {
  title: "Shell Pill Case",
  description:
    "조개의 성장선을 스테인리스 스틸 316에 눌러 담은 셸 필 케이스. CNC 가공과 프레스 엠보싱, 네오디뮴 자석 클로저. 한정 200점.",
};

const specs: [string, string][] = [
  ["MATERIAL", "스테인리스 스틸 316"],
  ["FINISH", "헤어라인 브러시"],
  ["PROCESS", "CNC 가공 + 프레스 엠보싱"],
  ["CLOSURE", "네오디뮴 자석 매립"],
  ["SIZE", "L120 × W65 × H18 mm"],
  ["WEIGHT", "약 230 g"],
  ["EDITION", "한정 200점 · 개별 각인 (001/200)"],
];

export default function ShellPage() {
  return (
    <div className="bg-paper">
      {/* 1 — Hero 스크럽 (코멘트 없음) */}
      <ScrollScrub
        srcMp4="/shell/hero-action.mp4"
        srcWebm="/shell/hero-action.webm"
        poster="/shell/hero-action-poster.jpg"
        heightVh={300}
      />

      {/* 2 — Orbit 스크럽 (코멘트 없음) */}
      <ScrollScrub
        srcMp4="/shell/product-orbit.mp4"
        srcWebm="/shell/product-orbit.webm"
        poster="/shell/product-orbit-poster.jpg"
        heightVh={250}
      />

      {/* 3 — Campaign: 스틸 컷 풀블리드 */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shell/campaign.jpg"
          alt="셸 필 케이스를 든 모델"
          className="h-[70vh] min-h-[420px] w-full object-cover"
        />
      </section>

      {/* 4 — Spec */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.32em]">
          Specifications
        </h2>
        <dl className="mt-6 border-t border-line">
          {specs.map(([k, v]) => (
            <div
              key={k}
              className="flex items-baseline border-b border-line py-3.5"
            >
              <dt className="w-32 shrink-0 font-mono text-[11px] tracking-[0.14em]">
                {k}
              </dt>
              <dd className="text-[13px]">{v}</dd>
            </div>
          ))}
        </dl>

        <Link
          href="/contact"
          className="mt-12 inline-block rounded-full bg-ink px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-85"
        >
          문의하기
        </Link>
      </section>
    </div>
  );
}
