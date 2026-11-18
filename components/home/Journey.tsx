"use client";

import { useRef } from "react";
import { CalendarDays, KeyRound, QrCode, Receipt, SprayCan, UtensilsCrossed } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHead } from "./ui";

// One guest's stay, told in six moments, each handled by a different part of SPEAR.
const STAY = [
  { when: "Fri 14:02", what: "Books on your website", part: "Booking engine", Icon: CalendarDays },
  { when: "Fri 15:10", what: "Checks in at the desk", part: "Front desk", Icon: QrCode },
  { when: "Fri 19:30", what: "Dinner at table 8", part: "Restaurant", Icon: UtensilsCrossed },
  { when: "Fri 21:12", what: "Bill goes to Room 402", part: "Folio", Icon: Receipt },
  { when: "Sun 11:00", what: "Checks out, key cancelled", part: "Smart locks", Icon: KeyRound },
  { when: "Sun 11:01", what: "Room cleaned and ready", part: "Housekeeping", Icon: SprayCan },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const list = root.current!.querySelector("[data-stay]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 55%", scrub: 0.8 } });
        tl.fromTo("[data-line-x], [data-line-y]", { scale: 0 }, { scale: 1, ease: "none", duration: 1 });
        gsap.utils.toArray<HTMLElement>("[data-moment]").forEach((moment, i) => {
          tl.fromTo(moment.querySelector("[data-icon]"), { scale: 0.6, backgroundColor: "#fbf7ef", color: "#5c4f44" }, { scale: 1, backgroundColor: "#221b16", color: "#f7f1e6", duration: 0.12, ease: "back.out(2)" }, i / STAY.length);
          tl.fromTo(moment.querySelectorAll("[data-text]"), { opacity: 0.35 }, { opacity: 1, duration: 0.12 }, "<");
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="connected" ref={root} aria-labelledby="connected-title" className="scroll-mt-16">
      <SectionHead
        id="connected-title"
        eyebrow="How it connects"
        title="One guest. One stay. One system."
        line="Every part of SPEAR shares the same guests, rooms and bills, so nothing is typed twice and nothing gets lost between departments."
      />
      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
        <ol data-stay="" className="relative grid gap-8 md:grid-cols-6 md:gap-4">
          <span aria-hidden="true" className="absolute left-[27px] top-2 bottom-2 w-px bg-line md:hidden" />
          <span aria-hidden="true" data-line-y="" className="absolute left-[27px] top-2 bottom-2 w-px origin-top bg-brass-deep md:hidden" />
          <span aria-hidden="true" className="absolute left-[8%] right-[8%] top-[27px] hidden h-px bg-line md:block" />
          <span aria-hidden="true" data-line-x="" className="absolute left-[8%] right-[8%] top-[27px] hidden h-px origin-left bg-brass-deep md:block" />
          {STAY.map(({ when, what, part, Icon }) => (
            <li key={what} data-moment="" className="relative flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
              <span data-icon="" className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full border border-line bg-espresso text-linen">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <span className="md:mt-5">
                <span data-text="" className="block text-[12px] font-semibold tabular-nums text-brass-deep">{when}</span>
                <span data-text="" className="mt-1 block text-[17px] font-semibold leading-snug">{what}</span>
                <span data-text="" className="mt-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-[12px] text-taupe">{part}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
