// Content for the /tax-incentive page. Update directly in code when it changes
// (per MVP scope — there's no CMS for these sections).
//
// English/Japanese copy is a draft machine translation of the approved
// Chinese source, pending native review before treating it as final.

import type { Locale } from "@/i18n/routing";

type TaxIncentiveContent = {
  eyebrow: string;
  title: string;
  lead: string;
  stats: Array<{ value: string; label: string }>;
  caseStudiesTitle: string;
  cases: Array<{
    /** Country code, e.g. JP / VN. No flag emoji. */
    code: string;
    region: string;
    service: string;
    basis: string;
    incomeType: string;
    result: string;
  }>;
  caseFieldLabels: { basis: string; incomeType: string };
  servicesTitle: string;
  services: string[];
  whoForTitle: string;
  whoFor: string[];
  disclaimer: string;
  bodyMarkdown: string; // narrative paragraphs only
  ctaNote: string;
  cta: { label: string; href: string };
};

const content: Record<Locale, TaxIncentiveContent> = {
  zh: {
    eyebrow: "所得稅法 §25 申請服務",
    title: "在台技術服務收入，核准後按 15% 計算所得額",
    lead: "依所得稅法第 25 條第 1 項，符合條件的外國營利事業經核准後，得按中華民國境內營業收入的 15% 計算所得額。本所已完成日本、越南企業之申請並獲准適用。",
    stats: [
      { value: "15%", label: "核准後之所得額計算基礎（按境內營業收入）" },
      { value: "2 件", label: "已獲准適用之申請案：日本／越南企業" },
      { value: "§25 I", label: "適用法源：技術服務等業務收入" },
    ],
    caseStudiesTitle: "實績案例",
    cases: [
      {
        code: "JP",
        region: "日本企業",
        service: "工程技術顧問服務",
        basis: "所得稅法 §25 I",
        incomeType: "在台提供技術服務之收入",
        result: "核准適用",
      },
      {
        code: "VN",
        region: "越南企業",
        service: "軟體技術顧問服務",
        basis: "所得稅法 §25 I",
        incomeType: "在台提供技術服務之收入",
        result: "核准適用",
      },
    ],
    caseFieldLabels: { basis: "申請依據", incomeType: "收入性質" },
    servicesTitle: "服務內容",
    services: [
      "跨境交易及合約內容初步評估",
      "所得稅法第 25 條適用資格分析",
      "申請文件及合約中文譯本準備",
      "代理向主管機關提出申請",
      "審查期間之補件及說明",
      "核准後退稅及後續稅務處理諮詢",
    ],
    whoForTitle: "適合諮詢的情況",
    whoFor: [
      "外國企業在台提供技術服務並收取報酬",
      "台灣客戶已就付款代為扣繳，想確認稅負是否過高",
      "正在草擬跨境技術服務合約，想先確認稅務條件",
      "過去已扣繳，想評估核准後的退稅可行性",
    ],
    disclaimer: "※ 個案適用結果仍應依實際交易內容、合約條件及主管機關審查結果而定。",
    bodyMarkdown: `本所具備協助外國企業申請所得稅法第 25 條第 1 項租稅優惠之實務經驗。

曾協助**日本企業就其在台提供技術服務之收入**，分析交易及合約內容、整理申請文件，並向主管機關申請適用所得稅法第 25 條第 1 項規定，**經審查後獲准適用**。`,
    ctaNote: "想先確認貴公司的交易是否可能適用？提供合約與收入性質即可初步評估。",
    cta: { label: "預約諮詢", href: "/contact" },
  },

  en: {
    eyebrow: "ARTICLE 25 TAX INCENTIVE",
    title: "Technical service income in Taiwan — taxed on 15% of revenue once approved",
    lead: "Under Article 25, Paragraph 1 of the Income Tax Act, an eligible foreign profit-seeking enterprise may, once approved, calculate its taxable income as 15% of its Taiwan-sourced business revenue. We have completed and secured approval for applications from Japanese and Vietnamese companies.",
    stats: [
      { value: "15%", label: "Taxable income basis once approved (of Taiwan-sourced revenue)" },
      { value: "2 cases", label: "Approved applications: Japanese / Vietnamese companies" },
      { value: "§25(1)", label: "Legal basis: income from technical services and similar business" },
    ],
    caseStudiesTitle: "Track Record",
    cases: [
      {
        code: "JP",
        region: "Japanese Company",
        service: "Engineering & technical consulting services",
        basis: "Income Tax Act §25(1)",
        incomeType: "Income from technical services provided in Taiwan",
        result: "Approved",
      },
      {
        code: "VN",
        region: "Vietnamese Company",
        service: "Software technical consulting services",
        basis: "Income Tax Act §25(1)",
        incomeType: "Income from technical services provided in Taiwan",
        result: "Approved",
      },
    ],
    caseFieldLabels: { basis: "Legal Basis", incomeType: "Income Type" },
    servicesTitle: "Services Included",
    services: [
      "Preliminary assessment of cross-border transactions and contract terms",
      "Eligibility analysis for Article 25 treatment",
      "Preparation of application documents and Chinese translations of contracts",
      "Filing the application with the competent authority on your behalf",
      "Handling requests for additional documents and clarifications during review",
      "Advisory on tax refunds and follow-up tax matters after approval",
    ],
    whoForTitle: "Who Should Talk to Us",
    whoFor: [
      "Foreign companies providing technical services in Taiwan and receiving fees for them",
      "Companies whose Taiwan clients have already withheld tax on payments and want to confirm whether the tax burden is too high",
      "Companies drafting a cross-border technical services contract who want to confirm the tax treatment in advance",
      "Companies that have already had tax withheld and want to assess the feasibility of a refund once approved",
    ],
    disclaimer:
      "※ Actual outcomes for individual cases depend on the specific transaction details, contract terms, and the competent authority's review.",
    bodyMarkdown: `We have hands-on experience helping foreign enterprises apply for the tax incentive under Article 25, Paragraph 1 of the Income Tax Act.

We previously assisted **a Japanese company with income from technical services provided in Taiwan** — analyzing the transaction and contract terms, preparing the application documents, and applying to the competent authority for treatment under Article 25, Paragraph 1 of the Income Tax Act. **The application was approved after review.**`,
    ctaNote:
      "Want to check whether your company's transactions may qualify? Share your contract and the nature of the income for a preliminary assessment.",
    cta: { label: "Book a Consultation", href: "/contact" },
  },

  ja: {
    eyebrow: "所得税法第25条 申請サービス",
    title: "台湾での技術サービス収入、承認後は収入の15%を所得額として計算",
    lead: "所得税法第25条第1項に基づき、要件を満たす外国営利事業は承認後、台湾国内の営業収入の15%を所得額として計算できます。当事務所は日本、ベトナム企業の申請を完了し、適用の承認を得ています。",
    stats: [
      { value: "15%", label: "承認後の所得額計算基準（台湾国内営業収入に対して）" },
      { value: "2件", label: "承認済みの申請案件：日本／ベトナム企業" },
      { value: "§25 I", label: "適用法源：技術サービス等業務収入" },
    ],
    caseStudiesTitle: "実績",
    cases: [
      {
        code: "JP",
        region: "日系企業",
        service: "エンジニアリング技術コンサルティングサービス",
        basis: "所得税法 §25 I",
        incomeType: "台湾国内で提供した技術サービスの収入",
        result: "承認",
      },
      {
        code: "VN",
        region: "ベトナム企業",
        service: "ソフトウェア技術コンサルティングサービス",
        basis: "所得税法 §25 I",
        incomeType: "台湾国内で提供した技術サービスの収入",
        result: "承認",
      },
    ],
    caseFieldLabels: { basis: "申請根拠", incomeType: "収入の性質" },
    servicesTitle: "サービス内容",
    services: [
      "クロスボーダー取引及び契約内容の予備評価",
      "所得税法第25条の適用資格分析",
      "申請書類及び契約書の中国語訳の準備",
      "主管機関への申請代行",
      "審査期間中の追加書類対応及び説明",
      "承認後の還付及び税務フォローアップに関するアドバイス",
    ],
    whoForTitle: "ご相談に適したケース",
    whoFor: [
      "台湾で技術サービスを提供し報酬を受け取っている外国企業",
      "台湾の取引先がすでに源泉徴収を行っており、税負担が過大でないか確認したい",
      "クロスボーダーの技術サービス契約を検討中で、事前に税務条件を確認したい",
      "既に源泉徴収された税額について、承認後の還付可能性を検討したい",
    ],
    disclaimer: "※ 個別案件の適用結果は、実際の取引内容、契約条件及び主管機関の審査結果によって異なります。",
    bodyMarkdown: `当事務所は、外国企業による所得税法第25条第1項の租税優遇申請をサポートした実務経験を有しています。

**台湾国内で提供した技術サービス収入を有する日系企業**について、取引及び契約内容の分析、申請書類の整理を行い、主管機関に対して所得税法第25条第1項の適用を申請し、**審査の結果、適用が承認されました**。`,
    ctaNote:
      "貴社の取引が適用対象となるかご確認されたい場合は、契約内容と収入の性質をお知らせください。初期評価を行います。",
    cta: { label: "無料相談を予約する", href: "/contact" },
  },
};

export function getTaxIncentiveContent(locale: Locale): TaxIncentiveContent {
  return content[locale];
}
