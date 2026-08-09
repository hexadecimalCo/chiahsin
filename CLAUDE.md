# 佾廷會計師事務所官網（chiahsin.co 改版）

客戶委託的官方改版案：取代原本的 Strikingly 網站，改為自有的 Next.js 網站 + 完全客製的文章管理後台。

## 技術棧

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**（css-first 設定，token 定義在 `src/app/globals.css` 的 `@theme inline`）
- **Prisma 6 + PostgreSQL**（本地開發用 `docker-compose.yml` 起 Postgres；正式環境規劃用 Neon）
  - 注意：刻意鎖在 Prisma 6，**不要升到 Prisma 7**（v7 移除 schema 內 datasource url，需 driver adapter，暫不遷移）
- 後台登入：iron-session（cookie session）+ bcryptjs
- 富文本：TipTap；HTML 內容存 DB 前後都經過 `src/lib/sanitize.ts`（DOMPurify）過濾
- 圖片上傳：本地 fallback 存 `public/uploads/`；正式環境用 Vercel Blob（需 `BLOB_READ_WRITE_TOKEN`）
- 聯絡表單：Resend 寄信（`RESEND_API_KEY` 未設定時會回錯誤訊息但不會 crash）

## 常用指令

```bash
docker compose up -d        # 起本地 Postgres（必須先跑）
npm run dev                 # 開發伺服器 http://localhost:3000
npm run db:migrate          # prisma migrate dev
npm run db:seed             # 建管理員帳號（見下方）
npx tsc --noEmit            # type check
```

Seed 管理員帳號（帳號用 username 不是 email，這是客戶要求）：

```bash
SEED_ADMIN_USERNAME="davinci393" SEED_ADMIN_PASSWORD="<向專案負責人索取>" npm run db:seed
```

密碼只存在 DB 的 bcrypt 雜湊與負責人手上，不要寫進任何檔案。

## 架構

```
src/
├── app/
│   ├── (site)/           # 公開網站：首頁、blog、blog/[slug]、search、contact、404
│   ├── admin/
│   │   ├── login/        # 登入頁（不在 (protected) 內，避免被 admin layout 包住）
│   │   └── (protected)/  # 需登入：layout（含登出）+ articles 列表/new/[id]/edit
│   ├── sitemap.ts        # 動態 sitemap
│   └── robots.ts         # 明確允許 AI 爬蟲（GPTBot 等）— 客戶已確認的政策
├── proxy.ts              # Next 16 的 middleware 新命名（export function proxy）：/admin/* cookie 檢查
├── components/
│   ├── site/             # 首頁各區塊元件
│   └── admin/            # ArticleForm、RichTextEditor、DeleteArticleButton
├── content/site-content.ts  # 首頁寫死的文案（hero、服務、流程、FAQ、聯絡資訊）
├── lib/                  # prisma、session、auth、sanitize、slugify、storage、rate-limit
│   └── actions/          # server actions：auth / article / contact
└── generated/prisma/     # prisma generate 輸出（勿手改）
```

DB models（`prisma/schema.prisma`）：`Article`（slug unique、status DRAFT/PUBLISHED、contentHtml）、`AdminUser`（username unique + passwordHash）。

## 設計規範（重要：客戶對視覺極度要求）

客戶提供了設計稿截圖（深藍+金色，外商/僑外資服務主題），要求**一模一樣**。所有顏色 token 在 `globals.css`：

- 深藍 `--brand-navy: #16213e`（導覽/Footer）、CTA 區 `--brand-navy-2: #1f2d4f`
- Hero 漸層：`#24334f → #111a30`（直接寫在 HeroSection 的 arbitrary value）
- 金色 `--brand-gold: #c9a227`（logo、眉標、按鈕、流程圓圈）
- 服務卡片連結是**綠色** `--brand-green: #35845f`（不是金色）
- 適合對象區：米色底 `--brand-cream: #f7f5ee` + 淺綠卡片 `--brand-mint: #e6f0e8`

版型重點：Hero 文字**靠左**；核心服務 4 卡與適合對象 3 卡都是**滿版直向堆疊**（不是多欄 grid）；設立流程是白底；FAQ 是無外框分隔線清單 + 底部再生能源補充框；**首頁沒有聯絡表單**（表單在 `/contact`）。改版面前先跟使用者確認設計稿。

色碼是從低解析度截圖肉眼判讀的近似值，**尚未經客戶最終確認**——若拿到 Figma 或原始設計檔，應以其精確色碼全面校正。

## 內容政策（必須遵守）

- **不可以**自行從 chiahsin.co（或任何網站）抓取文章全文、文案填入本專案——著作權歸屬無法在對話中驗證。使用者已被告知：文章由他們貼給我們或自行從後台輸入。
- `site-content.ts` 內少數服務描述文字是依設計稿截圖判讀重打的；正式文案待客戶提供後逐字替換。

## 目前狀態

**已完成**：專案初始化、DB schema + migration（`20260808075610_init`）、後台登入（username + 密碼、rate limit、8hr session）、文章 CRUD（TipTap、封面圖/內文圖上傳、草稿/發布、slug 自動產生）、首頁（依設計稿）、/blog 列表、/blog/[slug]（含 Article JSON-LD）、/search、/contact、404、sitemap、robots。`npx tsc --noEmit` 乾淨。

**待辦**：
1. 首頁以外頁面（blog/search/contact/404）的視覺還是舊的 slate 灰配色，需改成 navy/gold 設計系統
2. SEO 補完：OG image、LocalBusiness/ProfessionalService JSON-LD、GA（客戶若有帳號）
3. Resend 正式設定（API key、寄件網域驗證，`from` 目前是 onboarding@resend.dev 測試值）
4. 部署：Vercel + Neon + Vercel Blob，環境變數見 `.env.example`；DNS 切換 chiahsin.co
5. 正式文案/圖片替換（等客戶提供）
6. 後台可用性打磨（目前功能可用；未做修改密碼 UI）

## 已知坑

- 開發中改 server action 檔案後，瀏覽器裡舊表單的 action id 會失效，送出可能觸發錯誤的 action（曾出現點「建立文章」卻登出）——重新整理頁面即可，不是 bug。
- 刪 `.next` 會讓執行中的 dev server 自動重啟。
- `npx tsc --noEmit` 若報 `.next/` 內的錯，先刪 `.next` 再跑。
- Prisma CLI 對 AI agent 執行 `migrate reset` 有防呆，需要使用者明確同意（`PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION`）。
