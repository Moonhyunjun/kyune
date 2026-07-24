# KYUNE — 금속 가구·오브제 브랜드 사이트

Next.js 16 + Tailwind CSS 4 + 토스페이먼츠 결제위젯 v2.
도메인: **www.kyune.kr**

## 구성

| 경로 | 내용 |
|---|---|
| `/` | 홈 (히어로 + 추천 제품 + 브랜드 스테이트먼트) |
| `/shop` | 전체 제품 (카테고리: 가구 / 오브제) |
| `/shop/[slug]` | 제품 상세 + 장바구니/바로구매 |
| `/cart` | 장바구니 (localStorage 저장) |
| `/checkout` | 토스페이먼츠 결제위젯 |
| `/checkout/success` | 결제 승인 처리 + 주문 완료 |
| `/checkout/fail` | 결제 실패 안내 |
| `/api/payments/confirm` | 서버측 금액 검증 + 토스 승인 API |
| `/about`, `/contact` | 브랜드 소개, 문의 |

## 로컬 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

`.env.local`에 토스페이먼츠 **공용 테스트 키**가 들어 있어 바로 테스트 결제(실결제 아님)가 됩니다.
결제창에서 아무 카드번호로 진행해도 테스트 승인됩니다.

## 실결제까지 가는 순서

1. **사업자등록** + **통신판매업 신고** (PG 심사 필수)
2. [토스페이먼츠 개발자센터](https://developers.tosspayments.com) 가입 → 내 상점의 테스트 키 발급 → `.env.local` 교체
3. 상점 심사(사업자등록증, 통신판매업신고증, 사이트 내 이용약관·개인정보처리방침·환불규정 필요) → **라이브 키** 발급
4. Vercel 환경변수에 라이브 키 등록:
   - `NEXT_PUBLIC_TOSS_CLIENT_KEY` = live_gck_...
   - `TOSS_SECRET_KEY` = live_gsk_... (secret은 절대 클라이언트에 노출 금지)

## Vercel 배포 + kyune.kr 연결

1. GitHub에 이 저장소 push → [vercel.com](https://vercel.com) 에서 Import (설정 그대로 Deploy)
2. Vercel 프로젝트 → Settings → Domains → `www.kyune.kr`, `kyune.kr` 추가
3. 도메인 등록업체(가비아/후이즈 등) DNS 설정:
   - `www` → CNAME → `cname.vercel-dns.com`
   - 루트(`kyune.kr`) → A레코드 → `76.76.21.21`
4. 전파(수 분~수 시간) 후 https 자동 적용 (SSL 무료 자동발급)

## 커스터마이징 포인트

- **제품 교체**: `lib/products.ts` 의 배열 수정 + `public/products/` 에 실사진(1:1, 1600px+) 추가
- **푸터 사업자 정보**: `components/Footer.tsx` 의 [대괄호] 자리표시자 교체
- **컬러/폰트**: `app/globals.css` 의 `@theme` 토큰
- **이용약관/개인정보처리방침**: PG 심사 전 `/terms`, `/privacy` 페이지 추가 필요

## 주문 관리 (초기 운영)

별도 DB 없이 시작하는 구조입니다. 결제 승인된 주문은
**토스페이먼츠 상점관리자**에서 조회/취소/정산 확인이 가능합니다.
주문량이 늘면 `app/api/payments/confirm/route.ts` 의 TODO 위치에
DB 저장(Supabase 등) + 주문 확인 메일 발송을 붙이면 됩니다.

## 보안 메모

- 결제 금액은 클라이언트 값을 신뢰하지 않고 `/api/payments/confirm` 에서
  서버가 장바구니를 재계산해 검증한 뒤에만 승인 API를 호출합니다.
- `TOSS_SECRET_KEY` 는 서버 전용 환경변수로만 사용하세요 (`NEXT_PUBLIC_` 접두사 금지).

<!-- vercel-connect-probe -->
