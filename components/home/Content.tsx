import { Check, Plus } from "lucide-react";
import { COMPANY, asset } from "@/lib/constants";
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
            <a href="#demo" className={`mt-8 ${p.featured ? "inline-flex min-h-12 items-center justify-center rounded-lg bg-brass px-6 text-[15px] font-semibold text-espresso transition-colors hover:bg-linen" : BUTTON_LIGHT}`}>
              Book a demo
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

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line md:mt-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/wordmark.webp")} alt="SPEAR" width={1280} height={143} className="h-auto w-56" loading="lazy" />
          <p className="mt-4 max-w-sm text-[15px] text-taupe">
            <SpearMeaning className="block text-[12px] tracking-[0.12em]" />
            <span className="mt-2 block">
              A product of{" "}
              <a href={COMPANY.url} className="font-semibold text-espresso underline decoration-brass underline-offset-4">
                {COMPANY.name}
              </a>
              .
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4 text-[14px] text-taupe md:items-end">
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#product" className="hover:text-espresso">See it work</a>
            <a href="#pricing" className="hover:text-espresso">Pricing</a>
            <a href="#faq" className="hover:text-espresso">FAQ</a>
            <a href="#demo" className="hover:text-espresso">Book a demo</a>
          </p>
          <p>© 2026 {COMPANY.name}</p>
        </div>
      </div>
    </footer>
  );
}

export { BUTTON_DARK };
