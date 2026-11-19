import type { Metadata } from "next";
import LoginView from "@/components/login/LoginView";

export const metadata: Metadata = {
  title: "Client login",
  description: "Sign in to SPEAR OS, the hotel and restaurant system.",
  alternates: { canonical: "/login/" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginView />;
}
