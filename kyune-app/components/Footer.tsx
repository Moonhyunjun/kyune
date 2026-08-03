export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:flex-row sm:justify-between">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.3em]">
            Kyune
          </p>
          <p className="mt-3 max-w-xs text-[12px] leading-6 text-mist">
            하루를 정돈하는 리추얼 오브제. 아침과 밤, 모든 습관에 자리를
            만듭니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-[11px] font-medium uppercase leading-7 tracking-[0.14em] text-ink/70">
          <a href="/shop" className="hover:text-accent">
            Shop
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent"
          >
            Instagram
          </a>
          <a href="/about" className="hover:text-accent">
            About
          </a>
          <a
            href="mailto:info@kyune.kr"
            className="normal-case tracking-normal hover:text-accent"
          >
            info@kyune.kr
          </a>
          <a href="/contact" className="hover:text-accent">
            Contact
          </a>
        </div>
      </div>

      {/* giant logotype — fashion-brand footer staple */}
      <div className="overflow-hidden px-2" aria-hidden>
        <p className="select-none text-center text-[21vw] font-bold uppercase leading-[0.95] tracking-[0.02em] text-ink/[0.06]">
          KYUNE
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-5 text-[11px] leading-5 text-mist">
          <p>
            큐네(KYUNE) · 대표: 문현준, 조경환 · 사업자등록번호: 596-73-00640 ·
            통신판매업신고: 제2026-서울강남-04145호
          </p>
          <p>
            주소: 서울특별시 강남구 선릉로 704, 12층 1246-3호 청담빌딩(청담동) ·
            문의: info@kyune.kr · © {new Date().getFullYear()} KYUNE. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
