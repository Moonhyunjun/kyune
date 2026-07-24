import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "맞춤 제작, 도매, 협업 문의.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-[13px] tracking-[0.2em] text-mist">CONTACT</h1>

      <p className="mt-12 text-[15px] leading-9 text-ink/85">
        맞춤 제작, 도매, 협업 문의를 환영합니다.
        <br />
        아래 메일로 남겨주시면 영업일 기준 2일 내 회신드립니다.
      </p>

      <div className="mt-14 space-y-5 border-t border-line pt-12 text-[14px]">
        <div className="flex">
          <span className="w-28 shrink-0 text-mist">Email</span>
          <a href="mailto:info@kyune.kr" className="hover:underline">
            info@kyune.kr
          </a>
        </div>
        <div className="flex">
          <span className="w-28 shrink-0 text-mist">Instagram</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            @kyune.kr
          </a>
        </div>
        <div className="flex">
          <span className="w-28 shrink-0 text-mist">Showroom</span>
          <span>
            서울특별시 강남구 선릉로 704, 12층 1246-3호 · 방문은 예약제로
            운영합니다
          </span>
        </div>
      </div>

      <p className="mt-14 text-[12px] leading-6 text-mist">
        맞춤 제작 문의 시 원하시는 용도, 대략의 사이즈, 설치 공간 사진을 함께
        보내주시면 더 빠르게 안내드릴 수 있습니다.
      </p>
    </div>
  );
}
