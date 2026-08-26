import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LineFloatingButton } from "@/components/site/LineFloatingButton";
import { ScrollToTopOnNavigate } from "@/components/site/ScrollToTopOnNavigate";
import { getOrganizationSchema } from "@/lib/schema";
import type { Locale } from "@/i18n/routing";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const organizationSchema = getOrganizationSchema(locale, siteUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ScrollToTopOnNavigate />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <LineFloatingButton />
    </>
  );
}
