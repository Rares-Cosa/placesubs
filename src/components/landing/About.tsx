"use client";

import { useMemo } from "react";

type Palette = { hi: string; mid: string; end: string };

const palettes: Palette[] = [
  { hi: "#6f6f6a", mid: "#3a3a37", end: "#1c1c1a" }, // near-black
  { hi: "#6f6f6a", mid: "#3a3a37", end: "#1c1c1a" },
  { hi: "#ecece6", mid: "#c4c4bc", end: "#9b9b92" }, // warm gray
  { hi: "#ecece6", mid: "#c4c4bc", end: "#9b9b92" },
  { hi: "#fdf8e4", mid: "#f4ebbf", end: "#e6d488" }, // pale yellow
  { hi: "#fdf8e4", mid: "#f4ebbf", end: "#e6d488" },
];

function makeBubbles(count: number) {
  let s = 7;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };

  const out: { norm: number; style: React.CSSProperties }[] = [];
  const N = count;
  const a = 50, b = 33;
  const rot = (-36 * Math.PI) / 180;
  let i = 0, guard = 0;

  while (i < N && guard < 5000) {
    guard++;
    const u = (rnd() * 2 - 1) * a;
    const v = (rnd() * 2 - 1) * b;
    const norm = (u * u) / (a * a) + (v * v) / (b * b);
    if (norm > 1) continue;
    i++;

    const cx = 50 + (u * Math.cos(rot) - v * Math.sin(rot));
    const cy = 50 + (u * Math.sin(rot) + v * Math.cos(rot));
    const size = Math.round(14 + (1 - norm) * 50 + rnd() * 14);
    const p = palettes[Math.floor(rnd() * palettes.length)];

    out.push({
      norm,
      style: {
        position: "absolute",
        width: size + "px",
        height: size + "px",
        left: `calc(${cx}% - ${size / 2}px)`,
        top: `calc(${cy}% - ${size / 2}px)`,
        borderRadius: "50%",
        background: `radial-gradient(circle at 34% 30%, ${p.hi} 0%, ${p.mid} 40%, ${p.end} 80%, ${p.end} 100%)`,
        boxShadow: "0 14px 26px -10px rgba(60,60,55,0.38)",
        animation: `psFloaty ${(5 + rnd() * 4).toFixed(2)}s ease-in-out ${(-rnd() * 4).toFixed(2)}s infinite`,
        zIndex: Math.round(size),
      },
    });
  }

  out.sort((p, q) => q.norm - p.norm);
  return out;
}

export default function About() {
  const bubbles = useMemo(() => makeBubbles(46), []);
  const bubblesMobile = useMemo(() => makeBubbles(18), []);

  return (
    <section id="about" className="scroll-mt-20 bg-background px-6 py-24 md:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Left: copy */}
        <div className="max-w-xl">
          <p className="mb-7 text-sm font-semibold uppercase tracking-[0.14em] text-text-secondary">
            About us
          </p>
          <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-text-primary md:text-7xl">
            We are placesubs.
          </h1>
          <p className="mt-8 max-w-md text-xl leading-relaxed text-text-secondary text-pretty">
            We started in 2026 to help anyone manage their subscriptions — and
            optimize them, all in one simple, clean place.
          </p>

          {/* Mobile cluster — fewer bubbles, below the text */}
          <div className="relative mt-12 h-80 md:hidden">
            {bubblesMobile.map((b, idx) => (
              <div key={idx} style={b.style} />
            ))}
          </div>
        </div>

        {/* Right: desktop cluster */}
        <div className="relative hidden h-140 md:block">
          {bubbles.map((b, idx) => (
            <div key={idx} style={b.style} />
          ))}
        </div>
      </div>
    </section>
  );
}