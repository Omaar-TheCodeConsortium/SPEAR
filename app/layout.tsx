import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { COMPANY, IS_PREVIEW, SITE_URL } from "@/lib/constants";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const TITLE = "SPEAR OS | Hotel and restaurant software in one system";
const DESCRIPTION =
  "SPEAR OS, the Smart Platform for Every Accommodation & Restaurant, runs the front desk, restaurant, kitchen and housekeeping as one product, and keeps working when the internet doesn't.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: { default: TITLE, template: "%s | SPEAR OS" },
  description: DESCRIPTION,
  applicationName: "SPEAR OS",
  publisher: COMPANY.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SPEAR OS",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SPEAR OS" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.jpg"] },
  robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.name,
  url: COMPANY.url,
  brand: { "@type": "Brand", name: "SPEAR OS", url: SITE_URL },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        {/* Lets the CSS hide the hero intro until GSAP plays it. Without scripts nothing is hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
