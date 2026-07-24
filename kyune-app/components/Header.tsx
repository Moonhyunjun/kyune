"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";

const nav = [
  { href: "/shop", label: "SHOP" },
  { href: "/shop?category=morning", label: "MORNING" },
  { href: "/shop?category=night", label: "NIGHT" },
  { href: "/subscribe", label: "SUBSCRIBE" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

const ticker =
  "KYUNE® · MORNING & NIGHT RITUALS · A PLACE FOR EVERY HABIT · SEOUL · ".repeat(3);


export default function Header() {
  const pathname = usePathname();
  const { totalCount, ready } = useCart();
  const [loggedIn, setLoggedIn] = useState(false);

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

  return (
    <header className="border-b border-line bg-paper">
      {/* ticker bar (marquee-loop) */}
      <div className="overflow-hidden bg-ink py-1.5" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="whitespace-pre font-mono text-[10px] uppercase tracking-[0.22em] text-paper"
            >
              {ticker}
            </span>
          ))}
        </div>
      </div>

      {/* big logotype */}
      <div className="flex justify-center px-6 pb-2 pt-7 sm:pb-3 sm:pt-9">
        <Link
          href="/"
          className="text-3xl font-bold uppercase tracking-[0.42em] sm:text-5xl sm:tracking-[0.5em]"
          style={{ marginRight: "-0.5em" }}
        >
          KYUNE
        </Link>
      </div>

      {/* nav */}
      <nav className="sticky top-0 z-40 flex items-center justify-center gap-5 overflow-x-auto px-6 py-3 sm:gap-9">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] transition-colors sm:text-[13px] ${
              pathname === item.href.split("?")[0] && item.label === "SHOP"
                ? "text-ink"
                : "text-ink/70 hover:text-accent"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <span className="hidden h-3 w-px bg-line sm:block" />
        <Link
          href={authItem.href}
          className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] text-ink/70 transition-colors hover:text-accent sm:text-[13px]"
        >
          {authItem.label}
        </Link>
        <Link
          href="/cart"
          className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] text-accent sm:text-[13px]"
          aria-label="장바구니"
        >
          CART{ready && totalCount > 0 ? ` (${totalCount})` : ""}
        </Link>
      </nav>
    </header>
  );
}
