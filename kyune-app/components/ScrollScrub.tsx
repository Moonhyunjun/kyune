"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * 스크롤 스크럽 영상 섹션.
 * heightVh 만큼의 스크롤 구간 동안 sticky 화면에 고정된 영상의
 * currentTime을 스크롤 진행률로 감는다(자동재생 없음).
 *
 * - 목표 진행률은 스크롤 핸들러가 저장만 하고, rAF 루프에서 보간(lerp)해
 *   currentTime을 갱신한다 (스크롤 이벤트에서 직접 seek 금지).
 * - 영상은 전 프레임 키프레임(H.264, -g 1)으로 인코딩되어 있어야 즉각 반응한다.
 * - prefers-reduced-motion 이면 스크럽 없이 포스터만 보여준다.
 * - 뷰포트에 가까워졌을 때에만 영상을 로드한다.
 */
export default function ScrollScrub({
  srcMp4,
  srcWebm,
  poster,
  heightVh = 300,
  children,
}: {
  /** H.264 전 키프레임 — Safari/iOS 용 */
  srcMp4: string;
  /** VP9 전 키프레임 — Chrome/Firefox 우선 소스 */
  srcWebm: string;
  poster: string;
  heightVh?: number;
  children?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "60% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !load) return;
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    let target = 0;
    let current = -1;
    let raf = 0;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      target = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!video.duration) return;
      if (current < 0) current = target;
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0004) current = target;
      const t = current * (video.duration - 0.05);
      if (Math.abs(video.currentTime - t) > 0.005) {
        video.currentTime = t;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, load]);

  return (
    <section ref={containerRef} style={{ height: `${heightVh}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!reduced && load && (
          <video
            ref={videoRef}
            poster={poster}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={srcWebm} type="video/webm" />
            <source src={srcMp4} type="video/mp4" />
          </video>
        )}
        {children}
      </div>
    </section>
  );
}
