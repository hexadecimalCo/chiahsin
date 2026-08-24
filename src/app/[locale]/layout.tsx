import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HTML_LANG: Record<Locale, string> = {
  zh: "zh-Hant",
  en: "en",
  ja: "ja",
};

const SITE_METADATA: Record<Locale, { title: string; template: string; description: string }> = {
  zh: {
    title: "佾廷會計師事務所｜工商登記、帳務服務、財稅簽證、薪資外包",
    template: "%s｜佾廷會計師事務所",
    description: "佾廷會計師事務所提供工商登記、帳務服務、財稅簽證、薪資外包等服務。",
  },
  en: {
    title: "Yi Ting Accounting Firm | Company Registration, Bookkeeping, Tax & Payroll",
    template: "%s | Yi Ting Accounting Firm",
    description:
      "Yi Ting Accounting Firm provides company registration, bookkeeping, financial/tax certification, and payroll outsourcing services.",
  },
  ja: {
    title: "佾廷会計士事務所｜会社登記・記帳代行・税務証明・給与アウトソーシング",
    template: "%s｜佾廷会計士事務所",
    description:
      "佾廷会計士事務所は会社登記、記帳代行、財務・税務証明、給与アウトソーシングなどのサービスを提供しています。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { title, template, description } = SITE_METADATA[locale];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template },
    description,
    alternates: {
      languages: {
        "zh-Hant": siteUrl,
        en: `${siteUrl}/en`,
        ja: `${siteUrl}/ja`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={HTML_LANG[locale]}
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
