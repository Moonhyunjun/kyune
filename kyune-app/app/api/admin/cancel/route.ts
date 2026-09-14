import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

/**
 * 관리자 결제 취소 API.
 * body.query에 주문번호(orderId) 또는 토스 paymentKey를 받아 전액 취소한다.
 * 관리자 이메일로 로그인한 세션에서만 동작한다.
 */
export async function POST(req: Request) {
  // ── 관리자 인증 ────────────────────────────────────────────────
  const supabase = await getSupabaseServer();
  if (!supabase) {
    return NextResponse.json(
      { message: "회원 기능이 설정되지 않았습니다." },
      { status: 500 }
    );
  }
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user || !isAdminEmail(auth.user.email)) {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
  }

  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: "서버에 TOSS_SECRET_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }
  const tossAuth =
    "Basic " + Buffer.from(secretKey + ":").toString("base64");

  let query: string;
  let reason: string;
  try {
    const body = (await req.json()) as { query?: string; reason?: string };
    query = (body.query ?? "").trim();
    reason = (body.reason ?? "").trim() || "관리자 취소";
  } catch {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }
  if (!query) {
    return NextResponse.json(
      { message: "주문번호 또는 paymentKey를 입력해주세요." },
      { status: 400 }
    );
  }

  // ── paymentKey 찾기: DB → 토스 orderId 조회 → paymentKey 직접 입력 ──
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminDb =
    supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null;

  let paymentKey: string | null = null;
  let dbOrderId: string | null = null;

  if (adminDb) {
    const { data: row } = await adminDb
      .from("orders")
      .select("order_id, payment_key")
      .or(`order_id.eq.${query},payment_key.eq.${query}`)
      .maybeSingle();
    if (row) {
      paymentKey = row.payment_key;
      dbOrderId = row.order_id;
    }
  }

  if (!paymentKey && query.startsWith("KYUNE_")) {
    // 토스에서 orderId로 결제 조회
    try {
      const res = await fetch(
        `https://api.tosspayments.com/v1/payments/orders/${encodeURIComponent(query)}`,
        { headers: { Authorization: tossAuth } }
      );
      const json = (await res.json()) as { paymentKey?: string };
      if (res.ok && json.paymentKey) paymentKey = json.paymentKey;
    } catch {
      // 아래 공통 에러로 처리
    }
  }

  if (!paymentKey && !query.startsWith("KYUNE_")) {
    // paymentKey를 직접 입력한 경우
    paymentKey = query;
  }

  if (!paymentKey) {
    return NextResponse.json(
      { message: "해당 주문의 결제를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // ── 토스 전액 취소 ─────────────────────────────────────────────
  let res: Response;
  try {
    res = await fetch(
      `https://api.tosspayments.com/v1/payments/${encodeURIComponent(paymentKey)}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: tossAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cancelReason: reason }),
      }
    );
  } catch {
    return NextResponse.json(
      { message: "결제 서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }

  const payment = (await res.json().catch(() => ({}))) as {
    message?: string;
    code?: string;
    status?: string;
    orderId?: string;
    totalAmount?: number;
  };

  if (!res.ok) {
    return NextResponse.json(
      {
        message: payment.message ?? "결제 취소에 실패했습니다.",
        code: payment.code,
      },
      { status: res.status }
    );
  }

  // ── DB 상태 갱신 (실패해도 취소 자체는 완료) ─────────────────────
  if (adminDb) {
    try {
      await adminDb
        .from("orders")
        .update({ status: "CANCELLED" })
        .eq(dbOrderId ? "order_id" : "payment_key", dbOrderId ?? paymentKey);
    } catch {
      // 무시 — 화면에는 토스 기준 결과를 보여준다
    }
  }

  return NextResponse.json({
    message: `취소 완료 (${payment.orderId ?? query}, ${
      typeof payment.totalAmount === "number"
        ? payment.totalAmount.toLocaleString("ko-KR") + "원"
        : "금액 확인"
    })`,
    status: payment.status,
  });
}
