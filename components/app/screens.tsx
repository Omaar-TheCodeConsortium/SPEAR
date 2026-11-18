import type { ReactNode } from "react";
import { BadgeCheck, Check, Clock, IdCard, KeyRound, Receipt, Smartphone, Truck, Wifi } from "lucide-react";

// The SPEAR screens shown on the site, rebuilt from the team's Stitch designs with sample data.
// Each fills the 1136 × 700 content area of <AppShell>. Elements a demo changes carry data-d names;
// elements that only appear during a demo start hidden ("invisible opacity-0") and GSAP reveals them.

const HIDDEN = "invisible opacity-0";

type Tone = "neutral" | "brass" | "sage" | "rust" | "alert" | "dark";
const TONES: Record<Tone, string> = {
  neutral: "bg-parchment text-taupe",
  brass: "bg-brass/15 text-brass-deep",
  sage: "bg-sage/15 text-sage-deep",
  rust: "bg-rust/15 text-rust",
  alert: "bg-alert/10 text-alert",
  dark: "bg-espresso text-linen",
};

function Chip({ tone = "neutral", children, d, className = "" }: { tone?: Tone; children: ReactNode; d?: string; className?: string }) {
  return (
    <span data-d={d} className={`inline-flex items-center gap-1 whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-semibold ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.07em] text-taupe ${className}`}>{children}</p>;
}

function Btn({ tone = "light", children, d, className = "" }: { tone?: "light" | "brass" | "dark"; children: ReactNode; d?: string; className?: string }) {
  const look = {
    light: "border border-line bg-cream text-espresso",
    brass: "bg-brass text-espresso",
    dark: "bg-espresso text-linen",
  }[tone];
  return (
    <span data-d={d} className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-[13px] font-semibold ${look} ${className}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "", d }: { children: ReactNode; className?: string; d?: string }) {
  return (
    <div data-d={d} className={`rounded-lg border border-line bg-cream ${className}`}>
      {children}
    </div>
  );
}

function Head({ label, title, right }: { label: string; title: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <Label className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brass" />
          {label}
        </Label>
        <h3 className="mt-1 text-[26px] font-semibold tracking-[-0.01em]">{title}</h3>
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}

function Toast({ d, icon, title, line }: { d: string; icon: ReactNode; title: string; line: string }) {
  return (
    <div data-d={d} className={`absolute right-7 top-5 z-40 flex w-[330px] items-start gap-3 rounded-lg border border-sage/40 bg-cream p-4 shadow-[0_16px_36px_-8px_rgba(34,27,22,0.22)] ${HIDDEN}`}>
      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sage/15 text-sage-deep">{icon}</span>
      <span>
        <span className="block text-[13px] font-semibold">{title}</span>
        <span className="block text-[12px] text-taupe">{line}</span>
      </span>
    </div>
  );
}

function Bar({ value, tone = "brass", d }: { value: number; tone?: "brass" | "alert" | "sage" | "taupe"; d?: string }) {
  const fill = { brass: "bg-brass", alert: "bg-alert", sage: "bg-sage", taupe: "bg-taupe/60" }[tone];
  return (
    <span className="block h-2 w-full overflow-hidden rounded-full bg-parchment">
      <span data-d={d} className={`block h-full rounded-full ${fill}`} style={{ width: `${value}%` }} />
    </span>
  );
}

function Avatar({ initials, tone = "neutral" }: { initials: string; tone?: "neutral" | "brass" }) {
  return (
    <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-[13px] font-bold ${tone === "brass" ? "bg-brass/20 text-brass-deep" : "bg-parchment text-taupe"}`}>
      {initials}
    </span>
  );
}

/* ---------- Overview (hero) ---------- */

const ARRIVALS = [
  { initials: "EV", name: "Eleanor Vance & guest", room: "Suite 404 · Penthouse terrace", tag: "VIP", eta: "19:15" },
  { initials: "AP", name: "Dr Arthur Pendelton", room: "Room 218 · Deluxe king", tag: "Corporate", eta: "Arrived" },
  { initials: "SC", name: "Sophia & Marcus Chen", room: "Room 112 · Garden suite", tag: "Anniversary", eta: "20:00" },
];

const CHARGES = [
  { room: "Room 402", guest: "J. Vance", what: "Azure Bistro · Table 8", amount: "$409.82", time: "18:41" },
  { room: "Room 402", guest: "K. Reynolds", what: "Azure Bistro · Table 12", amount: "$184.50", time: "18:38" },
  { room: "Suite 501", guest: "L. Montrose", what: "Cellar Lounge · 2 cocktails", amount: "$62.00", time: "18:22" },
  { room: "Room 215", guest: "J. Martinez", what: "In-room dining · High tea", amount: "$95.00", time: "17:50" },
];

export function OverviewScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head
        label="Live · Evening service"
        title="Property pulse"
        right={
          <>
            <Btn>Walk-in booking</Btn>
            <Btn tone="brass">Open a tab</Btn>
          </>
        }
      />
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <Label>Room occupancy</Label>
            <Chip tone="brass">Tonight</Chip>
          </div>
          <p className="mt-2 text-[38px] font-semibold leading-none tracking-[-0.02em]">86%</p>
          <p className="mb-3 mt-2 text-[13px] text-taupe">43 of 50 rooms · 12 departing tomorrow</p>
          <Bar value={86} />
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <Label>Restaurant</Label>
            <Chip tone="sage">Dinner service</Chip>
          </div>
          <p className="mt-2 text-[38px] font-semibold leading-none tracking-[-0.02em]">
            18 <span className="text-[16px] font-semibold tracking-normal">tables seated</span>
          </p>
          <p className="mb-3 mt-2 text-[13px] text-taupe">$4,250 billed so far tonight</p>
          <span className="flex gap-1.5">
            {[1, 1, 1, 1, 0.5, 0].map((v, i) => (
              <span key={i} className={`h-2 flex-1 rounded-sm ${v === 1 ? "bg-brass" : v ? "bg-brass/40" : "bg-parchment"}`} />
            ))}
          </span>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <Label>Kitchen</Label>
            <Chip tone="alert">Needs attention</Chip>
          </div>
          <p className="mt-2 text-[38px] font-semibold leading-none tracking-[-0.02em]">
            2 <span className="text-[16px] font-semibold tracking-normal">items low</span>
          </p>
          <p className="mt-2 text-[13px] text-taupe">Wagyu ribeye and cultured butter are below their reorder level</p>
        </Card>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-5">
        <Card className="p-5">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-[17px] font-semibold">Arrivals tonight</h4>
            <Chip>8 expected</Chip>
          </div>
          {ARRIVALS.map((a) => (
            <div key={a.name} className="flex items-center gap-3 border-t border-line-soft py-3">
              <Avatar initials={a.initials} tone={a.tag === "VIP" ? "brass" : "neutral"} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-semibold">
                  {a.name} <Chip tone={a.tag === "VIP" ? "brass" : "neutral"}>{a.tag}</Chip>
                </p>
                <p className="text-[13px] text-taupe">{a.room}</p>
              </div>
              <span className="flex items-center gap-1 text-[12px] text-taupe">
                <Clock size={13} /> {a.eta}
              </span>
            </div>
          ))}
        </Card>
        <Card className="overflow-hidden p-5">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-[17px] font-semibold">Restaurant bills sent to rooms</h4>
            <Receipt size={18} className="text-brass-deep" />
          </div>
          {CHARGES.map((c, i) => (
            <div key={c.what} data-d={i === 0 ? "ov-new" : undefined} className="flex items-center justify-between gap-3 border-t border-line-soft py-2.5">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold">
                  {c.room} <span className="font-normal text-taupe">({c.guest})</span>
                </p>
                <p className="truncate text-[12px] text-taupe">
                  {c.what} · {c.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-semibold tabular-nums">{c.amount}</p>
                <p className="flex items-center justify-end gap-1 text-[11px] font-semibold text-sage-deep">
                  <Check size={12} /> On folio
                </p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ---------- 1. Front desk: check-in with a QR handover ---------- */

// A fixed pattern that looks like a QR code. Seeded, so the server and the browser draw the same one.
const QR_SIZE = 25;
const QR_CELLS: [number, number][] = (() => {
  let seed = 7;
  const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const finder = (r: number, c: number) => {
    for (const [fr, fc] of [[0, 0], [0, QR_SIZE - 7], [QR_SIZE - 7, 0]]) {
      const y = r - fr;
      const x = c - fc;
      if (y >= 0 && y < 7 && x >= 0 && x < 7) return { inside: true, on: y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4) };
    }
    const nearFinder = (r < 8 && c < 8) || (r < 8 && c >= QR_SIZE - 8) || (r >= QR_SIZE - 8 && c < 8);
    return { inside: nearFinder, on: false };
  };
  const cells: [number, number][] = [];
  for (let r = 0; r < QR_SIZE; r++)
    for (let c = 0; c < QR_SIZE; c++) {
      const f = finder(r, c);
      if (f.inside ? f.on : random() > 0.52) cells.push([r, c]);
    }
  return cells;
})();

function QrCode() {
  return (
    <svg viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`} width="150" height="150" className="rounded-md bg-white p-1">
      {QR_CELLS.map(([r, c]) => (
        <rect key={`${r}-${c}`} data-qr="" x={c} y={r} width="1" height="1" fill="#221b16" />
      ))}
    </svg>
  );
}

const DESK_ROWS = [
  { initials: "EV", name: "Eleanor Vance & guest", room: "Suite 404 · 3 nights", tag: "VIP", eta: "19:15", d: "fd" },
  { initials: "SC", name: "Sophia & Marcus Chen", room: "Room 112 · 2 nights", tag: "Anniversary", eta: "20:00" },
  { initials: "PR", name: "Priya Raman", room: "Room 305 · 1 night", tag: "Direct", eta: "20:30" },
  { initials: "TO", name: "Tomás Ortega", room: "Room 221 · 4 nights", tag: "Booking.com", eta: "21:10" },
];

export function FrontDeskScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head
        label="Front desk"
        title="Arrivals today"
        right={
          <Card className="flex items-center gap-4 px-4 py-2">
            <span>
              <Label>Occupancy</Label>
              <span data-d="fd-occ" className="block text-[20px] font-semibold tabular-nums">86%</span>
            </span>
            <span className="w-28">
              <Bar value={86} d="fd-occ-bar" />
            </span>
          </Card>
        }
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1.25fr_1fr] gap-5">
        <Card className="p-5">
          <div className="mb-1 flex items-center justify-between">
            <h4 className="text-[17px] font-semibold">Expected tonight</h4>
            <Chip>4 of 8 still to arrive</Chip>
          </div>
          {DESK_ROWS.map((row) => (
            <div key={row.name} data-d={row.d ? "fd-row" : undefined} className="relative flex items-center gap-3 rounded-md border-t border-line-soft px-1 py-4">
              <Avatar initials={row.initials} tone={row.tag === "VIP" ? "brass" : "neutral"} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-semibold">
                  {row.name} <Chip tone={row.tag === "VIP" ? "brass" : "neutral"}>{row.tag}</Chip>
                </p>
                <p className="flex items-center gap-1 text-[13px] text-taupe">
                  {row.room} · <Clock size={12} /> {row.eta}
                </p>
              </div>
              {row.d ? (
                <span className="relative">
                  <Btn tone="brass" d="fd-checkin">Check in</Btn>
                  <Chip tone="sage" d="fd-done" className={`absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1.5 text-[12px] ${HIDDEN}`}>
                    <Check size={13} /> Checked in
                  </Chip>
                </span>
              ) : (
                <Btn>Check in</Btn>
              )}
            </div>
          ))}
        </Card>

        <div className="relative">
          <Card className="h-full p-5">
            <h4 className="text-[17px] font-semibold">Tonight at the hotel</h4>
            <div className="mt-4 space-y-3">
              <div className="rounded-md bg-parchment/60 p-4">
                <Label>Harbor View Suite · 19:00</Label>
                <p className="mt-1 font-semibold">Corporate gala dinner</p>
                <p className="text-[13px] text-taupe">65 guests · Northstar Capital</p>
              </div>
              <div className="rounded-md bg-parchment/60 p-4">
                <Label>Housekeeping</Label>
                <p className="mt-1 font-semibold">42 rooms ready</p>
                <p className="text-[13px] text-taupe">6 being cleaned · 2 on hold</p>
              </div>
              <div className="rounded-md bg-parchment/60 p-4">
                <Label>Restaurant</Label>
                <p className="mt-1 font-semibold">6 tables booked at 20:00</p>
                <p className="text-[13px] text-taupe">2 for hotel guests</p>
              </div>
            </div>
          </Card>

          <Card d="fd-panel" className={`absolute inset-0 border-brass/60 p-5 shadow-[0_16px_36px_-8px_rgba(34,27,22,0.18)] ${HIDDEN}`}>
            <Label>Checking in · Suite 404</Label>
            <p className="mt-1 text-[18px] font-semibold">Eleanor Vance & guest</p>
            <p className="text-[13px] text-taupe">Thu 4 – Sun 7 Oct · 3 nights · paid direct</p>
            <div className="mt-4 flex items-center gap-3 rounded-md bg-parchment/60 p-3">
              <IdCard size={20} className="text-taupe" />
              <span className="flex-1 text-[13px] font-semibold">Passport checked at the desk</span>
              <span data-d="fd-id" className={`flex h-6 w-6 items-center justify-center rounded-full bg-sage text-white ${HIDDEN}`}>
                <Check size={14} strokeWidth={3} />
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span data-d="fd-qr">
                <QrCode />
              </span>
              <div>
                <p className="font-semibold">Scan to open your stay</p>
                <p className="mt-1 text-[12px] text-taupe">Single-use code for this check-in. Opens in the phone&apos;s browser, no app needed.</p>
                <p className="mt-2 flex items-center gap-1 text-[12px] text-taupe">
                  <KeyRound size={13} /> Wallet key or key card
                </p>
              </div>
            </div>
            <Chip tone="sage" d="fd-phone" className={`mt-4 px-3 py-1.5 text-[12px] ${HIDDEN}`}>
              <Smartphone size={13} /> Stay opened on the guest&apos;s phone
            </Chip>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Rooms: the tape chart and a folio ---------- */

