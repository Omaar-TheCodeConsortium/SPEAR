"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { asset, COMPANY } from "@/lib/constants";
import Stage from "@/components/app/Stage";
import AppShell from "@/components/app/AppShell";
import { OverviewScreen } from "@/components/app/screens";
import { BUTTON_DARK, EYEBROW, SpearMeaning } from "@/components/home/ui";

const FIELD =
  "mt-2 block min-h-12 w-full rounded-lg border border-brass/35 bg-cream px-4 text-[16px] text-espresso placeholder:text-taupe/60 focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/25";

// Client sign-in. Accounts are not connected to this page yet, so every attempt is turned away
// without sending anything anywhere.
export default function LoginView() {
  const [state, setState] = useState<"idle" | "checking" | "refused">("idle");
  const [show, setShow] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("checking");
    window.setTimeout(() => {
      (form.elements.namedItem("password") as HTMLInputElement).value = "";
      setState("refused");
    }, 900);
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <main className="flex flex-col px-5 py-6 md:px-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="SPEAR OS home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/brand/emblem.webp")} alt="" width={32} height={32} className="h-8 w-8" />
            <span className="text-[15px] font-bold tracking-[0.08em]">SPEAR OS</span>
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-[14px] font-medium text-taupe transition-colors hover:text-espresso">
            <ArrowLeft size={16} aria-hidden="true" /> Back to the site
          </Link>
        </header>

        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-14">
          <p className={EYEBROW}>Client login</p>
          <h1 className="mt-3 text-[clamp(2rem,4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">Sign in to SPEAR OS</h1>
          <p className="mt-3 text-[16px] leading-relaxed text-taupe">Use the work email your property&apos;s SPEAR account was set up with.</p>

          <form onSubmit={submit} className="mt-9 space-y-5">
            <label className="block text-[14px] font-semibold">
              Work email
              <input name="email" type="email" required autoComplete="username" className={FIELD} />
            </label>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="password" className="text-[14px] font-semibold">
                  Password
                </label>
                <Link href="/#contact" className="text-[13px] font-semibold text-brass-deep underline-offset-4 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <input id="password" name="password" type={show ? "text" : "password"} required autoComplete="current-password" className={`${FIELD} pr-12`} />
                <button
                  type="button"
                  onClick={() => setShow((value) => !value)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center text-taupe hover:text-espresso"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <label className="flex min-h-11 items-center gap-3 text-[15px] text-taupe">
              <input type="checkbox" name="remember" className="h-5 w-5 accent-[var(--color-brass-deep)]" /> Keep me signed in on this device
            </label>
            {state === "refused" ? (
              <p role="alert" className="rounded-lg bg-alert/8 px-4 py-3 text-[14px] leading-snug text-alert">
                We couldn&apos;t sign you in with those details. Check them and try again, or contact us for help.
              </p>
            ) : null}
            <button type="submit" disabled={state === "checking"} className={`${BUTTON_DARK} w-full disabled:opacity-60`}>
              <Lock size={16} aria-hidden="true" /> {state === "checking" ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 border-t border-line pt-6 text-[15px] text-taupe">
            Not using SPEAR yet?{" "}
            <Link href="/#contact" className="font-semibold text-espresso underline decoration-brass underline-offset-4">
              Contact us
            </Link>
          </p>
        </div>

        <footer className="text-[13px] text-taupe">
          © 2026{" "}
          <a href={COMPANY.url} className="underline decoration-brass/60 underline-offset-4 hover:text-espresso">
            {COMPANY.name}
          </a>
        </footer>
      </main>

      {/* A glimpse of the system behind the sign-in, on wide screens only */}
      <aside aria-hidden="true" className="relative hidden overflow-hidden bg-parchment lg:block">
        <div className="absolute inset-x-12 top-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/brand/wordmark.webp")} alt="" width={1280} height={143} className="h-auto w-64" />
          <p className="mt-4">
            <SpearMeaning className="text-[12px] tracking-[0.14em]" />
          </p>
        </div>
        <div className="absolute -right-24 bottom-[-6%] left-16 [perspective:1800px]">
          <div className="overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_40px_80px_-24px_rgba(34,27,22,0.35)] [transform:rotateX(8deg)_rotateY(-10deg)]">
            <Stage label="">
              <AppShell active="overview">
                <OverviewScreen />
              </AppShell>
            </Stage>
          </div>
        </div>
      </aside>
    </div>
  );
}
