"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType, type KeyboardEvent, type RefObject } from "react";
import { ArrowRight, ChevronDown, RotateCcw } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Stage, { Cursor } from "@/components/app/Stage";
import AppShell, { type RailKey } from "@/components/app/AppShell";
import { FrontDeskScreen, HousekeepingScreen, KdsScreen, KitchenScreen, PmsScreen, RestaurantScreen, SoonScreen } from "@/components/app/screens";
import {
  bookingDemo,
  buffetDemo,
  buildDemo,
  channelDemo,
  eventsDemo,
  FILMS,
  floorDemo,
  frontDeskDemo,
  housekeepingDemo,
  kdsDemo,
  kitchenDemo,
  locksDemo,
  menusDemo,
  messagingDemo,
  orderingDemo,
  pmsDemo,
  posOfflineDemo,
  profilesDemo,
  revenueDemo,
  staffDemo,
  websiteDemo,
  type DemoKit,
  type Film,
} from "@/components/app/demos";
import { BookingScreen, ChannelScreen, EventsScreen, RevenueScreen } from "@/components/app/screens-hotel";
import { BuffetScreen, FloorScreen, MenusScreen, OrderingScreen } from "@/components/app/screens-restaurant";
import { LocksScreen, MessagingScreen, ProfilesScreen, StaffScreen, WebsiteScreen } from "@/components/app/screens-guests";
import { MODULE_GROUPS, MODULE_INDEX, MODULES, type ModuleId } from "./modules";
import { EYEBROW, SectionHead } from "./ui";

// Every module's screen and demo. A module without one would show a placeholder.
type Demo = { Screen: ComponentType; rail: RailKey; demo: (kit: DemoKit) => void; film: Film };
const DEMOS: Partial<Record<ModuleId, Demo>> = {
  pms: { Screen: PmsScreen, rail: "rooms", demo: pmsDemo, film: FILMS.pms },
  booking: { Screen: BookingScreen, rail: "rooms", demo: bookingDemo, film: FILMS.booking },
  channel: { Screen: ChannelScreen, rail: "rooms", demo: channelDemo, film: FILMS.channel },
  revenue: { Screen: RevenueScreen, rail: "rooms", demo: revenueDemo, film: FILMS.revenue },
  events: { Screen: EventsScreen, rail: "overview", demo: eventsDemo, film: FILMS.events },
  pos: { Screen: RestaurantScreen, rail: "restaurant", demo: posOfflineDemo, film: FILMS.pos },
  kds: { Screen: KdsScreen, rail: "kitchen", demo: kdsDemo, film: FILMS.kds },
  ordering: { Screen: OrderingScreen, rail: "restaurant", demo: orderingDemo, film: FILMS.ordering },
  menus: { Screen: MenusScreen, rail: "kitchen", demo: menusDemo, film: FILMS.menus },
  floor: { Screen: FloorScreen, rail: "restaurant", demo: floorDemo, film: FILMS.floor },
  buffet: { Screen: BuffetScreen, rail: "restaurant", demo: buffetDemo, film: FILMS.buffet },
  inventory: { Screen: KitchenScreen, rail: "kitchen", demo: kitchenDemo, film: FILMS.kitchen },
  checkin: { Screen: FrontDeskScreen, rail: "desk", demo: frontDeskDemo, film: FILMS.desk },
  housekeeping: { Screen: HousekeepingScreen, rail: "housekeeping", demo: housekeepingDemo, film: FILMS.housekeeping },
  messaging: { Screen: MessagingScreen, rail: "desk", demo: messagingDemo, film: FILMS.messaging },
  profiles: { Screen: ProfilesScreen, rail: "desk", demo: profilesDemo, film: FILMS.profiles },
  locks: { Screen: LocksScreen, rail: "desk", demo: locksDemo, film: FILMS.locks },
  staff: { Screen: StaffScreen, rail: "housekeeping", demo: staffDemo, film: FILMS.staff },
  website: { Screen: WebsiteScreen, rail: "overview", demo: websiteDemo, film: FILMS.website },
};
const GROUP_RAIL: Record<string, RailKey> = { Hotel: "rooms", Restaurant: "restaurant", Guests: "desk", "Property and staff": "housekeeping" };

const WINDOW = "overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_30px_60px_-20px_rgba(34,27,22,0.28)]";

