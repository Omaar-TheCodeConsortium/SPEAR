import { ArrowRight, Check, Fingerprint, Globe, Lock, Mail, Nfc, Plus, QrCode, RefreshCw, ShieldCheck, UserCheck, Wifi, X } from "lucide-react";
import { asset } from "@/lib/constants";
import { FLOOR } from "./screens-restaurant";
import { Avatar, Btn, Card, Chip, Head, HIDDEN, Label } from "./screens";

// Guests, property and staff screens for the module explorer. Same rules as screens.tsx.


/* ---------- Guest messaging ---------- */

const THREADS = [
  ["MC", "Sophia & Marcus Chen", "Is the terrace open for breakfast?", "Email"],
  ["AP", "Dr Arthur Pendelton", "Thank you, the car was perfect.", "SMS"],
  ["LM", "Luca Moretti", "Arriving around 22:00 tonight.", "WhatsApp"],
];

export function MessagingScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Guest messaging" title="Inbox" right={<Chip className="px-3 py-1.5 text-[12px]">WhatsApp · SMS · email</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[270px_1fr_320px] gap-5">
        <Card className="p-3">
          <div data-d="ms-new" className={`rounded-md border border-brass/50 bg-brass/10 p-3 ${HIDDEN}`}>
            <p className="flex items-center justify-between text-[13px] font-semibold">Eleanor Vance <Chip tone="sage">WhatsApp</Chip></p>
            <p className="truncate text-[12px] text-taupe">Could we have a late checkout?</p>
          </div>
          {THREADS.map(([i, name, line, via]) => (
            <div key={name} className="flex gap-3 border-b border-line-soft p-3">
              <Avatar initials={i} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between text-[13px] font-semibold">{name.split(" ").slice(-1)} <Chip>{via}</Chip></span>
                <span className="block truncate text-[12px] text-taupe">{line}</span>
              </span>
            </div>
          ))}
        </Card>
        <Card d="ms-thread" className="flex flex-col p-5">
          <p className="flex items-center gap-3 border-b border-line-soft pb-3">
            <Avatar initials="EV" tone="brass" />
            <span><span className="block font-semibold">Eleanor Vance · Suite 404</span><span className="block text-[12px] text-taupe">VIP · checks out Sun 12:00</span></span>
          </p>
          <div className="flex flex-1 flex-col justify-end gap-3 py-3 text-[13px]">
            <p className="max-w-[75%] rounded-lg rounded-bl-sm bg-parchment px-3 py-2">Thank you for the flowers, they&apos;re lovely.</p>
            <p data-d="ms-in" className={`max-w-[75%] rounded-lg rounded-bl-sm bg-parchment px-3 py-2 ${HIDDEN}`}>Could we have a late checkout on Sunday, around 2pm?</p>
            <div data-d="ms-out" className={`max-w-[75%] self-end rounded-lg rounded-br-sm bg-espresso px-3 py-2 text-linen ${HIDDEN}`}>
              Of course. Your checkout is now 14:00 on Sunday, and your key has been updated.
              <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-brass"><Check size={12} /> WhatsApp · delivered</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 flex-1 items-center rounded-lg border border-line bg-linen px-3 text-[13px] text-taupe">Reply by WhatsApp</span>
            <Btn tone="dark" d="ms-send">Send</Btn>
          </div>
        </Card>
        <Card d="ms-auto" className="p-5">
          <Label>Sent for you</Label>
          <div className="mt-2 border-t border-line-soft py-3 text-[13px]">
            <p className="font-semibold">Booking confirmed · Daniel Okafor</p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-sage-deep"><Check size={12} /> WhatsApp · delivered 17:58</p>
          </div>
          <div data-d="ms-ready" className={`border-t border-line-soft py-3 text-[13px] ${HIDDEN}`}>
            <p className="font-semibold">Room ready · Priya Raman, Room 306</p>
            <p data-d="ms-f1" className="mt-1 flex items-center gap-1 text-[12px] text-alert"><X size={12} /> WhatsApp · not delivered</p>
            <p data-d="ms-f2" className={`mt-0.5 flex items-center gap-1 text-[12px] text-sage-deep ${HIDDEN}`}><Check size={12} /> Sent by SMS instead · delivered</p>
          </div>
          <div data-d="ms-conf" className={`border-t border-line-soft py-3 text-[13px] ${HIDDEN}`}>
            <p className="font-semibold">Booking confirmed · Aris party</p>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-sage-deep"><Mail size={12} /> Email · delivered 18:43</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Guest profiles ---------- */

