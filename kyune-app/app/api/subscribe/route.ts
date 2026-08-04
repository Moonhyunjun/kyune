import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUPPLEMENTS_ENABLED } from "@/lib/flags";

/**
 * 구독 사전신청 저장.
 * orders 저장과 동일하게 service role로 insert (RLS 우회, 서버 전용).
 * Supabase 미설정/테이블 미생성 시 503을 반환하고,
 * 클라이언트는 localStorage 폴백으로 신청을 보존한다.
 */
export async function POST(request: Request) {
  // 구독 서비스 미운영 기간에는 접수 자체를 받지 않는다.
  if (!SUPPLEMENTS_ENABLED) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  let body: { plan?: string; name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }

  const plan = (body.plan ?? "").trim().slice(0, 40);
  const name = (body.name ?? "").trim().slice(0, 80);
  const email = (body.email ?? "").trim().slice(0, 200);

  if (!plan || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "이름과 이메일을 확인해주세요." },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json(
      { message: "저장소가 아직 준비되지 않았습니다." },
      { status: 503 }
    );
  }

  const admin = createClient(supabaseUrl, serviceKey);
  const { error } = await admin.from("subscribe_waitlist").insert({
    plan,
    name,
    email,
  });

  if (error) {
    console.error("subscribe_waitlist insert 실패:", error.message);
    return NextResponse.json(
      { message: "저장에 실패했습니다." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
