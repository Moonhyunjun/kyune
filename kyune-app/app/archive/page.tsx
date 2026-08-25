import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description: "KYUNE 아카이브 — 준비 중입니다.",
};

/**
 * Archive — llege.co/blogs/archive 레이아웃 참고.
 * 콘텐츠는 추후 채울 예정이라 지금은 빈 그리드 스캐폴드 + 안내만 둔다.
 */
export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <header className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-mist">
          KYUNE®
        </p>
        <h1 className="mt-6 text-[13px] font-medium uppercase tracking-[0.28em] text-ink">
          Archive
        </h1>
      </header>

      {/* 빈 상태 — 추후 콘텐츠 추가 */}
      <div className="mt-24 flex min-h-[40vh] flex-col items-center justify-center border-t border-line pt-24">
        <p className="text-[13px] leading-7 text-ink">준비 중입니다.</p>
        <p className="mt-2 text-[12px] leading-6 text-mist">
          아카이브 콘텐츠는 곧 채워질 예정입니다.
        </p>
      </div>
    </div>
  );
}
