import { Check, Clock, Fingerprint, Globe, ImageIcon, Lock, Mail, Nfc, Plus, QrCode, ShieldCheck, Smartphone, UserCheck, Wifi, X } from "lucide-react";
import { Avatar, Btn, Card, Chip, Head, HIDDEN, Label, Toast } from "./screens";

// Guests, property and staff screens for the module explorer. Same rules as screens.tsx.

const OK = "absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[13px] font-semibold text-white";

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

const SLOTS = ["Front page", "Rooms gallery", "Restaurant", "Spa"];

export function WebsiteScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Hotel website" title="Your website" right={<Chip tone="sage" d="ws-domain" className="px-3 py-1.5 text-[12px]"><Lock size={12} /> Your domain · secure</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[280px_1fr] gap-5">
        <Card d="ws-slots" className="p-5">
          <Label>Photos, by slot</Label>
          {SLOTS.map((slot, i) => (
            <div key={slot} className="mt-2 flex items-center gap-3 rounded-md border border-line-soft p-2">
              <span className={`h-11 w-14 flex-none rounded ${i === 0 ? "bg-[linear-gradient(180deg,#9fb3ad_0%,#9fb3ad_55%,#c7b48f_55%)]" : "bg-[linear-gradient(135deg,#ede5d4,#c79a45)] opacity-70"}`} />
              <span className="flex-1 text-[13px] font-semibold">{slot}</span>
              {i === 0 ? <Btn d="ws-replace" className="h-8 px-3 text-[12px]"><ImageIcon size={13} /> Replace</Btn> : null}
            </div>
          ))}
          <p className="mt-4 flex items-center gap-2 text-[12px] text-taupe"><Smartphone size={14} /> Sized for every screen automatically</p>
        </Card>
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-parchment/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 flex items-center gap-2 rounded-full bg-linen px-3 py-1 text-[12px] text-taupe"><Lock size={11} className="text-sage-deep" /> your-hotel.com</span>
          </div>
          <div data-d="ws-site" className="relative flex-1">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#9fb3ad_0%,#b9c6bf_58%,#c7b48f_58%,#d8c9a8_100%)]" />
            <div data-d="ws-hero2" className={`absolute inset-0 bg-[linear-gradient(180deg,#d9a46b_0%,#e8c290_52%,#7f8f86_52%,#5f6f67_100%)] ${HIDDEN}`} />
            <div className="absolute left-8 top-8 text-espresso">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em]">The Grand Azure</p>
              <p className="mt-1 text-[34px] font-semibold leading-tight">A quiet stay by the sea</p>
            </div>
            <div className="absolute inset-x-8 bottom-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-cream/95 p-4 shadow-[0_10px_30px_-10px_rgba(34,27,22,0.4)]">
                <Label>Book a room</Label>
                <p className="mt-1 text-[13px] font-semibold">Thu 4 – Sun 7 Oct · 2 adults</p>
                <Btn tone="dark" className="mt-3 w-full">See rooms</Btn>
              </div>
              <div data-d="ws-tablebox" className="relative rounded-lg bg-cream/95 p-4 shadow-[0_10px_30px_-10px_rgba(34,27,22,0.4)]">
                <Label>Book a table</Label>
                <p className="mt-1 text-[13px] font-semibold">Tonight · 2 guests</p>
                <span className="relative mt-3 block">
                  <Btn tone="brass" d="ws-table" className="w-full"><Clock size={14} /> 19:30</Btn>
                  <span data-d="ws-booked" className={`${OK} text-[12px] ${HIDDEN}`}><Check size={14} strokeWidth={3} /> Table booked</span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Toast d="ws-toast" icon={<Globe size={16} />} title="New photo is live" line="Resized for phones, tablets and desktops" />
    </div>
  );
}
