import Link from "next/link";
import Logo from "@/components/Logo";

/**
 * 메인 = LLEGE 스타일 런처.
 * 기존 KYUNE 영상 배경 위에 중앙 로고 + 세로 메뉴 버튼을 오버레이하고,
 * 하단에 가로 네비게이션을 둔다. (레퍼런스: llege.co)
 *
 * LLEGE 원본 메뉴(ONLINE SHOP / LLEGE PLACE / ARCHIVE / CUSTOMER SERVICE /
 * ACCOUNT) 구조를 그대로 따르되 KYUNE 콘텐츠에 맞춰 텍스트를 매핑한다.
 */
const menu = [
  { href: "/shop", label: "ONLINE SHOP" },
  { href: "/about", label: "ABOUT" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/contact", label: "CUSTOMER SERVICE" },
  { href: "/login", label: "ACCOUNT" },
];

/** 하단 네비게이션 — TIKTOK·YOUTUBE 제외. 카카오톡 채널은 개설 전이라 제외. */
const bottomNav: {
  href: string;
  label: string;
  external?: boolean;
}[] = [
  { href: "/about", label: "INFO" },
  { href: "/contact", label: "CUSTOMER SERVICE" },
  {
    href: "https://instagram.com/kyune.seoul",
    label: "INSTAGRAM",
    external: true,
  },
];

export default function Home() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      {/* 배경 영상 — 기존 KYUNE 영상 유지 */}
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero/seagulls-poster.jpg"
      >
        <source src="/hero/seagulls.webm" type="video/webm" />
        <source src="/hero/seagulls.mp4" type="video/mp4" />
      </video>
      {/* 모션 최소화 설정 시 정지 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/seagulls-poster.jpg"
        alt=""
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
      />
      {/* 버튼 가독성을 위한 은은한 딤 */}
      <div className="absolute inset-0 bg-ink/30" />

      {/* 중앙: 로고 + 세로 메뉴 */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24">
        <Link href="/" aria-label="KYUNE 홈" className="text-white">
          <Logo className="h-9 w-auto sm:h-11" />
        </Link>

        <nav className="mt-12 flex w-full max-w-[360px] flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-xl border border-white/80 py-4 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-200 hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 하단 네비게이션 */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 pb-9 text-[11px] font-medium uppercase tracking-[0.16em] text-white/90">
        {bottomNav.map((item) =>
          item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          )
        )}
        <span aria-label="언어">
          <span className="underline underline-offset-4">KR</span>
          <span className="text-white/45"> / INT</span>
        </span>
      </div>
    </section>
  );
}