const HISTORY = [
  ["Stay · Suite 404 · 3 nights", "Mar 2026", "$2,140"],
  ["Azure Bistro · tasting menu", "Mar 2026", "$310"],
  ["Stay · Suite 404 · 4 nights", "Dec 2025", "$2,860"],
  ["Spa · couples massage", "Dec 2025", "$240"],
];

export function ProfilesScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Guest profiles" title="Eleanor Vance" right={<><Chip tone="brass" className="px-3 py-1.5 text-[12px]">VIP</Chip><Chip className="px-3 py-1.5 text-[12px]">6 stays since 2023</Chip></>} />
      <div className="grid min-h-0 flex-1 grid-cols-[300px_1fr_290px] gap-5">
        <Card d="pr-prefs" className="flex flex-col p-5">
          <Label>Preferences</Label>
          <p className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="brass">Suite 404</Chip>
            <Chip tone="brass">Feather-free pillows</Chip>
            <Chip tone="brass">Still water, no ice</Chip>
            <Chip tone="brass" d="pr-newpref" className={HIDDEN}>Late checkout, 14:00</Chip>
          </p>
          <Label className="mt-5">Dietary</Label>
          <p data-d="pr-diet" className="mt-2 rounded-md bg-alert/10 px-3 py-2 text-[13px] font-semibold text-alert">Shellfish allergy</p>
          <Label className="mt-5">Notes from the team</Label>
          <p className="mt-2 text-[13px] text-taupe">Celebrating an anniversary in March. Likes a table by the window.</p>
          <span className="mt-auto block"><Btn d="pr-add" className="w-full"><Plus size={15} /> Add a preference</Btn></span>
        </Card>
        <Card d="pr-history" className="p-5">
          <Label>Stays and meals</Label>
          <div data-d="pr-new" className={`mt-2 flex items-center justify-between rounded-md border border-brass/50 bg-brass/10 px-3 py-3 text-[13px] ${HIDDEN}`}>
            <span><span className="block font-semibold">Azure Bistro · Table 8 · tonight</span><span className="block text-[12px] text-taupe">Charged to Suite 404</span></span>
            <span className="font-semibold">$409.82</span>
          </div>
          {HISTORY.map(([what, when, amount]) => (
            <div key={what} className="flex items-center justify-between border-b border-line-soft py-3 text-[13px]">
              <span><span className="block font-semibold">{what}</span><span className="block text-[12px] text-taupe">{when}</span></span>
              <span className="font-semibold tabular-nums">{amount}</span>
            </div>
          ))}
        </Card>
        <div className="flex flex-col gap-5">
          <Card d="pr-spend" className="p-5">
            <Label>Lifetime spend</Label>
            <p data-d="pr-total" className="mt-1 text-[34px] font-semibold leading-none tracking-[-0.02em] tabular-nums">$13,870</p>
            <div className="mt-4 space-y-2 text-[13px]">
              <p className="flex justify-between"><span>Rooms</span><span className="font-semibold">$9,800</span></p>
              <p className="flex justify-between"><span>Restaurant and bar</span><span data-d="pr-rest" className="font-semibold">$3,450</span></p>
              <p className="flex justify-between"><span>Spa</span><span className="font-semibold">$620</span></p>
            </div>
          </Card>
          <Card d="pr-private" className="flex-1 p-5">
            <p className="flex items-center gap-2 font-semibold"><Lock size={16} className="text-brass-deep" /> Private to this property</p>
            <p className="mt-2 text-[13px] text-taupe">Only your team sees this profile. It is never shared with other SPEAR properties.</p>
            <Chip tone="sage" d="pr-ok" className={`mt-3 ${HIDDEN}`}><ShieldCheck size={12} /> Guest can ask for it to be erased</Chip>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- Smart locks ---------- */

const KEYS = [
  ["Room 305", "Daniel Okafor", "Wallet", "lk"],
  ["Room 402", "Julian Vance", "Wallet"],
  ["Room 218", "Arthur Pendelton", "Key card"],
  ["Suite 404", "Eleanor Vance", "Wallet"],
];

