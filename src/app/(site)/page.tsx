import { HeroSection } from "@/components/site/HeroSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { ClientTypesSection } from "@/components/site/ClientTypesSection";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaSection } from "@/components/site/CtaSection";
import { InstagramFeedSection } from "@/components/site/InstagramFeedSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <ClientTypesSection />
      <FaqSection />
      <CtaSection />
      <InstagramFeedSection />
    </>
  );
}
