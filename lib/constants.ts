// The one real address of the site. Canonical tags, the sitemap and structured data all use it.
export const SITE_URL = "https://spear-os.com";

// Set when the site is built for the preview fork: it lives in a sub-folder and must not be indexed.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

// Plain <img> tags are not given the base path by Next, so local files go through this.
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const COMPANY = {
  name: "The Code Consortium",
  url: "https://thecodeconsortium.com",
};

// Social accounts shown in the footer. url: null shows the icon without a link, for accounts not set up yet.
export const SOCIALS: { id: "linkedin" | "instagram" | "facebook" | "x" | "youtube"; name: string; url: string | null }[] = [
  { id: "linkedin", name: "LinkedIn", url: "https://www.linkedin.com/company/the-code-consortium" },
  { id: "instagram", name: "Instagram", url: null },
  { id: "facebook", name: "Facebook", url: null },
  { id: "x", name: "X", url: null },
  { id: "youtube", name: "YouTube", url: null },
];

// Web3Forms key for the contact form. These keys are meant to be public; they only allow sending to the owner's inbox.
export const FORM_KEY = "503de41a-ee74-48df-bb31-ba13feab93de";