export const DAY_W = 76;
const DAYS = [
  ["Wed", "3"],
  ["Thu", "4"],
  ["Fri", "5"],
  ["Sat", "6"],
  ["Sun", "7"],
  ["Mon", "8"],
  ["Tue", "9"],
];

type Stay = { from: number; nights: number; who: string; note: string; look: string; d?: string };
const ROOMS: { name: string; type: string; status: string; tone: Tone; stay?: Stay }[] = [
  { name: "Suite 101", type: "Presidential villa", status: "Inspected", tone: "brass", stay: { from: 1, nights: 3, who: "Alexander Wright", note: "VIP · in house", look: "bg-sage-deep text-white", d: "rm-bar" } },
  { name: "Suite 102", type: "Royal terrace", status: "Clean", tone: "sage", stay: { from: 1, nights: 2, who: "Elena Rostova", note: "Arrives 15:00", look: "bg-brass text-espresso" } },
  { name: "Suite 104", type: "Penthouse", status: "Occupied", tone: "neutral", stay: { from: 0, nights: 6, who: "Hélène de Valois", note: "In house", look: "bg-sage/20 text-sage-deep" } },
  { name: "Room 201", type: "Deluxe ocean king", status: "Turnover", tone: "neutral", stay: { from: 1, nights: 1, who: "On hold", note: "Air-con repair", look: "bg-rust/15 text-rust" } },
  { name: "Room 202", type: "Deluxe ocean king", status: "Inspected", tone: "brass", stay: { from: 2, nights: 4, who: "Marcus Sterling", note: "Late arrival 21:00", look: "bg-parchment text-espresso" } },
  { name: "Villa 01", type: "Private beach", status: "Inspected", tone: "brass", stay: { from: 3, nights: 4, who: "Lord Harrington", note: "Booked direct", look: "bg-cream border border-line text-espresso" } },
];

