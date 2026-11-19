import { BedDouble, CalendarCheck, Check, ChefHat, Globe, MapPin, Mic, PenLine, Receipt, TrendingUp, Users, UtensilsCrossed } from "lucide-react";
import { Avatar, Btn, Card, Chip, DAYS, Head, HIDDEN, Label, Toast } from "./screens";
import { asset } from "@/lib/constants";
import { CHANNEL, CHANNEL_IDS, ChannelChip, ChannelLogo, type ChannelId } from "@/components/brands";

// Hotel group screens for the module explorer. Same rules as screens.tsx: sample data only,
// data-d names for what a demo changes, HIDDEN for what a demo reveals.


/* ---------- Booking engine: a direct booking on the hotel's own site ---------- */

const OFFERS = [
  { name: "Deluxe king", line: "Sea view · 32 m² · breakfast included", price: "$289", d: "bk-room", left: "2 left", photo: "deluxe-king" },
  { name: "Junior suite", line: "Terrace · 48 m² · breakfast included", price: "$410", left: "4 left", photo: "junior-suite" },
  { name: "Garden suite", line: "Private garden · 60 m²", price: "$520", left: "1 left", photo: "garden-suite" },
];

export function BookingScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Booking engine" title="Direct bookings" right={<Chip tone="sage" className="px-3 py-1.5 text-[12px]">Live on your website</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_360px] gap-5">
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-line bg-parchment/60 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 flex flex-1 items-center gap-2 rounded-full bg-linen px-3 py-1 text-[12px] text-taupe">
              <Globe size={12} /> Your hotel website · Book a stay
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-brass-deep">The Grand Azure</p>
            <p className="text-[24px] font-semibold tracking-[-0.01em]">Book direct for our best rate</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[13px]">
              <span className="rounded-md border border-line px-3 py-2"><Label>Check in</Label>Thu 4 Oct</span>
              <span className="rounded-md border border-line px-3 py-2"><Label>Check out</Label>Sun 7 Oct</span>
              <span className="rounded-md border border-line px-3 py-2"><Label>Guests</Label>2 adults</span>
            </div>
            <div className="mt-3 space-y-2">
              {OFFERS.map((o) => (
                <div key={o.name} data-d={o.d} className="relative flex items-center gap-4 rounded-lg border border-line bg-linen/60 px-4 py-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(`/demo/${o.photo}.webp`)} alt="" width={128} height={96} loading="lazy" className="h-12 w-16 flex-none rounded-md object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{o.name}</span>
                    <span className="block text-[12px] text-taupe">{o.line}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[18px] font-semibold tabular-nums">{o.price}</span>
                    <span data-d={o.d ? "bk-site-left" : undefined} className="block text-[11px] font-semibold text-rust">{o.left}</span>
                  </span>
                  {o.d ? (
                    <span data-d="bk-tick" className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brass text-espresso ${HIDDEN}`}>
                      <Check size={14} strokeWidth={3} />
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <span className="relative mt-auto block">
              <Btn tone="dark" d="bk-book" className="h-12 w-full text-[14px]">Book now · 3 nights · $867</Btn>
              <span data-d="bk-done" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[14px] font-semibold text-white ${HIDDEN}`}>
                <Check size={16} strokeWidth={3} /> Booked · confirmation sent to Daniel
              </span>
            </span>
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <Card d="bk-stats" className="p-5">
            <Label>October, booked direct</Label>
            <p className="mt-1 flex items-baseline gap-2">
              <span data-d="bk-count" className="text-[38px] font-semibold leading-none tracking-[-0.02em]">64</span>
              <span className="text-taupe">bookings</span>
            </p>
            <div className="mt-4 space-y-2 text-[13px]">
              <p className="flex justify-between border-t border-line-soft pt-2"><span>Commission paid</span><span className="font-semibold">$0</span></p>
              <p className="flex justify-between border-t border-line-soft pt-2">
                <span>Saved against OTA fees</span>
                <span data-d="bk-saved" className="font-semibold tabular-nums text-sage-deep">$4,180</span>
              </p>
            </div>
          </Card>
          <Card d="bk-avail" className="flex-1 p-5">
            <Label>Deluxe king · Thu 4 Oct</Label>
            <p className="mt-1 flex items-baseline gap-2">
              <span data-d="bk-left" className="text-[38px] font-semibold leading-none tracking-[-0.02em]">2</span>
              <span className="text-taupe">rooms left</span>
            </p>
            <div className="mt-4">
              {CHANNEL_IDS.map((c, i) => (
                <p key={c} className="flex items-center justify-between border-t border-line-soft py-1.5 text-[13px]">
                  <span className="flex items-center gap-2">
                    <ChannelLogo id={c} size={18} />
                    {CHANNEL[c].name}
                  </span>
                  <span data-d={`bk-c${i}`} className="font-semibold tabular-nums">2 left</span>
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- Channel manager: one rate everywhere, bookings in order ---------- */

const QUEUE_OLD: [ChannelId, string, string, string][] = [
  ["airbnb", "18:12:40", "Junior suite · Fri", "Confirmed · Room 410"],
  ["direct", "18:30:05", "Deluxe twin · Sun", "Confirmed · Room 302"],
];

// Share of this month's bookings by channel, for the bar under the table. Direct is animated by the demo.
const MIX: [ChannelId, number][] = [
  ["booking", 27],
  ["expedia", 14],
  ["agoda", 11],
  ["airbnb", 10],
];

function QueueRow({ d, source, time, what, children }: { d?: string; source: ChannelId; time: string; what: string; children: React.ReactNode }) {
  return (
    <div data-d={d} className={`relative border-t border-line-soft py-3 pl-3 ${d ? HIDDEN : ""}`}>
      <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full" style={{ background: CHANNEL[source].edge }} />
      <p className="flex items-center justify-between">
        <ChannelChip id={source} />
        <span className="text-[11px] tabular-nums text-taupe">{time}</span>
      </p>
      <p className="mt-1 text-[13px] font-semibold">{what}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function ChannelScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Channel manager" title="Rates and availability" right={<Chip tone="sage" className="px-3 py-1.5 text-[12px]">5 channels · all in step</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_360px] gap-5">
        <div className="flex flex-col gap-5">
          <Card d="ch-editor" className="flex items-center gap-4 p-5">
            <span className="flex-1">
              <Label>Deluxe king · Sat 6 Oct</Label>
              <span className="mt-1 block text-[13px] text-taupe">Change it once, every channel follows</span>
            </span>
            <span className="rounded-md border border-brass bg-linen px-4 py-2 text-[20px] font-semibold tabular-nums">
              <span data-d="ch-rate">$289</span>
            </span>
            <Btn tone="dark" d="ch-update">Update everywhere</Btn>
          </Card>
          <Card className="flex-1 p-5">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-taupe">
              <span>Channel</span><span>Rate</span><span>Rooms left</span><span>Status</span>
            </div>
            {CHANNEL_IDS.map((c, i) => (
              <div key={c} data-d={`ch-row${i}`} className="relative grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-3 rounded border-t border-line-soft py-2.5 pl-3">
                <span className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-full" style={{ background: CHANNEL[c].edge }} />
                <span className="flex items-center gap-2.5 font-semibold">
                  <ChannelLogo id={c} size={22} />
                  {CHANNEL[c].name}
                </span>
                <span data-d={`ch-r${i}`} className="text-[16px] font-semibold tabular-nums">$289</span>
                <span data-d={`ch-l${i}`} className="tabular-nums">1</span>
                <Chip tone="sage" className="w-fit"><Check size={11} strokeWidth={3} /> In step</Chip>
              </div>
            ))}
            <div className="mt-4 border-t border-line pt-4">
              <p className="flex justify-between text-[12px] font-semibold">
                <span data-d="ch-mix" className="text-sage-deep">Direct 38%</span>
                <span className="text-taupe">Through OTAs 62%</span>
              </p>
              <span className="mt-2 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
                <span data-d="ch-mixbar" className="block h-full flex-none bg-sage" style={{ width: "38%" }} />
                {MIX.map(([c, share]) => (
                  <span key={c} className="block h-full" style={{ flexGrow: share, background: c === "agoda" ? "linear-gradient(90deg,#e4312b,#f7941d,#f9c013,#6cb33f,#2b6cb5)" : CHANNEL[c].edge }} />
                ))}
              </span>
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-taupe">
                {MIX.map(([c, share]) => (
                  <span key={c} className="flex items-center gap-1.5">
                    <ChannelLogo id={c} size={13} />
                    {share}%
                  </span>
                ))}
              </p>
            </div>
          </Card>
        </div>
        <Card d="ch-queue" className="px-5 pt-5">
          <Label>Bookings, in the order they arrive</Label>
          {QUEUE_OLD.map(([source, time, what, state]) => (
            <QueueRow key={time} source={source} time={time} what={what}>
              <Chip tone="sage">{state}</Chip>
            </QueueRow>
          ))}
          <QueueRow d="ch-q1" source="expedia" time="18:41:02.114" what="Deluxe king · Sat · last room">
            <Chip tone="sage" d="ch-q1s" className={HIDDEN}>Confirmed · Room 305</Chip>
          </QueueRow>
          <QueueRow d="ch-q2" source="booking" time="18:41:02.380" what="Deluxe king · Sat">
            <Chip tone="rust" d="ch-q2s" className={HIDDEN}>Sold out · offered a junior suite</Chip>
          </QueueRow>
          <QueueRow d="ch-q3" source="direct" time="18:42:17.902" what="Junior suite · Sat">
            <Chip tone="sage">Confirmed · no commission</Chip>
          </QueueRow>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Revenue management: rates follow occupancy ---------- */

const WEEK = [
  { occ: 62, rate: "$249" },
  { occ: 71, rate: "$269" },
  { occ: 78, rate: "$289" },
  { occ: 74, rate: "$289", d: "sat" },
  { occ: 64, rate: "$269", d: "sun" },
  { occ: 48, rate: "$229" },
  { occ: 52, rate: "$229" },
];

export function RevenueScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Revenue management" title="Deluxe king · next 7 days" right={<Chip tone="brass" className="px-3 py-1.5 text-[12px]">Rule on · over 80%, raise 12%</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_340px] gap-5">
        <Card d="rv-chart" className="flex flex-col p-5">
          <div className="relative flex h-[300px] gap-3 border-b border-line">
            <span className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-dashed border-rust/60" style={{ bottom: "64%" }}>
              <span className="absolute -top-6 right-0 text-[11px] font-semibold text-rust">80%</span>
            </span>
            {WEEK.map((day, i) => (
              <div key={i} data-d={day.d ? `rv-${day.d}` : undefined} className="relative flex flex-1 flex-col justify-end rounded-t-md">
                <span data-d={day.d ? `rv-${day.d}-occ` : undefined} className="mb-1 text-center text-[13px] font-semibold tabular-nums">{day.occ}%</span>
                <span data-d={day.d ? `rv-${day.d}-fill` : undefined} className={`block rounded-t-md ${i === 4 ? "bg-brass/35" : "bg-brass"}`} style={{ height: `${day.occ * 0.8}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            {WEEK.map((day, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="text-[11px] font-semibold uppercase text-taupe">{DAYS[i][0]} {DAYS[i][1]}</p>
                <p data-d={day.d ? `rv-${day.d}-rate` : undefined} className="text-[17px] font-semibold tabular-nums">{day.rate}</p>
              </div>
            ))}
          </div>
          <div data-d="rv-pushed" className={`mt-auto flex flex-wrap items-center gap-2 rounded-md bg-sage/10 p-3 text-[12px] ${HIDDEN}`}>
            <span className="font-semibold text-sage-deep">New rates sent to</span>
            {CHANNEL_IDS.map((c) => (
              <ChannelChip key={c} id={c} />
            ))}
          </div>
        </Card>
        <Card d="rv-market" className="flex flex-col p-5">
          <Label>This weekend, nearby</Label>
          <div className="mt-2 space-y-0 text-[13px]">
            <p className="flex items-center gap-3 border-t border-line-soft py-3"><MapPin size={16} className="text-brass-deep" /><span className="flex-1">Hotels nearby, Saturday</span><span className="font-semibold">$331</span></p>
            <p className="flex items-center gap-3 border-t border-line-soft py-3"><Users size={16} className="text-brass-deep" /><span className="flex-1">City marathon</span><span className="font-semibold">Sun 7 Oct</span></p>
            <p className="flex items-center gap-3 border-t border-line-soft py-3"><TrendingUp size={16} className="text-brass-deep" /><span className="flex-1">Sunday bookings vs last year</span><span className="font-semibold">+18%</span></p>
          </div>
          <div className="mt-auto rounded-md border border-brass/50 bg-brass/10 p-4">
            <Label>Suggested</Label>
            <p className="mt-1 text-[17px] font-semibold">Raise Sunday to $305</p>
            <p className="text-[12px] text-taupe">Still $26 under the hotels nearby</p>
            <span className="relative mt-3 block">
              <Btn tone="dark" d="rv-apply" className="w-full">Apply</Btn>
              <span data-d="rv-applied" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[13px] font-semibold text-white ${HIDDEN}`}>
                <Check size={15} strokeWidth={3} /> Applied everywhere
              </span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Sales and banqueting: an event order signed ---------- */

const PIPE = [
  { name: "Enquiry", cards: [["Haddad family reunion", "40 guests · Sat 10 Nov"], ["Meridian team offsite", "60 guests · Thu 6 Dec"]] },
  { name: "Tentative", cards: [["Okafor & Lee wedding", "120 guests · Sat 13 Oct", "ev-card"], ["Founders' summit dinner", "200 guests · Sat 20 Oct"]] },
  { name: "Confirmed", cards: [["Harbour Rotary gala", "150 guests · Sat 6 Oct"]] },
];

const ORDER = [
  { d: "ev-s1", icon: <MapPin size={15} />, head: "Layout", line: "Grand ballroom · rounds of ten, dance floor" },
  { d: "ev-s2", icon: <Mic size={15} />, head: "AV", line: "Two microphones, projector, quartet stage" },
  { d: "ev-s3", icon: <UtensilsCrossed size={15} />, head: "Menu", line: "Three courses · 112 standard, 8 vegetarian" },
  { d: "ev-s4", icon: <Receipt size={15} />, head: "Billing", line: "30% deposit paid · balance on the night" },
];

export function EventsScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Sales and banqueting" title="Events" right={<Chip tone="brass" className="px-3 py-1.5 text-[12px]">October · 9 events</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_380px] gap-5">
        <div data-d="ev-pipe" className="grid grid-cols-3 gap-3">
          {PIPE.map((col, c) => (
            <div key={col.name} className="flex flex-col gap-2 rounded-lg bg-parchment/50 p-3">
              <p className="flex items-center justify-between px-1 pb-1">
                <span className="text-[13px] font-semibold">{col.name}</span>
                <span data-d={c === 1 ? "ev-tcount" : c === 2 ? "ev-ccount" : undefined} className="text-[12px] font-semibold text-taupe">{col.cards.length}</span>
              </p>
              {col.cards.map(([name, line, d]) => (
                <div key={name} data-d={d} className={`relative z-10 rounded-md border bg-cream p-3 ${d ? "border-brass/60" : "border-line"}`}>
                  <p className="text-[13px] font-semibold">{name}</p>
                  <p className="text-[12px] text-taupe">{line}</p>
                </div>
              ))}
              {c === 2 ? <div data-d="ev-slot" className="h-[62px] rounded-md border-2 border-dashed border-transparent" /> : null}
            </div>
          ))}
        </div>
        <Card className="relative overflow-hidden">
          <div data-d="ev-empty" className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-10 text-center text-taupe">
            <CalendarCheck size={28} />
            <p className="font-semibold">Pick an event to open its event order</p>
          </div>
          <div data-d="ev-order" className={`absolute inset-0 flex flex-col p-5 ${HIDDEN}`}>
            <Label>Event order</Label>
            <p className="mt-1 flex items-center gap-3">
              <Avatar initials="OL" tone="brass" />
              <span>
                <span className="block font-semibold">Okafor & Lee wedding</span>
                <span className="block text-[12px] text-taupe">Sat 13 Oct · 120 guests</span>
              </span>
            </p>
            <div className="mt-3">
              {ORDER.map((s) => (
                <div key={s.d} data-d={s.d} className="flex gap-3 rounded border-t border-line-soft px-1 py-2.5">
                  <span className="mt-0.5 text-brass-deep">{s.icon}</span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-taupe">{s.head}</span>
                    <span className="block text-[13px] font-semibold">{s.line}</span>
                  </span>
                </div>
              ))}
            </div>
            <div data-d="ev-fx" className={`mt-1 space-y-1.5 rounded-md bg-sage/10 p-3 text-[12px] font-semibold text-sage-deep ${HIDDEN}`}>
              <p data-d="ev-f1" className="flex items-center gap-2"><BedDouble size={14} /> 18 rooms blocked, Fri 12 – Sun 14</p>
              <p data-d="ev-f2" className="flex items-center gap-2"><MapPin size={14} /> Ballroom and terrace held</p>
              <p data-d="ev-f3" className="flex items-center gap-2"><ChefHat size={14} /> Ingredients ordered for 120 covers</p>
            </div>
            <span className="relative mt-auto block">
              <Btn tone="dark" d="ev-sign" className="h-12 w-full text-[14px]"><PenLine size={16} /> Record signature</Btn>
              <span data-d="ev-signed" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[14px] font-semibold text-white ${HIDDEN}`}>
                <Check size={16} strokeWidth={3} /> Signed by A. Okafor · confirmed
              </span>
            </span>
          </div>
        </Card>
      </div>
      <Toast d="ev-toast" icon={<Receipt size={16} />} title="Event folio opened" line="Okafor & Lee wedding · deposit $4,200 recorded" />
    </div>
  );
}
