import { gsap } from "@/lib/gsap";
import { DAY_W } from "./screens";
import { CAMERA_RATIO, CANVAS_H, CANVAS_W, WIDE, type Shot } from "./Stage";

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
        { boxShadow: "0 0 0 3px rgba(199,154,69,0)", duration: 1.4, ease: "power2.out", immediateRender: false },
        at,
      );
    },
    // A soft brass wash, for rows that sit flush against each other where rings would merge.
    wash(name: string, at?: gsap.Position) {
      tl.fromTo(
        el(canvas, name),
        { backgroundColor: "rgba(199,154,69,0.2)" },
        { backgroundColor: "rgba(199,154,69,0)", duration: 1.2, ease: "power2.out", immediateRender: false, clearProps: "backgroundColor" },
        at,
      );
    },
    // Press on an element, carry it onto another one, and let go.
    drag(name: string, to: string, duration = 1) {
      const delta = { x: 0, y: 0 };
      tl.to(cursor, { scale: 0.86, duration: 0.12 });
      tl.to(
        el(canvas, name),
        {
          x: () => {
            const a = point(canvas, el(canvas, name), 0, 0);
            const b = point(canvas, el(canvas, to), 0, 0);
            delta.x = b.x - a.x;
            delta.y = b.y - a.y;
            return `+=${delta.x}`;
          },
          y: () => `+=${delta.y}`,
          boxShadow: "0 14px 28px -8px rgba(34,27,22,0.35)",
          duration,
          ease: "power2.inOut",
        },
        "+=0.1",
      );
      tl.to(cursor, { x: () => `+=${delta.x}`, y: () => `+=${delta.y}`, duration, ease: "power2.inOut" }, "<");
      tl.to(el(canvas, name), { boxShadow: "0 0 0 0 rgba(34,27,22,0)", duration: 0.25 });
      tl.to(cursor, { scale: 1, duration: 0.15 }, "<");
    },
    // Slide an element onto another one's place, with no cursor.
    carry(name: string, to: string, at?: gsap.Position, duration = 0.9) {
      const delta = { y: 0 };
      tl.to(
        el(canvas, name),
        {
          x: () => {
            const a = point(canvas, el(canvas, name), 0, 0);
            const b = point(canvas, el(canvas, to), 0, 0);
            delta.y = b.y - a.y;
            return `+=${b.x - a.x}`;
          },
          y: () => `+=${delta.y}`,
          duration,
          ease: "power3.inOut",
        },
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
  tl.addLabel("panel");
  a.flash("fd-row");
  a.show("fd-panel", "<", { x: 24 });
  a.show("fd-id", "+=0.5", { scale: 0.4 });
  tl.call(step, [1], "+=0.4");
  tl.from(canvas.querySelectorAll("[data-qr]"), { opacity: 0, duration: 0.25, stagger: { each: 0.003, from: "random" } });
  tl.call(step, [2], "+=0.5");
  tl.addLabel("done");
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
  tl.addLabel("folio");
  a.swap("rm-dates", "Thu 4 – Mon 8 Oct · 4 nights");
  a.flash("rm-dates-box", "<");
  a.swap("rm-nights", "Room, 4 nights × $474", "+=0.2");
  a.swap("rm-room", "$1,896.00", "<");
  a.swap("rm-total", "$2,540.00", "+=0.15");
  a.flash("rm-total-box", "<");
  tl.call(step, [2], "+=0.4");
  tl.addLabel("key");
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
  tl.addLabel("ticket");
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
  tl.addLabel("deplete", "+=0.5");
  tl.to(a.q("kt-bar"), { width: "0%", duration: 1.1, ease: "power2.inOut" }, "+=0.5");
  a.swap("kt-qty", "0.0 kg", "<0.55");
  tl.call(step, [1], "+=0.2");
  tl.addLabel("off");
  tl.to(a.q("kt-dish"), { opacity: 0.45, textDecoration: "line-through", duration: 0.3 });
  a.show("kt-86", "<");
  a.swap("kt-off", "1", "<");
  a.hide("kt-toast", "<");
  a.enter(1000, 660, "+=0.2");
  a.move("kt-order");
  tl.call(step, [2]);
  tl.addLabel("sent");
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
  tl.addLabel("tile", "+=0.5");
  a.hide("hk-s0", "+=0.5");
  a.show("hk-s1", "<", { y: 6 });
  a.flash("hk-tile", "<");
  a.show("hk-job", "+=0.4", { y: -16 });
  a.hide("hk-toast", "<0.6");
  tl.call(step, [1]);
  tl.addLabel("job");
  a.enter(700, 620, "+=0.1");
  a.move("hk-done", 0.5, 0.5, 1);
  a.click();
  a.show("hk-checks", "<0.1", { y: -4 });
  a.show("hk-donechip", "<", { scale: 0.9 });
  tl.call(step, [2], "+=0.3");
  tl.addLabel("clean");
  a.hide("hk-s1");
  a.show("hk-s2", "<", { y: 6 });
  a.flash("hk-tile", "<");
  a.leave(-200, 40);
  tl.call(step, [3]);
}

export function pmsDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.toast("pm-toast", "+=0.2");
  a.show("pm-new", "<0.25", { y: -12 });
  a.flash("pm-new", "<0.3");
  a.enter(720, 660, "+=0.5");
  tl.addLabel("drag");
  a.move("pm-new", 0.4, 0.5);
  a.hide("pm-toast", "<");
  a.show("pm-slot", "<0.5", { scale: 0.96 });
  a.drag("pm-new", "pm-slot");
  a.hide("pm-slot", "<");
  tl.to(a.q("pm-new"), { borderStyle: "solid", boxShadow: "inset 4px 0 0 #003a9a", duration: 0.4 }, "<");
  a.hide("pm-st-clean", "<");
  a.show("pm-st-occ", "<", { y: 4 });
  a.swap("pm-assign", "All assigned", "<");
  a.hide("pm-empty", "<");
  a.show("pm-guest", "<0.1", { x: 24 });
  tl.addLabel("guest");
  tl.call(step, [1], "+=1.4");
  tl.addLabel("charge");
  a.show("pm-charge", undefined, { x: -14 });
  a.flash("pm-charge", "<");
  a.swap("pm-total", "$993.40", "+=0.2");
  a.flash("pm-total-box", "<");
  tl.call(step, [2], "+=0.9");
  tl.addLabel("checkout");
  a.swap("pm-when", "Checking out today");
  a.move("pm-checkout", 0.5, 0.5, 1);
  a.click();
  a.show("pm-settled", "<0.1", { scale: 0.96 });
  a.hide("pm-st-occ", "+=0.3");
  a.show("pm-st-dirty", "<", { y: 4 });
  a.toast("pm-toast2", "<");
  a.leave(-160, 60);
  tl.call(step, [3]);
}

