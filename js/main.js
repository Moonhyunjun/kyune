// KYUNE — 사이트 인터랙션

(function () {
  'use strict';

  // 스크롤 시 헤더 배경 전환
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  header.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // 플랜 선택 → 신청 폼으로 스크롤 + 플랜 프리셋
  const planField = document.getElementById('planField');
  document.querySelectorAll('.plan-select').forEach((button) => {
    button.addEventListener('click', () => {
      planField.value = button.dataset.planName;
      document.getElementById('subscribe').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // 구독 신청 폼
  // TODO: 결제/구독 백엔드 연동 전까지는 신청 내역을 로컬에 보관하는 사전 신청 폼으로 동작.
  //       백엔드가 준비되면 아래 submit 핸들러에서 API 호출로 교체.
  const form = document.getElementById('subscribeForm');
  const message = document.getElementById('formMessage');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const plan = planField.value;
    const name = document.getElementById('nameField').value.trim();
    const email = document.getElementById('emailField').value.trim();

    if (!plan || !name || !email) {
      message.textContent = '모든 항목을 입력해주세요.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.textContent = '이메일 주소를 확인해주세요.';
      return;
    }

    try {
      const entries = JSON.parse(localStorage.getItem('kyune-waitlist') || '[]');
      entries.push({ plan, name, email, at: new Date().toISOString() });
      localStorage.setItem('kyune-waitlist', JSON.stringify(entries));
    } catch (_) {
      // 저장 실패해도 신청 완료 안내는 그대로 진행
    }

    form.reset();
    message.textContent = '신청이 완료되었습니다. 오픈 소식을 가장 먼저 전해드릴게요.';
  });
})();
