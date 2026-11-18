"use client";

import { useRef } from "react";
import { Cloud, Monitor, Server, Smartphone, Tv } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { SectionHead } from "./ui";

const FACTS = [
  ["72 hours", "of trading with no internet, with no sale lost"],
  ["99.9%", "uptime for the SPEAR cloud"],
  ["7 years", "every bill and folio kept unaltered"],
  ["0", "card numbers stored by SPEAR"],
];

const DEVICES = [
  { name: "Front desk", Icon: Monitor },
  { name: "Tills", Icon: Monitor },
  { name: "Kitchen screens", Icon: Tv },
  { name: "Staff phones", Icon: Smartphone },
];

export default function Reliability() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const count = { n: 0 };
        const counter = q("[data-count]")[0];
        // The internet drops, the property keeps trading, then everything syncs. On a loop while in view.
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true, defaults: { ease: "power2.out" } });
        tl.set(count, { n: 0 })
          .to(q("[data-packet]"), { x: "100%", duration: 1.4, ease: "none", stagger: 0.45, repeat: 1 })
          .to(q("[data-link]"), { backgroundColor: "#c85a32", opacity: 0.9, duration: 0.3 })
          .to(q("[data-packet]"), { autoAlpha: 0, duration: 0.2 }, "<")
          .fromTo(q("[data-offline]"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "<")
          .to(count, { n: 37, duration: 2.6, ease: "none", onUpdate: () => { if (counter) counter.textContent = String(Math.round(count.n)); } })
          .to(q("[data-offline]"), { autoAlpha: 0, duration: 0.3 })
          .to(q("[data-link]"), { backgroundColor: "#c79a45", opacity: 1, duration: 0.3 }, "<")
          .fromTo(q("[data-synced]"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35 }, "<")
          .to(q("[data-synced]"), { autoAlpha: 0, duration: 0.3 }, "+=2")
          .set(q("[data-packet]"), { x: "0%", autoAlpha: 1 });
        gsap.timeline({ scrollTrigger: { trigger: q("[data-diagram]")[0], start: "top 80%", end: "bottom 10%", onToggle: (self) => (self.isActive ? tl.play() : tl.pause()) } });
      });
    },
    { scope: root },
  );

  return (
    <section id="reliability" ref={root} aria-labelledby="reliability-title" className="mt-24 scroll-mt-16 bg-espresso text-linen md:mt-32">
      <SectionHead
        id="reliability-title"
        dark
        eyebrow="Reliability"
        title="Keeps working when the internet doesn't."
        line="Your tills, kitchen screens and front desk run through a small SPEAR server on your property. If the connection drops, service carries on, and everything catches up when it's back."
      />
      <div className="mx-auto max-w-6xl px-5 pb-24 md:px-8 md:pb-32">
        <div data-diagram="" data-reveal="" className="grid items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1.4fr_auto_1fr] md:gap-0 md:p-10">
          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-linen/60">Your property</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {DEVICES.map(({ name, Icon }) => (
                <li key={name} className="flex items-center gap-2.5 rounded-lg bg-white/[0.06] px-3 py-2.5 text-[14px]">
                  <Icon size={16} className="text-brass" /> {name}
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#7fae88]" />
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2.5 rounded-lg border border-brass/40 px-3 py-2.5 text-[14px] font-semibold">
              <Server size={16} className="text-brass" /> On-site SPEAR server
            </p>
          </div>

          <div className="relative mx-auto h-24 w-px md:h-px md:w-40 lg:w-56">
            <span data-link="" className="absolute inset-0 bg-brass" />
            <span className="absolute inset-0 overflow-hidden">
              {[0, 1, 2].map((i) => (
                <span key={i} data-packet="" className="absolute inset-0 hidden md:block">
                  <span className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-brass" />
                </span>
              ))}
            </span>
            <span data-offline="" className="invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-rust px-3 py-1 text-center text-[12px] font-semibold opacity-0">
              Internet down · <span data-count="">0</span> orders taken
            </span>
            <span data-synced="" className="invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-sage px-3 py-1 text-[12px] font-semibold opacity-0">
              Back online · all synced
            </span>
          </div>

          <div className="rounded-xl border border-white/10 p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-linen/60">SPEAR cloud</p>
            <p className="mt-4 flex items-center gap-2.5 text-[15px]">
              <Cloud size={18} className="text-brass" /> Your website, bookings, channel manager and reports
            </p>
            <p className="mt-3 text-[14px] text-linen/60">Backed up continuously, and restorable to any minute.</p>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {FACTS.map(([figure, meaning]) => (
            <div key={figure} data-reveal="" className="border-t border-white/15 pt-5">
              <dt className="text-[clamp(2.2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] text-brass">{figure}</dt>
              <dd className="mt-3 text-[15px] leading-snug text-linen/75">{meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
