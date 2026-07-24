"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "auth"
      ? "로그인에 실패했습니다. 다시 시도해주세요."
      : null
  );
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <p className="mt-12 border border-line bg-cream px-6 py-8 text-[14px] leading-7 text-mist">
        회원 기능을 준비하고 있습니다. 곧 오픈됩니다 —
        지금도 비회원으로 모든 상품을 구매하실 수 있습니다.
      </p>
    );
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(
        error.message === "Invalid login credentials"
          ? "이메일 또는 비밀번호가 올바르지 않습니다."
          : error.message
      );
      return;
    }
    router.push("/account");
    router.refresh();
  };

  const handleKakao = async () => {
    setError(null);
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={handleKakao}
        className="flex w-full items-center justify-center gap-2 bg-[#FEE500] py-4 text-[13px] tracking-[0.06em] text-[#191919] transition-opacity hover:opacity-85"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#191919"
            d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65l-.95 3.53c-.08.31.27.56.54.38l4.21-2.79c.5.05 1.02.08 1.54.08 5.52 0 10-3.54 10-7.85S17.52 3 12 3Z"
          />
        </svg>
        카카오로 시작하기
      </button>

      <div className="my-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-mist">
          OR
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="font-mono text-[11px] tracking-[0.18em] text-mist">
            EMAIL
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-line bg-cream px-4 py-3.5 text-[14px] outline-none transition-colors focus:border-ink"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="font-mono text-[11px] tracking-[0.18em] text-mist">
            PASSWORD
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-line bg-cream px-4 py-3.5 text-[14px] outline-none transition-colors focus:border-ink"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="text-[13px] leading-6 text-red-800">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink py-4 text-[13px] tracking-[0.14em] text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className="mt-8 text-center text-[13px] text-mist">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="border-b border-ink pb-0.5 text-ink">
          회원가입
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <p className="reveal font-mono text-[11px] tracking-[0.32em] text-mist">
        SIGN IN
      </p>
      <h1
        className="reveal mt-5 text-2xl font-bold uppercase tracking-[0.14em]"
        data-d="1"
      >
        Login
      </h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
