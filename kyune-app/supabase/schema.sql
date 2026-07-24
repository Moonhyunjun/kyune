-- KYUNE 주문 테이블
-- Supabase 대시보드 → SQL Editor에 붙여넣고 Run 하세요.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  order_id text unique not null,          -- 토스페이먼츠 orderId
  payment_key text,                       -- 토스페이먼츠 paymentKey
  amount integer not null,                -- 결제 금액 (KRW)
  status text not null default 'PAID',    -- PAID / CANCELLED / REFUNDED
  items jsonb not null,                   -- [{ "slug": "...", "quantity": n }]
  created_at timestamptz not null default now()
);

-- RLS: 본인 주문만 조회 가능. 쓰기는 서버(service role)만 수행.
alter table public.orders enable row level security;

create policy "own orders select" on public.orders
  for select using (auth.uid() = user_id);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- KYUNE 구독 사전신청 테이블
-- (schema.sql 전체를 다시 Run 해도 안전 — if not exists)

create table if not exists public.subscribe_waitlist (
  id uuid primary key default gen_random_uuid(),
  plan text not null,                     -- "1개월" / "3개월" / "6개월" / "12개월"
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

-- RLS: 읽기/쓰기 모두 서버(service role)만 수행. anon 정책 없음.
alter table public.subscribe_waitlist enable row level security;

create index if not exists subscribe_waitlist_created_at_idx
  on public.subscribe_waitlist (created_at desc);