// Desktop or phone, known only in the browser. During pre-rendering neither window is drawn.
const wideQuery = "(min-width: 1024px)";
const subscribe = (change: () => void) => {
  const query = window.matchMedia(wideQuery);
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
};
const useDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(wideQuery).matches,
    () => null,
  );

/* ---------- The app window for one module ---------- */

function ModuleWindow({ index, camera, steps, onDone }: { index: number; camera: boolean; steps: RefObject<HTMLOListElement | null>; onDone: () => void }) {
  const mod = MODULES[index];
  const demo = DEMOS[mod.id];
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const canvas = el.querySelector<HTMLElement>("[data-canvas]")!;
      const cursor = canvas.querySelector<HTMLElement>("[data-cursor]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const step = (i: number) =>
        steps.current?.querySelectorAll("[data-s]").forEach((item, k) => {
          item.classList.toggle("is-done", k < i);
          item.classList.toggle("is-active", k === i);
        });

      if (!reduce) gsap.fromTo(el, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" });
      if (!demo || !cursor) return;
      step(-1);
      const tl = buildDemo(demo.demo, demo.film, { canvas, cursor, step, reduce });
      tl.eventCallback("onComplete", onDone);
      if (reduce) {
        tl.progress(1);
        gsap.set(cursor, { autoAlpha: 0 });
        return;
      }
      // Plays while the window is on screen and waits while it isn't.
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 10%",
        onToggle: (self) => {
          if (self.isActive) tl.play();
          else tl.pause();
        },
      });
    },
    { scope: root },
  );

  const label = demo ? `SPEAR ${mod.name}: ${mod.uses.join(", ").toLowerCase()}.` : `SPEAR ${mod.name}.`;
  return (
    <div ref={root}>
      <Stage label={label} camera={camera}>
        <AppShell active={demo?.rail ?? GROUP_RAIL[mod.group]}>
          {demo ? <demo.Screen /> : <SoonScreen name={mod.name} line={mod.line} />}
        </AppShell>
        {demo ? <Cursor touch={camera} /> : null}
      </Stage>
    </div>
  );
}

/* ---------- What it does, what it works with ---------- */

function Uses({ index, list }: { index: number; list: RefObject<HTMLOListElement | null> }) {
  const mod = MODULES[index];
  const live = Boolean(DEMOS[mod.id]);
  return (
    <ol ref={list} className="mt-4 space-y-2.5">
      {mod.uses.map((text) => (
        <li key={text} data-s="" className={`step flex gap-3 text-[15px] leading-snug ${live ? "" : "is-static"}`}>
          <span className="dot" />
          {text}
        </li>
      ))}
    </ol>
  );
}

