"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimCounter({
  end, suffix = "", duration = 2200,
}: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let n = 0;
    const step = Math.ceil(end / (duration / 16));
    const t = setInterval(() => {
      n += step;
      if (n >= end) { setCount(end); clearInterval(t); } else setCount(n);
    }, 16);
    return () => clearInterval(t);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
