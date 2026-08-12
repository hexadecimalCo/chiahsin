import { getTranslations } from "next-intl/server";

const LINE_ADD_FRIEND_URL = "https://line.me/ti/p/@753inpeo";

export async function LineFloatingButton() {
  const t = await getTranslations("lineButton");

  return (
    <a
      href={LINE_ADD_FRIEND_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      title={t("label")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#06C755] shadow-lg transition hover:scale-105 hover:shadow-xl"
    >
      <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
        <path
          fill="#fff"
          d="M24 6C13 6 4 13.4 4 22.4c0 8 7.1 14.8 16.7 16.1.7.1 1.5.5 1.7 1.1.2.5.1 1.3.1 1.9l-.3 1.7c-.1.5-.4 1.9 1.7 1 2-.9 11.1-6.5 15.1-11.2h0C42.1 29.2 44 26 44 22.4 44 13.4 35 6 24 6z"
        />
        <path
          fill="#06C755"
          d="M20.3 18.6h-1.4c-.2 0-.4.2-.4.4v8.6c0 .2.2.4.4.4h1.4c.2 0 .4-.2.4-.4v-8.6c0-.2-.2-.4-.4-.4zM30.1 18.6h-1.4c-.2 0-.4.2-.4.4v5.1l-4-5.4-.1-.1h-1.5c-.2 0-.4.2-.4.4v8.6c0 .2.2.4.4.4h1.4c.2 0 .4-.2.4-.4v-5.1l4 5.4.1.1h1.5c.2 0 .4-.2.4-.4v-8.6c0-.2-.2-.4-.4-.4zM16.9 25.9h-3.4v-6.9c0-.2-.2-.4-.4-.4h-1.4c-.2 0-.4.2-.4.4v8.6c0 .1 0 .2.1.3.1.1.2.1.3.1h5.2c.2 0 .4-.2.4-.4v-1.4c0-.2-.2-.4-.4-.4zM36.5 20.4c.2 0 .4-.2.4-.4v-1.4c0-.2-.2-.4-.4-.4h-5.2c-.1 0-.2 0-.3.1-.1.1-.1.2-.1.3v8.6c0 .1 0 .2.1.3.1.1.2.1.3.1h5.2c.2 0 .4-.2.4-.4v-1.4c0-.2-.2-.4-.4-.4h-3.4v-1.5h3.4c.2 0 .4-.2.4-.4v-1.4c0-.2-.2-.4-.4-.4h-3.4v-1.5h3.4z"
        />
      </svg>
    </a>
  );
}
