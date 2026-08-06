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
  { href: "/subscribe", label: "SUBSCRIBE", requiresSupplements: true },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
].filter((item) => {
  if (item.requiresSupplements && !SUPPLEMENTS_ENABLED) return false;
  if (item.category) {
    // 남은 컬렉션이 하나뿐이면 SHOP과 결과가 같으므로 메뉴에서 뺀다.
    const live = new Set(products.map((p) => p.category));
    return live.size > 1 && live.has(item.category as (typeof products)[number]["category"]);
  }
  return true;
});



export default function Header() {
  const pathname = usePathname();
  const { totalCount, ready } = useCart();
  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 홈에서는 헤더가 히어로 인물컷 위에 투명하게 얹히고,
  // 스크롤이 내려가면 종이색 배경으로 전환된다.
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

  const authItem = loggedIn
    ? { href: "/account", label: "MY" }
    : { href: "/login", label: "LOGIN" };

  const linkBase =
    "whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] transition-colors sm:text-[13px]";
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

      {/* big logotype — 손글씨 워드마크 (components/Logo.tsx) */}
      <div className="flex justify-center px-6 pb-2 pt-7 sm:pb-3 sm:pt-9">
        <Link
          href="/"
          aria-label="KYUNE 홈"
          className={`transition-colors ${overHero ? "text-white" : "text-ink"}`}
        >
          <Logo className="h-8 w-auto sm:h-10" />
        </Link>
      </div>

      {/* nav */}
      <nav
        className={`flex items-center gap-5 overflow-x-auto px-6 py-3 [justify-content:safe_center] sm:gap-9 ${
          isHome ? "" : "sticky top-0 z-40"
        }`}
      >
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
        <span
          className={`hidden h-3 w-px sm:block ${
            overHero ? "bg-white/40" : "bg-line"
          }`}
        />
        <Link href={authItem.href} className={`${linkBase} ${linkColor}`}>
          {authItem.label}
        </Link>
        <Link
          href="/cart"
          className={`${linkBase} ${overHero ? "text-white" : "text-accent"}`}
          aria-label="장바구니"
        >
          CART{ready && totalCount > 0 ? ` (${totalCount})` : ""}
        </Link>
      </nav>
    </header>
  );
}