function Links({ index, choose, compact = false }: { index: number; choose: (i: number) => void; compact?: boolean }) {
  return (
    <ul className={compact ? "mt-1.5" : "mt-3"}>
      {MODULES[index].links.map(([id, how]) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => choose(MODULE_INDEX[id])}
            className="group flex min-h-11 w-full items-center gap-3 border-b border-line py-2 text-left transition-colors hover:border-brass"
          >
            <span className={`min-w-0 flex-1 ${compact ? "truncate" : ""}`}>
              <span className={`${compact ? "" : "block"} text-[15px] font-semibold`}>{MODULES[MODULE_INDEX[id]].name}</span>
              {compact ? <span className="text-taupe"> · </span> : null}
              <span className={`${compact ? "text-[14px]" : "block text-[13px] leading-snug"} text-taupe`}>{how}</span>
            </span>
            <ArrowRight size={16} className="flex-none text-brass-deep transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Controls({ index, done, choose, replay }: { index: number; done: boolean; choose: (i: number) => void; replay: () => void }) {
  const next = (index + 1) % MODULES.length;
  return (
    <p className="mt-5 flex flex-wrap gap-3">
      {DEMOS[MODULES[index].id] ? (
        <button
          type="button"
          onClick={replay}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-[13px] font-semibold text-taupe transition-colors hover:border-brass hover:text-espresso active:scale-[0.97]"
        >
          <RotateCcw size={14} /> Play again
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => choose(next)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition-colors duration-500 active:scale-[0.97] ${
          done ? "bg-espresso text-linen hover:bg-brass-deep" : "border border-line text-espresso hover:border-brass"
        }`}
      >
        Next: {MODULES[next].name} <ArrowRight size={14} />
      </button>
    </p>
  );
}

/* ---------- The section ---------- */

export default function Explorer() {
  const [sel, setSel] = useState(0);
  const [run, setRun] = useState(0);
  const [done, setDone] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(true);
  const desktop = useDesktop();
  const root = useRef<HTMLElement>(null);
  const steps = useRef<HTMLOListElement>(null);
  const phoneSteps = useRef<HTMLOListElement>(null);
  const scrollTo = useRef(false);
  const mod = MODULES[sel];

  const choose = (i: number) => {
    setSel(i);
    setDone(false);
    setPhoneOpen(true);
    scrollTo.current = true;
    window.history.replaceState(null, "", `#modules/${MODULES[i].id}`);
  };

  // A link like spear-os.com/#modules/pms opens that mod.
  useEffect(() => {
    let frame = 0;
    const open = () => {
      const id = window.location.hash.match(/^#modules\/([a-z]+)$/)?.[1] as ModuleId | undefined;
      if (!id || !(id in MODULE_INDEX)) return;
      frame = requestAnimationFrame(() => {
        setSel(MODULE_INDEX[id]);
        setDone(false);
        setPhoneOpen(true);
        // Scroll once the newly opened module has been drawn.
        frame = requestAnimationFrame(() => {
          const wide = window.matchMedia(wideQuery).matches;
          const target = wide ? document.querySelector("[data-mnav]") : document.getElementById(`m-${id}`);
          if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90 });
        });
      });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", open);
    };
  }, []);

  // On phones, bring the opened module to the top of the screen.
  useEffect(() => {
    if (!scrollTo.current || desktop !== false) return;
    scrollTo.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`m-${MODULES[sel].id}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [sel, phoneOpen, desktop]);

  // Desktop: slide the marker to the chosen module and light up the ones it works with.
  const placed = useRef(false);
  useGSAP(
    () => {
      if (!desktop) return;
      const nav = root.current!.querySelector<HTMLElement>("[data-mnav]")!;
      const button = nav.querySelector<HTMLElement>(`[data-mid="${mod.id}"]`)!;
      const marker = nav.querySelector("[data-marker]");
      const to = { y: button.offsetTop, height: button.offsetHeight };
      if (placed.current) gsap.to(marker, { ...to, duration: 0.55, ease: "power3.inOut" });
      else gsap.set(marker, to);
      placed.current = true;
      // Clear the dots from the last module, then pop in the ones for this one.
      gsap.to(nav.querySelectorAll("[data-mid]:not([data-linked]) [data-ldot]"), { scale: 0, duration: 0.25, overwrite: true });
      gsap.fromTo(nav.querySelectorAll("[data-linked] [data-ldot]"), { scale: 0 }, { scale: 1, duration: 0.45, stagger: 0.06, ease: "back.out(2.2)", overwrite: true });
    },
    { scope: root, dependencies: [sel, desktop] },
  );

  const linked = new Set(mod.links.map(([id]) => id));

  const onKey = (event: KeyboardEvent) => {
    const move = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!move) return;
    event.preventDefault();
    const next = (sel + move + MODULES.length) % MODULES.length;
    choose(next);
    root.current?.querySelector<HTMLElement>(`[data-mid="${MODULES[next].id}"]`)?.focus();
  };

  return (
    <section id="modules" ref={root} aria-labelledby="modules-title" className="scroll-mt-16">
      <SectionHead
        id="modules-title"
        eyebrow="Everything in SPEAR"
        title="Start with what you need. Switch on the rest as you grow."
        line="Nineteen parts, one product. Pick any part to see it work and what it connects to."
      />

      {/* Desktop: the list on the left, the chosen module's window held in view on the right */}
      <div className="mx-auto hidden max-w-[1440px] grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-12 px-10 lg:grid xl:gap-16">
        <div>
        <p className="mb-5 flex items-center gap-2 pl-5 text-[13px] text-taupe">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brass" /> Works with {mod.name}
        </p>
        <div data-mnav="" role="tablist" aria-orientation="vertical" aria-label="SPEAR modules" onKeyDown={onKey} className="relative pl-5">
          <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <span aria-hidden="true" data-marker="" className="absolute left-0 top-0 w-[3px] -translate-x-px rounded-full bg-brass-deep" />
          {MODULE_GROUPS.map((group) => (
            <div key={group.name} className="mb-6 last:mb-0">
              <p className={`${EYEBROW} pb-1.5`}>{group.name}</p>
              {group.modules.map((m) => {
                const active = m.id === mod.id;
                return (
                  <button
                    key={m.id}
                    id={`tab-${m.id}`}
                    type="button"
                    role="tab"
                    data-mid={m.id}
                    data-linked={linked.has(m.id) ? "" : undefined}
                    aria-selected={active}
                    aria-controls="module-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => choose(MODULE_INDEX[m.id])}
                    className={`flex min-h-11 w-full items-center gap-3 rounded-md py-1.5 text-left transition-colors duration-300 ${
                      active ? "text-espresso" : "text-taupe hover:text-espresso"
                    }`}
                  >
                    <span className={`text-[17px] ${active ? "font-semibold" : "font-medium"}`}>{m.name}</span>
                    <span data-ldot="" aria-hidden="true" className={`h-2 w-2 rounded-full bg-brass ${linked.has(m.id) ? "" : "scale-0"}`} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        </div>

        <div>
          <div className="sticky top-[84px]">
            <div className={`${WINDOW} mx-auto aspect-[1200/760]`} style={{ maxWidth: "calc((100vh - 400px) * 1.579)" }}>
              {desktop ? <ModuleWindow key={`${sel}-${run}`} index={sel} camera={false} steps={steps} onDone={() => setDone(true)} /> : null}
            </div>
            <div id="module-panel" role="tabpanel" aria-labelledby={`tab-${mod.id}`} className="mt-6 grid grid-cols-[1fr_1.1fr] gap-10">
              <div>
                <p className={EYEBROW}>{mod.group}</p>
                <h3 className="mt-1.5 text-[28px] font-semibold leading-tight tracking-[-0.015em]">{mod.name}</h3>
                <p className="mt-1 text-[17px] text-taupe">{mod.line}</p>
                <Uses key={sel} index={sel} list={steps} />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-taupe">Works with</p>
                <Links index={sel} choose={choose} compact />
                <Controls index={sel} done={done} choose={choose} replay={() => setRun((n) => n + 1)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phones and tablets: an accordion, one module open at a time */}
      <div className="mx-auto max-w-2xl px-4 lg:hidden">
        {MODULE_GROUPS.map((group) => (
          <div key={group.name} className="mb-8">
            <h3 className="border-b border-espresso pb-3 text-[13px] font-semibold uppercase tracking-[0.12em]">{group.name}</h3>
            {group.modules.map((m) => {
              const i = MODULE_INDEX[m.id];
              const open = i === sel && phoneOpen;
              return (
                <div key={m.id} id={`m-${m.id}`} className="scroll-mt-20 border-b border-line">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`m-body-${m.id}`}
                    onClick={() => (open ? setPhoneOpen(false) : choose(i))}
                    className="flex min-h-16 w-full items-center gap-4 py-3 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17px] font-semibold">{m.name}</span>
                      <span className="block text-[14px] leading-snug text-taupe">{m.line}</span>
                    </span>
                    <ChevronDown size={20} className={`flex-none text-brass-deep transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  <div id={`m-body-${m.id}`} hidden={!open} className="pb-8">
                    {open && desktop === false ? (
                      <div className={`mt-1 ${WINDOW}`}>
                        <ModuleWindow key={`${sel}-${run}`} index={sel} camera steps={phoneSteps} onDone={() => setDone(true)} />
                      </div>
                    ) : null}
                    {open ? <Uses key={sel} index={sel} list={phoneSteps} /> : <StaticUses index={i} />}
                    <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-taupe">Works with</p>
                    <Links index={i} choose={choose} />
                    <Controls index={i} done={done} choose={choose} replay={() => setRun((n) => n + 1)} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

// Closed modules still carry their text in the page, for search engines and screen readers.
function StaticUses({ index }: { index: number }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {MODULES[index].uses.map((text) => (
        <li key={text} className="step is-static flex gap-3 text-[15px] leading-snug">
          <span className="dot" />
          {text}
        </li>
      ))}
    </ul>
  );
}
