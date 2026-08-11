const INSTAGRAM_API_BASE = "https://graph.instagram.com";
const POST_LIMIT = 9;

export type InstagramPost = {
  id: string;
  caption: string | null;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl: string | null;
  permalink: string;
};

type InstagramMediaResponse = {
  data?: Array<{
    id: string;
    caption?: string;
    media_type: InstagramPost["mediaType"];
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
  }>;
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) return [];

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
  const url = `${INSTAGRAM_API_BASE}/me/media?fields=${fields}&limit=${POST_LIMIT}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const json = (await res.json()) as InstagramMediaResponse;
    return (json.data ?? []).map((item) => ({
      id: item.id,
      caption: item.caption ?? null,
      mediaType: item.media_type,
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url ?? null,
      permalink: item.permalink,
    }));
  } catch {
    return [];
  }
}
