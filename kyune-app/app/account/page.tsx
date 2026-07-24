"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";
import { formatKRW, getProduct } from "@/lib/products";

interface OrderRow {
  id: string;
  order_id: string;
  amount: number;
  status: string;
  items: { slug: string; quantity: number }[];
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      router.replace("/login");
      return;
    }
    const supabase = getSupabaseBrowser();

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace("/login");
        return;
      }
      setUser(data.user);

      const { data: rows } = await supabase
        .from("orders")
        .select("id, order_id, amount, status, items, created_at")
        .order("created_at", { ascending: false });
      setOrders((rows as OrderRow[]) ?? []);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading || !user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="font-mono text-[11px] tracking-[0.32em] text-mist">
          LOADING...
        </p>
      </div>
    );
  }

  const provider = user.app_metadata?.provider === "kakao" ? "카카오" : "이메일";

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="reveal font-mono text-[11px] tracking-[0.32em] text-mist">
        MY PAGE
      </p>
      <h1
        className="reveal mt-5 text-2xl font-bold uppercase tracking-[0.14em]"
        data-d="1"
      >
        Account
      </h1>

      <dl className="mt-12 border-t border-line">
        {[
          ["EMAIL", user.email ?? "-"],
          ["SIGN-IN", `${provider} 로그인`],
          [
            "JOINED",
            new Date(user.created_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          ],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline border-b border-line py-3.5">
            <dt className="w-28 shrink-0 font-mono text-[11px] tracking-[0.14em] text-mist">
              {k}
            </dt>
            <dd className="text-[13px]">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-16 font-mono text-[12px] tracking-[0.24em] text-mist">
        ORDERS
      </h2>

      {orders.length === 0 ? (
        <p className="mt-6 border border-line bg-cream px-6 py-8 text-[13px] leading-7 text-mist">
          아직 주문 내역이 없습니다. 로그인한 상태로 결제하시면 이곳에 주문이
          기록됩니다.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border border-line bg-cream px-6 py-5">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[11px] tracking-[0.1em] text-mist">
                  {o.order_id}
                </p>
                <p className="font-mono text-[11px] text-mist">
                  {new Date(o.created_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
              <ul className="mt-3 space-y-1">
                {o.items.map((it) => {
                  const p = getProduct(it.slug);
                  return (
                    <li key={it.slug} className="flex justify-between text-[13px]">
                      <span>
                        {p?.name ?? it.slug}{" "}
                        <span className="text-mist">× {it.quantity}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-mist">
                  {o.status}
                </span>
                <span className="font-mono text-[13px]">
                  {formatKRW(o.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleLogout}
        className="mt-16 border border-ink px-8 py-3.5 text-[13px] tracking-[0.14em] transition-colors hover:bg-white"
      >
        로그아웃
      </button>
    </div>
  );
}
