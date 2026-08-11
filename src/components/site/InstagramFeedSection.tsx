import { getInstagramPosts } from "@/lib/instagram";

const INSTAGRAM_HANDLE = "chiahsinacc";
const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export async function InstagramFeedSection() {
  const posts = await getInstagramPosts();

  if (posts.length === 0) return null;

  return (
    <section className="bg-brand-cream py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-green">
            INSTAGRAM
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
                alt={post.caption?.slice(0, 80) || "Instagram 貼文"}
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
            前往 Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
