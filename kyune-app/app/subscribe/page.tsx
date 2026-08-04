import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubscribeForm from "@/components/SubscribeForm";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";

export const metadata: Metadata = {
  title: "영양제 구독",
  description:
    "수백 개의 영양제 앞에서 고민하지 않으셔도 됩니다. KYUNE이 성분과 브랜드를 검증해 셀렉한 영양제가 매달 리추얼에 맞춰 도착합니다.",
};

const steps = [
  {
    num: "01",
    title: "오브제와 함께 시작",
    body: "KYUNE 오브제를 선택하세요. 이미 갖고 계시다면 구독만 시작하셔도 좋습니다.",
  },
  {
    num: "02",
    title: "간단한 설문",
    body: "수면, 컨디션, 식습관에 대한 짧은 질문으로 지금 필요한 것을 파악합니다.",
  },
  {
    num: "03",
    title: "매달 셀렉 배송",
    body: "검증된 영양제가 하루 루틴에 맞춰 구성되어 매월 첫째 주에 도착합니다. 셀렉션의 이유는 카드로 함께.",
  },
];

const faqs = [
  {
    q: "어떤 영양제가 오나요?",
    a: "KYUNE이 성분표와 제조 이력, 브랜드를 직접 검증한 제품 중에서 계절과 설문 응답을 반영해 셀렉합니다. 매달 셀렉션의 구성과 이유를 카드로 안내드립니다.",
  },
  {
    q: "먹고 있는 영양제나 알레르기를 반영할 수 있나요?",
    a: "네. 신청 시 설문에서 복용 중인 영양제와 피해야 할 성분을 알려주시면 셀렉션에서 제외하거나 겹치지 않게 구성합니다.",
  },
  {
    q: "배송은 언제 되나요?",
    a: "매월 첫째 주에 일괄 발송됩니다. 15일 이전 신청 시 당월 셀렉션부터, 이후 신청 시 익월 셀렉션부터 받아보실 수 있습니다.",
  },
  {
    q: "중간에 해지할 수 있나요?",
    a: "월간 구독은 다음 결제일 전까지 언제든 해지할 수 있습니다. 기간제 구독은 남은 회차에 대해 위약금 없이 잔여 금액을 환불해드립니다.",
  },
];

export default function SubscribePage() {
  // 건강기능식품판매업 신고 전까지 구독 서비스는 노출하지 않는다.
  if (!SUPPLEMENTS_ENABLED) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      {/* Intro — 인물컷 스플릿 */}
      <div className="grid items-center gap-10 sm:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="reveal font-mono text-[10px] uppercase tracking-[0.32em] text-mist">
            Supplement Subscription
          </p>
          <h1
            className="reveal mt-6 max-w-2xl text-[26px] font-medium leading-[1.3] tracking-[-0.015em] sm:text-[38px]"
            data-d="1"
          >
            수백 개의 영양제 앞에서
            <br />
            고민하지 않으셔도 됩니다.
          </h1>
          <p
            className="reveal mt-6 max-w-md text-[15px] leading-8 text-mist"
            data-d="2"
          >
            KYUNE이 성분과 브랜드를 검증해 셀렉한 영양제가 매달 리추얼에 맞춰
            문 앞에 도착합니다.
          </p>
        </div>
        <div className="reveal overflow-hidden" data-d="2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/refs/portrait-square.jpg"
            alt=""
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>

      {/* How it works */}
      <div className="mt-16 grid gap-10 border-t border-line pt-12 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.num} className="reveal" data-d={String(i)}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {s.num}
            </p>
            <h2 className="mt-3 text-[15px] font-medium">{s.title}</h2>
            <p className="mt-2 text-[14px] leading-7 text-mist">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Plans + waitlist form (client) */}
      <SubscribeForm />

      {/* FAQ */}
      <div className="mt-20 border-t border-line pt-12">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.24em] text-mist">
          FAQ
        </h2>
        <div className="mt-6 border-b border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-t border-line py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="ml-4 font-serif text-lg text-mist transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-xl text-[14px] leading-7 text-mist">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
