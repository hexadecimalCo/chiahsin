# 佾廷會計師事務所官網（chiahsin.co 改版）

客戶委託的官方改版案：取代原本的 Strikingly 網站，改為自有的 Next.js 靜態網站。

## 技術棧

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**（css-first 設定，token 定義在 `src/app/globals.css` 的 `@theme inline`）
- **完全靜態，沒有資料庫、沒有後台登入**（見下方「內容管理」）——文章內容是 repo 裡的 Markdown 檔，用 `gray-matter`（讀 frontmatter）+ `marked`（轉 HTML）在 build time 處理
- 聯絡表單：Resend 寄信（`RESEND_API_KEY` 未設定時會回錯誤訊息但不會 crash）
- 首頁 Instagram 貼文牆：`src/lib/instagram.ts` 呼叫 Instagram Graph API（`graph.instagram.com/me/media`），用 `INSTAGRAM_ACCESS_TOKEN`；未設定時該區塊直接不渲染

## 常用指令

```bash
npm run dev                 # 開發伺服器 http://localhost:3000
npm run build                # production build（含 SSG）
npx tsc --noEmit             # type check
npx eslint .                 # lint
```

## 內容管理：如何新增/編輯文章

沒有後台介面，直接在 repo 裡加一個 Markdown 檔：

1. 在 `src/content/articles/` 新增一個檔案，檔名就是網址 slug，例如 `src/content/articles/foreign-investment-faq.md`
2. 檔案開頭用 frontmatter 寫 metadata，下面接內文（Markdown）：

   ```markdown
   ---
   title: "文章標題"
   excerpt: "列表頁顯示的摘要（選填）"
   coverImageUrl: "/uploads/xxx.jpg"   # 選填，圖片放 public/ 下
   publishedAt: "2026-08-09"           # 選填，不填就用檔案建立時間
   ---

   內文開始，支援一般 Markdown 語法。
   ```

3. `git commit` + 部署即完成發布。沒有草稿狀態——檔案存在就會出現在 `/blog`；要下架就把檔案刪掉或搬出 `src/content/articles/`。

對應的讀取邏輯在 `src/lib/articles.ts`（`getAllArticles` / `getArticleBySlug`），`/blog`、`/blog/[slug]`、`/search`、`sitemap.ts` 都是從這裡拿資料，不是查資料庫。

## 架構

```
src/
├── app/
│   ├── (site)/           # 公開網站：首頁、blog、blog/[slug]、search、contact、404
│   ├── sitemap.ts        # 動態 sitemap（讀 src/content/articles）
│   └── robots.ts         # 明確允許 AI 爬蟲（GPTBot 等）— 客戶已確認的政策
├── components/
│   └── site/              # 首頁各區塊元件（含 InstagramFeedSection）
├── content/
│   ├── site-content.ts    # 首頁寫死的文案（hero、服務、流程、FAQ、聯絡資訊）
│   └── articles/          # 文章 Markdown 檔，見上方「內容管理」
└── lib/
    ├── articles.ts         # Markdown 文章讀取/解析
    ├── instagram.ts         # Instagram Graph API 抓貼文
    ├── rate-limit.ts         # 聯絡表單防洗版
    └── actions/contact-action.ts   # 聯絡表單 server action（Resend）
```

## 設計規範（重要：客戶對視覺極度要求）

客戶提供了設計稿截圖（深藍+金色，外商/僑外資服務主題），要求**一模一樣**。所有顏色 token 在 `globals.css`：

- 深藍 `--brand-navy: #16213e`（導覽/Footer）、CTA 區 `--brand-navy-2: #1f2d4f`
- Hero 漸層：`#24334f → #111a30`（直接寫在 HeroSection 的 arbitrary value）
- 金色 `--brand-gold: #c9a227`（logo、眉標、按鈕、流程圓圈）
- 服務卡片連結是**綠色** `--brand-green: #35845f`（不是金色）
- 適合對象區：米色底 `--brand-cream: #f7f5ee` + 淺綠卡片 `--brand-mint: #e6f0e8`

