import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/site/HeroSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ClientTypesSection } from "@/components/site/ClientTypesSection";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaSection } from "@/components/site/CtaSection";
import { InstagramFeedSection } from "@/components/site/InstagramFeedSection";
import type { Locale } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} />
      <ProcessSection locale={locale} />
      <ClientTypesSection locale={locale} />
      <FaqSection locale={locale} />
      <CtaSection locale={locale} />
      <InstagramFeedSection locale={locale} />
    </>
  );
}