export function LocksScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Smart locks" title="Room keys" right={<Chip tone="sage" className="px-3 py-1.5 text-[12px]">48 doors online</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[250px_1fr_280px] gap-5">
        <div data-d="lk-phone" className="relative mx-auto flex h-full w-[240px] flex-col overflow-hidden rounded-[30px] border-[6px] border-espresso bg-[#2b231d] p-3">
          <p className="mt-1 text-center text-[11px] font-semibold text-linen/70">Wallet</p>
          <div data-d="lk-pass" className={`mt-3 rounded-xl bg-[linear-gradient(160deg,#c79a45,#7c5801)] p-4 text-espresso ${HIDDEN}`}>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]">The Grand Azure</p>
            <p className="mt-4 text-[26px] font-semibold leading-none">Room 305</p>
            <p data-d="lk-pass-dates" className="mt-1 text-[12px] font-semibold">Thu 4 – Sun 7 Oct</p>
            <p className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold"><Nfc size={14} /> Hold near the lock</p>
          </div>
          <div data-d="lk-open" className={`mt-3 flex items-center justify-center gap-2 rounded-lg bg-sage py-2 text-[12px] font-semibold text-white ${HIDDEN}`}>
            <Check size={14} strokeWidth={3} /> Door open
          </div>
          <span data-d="lk-void" className={`absolute inset-x-3 top-24 rounded-lg bg-espresso/90 py-3 text-center text-[12px] font-semibold text-linen ${HIDDEN}`}>Key stopped at checkout</span>
        </div>
        <Card d="lk-keys" className="flex flex-col p-5">
          <Label>Keys issued</Label>
          {KEYS.map(([room, who, kind, d]) => (
            <div key={room} data-d={d ? "lk-row" : undefined} className="grid grid-cols-[90px_1fr_auto] items-center gap-3 rounded border-b border-line-soft px-1 py-3 text-[13px]">
              <span className="font-semibold">{room}</span>
              <span>
                <span className="block font-semibold">{who}</span>
                <span data-d={d ? "lk-until" : undefined} className="block text-[12px] text-taupe">{kind} · until Sun 7 Oct, 11:00</span>
              </span>
              <Chip tone={kind === "Wallet" ? "sage" : "neutral"} d={d ? "lk-status" : undefined}>{kind === "Wallet" ? "Active" : "Card"}</Chip>
            </div>
          ))}
          <div className="mt-auto grid grid-cols-2 gap-2">
            <Btn d="lk-extend">Extend to Mon 8 Oct</Btn>
            <Btn tone="dark" d="lk-checkout">Check out</Btn>
          </div>
        </Card>
        <Card d="lk-locks" className="flex flex-col p-5">
          <Label>Locks</Label>
          {["Assa Abloy", "Salto", "Dormakaba"].map((brand) => (
            <p key={brand} data-d={brand === "Salto" ? "lk-salto" : undefined} className="flex items-center justify-between rounded border-b border-line-soft px-1 py-3 text-[13px]">
              <span className="font-semibold">{brand}</span>
              <Chip tone="sage"><Check size={11} strokeWidth={3} /> Works</Chip>
            </p>
          ))}
          <Label className="mt-5">Latest at the doors</Label>
          <p className="mt-2 text-[12px] text-taupe">Suite 404 · wallet key · 18:20</p>
          <p data-d="lk-door" className={`mt-2 rounded-md bg-sage/10 px-3 py-2 text-[12px] font-semibold text-sage-deep ${HIDDEN}`}>Room 305 · opened with wallet key · 18:42</p>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Staff and timeclock ---------- */

const ROTA = [
  ["Front desk", [["Amara", 0, 4], ["Tom", 4, 4]]],
  ["Housekeeping", [["Rosa", 0, 4]]],
  ["Kitchen", [["Chef Ines", 0, 4], ["Dev", 4, 4]]],
  ["Service", [["Sarah L.", 3, 5]]],
] as const;
const HOURS = ["06", "08", "10", "12", "14", "16", "18", "20"];
const SLOT = 50;

