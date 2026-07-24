# 배포 플레이북 (Claude Code용)

사용자가 "배포해줘"라고 하면 아래 순서를 그대로 실행하세요.
각 단계에서 사용자 확인이 필요한 순간(로그인 링크 클릭)에만 멈추고 안내합니다.

## 0. 사전 확인

```bash
node -v   # 20 이상 필요. 없으면 https://nodejs.org LTS 설치 안내
```

## 1. 의존성 설치 + 로컬 확인

```bash
npm install
npm run build   # 통과해야 다음 단계 진행
```

(선택) `npm run dev` 후 http://localhost:3000 확인.

## 2. Vercel 로그인

```bash
npx vercel login
```

- 브라우저가 열리면 사용자에게 로그인/승인 클릭을 요청하세요.
- Vercel 계정이 없으면 GitHub 또는 이메일(moon@antrix.kr)로 가입하면 됩니다.

## 3. 프로젝트 배포

```bash
npx vercel --yes          # 프리뷰 배포 (프로젝트 자동 생성, 이름: kyune)
```

## 4. 환경변수 등록 (토스페이먼츠 키)

`.env.local`에 있는 값을 그대로 등록합니다 (공용 테스트 키, 실결제 아님):

```bash
npx vercel env add NEXT_PUBLIC_TOSS_CLIENT_KEY production
# 값: test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm
npx vercel env add TOSS_SECRET_KEY production
# 값: test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6
```

## 5. 프로덕션 배포

```bash
npx vercel --prod
```

## 6. 도메인 연결

```bash
npx vercel domains add kyune.kr
npx vercel domains add www.kyune.kr
```

그 다음 사용자에게 안내: 도메인 등록업체(가비아/후이즈 등) DNS 관리에서 추가 —

| 구분 | 타입 | 값 |
|---|---|---|
| www | CNAME | cname.vercel-dns.com |
| @ (루트) | A | 76.76.21.21 |

`npx vercel domains inspect kyune.kr` 로 연결 상태 확인 가능.
전파 후 https://www.kyune.kr 접속 확인하면 완료.

## 7. 실결제 전환 (나중에)

README.md의 "실결제까지 가는 순서" 참고 — 사업자등록 + 통신판매업 신고 후
토스페이먼츠 라이브 키 발급받아 4번 환경변수만 교체 + 재배포.