export function kdsDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.show("kd-new", "+=0.3", { x: 40 });
  a.flash("kd-new", "<0.3");
  a.swap("kd-open", "4 open", "<");
  tl.call(step, [1], "+=1");
  tl.addLabel("wait");
  a.swap("kd-t07-time", "8:02");
  tl.to(a.q("kd-t07-bar"), { backgroundColor: "#c79a45", duration: 0.6 }, "<");
  a.flash("kd-t07", "<");
  a.swap("kd-t04-time", "15:10", "+=0.4");
  tl.to(a.q("kd-t04-bar"), { backgroundColor: "#ba1a1a", duration: 0.6 }, "<");
  a.flash("kd-t04", "<");
  tl.call(step, [2], "+=0.8");
  tl.addLabel("bump");
  a.enter(560, 660);
  a.move("kd-bump");
  a.click();
  a.show("kd-ready", "<0.1", { scale: 0.96 });
  tl.to(a.q("kd-t12"), { opacity: 0.55, duration: 0.4 }, "+=0.3");
  a.toast("kd-toast", "<");
  a.swap("kd-open", "3 open", "<");
  a.leave(140, -40);
  tl.call(step, [3]);
}

export function posOfflineDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.show("rs-offline", "+=0.3", { y: -12 });
  a.flash("rs-offline", "<0.3");
  a.enter(560, 660, "+=0.4");
  tl.addLabel("table");
  a.move("rs-t8");
  a.click();
  a.hide("rs-empty", "<");
  a.show("rs-ticket", "<0.1", { x: 20 });
  tl.call(step, [1], "+=0.6");
  tl.addLabel("charge");
  a.move("rs-charge", 0.5, 0.5, 0.9);
  a.click();
  a.show("rs-posted", "<0.1", { scale: 0.96 });
  a.swap("rs-t8-state", "Paid · on room", "<");
  a.swap("rs-offline-text", "Internet down · 4 sales saved on this till", "+=0.3");
  a.leave(120, -60);
  tl.call(step, [2], "+=0.6");
  tl.addLabel("online");
  a.hide("rs-offline");
  a.show("rs-online", "<0.1", { y: -8 });
  a.flash("rs-online", "<0.2");
  tl.call(step, [3], "+=0.4");
}

