"use client";
import { useEffect, useRef } from "react";

export function useScrollAnim(): React.RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".anim").forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);
  return ref;
}
