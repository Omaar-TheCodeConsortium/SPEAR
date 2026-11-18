import { AlertTriangle, BellRing, CalendarPlus, Check, ChefHat, Clock, Minus, Plus, QrCode, Receipt, Tablet, Users } from "lucide-react";
import { Bar, Btn, Card, Chip, Head, HIDDEN, Label, Toast, type Tone } from "./screens";

// Restaurant group screens for the module explorer. Same rules as screens.tsx.

/* ---------- QR and tablet ordering ---------- */

const QR_MENU = [
  ["Burrata, heritage tomato", "$18", "od-add1"],
  ["Wagyu beef carpaccio", "$24", "od-add2"],
  ["Pan-seared sea bass", "$52"],
  ["Chocolate soufflé", "$16"],
];

export function OrderingScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Ordering · Azure Bistro" title="Orders coming in" right={<Chip className="px-3 py-1.5 text-[12px]">QR · tablets · till</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[270px_1fr_300px] gap-5">
        {/* The guest's phone, from the QR code on table 6 */}
        <div data-d="od-phone" className="relative mx-auto flex h-full w-[260px] flex-col overflow-hidden rounded-[30px] border-[6px] border-espresso bg-linen">
          <div className="bg-parchment px-4 pb-3 pt-4">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-taupe"><QrCode size={12} /> Table 6 · scanned</p>
            <p className="text-[17px] font-semibold">Azure Bistro</p>
          </div>
          <div className="flex-1 px-3">
            {QR_MENU.map(([name, price, d]) => (
              <div key={name} className="flex items-center gap-2 border-b border-line-soft py-2.5">
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-semibold leading-tight">{name}</span>
                  <span className="block text-[11px] text-taupe">{price}</span>
                </span>
                <span data-d={d} className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brass text-espresso"><Plus size={14} strokeWidth={3} /></span>
              </div>
            ))}
          </div>
          <span className="relative m-3 block">
            <span data-d="od-send" className="flex h-11 items-center justify-center rounded-xl bg-espresso text-[12px] font-semibold text-linen">
              Send order · <span data-d="od-cart" className="ml-1">0 items</span>
            </span>
            <span data-d="od-sent" className={`absolute inset-0 flex items-center justify-center gap-1.5 rounded-xl bg-sage text-[12px] font-semibold text-white ${HIDDEN}`}>
              <Check size={14} strokeWidth={3} /> Sent · pay from here any time
            </span>
          </span>
        </div>

        {/* A waiter's tablet */}
        <Card d="od-tablet" className="flex flex-col p-5">
          <p className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[17px] font-semibold"><Tablet size={18} className="text-brass-deep" /> Table 9 · Sarah L.</span>
            <Chip tone="brass">4 guests</Chip>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Ribeye, medium rare", "Truffle tagliolini", "Sea bass", "Barolo, glass"].map((item, i) => (
              <span key={item} data-d={i === 0 ? "od-tab-item" : undefined} className="rounded-md border border-line bg-linen px-3 py-3 text-[13px] font-semibold">{item}</span>
            ))}
          </div>
          <Label className="mt-4">This order</Label>
          <div className="mt-1 flex-1 text-[13px]">
            <p className="flex justify-between border-b border-line-soft py-2"><span>2× Truffle tagliolini</span><span>$64.00</span></p>
            <p data-d="od-tab-new" className={`flex justify-between border-b border-line-soft py-2 font-semibold ${HIDDEN}`}><span>1× Ribeye, medium rare</span><span>$65.00</span></p>
          </div>
          <span className="relative block">
            <Btn tone="dark" d="od-fire" className="h-12 w-full text-[14px]"><ChefHat size={16} /> Fire to kitchen</Btn>
            <span data-d="od-fired" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[14px] font-semibold text-white ${HIDDEN}`}>
              <Check size={16} strokeWidth={3} /> Fired · kitchen has it
            </span>
          </span>
        </Card>

        {/* What happens next */}
        <div className="flex flex-col gap-5">
          <Card d="od-bill" className="p-4">
            <Label className="flex items-center gap-1.5"><Receipt size={12} /> Table 6 bill</Label>
            <div className="mt-2 text-[13px]">
              <p className="flex justify-between border-b border-line-soft py-1.5"><span>2× Sparkling water</span><span>$12.00</span></p>
              <p data-d="od-b1" className={`flex justify-between border-b border-line-soft py-1.5 font-semibold ${HIDDEN}`}><span>Burrata</span><span>$18.00</span></p>
              <p data-d="od-b2" className={`flex justify-between border-b border-line-soft py-1.5 font-semibold ${HIDDEN}`}><span>Wagyu carpaccio</span><span>$24.00</span></p>
            </div>
            <p className="mt-2 flex justify-between font-semibold"><span>Total</span><span data-d="od-total" className="tabular-nums">$12.00</span></p>
          </Card>
          <Card d="od-kitchen" className="flex-1 p-4">
            <Label className="flex items-center gap-1.5"><ChefHat size={12} /> Kitchen screen</Label>
            <div className="mt-2 space-y-2">
              <p className="rounded-md border border-line bg-linen px-3 py-2 text-[12px]"><span className="block font-semibold">T-02 · till</span>2× Soufflé</p>
              <p data-d="od-k1" className={`rounded-md border border-sage/50 bg-sage/10 px-3 py-2 text-[12px] ${HIDDEN}`}><span className="block font-semibold">T-06 · QR order</span>Burrata, Wagyu carpaccio</p>
              <p data-d="od-k2" className={`rounded-md border border-sage/50 bg-sage/10 px-3 py-2 text-[12px] ${HIDDEN}`}><span className="block font-semibold">T-09 · tablet</span>Ribeye, medium rare</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- Menus and recipes ---------- */

const DISHES = [
  ["Burrata, heritage tomato", "$18", "71%"],
  ["Pan-seared sea bass", "$52", "80%", "mn-dish"],
  ["45-day dry-aged ribeye", "$65", "64%"],
  ["Truffle tagliolini", "$32", "77%"],
  ["Chocolate soufflé", "$16", "82%"],
];

const RECIPE = [
  ["Sea bass fillet", "180 g", "$7.92", "mn-fish"],
  ["Beurre blanc", "40 g", "$1.10"],
  ["Samphire", "30 g", "$0.84", "mn-samphire"],
  ["New potatoes", "120 g", "$0.48"],
  ["Lemon and herbs", "15 g", "$0.30"],
];

export function MenusScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Menus and recipes" title="Dinner menu" right={<Chip tone="brass" className="px-3 py-1.5 text-[12px]">Average food cost 24%</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[300px_1fr_250px] gap-5">
        <Card className="p-4">
          <Label>Mains and starters</Label>
          {DISHES.map(([name, price, margin, d]) => (
            <div key={name} data-d={d} className="mt-2 flex items-center justify-between rounded-md border border-line-soft px-3 py-3">
              <span>
                <span className="block text-[13px] font-semibold">{name}</span>
                <span className="block text-[11px] text-taupe">Margin {margin}</span>
              </span>
              <span className="font-semibold tabular-nums">{price}</span>
            </div>
          ))}
        </Card>
        <Card className="relative overflow-hidden">
          <div data-d="mn-empty" className="absolute inset-0 flex items-center justify-center text-taupe">
            <p className="font-semibold">Pick a dish to see its recipe</p>
          </div>
          <div data-d="mn-recipe" className={`absolute inset-0 flex flex-col p-5 ${HIDDEN}`}>
            <p className="text-[19px] font-semibold">Pan-seared sea bass</p>
            <p className="text-[12px] text-taupe">Menu price $52 · recipe per plate</p>
            <div className="mt-3 grid grid-cols-[1fr_80px_80px] gap-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-taupe">
              <span>Ingredient</span><span className="text-right">Amount</span><span className="text-right">Cost</span>
            </div>
            <div data-d="mn-rows">
              {RECIPE.map(([name, qty, cost, d]) => (
                <div key={name} data-d={d} className="relative grid grid-cols-[1fr_80px_80px] items-center gap-2 rounded border-t border-line-soft px-1 py-2.5 text-[13px]">
                  <span className="font-semibold">{name}</span>
                  <span data-d={d ? `${d}-qty` : undefined} className="text-right tabular-nums">{qty}</span>
                  <span data-d={d ? `${d}-cost` : undefined} className="text-right tabular-nums">{cost}</span>
                  {d === "mn-samphire" ? (
                    <span data-d="mn-out" className={`absolute inset-0 flex items-center gap-2 rounded bg-[#f5e1db] px-1 text-[13px] font-semibold text-alert ${HIDDEN}`}>
                      <AlertTriangle size={14} /> Samphire · out of stock
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <div data-d="mn-cost" className="mt-auto grid grid-cols-3 gap-3 rounded-md bg-parchment/60 p-3">
              <span><Label>Food cost</Label><span data-d="mn-total" className="text-[19px] font-semibold tabular-nums">$10.64</span></span>
              <span><Label>Of the price</Label><span data-d="mn-pct" className="text-[19px] font-semibold tabular-nums">20.5%</span></span>
              <span><Label>Margin</Label><span data-d="mn-margin" className="text-[19px] font-semibold tabular-nums text-sage-deep">$41.36</span></span>
            </div>
          </div>
        </Card>
        <Card d="mn-where" className="p-4">
          <Label>Where it&apos;s sold</Label>
          {["QR menus", "Waiter tablets", "Till"].map((where, i) => (
            <div key={where} className="mt-2 rounded-md border border-line-soft p-3">
              <p className="text-[11px] font-semibold text-taupe">{where}</p>
              <p className="flex items-center justify-between text-[13px] font-semibold">
                <span data-d={`mn-w${i}-name`}>Sea bass · $52</span>
                <Chip tone="sage" d={`mn-w${i}`}>On</Chip>
              </p>
            </div>
          ))}
        </Card>
      </div>
      <Toast d="mn-toast" icon={<AlertTriangle size={16} />} title="Sea bass is off for tonight" line="Greyed out on every QR menu, tablet and till" />
    </div>
  );
}

