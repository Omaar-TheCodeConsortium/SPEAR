"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/constants";

const LINKS = [
  ["See it work", "#product"],
  ["How it connects", "#connected"],
  ["Reliability", "#reliability"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-b border-line bg-linen/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label="SPEAR OS, back to the top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/emblem.webp")} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="text-[15px] font-bold tracking-[0.08em]">SPEAR OS</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="inline-flex min-h-11 items-center rounded-lg px-3.5 text-[14px] font-medium text-taupe transition-colors hover:text-espresso">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="inline-flex min-h-11 items-center rounded-lg bg-espresso px-5 text-[14px] font-semibold text-linen transition-colors hover:bg-brass-deep"
          >
            Book a demo
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-espresso lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open ? (
        <ul id="mobile-menu" className="border-t border-line px-4 pb-4 pt-2 lg:hidden">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-line-soft text-[17px] font-medium">
                {label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