版型重點：Hero 文字**靠左**；核心服務 4 卡與適合對象 3 卡都是**滿版直向堆疊**（不是多欄 grid）；設立流程是**深藍底**、文字靠左、5 個步驟用一條橫線連起來的水平時間軸（手機版退化成單欄堆疊，無連接線）；FAQ 是無外框分隔線清單 + 底部再生能源補充框；**首頁沒有聯絡表單**（表單在 `/contact`）；首頁最下方（CTA 區塊下面）是 Instagram 貼文牆。改版面前先跟使用者確認設計稿。

色碼是從低解析度截圖肉眼判讀的近似值，**尚未經客戶最終確認**——若拿到 Figma 或原始設計檔，應以其精確色碼全面校正。

## 內容政策（必須遵守）

- **不可以**自行從 chiahsin.co（或任何網站）抓取文章全文、文案填入本專案——著作權歸屬無法在對話中驗證。文章由客戶或負責人自行寫成 Markdown 檔放進 `src/content/articles/`。
- `site-content.ts` 內少數服務描述文字是依設計稿截圖判讀重打的；正式文案待客戶提供後逐字替換。

## 目前狀態

**已完成**：專案初始化、首頁（依設計稿）、/blog、/blog/[slug]（含 Article JSON-LD）、/search、/contact、404、sitemap、robots、靜態文章系統（Markdown + frontmatter，取代原本的 DB + 後台 CMS）。`npx tsc --noEmit` 乾淨。

**已完成（續）**：Instagram 貼文牆已串通，`INSTAGRAM_ACCESS_TOKEN` 已取得並可正常抓資料，版面是 RWD 3x3（手機單欄 1x9、`md` 以上 3 欄），`POST_LIMIT` 在 `src/lib/instagram.ts`（目前 9）。

**待辦**：
1. 首頁以外頁面（blog/search/contact/404）的視覺還是舊的 slate 灰配色，需改成 navy/gold 設計系統
2. SEO 補完：OG image、LocalBusiness/ProfessionalService JSON-LD、GA（客戶若有帳號）
3. Resend 正式設定（API key、寄件網域驗證，`from` 目前是 onboarding@resend.dev 測試值）
4. 部署：Vercel；環境變數見 `.env.example`；DNS 切換 chiahsin.co（純靜態站，不需要 Neon/DB）
5. 正式文案/圖片替換（等客戶提供）
6. **部署後要做**：Instagram token 自動續期——目前是手動產生的 60 天 long-lived token，會過期。計畫是部署到 Vercel 後，加一支 Vercel Cron route（例如 `src/app/api/cron/refresh-instagram-token/route.ts`），排程每月打一次 `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=...` 換新 token，再呼叫 Vercel API 更新環境變數 + 觸發重新部署。不需要重新登入 IG 授權，純 API 呼叫。需要的環境變數（屆時再加）：`VERCEL_API_TOKEN`、`VERCEL_PROJECT_ID`、`VERCEL_DEPLOY_HOOK_URL`、`CRON_SECRET`。**部署前先不用做**，使用者已確認到時候再處理。

## 已知坑

- 刪 `.next` 會讓執行中的 dev server 自動重啟。
- `npx tsc --noEmit` 若報 `.next/` 內的錯，先刪 `.next` 再跑。
- Instagram long-lived access token 每 60 天過期，refresh 方式見上方「待辦 6」。
- **Instagram Graph API 抓不到「合作邀請貼文」**：如果貼文是用 IG 的「邀請合作者」功能跟別的帳號共同發佈，只有原始發文帳號的 API 抓得到，`chiahsinacc` 作為受邀合作方完全抓不到該則貼文（即使它會顯示在雙方個人檔案上）。這是 Meta 沒寫進官方文件但社群已證實的限制，換第三方 IG 牆服務一樣會踩到，無解。目前 `chiahsinacc` 近期內容有不少是這種合作貼文（例如跟 `statementcloud_official`、`unidisco_acct` 合作），所以網站貼文牆顯示的「最新」可能會落後 IG 上實際看到的。若要顯示特定貼文（含合作貼文），需改用手動存圖 + 靜態設定的方式（不經過 API，不需要 token），已跟客戶討論但尚未實作。