export function RoomsScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head
        label="Rooms"
        title="This week"
        right={
          <>
            <Chip tone="brass" className="px-3 py-1.5 text-[12px]">Occupancy 94%</Chip>
            <Chip className="px-3 py-1.5 text-[12px]">11 arrivals</Chip>
            <Chip tone="sage" className="px-3 py-1.5 text-[12px]">42 clean</Chip>
          </>
        }
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_330px] gap-5">
        <Card className="p-4">
          <div className="flex">
            <div className="w-[150px] flex-none" />
            {DAYS.map(([day, date], i) => (
              <div key={date} className={`mx-0.5 flex-none rounded-md py-1.5 text-center ${i === 1 ? "bg-brass/15 text-brass-deep" : "bg-parchment/60 text-taupe"}`} style={{ width: DAY_W - 4 }}>
                <span className="block text-[11px] font-semibold uppercase">{day}</span>
                <span className="block text-[16px] font-semibold">{date}</span>
              </div>
            ))}
          </div>
          {ROOMS.map((room) => (
            <div key={room.name} className="mt-1.5 flex items-center">
              <div className="w-[150px] flex-none pr-2">
                <p className="text-[13px] font-semibold">{room.name}</p>
                <p className="truncate text-[11px] text-taupe">{room.type}</p>
              </div>
              <div className="relative h-[62px] flex-1 rounded-md bg-parchment/40">
                {room.stay ? (
                  <span
                    data-d={room.stay.d}
                    className={`absolute top-1.5 flex h-[50px] flex-col justify-center overflow-hidden rounded-md px-3 ${room.stay.look}`}
                    style={{ left: room.stay.from * DAY_W + 3, width: room.stay.nights * DAY_W - 6 }}
                  >
                    <span className="truncate text-[12px] font-semibold">{room.stay.who}</span>
                    <span className="truncate text-[11px] opacity-80">{room.stay.note}</span>
                    {room.stay.d ? <span className="absolute bottom-2 right-1 top-2 w-1 rounded-full bg-white/60" /> : null}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </Card>

        <Card className="relative flex flex-col p-5">
          <Label>Selected · Suite 101</Label>
          <div className="mt-2 flex items-center gap-3">
            <Avatar initials="AW" tone="brass" />
            <div>
              <p className="flex items-center gap-2 font-semibold">
                Alexander Wright <Chip tone="brass">VIP</Chip>
              </p>
              <p className="text-[12px] text-taupe">8 previous stays · prefers a high floor</p>
            </div>
          </div>
          <div data-d="rm-dates-box" className="mt-4 rounded-md bg-parchment/60 p-3">
            <Label>Stay</Label>
            <p data-d="rm-dates" className="font-semibold">Thu 4 – Sun 7 Oct · 3 nights</p>
          </div>
          <div className="mt-3 space-y-1.5 text-[13px]">
            <p className="flex justify-between">
              <span data-d="rm-nights">Room, 3 nights × $474</span>
              <span data-d="rm-room" className="tabular-nums">$1,422.00</span>
            </p>
            <p className="flex justify-between"><span>Azure Bistro dinner</span><span className="tabular-nums">$340.00</span></p>
            <p className="flex justify-between"><span>Cellar wine selection</span><span className="tabular-nums">$184.00</span></p>
            <p className="flex justify-between"><span>Airport transfer</span><span className="tabular-nums">$120.00</span></p>
          </div>
          <p data-d="rm-total-box" className="mt-3 flex items-baseline justify-between rounded-md border-t border-line pt-3">
            <span className="font-semibold">Folio total</span>
            <span data-d="rm-total" className="text-[22px] font-semibold tabular-nums">$2,066.00</span>
          </p>
          <div data-d="rm-key" className="mt-3 flex items-center gap-3 rounded-md bg-parchment/60 p-3">
            <KeyRound size={18} className="text-brass-deep" />
            <span className="text-[13px]">
              <span className="block font-semibold">Wallet room key</span>
              <span data-d="rm-key-text" className="block text-taupe">Works until Sun 7 Oct, 11:00</span>
            </span>
          </div>
          <Btn tone="dark" className="mt-auto w-full">Print folio</Btn>
        </Card>
      </div>
      <Toast d="rm-toast" icon={<KeyRound size={16} />} title="Stay extended to Mon 8 Oct" line="Folio and room key updated automatically" />
    </div>
  );
}

/* ---------- 3. Restaurant: floor plan, ticket, charge to room ---------- */

type Table = { id: string; state: string; tone: Tone; time?: string; note: string; amount?: string; d?: string };
const TABLES: Table[] = [
  { id: "T-01", state: "2/2 seated", tone: "brass", time: "28 min", note: "Server M.K.", amount: "$84.00" },
  { id: "T-02", state: "Free", tone: "neutral", note: "Booth · ready" },
  { id: "T-03", state: "Bill asked", tone: "sage", time: "1 h 22", note: "Server D.V.", amount: "$312.00" },
  { id: "T-04", state: "6/6 seated", tone: "brass", time: "55 min", note: "Chef's table", amount: "$480.00" },
  { id: "T-05", state: "Booked", tone: "neutral", time: "19:30", note: "Party: Aris" },
  { id: "T-06", state: "2/2 seated", tone: "brass", time: "18 min", note: "Terrace view", amount: "$62.00" },
  { id: "T-07", state: "4/4 seated", tone: "brass", time: "34 min", note: "Server Sarah L.", amount: "$195.00" },
  { id: "T-08", state: "4/4 seated", tone: "brass", time: "42 min", note: "Room 402", amount: "$409.82", d: "rs-t8" },
  { id: "T-09", state: "Paid", tone: "sage", note: "Clearing", amount: "$122.50" },
  { id: "T-10", state: "4/4 seated", tone: "brass", time: "50 min", note: "Server Sarah L.", amount: "$178.00" },
  { id: "T-11", state: "Free", tone: "neutral", note: "Window pair" },
  { id: "T-12", state: "5/6 seated", tone: "brass", time: "1 h 05", note: "Banquette", amount: "$540.00" },
];

const ITEMS = [
  ["2× Wagyu beef carpaccio", "Seats 1 and 2", "$48.00"],
  ["Pan-seared sea bass", "Seat 3 · gluten free", "$52.00"],
  ["45-day dry-aged ribeye", "Seat 4 · medium rare", "$65.00"],
  ["2018 Barolo, bottle", "Decanted at the table", "$135.00"],
  ["2× Sparkling water", "", "$18.00"],
];

export function RestaurantScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head
        label="Restaurant · Azure Bistro"
        title="Main dining room"
        right={
          <>
            <Chip className="px-3 py-1.5 text-[12px]">18 of 32 seated</Chip>
            <Chip tone="brass" className="px-3 py-1.5 text-[12px]">Tonight $4,280</Chip>
          </>
        }
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_400px] gap-5">
        <div className="grid grid-cols-4 grid-rows-3 gap-3">
          {TABLES.map((t) => (
            <div
              key={t.id}
              data-d={t.d}
              className={`relative flex flex-col justify-between rounded-lg border p-3 ${t.state === "Free" || t.state === "Booked" ? "border-line bg-cream/50" : "border-line bg-cream"}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[17px] font-semibold">{t.id}</span>
                <Chip tone={t.tone} d={t.d ? "rs-t8-state" : undefined}>{t.state}</Chip>
              </div>
              <p className="flex items-center gap-1 text-[12px] text-taupe">
                {t.time ? <Clock size={12} /> : null}
                {t.time ?? ""}
              </p>
              <div className="flex items-baseline justify-between border-t border-line-soft pt-1.5">
                <span className={`text-[12px] ${t.d ? "font-semibold text-brass-deep" : "text-taupe"}`}>{t.note}</span>
                <span className="text-[14px] font-semibold tabular-nums">{t.amount ?? ""}</span>
              </div>
            </div>
          ))}
        </div>

        <Card className="relative overflow-hidden">
          <div data-d="rs-empty" className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-taupe">
            <Receipt size={28} />
            <p className="font-semibold">Pick a table to open its bill</p>
          </div>
          <div data-d="rs-ticket" className={`absolute inset-0 flex flex-col p-5 ${HIDDEN}`}>
            <div className="flex items-center justify-between">
              <p className="text-[17px] font-semibold">Table 8 · Main room</p>
              <Chip tone="dark">Open</Chip>
            </div>
            <p className="text-[12px] text-taupe">Sarah L. · 4 guests · 42 min</p>
            <div data-d="rs-guest" className="mt-3 flex items-center gap-3 rounded-md border border-brass/40 bg-brass/10 p-3">
              <Avatar initials="JV" tone="brass" />
              <div className="flex-1">
                <p className="text-[13px] font-semibold">Julian Vance · hotel guest</p>
                <p className="text-[12px] text-taupe">Room 402 · checks out Sun 12:00</p>
              </div>
              <BadgeCheck size={18} className="text-brass-deep" />
            </div>
            <div className="mt-2 flex-1">
              {ITEMS.map(([name, note, price]) => (
                <div key={name} className="flex justify-between border-b border-line-soft py-1.5 text-[13px]">
                  <span>
                    <span className="block font-semibold">{name}</span>
                    {note ? <span className="block text-[11px] text-taupe">{note}</span> : null}
                  </span>
                  <span className="font-semibold tabular-nums">{price}</span>
                </div>
              ))}
            </div>
            <div className="space-y-0.5 text-[12px] text-taupe">
              <p className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">$318.00</span></p>
              <p className="flex justify-between"><span>Tax 8.875% · service 20%</span><span className="tabular-nums">$91.82</span></p>
            </div>
            <p className="mt-1 flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-[24px] font-semibold tabular-nums">$409.82</span>
            </p>
            <span className="relative mt-2 block">
              <Btn tone="dark" d="rs-charge" className="h-12 w-full text-[14px]">
                <KeyRound size={16} /> Charge to Room 402
              </Btn>
              <span data-d="rs-posted" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[14px] font-semibold text-white ${HIDDEN}`}>
                <Check size={16} strokeWidth={3} /> Added to Room 402 folio
              </span>
            </span>
          </div>
        </Card>
      </div>
      <Toast d="rs-toast" icon={<Receipt size={16} />} title="Room 402 · Julian Vance" line="$409.82 from Azure Bistro added to the folio" />
    </div>
  );
}

/* ---------- 4. Kitchen: stock deducted per sale, 86, reorder ---------- */

const STOCK = [
  { name: "A5 Wagyu ribeye", where: "Butchery · cold room", qty: "0.6 kg", par: "Reorder at 2.0 kg", fill: 15, tone: "alert" as const, dish: "Charcoal-grilled Wagyu", cost: "$148.00 / kg", d: "kt" },
  { name: "Black truffle oil", where: "Pantry", qty: "8.0 L", par: "Reorder at 4.0 L", fill: 80, tone: "taupe" as const, dish: "Tagliolini al tartufo", cost: "$84.00 / L" },
  { name: "70% dark chocolate", where: "Pastry", qty: "4.5 kg", par: "10 kg on the way", fill: 45, tone: "brass" as const, dish: "Chocolate soufflé", cost: "$36.50 / kg" },
  { name: "Cultured butter", where: "Dairy", qty: "1.8 kg", par: "Reorder at 2.5 kg", fill: 28, tone: "alert" as const, dish: "House brioche", cost: "$14.20 / kg" },
];

export function KitchenScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Kitchen · Central kitchen" title="Stock and recipe costs" right={<Btn tone="brass"><Truck size={16} /> Receive delivery</Btn>} />
      <div className="grid grid-cols-4 gap-4">
        {[
          ["Stock value", "$64,280", ""],
          ["Food cost", "28.4%", "Target 30%"],
          ["Orders on the way", "2", "Due 14:30 and 16:00"],
        ].map(([label, value, note]) => (
          <Card key={label} className="p-4">
            <Label>{label}</Label>
            <p className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">{value}</p>
            <p className="text-[12px] text-taupe">{note}</p>
          </Card>
        ))}
        <Card className="p-4">
          <Label>Dishes off the menu</Label>
          <p data-d="kt-off" className="mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]">0</p>
          <p className="text-[12px] text-taupe">Taken off automatically</p>
        </Card>
      </div>
      <Card className="min-h-0 flex-1 overflow-hidden">
        <div className="grid grid-cols-[1.5fr_0.8fr_1.3fr_1.5fr_150px] gap-4 border-b border-line bg-parchment/50 px-5 py-2.5">
          {["Ingredient", "On hand", "Reorder level", "Used in", ""].map((h) => (
            <Label key={h}>{h}</Label>
          ))}
        </div>
        {STOCK.map((s) => (
          <div key={s.name} data-d={s.d ? "kt-row" : undefined} className="grid grid-cols-[1.5fr_0.8fr_1.3fr_1.5fr_150px] items-center gap-4 border-b border-line-soft px-5 py-3.5">
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-[12px] text-taupe">{s.where} · {s.cost}</p>
            </div>
            <p className="flex items-center gap-2">
              <span data-d={s.d ? "kt-qty" : undefined} className={`text-[18px] font-semibold tabular-nums ${s.tone === "alert" ? "text-alert" : ""}`}>{s.qty}</span>
            </p>
            <div>
              <Bar value={s.fill} tone={s.tone} d={s.d ? "kt-bar" : undefined} />
              <p className="mt-1 text-[11px] text-taupe">{s.par}</p>
            </div>
            <div>
              <span data-d={s.d ? "kt-dish" : undefined} className="inline-block rounded bg-parchment px-2 py-1 text-[12px] font-semibold">{s.dish}</span>
              {s.d ? <p data-d="kt-86" className={`mt-1 text-[11px] font-semibold text-alert ${HIDDEN}`}>Off every menu and waiter tablet</p> : null}
            </div>
            <div className="relative text-right">
              {s.d ? (
                <>
                  <Btn tone="brass" d="kt-order">Draft order</Btn>
                  <span data-d="kt-sent" className={`absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-lg bg-sage px-3 py-2 text-[12px] font-semibold text-white ${HIDDEN}`}>
                    <Check size={14} strokeWidth={3} /> Order sent
                  </span>
                </>
              ) : (
                <Btn>{s.tone === "brass" ? "Track" : "Count"}</Btn>
              )}
            </div>
          </div>
        ))}
      </Card>
      <Toast d="kt-toast" icon={<Receipt size={16} />} title="New order · Table 12" line="2× Charcoal-grilled Wagyu, 300 g each" />
      <Toast d="kt-toast2" icon={<Truck size={16} />} title="Order PO-412 sent" line="4 kg Wagyu from Miyazaki Imports, due in 48 hours" />
    </div>
  );
}

/* ---------- 5. Housekeeping: checkout to clean room ---------- */

type Room = { n: string; s: string; tone: Tone; d?: string };
const BOARD: Room[] = [
  { n: "101", s: "Occupied", tone: "neutral" },
  { n: "102", s: "Ready", tone: "sage" },
  { n: "104", s: "Occupied", tone: "neutral" },
  { n: "112", s: "Ready", tone: "sage" },
  { n: "201", s: "On hold", tone: "rust" },
  { n: "202", s: "Ready", tone: "sage" },
  { n: "204", s: "Cleaning", tone: "brass" },
  { n: "218", s: "Occupied", tone: "neutral", d: "hk" },
  { n: "215", s: "Occupied", tone: "neutral" },
  { n: "221", s: "Ready", tone: "sage" },
  { n: "305", s: "Cleaning", tone: "brass" },
  { n: "306", s: "Ready", tone: "sage" },
  { n: "402", s: "Occupied", tone: "neutral" },
  { n: "404", s: "Ready", tone: "sage" },
  { n: "501", s: "Occupied", tone: "neutral" },
  { n: "502", s: "Ready", tone: "sage" },
];

export function HousekeepingScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head
        label="Housekeeping"
        title="Room status"
        right={
          <>
            <Chip tone="sage" className="px-3 py-1.5 text-[12px]">42 ready</Chip>
            <Chip tone="brass" className="px-3 py-1.5 text-[12px]">6 cleaning</Chip>
            <Chip tone="rust" className="px-3 py-1.5 text-[12px]">2 on hold</Chip>
          </>
        }
      />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_300px] gap-6">
        <div className="grid grid-cols-4 grid-rows-4 gap-3">
          {BOARD.map((room) => (
            <div key={room.n} data-d={room.d ? "hk-tile" : undefined} className="relative flex flex-col justify-between rounded-lg border border-line bg-cream p-3">
              <span className="text-[20px] font-semibold">{room.n}</span>
              {room.d ? (
                <span className="relative h-6">
                  <Chip tone="neutral" d="hk-s0" className="absolute left-0 top-0">Occupied</Chip>
                  <Chip tone="rust" d="hk-s1" className={`absolute left-0 top-0 ${HIDDEN}`}>Needs cleaning</Chip>
                  <Chip tone="sage" d="hk-s2" className={`absolute left-0 top-0 ${HIDDEN}`}><Check size={12} /> Ready</Chip>
                </span>
              ) : (
                <span className="h-6"><Chip tone={room.tone}>{room.s}</Chip></span>
              )}
            </div>
          ))}
        </div>

        {/* The housekeeper's phone */}
        <div className="flex justify-center">
          <div className="relative h-full w-[268px] rounded-[34px] border-[7px] border-espresso bg-linen p-4 shadow-[0_20px_40px_-12px_rgba(34,27,22,0.35)]">
            <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-espresso/80" />
            <p className="text-[12px] text-taupe">Hi Nimali</p>
            <p className="text-[17px] font-semibold">Your jobs</p>
            <div className="mt-3 space-y-2.5">
              <div data-d="hk-job" className={`rounded-lg border border-brass/60 bg-cream p-3 shadow-[0_8px_20px_-6px_rgba(34,27,22,0.18)] ${HIDDEN}`}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Room 218</p>
                  <Chip tone="brass">Just now</Chip>
                </div>
                <p className="text-[12px] text-taupe">Departure clean · guest checked out</p>
                <div data-d="hk-checks" className={`mt-2 space-y-1 text-[12px] ${HIDDEN}`}>
                  <p className="flex items-center gap-1.5"><Check size={13} className="text-sage-deep" /> Linen changed</p>
                  <p className="flex items-center gap-1.5"><Check size={13} className="text-sage-deep" /> Minibar and amenities restocked</p>
                </div>
                <span className="relative mt-2 block">
                  <Btn tone="dark" d="hk-done" className="w-full">Mark as clean</Btn>
                  <span data-d="hk-donechip" className={`absolute inset-0 flex items-center justify-center gap-1 rounded-lg bg-sage text-[13px] font-semibold text-white ${HIDDEN}`}>
                    <Check size={14} strokeWidth={3} /> Done
                  </span>
                </span>
              </div>
              <div className="rounded-lg border border-line bg-cream p-3">
                <p className="font-semibold">Room 305</p>
                <p className="text-[12px] text-taupe">Turndown · 19:30</p>
              </div>
              <div className="rounded-lg border border-line bg-cream/60 p-3 text-taupe">
                <p className="flex items-center gap-1.5 font-semibold"><Check size={13} className="text-sage-deep" /> Room 112</p>
                <p className="text-[12px]">Stayover tidy · done 16:05</p>
              </div>
            </div>
            <p className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-1 text-[11px] text-taupe">
              <Wifi size={12} /> Hotel Wi-Fi · clocked in 14:00
            </p>
          </div>
        </div>
      </div>
      <Toast d="hk-toast" icon={<KeyRound size={16} />} title="Room 218 checked out" line="Folio settled · room key cancelled" />
    </div>
  );
}
