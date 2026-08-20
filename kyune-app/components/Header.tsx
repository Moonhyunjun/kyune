"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";
import Logo from "@/components/Logo";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";

/** 상품이 없는 컬렉션과 미운영 서비스는 메뉴에서 제외한다. */
const nav = [
  { href: "/shop", label: "SHOP" },
  { href: "/shop?category=morning", label: "MORNING", category: "morning" },
  { href: "/shop?category=night", label: "NIGHT", category: "night" },
  {
    href: "/shop?category=furniture",
    label: "FURNITURE",
    category: "furniture",
  },
  { href: "/subscribe", label: "SUBSCRIBE", requiresSupplements: true },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
].filter((item) => {
  if (item.requiresSupplements && !SUPPLEMENTS_ENABLED) return false;
  if (item.category) {
    // 남은 컬렉션이 하나뿐이면 SHOP과 결과가 같으므로 메뉴에서 뺀다.
    const live = new Set(products.map((p) => p.category));
    return (
      live.size > 1 &&
      live.has(item.category as (typeof products)[number]["category"])
    );
  }
  return true;
});

function AccountIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.8 20c0-3.6 3.2-5.8 7.2-5.8s7.2 2.2 7.2 5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 7.5h13l-1 12.5h-11l-1-12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5V6.6a3 3 0 0 1 6 0v2.9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { totalCount, ready } = useCart();
  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 홈에서는 헤더가 히어로 위에 투명하게 얹히고,
  // 스크롤이 내려가면 흰 배경으로 전환된다.
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = getSupabaseBrowser();
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(Boolean(data.session));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(Boolean(session));
    });
    return () => subscription.unsubscribe();
  }, []);

  const accountHref = loggedIn ? "/account" : "/login";
  const accountLabel = loggedIn ? "마이페이지" : "로그인";

  const linkBase =
    "whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] transition-colors";
  const linkColor = overHero
    ? "text-white/85 hover:text-white"
    : "text-ink/70 hover:text-accent";

  return (
    <header
      className={
        isHome
          ? `fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
              overHero
                ? "border-b border-transparent bg-transparent"
                : "border-b border-line bg-paper"
            }`
          : "border-b border-line bg-paper"
      }
    >
      {/* 좌: 메뉴 · 중앙: 로고 · 우: 계정/장바구니 */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 sm:px-8 sm:py-5">
        {/* 좌측 메뉴 — 모바일에서는 아래 줄로 내린다 */}
        <nav className="hidden items-center gap-6 sm:flex lg:gap-8">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${linkBase} ${
                pathname === item.href.split("?")[0] && item.label === "SHOP"
                  ? overHero
                    ? "text-white"
                    : "text-ink"
                  : linkColor
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="sm:hidden" />

        {/* 중앙 로고 */}
        <Link
          href="/"
          aria-label="KYUNE 홈"
          className={`justify-self-center transition-colors ${
            overHero ? "text-white" : "text-ink"
          }`}
        >
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        {/* 우측 계정 · 장바구니 */}
        <div
          className={`flex items-center justify-end gap-5 ${
            overHero ? "text-white" : "text-ink"
          }`}
        >
          <Link
            href={accountHref}
            aria-label={accountLabel}
            className="transition-opacity hover:opacity-60"
          >
            <AccountIcon />
          </Link>
          <Link
            href="/cart"
            aria-label="장바구니"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
          >
            <BagIcon />
            {ready && totalCount > 0 && (
              <span className="font-mono text-[11px] leading-none">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* 모바일 메뉴 — 좌측 정렬, 가로 스크롤 */}
      <nav className="flex items-center gap-5 overflow-x-auto px-5 pb-3 sm:hidden">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`${linkBase} ${linkColor}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