export function StaffScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Staff and timeclock" title="Today's rota" right={<Chip className="px-3 py-1.5 text-[12px]">14 on shift</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_230px_260px] gap-5">
        <Card d="st-rota" className="p-4">
          <div className="flex pl-[110px]">
            {HOURS.map((h) => (
              <span key={h} className="flex-none text-[11px] font-semibold text-taupe" style={{ width: SLOT }}>{h}:00</span>
            ))}
          </div>
          {ROTA.map(([role, shifts]) => (
            <div key={role} className="mt-2 flex items-center">
              <span className="w-[110px] flex-none text-[13px] font-semibold">{role}</span>
              <span className="relative h-12 flex-1 rounded-md bg-parchment/50">
                {shifts.map(([who, from, len]) => (
                  <span key={who} className="absolute top-1 flex h-10 items-center rounded-md bg-brass/25 px-2 text-[12px] font-semibold" style={{ left: from * SLOT, width: len * SLOT - 4 }}>{who}</span>
                ))}
                {role === "Housekeeping" ? (
                  <span data-d="st-new" className={`absolute top-1 flex h-10 items-center rounded-md bg-sage px-2 text-[12px] font-semibold text-white ${HIDDEN}`} style={{ left: 4 * SLOT, width: 4 * SLOT - 4 }}>Nimali · 14:00 – 22:00</span>
                ) : null}
              </span>
            </div>
          ))}
          <span className="mt-4 block w-fit"><Btn d="st-add"><Plus size={15} /> Add shift</Btn></span>
        </Card>
        <div data-d="st-phone" className="relative mx-auto flex h-full w-[230px] flex-col items-center overflow-hidden rounded-[30px] border-[6px] border-espresso bg-linen px-4 pt-6 text-center">
          <p className="text-[12px] font-semibold text-taupe">Staff clock-in</p>
          <span data-d="st-qr" className="mt-4 flex h-28 w-28 items-center justify-center rounded-xl border-2 border-espresso"><QrCode size={64} /></span>
          <p className="mt-2 text-[12px] text-taupe">Scan the code by the staff door</p>
          <span data-d="st-face" className={`mt-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brass text-brass-deep ${HIDDEN}`}><Fingerprint size={30} /></span>
          <div data-d="st-ok" className={`mt-4 w-full rounded-lg bg-sage p-3 text-white ${HIDDEN}`}>
            <p className="flex items-center justify-center gap-1.5 text-[13px] font-semibold"><Check size={14} strokeWidth={3} /> Clocked in 14:00</p>
            <p className="mt-1 flex items-center justify-center gap-1 text-[11px]"><Wifi size={12} /> On the hotel Wi-Fi</p>
          </div>
        </div>
        <Card d="st-tasks" className="flex flex-col p-5">
          <Label>On shift now</Label>
          <p className="flex items-center justify-between border-b border-line-soft py-2.5 text-[13px]"><span className="font-semibold">Rosa · housekeeping</span><Chip tone="sage">On</Chip></p>
          <p className="flex items-center justify-between border-b border-line-soft py-2.5 text-[13px]"><span className="font-semibold">Nimali · housekeeping</span><Chip d="st-nim" tone="neutral">Due 14:00</Chip></p>
          <Label className="mt-5">Tasks</Label>
          <p className="mt-1 border-b border-line-soft py-2.5 text-[13px]"><span className="block font-semibold">Restock minibar · 218</span><span className="text-[12px] text-taupe">Rosa</span></p>
          <p data-d="st-task" className={`rounded-md border border-sage/50 bg-sage/10 px-2 py-2.5 text-[13px] ${HIDDEN}`}>
            <span className="block font-semibold">Clean Room 305 · checkout</span>
            <span className="flex items-center gap-1 text-[12px] text-sage-deep"><UserCheck size={12} /> Sent to Nimali, on shift</span>
          </p>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Hotel website ---------- */

// The hotel's own site, as a guest sees it. Its table booking uses the floor plan drawn in SPEAR,
// shown alongside so the two can be compared.

const SERIF = { fontFamily: "Georgia, 'Times New Roman', serif" };
const PHOTO = (name: string) => asset(`/demo/${name}.webp`);

// Tables already taken at 19:30, and the extra round table added on the floor plan.
const TAKEN = new Set(["T-01", "T-02", "T-03", "T-06", "T-10", "T-12"]);
const PLAN = [...FLOOR, { id: "T-14", x: 420, y: 30, w: 92, h: 92, round: true }];