export function bookingDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(420, 660);
  tl.call(step, [0]);
  a.move("bk-room", 0.45, 0.5);
  a.click();
  tl.to(a.q("bk-room"), { borderColor: "#c79a45", backgroundColor: "rgba(199,154,69,0.12)", duration: 0.3 }, "<");
  a.show("bk-tick", "<", { scale: 0.4 });
  a.move("bk-book", 0.5, 0.5, 0.9);
  a.click();
  a.show("bk-done", "<0.1", { scale: 0.96 });
  tl.call(step, [1], "+=0.6");
  tl.addLabel("paid");
  a.swap("bk-count", "65");
  a.flash("bk-stats", "<");
  a.swap("bk-saved", "$4,310", "+=0.3");
  tl.call(step, [2], "+=0.7");
  tl.addLabel("avail");
  a.swap("bk-left", "1");
  a.flash("bk-avail", "<");
  a.swap("bk-site-left", "1 left", "<");
  ["bk-c0", "bk-c1", "bk-c2", "bk-c3", "bk-c4"].forEach((n, i) => a.swap(n, "1 left", i ? "<0.15" : "+=0.2"));
  a.leave(160, 40);
  tl.call(step, [3]);
}

export function channelDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(700, 640);
  tl.call(step, [0]);
  a.move("ch-rate");
  a.click();
  a.swap("ch-rate", "$309", "+=0.1");
  a.move("ch-update", 0.5, 0.5, 0.7);
  a.click();
  tl.addLabel("spread");
  [0, 1, 2, 3, 4].forEach((i) => {
    a.swap(`ch-r${i}`, "$309", i ? "<0.18" : "+=0.15");
    a.wash(`ch-row${i}`, "<");
  });
  a.leave(-120, 90);
  tl.call(step, [1], "+=0.5");
  tl.addLabel("queue");
  a.show("ch-q1", undefined, { x: 24 });
  a.show("ch-q2", "<0.25", { x: 24 });
  a.show("ch-q1s", "+=0.5", { scale: 0.9 });
  a.show("ch-q2s", "+=0.35", { scale: 0.9 });
  [0, 1, 2, 3, 4].forEach((i) => a.swap(`ch-l${i}`, "0", i ? "<0.1" : "<"));
  tl.call(step, [2], "+=0.8");
  tl.addLabel("direct");
  a.show("ch-q3", undefined, { x: 24 });
  a.flash("ch-q3", "<0.2");
  a.swap("ch-mix", "Direct 39%", "<");
  tl.to(a.q("ch-mixbar"), { width: "39%", duration: 0.6 }, "<");
  tl.call(step, [3], "+=0.4");
}

export function revenueDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  tl.addLabel("grow", "+=0.3");
  tl.to(a.q("rv-sat-fill"), { height: `${86 * 0.8}%`, duration: 1.4, ease: "power2.inOut" }, "grow");
  a.swap("rv-sat-occ", "86%", "grow+=0.8");
  a.swap("rv-sat-rate", "$324", "+=0.25");
  a.flash("rv-sat", "<");
  tl.call(step, [1], "+=0.5");
  tl.addLabel("push");
  a.show("rv-pushed", undefined, { y: 10 });
  tl.call(step, [2], "+=0.9");
  tl.addLabel("market");
  a.enter(1060, 660);
  a.move("rv-apply");
  a.click();
  a.show("rv-applied", "<0.1", { scale: 0.96 });
  a.swap("rv-sun-rate", "$305", "+=0.2");
  a.flash("rv-sun", "<");
  a.leave(-140, 40);
  tl.call(step, [3]);
}

export function eventsDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(560, 640);
  tl.call(step, [0]);
  a.move("ev-card");
  a.click();
  a.flash("ev-card", "<");
  a.hide("ev-empty", "<");
  a.show("ev-order", "<0.1", { x: 24 });
  tl.call(step, [1], "+=0.4");
  tl.addLabel("order");
  ["ev-s1", "ev-s2", "ev-s3", "ev-s4"].forEach((n, i) => a.flash(n, i ? "<0.35" : "+=0.1"));
  tl.call(step, [2], "+=0.9");
  tl.addLabel("sign");
  a.move("ev-sign", 0.5, 0.5, 0.9);
  a.click();
  a.show("ev-signed", "<0.1", { scale: 0.96 });
  a.carry("ev-card", "ev-slot", "+=0.2");
  a.swap("ev-tcount", "1", "<0.4");
  a.swap("ev-ccount", "2", "<");
  a.show("ev-fx", "+=0.1", { y: 8 });
  tl.from(a.q("ev-fx").children, { autoAlpha: 0, x: -8, duration: 0.35, stagger: 0.25 }, "<0.1");
  a.toast("ev-toast", "+=0.2");
  a.leave(-140, 60);
  tl.call(step, [3]);
}

