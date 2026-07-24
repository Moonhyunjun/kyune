"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * animation-on-scroll skill — IntersectionObserver가 .reveal 요소에
 * .animate를 붙여 paused 상태의 keyframe을 재생시킨다.
 * 라우트가 바뀔 때마다 새로 마운트된 요소를 다시 관찰한다.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

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

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
