# 구독 기능 소스 통합 가이드

kyune.kr Next.js 프로젝트(리추얼 오브제 버전)에 영양제 구독을 통합하는 방법.
이 폴더의 파일들은 사이트의 디자인 토큰(paper/ink/mist/line, Pretendard,
Cormorant serif)과 기존 코드 스타일에 맞춰 작성되어 있다.

## 파일 복사 (3개)

| 이 폴더의 파일 | 프로젝트 내 위치 |
|---|---|
| `app/subscribe/page.tsx` | `app/subscribe/page.tsx` (폴더 새로 생성) |
| `components/SubscribeForm.tsx` | `components/SubscribeForm.tsx` |
| `components/SubscribeCta.tsx` | `components/SubscribeCta.tsx` |
| `components/SuccessUpsell.tsx` | `components/SuccessUpsell.tsx` |

## 코드 수정 (2곳, 각 두 줄)

**1. 홈 `app/page.tsx`** — 상단에 import 추가, Brand statement 섹션 위에 배치:

```tsx
import SubscribeCta from "@/components/SubscribeCta";
// ...
      {/* Featured products 섹션 끝난 뒤 */}
      <SubscribeCta />
```

**2. 주문 완료 `app/checkout/success/page.tsx`** — import 추가, 주문 내역 아래에:

```tsx
import SuccessUpsell from "@/components/SuccessUpsell";
// ...
      <SuccessUpsell />
```

(success 페이지가 클라이언트 컴포넌트라도 SuccessUpsell은 상태가 없어 그대로 동작한다.)

**3. (선택) 헤더 내비게이션** — `components/Header.tsx`의 nav에 추가:

```tsx
<Link href="/subscribe">SUBSCRIBE</Link>
```

## 검증 & 배포

```bash
npm run build      # 통과 확인
npx vercel --prod  # 배포 (DEPLOY.md 참고)
```

## 참고

- 신청 폼은 사전신청(웨이트리스트) 모드 — localStorage(`kyune-subscribe-waitlist`)에 저장.
  결제 연동 시 기존 Toss 결제 플로우(`app/api/payments/confirm`)에 빌링 추가 예정.
- 구버전(금속 가구, 7/10) 소스에 넣어도 토큰이 같아 동작하지만,
  반드시 **현재 배포 중인 리추얼 오브제 버전(7/16)** 소스에 통합할 것.
