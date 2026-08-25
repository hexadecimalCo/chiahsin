// Homepage content per locale. Update directly in code when it changes
// (per MVP scope — there's no CMS for these sections).
//
// English/Japanese copy is a draft machine translation of the approved
// Chinese source, pending native review before treating it as final.

import type { Locale } from "@/i18n/routing";

type SiteContent = {
  heroContent: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  coreServices: Array<{
    number: string;
    title: string;
    description: string;
    linkLabel: string;
    href: string;
  }>;
  processSteps: Array<{ number: string; title: string; duration: string }>;
  clientTypes: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  siteInfo: {
    firmName: string;
    email: string;
    phone: string;
    line: string;
    address: string;
  };
  sectionHeaders: {
    services: { eyebrow: string; title: string; subtitle: string };
    process: { eyebrow: string; title: string; subtitle: string; cta: string };
    clientTypes: { eyebrow: string; title: string };
    faq: { eyebrow: string; title: string; note: string; cta: string };
    cta: { title: string; subtitle: string; cta: string };
  };
};

const content: Record<Locale, SiteContent> = {
  zh: {
    heroContent: {
      eyebrow: "FOREIGN INVESTMENT SERVICES",
      title: "外商／僑外資來台設立的最佳夥伴",
      subtitle:
        "中英日文服務，簡化完成公司登記、稅務規劃與帳務管理，讓您專注拓展台灣市場。",
      primaryCta: { label: "預約諮詢", href: "/contact" },
      secondaryCta: { label: "查看設立流程", href: "#process" },
    },
    coreServices: [
      {
        number: "01",
        title: "公司設立及僑外資登記",
        description:
          "協助外商／僑外資完成投資審查、經濟部公司設立及資金匯入申報，一站式處理來台設立的所有行政程序。",
        linkLabel: "了解設立流程",
        href: "/guide",
      },
      {
        number: "02",
        title: "稅務登記與申報",
        description:
          "熟悉外資企業常見的稅務困難，提供營所稅申報、財務簽證、稅務簽證等服務，確保申報合規並降低稅務風險。",
        linkLabel: "了解稅務服務",
        href: "/contact",
      },
      {
        number: "03",
        title: "帳務處理",
        description:
          "依台灣會計準則建置整理帳務，定期產出財務報表，讓您隨時掌握台灣子公司的營運狀況。",
        linkLabel: "了解帳務服務",
        href: "/contact",
      },
      {
        number: "04",
        title: "薪資外包",
        description:
          "代辦員工薪資計算、勞健保及退休金提撥，即使是小型辦公室也能符合人事行政要求。",
        linkLabel: "了解薪資服務",
        href: "/contact",
      },
    ],
    processSteps: [
      { number: "1", title: "公司名稱預查", duration: "約 1-3 個工作天" },
      { number: "2", title: "投資審議申請", duration: "約 6-8 週" },
      { number: "3", title: "銀行開戶", duration: "協助準備文件" },
      { number: "4", title: "公司登記", duration: "取得統一編號" },
      { number: "5", title: "稅務登記", duration: "完成首次申報準備" },
    ],
    clientTypes: [
      {
        title: "日商來台投資",
        description: "熟悉日商溝通與作業習慣，提供日文服務，協助企業順利在台設立及營運。",
      },
      {
        title: "外國企業來台投資",
        description: "熟悉台灣公司及財稅法規，協助外國企業順利完成在台設立及營運所需程序。",
      },
      {
        title: "新創與中小型企業",
        description: "從設立、記帳到日常財稅需求，以務實且符合成本效益的方式協助企業穩健營運。",
      },
    ],
    faqs: [
      {
        question: "外資來台設立公司有股權比例限制嗎？",
        answer:
          "多數產業無限制外資持股比例，但部分特許行業（如金融、電信）需符合特定法規，建議先諮詢確認您的產業別適用規定。",
      },
      {
        question: "一定要在台灣租賃辦公室才能設立公司嗎？",
        answer: "不一定，依公司登記地址規定與行業別而有不同做法，可另行諮詢確認可行方案。",
      },
      {
        question: "資金匯入需要多久時間？需要準備哪些文件？",
        answer: "依匯款銀行與審查進度而定，建議提早備妥公司登記文件與匯款證明相關資料。",
      },
      {
        question: "外資設立公司後，稅務申報有什麼要特別注意的？",
        answer: "需留意營所稅申報、財務簽證與稅務簽證等合規項目，避免因不熟悉在地規定而產生風險。",
      },
      {
        question: "從決定設立到正式營運，大約需要多久時間？",
        answer: "一般約需 1-2 個月，實際時程依審查與文件齊備度而有所不同。",
      },
    ],
    siteInfo: {
      firmName: "佾廷會計師事務所",
      email: "chhsu@chiahsin.co",
      phone: "02-29688686",
      line: "@753inpeo",
      address: "新北市板橋區莊敬路25巷4弄10號1樓",
    },
    sectionHeaders: {
      services: {
        eyebrow: "核心服務",
        title: "四大服務，涵蓋設立到營運的每一步",
        subtitle: "從公司登記到日常帳務，我們提供一站式服務，降低外商在台展業的行政負擔。",
      },
      process: {
        eyebrow: "設立流程",
        title: "從決定到營運，五個階段",
        subtitle: "一般約需 1-2 個月，實際時程依產業別與文件備齊速度而有所不同。",
        cta: "查看完整流程",
      },
      clientTypes: { eyebrow: "適合對象", title: "我們熟悉的客戶類型" },
      faq: {
        eyebrow: "常見問題",
        title: "外商最常問的五個問題",
        note: "除了外商設立服務，本所也深耕再生能源產業會計多年，具備太陽光電廠設立、售電及稅務相關實務經驗。",
        cta: "了解更多",
      },
      cta: {
        title: "準備好在台灣展開事業了嗎？",
        subtitle:
          "不論您是剛開始接觸台灣市場，或已準備好啟動設立流程，歡迎與我們聯繫，我們將竭誠為您提供協助。",
        cta: "預約諮詢",
      },
    },
  },

  en: {
    heroContent: {
      eyebrow: "FOREIGN INVESTMENT SERVICES",
      title: "Your Trusted Partner for Foreign Investment in Taiwan",
      subtitle:
        "Services in Chinese, English and Japanese — company registration, tax planning and bookkeeping made simple, so you can focus on growing in Taiwan.",
      primaryCta: { label: "Book a Consultation", href: "/contact" },
      secondaryCta: { label: "View Setup Process", href: "#process" },
    },
    coreServices: [
      {
        number: "01",
        title: "Company Formation & FIA Registration",
        description:
          "We handle investment review, MOEA company registration and inbound fund declarations — a one-stop solution for setting up in Taiwan.",
        linkLabel: "Learn about the setup process",
        href: "/guide",
      },
      {
        number: "02",
        title: "Tax Registration & Filing",
        description:
          "We understand the tax challenges foreign-invested companies face, offering corporate income tax filing and financial/tax certification to keep you compliant and reduce risk.",
        linkLabel: "Learn about tax services",
        href: "/contact",
      },
      {
        number: "03",
        title: "Bookkeeping",
        description:
          "Books maintained under Taiwan accounting standards, with regular financial statements so you always know how your Taiwan subsidiary is doing.",
        linkLabel: "Learn about bookkeeping",
        href: "/contact",
      },
      {
        number: "04",
        title: "Payroll Outsourcing",
        description:
          "Payroll calculation, labor/health insurance and pension contributions handled for you — even small offices stay compliant.",
        linkLabel: "Learn about payroll services",
        href: "/contact",
      },
    ],
    processSteps: [
      { number: "1", title: "Company Name Reservation", duration: "1–3 business days" },
      { number: "2", title: "Investment Review Application", duration: "6–8 weeks" },
      { number: "3", title: "Bank Account Opening", duration: "Document preparation support" },
      { number: "4", title: "Company Registration", duration: "Obtain business ID number" },
      { number: "5", title: "Tax Registration", duration: "First filing preparation complete" },
    ],
    clientTypes: [
      {
        title: "Japanese Investment in Taiwan",
        description:
          "Familiar with Japanese communication and working style, with Japanese-language service, to help your company set up and operate smoothly in Taiwan.",
      },
      {
        title: "Foreign Investment in Taiwan",
        description:
          "Familiar with Taiwan's company and tax regulations, helping foreign companies complete the procedures needed to set up and operate in Taiwan.",
      },
      {
        title: "Startups & Small-to-Medium Enterprises",
        description:
          "From setup and bookkeeping to everyday financial and tax needs, we support your business with a practical, cost-effective approach.",
      },
    ],
    faqs: [
      {
        question: "Is there a limit on foreign ownership when setting up a company in Taiwan?",
        answer:
          "Most industries have no restriction on foreign ownership, but some regulated industries (e.g. finance, telecom) have specific rules — we recommend confirming what applies to your industry first.",
      },
      {
        question: "Do I need to lease an office in Taiwan to register a company?",
        answer:
          "Not necessarily — it depends on your registered address requirements and industry. Contact us to confirm a workable option.",
      },
      {
        question: "How long does inbound fund transfer take, and what documents are needed?",
        answer:
          "It depends on the remitting bank and review progress. We recommend preparing your company registration documents and remittance proof in advance.",
      },
      {
        question: "What should I watch out for with tax filing after setting up?",
        answer:
          "Pay attention to corporate income tax filing and financial/tax certification compliance to avoid risks from unfamiliarity with local rules.",
      },
      {
        question: "How long does it take from decision to full operation?",
        answer:
          "Typically about 1–2 months, though actual timing depends on review and document readiness.",
      },
    ],
    siteInfo: {
      firmName: "Yi Ting Accounting Firm",
      email: "chhsu@chiahsin.co",
      phone: "02-29688686",
      line: "@753inpeo",
      address: "1F., No. 10, Aly. 4, Ln. 25, Zhuangjing Rd., Banqiao Dist., New Taipei City, Taiwan",
    },
    sectionHeaders: {
      services: {
        eyebrow: "CORE SERVICES",
        title: "Four Services Covering Setup Through Operations",
        subtitle:
          "From company registration to day-to-day bookkeeping, our one-stop service reduces the administrative burden of doing business in Taiwan.",
      },
      process: {
        eyebrow: "SETUP PROCESS",
        title: "From Decision to Operation, Five Stages",
        subtitle:
          "Typically takes about 1–2 months; actual timing varies by industry and how quickly documents are ready.",
        cta: "View Full Process",
      },
      clientTypes: { eyebrow: "WHO WE SERVE", title: "Clients We Know Well" },
      faq: {
        eyebrow: "FAQ",
        title: "Five Questions Foreign Investors Ask Most",
        note:
          "Beyond foreign investment services, we've spent years in renewable energy accounting, with hands-on experience in solar plant setup, power sales and related tax matters.",
        cta: "Learn more",
      },
      cta: {
        title: "Ready to start your business in Taiwan?",
        subtitle:
          "Whether you're just exploring the Taiwan market or ready to kick off the setup process, get in touch — we're glad to help.",
        cta: "Book a Consultation",
      },
    },
  },

  ja: {
    heroContent: {
      eyebrow: "FOREIGN INVESTMENT SERVICES",
      title: "外資・僑外資の台湾進出を支えるベストパートナー",
      subtitle:
        "中国語・英語・日本語対応。会社登記、税務プランニング、記帳代行をシンプルに。台湾での事業拡大に専念いただけます。",
      primaryCta: { label: "無料相談を予約する", href: "/contact" },
      secondaryCta: { label: "設立フローを見る", href: "#process" },
    },
    coreServices: [
      {
        number: "01",
        title: "会社設立・僑外資登記",
        description:
          "投資審査、経済部への会社設立申請、資金送金の申告まで、台湾進出に必要な行政手続きをワンストップでサポートします。",
        linkLabel: "設立フローを見る",
        href: "/guide",
      },
      {
        number: "02",
        title: "税務登記・申告",
        description:
          "外資企業特有の税務課題を熟知し、営利事業所得税申告、財務諸表監査、税務証明などのサービスでコンプライアンスとリスク低減を支援します。",
        linkLabel: "税務サービスを見る",
        href: "/contact",
      },
      {
        number: "03",
        title: "記帳代行",
        description:
          "台湾の会計基準に基づき帳簿を整理し、定期的に財務諸表を作成。台湾子会社の経営状況をいつでも把握できます。",
        linkLabel: "記帳サービスを見る",
        href: "/contact",
      },
      {
        number: "04",
        title: "給与計算アウトソーシング",
        description:
          "給与計算、労働・健康保険、退職金の手続きを代行。小規模オフィスでも人事労務のコンプライアンスを実現します。",
        linkLabel: "給与サービスを見る",
        href: "/contact",
      },
    ],
    processSteps: [
      { number: "1", title: "会社名称の事前審査", duration: "約1〜3営業日" },
      { number: "2", title: "投資審議の申請", duration: "約6〜8週間" },
      { number: "3", title: "銀行口座開設", duration: "書類準備をサポート" },
      { number: "4", title: "会社登記", duration: "統一番号の取得" },
      { number: "5", title: "税務登記", duration: "初回申告の準備完了" },
    ],
    clientTypes: [
      {
        title: "台湾進出の日系企業",
        description:
          "日系企業とのコミュニケーションや業務習慣に精通し、日本語でのサービスを通じて、台湾での設立・運営をスムーズにサポートします。",
      },
      {
        title: "台湾進出の外資企業",
        description:
          "台湾の会社法及び財務・税務関連法規に精通し、外資企業の台湾における設立・運営に必要な手続きをサポートします。",
      },
      {
        title: "スタートアップ・中小企業",
        description:
          "設立、記帳から日々の財務・税務ニーズまで、実務的でコストパフォーマンスに優れた方法で安定した経営をサポートします。",
      },
    ],
    faqs: [
      {
        question: "台湾で会社を設立する際、外資の出資比率に制限はありますか？",
        answer:
          "多くの業種では外資出資比率に制限はありませんが、金融・電信など一部の特許業種では特定の規制があります。まずは対象業種の適用規定をご確認ください。",
      },
      {
        question: "会社設立には台湾でオフィスを賃借する必要がありますか？",
        answer:
          "必ずしも必要ではありません。登記住所の規定や業種によって対応が異なりますので、個別にご相談ください。",
      },
      {
        question: "資金の送金にはどのくらい時間がかかりますか？どんな書類が必要ですか？",
        answer:
          "送金銀行や審査状況によって異なります。会社登記書類や送金証明書類を早めにご準備いただくことをおすすめします。",
      },
      {
        question: "会社設立後、税務申告で特に注意すべき点はありますか？",
        answer:
          "営利事業所得税の申告、財務諸表監査・税務証明などのコンプライアンス事項にご注意ください。現地規定への理解不足によるリスクを避けるためにも専門家へのご相談をおすすめします。",
      },
      {
        question: "設立を決めてから正式に事業を開始するまで、どのくらいかかりますか？",
        answer:
          "一般的に1〜2ヶ月程度ですが、実際の期間は審査状況や書類の準備状況によって異なります。",
      },
    ],
    siteInfo: {
      firmName: "佾廷会計士事務所",
      email: "chhsu@chiahsin.co",
      phone: "02-29688686",
      line: "@753inpeo",
      address: "220 台湾新北市板橋区莊敬路25巷4弄10号1樓",
    },
    sectionHeaders: {
      services: {
        eyebrow: "コアサービス",
        title: "設立から運営まで、4つのサービス",
        subtitle:
          "会社登記から日々の記帳まで、ワンストップサービスで台湾での事業運営の管理負担を軽減します。",
      },
      process: {
        eyebrow: "設立フロー",
        title: "決定から運営開始まで、5つのステップ",
        subtitle: "一般的に約1〜2ヶ月。実際の期間は業種や書類の準備状況によって異なります。",
        cta: "設立フローの詳細を見る",
      },
      clientTypes: { eyebrow: "対象のお客様", title: "私たちが得意とするお客様タイプ" },
      faq: {
        eyebrow: "よくある質問",
        title: "外資企業からよくいただく5つの質問",
        note:
          "外資設立サービスのほか、当事務所は再生可能エネルギー産業の会計にも長年携わっており、太陽光発電所の設立、売電、税務に関する実務経験を有しています。",
        cta: "詳しく見る",
      },
      cta: {
        title: "台湾で事業を始める準備はできましたか？",
        subtitle:
          "台湾市場への進出をご検討中の方も、すでに設立準備を始められている方も、お気軽にご連絡ください。誠心誠意サポートいたします。",
        cta: "無料相談を予約する",
      },
    },
  },
};

export function getSiteContent(locale: Locale): SiteContent {
  return content[locale];
}
