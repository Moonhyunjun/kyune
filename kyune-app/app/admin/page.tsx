import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import AdminOrders, { type AdminOrder } from "@/components/AdminOrders";

export const metadata: Metadata = {
  title: "상점 관리",
  robots: { index: false, follow: false },
};

// 로그인 세션·주문 목록을 매 요청마다 확인한다 (캐시 금지)
export const dynamic = "force-dynamic";

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-6 py-20">{children}</div>;
}

/** 상점 관리자 — 주문 조회·결제 취소. 관리자 이메일 계정만 접근 가능. */
export default async function AdminPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return (
      <Shell>
        <p className="text-[13px] leading-7 text-mist">
          회원 기능이 아직 설정되지 않아 관리자 페이지를 쓸 수 없습니다.
        </p>
      </Shell>
    );
  }

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return (
      <Shell>
        <h1 className="text-[13px] font-medium uppercase tracking-[0.28em]">
          Store Admin
        </h1>
        <p className="mt-8 text-[13px] leading-7 text-ink">
          관리자 페이지는 로그인이 필요합니다.
        </p>
        <Link
          href="/login"
          className="mt-8 inline-block border border-ink px-7 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
        >
          로그인
        </Link>
      </Shell>
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <Shell>
        <h1 className="text-[13px] font-medium uppercase tracking-[0.28em]">
          Store Admin
        </h1>
        <p className="mt-8 text-[13px] leading-7 text-ink">
          이 계정({user.email ?? "이메일 없음"})에는 관리자 권한이 없습니다.
        </p>
      </Shell>
    );
  }

  // ── 주문 목록 (service role — RLS 우회, 서버에서만) ─────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let orders: AdminOrder[] = [];
  let loadError: string | null = null;

  if (!supabaseUrl || !serviceKey) {
    loadError =
      "SUPABASE_SERVICE_ROLE_KEY가 설정되지 않아 주문 목록을 불러올 수 없습니다.";
  } else {
    const adminDb = createClient(supabaseUrl, serviceKey);
    const { data: rows, error } = await adminDb
      .from("orders")
      .select("order_id, payment_key, amount, status, items, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) loadError = "주문 목록 조회에 실패했습니다: " + error.message;
    else orders = (rows ?? []) as AdminOrder[];
  }

  return (
    <Shell>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-[13px] font-medium uppercase tracking-[0.28em]">
          Store Admin
        </h1>
        <span className="font-mono text-[11px] tracking-[0.12em] text-mist">
          {user.email}
        </span>
      </div>
      <p className="mt-4 text-[12.5px] leading-6 text-mist">
        최근 주문 {orders.length}건 · 취소는 전액 취소로 처리되며 되돌릴 수
        없습니다.
      </p>

      <div className="mt-10">
        {loadError && (
          <p className="mb-6 border border-line bg-cream px-4 py-3 text-[12.5px] leading-6 text-ink">
            {loadError}
          </p>
        )}
        <AdminOrders orders={orders} />
      </div>
    </Shell>
  );
}
