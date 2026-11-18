import { COMPANY, SITE_URL } from "@/lib/constants";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Showcase from "@/components/home/Showcase";
import Journey from "@/components/home/Journey";
import Reliability from "@/components/home/Reliability";
import DemoForm from "@/components/home/DemoForm";
import Motion from "@/components/home/Motion";
import { FAQS, Faq, Footer, Modules, Owned, Packages } from "@/components/home/Content";

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SPEAR OS",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Windows, macOS, Linux",
  description: "Hotel and restaurant software in one system: PMS, booking engine, POS, kitchen, housekeeping and guest check-in.",
  publisher: { "@type": "Organization", name: COMPANY.name, url: COMPANY.url },
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([software, faq]) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-espresso focus:px-4 focus:py-3 focus:text-linen">
        Skip to content
      </a>
      <span id="top" />
      <Nav />
      <main id="main">
        <Hero />
        <Showcase />
        <Journey />
        <Reliability />
        <Modules />
        <Packages />
        <Owned />
        <Faq />
        <DemoForm />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