export function orderingDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(330, 640);
  tl.call(step, [0]);
  a.move("od-add1");
  a.click();
  a.swap("od-cart", "1 item", "<");
  a.move("od-add2", 0.5, 0.5, 0.5);
  a.click();
  a.swap("od-cart", "2 items", "<");
  a.move("od-send", 0.5, 0.5, 0.7);
  a.click();
  a.show("od-sent", "<0.1", { scale: 0.96 });
  tl.call(step, [1], "+=0.5");
  tl.addLabel("tablet");
  a.move("od-tab-item", 0.5, 0.5, 1);
  a.click();
  a.show("od-tab-new", "<0.1", { x: -12 });
  a.move("od-fire", 0.5, 0.5, 0.8);
  a.click();
  a.show("od-fired", "<0.1", { scale: 0.96 });
  a.leave(160, 40);
  tl.call(step, [2], "+=0.2");
  tl.addLabel("results");
  a.show("od-b1", undefined, { x: 12 });
  a.show("od-b2", "<0.2", { x: 12 });
  a.swap("od-total", "$54.00", "<0.2");
  a.show("od-k1", "+=0.2", { y: -8 });
  a.show("od-k2", "<0.3", { y: -8 });
  tl.call(step, [3], "+=0.5");
}

export function menusDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(320, 650);
  tl.call(step, [0]);
  a.move("mn-dish");
  a.click();
  a.flash("mn-dish", "<");
  a.hide("mn-empty", "<");
  a.show("mn-recipe", "<0.1", { x: 20 });
  tl.from(a.q("mn-rows").children, { autoAlpha: 0, y: 6, duration: 0.3, stagger: 0.08 }, "<0.2");
  tl.call(step, [1], "+=0.6");
  tl.addLabel("cost");
  a.move("mn-fish-qty");
  a.click();
  a.swap("mn-fish-qty", "200 g", "<");
  a.swap("mn-fish-cost", "$8.80", "<");
  a.swap("mn-total", "$11.52", "+=0.2");
  a.swap("mn-pct", "22.2%", "<");
  a.swap("mn-margin", "$40.48", "<");
  a.flash("mn-cost", "<");
  a.leave(-140, 80);
  tl.call(step, [2], "+=0.4");
  tl.addLabel("out");
  a.show("mn-out", undefined, { x: -10 });
  [0, 1, 2].forEach((i) => {
    a.swap(`mn-w${i}`, "Off", i ? "<0.15" : "+=0.3");
    tl.to(a.q(`mn-w${i}`), { backgroundColor: "rgba(186,26,26,0.1)", color: "#ba1a1a", duration: 0.3 }, "<");
    tl.to(a.q(`mn-w${i}-name`), { opacity: 0.45, textDecoration: "line-through", duration: 0.3 }, "<");
  });
  a.toast("mn-toast", "+=0.1");
  tl.call(step, [3], "+=0.4");
}

export function floorDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(760, 620);
  tl.call(step, [0]);
  a.move("fl-t14");
  a.drag("fl-t14", "fl-spot");
  tl.to(a.q("fl-t14"), { borderStyle: "solid", duration: 0.2 });
  a.leave(120, 80);
  tl.call(step, [1], "+=0.2");
  tl.addLabel("booking");
  a.toast("fl-toast");
  a.show("fl-new", "<0.3", { x: 20 });
  a.swap("fl-t5-state", "Booked 19:30", "+=0.3");
  a.flash("fl-t5", "<");
  a.hide("fl-toast", "+=1");
  tl.call(step, [2], "+=0.2");
  tl.addLabel("seat");
  a.enter(1000, 640);
  a.move("fl-seat");
  a.click();
  a.show("fl-opened", "<0.1", { scale: 0.96 });
  a.swap("fl-t5-state", "Seated", "+=0.3");
  tl.to(a.q("fl-t5"), { borderColor: "#c79a45", duration: 0.3 }, "<");
  tl.to(a.q("fl-t5-state"), { backgroundColor: "rgba(199,154,69,0.15)", color: "#7c5801", duration: 0.3 }, "<");
  a.flash("fl-t5", "<");
  a.swap("fl-t9-state", "Free", "+=0.5");
  tl.to(a.q("fl-t9"), { borderColor: "rgba(199,154,69,0.25)", duration: 0.3 }, "<");
  tl.to(a.q("fl-t9-state"), { backgroundColor: "#ede5d4", color: "#5c4f44", duration: 0.3 }, "<");
  a.flash("fl-t9", "<");
  a.leave(-160, 60);
  tl.call(step, [3]);
}

