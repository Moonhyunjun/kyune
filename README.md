# KYUNE — 알약케이스 & 영양제 구독

kyune.kr 홈페이지. 알약케이스를 판매하고, 그 안을 채울 영양제를
KYUNE이 매달 셀렉해 보내주는 구독 서비스를 함께 제공하는 사이트.

> "하루의 영양을 담는 가장 단정한 방법"

## 구조

**구독 모듈 (기존 사이트에 얹는 부분 — 이 세 파일 + 스니펫만 있으면 됨)**

```
subscribe.html    # 영양제 구독 독립 페이지 (이용 방법 3단계 / 플랜 4종 / 신청 폼 / FAQ)
css/subscribe.css # 구독 페이지 전용 스타일 — 다른 파일 의존 없음
js/subscribe.js   # 구독 페이지 전용 스크립트 — 다른 파일 의존 없음
cta-snippet.html  # 기존 홈에 복사-붙여넣기하는 구독 안내 섹션 (인라인 스타일, 2가지 버전)
```

기존 kyune.kr 사이트는 그대로 두고, 위 세 파일을 올린 뒤
`cta-snippet.html` 안의 섹션 하나를 홈 원하는 위치에 붙여넣으면 끝.
빌더(아임웹/카페24 등)를 쓰는 경우 "HTML 삽입" 위젯에 스니펫을 넣으면 된다.

**데모 메인 페이지 (참고용 — 기존 사이트가 이 리포에 없어서 만든 스탠드인)**

```
index.html      # 데모 메인 (히어로 / 철학 / 제품: 알약케이스 / 구독 CTA / 저널 / FAQ)
css/style.css   # 데모 메인 스타일
js/main.js      # 데모 메인 스크립트
```

빌드 도구 없이 정적 파일로 동작합니다. 로컬 확인:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 구독 플랜 (가격은 임시값 — 원가 확정 후 조정)

| 기간 | 월 요금 | 비고 |
|---|---|---|
| 1개월 | 69,000원 | 매월 자동 결제, 언제든 해지 |
| 3개월 | 65,000원 | 약 6% 할인 |
| 6개월 | 62,000원 | 약 10% 할인 · 알약케이스 증정 |
| 12개월 | 59,000원 | 약 14% 할인 · 케이스 증정 + 리미티드 우선 구매 |

## 구독 신청 폼

현재는 사전 신청(웨이트리스트) 모드로, 신청 내역을 브라우저 `localStorage`
(`kyune-waitlist` 키)에 저장하고 완료 안내를 표시합니다.
결제/구독 백엔드가 준비되면 `js/main.js`의 submit 핸들러를 API 호출로 교체하면 됩니다.

## UI/UX Pro Max 스킬

`.claude/skills/ui-ux-pro-max/`에 [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
스킬이 설치되어 있다. Claude Code에서 UI/UX 작업 시 자동으로 활용되며,
디자인 시스템 생성은 다음처럼 직접 실행할 수도 있다:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "premium wellness ecommerce" --design-system -p "KYUNE"
```

스킬의 체크리스트를 반영해 적용된 항목: 텍스트 대비 WCAG AA(4.5:1) 충족,
`:focus-visible` 키보드 포커스 스타일, `prefers-reduced-motion` 대응.

## 다음 단계 후보

- 결제 연동 (토스페이먼츠 빌링 / 아임포트 정기결제)
- 신청 폼 → 서버 수집 (또는 임시로 폼 수집 서비스 연동)
- 저널 상세 페이지, 이전 에디션 아카이브
- Direction B(대중 라인)를 세컨드 라인으로 추가할 경우 별도 섹션/서브브랜드로 분리
