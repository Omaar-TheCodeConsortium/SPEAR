"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Every app screen is drawn at one fixed size and scaled to fit, so it looks the same at any width.
export const CANVAS_W = 1200;
export const CANVAS_H = 760;

export type Focus = { x: number; y: number; w: number; h: number };
const FULL: Focus = { x: 0, y: 0, w: CANVAS_W, h: CANVAS_H };

// A camera shot: the top-left corner and width of the region in view, in canvas pixels.
// On phones the stage is a portrait frame, so a shot is always CAMERA_RATIO times taller than it is wide.
export type Shot = { x: number; y: number; w: number };
export const CAMERA_RATIO = 1.25;
// The whole window, small, with a margin round it, so it reads as a desktop screen.
export const WIDE: Shot = { x: -70, y: (CANVAS_H - (CANVAS_W + 140) * CAMERA_RATIO) / 2, w: CANVAS_W + 140 };

// The camera position lives in CSS variables, so GSAP can move it and reverting a demo puts it back.
const CAMERA_STYLE = {
  "--bw": 358,
  "--cx": WIDE.x,
  "--cy": WIDE.y,
  "--cw": WIDE.w,
  transform:
    "translate(calc(var(--cx) * var(--bw) / var(--cw) * -1px), calc(var(--cy) * var(--bw) / var(--cw) * -1px)) scale(calc(var(--bw) / var(--cw)))",
} as CSSProperties;

// focus crops the picture to one fixed region. camera instead films the window up close on phones,
// with a camera that the demos move from shot to shot.
export default function Stage({
  children,
  label,
  focus = FULL,
  camera = false,
  className = "",
}: {
  children: ReactNode;
  label: string;
  focus?: Focus;
  camera?: boolean;
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
      if (camera) canvas.style.setProperty("--bw", String(box.clientWidth));
      else {
        const scale = box.clientWidth / w;
        canvas.style.transform = `translate(${-x * scale}px, ${-y * scale}px) scale(${scale})`;
      }
      box.dataset.ready = "";
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [x, y, w, camera]);

  return (
    <div
      ref={outer}
      data-stage=""
      role="img"
      aria-label={label}
      className={`relative overflow-hidden ${camera ? "bg-parchment" : ""} ${className}`}
      style={{ aspectRatio: camera ? `1 / ${CAMERA_RATIO}` : `${w} / ${h}` }}
    >
      <div
        ref={inner}
        data-canvas=""
        data-camera={camera ? "" : undefined}
        aria-hidden="true"
        className={`absolute left-0 top-0 origin-top-left ${camera ? "overflow-hidden rounded-[20px] shadow-[0_30px_70px_-10px_rgba(34,27,22,0.45)] ring-1 ring-line" : ""}`}
        style={{ width: CANVAS_W, height: CANVAS_H, ...(camera ? CAMERA_STYLE : {}) }}
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