export function buffetDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(460, 640);
  tl.call(step, [0]);
  a.move("bf-plus");
  a.click();
  a.swap("bf-head", "180", "<");
  a.flash("bf-headbox", "<");
  ["16.2 kg", "270", "21.6 kg", "360"].forEach((v, i) => a.swap(`bf-b${i}`, v, i ? "<0.15" : "+=0.2"));
  a.leave(140, 90);
  tl.call(step, [1], "+=0.3");
  tl.addLabel("lines");
  tl.to(a.q("bf-eggs-3"), { backgroundColor: "#ede5d4", duration: 0.35 }, "+=0.3");
  tl.to(a.q("bf-eggs-2"), { backgroundColor: "#ede5d4", duration: 0.35 }, "+=0.4");
  tl.to([a.q("bf-eggs-0"), a.q("bf-eggs-1")], { backgroundColor: "#ba1a1a", duration: 0.35 }, "<");
  a.flash("bf-eggs-row", "<");
  a.show("bf-alert", "+=0.2", { y: 8 });
  a.toast("bf-toast", "+=0.4");
  tl.call(step, [2], "+=0.8");
  tl.addLabel("plates");
  a.swap("bf-count", "118");
  tl.to(a.q("bf-bar"), { width: "98%", duration: 0.8, ease: "power2.out" }, "<");
  a.show("bf-limit", "+=0.2", { scale: 0.9 });
  a.flash("bf-plates", "<");
  tl.call(step, [3], "+=0.4");
}

export function messagingDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.show("ms-new", "+=0.3", { x: -12 });
  a.flash("ms-new", "<0.2");
  a.show("ms-in", "<0.2", { y: 8 });
  a.enter(760, 660, "+=0.3");
  a.move("ms-send");
  a.click();
  a.show("ms-out", "<0.1", { y: 10 });
  a.leave(140, 60);
  tl.call(step, [1], "+=0.3");
  tl.addLabel("fallback");
  a.show("ms-ready", undefined, { x: 16 });
  a.flash("ms-f1", "+=0.5");
  a.show("ms-f2", "+=0.6", { x: -8 });
  tl.call(step, [2], "+=0.8");
  tl.addLabel("conf");
  a.show("ms-conf", undefined, { x: 16 });
  a.flash("ms-conf", "<0.2");
  tl.call(step, [3], "+=0.5");
}

export function profilesDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(420, 650);
  tl.call(step, [0]);
  a.move("pr-add");
  a.click();
  a.show("pr-newpref", "<0.1", { scale: 0.7 });
  a.flash("pr-diet", "+=0.3");
  a.leave(150, 40);
  tl.call(step, [1], "+=0.2");
  tl.addLabel("spend");
  a.show("pr-new", undefined, { y: -10 });
  a.flash("pr-new", "<0.2");
  a.swap("pr-rest", "$3,860", "+=0.5");
  a.swap("pr-total", "$14,280", "<");
  a.flash("pr-spend", "<");
  tl.call(step, [2], "+=0.7");
  tl.addLabel("private");
  a.flash("pr-private");
  a.show("pr-ok", "<0.2", { scale: 0.9 });
  tl.call(step, [3], "+=0.5");
}

export function locksDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.show("lk-pass", "+=0.3", { y: 40 });
  tl.call(step, [1], "+=0.9");
  tl.addLabel("door");
  tl.to(a.q("lk-pass"), { y: -8, duration: 0.25, yoyo: true, repeat: 1, ease: "power1.inOut" });
  a.show("lk-open", undefined, { scale: 0.9 });
  a.show("lk-door", "<0.2", { x: -8 });
  a.flash("lk-salto", "<");
  tl.call(step, [2], "+=0.9");
  tl.addLabel("extend");
  a.enter(620, 660);
  a.move("lk-extend");
  a.click();
  a.swap("lk-until", "Wallet · until Mon 8 Oct, 11:00", "<0.1");
  a.swap("lk-pass-dates", "Thu 4 – Mon 8 Oct", "<");
  a.flash("lk-row", "<");
  tl.addLabel("checkout", "+=0.6");
  a.move("lk-checkout", 0.5, 0.5, 0.7);
  a.click();
  a.swap("lk-status", "Stopped", "<0.1");
  tl.to(a.q("lk-status"), { backgroundColor: "rgba(186,26,26,0.1)", color: "#ba1a1a", duration: 0.3 }, "<");
  tl.to(a.q("lk-pass"), { opacity: 0.35, duration: 0.4 }, "<");
  a.hide("lk-open", "<");
  a.show("lk-void", "<0.2", { y: 6 });
  a.leave(-150, 40);
  tl.call(step, [3]);
}

