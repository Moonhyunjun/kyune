"use client";

import { useState } from "react";

const plans = [
  {
    id: "1m",
    name: "1개월",
    desc: "가볍게 시작하는 한 달",
    price: 69000,
    note: "매월 자동 결제 · 언제든 해지",
    featured: false,
  },
  {
    id: "3m",
    name: "3개월",
    desc: "몸이 달라지기 시작하는 시간",
    price: 65000,
    note: "총 195,000원 · 약 6% 할인",
    featured: false,
  },
  {
    id: "6m",
    name: "6개월",
    desc: "루틴이 자리 잡는 시간",
    price: 62000,
    note: "총 372,000원 · 약 10% 할인 · 오브제 증정",
    featured: true,
  },
  {
    id: "12m",
    name: "12개월",
    desc: "일 년의 영양 아카이브",
    price: 59000,
    note: "총 708,000원 · 약 14% 할인 · 오브제 증정",
    featured: false,
  },
];

export default function SubscribeForm() {
  const [selected, setSelected] = useState<string>("6m");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setMessage("이름과 이메일을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("이메일 주소를 확인해주세요.");
      return;
    }
    const plan = plans.find((p) => p.id === selected);
    try {
      const raw = localStorage.getItem("kyune-subscribe-waitlist") ?? "[]";
      const entries = JSON.parse(raw) as unknown[];
      entries.push({
        plan: plan?.name,
        name: name.trim(),
        email: email.trim(),
        at: new Date().toISOString(),
      });
      localStorage.setItem("kyune-subscribe-waitlist", JSON.stringify(entries));
    } catch {
      // 저장 실패해도 완료 안내는 그대로 진행
    }
    setName("");
    setEmail("");
    setMessage("신청이 완료되었습니다. 오픈 소식을 가장 먼저 전해드릴게요.");
  }

  return (
    <div className="mt-20 border-t border-line pt-12">
      <p className="font-mono text-[11px] tracking-[0.2em] text-mist">PLANS</p>
      <p className="mt-4 max-w-md text-[13px] leading-7 text-mist">
        기간이 길수록 월 요금이 낮아집니다. 셀렉션 구성은 모든 플랜이
        동일합니다.
      </p>

      {/* Plan cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(p.id)}
            aria-pressed={selected === p.id}
            className={`flex flex-col border p-6 text-left transition-colors ${
              selected === p.id
                ? "border-ink bg-white"
                : "border-line hover:border-mist"
            }`}
          >
            <span className="flex items-baseline justify-between">
              <span className="text-[15px] font-medium">{p.name}</span>
              {p.featured && (
                <span className="font-mono text-[10px] tracking-[0.14em] text-mist">
                  BEST
                </span>
              )}
            </span>
            <span className="mt-1 text-[12px] text-mist">{p.desc}</span>
            <span className="mt-5 font-mono text-lg">
              {p.price.toLocaleString()}원
              <span className="text-[12px] text-mist"> / 월</span>
            </span>
            <span className="mt-3 text-[11px] leading-5 text-mist">
              {p.note}
            </span>
          </button>
        ))}
      </div>

      {/* Waitlist form */}
      <form onSubmit={submit} className="mt-12 max-w-md">
        <p className="text-[13px] leading-7 text-mist">
          현재 첫 셀렉션을 준비하고 있습니다. 신청하시면 오픈 시 가장 먼저
          안내드리고, 얼리 구독 혜택을 드립니다.
        </p>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            autoComplete="name"
            className="w-full border border-line bg-transparent px-4 py-3 text-[14px] outline-none transition-colors placeholder:text-mist focus:border-ink"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            autoComplete="email"
            className="w-full border border-line bg-transparent px-4 py-3 text-[14px] outline-none transition-colors placeholder:text-mist focus:border-ink"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-ink py-4 text-[13px] tracking-[0.14em] text-paper transition-opacity hover:opacity-85"
        >
          {plans.find((p) => p.id === selected)?.name} 구독 신청하기
        </button>
        {message && (
          <p role="status" className="mt-4 text-center text-[13px] text-mist">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
