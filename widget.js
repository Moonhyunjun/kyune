/**
 * KYUNE 영양제 구독 위젯
 *
 * 기존 kyune.kr 사이트의 </body> 직전에 아래 한 줄만 넣으면 동작합니다:
 *
 *   <script src="https://moonhyunjun.github.io/kyune/widget.js" defer></script>
 *
 * 동작:
 *  - 모든 페이지: 하단에 구독 안내 바가 슬라이드로 나타남 (닫으면 7일간 다시 안 뜸)
 *  - 주문 완료/결제 페이지(URL에 order·complete·checkout·thank·success 포함):
 *    "방금 구매하신 케이스를 채울 영양제" 문구로 자동 전환 — 구매 → 구독 연결
 *  - 기존 사이트의 스타일·스크립트와 충돌하지 않도록 전부 자체 스타일로 렌더링
 */
(function () {
  'use strict';

  var SUBSCRIBE_URL = 'https://moonhyunjun.github.io/kyune/';
  var DISMISS_KEY = 'kyune-subscribe-widget-dismissed';
  var DISMISS_DAYS = 7;

  // 닫은 지 7일이 안 지났으면 표시하지 않음
  try {
    var dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_DAYS * 864e5) return;
  } catch (_) { /* localStorage 불가 환경이면 그냥 표시 */ }

  // 주문/결제 관련 페이지 감지 → 구매 직후용 카피로 전환
  var isPurchaseFlow = /order|complete|checkout|thank|success|payment/i
    .test(location.pathname + location.search);

  var copy = isPurchaseFlow
    ? {
        strong: '케이스 구매 감사합니다',
        rest: ' — 그 안을 채울 영양제, KYUNE이 매달 셀렉해 보내드릴까요?',
        button: '영양제 구독 보기',
      }
    : {
        strong: '영양제 구독',
        rest: ' — 매달 KYUNE이 셀렉한 영양제를 케이스에 맞춰 보내드립니다.',
        button: '자세히 보기',
      };

  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    var bar = document.createElement('div');
    bar.id = 'kyune-subscribe-widget';
    bar.setAttribute('role', 'complementary');
    bar.setAttribute('aria-label', 'KYUNE 영양제 구독 안내');
    bar.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:2147483000',
      'background:#2b2823', 'color:#f4f0e9',
      'font-family:"Noto Sans KR","Apple SD Gothic Neo",sans-serif',
      'box-shadow:0 -8px 30px rgba(43,40,35,0.25)',
      'transform:translateY(100%)',
      reduceMotion ? '' : 'transition:transform .45s cubic-bezier(.22,.8,.36,1)',
    ].join(';');

    var inner = document.createElement('div');
    inner.style.cssText = [
      'max-width:1120px', 'margin:0 auto', 'padding:14px 56px 14px 24px',
      'display:flex', 'align-items:center', 'justify-content:space-between',
      'gap:16px', 'flex-wrap:wrap', 'position:relative',
    ].join(';');

    var text = document.createElement('p');
    text.style.cssText = 'margin:0;font-size:14px;font-weight:300;line-height:1.6;';
    var strong = document.createElement('strong');
    strong.style.cssText = 'font-weight:500;';
    strong.textContent = copy.strong;
    text.appendChild(strong);
    text.appendChild(document.createTextNode(copy.rest));

    var link = document.createElement('a');
    link.href = SUBSCRIBE_URL;
    link.textContent = copy.button;
    link.style.cssText = [
      'display:inline-block', 'padding:10px 24px', 'background:#f4f0e9',
      'color:#2b2823', 'font-size:13px', 'letter-spacing:0.06em',
      'text-decoration:none', 'white-space:nowrap',
    ].join(';');

    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', '구독 안내 닫기');
    close.textContent = '×';
    close.style.cssText = [
      'position:absolute', 'top:50%', 'right:16px', 'transform:translateY(-50%)',
      'width:34px', 'height:34px', 'background:none', 'border:none',
      'color:rgba(244,240,233,0.6)', 'font-size:22px', 'cursor:pointer',
      'line-height:1',
    ].join(';');
    close.addEventListener('click', function () {
      try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (_) {}
      bar.style.transform = 'translateY(100%)';
      setTimeout(function () { bar.remove(); }, reduceMotion ? 0 : 500);
    });

    inner.appendChild(text);
    inner.appendChild(link);
    inner.appendChild(close);
    bar.appendChild(inner);
    document.body.appendChild(bar);

    // 슬라이드 업 (구매 완료 페이지에선 조금 더 빨리)
    setTimeout(function () {
      bar.style.transform = 'translateY(0)';
    }, isPurchaseFlow ? 400 : 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