/* ---------- Reservations and floor plan ---------- */

type FloorTable = { id: string; x: number; y: number; w: number; h: number; round?: boolean; state: string; tone: Tone; d?: string };
const FLOOR: FloorTable[] = [
  { id: "T-01", x: 30, y: 30, w: 92, h: 92, round: true, state: "Seated", tone: "brass" },
  { id: "T-02", x: 160, y: 30, w: 92, h: 92, round: true, state: "Free", tone: "neutral" },
  { id: "T-03", x: 290, y: 30, w: 92, h: 92, round: true, state: "Seated", tone: "brass" },
  { id: "T-05", x: 30, y: 170, w: 150, h: 84, state: "Free", tone: "neutral", d: "fl-t5" },
  { id: "T-06", x: 220, y: 170, w: 150, h: 84, state: "Seated", tone: "brass" },
  { id: "T-09", x: 30, y: 300, w: 150, h: 84, state: "Paid", tone: "sage", d: "fl-t9" },
  { id: "T-10", x: 220, y: 300, w: 150, h: 84, state: "Seated", tone: "brass" },
  { id: "T-12", x: 420, y: 170, w: 120, h: 214, state: "Seated", tone: "brass" },
];

export function FloorScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Reservations and floor plan" title="Main room · tonight" right={<Chip className="px-3 py-1.5 text-[12px]">22 booked · 6 walk-ins</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_340px] gap-5">
        <Card d="fl-plan" className="relative overflow-hidden bg-[radial-gradient(circle,rgba(92,79,68,0.12)_1px,transparent_1px)] [background-size:22px_22px]">
          <span className="absolute left-5 top-4 text-[11px] font-semibold uppercase tracking-[0.07em] text-taupe">Drawn to scale · drag to rearrange</span>
          <div className="absolute left-5 top-12">
            {FLOOR.map((t) => (
              <div
                key={t.id}
                data-d={t.d}
                className={`absolute flex flex-col items-center justify-center gap-1 border-2 bg-cream ${t.round ? "rounded-full" : "rounded-lg"} ${t.tone === "brass" ? "border-brass" : t.tone === "sage" ? "border-sage" : "border-line"}`}
                style={{ left: t.x, top: t.y, width: t.w, height: t.h }}
              >
                <span className="text-[14px] font-semibold">{t.id}</span>
                <Chip tone={t.tone} d={t.d ? `${t.d}-state` : undefined}>{t.state}</Chip>
              </div>
            ))}
            <div data-d="fl-t14" className="absolute flex flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-brass bg-cream" style={{ left: 420, top: 30, width: 92, height: 92 }}>
              <span className="text-[14px] font-semibold">T-14</span>
              <Chip>New</Chip>
            </div>
            <span data-d="fl-spot" className="absolute" style={{ left: 580, top: 170, width: 92, height: 92 }} />
          </div>
          <span className="absolute bottom-4 left-5 rounded bg-parchment px-3 py-1 text-[11px] font-semibold text-taupe">Kitchen pass</span>
          <span className="absolute bottom-4 right-5 rounded bg-parchment px-3 py-1 text-[11px] font-semibold text-taupe">Terrace doors</span>
        </Card>
        <Card d="fl-list" className="flex flex-col p-5">
          <Label>Bookings · 19:00 – 20:00</Label>
          {[["Marchetti", "2 guests · 19:00", "Seated"], ["Novak", "6 guests · 19:15", "Seated"]].map(([who, line, state]) => (
            <div key={who} className="flex items-center justify-between border-t border-line-soft py-3">
              <span><span className="block font-semibold">{who}</span><span className="block text-[12px] text-taupe">{line}</span></span>
              <Chip tone="brass">{state}</Chip>
            </div>
          ))}
          <div data-d="fl-new" className={`border-t border-line-soft py-3 ${HIDDEN}`}>
            <p className="flex items-center justify-between">
              <span><span className="block font-semibold">Aris</span><span className="block text-[12px] text-taupe">4 guests · 19:30 · T-05</span></span>
              <Chip tone="sage">Booked online</Chip>
            </p>
            <span className="relative mt-3 block">
              <Btn tone="dark" d="fl-seat" className="w-full"><Users size={15} /> Seat the party</Btn>
              <span data-d="fl-opened" className={`absolute inset-0 flex items-center justify-center gap-2 rounded-lg bg-sage text-[13px] font-semibold text-white ${HIDDEN}`}>
                <Receipt size={15} /> Seated · bill opened on T-05
              </span>
            </span>
          </div>
          <p className="mt-auto flex items-center gap-2 rounded-md bg-parchment/60 p-3 text-[12px] text-taupe">
            <Clock size={14} /> Tables free up on their own once the bill is paid.
          </p>
        </Card>
      </div>
      <Toast d="fl-toast" icon={<CalendarPlus size={16} />} title="New table booking" line="Aris · 4 guests · 19:30, booked from your website" />
    </div>
  );
}

