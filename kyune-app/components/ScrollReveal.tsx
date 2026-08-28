"use client";

import { useEffect } from "react";

/**
 * animation-on-scroll skill — IntersectionObserver가 .reveal 요소에
 * .animate를 붙여 paused 상태의 keyframe을 재생시킨다.
 *
 * 라우트 pathname뿐 아니라 쿼리만 바뀌는 내비게이션(/shop?category=…)에서도
 * 새로 마운트된 요소를 잡아야 하므로, MutationObserver로 DOM에 추가되는
 * .reveal 요소를 계속 감시한다. (pathname 의존 방식은 탭 필터 전환 시
 * 새 카드가 관찰되지 않아 투명한 채로 남는 버그가 있었다.)
 */
export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = (root: ParentNode) => {
      root
        .querySelectorAll(".reveal:not(.animate)")
        .forEach((el) => io.observe(el));
    };

    observeAll(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          if (el.classList.contains("reveal") && !el.classList.contains("animate")) {
            io.observe(el);
          }
          observeAll(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
