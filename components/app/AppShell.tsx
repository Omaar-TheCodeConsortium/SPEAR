import type { ReactNode } from "react";
import { BedDouble, ChefHat, ConciergeBell, LayoutGrid, Search, Settings, SprayCan, UtensilsCrossed } from "lucide-react";
import { asset } from "@/lib/constants";

// The SPEAR app's frame: icon rail on the left, top bar, and a content area for one screen.
// Drawn at 1200 × 760 inside <Stage>.

export const RAIL = [
  { key: "overview", label: "Overview", Icon: LayoutGrid },
  { key: "desk", label: "Front desk", Icon: ConciergeBell },
  { key: "rooms", label: "Rooms", Icon: BedDouble },
  { key: "restaurant", label: "Restaurant", Icon: UtensilsCrossed },
  { key: "kitchen", label: "Kitchen", Icon: ChefHat },
  { key: "housekeeping", label: "Housekeeping", Icon: SprayCan },
] as const;

export type RailKey = (typeof RAIL)[number]["key"];
export const RAIL_TOP = 76;
export const RAIL_STEP = 52;

export default function AppShell({ active, children }: { active: RailKey; children: ReactNode }) {
  const index = RAIL.findIndex((item) => item.key === active);
  return (
    <div className="absolute inset-0 overflow-hidden bg-linen text-[14px] leading-[1.45] text-espresso">
      <aside className="absolute bottom-0 left-0 top-0 w-16 border-r border-line bg-parchment">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/brand/emblem.webp")} alt="" width={36} height={36} className="absolute left-[14px] top-[14px] h-9 w-9" />
        <span
          data-rail-indicator=""
          className="absolute left-2 h-12 w-12 rounded-lg border border-line bg-linen shadow-[0_2px_8px_rgba(34,27,22,0.06)]"
          style={{ top: RAIL_TOP, transform: `translateY(${index * RAIL_STEP}px)` }}
        />
        {RAIL.map(({ key, Icon }, i) => (
          <span
            key={key}
            data-rail={key}
            className={`rail-item absolute left-2 flex h-12 w-12 items-center justify-center ${i === index ? "is-active" : ""}`}
            style={{ top: RAIL_TOP + i * RAIL_STEP }}
          >
            <Icon size={21} strokeWidth={1.75} />
          </span>
        ))}
        <span className="rail-item absolute bottom-4 left-2 flex h-12 w-12 items-center justify-center">
          <Settings size={20} strokeWidth={1.75} />
        </span>
      </aside>

      <header className="absolute left-16 right-0 top-0 flex h-[60px] items-center justify-between border-b border-line bg-parchment/70 px-6">
        <div className="leading-tight">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em]">SPEAR OS</p>
          <p className="text-[12px] text-taupe">The Grand Azure Hotel &amp; Bistro</p>
        </div>
        <div className="flex h-9 w-[340px] items-center gap-2 rounded-full border border-line bg-linen px-4 text-[13px] text-taupe">
          <Search size={15} className="text-brass-deep" />
          <span className="flex-1">Search guest, room, table or item</span>
          <span className="rounded border border-line px-1.5 text-[11px]">⌘K</span>
        </div>
        <div className="flex items-center gap-5 text-[13px]">
          <span className="flex items-center gap-2 rounded-full border border-line bg-linen px-3 py-1 font-semibold">
            <span className="h-2 w-2 rounded-full bg-brass" />
            Evening service
          </span>
          <span className="tabular-nums text-taupe">18:42</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-brass/50 bg-brass/15 text-[12px] font-bold text-brass-deep">
            ML
          </span>
        </div>
      </header>

      <div data-content="" className="absolute bottom-0 left-16 right-0 top-[60px]">
        {children}
      </div>
    </div>
  );
}
