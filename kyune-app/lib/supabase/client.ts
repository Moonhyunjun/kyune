import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** 환경변수가 등록되기 전에는 회원 기능 UI를 '준비 중'으로 표시하기 위한 플래그 */
export const isSupabaseConfigured = Boolean(url && anonKey);

/** 브라우저용 Supabase 클라이언트 (싱글턴) */
export function getSupabaseBrowser() {
  if (!url || !anonKey) {
    throw new Error("Supabase 환경변수가 설정되지 않았습니다.");
  }
  return createBrowserClient(url, anonKey);
}
