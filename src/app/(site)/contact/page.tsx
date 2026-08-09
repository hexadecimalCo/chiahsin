import type { Metadata } from "next";
import { ContactSection } from "@/components/site/ContactSection";

export const metadata: Metadata = { title: "聯絡我們" };

export default function ContactPage() {
  return <ContactSection />;
}
