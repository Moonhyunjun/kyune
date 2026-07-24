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
