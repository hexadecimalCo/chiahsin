import { getTranslations } from "next-intl/server";
import { getInstagramPosts } from "@/lib/instagram";
import type { Locale } from "@/i18n/routing";

const INSTAGRAM_HANDLE = "chiahsinacc";
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export async function InstagramFeedSection({ locale }: { locale: Locale }) {
  const [posts, t] = await Promise.all([
    getInstagramPosts(),
    getTranslations({ locale, namespace: "instagram" }),
  ]);

  if (posts.length === 0) {
    return (
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-5 rounded-lg bg-brand-cream px-8 py-7">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-brand-gold">{t("eyebrow")}</p>
              <p className="mt-2 text-lg font-semibold text-brand-navy">@{INSTAGRAM_HANDLE}</p>
              <p className="mt-1.5 text-sm text-brand-navy/70">{t("fallbackDescription")}</p>
            </div>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none rounded border border-brand-navy px-6 py-3 text-sm font-medium text-brand-navy transition hover:bg-brand-navy hover:text-white"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-navy md:text-3xl">
            @{INSTAGRAM_HANDLE}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Instagram CDN URLs are signed/dynamic per request, can't be allowlisted for next/image */}
              <img
                src={post.mediaType === "VIDEO" ? (post.thumbnailUrl ?? post.mediaUrl) : post.mediaUrl}
                alt={post.caption?.slice(0, 80) || t("altFallback")}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded border border-brand-navy px-6 py-3 text-sm font-medium text-brand-navy transition hover:bg-brand-navy hover:text-white"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
