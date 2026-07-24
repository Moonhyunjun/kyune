# site/ — 기존 kyune.kr 사이트 파일 보관소

기존 kyune.kr 서버에 올라가 있는 사이트 파일의 원본을 이 폴더에서 버전 관리한다.

## 관리 흐름

1. 사이트 파일(zip)이 도착하면 이 폴더에 압축을 풀어 커밋한다
2. 변경 요청이 오면 여기 파일을 수정한다
   - 위젯 스크립트 삽입: 각 HTML의 `</body>` 직전에
     `<script src="https://moonhyunjun.github.io/kyune/widget.js" defer></script>`
   - 홈에는 구독 CTA 섹션(../cta-snippet.html) 삽입
3. 수정 후 렌더링을 확인하고, 업로드용 zip을 만들어 전달한다
4. 사용자는 받은 zip을 기존 방식(FTP 등)으로 서버에 덮어쓰기 업로드만 하면 된다

서버 업로드 외의 모든 작업(수정·검증·패키징)은 Claude가 처리한다.