function SitePlan({ scale, d, site }: { scale: number; d: string; site: boolean }) {
  return (
    <div className="relative" style={{ width: 560 * scale, height: 400 * scale }}>
      {PLAN.map((t) => {
        const taken = TAKEN.has(t.id);
        const mine = t.id === "T-05";
        return (
          <div
            key={t.id}
            className={`absolute flex items-center justify-center border font-semibold ${t.round ? "rounded-full" : "rounded-md"} ${
              taken ? "border-transparent bg-[#e7dfd0] text-[#a39684]" : site ? "border-[#4e7356] bg-white text-[#2f3e34]" : "border-line bg-cream text-espresso"
            }`}
            style={{ left: t.x * scale, top: t.y * scale, width: t.w * scale, height: t.h * scale, fontSize: site ? 11 : 9 }}
          >
            {t.id.replace("T-0", "").replace("T-", "")}
            {mine ? (
              <span data-d={d} className={`absolute inset-[-1px] flex flex-col items-center justify-center rounded-md bg-brass text-espresso ${HIDDEN}`}>
                <Check size={site ? 14 : 10} strokeWidth={3} />
                {site ? <span className="text-[10px] font-semibold">Yours</span> : <span className="text-[8px] font-semibold">Aris</span>}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function WebsiteScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Hotel website" title="Your website" right={<Chip tone="sage" className="px-3 py-1.5 text-[12px]"><Globe size={12} /> Live · built from SPEAR</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_262px] gap-5">
        {/* The browser */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-parchment/60 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span data-d="ws-domain" className="ml-3 flex items-center gap-2 rounded-full bg-linen px-3 py-1 text-[12px] text-espresso">
              <Lock size={11} className="text-sage-deep" /> grandazure.com
            </span>
          </div>
          <div className="relative flex-1 overflow-hidden bg-white" style={SERIF}>
            {/* The site's own navigation stays put while the page scrolls under it */}
            <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-between bg-white/95 px-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
              <span className="text-[15px] tracking-[0.22em] text-[#1d2b33]">THE GRAND AZURE</span>
              <span className="flex items-center gap-5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a5a62]">
                <span>Stay</span>
                <span>Dine</span>
                <span>Spa</span>
                <span>Offers</span>
                <span className="rounded-full bg-[#1d2b33] px-3.5 py-1.5 text-white">Book now</span>
              </span>
            </div>

            <div data-d="ws-page" className="absolute inset-x-0 top-0 h-[200%]">
              {/* Hero, with the room search a real hotel site leads with */}
              <section data-d="ws-hero" className="relative h-1/2 pt-12">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PHOTO("site-hero")} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,26,0.05)_30%,rgba(10,20,26,0.55)_100%)]" />
                <div className="absolute inset-x-7 bottom-[104px] text-white">
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">Beachfront resort &amp; bistro</p>
                  <p className="mt-2 text-[40px] leading-[1.05]">A quiet stay by the sea</p>
                  <span data-d="ws-dine" className="mt-3 inline-flex items-center gap-1.5 border-b border-white/70 pb-0.5 font-sans text-[12px] font-semibold">
                    Reserve a table at Azure Bistro <ArrowRight size={13} />
                  </span>
                </div>
                <div className="absolute inset-x-7 bottom-6 grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-px overflow-hidden rounded-lg bg-[#e8e2d8] font-sans shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)]">
                  {[["Check in", "Thu 4 Oct"], ["Check out", "Sun 7 Oct"], ["Guests", "2 adults · 1 room"]].map(([k, v]) => (
                    <span key={k} className="bg-white px-4 py-2.5">
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7b8790]">{k}</span>
                      <span className="block text-[13px] font-semibold text-[#1d2b33]">{v}</span>
                    </span>
                  ))}
                  <span className="flex h-full items-center bg-[#1d2b33] px-5 text-[12px] font-semibold text-white">Check availability</span>
                </div>
              </section>

              {/* Dining, with the table booking that reads the SPEAR floor plan */}
              <section className="grid h-1/2 grid-cols-[230px_1fr] gap-6 bg-[#faf7f2] px-7 pb-6 pt-16">
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a6a2f]">Azure Bistro</p>
                  <p className="mt-1.5 text-[26px] leading-[1.1] text-[#1d2b33]">Dinner on the terrace</p>
                  <p className="mt-2 font-sans text-[12px] leading-relaxed text-[#5c6870]">Coastal cooking from 18:00, every night. Pick the table you&apos;d like.</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTO("site-dining")} alt="" className="mt-4 h-[150px] w-full rounded-lg object-cover" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PHOTO("site-dish")} alt="" className="-mt-10 ml-auto mr-[-10px] h-[86px] w-[86px] rounded-full border-4 border-[#faf7f2] object-cover" />
                </div>
                <div data-d="ws-widget" className="flex flex-col rounded-xl bg-white p-5 font-sans shadow-[0_16px_40px_-18px_rgba(29,43,51,0.45)] ring-1 ring-black/5">
                  <p className="text-[19px] text-[#1d2b33]" style={SERIF}>Reserve a table</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                    <span className="rounded-md border border-[#e3ddd2] px-3 py-1.5"><span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#7b8790]">Date</span><span className="font-semibold">Tonight, Thu 4 Oct</span></span>
                    <span className="rounded-md border border-[#e3ddd2] px-3 py-1.5"><span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#7b8790]">Party</span><span className="font-semibold">4 guests</span></span>
                  </div>
                  <div className="mt-2.5 flex gap-1.5 text-[11px] font-semibold">
                    {["19:00", "19:30", "20:00", "20:30"].map((t) => (
                      <span key={t} className={`rounded-full px-3 py-1 ${t === "19:30" ? "bg-[#1d2b33] text-white" : t === "20:30" ? "text-[#b3aba0] line-through" : "border border-[#e3ddd2] text-[#1d2b33]"}`}>{t}</span>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7b8790]">
                    Choose your table
                    <span className="flex items-center gap-3 normal-case tracking-normal">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full border border-[#4e7356] bg-white" /> Free</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#e7dfd0]" /> Taken</span>
                    </span>
                  </p>
                  <div data-d="ws-plan" className="relative mt-1.5 flex-1 rounded-lg bg-[#f6f2ea]">
                    <div className="absolute left-4 top-2.5">
                      <SitePlan scale={0.42} d="ws-t5" site />
                    </div>
                    <span className="absolute bottom-2 left-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#a39684]">Kitchen</span>
                    <span className="absolute bottom-2 right-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#a39684]">Terrace doors</span>
                    <span data-d="ws-pick" className={`absolute right-3 top-3 w-[118px] rounded-md bg-white p-2 text-[11px] shadow-sm ring-1 ring-black/5 ${HIDDEN}`}>
                      <span className="block font-semibold text-[#1d2b33]">Table 5</span>
                      <span className="block text-[#5c6870]">Seats 4 · by the window</span>
                    </span>
                  </div>
                  <span className="relative mt-3 block">
                    <span className="flex h-10 items-center justify-center rounded-lg bg-[#ece7de] text-[12px] font-semibold text-[#9a9186]">Choose a table</span>
                    <span data-d="ws-reserve" className={`absolute inset-0 flex items-center justify-center rounded-lg bg-[#1d2b33] text-[12px] font-semibold text-white ${HIDDEN}`}>Reserve table 5 · 19:30</span>
                    <span data-d="ws-confirm" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-[#4e7356] text-[12px] font-semibold text-white ${HIDDEN}`}>
                      <Check size={14} strokeWidth={3} /> Reserved · confirmation sent to Aris
                    </span>
                  </span>
                </div>
              </section>
            </div>
          </div>
        </Card>

        {/* SPEAR, where the plan is drawn */}
        <Card d="ws-spear" className="flex flex-col p-4">
          <Label>In SPEAR · Azure Bistro</Label>
          <p className="mt-0.5 text-[12px] text-taupe">The floor plan your website books from</p>
          <div data-d="ws-sp-plan" className="mt-3 rounded-md bg-[radial-gradient(circle,rgba(92,79,68,0.12)_1px,transparent_1px)] p-2 [background-size:14px_14px]">
            <SitePlan scale={0.4} d="ws-sp-t5" site={false} />
          </div>
          <Label className="mt-4">Tonight · 19:00 – 20:00</Label>
          {[["Marchetti", "2 · 19:00 · T-01"], ["Novak", "6 · 19:15 · T-12"]].map(([who, line]) => (
            <p key={who} className="flex items-center justify-between border-t border-line-soft py-2 text-[12px]">
              <span><span className="block font-semibold">{who}</span><span className="block text-[11px] text-taupe">{line}</span></span>
              <Chip tone="brass">Seated</Chip>
            </p>
          ))}
          <p data-d="ws-sp-new" className={`flex items-center justify-between border-t border-line-soft py-2 text-[12px] ${HIDDEN}`}>
            <span><span className="block font-semibold">Aris</span><span className="block text-[11px] text-taupe">4 · 19:30 · T-05</span></span>
            <Chip tone="sage">Your website</Chip>
          </p>
          <p className="mt-auto flex items-start gap-2 rounded-md bg-parchment/60 p-2.5 text-[11px] leading-snug text-taupe">
            <RefreshCw size={13} className="mt-0.5 flex-none" /> Move a table here and your website changes with it.
          </p>
        </Card>
      </div>
    </div>
  );
}
