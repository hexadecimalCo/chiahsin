import { getSiteContent } from "@/content/site-content";
import type { Locale } from "@/i18n/routing";

const POSTAL_ADDRESS: Record<Locale, Record<string, string>> = {
  zh: {
    streetAddress: "莊敬路25巷4弄10號1樓",
    addressLocality: "板橋區",
    addressRegion: "新北市",
  },
  en: {
    streetAddress: "1F., No. 10, Aly. 4, Ln. 25, Zhuangjing Rd.",
    addressLocality: "Banqiao Dist.",
    addressRegion: "New Taipei City",
  },
  ja: {
    streetAddress: "莊敬路25巷4弄10号1樓",
    addressLocality: "板橋区",
    addressRegion: "新北市",
  },
};

export function getOrganizationSchema(locale: Locale, siteUrl: string) {
  const { siteInfo } = getSiteContent(locale);
  const localePath = locale === "zh" ? "" : `/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: siteInfo.firmName,
    url: `${siteUrl}${localePath}`,
    telephone: siteInfo.phone,
    email: siteInfo.email,
    address: {
      "@type": "PostalAddress",
      ...POSTAL_ADDRESS[locale],
      postalCode: "220",
      addressCountry: "TW",
    },
    areaServed: "TW",
    sameAs: ["https://www.instagram.com/chiahsinacc/", "https://line.me/ti/p/@753inpeo"],
  };
}
