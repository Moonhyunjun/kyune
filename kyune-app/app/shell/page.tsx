import type { Metadata } from "next";
import Link from "next/link";
import ScrollScrub from "@/components/ScrollScrub";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";

export const metadata: Metadata = {
  title: "Shell Pill Case",
  description:
    "조개의 성장선을 스테인리스 스틸 316에 눌러 담은 셸 필 케이스. CNC 가공과 프레스 엠보싱, 네오디뮴 자석 클로저. 한정 200점.",
  // 카드사 심사 기간(알약 상품 비노출)에는 검색엔진에 잡히지 않게 한다.
  robots: SUPPLEMENTS_ENABLED ? undefined : { index: false, follow: false },
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

const details = [
  {
    title: "릴리프 패턴",
    body: "조개 특유의 성장선을 프레스 엠보싱과 CNC 조각으로 눌러 담았습니다. 손끝에 곡선의 결이 그대로 잡힙니다.",
  },
  {
    title: "엄보 힌지",
    body: "조개의 뾰족한 끝, 엄보(umbo)가 힌지가 됩니다. 형태가 곧 구조입니다.",
  },
  {
    title: "자석 클로저",
    body: "넓은 끝에 네오디뮴 자석을 매립했습니다. 조개가 다물리듯, 손 안에서 조용히 맞물립니다.",
  },
];

export default function ShellPage() {
  return (
    <div className="bg-paper">
      {/* 1 — Hero 스크럽: 케이스를 여는 손 */}
      <ScrollScrub
        srcMp4="/shell/hero-action.mp4"
        srcWebm="/shell/hero-action.webm"
        poster="/shell/hero-action-poster.jpg"
        heightVh={300}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 sm:px-8 sm:pb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white">
            Kyune — Shell Pill Case
          </p>
          <h1 className="mt-4 max-w-md text-[24px] font-medium leading-[1.3] text-white sm:text-[32px]">
            조개가 다물리듯,
            <br />손 안에서 닫히는 하루.
          </h1>
          <p className="mt-4 text-[12px] tracking-[0.06em] text-white">
            스크롤하면 케이스가 열립니다
          </p>
        </div>
      </ScrollScrub>

      {/* 2 — Statement */}
      <section className="px-6 py-24 text-center sm:py-36">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
          A Small Object, a Greater Sense
        </p>
        <p className="mx-auto mt-8 max-w-2xl text-[22px] font-medium leading-[1.55] tracking-[-0.01em] sm:text-[30px]">
          작은 오브제 하나가
          <br />
          약 먹는 시간을 다시 보게 만듭니다.
        </p>
      </section>

      {/* 3 — Orbit 스크럽: 돌 위의 오브제 */}
      <ScrollScrub
        srcMp4="/shell/product-orbit.mp4"
        srcWebm="/shell/product-orbit.webm"
        poster="/shell/product-orbit-poster.jpg"
        heightVh={250}
      >
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent px-5 pb-10 pt-24 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white">
            Stainless Steel 316 · Hairline Brush · L120 × W65 × H18 mm
          </p>
        </div>
      </ScrollScrub>

      {/* 4 — Campaign: 스틸 + 카피 */}
      <section className="grid sm:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shell/campaign.jpg"
            alt="셸 필 케이스를 든 모델"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-ink px-6 py-20 sm:px-12 sm:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper">
            Why a Shell
          </p>
          <p className="mt-6 max-w-md text-xl font-medium leading-[1.55] text-paper sm:text-[26px]">
            조개는 제 몸으로
            <br />
            소중한 것을 지킵니다.
          </p>
          <p className="mt-6 max-w-md text-[14px] leading-8 text-paper">
            하루치의 영양을 담는 일에 그보다 나은 형태를 찾지 못했습니다.
            바다가 만든 구조를 스틸로 옮기고, 안쪽에는 하루 분량의 칸을
            나눴습니다. 가방 안에서, 책상 위에서, 조개는 조용히 닫혀 있습니다.
          </p>
        </div>
      </section>

      {/* 5 — Detail + Spec (HTML 재조판) */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.32em]">
          Details
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {details.map((d) => (
            <div key={d.title}>
              <h3 className="text-[15px] font-medium">{d.title}</h3>
              <p className="mt-2 text-[14px] leading-7">{d.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-20 font-mono text-[10px] uppercase tracking-[0.32em]">
          Specifications
        </h2>
        <dl className="mt-6 border-t border-line">
          {specs.map(([k, v]) => (
            <div key={k} className="flex items-baseline border-b border-line py-3.5">
              <dt className="w-32 shrink-0 font-mono text-[11px] tracking-[0.14em]">
                {k}
              </dt>
              <dd className="text-[13px]">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6 — CTA */}
      <section className="border-t border-line px-6 py-24 text-center sm:py-32">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]">
          Limited Edition 001–200
        </p>
        <p className="mx-auto mt-6 max-w-md text-[20px] font-medium leading-[1.5] sm:text-[24px]">
          200점만 만들고,
          <br />
          바닥에 번호를 새깁니다.
        </p>
        <p className="mx-auto mt-5 max-w-sm text-[14px] leading-7">
          출시 일정과 가격은 문의로 안내드립니다.
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-block rounded-full bg-ink px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-85"
        >
          문의하기
        </Link>
      </section>
    </div>
  );
}