export function staffDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  a.enter(420, 660);
  tl.call(step, [0]);
  a.move("st-add");
  a.click();
  a.show("st-new", "<0.2", { x: -12 });
  a.flash("st-new", "<0.2");
  a.leave(160, 40);
  tl.call(step, [1], "+=0.3");
  tl.addLabel("clock");
  a.flash("st-qr");
  a.show("st-face", "+=0.4", { scale: 0.6 });
  a.flash("st-face", "<0.2");
  a.show("st-ok", "+=0.6", { y: 8 });
  a.swap("st-nim", "On", "<");
  tl.to(a.q("st-nim"), { backgroundColor: "rgba(78,115,86,0.15)", color: "#36533d", duration: 0.3 }, "<");
  tl.call(step, [2], "+=0.7");
  tl.addLabel("task");
  a.show("st-task", undefined, { x: 10 });
  a.flash("st-task", "<0.2");
  tl.call(step, [3], "+=0.5");
}

export function websiteDemo(k: DemoKit) {
  const { tl, step } = k;
  const a = kit(k);
  tl.call(step, [0]);
  a.flash("ws-domain", "+=0.6");
  tl.call(step, [1], "+=1");
  tl.addLabel("photo");
  a.enter(330, 660);
  a.move("ws-replace");
  a.click();
  tl.fromTo(a.q("ws-hero2"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: "power2.inOut" }, "+=0.2");
  a.toast("ws-toast", "<0.5");
  tl.call(step, [2], "+=0.9");
  tl.addLabel("table");
  a.hide("ws-toast");
  a.move("ws-table", 0.5, 0.5, 1);
  a.click();
  a.show("ws-booked", "<0.1", { scale: 0.96 });
  a.flash("ws-tablebox", "<");
  a.leave(120, 60);
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

/* ---------- The camera, for phones ---------- */

// A cue points the camera at a fixed shot, or at a named element (w sets how close, ax/ay where it sits).
export type Cue = Shot | { d: string; w?: number; ax?: number; ay?: number };
// Where the camera starts, and the shots it cuts to at labels in the demo.
export type Film = { start: Cue; cues: [string, Cue][] };

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

function resolve(canvas: HTMLElement, cue: Cue): Shot {
  let shot: Shot;
  if ("d" in cue) {
    // Measured through the layout rather than the screen, so tilts and camera moves don't skew it.
    const target = el(canvas, cue.d);
    const r = { x: 0, y: 0, w: target.offsetWidth, h: target.offsetHeight };
    for (let node: HTMLElement | null = target; node && node !== canvas; node = node.offsetParent as HTMLElement | null) {
      r.x += node.offsetLeft;
      r.y += node.offsetTop;
    }
    const w = Math.max(cue.w ?? 420, Math.min(r.w + 48, 640));
    shot = { x: r.x + r.w * (cue.ax ?? 0.5) - w / 2, y: r.y + r.h * (cue.ay ?? 0.5) - (w * CAMERA_RATIO) / 2, w };
  } else shot = { ...cue };
  // Keep the frame on the window.
  const w = Math.min(shot.w, CANVAS_W);
  const h = w * CAMERA_RATIO;
  return { x: clamp(shot.x, 0, CANVAS_W - w), y: h >= CANVAS_H ? (CANVAS_H - h) / 2 : clamp(shot.y, 0, CANVAS_H - h), w };
}

const vars = (s: Shot) => ({ "--cx": s.x, "--cy": s.y, "--cw": s.w });
const glide = (s: Shot, duration = 1.1) => ({ ...vars(s), duration, ease: "power3.inOut" });

export const filming = (canvas: HTMLElement) => canvas.hasAttribute("data-camera");
export const resetCamera = (canvas: HTMLElement) => gsap.set(canvas, vars(WIDE));
export const frameOn = (canvas: HTMLElement, cue: Cue) => gsap.set(canvas, vars(resolve(canvas, cue)));

// Builds a demo ready to play. On a filmed stage the camera starts on the whole window, pushes in
// to the first shot, follows the cues, then pulls back out so you see where it all happened.
export function buildDemo(
  demo: (kit: DemoKit) => void,
  film: Film | undefined,
  { canvas, cursor, step, reduce }: { canvas: HTMLElement; cursor: HTMLElement; step: (i: number) => void; reduce: boolean },
) {
  const tl = gsap.timeline({ paused: true });
  const body = gsap.timeline();
  demo({ tl: body, canvas, cursor, step });
  let lead = 0.35;
  if (film && filming(canvas)) {
    tl.set(canvas, vars(WIDE)).to(canvas, glide(resolve(canvas, film.start), 1.3), 0.7);
    lead = 1.9;
    film.cues.forEach(([at, cue]) => body.to(canvas, glide(resolve(canvas, cue)), at));
    if (!reduce) body.to(canvas, glide(WIDE, 1.5), "+=1.8");
  }
  tl.add(body, lead);
  return tl;
}

export const FILMS: Record<string, Film> = {
  desk: {
    start: { x: 100, y: 40, w: 570 },
    cues: [
      ["panel", { x: 690, y: 150, w: 500 }],
      ["done+=1.2", { x: 530, y: 60, w: 520 }],
    ],
  },
  rooms: {
    start: { x: 250, y: 60, w: 460 },
    cues: [
      ["folio-=0.3", { x: 790, y: 200, w: 410 }],
      ["key", { x: 790, y: 60, w: 410 }],
    ],
  },
  restaurant: {
    start: { x: 440, y: 180, w: 420 },
    cues: [["ticket", { x: 765, y: 200, w: 430 }]],
  },
  kitchen: {
    start: { x: 780, y: 40, w: 420 },
    cues: [
      ["deplete-=1", { x: 90, y: 150, w: 480 }],
      ["off", { x: 700, y: 150, w: 460 }],
      ["sent+=0.4", { x: 780, y: 40, w: 420 }],
    ],
  },
  housekeeping: {
    start: { x: 760, y: 40, w: 420 },
    cues: [
      ["tile-=0.8", { x: 600, y: 220, w: 440 }],
      ["job", { x: 780, y: 200, w: 420 }],
      ["clean", { x: 600, y: 220, w: 440 }],
    ],
  },
};

FILMS.pms = {
  start: { d: "pm-cal", w: 560, ax: 0.42, ay: 0.4 },
  cues: [
    ["guest+=0.2", { d: "pm-guest", w: 430, ay: 0.32 }],
    ["checkout", { d: "pm-guest", w: 430, ay: 0.72 }],
    ["checkout+=2.6", { d: "pm-cal", w: 560, ax: 0.42, ay: 0.4 }],
  ],
};
FILMS.kds = {
  start: { d: "kd-new", w: 480, ax: 0.1, ay: 0.45 },
  cues: [
    ["wait-=0.6", { d: "kd-t04", w: 480, ax: 1, ay: 0.45 }],
    ["bump-=0.6", { d: "kd-t12", w: 460, ax: 0.6, ay: 0.5 }],
  ],
};
FILMS.pos = {
  start: { d: "rs-offline", w: 460, ax: 0.5, ay: 0.85 },
  cues: [
    ["table+=0.9", { x: 765, y: 200, w: 430 }],
    ["online-=0.3", { d: "rs-online", w: 480, ax: 0.6, ay: 0.85 }],
  ],
};

FILMS.booking = {
  start: { d: "bk-room", w: 470, ax: 0.5, ay: 0.4 },
  cues: [
    ["paid-=0.2", { d: "bk-stats", w: 430, ay: 0.7 }],
    ["avail-=0.1", { d: "bk-avail", w: 430, ay: 0.45 }],
  ],
};
FILMS.channel = {
  start: { d: "ch-editor", w: 470, ax: 0.78, ay: 1.4 },
  cues: [
    ["spread", { x: 66, y: 150, w: 540 }],
    ["queue-=0.6", { d: "ch-queue", w: 430, ay: 0.55 }],
    ["direct+=0.6", { d: "ch-queue", w: 430, ay: 0.7 }],
  ],
};
FILMS.revenue = {
  start: { d: "rv-chart", w: 480, ax: 0.5, ay: 0.4 },
  cues: [
    ["push-=0.3", { d: "rv-chart", w: 520, ax: 0.5, ay: 0.62 }],
    ["market-=0.8", { d: "rv-market", w: 430, ay: 0.6 }],
  ],
};
FILMS.events = {
  start: { d: "ev-card", w: 460, ax: 0.75, ay: 0.6 },
  cues: [
    ["order-=0.6", { d: "ev-order", w: 430, ay: 0.4 }],
    ["sign", { d: "ev-order", w: 430, ay: 0.75 }],
  ],
};

FILMS.ordering = {
  start: { d: "od-phone", w: 430, ax: 0.62, ay: 0.55 },
  cues: [
    ["tablet-=0.7", { d: "od-tablet", w: 470, ay: 0.5 }],
    ["results-=0.5", { d: "od-bill", w: 420, ax: 0.4, ay: 1.1 }],
  ],
};
FILMS.menus = {
  start: { d: "mn-dish", w: 460, ax: 0.75, ay: 0.6 },
  cues: [
    ["cost-=0.8", { d: "mn-recipe", w: 470, ay: 0.6 }],
    ["out-=0.6", { d: "mn-recipe", w: 470, ay: 0.45 }],
    ["out+=1.3", { d: "mn-where", w: 440, ax: 0.3, ay: 0.35 }],
  ],
};
FILMS.floor = {
  start: { d: "fl-t14", w: 520, ax: 1.2, ay: 1.4 },
  cues: [
    ["booking-=0.4", { d: "fl-list", w: 440, ay: 0.4 }],
    ["seat+=1.2", { d: "fl-t5", w: 480, ax: 1.1, ay: 1.2 }],
  ],
};
FILMS.buffet = {
  start: { d: "bf-prep", w: 450, ay: 0.45 },
  cues: [
    ["lines-=0.6", { d: "bf-lines", w: 450, ay: 0.5 }],
    ["plates-=0.6", { d: "bf-plates", w: 430, ay: 0.4 }],
  ],
};

FILMS.messaging = {
  start: { d: "ms-thread", w: 470, ay: 0.62 },
  cues: [["fallback-=0.6", { d: "ms-auto", w: 430, ay: 0.4 }]],
};
FILMS.profiles = {
  start: { d: "pr-prefs", w: 430, ay: 0.5 },
  cues: [
    ["spend-=0.6", { d: "pr-history", w: 470, ay: 0.4 }],
    ["spend+=1", { d: "pr-spend", w: 420, ay: 0.85 }],
  ],
};
FILMS.locks = {
  start: { d: "lk-phone", w: 430, ax: 0.62, ay: 0.45 },
  cues: [
    ["door", { d: "lk-locks", w: 420, ay: 0.6 }],
    ["extend-=0.7", { d: "lk-keys", w: 470, ay: 0.55 }],
    ["checkout+=1.6", { d: "lk-phone", w: 460, ax: 0.9, ay: 0.45 }],
  ],
};
FILMS.staff = {
  start: { d: "st-rota", w: 520, ax: 0.45, ay: 0.45 },
  cues: [
    ["clock-=0.6", { d: "st-phone", w: 420, ay: 0.45 }],
    ["task-=0.5", { d: "st-tasks", w: 420, ay: 0.6 }],
  ],
};
FILMS.website = {
  start: { x: 690, y: 30, w: 500 },
  cues: [
    ["photo-=0.7", { d: "ws-slots", w: 440, ax: 0.7, ay: 0.35 }],
    ["photo+=1.6", { d: "ws-site", w: 580, ax: 0.32, ay: 0.5 }],
    ["table-=0.4", { d: "ws-tablebox", w: 440, ay: 0.3 }],
  ],
};

// The hero on phones: a slow tour of the overview, card by card, with a new bill arriving on a folio.
export function heroTour(canvas: HTMLElement) {
  const row = el(canvas, "ov-new");
  const shot = (d: string, w = 420, ax = 0.5) => vars(resolve(canvas, { d, w, ax }));
  const tl = gsap.timeline({ repeat: -1, defaults: { duration: 1.4, ease: "power3.inOut" } });
  tl.set(canvas, vars(WIDE))
    .set(row, { height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 })
    .to(canvas, shot("ov-occ"), "+=1.4")
    .to(canvas, shot("ov-rest"), "+=1.8")
    .to(canvas, shot("ov-kitchen"), "+=1.8")
    .to(canvas, shot("ov-bills", 460), "+=1.8")
    .to(row, { height: "auto", paddingTop: 10, paddingBottom: 10, opacity: 1, duration: 0.6, ease: "power3.out" }, "+=0.3")
    .fromTo(row, { backgroundColor: "rgba(199,154,69,0.3)" }, { backgroundColor: "rgba(199,154,69,0)", duration: 1.6, ease: "none" })
    .to(canvas, shot("ov-arrivals", 460, 0.38), "+=0.4")
    .to(canvas, { ...vars(WIDE), duration: 1.6 }, "+=2");
  tl.to({}, { duration: 1.6 });
  return tl;
}
