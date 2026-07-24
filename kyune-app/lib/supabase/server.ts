import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 서버(라우트 핸들러)용 Supabase 클라이언트.
 * 쿠키 기반 세션을 읽고/갱신한다. 환경변수 미설정 시 null.
 */
export async function getSupabaseServer() {
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component에서 호출된 경우 set 불가 — 무시해도 안전
        }
      },
    },
  });
}
