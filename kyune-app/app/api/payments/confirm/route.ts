import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getProduct } from "@/lib/products";
import { getSupabaseServer } from "@/lib/supabase/server";

interface ConfirmBody {
  paymentKey: string;
  orderId: string;
  amount: number;
  items: { slug: string; quantity: number }[];
}

/**
 * 토스페이먼츠 결제 승인 API
 * - 클라이언트가 보낸 금액을 신뢰하지 않고, 서버에서 장바구니를 다시 계산해 검증합니다.
 * - 검증 통과 시에만 토스 승인 API를 호출합니다.
 */
export async function POST(req: Request) {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: "서버에 TOSS_SECRET_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  let body: ConfirmBody;
  try {
    body = (await req.json()) as ConfirmBody;
  } catch {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }

  const { paymentKey, orderId, amount, items } = body;
  if (!paymentKey || !orderId || !amount || !Array.isArray(items)) {
    return NextResponse.json(
      { message: "필수 파라미터가 누락되었습니다." },
      { status: 400 }
    );
  }

  // ── 서버측 금액 재계산 (가격 변조 방지) ──────────────────────────
  let expected = 0;
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      return NextResponse.json(
        { message: "주문 상품 정보가 올바르지 않습니다." },
        { status: 400 }
      );
    }
    expected += product.price * item.quantity;
  }
  if (expected !== amount) {
    return NextResponse.json(
      { message: "결제 금액이 주문 내역과 일치하지 않습니다." },
      { status: 400 }
    );
  }

  // ── 토스페이먼츠 결제 승인 ───────────────────────────────────────
  let res: Response;
  try {
    res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });
  } catch {
    return NextResponse.json(
      { message: "결제 서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }

  let payment: Record<string, unknown> & {
    message?: string;
    code?: string;
    orderId?: string;
    orderName?: string;
    approvedAt?: string;
    totalAmount?: number;
    method?: string;
    receipt?: { url?: string };
  };
  try {
    payment = await res.json();
  } catch {
    return NextResponse.json(
      { message: "결제 서버 응답을 처리하지 못했습니다." },
      { status: 502 }
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      { message: payment.message ?? "결제 승인에 실패했습니다.", code: payment.code },
      { status: res.status }
    );
  }

  // ── 주문 DB 저장 (Supabase 설정 시) ──────────────────────────────
  // 로그인 상태면 회원에 귀속되고, 비회원 주문도 기록된다.
  // 저장 실패해도 결제는 이미 완료 — 사용자 흐름을 막지 않는다.
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      let userId: string | null = null;
      const authClient = await getSupabaseServer();
      if (authClient) {
        const { data } = await authClient.auth.getUser();
        userId = data.user?.id ?? null;
      }
      const admin = createClient(supabaseUrl, serviceKey);
      await admin.from("orders").insert({
        user_id: userId,
        order_id: orderId,
        payment_key: paymentKey,
        amount,
        status: "PAID",
        items,
      });
    }
  } catch (e) {
    console.error("주문 저장 실패:", e);
  }

  return NextResponse.json({
    orderId: payment.orderId,
    orderName: payment.orderName,
    approvedAt: payment.approvedAt,
    totalAmount: payment.totalAmount,
    method: payment.method,
    receiptUrl: payment.receipt?.url ?? null,
  });
}
