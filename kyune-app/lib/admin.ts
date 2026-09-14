/**
 * 관리자 권한.
 * 아래 이메일로 로그인한 계정만 /admin 페이지와 관리자 API를 쓸 수 있다.
 * 관리자를 추가하려면 이 배열에 이메일을 추가하거나, Vercel 환경변수
 * ADMIN_EMAILS에 쉼표로 구분해 등록한다. (예: a@x.kr,b@y.kr)
 */
const BASE_ADMIN_EMAILS = ["moon@antrix.kr"];

const envAdmins = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

const ADMIN_EMAILS = new Set([
  ...BASE_ADMIN_EMAILS.map((e) => e.toLowerCase()),
  ...envAdmins,
]);

export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email) && ADMIN_EMAILS.has(String(email).toLowerCase());
}
