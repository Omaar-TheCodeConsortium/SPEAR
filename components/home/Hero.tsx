"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { asset } from "@/lib/constants";
import Stage from "@/components/app/Stage";
import AppShell from "@/components/app/AppShell";
import { OverviewScreen } from "@/components/app/screens";
import { filming, frameOn, heroLoop, heroTour } from "@/components/app/demos";
import { BUTTON_DARK, BUTTON_LIGHT, SpearMeaning } from "./ui";

const HERO_LABEL =
  "The SPEAR overview screen: occupancy, restaurant tables, kitchen alerts, tonight's arrivals and restaurant bills sent to rooms.";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.utils.toArray<HTMLElement>("[data-intro]");
        gsap.fromTo(intro, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power4.out", stagger: 0.09, delay: 0.1 });

        // The app window starts tipped back and settles flat as the page scrolls.
        const frame = root.current!.querySelector("[data-hero-window]");
        gsap.fromTo(frame, { rotateX: 16, scale: 0.94 }, {
          rotateX: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: frame, start: "top 90%", end: "top 25%", scrub: 0.6 },
        });

        root.current!.querySelectorAll<HTMLElement>("[data-canvas]").forEach((canvas) => {
          if (!filming(canvas)) return heroLoop(canvas);
          // On phones the camera tours the overview, and rests while the hero is off screen.
          const tour = heroTour(canvas).pause();
          ScrollTrigger.create({
            trigger: canvas.parentElement,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? tour.play() : tour.pause()),
          });
        });
      });
      // Without motion, the phone camera rests on one readable card.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.current!.querySelectorAll<HTMLElement>("[data-canvas][data-camera]").forEach((canvas) => frameOn(canvas, { d: "ov-bills", w: 460 }));
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative overflow-hidden pb-8 pt-28 md:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(199,154,69,0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center md:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-intro=""
          src={asset("/brand/wordmark.webp")}
          alt="SPEAR"
          width={1280}
          height={143}
          className="mx-auto h-auto w-[min(82vw,560px)]"
          fetchPriority="high"
        />
        <p data-intro="" className="mt-6">
          <SpearMeaning className="text-[12px] tracking-[0.14em] md:text-[13px]" />
        </p>
        <h1 id="hero-title" data-intro="" className="mx-auto mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em]">
          Every room, table and guest in one system.
        </h1>
        <p data-intro="" className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-taupe md:text-[20px]">
          SPEAR OS runs your front desk, restaurant, kitchen and housekeeping as one product, and keeps working when the internet doesn&apos;t.
        </p>
        <p data-intro="" className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className={BUTTON_DARK}>
            Book a demo
          </a>
          <a href="#product" className={BUTTON_LIGHT}>
            See it work
          </a>
        </p>
      </div>

      <div data-intro="" className="relative mx-auto mt-16 max-w-6xl px-4 [perspective:1800px] md:mt-20 md:px-8">
        <div data-hero-window="" className="origin-top overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_40px_80px_-24px_rgba(34,27,22,0.35)]">
          <Stage className="hidden md:block" label={HERO_LABEL}>
            <AppShell active="overview">
              <OverviewScreen />
            </AppShell>
          </Stage>
          {/* On phones the whole window would be too small to read, so a camera tours it up close */}
          <Stage className="md:hidden" label={HERO_LABEL} camera>
            <AppShell active="overview">
              <OverviewScreen />
            </AppShell>
          </Stage>
        </div>
      </div>
    </section>
  );
}
