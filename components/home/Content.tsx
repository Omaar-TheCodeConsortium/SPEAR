import { Check, Plus } from "lucide-react";
import { COMPANY, SOCIALS, asset } from "@/lib/constants";
import { SocialIcon } from "@/components/brands";
import { BUTTON_DARK, BUTTON_LIGHT, EYEBROW, H2, SectionHead, SpearMeaning } from "./ui";

/* ---------- Packages ---------- */

const PACKAGES = [
  {
    name: "Restaurant",
    who: "Restaurants, cafes, bars and food halls",
    price: "$199",
    items: ["Offline POS and kitchen screens", "QR and waiter-tablet ordering", "Recipes and kitchen stock", "Reservations and floor plan", "Guest profiles and messaging", "Staff rotas and timeclock"],
    extra: "Buffet management available as an add-on",
  },
  {
    name: "Hotel",
    who: "Boutique hotels, B&Bs and hostels",
    price: "$299",
    items: ["Hotel PMS and room calendar", "Commission-free booking engine", "Channel manager and dynamic rates", "Desk check-in and wallet keys", "Housekeeping and room supplies", "Your hotel website"],
  },
  {
    name: "All-in-One",
    who: "Resorts and hotels with restaurants",
    price: "$499",
    items: ["Everything in Restaurant and Hotel", "Restaurant bills charged to rooms", "Banqueting and event orders", "Buffet management", "One guest profile for stays and meals", "Priority support"],
    featured: true,
  },
];

export function Packages() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-16">
      <SectionHead id="pricing-title" eyebrow="Pricing" title="Three packages. One monthly subscription." line="Prices are per property, per month. Hosting, updates and support are included." />
      <div className="mx-auto grid max-w-6xl gap-5 px-5 md:px-8 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <div
            key={p.name}
            data-reveal=""
            className={`flex flex-col rounded-2xl border p-7 md:p-8 ${p.featured ? "border-espresso bg-espresso text-linen" : "border-line bg-cream"}`}
          >
            <h3 className="text-[22px] font-semibold">{p.name}</h3>
            <p className={`mt-1 text-[15px] ${p.featured ? "text-linen/70" : "text-taupe"}`}>{p.who}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="text-[44px] font-semibold leading-none tracking-[-0.03em]">{p.price}</span>
              <span className={p.featured ? "text-linen/70" : "text-taupe"}>a month</span>
            </p>
            <ul className="mt-7 flex-1 space-y-3">
              {p.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <Check size={18} className={`mt-0.5 flex-none ${p.featured ? "text-brass" : "text-sage"}`} />
                  {item}
                </li>
              ))}
              {p.extra ? (
                <li className={`flex gap-3 text-[15px] leading-snug ${p.featured ? "text-linen/70" : "text-taupe"}`}>
                  <Plus size={18} className="mt-0.5 flex-none" />
                  {p.extra}
                </li>
              ) : null}
            </ul>
            <a href="#contact" className={`mt-8 ${p.featured ? "inline-flex min-h-12 items-center justify-center rounded-lg bg-brass px-6 text-[15px] font-semibold text-espresso transition-colors hover:bg-linen" : BUTTON_LIGHT}`}>
              Contact us
            </a>
          </div>
        ))}
      </div>
      <p data-reveal="" className="mx-auto mt-8 max-w-2xl px-5 text-center text-[15px] text-taupe">
        Try any module you don&apos;t have for 14 days. It switches on straight away, with no downtime.
      </p>
    </section>
  );
}

/* ---------- Who makes it ---------- */

