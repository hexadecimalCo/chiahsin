// Foreign-invested company setup guide, shown at /guide. Structured content
// (not Markdown) since it mixes paragraphs, document checklists, and notes
// in a fixed order per step.

import type { Locale } from "@/i18n/routing";

type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "note"; text: string; linkLabel?: string; href?: string };

type GuideStep = {
  number: string;
  title: string;
  blocks: GuideBlock[];
};

type GuideContent = {
  eyebrow: string;
  title: string;
  intro: string;
  steps: GuideStep[];
};

const content: Record<Locale, GuideContent> = {
  zh: {
    eyebrow: "外商來台指南",
    title: "僑外資公司設立說明",
    intro: "外商／僑外資來台設立公司，大致可分為三個階段。以下整理每個階段要確認的事項與需準備的文件，實際流程仍應依個案狀況與最新法規為準。",
    steps: [
      {
        number: "1",
        title: "公司名稱及營業項目預查",
        blocks: [
          {
            type: "paragraph",
            text: "公司設立之前，要先確定名稱是否有與他人重複及營業項目是否可以營業，若經審查核准通過，將會取得「公司名稱及營業項目預查核准函」。",
          },
          {
            type: "checklist",
            title: "公司須先確定以下事項",
            items: ["公司組織型態（股份有限公司、有限公司或分公司）", "預計負責人"],
          },
          {
            type: "note",
            text: "另外，因經濟部有禁止及限制部分營業項目供僑外資經營，故僑外資來台投資之前請務必確認。",
            linkLabel: "查詢禁止及限制僑外資投資業別項目",
            href: "https://law.moea.gov.tw/LawContent.aspx?id=GL000176",
          },
        ],
      },
      {
        number: "2",
        title: "投資許可、開立銀行籌備戶及資金審定",
        blocks: [
          {
            type: "paragraph",
            text: "依照「外國人投資條例」，外國投資人於投資之前須先經經濟部投資審議司核准其投資事業。",
          },
          {
            type: "checklist",
            title: "公司需準備",
            items: [
              "投資申請書",
              "公司資料及投資計畫內容",
              "外國投資人身分證明文件",
              "代理人授權書（如委託代理人辦理時）",
            ],
          },
          {
            type: "paragraph",
            text: "經投資審議司審查通過後，公司將取得「投資許可函」，其後負責人才可依據投資許可函文、公司名稱及營業項目預查核准函及其他銀行開辦所需文件（各銀行所需應備文件不盡相同，建議可以事前與各銀行聯繫確認）辦理公司銀行籌備戶的開設。",
          },
          {
            type: "paragraph",
            text: "有一點要注意的是，現在為因應洗錢防制法規定，銀行在審查公司戶的條件也越趨嚴格，部分銀行可能會要求需有公司登記租約，故可能在投資許可送審階段就必須先承租辦公室或是登記地址。",
          },
          {
            type: "paragraph",
            text: "另外，若公司預計登記在台北，也必須先行「營業場所預先審查」確認營業項目是否符合台北市都市計畫法及土地使用分區規定。",
          },
          {
            type: "paragraph",
            text: "公司完成銀行籌備戶開設後，始可依照原投資許可函核准投資金額將資金匯入，匯入時須註明匯款性質「310僑外股本投資」。",
          },
          {
            type: "paragraph",
            text: "匯入完成後，需再次申請資金審定，審查完成後將會取得「資金審定核准函」。",
          },
          {
            type: "checklist",
            title: "公司需準備",
            items: ["審定投資額申請書", "匯入匯款通知書", "買匯水單", "公司籌備戶存摺"],
          },
        ],
      },
      {
        number: "3",
        title: "公司設立登記、稅籍登記及銀行轉成正式戶",
        blocks: [
          {
            type: "paragraph",
            text: "外國投資人取得投資審議司的兩份核准函後，才可以正式進行公司登記及稅籍登記作業。",
          },
          {
            type: "checklist",
            title: "公司需準備",
            items: [
              "設立申請書",
              "發起人會議事錄",
              "發起人身分證明文件",
              "公司章程",
              "董事會議事錄",
              "登記地址租約、房屋稅稅單",
              "董監事身分證明文件",
              "董監事願任同意書",
              "會計師資本額查核報告書",
              "設立登記表",
              "其他依法應先經主管機關許可之核准函（如名稱預查核准函、投資許可函及資金審定許可函等，如營業項目包含特許行業，則亦應另行向主管申請核准）",
            ],
          },
          {
            type: "note",
            text: "欲查詢哪些營業項目是否為特許行業，可至經濟部商業發展署確認。",
            linkLabel: "商工登記公示資料查詢服務",
            href: "https://gcis.nat.gov.tw/cod/",
          },
          {
            type: "paragraph",
            text: "待公司登記及國稅局稅籍登記完成後，負責人親自前往國稅局簽名並領取購票證。",
          },
          {
            type: "paragraph",
            text: "國稅局作業完成後，將可攜帶相關文件到銀行辦理將籌備戶轉成正式戶。",
          },
        ],
      },
    ],
  },

  en: {
    eyebrow: "Guide for Foreign Investors",
    title: "Foreign-Invested Company Formation Guide",
    intro: "Setting up a foreign-invested company in Taiwan generally involves three stages. Below is what to confirm and what documents to prepare at each stage — the actual process still depends on your specific case and current regulations.",
    steps: [
      {
        number: "1",
        title: "Company Name & Business Item Pre-Check",
        blocks: [
          {
            type: "paragraph",
            text: "Before forming a company, you must first confirm the proposed name isn't already taken and that the intended business items are permitted. Once approved, you'll receive a \"Company Name and Business Item Pre-Check Approval Letter.\"",
          },
          {
            type: "checklist",
            title: "You'll need to determine",
            items: [
              "Company organization type (company limited by shares, limited company, or branch office)",
              "The proposed responsible person",
            ],
          },
          {
            type: "note",
            text: "Note that the Ministry of Economic Affairs prohibits or restricts foreign/overseas Chinese investment in certain business categories, so be sure to confirm this before investing in Taiwan.",
            linkLabel: "Check prohibited/restricted business categories for foreign investment",
            href: "https://law.moea.gov.tw/LawContent.aspx?id=GL000176",
          },
        ],
      },
      {
        number: "2",
        title: "Investment Approval, Preparatory Bank Account & Fund Verification",
        blocks: [
          {
            type: "paragraph",
            text: "Under the Statute for Investment by Foreign Nationals, foreign investors must obtain approval from the Investment Commission of the Ministry of Economic Affairs before investing.",
          },
          {
            type: "checklist",
            title: "Documents needed",
            items: [
              "Investment application form",
              "Company information and investment plan details",
              "Foreign investor identification documents",
              "Agent authorization letter (if using an agent)",
            ],
          },
          {
            type: "paragraph",
            text: "Once approved by the Investment Commission, the company receives an \"Investment Approval Letter.\" The responsible person can then open a company's preparatory bank account using the Investment Approval Letter, the Company Name and Business Item Pre-Check Approval Letter, and other documents required by the bank (requirements vary by bank, so it's best to confirm with each bank in advance).",
          },
          {
            type: "paragraph",
            text: "One thing to note: due to anti-money-laundering regulations, banks have become stricter when reviewing corporate accounts, and some banks require a company registration lease — meaning you may need to lease office space or register an address even before submitting the investment approval application.",
          },
          {
            type: "paragraph",
            text: "Additionally, if the company plans to register in Taipei City, a \"Business Location Pre-Review\" is required to confirm the business items comply with Taipei City's urban planning and zoning regulations.",
          },
          {
            type: "paragraph",
            text: "Once the preparatory bank account is set up, funds can be remitted in the approved investment amount per the Investment Approval Letter, noting the remittance purpose as \"310 Overseas Chinese/Foreign Equity Investment.\"",
          },
          {
            type: "paragraph",
            text: "After the funds arrive, you must apply for fund verification again. Once reviewed, you'll receive a \"Fund Verification Approval Letter.\"",
          },
          {
            type: "checklist",
            title: "Documents needed",
            items: [
              "Verified investment amount application form",
              "Inbound remittance notice",
              "Foreign exchange settlement receipt",
              "Company preparatory account passbook",
            ],
          },
        ],
      },
      {
        number: "3",
        title: "Company Registration, Tax Registration & Converting to a Regular Bank Account",
        blocks: [
          {
            type: "paragraph",
            text: "Once the foreign investor has both approval letters from the Investment Commission, formal company registration and tax registration can proceed.",
          },
          {
            type: "checklist",
            title: "Documents needed",
            items: [
              "Company formation application form",
              "Promoters' meeting minutes",
              "Promoters' identification documents",
              "Articles of incorporation",
              "Board meeting minutes",
              "Registered address lease and house tax bill",
              "Directors' and supervisors' identification documents",
              "Directors' and supervisors' letters of consent to serve",
              "CPA capital verification report",
              "Company registration form",
              "Other approval letters legally required in advance (e.g. name pre-check approval, investment approval, and fund verification approval letters; if the business items include a specially regulated industry, separate approval from the competent authority is also required)",
            ],
          },
          {
            type: "note",
            text: "To check whether a business item is a specially regulated industry, you can check with the Department of Commerce, Ministry of Economic Affairs.",
            linkLabel: "Commerce Industrial Services Portal",
            href: "https://gcis.nat.gov.tw/cod/",
          },
          {
            type: "paragraph",
            text: "Once company registration and tax registration with the National Taxation Bureau are complete, the responsible person must go to the tax bureau in person to sign and collect the uniform invoice purchase certificate.",
          },
          {
            type: "paragraph",
            text: "After the tax bureau's process is complete, you can bring the relevant documents to the bank to convert the preparatory account into a regular company account.",
          },
        ],
      },
    ],
  },

  ja: {
    eyebrow: "外資進出ガイド",
    title: "僑外資（外国人・華僑）企業の設立ガイド",
    intro: "外資・僑外資企業が台湾で会社を設立する場合、大きく3つの段階に分かれます。以下、各段階で確認すべき事項と必要書類をまとめました。実際の手続きは個別の状況や最新の法規制によって異なります。",
    steps: [
      {
        number: "1",
        title: "会社名称及び営業項目の事前審査",
        blocks: [
          {
            type: "paragraph",
            text: "会社設立の前に、まず名称が他社と重複していないか、また営業項目が営業可能かどうかを確認する必要があります。審査を経て承認されると、「会社名称及び営業項目事前審査承認書」を取得できます。",
          },
          {
            type: "checklist",
            title: "会社としてまず確定すべき事項",
            items: ["会社の組織形態（株式会社、有限会社、または支店）", "予定している代表者"],
          },
          {
            type: "note",
            text: "また、経済部は僑外資による経営を禁止・制限している営業項目を定めていますので、僑外資が台湾へ投資する前には必ずご確認ください。",
            linkLabel: "僑外資投資の禁止・制限業種を確認する",
            href: "https://law.moea.gov.tw/LawContent.aspx?id=GL000176",
          },
        ],
      },
      {
        number: "2",
        title: "投資許可、銀行準備口座の開設及び資金審定",
        blocks: [
          {
            type: "paragraph",
            text: "「外国人投資条例」に基づき、外国投資家は投資を行う前に、経済部投資審議司の投資事業承認を受ける必要があります。",
          },
          {
            type: "checklist",
            title: "会社が準備すべき書類",
            items: [
              "投資申請書",
              "会社資料及び投資計画の内容",
              "外国投資家の身分証明書類",
              "代理人委任状（代理人に手続きを委任する場合）",
            ],
          },
          {
            type: "paragraph",
            text: "投資審議司の審査を通過すると、会社は「投資許可書」を取得できます。その後、代表者は投資許可書、会社名称及び営業項目事前審査承認書、その他銀行が開設に必要とする書類（必要書類は銀行によって異なるため、事前に各銀行へ確認することをおすすめします）に基づき、会社の銀行準備口座の開設手続きを行うことができます。",
          },
          {
            type: "paragraph",
            text: "一点注意すべき点として、現在マネーロンダリング防止法の規定に対応するため、銀行による法人口座の審査条件も厳格化しており、一部の銀行では会社登記用の賃貸契約書の提示を求められる場合があります。そのため、投資許可の申請段階で、あらかじめオフィスを賃借するか登記住所を確保しておく必要が生じることがあります。",
          },
          {
            type: "paragraph",
            text: "また、会社を台北市に登記する予定の場合は、「営業場所事前審査」を先に行い、営業項目が台北市都市計画法及び土地利用区分規定に適合しているかを確認する必要があります。",
          },
          {
            type: "paragraph",
            text: "会社の銀行準備口座の開設が完了した後、投資許可書に承認された投資金額に基づき資金を送金できます。送金の際は、送金目的を「310僑外股本投資」と明記する必要があります。",
          },
          {
            type: "paragraph",
            text: "資金の送金が完了した後、改めて資金審定を申請する必要があり、審査完了後に「資金審定承認書」を取得できます。",
          },
          {
            type: "checklist",
            title: "会社が準備すべき書類",
            items: [
              "審定投資額申請書",
              "送金通知書",
              "外貨買取計算書",
              "会社準備口座の通帳",
            ],
          },
        ],
      },
      {
        number: "3",
        title: "会社設立登記、税籍登記及び銀行口座の正式口座への切り替え",
        blocks: [
          {
            type: "paragraph",
            text: "外国投資家が投資審議司からの2通の承認書を取得した後、正式に会社登記及び税籍登記の手続きを進めることができます。",
          },
          {
            type: "checklist",
            title: "会社が準備すべき書類",
            items: [
              "設立申請書",
              "発起人会議事録",
              "発起人の身分証明書類",
              "会社定款",
              "取締役会議事録",
              "登記住所の賃貸契約書及び家屋税の納税通知書",
              "取締役及び監査役の身分証明書類",
              "取締役及び監査役の就任承諾書",
              "会計士による資本金査定報告書",
              "設立登記表",
              "その他法令上あらかじめ主管機関の許可が必要な承認書（名称事前審査承認書、投資許可書及び資金審定承認書など。営業項目に特許業種が含まれる場合は、別途主管機関への申請・承認も必要）",
            ],
          },
          {
            type: "note",
            text: "営業項目が特許業種に該当するかどうかは、経済部商業発展署にて確認できます。",
            linkLabel: "商工登記公示資料照会サービス",
            href: "https://gcis.nat.gov.tw/cod/",
          },
          {
            type: "paragraph",
            text: "会社登記及び国税局への税籍登記が完了した後、代表者本人が国税局へ出向き、署名の上、統一発票購入証を受け取ります。",
          },
          {
            type: "paragraph",
            text: "国税局での手続きが完了した後、関連書類を持参して銀行にて準備口座を正式口座へ切り替える手続きを行うことができます。",
          },
        ],
      },
    ],
  },
};

export function getGuideContent(locale: Locale) {
  return content[locale];
}
