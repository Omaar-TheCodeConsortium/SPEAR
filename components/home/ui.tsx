import type { ReactNode } from "react";

// Shared pieces so every section looks and moves the same way.

export const BUTTON_DARK =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-espresso px-6 text-[15px] font-semibold text-linen transition-[background-color,transform] duration-200 hover:bg-brass-deep active:scale-[0.98]";
export const BUTTON_LIGHT =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-brass px-6 text-[15px] font-semibold text-espresso transition-[background-color,transform] duration-200 hover:bg-brass/10 active:scale-[0.98]";

export const EYEBROW = "text-[12px] font-semibold uppercase tracking-[0.14em] text-brass-deep";
export const H2 = "text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em]";
export const LEAD = "text-[17px] leading-relaxed text-taupe md:text-[19px]";

export function SectionHead({
  id,
  eyebrow,
  title,
  line,
  align = "center",
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  line?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  const centre = align === "center";
  return (
    <div className={`mx-auto max-w-6xl px-5 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32 ${centre ? "text-center" : ""}`}>
      <p data-reveal="" className={dark ? "text-[12px] font-semibold uppercase tracking-[0.14em] text-brass" : EYEBROW}>
        {eyebrow}
      </p>
      <h2 id={id} data-reveal="" className={`mt-4 ${H2} ${centre ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
        {title}
      </h2>
      {line ? (
        <p data-reveal="" className={`mt-5 ${dark ? "text-[17px] leading-relaxed text-linen/70 md:text-[19px]" : LEAD} ${centre ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {line}
        </p>
      ) : null}
    </div>
  );
}
