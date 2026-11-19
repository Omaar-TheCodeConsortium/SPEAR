"use client";

import { useRef, type ComponentType } from "react";
import { ArrowDown, RotateCcw } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Stage, { Cursor } from "@/components/app/Stage";
import AppShell, { RAIL, RAIL_STEP, type RailKey } from "@/components/app/AppShell";
import { FrontDeskScreen, HousekeepingScreen, KitchenScreen, RestaurantScreen, RoomsScreen } from "@/components/app/screens";
import { buildDemo, FILMS, frontDeskDemo, housekeepingDemo, kitchenDemo, resetCamera, restaurantDemo, roomsDemo, type DemoKit } from "@/components/app/demos";
import { SectionHead } from "./ui";

type Area = {
  rail: RailKey;
  title: string;
  line: string;
  steps: [string, string, string];
  Screen: ComponentType;
  demo: (kit: DemoKit) => void;
  label: string;
};

const AREAS: Area[] = [
  {
    rail: "desk",
    title: "Front desk",
    line: "Check a guest in at the desk and hand their stay to their phone.",
    steps: ["Check the guest's ID at the desk", "Show a single-use QR code to scan", "Their stay opens on their phone, no app"],
    Screen: FrontDeskScreen,
    demo: frontDeskDemo,
    label: "SPEAR front desk screen: a guest is checked in and given a QR code that opens their stay on their phone.",
  },
  {
    rail: "rooms",
    title: "Rooms",
    line: "Change a stay on the room calendar and everything else follows.",
    steps: ["Drag a stay to add a night", "The guest's bill updates itself", "Their wallet room key is extended"],
    Screen: RoomsScreen,
    demo: roomsDemo,
    label: "SPEAR room calendar: a stay is extended by a night and the bill and room key update.",
  },
  {
    rail: "restaurant",
    title: "Restaurant",
    line: "A hotel guest's dinner goes straight onto their room bill.",
    steps: ["Open the table's bill from the floor plan", "SPEAR knows the table is a hotel guest", "Charge it to their room in one tap"],
    Screen: RestaurantScreen,
    demo: restaurantDemo,
    label: "SPEAR restaurant screen: table 8's bill is charged to the guest's hotel room.",
  },
  {
    rail: "kitchen",
    title: "Kitchen",
    line: "Every dish sold takes its ingredients out of stock, to the gram.",
    steps: ["Each sale deducts its recipe from stock", "Run out, and the dish leaves every menu", "Reorder from the supplier in one click"],
    Screen: KitchenScreen,
    demo: kitchenDemo,
    label: "SPEAR kitchen screen: a sale uses up the last Wagyu, the dish is taken off the menu and a supplier order is sent.",
  },
  {
    rail: "housekeeping",
    title: "Housekeeping",
    line: "Checkout sends the cleaning job, and the room comes back ready to sell.",
    steps: ["Checkout flags the room for cleaning", "Housekeeping gets the job on their phone", "Marked clean, the room is ready to sell"],
    Screen: HousekeepingScreen,
    demo: housekeepingDemo,
    label: "SPEAR housekeeping screen: a checked-out room goes to a housekeeper's phone and comes back ready.",
  },
];

function Steps({ steps }: { steps: Area["steps"] }) {
  return (
    <ol className="mt-5 space-y-2.5">
      {steps.map((text) => (
        <li key={text} data-s="" className="step flex gap-3 text-[15px] leading-snug">
          <span className="dot" />
          {text}
        </li>
      ))}
    </ol>
  );
}

function ReplayButton({ index }: { index: number }) {
  return (
    <button
      type="button"
      data-replay={index}
      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[13px] font-semibold text-taupe transition-colors hover:border-brass hover:text-espresso active:scale-[0.97]"
    >
      <RotateCcw size={14} /> Play again
    </button>
  );
}

const WINDOW = "overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_30px_60px_-20px_rgba(34,27,22,0.28)]";

