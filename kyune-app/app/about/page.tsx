import type { Metadata } from "next";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";

export const metadata: Metadata = {
  title: "About",
  description: "정돈에서 시작되는 웰니스 — KYUNE.",
};

const blocks: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "CONTAIN",
    body: "담기면, 다스려집니다. 모든 물건에 정해진 자리를 줍니다. 자리가 곧 통제감입니다.",
  },
  {
    no: "02",
    title: "RETURN",
    body: "아침과 밤, 제자리에 되돌리는 반복. 그 리듬이 습관이 되고, 습관이 하루를 정돈합니다.",
  },
  {
    no: "03",
    title: "STILL",
    body: "단단해서 고요합니다. 흔들리지 않는 금속의 항상성이 매일의 리듬을 그대로 지켜줍니다.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="reveal font-mono text-[11px] tracking-[0.32em] text-mist">
        ABOUT — KYUNE®
      </p>

      <p
        className="reveal mt-10 font-serif text-3xl font-medium leading-snug sm:text-4xl"
        data-d="1"
      >
        정돈에서 시작되는 웰니스
      </p>

      <div
        className="reveal mt-12 space-y-7 text-[15px] leading-9 text-ink"
        data-d="2"
      >
        <p>
          KYUNE은 웰니스 습관에 정해진 자리를 만듭니다.
          {SUPPLEMENTS_ENABLED ? " 영양제 한 알, 자기 전의 폰, 한 자루의 향" : " 자기 전의 폰, 한 자루의 향, 머리맡의 물 한 잔"}
          {" "}— 매일 반복되는 것들이 제자리를 가질 때, 하루는 다스려집니다.
        </p>
        <p>
          질서는 가장 조용한 회복이라고 믿습니다. 서울의 공방에서 금속판을
          직각으로 절곡해, 아침과 밤의 양 끝에 놓일 물건을 한 점씩 만듭니다.
        </p>
      </div>

      <div className="mt-20 grid gap-10 border-t border-line pt-14 sm:grid-cols-3">
        {blocks.map((b, i) => (
          <div key={b.no} className="reveal" data-d={String(i)}>
            <p className="font-mono text-[11px] tracking-[0.2em] text-mist">
              {b.no}
            </p>
            <h2 className="mt-3 text-[13px] font-bold uppercase tracking-[0.14em]">
              {b.title}
            </h2>
            <p className="mt-3 text-[13px] leading-7 text-ink">{b.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
