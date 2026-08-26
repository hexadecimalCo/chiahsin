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
  article25Promo: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
    href: string;
  };
  processSteps: Array<{ number: string; title: string; duration: string }>;
  clientTypes: Array<{ title: string; description: string }>;
  renewableNote: string;
  about: {
    name: string;
    role: string;
    languages: string;
    bio: string;
    credentialGroups: Array<{ label: string; items: string[] }>;
  };
  faqs: Array<{
    question: string;
    answer: Array<{ text: string; linkText?: string; href?: string }>;
  }>;
  siteInfo: {
    firmName: string;
    email: string;
    phone: string;
    line: string;
    address: string;
    hours: string;
    languages: string;
  };
  sectionHeaders: {
    services: { eyebrow: string; title: string; subtitle: string };
    process: { eyebrow: string; title: string; subtitle: string; cta: string };
    clientTypes: { eyebrow: string; title: string };
    about: { eyebrow: string; title: string };
    faq: { eyebrow: string; title: string };
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
    article25Promo: {
      eyebrow: "所得稅法 §25 申請服務",
      title: "在台技術服務收入，核准後按 15% 計算所得額",
      description: "已協助日本、越南企業完成申請並獲准適用。",
      linkLabel: "查看申請實績",
      href: "/tax-incentive",
    },
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
    renewableNote:
      "除了外商設立服務，本所也深耕再生能源產業會計多年，具備太陽光電廠設立、售電及稅務相關實務經驗。",
    about: {
      name: "徐嘉欣",
      role: "佾廷會計師事務所 會計師",
      languages: "中文 · 日本語 · English",
      bio: "曾於安侯建業日本業務組與勤業眾信服務，熟悉日商與外資企業的溝通方式與查核要求，現專注協助外商在台設立、稅務簽證與帳務管理。",
      credentialGroups: [
        {
          label: "公會職務",
          items: [
            "中華稅務代理人協會 理事",
            "會計師全國聯合會智庫服務委員會 執行長",
            "會計師全國聯合會公共政策委員會 委員",
          ],
        },
        {
          label: "公部門輪值",
          items: [
            "經濟部商業司 輪值會計師",
            "新北市經濟發展局 輪值會計師",
            "北區國稅局 輪值會計師",
          ],
        },
        {
          label: "事務所經歷",
          items: [
            "安侯建業聯合會計師事務所 日本業務組 副理",
            "勤業眾信聯合會計師事務所 查帳員",
          ],
        },
        {
          label: "專業訓練與學歷",
          items: ["企業評價專業訓練 合格", "東吳大學會計系"],
        },
      ],
    },
    faqs: [
      {
        question: "外國公司擬來臺設立一家公司有無最低資本額？",
        answer: [
          {
            text: "外國投資人如擬來臺投資新設一家公司，無論投資金額多寡，均應填具申請書並檢附相關附件，事先向經濟部投資審議司提出申請。",
          },
          {
            text: "目前公司法已取消最低資本額之規定，所以外國投資人申請來臺設立公司，其投資金額無最低限額之限制，惟如果國內公司經營之業務涉及特許行業，可另向目的事業主管機關洽詢有關業務之經營規範及有否最低資本額上之限制。",
          },
        ],
      },
      {
        question: "一定要在台灣租賃辦公室才能設立公司嗎？",
        answer: [
          {
            text: "是的，辦理公司登記皆須登記地址。若設籍於台北市，應先行「營業場所預先審查」確認營業項目是否符合台北市都市計畫法及土地使用分區規定。",
            linkText: "營業場所預先審查",
            href: "https://www.businesslocationinfo.gov.taipei/BLBQS/",
          },
        ],
      },
      {
        question: "外國投資人來臺投資有無投資業別之限制？",
        answer: [
          {
            text: "依據「外國人投資條例」第7條第2項規定及同條第3項規定，行政院發布實施「僑外投資負面表列－禁止及限制僑外人投資業別項目」。因此，投資人不得投資禁止類之業別項目，如擬投資於限制投資之業別項目，投資審議司受理時將送請各目的事業主管機關審查，並需取得各該目的事業主管機關之許可或同意後，始得核准投資。",
          },
        ],
      },
      {
        question: "外資設立公司後，稅務申報有什麼要特別注意的？",
        answer: [
          { text: "需留意營業稅、營所稅申報及年度扣繳申報。" },
          { text: "若公司有需要財務簽證與稅務簽證，也建議事前與合作會計師做溝通確認。" },
        ],
      },
      {
        question: "從決定設立到正式營運，大約需要多久時間？",
        answer: [{ text: "一般約需 1-2 個月，實際時程依審查與文件齊備度而有所不同。" }],
      },
    ],
    siteInfo: {
      firmName: "佾廷會計師事務所",
      email: "chhsu@chiahsin.co",
      phone: "02-29688686",
      line: "@753inpeo",
      address: "220 新北市板橋區莊敬路25巷4弄10號1樓",
      hours: "週一至週五 09:00–18:00",
      languages: "中文 · 日本語 · English",
    },
    sectionHeaders: {
      services: {
        eyebrow: "核心服務",
        title: "五大服務，涵蓋設立到營運的每一步",
        subtitle: "從公司登記到日常帳務，我們提供一站式服務，降低外商在台展業的行政負擔。",
      },
      process: {
        eyebrow: "設立流程",
        title: "從決定到營運，五個階段",
        subtitle: "一般約需 1-2 個月，實際時程依產業別與文件備齊速度而有所不同。",
        cta: "查看完整流程",
      },
      clientTypes: { eyebrow: "適合對象", title: "我們熟悉的客戶類型" },
      about: { eyebrow: "ABOUT CHIA HSIN", title: "關於徐嘉欣會計師" },
      faq: {
        eyebrow: "常見問題",
        title: "外商最常問的五個問題",
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
    article25Promo: {
      eyebrow: "ARTICLE 25 TAX INCENTIVE",
      title: "Technical service income in Taiwan — taxed on 15% of revenue once approved",
      description: "We have helped Japanese and Vietnamese companies complete applications and secure approval.",
      linkLabel: "View our track record",
      href: "/tax-incentive",
    },
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
    renewableNote:
      "Beyond foreign investment services, we've spent years in renewable energy accounting, with hands-on experience in solar plant setup, power sales and related tax matters.",
    about: {
      name: "Chia-Hsin Hsu",
      role: "Certified Public Accountant, Yi Ting Accounting Firm",
      languages: "Chinese · Japanese · English",
      bio: "Chia-Hsin previously worked in KPMG Taiwan's Japan Business Group and at Deloitte Taiwan, and is well versed in the communication style and audit requirements of Japanese and foreign-invested companies. She now focuses on helping foreign investors set up in Taiwan, tax certification, and bookkeeping.",
      credentialGroups: [
        {
          label: "Association Roles",
          items: [
            "Director, Chinese Association of Tax Agents",
            "Executive Director, Think Tank Service Committee, National Federation of CPA Associations, R.O.C.",
            "Member, Public Policy Committee, National Federation of CPA Associations, R.O.C.",
          ],
        },
        {
          label: "Public Sector Rotations",
          items: [
            "Rotating Accountant, Department of Commerce, Ministry of Economic Affairs",
            "Rotating Accountant, New Taipei City Economic Development Department",
            "Rotating Accountant, National Taxation Bureau of the Northern Area",
          ],
        },
        {
          label: "Firm Experience",
          items: [
            "Assistant Manager, Japan Business Group, KPMG Taiwan",
            "Auditor, Deloitte Taiwan",
          ],
        },
        {
          label: "Training & Education",
          items: ["Certified, Professional Training in Business Valuation", "B.A. in Accounting, Soochow University"],
        },
      ],
    },
    faqs: [
      {
        question: "Is there a minimum capital requirement for a foreign company to set up a company in Taiwan?",
        answer: [
          {
            text: "Foreign investors planning to invest in and establish a new company in Taiwan must complete an application form with the required supporting documents and submit it in advance to the Investment Review Department, Ministry of Economic Affairs, regardless of the investment amount.",
          },
          {
            text: "The Company Act no longer sets a minimum capital requirement, so there is no minimum limit on the investment amount for foreign investors setting up a company in Taiwan. However, if the local company's business involves a regulated industry, you should also check with the relevant competent authority regarding business operation rules and any minimum capital requirements that may apply.",
          },
        ],
      },
      {
        question: "Do I need to lease an office in Taiwan to register a company?",
        answer: [
          {
            text: "Yes — company registration always requires a registered address. If the company will be registered in Taipei City, you must first complete a “Business Location Pre-Review” to confirm that the business activities comply with Taipei City's urban planning law and zoning regulations.",
            linkText: "Business Location Pre-Review",
            href: "https://www.businesslocationinfo.gov.taipei/BLBQS/",
          },
        ],
      },
      {
        question: "Are there any restrictions on the industries foreign investors can invest in?",
        answer: [
          {
            text: "Under Article 7, Paragraphs 2 and 3 of the \"Statute for Investment by Foreign Nationals,\" the Executive Yuan has published and implemented the \"Negative List for Overseas Chinese and Foreign Investment — Prohibited and Restricted Industries.\" Investors may not invest in industries on the prohibited list. For industries on the restricted list, the Investment Review Department will refer the application to the relevant competent authorities for review, and approval will only be granted once the required permits or consents from those authorities have been obtained.",
          },
        ],
      },
      {
        question: "What should I watch out for with tax filing after setting up?",
        answer: [
          {
            text: "Pay attention to business tax filing, corporate income tax filing, and annual withholding tax filing.",
          },
          {
            text: "If your company needs financial or tax certification, we also recommend confirming the details with your accountant in advance.",
          },
        ],
      },
      {
        question: "How long does it take from decision to full operation?",
        answer: [
          {
            text: "Typically about 1–2 months, though actual timing depends on review and document readiness.",
          },
        ],
      },
    ],
    siteInfo: {
      firmName: "Yi Ting Accounting Firm",
      email: "chhsu@chiahsin.co",
      phone: "02-29688686",
      line: "@753inpeo",
      address: "1F., No. 10, Aly. 4, Ln. 25, Zhuangjing Rd., Banqiao Dist., New Taipei City, Taiwan 220",
      hours: "Mon–Fri, 09:00–18:00",
      languages: "Chinese · Japanese · English",
    },
    sectionHeaders: {
      services: {
        eyebrow: "CORE SERVICES",
        title: "Five Services Covering Setup Through Operations",
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
      about: { eyebrow: "ABOUT CHIA HSIN", title: "About Chia Hsin, CPA" },
      faq: {
        eyebrow: "FAQ",
        title: "Five Questions Foreign Investors Ask Most",
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
    article25Promo: {
      eyebrow: "所得税法 §25 申請サービス",
      title: "台湾での技術サービス収入、承認後は収入の15%を所得額として計算",
      description: "日本、ベトナム企業の申請を完了し、適用の承認を得ています。",
      linkLabel: "申請実績を見る",
      href: "/tax-incentive",
    },
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
    renewableNote:
      "外資設立サービスのほか、当事務所は再生可能エネルギー産業の会計にも長年携わっており、太陽光発電所の設立、売電、税務に関する実務経験を有しています。",
    about: {
      name: "徐 嘉欣",
      role: "佾廷会計士事務所 会計士",
      languages: "中国語 · 日本語 · English",
      bio: "KPMG台湾の日本業務グループおよびデロイト台湾での勤務経験があり、日系企業や外資系企業とのコミュニケーションスタイルや監査要件に精通。現在は外資系企業の台湾進出支援、税務証明、記帳代行を中心に対応しています。",
      credentialGroups: [
        {
          label: "公会での役職",
          items: [
            "中華税務代理人協会 理事",
            "会計師全国連合会シンクタンクサービス委員会 執行長",
            "会計師全国連合会公共政策委員会 委員",
          ],
        },
        {
          label: "公的機関での輪番",
          items: [
            "経済部商業司 輪番会計士",
            "新北市経済発展局 輪番会計士",
            "北区国税局 輪番会計士",
          ],
        },
        {
          label: "事務所での経歴",
          items: ["KPMG台湾 日本業務グループ 副理", "デロイト台湾 監査担当"],
        },
        {
          label: "専門研修・学歴",
          items: ["企業価値評価専門研修 修了", "東吳大学会計学科 卒業"],
        },
      ],
    },
    faqs: [
      {
        question: "外国企業が台湾で会社を設立する場合、最低資本金はありますか？",
        answer: [
          {
            text: "外国投資家が台湾で新たに会社を設立して投資を行う場合、投資金額の多寡にかかわらず、申請書および関連書類を作成のうえ、事前に経済部投資審議司へ申請する必要があります。",
          },
          {
            text: "現在、会社法では最低資本金の規定が廃止されているため、外国投資家が台湾で会社を設立する際の投資金額に最低限度額の制限はありません。ただし、国内会社の事業が特許業種に該当する場合は、当該事業の主管機関に業務運営に関する規範や最低資本金の制限の有無について別途確認することをお勧めします。",
          },
        ],
      },
      {
        question: "会社設立には台湾でオフィスを賃借する必要がありますか？",
        answer: [
          {
            text: "はい、会社登記には必ず登記住所が必要です。台北市に登記する場合は、まず「営業場所事前審査」を行い、営業項目が台北市都市計画法及び土地使用区分規定に適合しているかを確認する必要があります。",
            linkText: "営業場所事前審査",
            href: "https://www.businesslocationinfo.gov.taipei/BLBQS/",
          },
        ],
      },
      {
        question: "外国投資家が台湾に投資する場合、投資可能な業種に制限はありますか？",
        answer: [
          {
            text: "「外国人投資条例」第7条第2項および第3項の規定に基づき、行政院は「僑外投資ネガティブリスト－禁止及び制限業種項目」を公布・施行しています。そのため、投資家は禁止業種項目への投資はできません。制限業種項目への投資を計画する場合、投資審議司は申請受理時に各目的事業主管機関へ審査を委託し、当該主管機関の許可又は同意を得た後にはじめて投資が承認されます。",
          },
        ],
      },
      {
        question: "会社設立後、税務申告で特に注意すべき点はありますか？",
        answer: [
          { text: "営業税、営利事業所得税の申告及び年度源泉徴収申告にご注意ください。" },
          {
            text: "財務諸表監査や税務証明が必要な場合は、事前に顧問会計士とご相談・ご確認いただくことをお勧めします。",
          },
        ],
      },
      {
        question: "設立を決めてから正式に事業を開始するまで、どのくらいかかりますか？",
        answer: [
          {
            text: "一般的に1〜2ヶ月程度ですが、実際の期間は審査状況や書類の準備状況によって異なります。",
          },
        ],
      },
    ],
    siteInfo: {
      firmName: "佾廷会計士事務所",
      email: "chhsu@chiahsin.co",
      phone: "02-29688686",
      line: "@753inpeo",
      address: "220 台湾新北市板橋区莊敬路25巷4弄10号1樓",
      hours: "月〜金 09:00〜18:00",
      languages: "中国語 · 日本語 · English",
    },
    sectionHeaders: {
      services: {
        eyebrow: "コアサービス",
        title: "設立から運営まで、5つのサービス",
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
      about: { eyebrow: "ABOUT CHIA HSIN", title: "徐嘉欣 会計士について" },
      faq: {
        eyebrow: "よくある質問",
        title: "外資企業からよくいただく5つの質問",
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
