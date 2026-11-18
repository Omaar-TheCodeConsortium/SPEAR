"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Every app screen is drawn at one fixed size and scaled to fit, so it looks the same at any width.
export const CANVAS_W = 1200;
export const CANVAS_H = 760;

export type Focus = { x: number; y: number; w: number; h: number };
const FULL: Focus = { x: 0, y: 0, w: CANVAS_W, h: CANVAS_H };

// focus crops the picture to one region, used on phones where the whole window would be too small to read.
export default function Stage({
  children,
  label,
  focus = FULL,
  className = "",
}: {
  children: ReactNode;
  label: string;
  focus?: Focus;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const { x, y, w, h } = focus;

  useLayoutEffect(() => {
    const box = outer.current;
    const canvas = inner.current;
    if (!box || !canvas) return;
    const fit = () => {
      const scale = box.clientWidth / w;
      canvas.style.transform = `translate(${-x * scale}px, ${-y * scale}px) scale(${scale})`;
      box.dataset.ready = "";
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [x, y, w]);

  return (
    <div
      ref={outer}
      data-stage=""
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div
        ref={inner}
        data-canvas=""
        aria-hidden="true"
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: CANVAS_W, height: CANVAS_H }}
      >
        {children}
      </div>
    </div>
  );
}

// The pointer that acts out each demo. On phones it is a fingertip instead of an arrow.
export function Cursor({ touch = false }: { touch?: boolean }) {
  return (
    <div data-cursor="" className="pointer-events-none invisible absolute left-0 top-0 z-50 opacity-0">
      <span
        data-ripple=""
        className="absolute -left-6 -top-6 block h-12 w-12 rounded-full border-2 border-brass opacity-0"
      />
      {touch ? (
        <span className="absolute -left-5 -top-5 block h-10 w-10 rounded-full border-2 border-white/90 bg-espresso/35 shadow-[0_4px_14px_rgba(34,27,22,0.3)]" />
      ) : (
        <svg width="30" height="34" viewBox="0 0 30 34" className="drop-shadow-[0_3px_6px_rgba(34,27,22,0.35)]">
          <path d="M2 2 L2 27 L8.5 21 L13 31 L17.5 29 L13 19.5 L22 19.5 Z" fill="#221b16" stroke="#fbf7ef" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