export function Owned() {
  return (
    <section aria-labelledby="owned-title" className="mx-auto mt-24 max-w-6xl px-5 md:mt-32 md:px-8">
      <div data-reveal="" className="grid gap-8 rounded-2xl border border-line bg-parchment/60 p-8 md:grid-cols-[1fr_1.3fr] md:items-center md:p-12">
        <div>
          <p className={EYEBROW}>Who makes SPEAR</p>
          <h2 id="owned-title" className={`mt-4 ${H2}`}>
            Built and owned by The Code Consortium.
          </h2>
        </div>
        <div>
          <p className="text-[17px] leading-relaxed text-taupe md:text-[19px]">
            SPEAR is our own product. We design it, build it, host it and support it. Every property runs the same SPEAR, so an improvement made for one reaches all of them.
          </p>
          <a href={COMPANY.url} className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold underline decoration-brass underline-offset-4 hover:decoration-espresso">
            About The Code Consortium <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

export const FAQS = [
  [
    "Can we use SPEAR for just the restaurant, or just the hotel?",
    "Yes. Every part of SPEAR works on its own. Start with the Restaurant or Hotel package and switch on more when you need it.",
  ],
  [
    "What happens when the internet goes down?",
    "Your tills, kitchen screens and front desk keep working through the SPEAR server on your property, for up to 72 hours with no sale lost. When the connection comes back, everything syncs, and anything that clashes is shown on screen for you to settle.",
  ],
  [
    "Does it work with Booking.com, Expedia and Agoda?",
    "Yes. The channel manager keeps your rates and availability in step across them, and SPEAR queues every booking in order, so a room is never sold twice.",
  ],
  [
    "How do guests check in?",
    "At the desk. Your team checks their ID, then shows a single-use QR code. Scanning it opens the guest's stay in their phone's browser, with no app to install. Wallet keys and phone payments are optional, and guests without a smartphone get a key card.",
  ],
  [
    "What hardware do we need?",
    "The POS runs on Windows, macOS or Linux and prints to ordinary receipt printers. Kitchen screens run on plain TVs through a low-cost adapter. Waiters and housekeepers use phones or tablets.",
  ],
  [
    "Do you store card details?",
    "No. Card payments go straight to the payment provider, and SPEAR never stores a card number.",
  ],
  [
    "How do we move over from our current system?",
    "Our onboarding team imports your guest profiles, future reservations and menus, and trains your staff before you go live.",
  ],
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16">
      <SectionHead id="faq-title" eyebrow="Questions" title="Good to know." />
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        {FAQS.map(([question, answer]) => (
          <details key={question} data-reveal="" className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-[18px] font-semibold">
              {question}
              <Plus size={20} className="faq-icon flex-none text-brass-deep transition-transform duration-300" />
            </summary>
            <p className="pb-6 pr-10 text-[16px] leading-relaxed text-taupe">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

// The Code Consortium's mark, drawn through a mask so it takes the page's colours.
function TccMark({ className = "" }: { className?: string }) {
  const url = `url(${asset("/brand/tcc-mark.webp")})`;
  return (
    <span
      className={`block aspect-[1217/408] bg-espresso ${className}`}
      style={{ maskImage: url, WebkitMaskImage: url, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }}
    />
  );
}

const FOOTER_LINKS: [string, [string, string][]][] = [
  ["SPEAR OS", [["See it work", "#product"], ["Modules", "#modules"], ["Pricing", "#pricing"], ["FAQ", "#faq"], ["Contact us", "#contact"], ["Client login", "login/"]]],
  [COMPANY.name, [["Company website", COMPANY.url]]],
];

const FOOTER_HEAD = "text-[12px] font-semibold uppercase tracking-[0.14em] text-brass-deep";
const SOCIAL =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line text-taupe transition-colors hover:border-brass hover:bg-brass/10 hover:text-espresso";

const FOOTER_LINK = "inline-flex min-h-9 items-center text-[14px] text-taupe transition-colors hover:text-espresso";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line md:mt-32">
      <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-5 pb-10 pt-16 text-center md:grid-cols-[1fr_auto_1fr] md:gap-10 md:px-8 md:text-left">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/wordmark.webp")} alt="SPEAR" width={1280} height={143} className="mx-auto h-auto w-52 md:mx-0" loading="lazy" />
          <p className="mx-auto mt-4 max-w-xs md:mx-0">
            <SpearMeaning className="block text-[11px] leading-relaxed tracking-[0.12em]" />
          </p>
          <p className="mx-auto mt-3 max-w-xs text-[15px] text-taupe md:mx-0">Hotel and restaurant software in one system.</p>
        </div>

        <a href={COMPANY.url} className="group mx-auto flex flex-col items-center md:pt-1" aria-label={`A product of ${COMPANY.name}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">A product of</span>
          <TccMark className="mt-4 h-12 transition-colors duration-300 group-hover:bg-brass-deep" />
          <span className="mt-3 text-[14px] font-semibold tracking-[0.02em]">{COMPANY.name}</span>
        </a>

        <div className="text-left md:justify-self-end">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
            {FOOTER_LINKS.map(([group, links]) => (
              <div key={group}>
                <p className={FOOTER_HEAD}>{group}</p>
                <ul className="mt-3">
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href.startsWith("http") ? href : href.startsWith("#") ? href : asset(`/${href}`)} className={FOOTER_LINK}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <p className={`mt-8 ${FOOTER_HEAD}`}>Follow us</p>
          <ul className="mt-3 flex gap-2">
            {SOCIALS.map(({ id, name, url }) => (
              <li key={id}>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${COMPANY.name} on ${name}`} className={SOCIAL}>
                    <SocialIcon id={id} />
                  </a>
                ) : (
                  <span role="img" title={`${name}, coming soon`} aria-label={`${name}, coming soon`} className={SOCIAL}>
                    <SocialIcon id={id} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto max-w-[1280px] border-t border-line-soft px-5 py-6 text-center text-[13px] text-taupe md:px-8">
        © 2026 {COMPANY.name}. All rights reserved.
      </p>

      {/* The parent company's mark as a watermark, cut off by the bottom of the page */}
      <div aria-hidden="true" className="pointer-events-none mx-auto aspect-[1217/220] w-[min(92vw,1040px)] select-none overflow-hidden opacity-[0.06]">
        <TccMark />
      </div>
    </footer>
  );
}

export { BUTTON_DARK };
