/**
 * KYUNE 영양제 구독 위젯
 *
 * kyune.kr의 각 페이지 </body> 직전에 아래 한 줄로 포함됩니다:
 *
 *   <script src="https://moonhyunjun.github.io/kyune/widget.js" defer></script>
 *
 * 동작:
 *  - 일반 페이지(홈, 제품, about 등): 하단에 구독 안내 바가 슬라이드로 나타남
 *  - 주문 완료 페이지(/success): "구매 감사" 카피로 전환 — 구매 → 구독 연결
 *  - 결제 흐름·계정 페이지(cart, checkout, login, signup, fail, account)와
 *    오류 페이지에서는 표시하지 않음 (결제 방해 금지)
 *  - 닫으면 7일간 다시 표시하지 않음
 *  - React(Next.js) 하이드레이션과 충돌하지 않도록 window load 이후에 DOM 삽입
 */
(function () {
  'use strict';

  var SUBSCRIBE_URL = 'https://moonhyunjun.github.io/kyune/';
  var DISMISS_KEY = 'kyune-subscribe-widget-dismissed';
  var DISMISS_DAYS = 7;

  var path = location.pathname + location.search;

  // 결제 흐름·계정·오류 페이지에서는 아예 표시하지 않음
  if (/cart|checkout|login|signup|fail|account|404|500|error|not-found/i.test(path)) return;

  // 닫은 지 7일이 안 지났으면 표시하지 않음
  try {
    var dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_DAYS * 864e5) return;
  } catch (_) { /* localStorage 불가 환경이면 그냥 표시 */ }

  // 주문 완료 페이지 → 구매 직후용 카피
  var isPurchaseFlow = /success|order-complete|thank/i.test(path);

  var copy = isPurchaseFlow
    ? {
        strong: '주문해주셔서 감사합니다',
        rest: ' — 오브제가 자리를 잡으면, 그 안을 채울 영양제도 매달 셀렉해 보내드릴까요?',
        button: '영양제 구독 보기',
      }
    : {
        strong: '영양제 구독',
        rest: ' — 매달 KYUNE이 셀렉한 영양제를 리추얼에 맞춰 보내드립니다.',
        button: '자세히 보기',
      };

  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    if (document.getElementById('kyune-subscribe-widget')) return;

    var bar = document.createElement('div');
    bar.id = 'kyune-subscribe-widget';
    bar.setAttribute('role', 'complementary');
    bar.setAttribute('aria-label', 'KYUNE 영양제 구독 안내');
    bar.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:2147483000',
      'background:#1a1917', 'color:#f5f2ec',
      'font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Noto Sans KR",sans-serif',
      'box-shadow:0 -8px 30px rgba(20,18,15,0.28)',
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
    text.style.cssText = 'margin:0;font-size:13.5px;font-weight:400;line-height:1.6;letter-spacing:0.01em;';
    var strong = document.createElement('strong');
    strong.style.cssText = 'font-weight:600;';
    strong.textContent = copy.strong;
    text.appendChild(strong);
    text.appendChild(document.createTextNode(copy.rest));

    var link = document.createElement('a');
    link.href = SUBSCRIBE_URL;
    link.textContent = copy.button;
    link.style.cssText = [
      'display:inline-block', 'padding:10px 24px', 'background:#f5f2ec',
      'color:#1a1917', 'font-size:12px', 'letter-spacing:0.14em',
      'text-transform:uppercase', 'text-decoration:none', 'white-space:nowrap',
    ].join(';');

    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', '구독 안내 닫기');
    close.textContent = '×';
    close.style.cssText = [
      'position:absolute', 'top:50%', 'right:16px', 'transform:translateY(-50%)',
      'width:34px', 'height:34px', 'background:none', 'border:none',
      'color:rgba(245,242,236,0.6)', 'font-size:22px', 'cursor:pointer',
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

    // 슬라이드 업 (주문 완료 페이지에선 조금 더 빨리)
    setTimeout(function () {
      bar.style.transform = 'translateY(0)';
    }, isPurchaseFlow ? 600 : 1400);
  }

  // Next.js 하이드레이션이 끝난 뒤에 삽입 (window load + 짧은 지연)
  function schedule() { setTimeout(render, 300); }
  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule);
  }
})();
