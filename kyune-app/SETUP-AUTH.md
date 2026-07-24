# 회원 기능(Supabase + 카카오 + 이메일) 활성화 가이드

코드는 이미 배포되어 있습니다. 아래 설정만 마치면 로그인/회원가입이 켜집니다.
(설정 전까지 로그인 페이지는 "준비 중"으로 표시되고 나머지 기능은 정상 동작)

## 1. Supabase 프로젝트 만들기 (5분)

1. https://supabase.com → **Start your project** → GitHub 또는 이메일(info@kyune.kr)로 가입
2. **New project** → 이름 `kyune`, 리전 **Northeast Asia (Seoul)**, DB 비밀번호 설정
3. 생성 후 **Settings → API** 에서 세 값을 복사:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY` (**절대 공개 금지**)

## 2. 주문 테이블 만들기 (1분)

Supabase 대시보드 → **SQL Editor** → `supabase/schema.sql` 내용 붙여넣고 **Run**.

## 3. 카카오 로그인 연결 (10분)

1. https://developers.kakao.com → 로그인 → **내 애플리케이션 → 애플리케이션 추가**
   - 앱 이름 `KYUNE`, 회사명 `KYUNE`
2. 앱 설정 → **플랫폼 → Web 플랫폼 등록**: `https://www.kyune.kr`
3. **제품 설정 → 카카오 로그인 → 활성화 ON**
4. 카카오 로그인 → **Redirect URI 등록**:
   `https://<프로젝트ref>.supabase.co/auth/v1/callback`
   (Supabase 대시보드 → Authentication → Providers → Kakao 화면에 정확한 값이 표시됨)
5. **동의항목**: 닉네임·프로필 사진(선택), **카카오계정(이메일)** — 이메일은 "비즈 앱 전환" 후 사용 가능. 전환 전에는 이메일 없이도 로그인은 동작합니다.
6. **앱 키 → REST API 키** 복사, **제품 설정 → 카카오 로그인 → 보안 → Client Secret** 생성·복사
7. Supabase 대시보드 → **Authentication → Providers → Kakao**:
   - Enabled ON
   - Client ID = 카카오 REST API 키
   - Client Secret = 카카오 Client Secret

## 4. 이메일 로그인 리다이렉트 설정 (1분)

Supabase 대시보드 → **Authentication → URL Configuration**:
- Site URL: `https://www.kyune.kr`
- Redirect URLs 추가: `https://www.kyune.kr/auth/callback`, `https://kyune.vercel.app/auth/callback`, `http://localhost:3000/auth/callback`

## 5. Vercel 환경변수 등록 + 재배포

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
npx vercel deploy --prod --yes
```

(Claude에게 "Supabase 키 등록하고 재배포해줘"라고 하고 세 값을 주면 처리됩니다)

## 완성되는 것

- 이메일 회원가입(확인 메일) / 로그인 — `/signup`, `/login`
- 카카오 1클릭 로그인
- 마이페이지 `/account` — 내 정보 + 주문내역
- 결제 완료 시 주문이 DB에 자동 저장 (로그인 상태면 계정에 귀속)
- 헤더에 LOGIN ↔ MY 자동 전환
