"use client";

import { useState, type FormEvent } from "react";
import { FORM_KEY } from "@/lib/constants";
import { BUTTON_DARK, EYEBROW, H2 } from "./ui";

const FIELD =
  "mt-2 block min-h-12 w-full rounded-lg border border-brass/35 bg-cream px-4 text-[16px] text-espresso placeholder:text-taupe/60 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/25";

export default function DemoForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: FORM_KEY, subject: "SPEAR OS demo request", from_name: "spear-os.com", ...data }),
      });
      setState(response.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="demo" aria-labelledby="demo-title" className="mx-auto mt-24 max-w-6xl scroll-mt-20 px-5 md:mt-32 md:px-8">
      <div className="grid gap-10 rounded-2xl border border-line bg-cream p-7 md:grid-cols-[1fr_1.2fr] md:p-12">
        <div data-reveal="">
          <p className={EYEBROW}>Book a demo</p>
          <h2 id="demo-title" className={`mt-4 ${H2}`}>
            See SPEAR with your property in mind.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-taupe">
            A 30-minute walkthrough of the parts you&apos;d use, set up with rooms, tables and menus like yours.
          </p>
        </div>
        {state === "sent" ? (
          <div role="status" className="flex flex-col justify-center rounded-xl bg-sage/10 p-8">
            <p className="text-[20px] font-semibold">Thank you. We&apos;ll be in touch within one working day.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <label className="text-[14px] font-semibold">
              Your name
              <input name="name" required autoComplete="name" className={FIELD} />
            </label>
            <label className="text-[14px] font-semibold">
              Work email
              <input name="email" type="email" required autoComplete="email" className={FIELD} />
            </label>
            <label className="text-[14px] font-semibold">
              Property name
              <input name="property" required autoComplete="organization" className={FIELD} />
            </label>
            <label className="text-[14px] font-semibold">
              Your property is
              <select name="type" required defaultValue="" className={FIELD}>
                <option value="" disabled>
                  Choose one
                </option>
                <option>A hotel with a restaurant</option>
                <option>A hotel</option>
                <option>A restaurant, cafe or bar</option>
              </select>
            </label>
            <label className="text-[14px] font-semibold sm:col-span-2">
              Anything we should know? <span className="font-normal text-taupe">(optional)</span>
              <textarea name="message" rows={3} className={`${FIELD} py-3`} />
            </label>
            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
              <button type="submit" disabled={state === "sending"} className={`${BUTTON_DARK} disabled:opacity-60`}>
                {state === "sending" ? "Sending…" : "Book my demo"}
              </button>
              {state === "error" ? (
                <p role="alert" className="text-[14px] text-alert">
                  That didn&apos;t send. Please try again.
                </p>
              ) : null}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