/* ---------- Buffet management ---------- */

const PREP = [
  ["Scrambled eggs", "90 g a guest", "12.6 kg", "16.2 kg"],
  ["Pastries", "1.5 a guest", "210", "270"],
  ["Cut fruit", "120 g a guest", "16.8 kg", "21.6 kg"],
  ["Bacon", "2 rashers a guest", "280", "360"],
];

const LINES = [
  ["Hot line", "Scrambled eggs", 4, "bf-eggs"],
  ["Hot line", "Bacon", 3],
  ["Bakery", "Pastries", 4],
  ["Cold line", "Cut fruit", 5],
] as const;

export function BuffetScreen() {
  return (
    <div className="flex h-full flex-col gap-5 p-7">
      <Head label="Buffet management" title="Breakfast · Terrace" right={<Chip tone="brass" className="px-3 py-1.5 text-[12px]">06:30 – 10:30</Chip>} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr_280px] gap-5">
        <Card d="bf-prep" className="p-5">
          <div className="flex items-center justify-between">
            <Label>Prep from headcount</Label>
            <span data-d="bf-headbox" className="flex items-center gap-2 rounded-md border border-brass px-2 py-1">
              <Minus size={14} className="text-taupe" />
              <span data-d="bf-head" className="w-10 text-center text-[17px] font-semibold tabular-nums">140</span>
              <span data-d="bf-plus" className="flex h-6 w-6 items-center justify-center rounded bg-brass text-espresso"><Plus size={14} strokeWidth={3} /></span>
            </span>
          </div>
          <div className="mt-3">
            {PREP.map(([dish, per, now], i) => (
              <div key={dish} className="flex items-center justify-between border-t border-line-soft py-3">
                <span><span className="block text-[13px] font-semibold">{dish}</span><span className="block text-[11px] text-taupe">{per}</span></span>
                <span data-d={`bf-b${i}`} className="text-[17px] font-semibold tabular-nums">{now}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-taupe">Fixed recipes · stock issued once, at 06:00</p>
        </Card>
        <Card d="bf-lines" className="p-5">
          <Label>Line levels · logged by runners</Label>
          <div className="mt-3 space-y-3">
            {LINES.map(([line, dish, level, d]) => (
              <div key={dish} data-d={d ? `${d}-row` : undefined} className="rounded-md border border-line-soft p-3">
                <p className="flex items-center justify-between text-[13px]">
                  <span><span className="font-semibold">{dish}</span> <span className="text-taupe">· {line}</span></span>
                </p>
                <span className="mt-2 flex gap-1">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <span key={k} data-d={d ? `${d}-${k}` : undefined} className={`h-2.5 flex-1 rounded-sm ${k < level ? "bg-brass" : "bg-parchment"}`} />
                  ))}
                </span>
              </div>
            ))}
          </div>
          <div data-d="bf-alert" className={`mt-3 flex items-center gap-2 rounded-md bg-alert/10 p-3 text-[13px] font-semibold text-alert ${HIDDEN}`}>
            <BellRing size={15} /> Eggs nearly out · kitchen told to send now
          </div>
        </Card>
        <Card d="bf-plates" className="flex flex-col p-5">
          <Label>Plates against contract</Label>
          <p className="mt-2 text-[13px] font-semibold">Okafor &amp; Lee wedding brunch</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span data-d="bf-count" className="text-[40px] font-semibold leading-none tracking-[-0.02em] tabular-nums">96</span>
            <span className="text-taupe">of 120 plates</span>
          </p>
          <span className="mt-3 block"><Bar value={80} d="bf-bar" /></span>
          <Chip tone="rust" d="bf-limit" className={`mt-3 w-fit ${HIDDEN}`}>2 plates left on the contract</Chip>
          <p className="mt-auto text-[12px] text-taupe">Close-out report due before lunch service.</p>
        </Card>
      </div>
      <Toast d="bf-toast" icon={<ChefHat size={16} />} title="Refill on its way" line="Scrambled eggs, 3 kg to the hot line" />
    </div>
  );
}