export default function Showcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const mm = gsap.matchMedia();

      // Marks the caption steps for one area: earlier steps done, the current one active.
      const stepper = (list: Element | null) => (index: number) => {
        list?.querySelectorAll("[data-s]").forEach((item, k) => {
          item.classList.toggle("is-done", k < index);
          item.classList.toggle("is-active", k === index);
        });
      };

      // Builds and plays one demo inside its own context so it can be undone completely.
      const run = (area: Area, canvas: HTMLElement, cursor: HTMLElement, step: (i: number) => void, reduce: boolean, onDone?: () => void) => {
        step(-1);
        const ctx = gsap.context(() => {
          const tl = buildDemo(area.demo, FILMS[area.rail], { canvas, cursor, step, reduce });
          if (reduce) {
            tl.progress(1);
            gsap.set(cursor, { autoAlpha: 0 });
            onDone?.();
          } else {
            if (onDone) tl.eventCallback("onComplete", onDone);
            tl.play();
          }
        }, canvas);
        return () => {
          ctx.revert();
          resetCamera(canvas);
          step(-1);
        };
      };

      // GSAP only runs this when at least one condition matches, so phones need a condition of their own.
      mm.add({ desktop: "(min-width: 1024px)", phone: "(max-width: 1023.98px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { desktop, reduce } = context.conditions as { desktop: boolean; reduce: boolean };
        const replayHandlers: ((event: Event) => void)[] = [];

        if (desktop) {
          const pin = section.querySelector<HTMLElement>("[data-pin]")!;
          const canvas = pin.querySelector<HTMLElement>("[data-canvas]")!;
          const cursor = canvas.querySelector<HTMLElement>("[data-cursor]")!;
          const screens = gsap.utils.toArray<HTMLElement>("[data-screen]", canvas);
          const captions = gsap.utils.toArray<HTMLElement>("[data-area]", pin);
          const indicator = canvas.querySelector<HTMLElement>("[data-rail-indicator]")!;
          const progress = pin.querySelector<HTMLElement>("[data-progress]");
          // The prompt at the foot of the window: which area this is, and a button to the next one.
          const cue = pin.querySelector<HTMLElement>("[data-cue]")!;
          const cueCount = cue.querySelector<HTMLElement>("[data-cue-count]")!;
          const cueLabel = cue.querySelector<HTMLElement>("[data-cue-label]")!;
          const segments = gsap.utils.toArray<HTMLElement>("[data-seg]", cue);
          let current = -1;
          let undo: (() => void) | null = null;

          const activate = (index: number, replay = false) => {
            if (index === current && !replay) return;
            const previous = current;
            current = index;
            undo?.();
            captions.forEach((caption, k) => caption.classList.toggle("is-active", k === index));
            const railIndex = RAIL.findIndex((item) => item.key === AREAS[index].rail);
            canvas.querySelectorAll("[data-rail]").forEach((item, k) => item.classList.toggle("is-active", k === railIndex));
            if (previous !== index) {
              if (previous >= 0) gsap.to(screens[previous], { autoAlpha: 0, y: -14, duration: 0.3, ease: "power2.in", overwrite: true });
              // The first screen shows before anything has played. Arriving from below (a nav link, or a reload
              // further down the page) can start on a later area, so hide every other screen first.
              else gsap.set(screens.filter((_, k) => k !== index), { autoAlpha: 0, overwrite: true });
              gsap.fromTo(screens[index], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55, delay: previous >= 0 ? 0.2 : 0, ease: "power3.out", overwrite: true });
              gsap.to(indicator, { y: railIndex * RAIL_STEP, duration: 0.6, ease: "power3.inOut" });
            }
            cue.classList.remove("is-waiting");
            cueCount.textContent = `${index + 1} of ${AREAS.length}`;
            cueLabel.textContent = index < AREAS.length - 1 ? `Scroll for ${AREAS[index + 1].title}` : "Scroll on to continue";
            // Once the demo has played, the prompt pulses so nobody mistakes the pause for the end of the page.
            undo = run(AREAS[index], canvas, cursor, stepper(captions[index]), reduce, () => cue.classList.add("is-waiting"));
          };

          const trigger = ScrollTrigger.create({
            trigger: pin,
            start: "top top",
            end: () => `+=${window.innerHeight * (AREAS.length - 0.4)}`,
            pin: true,
            onUpdate: (self) => {
              activate(Math.min(AREAS.length - 1, Math.floor(self.progress * AREAS.length)));
              if (progress) gsap.set(progress, { scaleY: self.progress });
              // Finished areas fill their bar; the current one fills as you scroll through it.
              segments.forEach((seg, k) => gsap.set(seg, { scaleX: gsap.utils.clamp(k === current ? 0.15 : 0, 1, self.progress * AREAS.length - k) }));
            },
            onToggle: (self) => {
              if (self.isActive && current < 0) activate(0);
            },
          });

          // Clicking an area's title scrolls to it; the prompt's button scrolls to the next one, or past the last.
          const scrollToArea = (k: number) => {
            const span = trigger.end - trigger.start;
            const top = k >= AREAS.length ? trigger.end + window.innerHeight - 64 : trigger.start + (span * (k + 0.5)) / AREAS.length;
            window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
          };
          const next = () => scrollToArea(current + 1);
          const nextButton = cue.querySelector("[data-next]")!;
          nextButton.addEventListener("click", next);
          replayHandlers.push(() => nextButton.removeEventListener("click", next));

          captions.forEach((caption, k) => {
            const go = () => scrollToArea(k);
            const button = caption.querySelector("[data-goto]")!;
            button.addEventListener("click", go);
            replayHandlers.push(() => button.removeEventListener("click", go));
            const replay = caption.querySelector("[data-replay]");
            const again = () => activate(k, true);
            replay?.addEventListener("click", again);
            replayHandlers.push(() => replay?.removeEventListener("click", again));
          });

          return () => {
            undo?.();
            replayHandlers.forEach((off) => off(new Event("x")));
          };
        }

        // Phones and tablets: each area is its own block and plays when it scrolls into view.
        const blocks = gsap.utils.toArray<HTMLElement>("[data-mblock]", section);
        const undos: ((() => void) | null)[] = blocks.map(() => null);
        blocks.forEach((block, k) => {
          const canvas = block.querySelector<HTMLElement>("[data-canvas]")!;
          const cursor = canvas.querySelector<HTMLElement>("[data-cursor]")!;
          const step = stepper(block);
          const play = () => {
            undos[k]?.();
            undos[k] = run(AREAS[k], canvas, cursor, step, reduce);
          };
          const stop = () => {
            undos[k]?.();
            undos[k] = null;
          };
          ScrollTrigger.create({ trigger: block.querySelector("[data-stage]"), start: "top 75%", end: "bottom 15%", onEnter: play, onEnterBack: play, onLeave: stop, onLeaveBack: stop });
          const replay = block.querySelector("[data-replay]");
          replay?.addEventListener("click", play);
          replayHandlers.push(() => replay?.removeEventListener("click", play));
        });
        return () => {
          undos.forEach((off) => off?.());
          replayHandlers.forEach((off) => off(new Event("x")));
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="product" ref={root} aria-labelledby="product-title" className="relative scroll-mt-16">
      <SectionHead
        id="product-title"
        eyebrow="See it work"
        title="One system, every part of the shift."
        line="Scroll through an evening at a hotel with a restaurant. Each part of SPEAR shows what it does, the way your team would use it."
      />

      {/* Desktop: captions on the left, one app window that changes as you scroll */}
      <div data-pin="" className="relative hidden h-screen lg:block">
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-center gap-12 px-10 xl:gap-16">
          <div className="relative pl-6">
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line" />
            <span aria-hidden="true" data-progress="" className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-brass-deep" />
            <ol>
              {AREAS.map((area, i) => (
                <li key={area.rail} data-area="" className={`area py-4 ${i === 0 ? "is-active" : ""}`}>
                  <button type="button" data-goto="" className="area-title flex min-h-11 w-full items-baseline gap-4 text-left">
                    <span className="text-[12px] font-semibold tabular-nums text-brass-deep">0{i + 1}</span>
                    <span className="text-[24px] font-semibold tracking-[-0.01em]">{area.title}</span>
                  </button>
                  <div className="area-body">
                    <div className="overflow-hidden pl-9">
                      <p className="pt-1 text-[17px] leading-relaxed text-taupe">{area.line}</p>
                      <Steps steps={area.steps} />
                      <ReplayButton index={i} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={WINDOW}>
            <Stage label="The SPEAR app, showing each area in turn as you scroll.">
              <AppShell active="desk">
                {AREAS.map(({ Screen, rail }, i) => (
                  <div key={rail} data-screen="" className={`absolute inset-0 ${i === 0 ? "" : "invisible opacity-0"}`}>
                    <Screen />
                  </div>
                ))}
              </AppShell>
              <Cursor />
            </Stage>
          </div>
        </div>

        <div data-cue="" className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full border border-line bg-cream/95 py-1.5 pl-5 pr-1.5 shadow-[0_12px_30px_-12px_rgba(34,27,22,0.35)] backdrop-blur">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            {AREAS.map((area) => (
              <span key={area.rail} className="h-1.5 w-7 overflow-hidden rounded-full bg-brass/20">
                <span data-seg="" className="block h-full origin-left scale-x-0 rounded-full bg-brass-deep" />
              </span>
            ))}
          </span>
          <span data-cue-count="" className="min-w-[3.6em] text-[13px] font-semibold tabular-nums text-taupe">
            1 of {AREAS.length}
          </span>
          <button type="button" data-next="" className="cue-next inline-flex min-h-11 items-center gap-2 rounded-full bg-espresso px-5 text-[14px] font-semibold text-linen transition-colors hover:bg-brass-deep active:scale-[0.97]">
            <span data-cue-label="">Scroll for {AREAS[1].title}</span>
            <ArrowDown size={16} aria-hidden="true" className="cue-arrow" />
          </button>
        </div>
      </div>

      {/* Phones and tablets: one block per area */}
      <div className="mx-auto max-w-2xl space-y-20 px-4 pb-8 pt-4 lg:hidden">
        {AREAS.map((area, i) => (
          <div key={area.rail} data-mblock="">
            <p className="text-[12px] font-semibold tabular-nums text-brass-deep">0{i + 1}</p>
            <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.01em]">{area.title}</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-taupe">{area.line}</p>
            <div className={`mt-6 ${WINDOW}`}>
              <Stage label={area.label} camera>
                <AppShell active={area.rail}>
                  <area.Screen />
                </AppShell>
                <Cursor touch />
              </Stage>
            </div>
            <Steps steps={area.steps} />
            <ReplayButton index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
