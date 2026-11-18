import { gsap } from "@/lib/gsap";
import { DAY_W } from "./screens";

// Scripted demos for each area. A demo adds tweens to a paused timeline; the caller plays it,
// and reverting the surrounding gsap.context puts the screen back as it was.

export type DemoKit = {
  tl: gsap.core.Timeline;
  canvas: HTMLElement;
  cursor: HTMLElement;
  step: (index: number) => void;
};

const el = (canvas: HTMLElement, name: string) => canvas.querySelector<HTMLElement>(`[data-d="${name}"]`)!;

// Where an element sits in canvas pixels (the canvas is scaled, so divide the scale back out).
function point(canvas: HTMLElement, target: Element, ax = 0.5, ay = 0.5) {
  const box = canvas.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const scale = box.width / canvas.offsetWidth;
  return { x: (rect.left - box.left + rect.width * ax) / scale, y: (rect.top - box.top + rect.height * ay) / scale };
}

function kit({ tl, canvas, cursor }: DemoKit) {
  const ripple = cursor.querySelector("[data-ripple]")!;
  return {
    q: (name: string) => el(canvas, name),
    enter(x: number, y: number, at?: gsap.Position) {
      tl.set(cursor, { x, y, scale: 1 }, at).to(cursor, { autoAlpha: 1, duration: 0.3 });
    },
    move(name: string, ax = 0.5, ay = 0.5, duration = 0.85) {
      tl.to(cursor, {
        x: () => point(canvas, el(canvas, name), ax, ay).x,
        y: () => point(canvas, el(canvas, name), ax, ay).y,
        duration,
        ease: "power2.inOut",
      });
    },
    click() {
      tl.to(cursor, { scale: 0.84, duration: 0.09, ease: "power1.out" })
        .fromTo(ripple, { scale: 0.3, autoAlpha: 0.7 }, { scale: 1.7, autoAlpha: 0, duration: 0.5, ease: "power2.out" }, "<")
        .to(cursor, { scale: 1, duration: 0.18, ease: "power2.out" }, "<0.09");
    },
    leave(dx = 140, dy = 90) {
      tl.to(cursor, { x: `+=${dx}`, y: `+=${dy}`, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, "+=0.6");
    },
    show(name: string, at?: gsap.Position, from: gsap.TweenVars = { y: 10 }) {
      tl.fromTo(el(canvas, name), { autoAlpha: 0, ...from }, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, at);
    },
    hide(name: string, at?: gsap.Position) {
      tl.to(el(canvas, name), { autoAlpha: 0, duration: 0.25 }, at);
    },
    swap(name: string, text: string, at?: gsap.Position) {
      const target = el(canvas, name);
      tl.to(target, { autoAlpha: 0, y: -6, duration: 0.16 }, at)
        .set(target, { text })
        .fromTo(target, { y: 6 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
    },
    flash(name: string, at?: gsap.Position) {
      tl.fromTo(
        el(canvas, name),
        { boxShadow: "0 0 0 3px rgba(199,154,69,0.85)" },
        { boxShadow: "0 0 0 3px rgba(199,154,69,0)", duration: 1.4, ease: "power2.out" },
        at,
      );
    },
    toast(name: string, at?: gsap.Position) {
      tl.fromTo(el(canvas, name), { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }, at);
    },
  };
}

export function frontDeskDemo(k: DemoKit) {
  const { tl, step, canvas } = k;
  const a = kit(k);
  a.enter(1050, 640);
  tl.call(step, [0]);
  a.move("fd-checkin");
  a.click();
  a.flash("fd-row");
  a.show("fd-panel", "<", { x: 24 });
  a.show("fd-id", "+=0.5", { scale: 0.4 });
  tl.call(step, [1], "+=0.4");
  tl.from(canvas.querySelectorAll("[data-qr]"), { opacity: 0, duration: 0.25, stagger: { each: 0.003, from: "random" } });
  tl.call(step, [2], "+=0.5");
  a.show("fd-phone");
  a.hide("fd-checkin", "<");
  a.show("fd-done", "<", { scale: 0.8 });
  a.swap("fd-occ", "88%", "<");
  tl.to(a.q("fd-occ-bar"), { width: "88%", duration: 0.8, ease: "power2.out" }, "<");
  a.leave();
  tl.call(step, [3]);
}

export function roomsDemo(k: DemoKit) {
  const { tl, step, cursor } = k;
  const a = kit(k);
  a.enter(980, 620);
  tl.call(step, [0]);
  a.move("rm-bar", 0.985, 0.5);
  tl.to(cursor, { scale: 0.88, duration: 0.12 });
  tl.to(cursor, { x: `+=${DAY_W}`, duration: 0.8, ease: "power2.inOut" }, "+=0.15");
  tl.to(a.q("rm-bar"), { width: `+=${DAY_W}`, duration: 0.8, ease: "power2.inOut" }, "<");
  tl.to(cursor, { scale: 1, duration: 0.15 });
  tl.call(step, [1]);
  a.swap("rm-dates", "Thu 4 – Mon 8 Oct · 4 nights");
  a.flash("rm-dates-box", "<");
  a.swap("rm-nights", "Room, 4 nights × $474", "+=0.2");
  a.swap("rm-room", "$1,896.00", "<");
  a.swap("rm-total", "$2,540.00", "+=0.15");
  a.flash("rm-total-box", "<");
  tl.call(step, [2], "+=0.4");
  a.swap("rm-key-text", "Works until Mon 8 Oct, 11:00");
  a.flash("rm-key", "<");
  a.toast("rm-toast", "<0.2");
  a.leave(-160, 80);
  tl.call(step, [3]);
}

export function restaurantDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(560, 640);
  tl.call(step, [0]);
  a.move("rs-t8");
  a.click();
  tl.to(a.q("rs-t8"), { boxShadow: "0 0 0 2px #7c5801, 0 10px 24px -6px rgba(34,27,22,0.25)", duration: 0.25 }, "<");
  a.hide("rs-empty", "<");
  a.show("rs-ticket", "<0.1", { x: 20 });
  tl.call(step, [1], "+=0.5");
  a.flash("rs-guest");
  a.move("rs-charge", 0.5, 0.5, 0.9);
  tl.call(step, [2]);
  a.click();
  a.show("rs-posted", "<0.1", { scale: 0.96 });
  a.toast("rs-toast", "+=0.15");
  a.swap("rs-t8-state", "Paid · on room", "<");
  a.leave(120, -60);
  tl.call(step, [3]);
}

export function kitchenDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.toast("kt-toast", "+=0.2");
  tl.to(a.q("kt-bar"), { width: "0%", duration: 1.1, ease: "power2.inOut" }, "+=0.5");
  a.swap("kt-qty", "0.0 kg", "<0.55");
  tl.call(step, [1], "+=0.2");
  tl.to(a.q("kt-dish"), { opacity: 0.45, textDecoration: "line-through", duration: 0.3 });
  a.show("kt-86", "<");
  a.swap("kt-off", "1", "<");
  a.hide("kt-toast", "<");
  a.enter(1000, 660, "+=0.2");
  a.move("kt-order");
  tl.call(step, [2]);
  a.click();
  a.hide("kt-order", "<0.1");
  a.show("kt-sent", "<", { scale: 0.85 });
  a.toast("kt-toast2", "+=0.1");
  a.leave(-140, 60);
  tl.call(step, [3]);
}

export function housekeepingDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.toast("hk-toast", "+=0.2");
  a.hide("hk-s0", "+=0.5");
  a.show("hk-s1", "<", { y: 6 });
  a.flash("hk-tile", "<");
  a.show("hk-job", "+=0.4", { y: -16 });
  a.hide("hk-toast", "<0.6");
  tl.call(step, [1]);
  a.enter(700, 620, "+=0.1");
  a.move("hk-done", 0.5, 0.5, 1);
  a.click();
  a.show("hk-checks", "<0.1", { y: -4 });
  a.show("hk-donechip", "<", { scale: 0.9 });
  tl.call(step, [2], "+=0.3");
  a.hide("hk-s1");
  a.show("hk-s2", "<", { y: 6 });
  a.flash("hk-tile", "<");
  a.leave(-200, 40);
  tl.call(step, [3]);
}

// The hero: a new restaurant bill arrives on a room's folio a moment after the page settles.
export function heroLoop(canvas: HTMLElement) {
  const row = el(canvas, "ov-new");
  return gsap
    .timeline({ delay: 1.6 })
    .from(row, { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0, duration: 0.6, ease: "power3.out" })
    .fromTo(row, { backgroundColor: "rgba(199,154,69,0.22)" }, { backgroundColor: "rgba(199,154,69,0)", duration: 1.6 });
}
