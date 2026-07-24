"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError(
        error.message.includes("already registered")
          ? "이미 가입된 이메일입니다."
          : error.message
      );
      return;
    }
    setDone(true);
  };

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <p className="reveal font-mono text-[11px] tracking-[0.32em] text-mist">
        JOIN — KYUNE®
      </p>
      <h1
        className="reveal mt-5 text-2xl font-bold uppercase tracking-[0.14em]"
        data-d="1"
      >
        Sign up
      </h1>

      {!isSupabaseConfigured ? (
        <p className="mt-12 border border-line bg-cream px-6 py-8 text-[14px] leading-7 text-mist">
          회원 기능을 준비하고 있습니다. 곧 오픈됩니다 —
          지금도 비회원으로 모든 상품을 구매하실 수 있습니다.
        </p>
      ) : done ? (
        <div className="mt-12 border border-line bg-cream px-6 py-10 text-center">
          <p className="font-mono text-[11px] tracking-[0.2em] text-mist">
            CHECK YOUR INBOX
          </p>
          <p className="mt-5 text-[14px] leading-7">
            <span className="font-medium">{email}</span> 으로
            <br />
            확인 메일을 보냈습니다.
          </p>
          <p className="mt-3 text-[13px] leading-6 text-mist">
            메일 안의 링크를 누르면 가입이 완료됩니다.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSignup} className="mt-12 space-y-4">
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
              placeholder="8자 이상"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] tracking-[0.18em] text-mist">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-2 w-full border border-line bg-cream px-4 py-3.5 text-[14px] outline-none transition-colors focus:border-ink"
              placeholder="비밀번호 확인"
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
            {loading ? "가입 중..." : "이메일로 가입하기"}
          </button>
        </form>
      )}

      {!done && (
        <p className="mt-8 text-center text-[13px] text-mist">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="border-b border-ink pb-0.5 text-ink">
            로그인
          </Link>
        </p>
      )}
    </div>
  );
}
