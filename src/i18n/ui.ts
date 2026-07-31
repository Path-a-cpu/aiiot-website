import type { Lang } from './config';

// 翻译字典：新增语言时在 languages（config.ts）登记，并在这里加一组
// 已按上海数采物联网科技有限公司真实信息填写（中/英/德）
export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    'nav.cta': 'Get a Quote',

    'hero.title': 'Industrial IoT Solutions Expert',
    'hero.subtitle':
      'DAQ-IOT delivers wireless sensors, data acquisition & monitoring systems, SCADA systems, and energy management platforms for smart manufacturing and new energy.',
    'hero.ctaPrimary': 'Get a Quote',
    'hero.ctaSecondary': 'View Products',

    'features.title': 'Why DAQ-IOT',
    'features.subtitle': 'National high-tech enterprise focused on industrial IoT and digital transformation',
    'feature1Title': 'National High-Tech Enterprise',
    'feature1Desc': 'Certified national high-tech company with R&D strength in industrial IoT.',
    'feature2Title': 'End-to-End IoT Solutions',
    'feature2Desc': 'From wireless sensors to SCADA and EMS platforms, we cover the full stack.',
    'feature3Title': 'Smart Manufacturing',
    'feature3Desc': 'Digital factory solutions that improve efficiency and reduce downtime.',
    'feature4Title': 'New Energy Monitoring',
    'feature4Desc': 'PV and renewable energy monitoring systems for sustainable operations.',
    'feature5Title': 'Multi-Region Service',
    'feature5Desc': 'Service centers in Shanghai, Henan, Zhengzhou and Bangladesh.',
    'feature6Title': 'Fast Response',
    'feature6Desc': 'Dedicated team replies to inquiries within 24 hours. Hotline: 400-9677-032.',

    'cta.title': 'Start Your Smart Factory Project',
    'cta.subtitle': 'Send your requirements and get a tailored IoT solution quote within 24 hours.',
    'cta.button': 'Contact Us Now',

    'about.title': 'About DAQ-IOT',
    'about.p1':
      'Shanghai DAQ-IOT Technology Co., Ltd. is a national high-tech enterprise specializing in industrial IoT and enterprise digital transformation. We provide wireless sensors, data acquisition & monitoring systems, SCADA systems, energy management platforms and more.',
    'about.p2':
      'Our solutions serve smart manufacturing, PV new energy and other industries. With service locations in Shanghai, Henan, Zhengzhou and Bangladesh, we support global clients with reliable products and local service.',
    'about.p3':
      'Contact us at business@daq-iot.com or call 400-9677-032. Our team is ready to help you build a smarter, more connected operation.',

    'products.title': 'Products & Solutions',
    'products.subtitle': 'Industrial IoT hardware and software for data acquisition, monitoring and management',
    'product1Name': 'Wireless Sensors',
    'product1Desc': 'Temperature, humidity, pressure, vibration and other industrial wireless sensors for harsh environments.',
    'product2Name': 'Data Acquisition & Monitoring System',
    'product2Desc': 'Real-time data collection, remote monitoring and alarm management for equipment and environment.',
    'product3Name': 'SCADA System',
    'product3Desc': 'Supervisory control and data acquisition platform for production lines and utilities.',
    'product4Name': 'Energy Management Platform (EMS)',
    'product4Desc': 'Monitor energy consumption, optimize efficiency and reduce costs for factories and buildings.',
    'product5Name': 'Smart Manufacturing Solutions',
    'product5Desc': 'Digital factory solutions including OEE, equipment connectivity and production visualization.',
    'product6Name': 'PV & New Energy Monitoring',
    'product6Desc': 'Solar PV and renewable energy monitoring systems with cloud dashboards.',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Tell us what you need — we usually reply within 24 hours.',
    'contact.infoTitle': 'Contact Information',
    'contact.name': 'Your Name',
    'contact.email': 'Email',
    'contact.company': 'Company',
    'contact.message': 'Your Message',
    'contact.submit': 'Send Inquiry',
    'contact.success': 'Thank you! We will contact you within 24 hours.',
    'contact.phone': 'Phone',
    'contact.mobile': 'Mobile / WhatsApp',
    'contact.person': 'Contact Person',
    'contact.address': 'Address',

    'footer.contact': 'Contact',
    'footer.rights': 'Copyright © 2021-2025 DAQ-IOT Technology. All Rights Reserved.',
    'footer.tagline': 'Making Data Collection Simpler.',
  },

  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.products': '产品中心',
    'nav.contact': '联系我们',
    'nav.cta': '获取报价',

    'hero.title': '工业物联网解决方案专家',
    'hero.subtitle':
      'DAQ-IOT 数采物联提供无线传感器、数据采集监控系统、SCADA系统、能源管理平台等解决方案，服务智能制造与光伏新能源。',
    'hero.ctaPrimary': '获取报价',
    'hero.ctaSecondary': '查看产品',

    'features.title': '为什么选择数采物联',
    'features.subtitle': '国家级高新技术企业，专注工业物联网与企业数字化转型',
    'feature1Title': '国家级高新技术企业',
    'feature1Desc': '拥有工业物联网领域研发实力，通过国家级高新技术企业认证。',
    'feature2Title': '工业物联网全栈方案',
    'feature2Desc': '从无线传感器到SCADA、EMS平台，覆盖数据采集到管理的完整链路。',
    'feature3Title': '智能制造',
    'feature3Desc': '数字化工厂解决方案，提升生产效率，降低设备停机风险。',
    'feature4Title': '新能源监控',
    'feature4Desc': '光伏及新能源监控系统，助力可持续运营。',
    'feature5Title': '多地服务网络',
    'feature5Desc': '服务网点覆盖上海、河南、郑州及孟加拉，支持全球客户。',
    'feature6Title': '快速响应',
    'feature6Desc': '专业团队24小时内回复询盘，咨询热线：400-9677-032。',

    'cta.title': '开启您的智能工厂项目',
    'cta.subtitle': '发送需求，24小时内获取定制化物联网解决方案报价。',
    'cta.button': '立即联系我们',

    'about.title': '关于数采物联',
    'about.p1':
      '上海数采物联网科技有限公司是国家级高新技术企业，专注于工业物联网和企业数字化转型，提供无线传感器、数据采集监控系统、SCADA系统、能源管理平台等解决方案。',
    'about.p2':
      '公司服务智能制造、光伏新能源等领域，在上海、河南、郑州及孟加拉设有服务网点，为全球客户提供可靠产品与本地化服务。',
    'about.p3':
      '欢迎通过 business@daq-iot.com 或 400-9677-032 与我们联系，王亚乐及专业团队将竭诚为您服务。',

    'products.title': '产品与解决方案',
    'products.subtitle': '面向数据采集、监控与管理的工业物联网软硬件产品',
    'product1Name': '无线传感器',
    'product1Desc': '温湿度、压力、振动等工业级无线传感器，适配复杂现场环境。',
    'product2Name': '数据采集监控系统',
    'product2Desc': '设备与环境实时数据采集、远程监控与告警管理。',
    'product3Name': 'SCADA系统',
    'product3Desc': '面向生产线与公辅设备的监控组态与数据采集平台。',
    'product4Name': '能源管理平台（EMS）',
    'product4Desc': '工厂与建筑能耗监测、能效优化与成本分析。',
    'product5Name': '智能制造解决方案',
    'product5Desc': '数字化工厂解决方案，包括OEE、设备联网与生产可视化。',
    'product6Name': '光伏新能源监控',
    'product6Desc': '光伏电站及新能源监控系统，支持云端看板。',

    'contact.title': '联系我们',
    'contact.subtitle': '告诉我们您的需求，通常 24 小时内回复。',
    'contact.infoTitle': '联系信息',
    'contact.name': '您的姓名',
    'contact.email': '电子邮箱',
    'contact.company': '公司名称',
    'contact.message': '留言内容',
    'contact.submit': '提交询盘',
    'contact.success': '感谢您的咨询！我们将在 24 小时内与您联系。',
    'contact.phone': '电话',
    'contact.mobile': '手机 / WhatsApp',
    'contact.person': '联系人',
    'contact.address': '地址',

    'footer.contact': '联系方式',
    'footer.rights': 'Copyright © 2021-2025 DAQ-IOT Technology 版权所有。',
    'footer.tagline': '让数据采集更简单。',
  },

  de: {
    'nav.home': 'Start',
    'nav.about': 'Über uns',
    'nav.products': 'Produkte',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Angebot anfordern',

    'hero.title': 'Experte für industrielle IoT-Lösungen',
    'hero.subtitle':
      'DAQ-IOT bietet kabellose Sensoren, Datenerfassungs- und Überwachungssysteme, SCADA-Systeme und Energiemanagementplattformen für intelligente Fertigung und erneuerbare Energien.',
    'hero.ctaPrimary': 'Angebot anfordern',
    'hero.ctaSecondary': 'Produkte ansehen',

    'features.title': 'Warum DAQ-IOT',
    'features.subtitle': 'National High-Tech-Unternehmen, spezialisiert auf industrielles IoT und digitale Transformation',
    'feature1Title': 'National High-Tech-Unternehmen',
    'feature1Desc': 'Zertifiziertes High-Tech-Unternehmen mit F&E-Kompetenz im industriellen IoT.',
    'feature2Title': 'End-to-End IoT-Lösungen',
    'feature2Desc': 'Von kabellosen Sensoren bis zu SCADA- und EMS-Plattformen decken wir die gesamte Kette ab.',
    'feature3Title': 'Intelligente Fertigung',
    'feature3Desc': 'Lösungen für die digitale Fabrik zur Effizienzsteigerung und Verringerung von Ausfallzeiten.',
    'feature4Title': 'Neue-Energie-Überwachung',
    'feature4Desc': 'Überwachungssysteme für Photovoltaik und erneuerbare Energien für nachhaltigen Betrieb.',
    'feature5Title': 'Multi-Region-Service',
    'feature5Desc': 'Servicestandorte in Shanghai, Henan, Zhengzhou und Bangladesch.',
    'feature6Title': 'Schnelle Reaktion',
    'feature6Desc': 'Dediziertes Team antwortet innerhalb von 24 Stunden. Hotline: 400-9677-032.',

    'cta.title': 'Starten Sie Ihr Smart-Factory-Projekt',
    'cta.subtitle': 'Senden Sie Ihre Anforderungen und erhalten Sie innerhalb von 24 Stunden ein maßgeschneidertes IoT-Angebot.',
    'cta.button': 'Jetzt kontaktieren',

    'about.title': 'Über DAQ-IOT',
    'about.p1':
      'Die Shanghai DAQ-IOT Technology Co., Ltd. ist ein nationales High-Tech-Unternehmen, das auf industrielles IoT und digitale Unternehmenstransformation spezialisiert ist. Wir bieten kabellose Sensoren, Datenerfassungs- und Überwachungssysteme, SCADA-Systeme, Energiemanagementplattformen und mehr.',
    'about.p2':
      'Unsere Lösungen dienen der intelligenten Fertigung, der PV-Neuenergie und weiteren Branchen. Mit Standorten in Shanghai, Henan, Zhengzhou und Bangladesch unterstützen wir globale Kunden mit zuverlässigen Produkten und lokalem Service.',
    'about.p3':
      'Kontaktieren Sie uns unter business@daq-iot.com oder rufen Sie 400-9677-032 an. Unser Team hilft Ihnen gerne bei der Gestaltung einer intelligenteren, vernetzten Produktion.',

    'products.title': 'Produkte & Lösungen',
    'products.subtitle': 'Industrielle IoT-Hardware und -Software für Datenerfassung, Überwachung und Management',
    'product1Name': 'Kabellose Sensoren',
    'product1Desc': 'Temperatur-, Feuchtigkeits-, Druck- und Vibrationssensoren für rauhe Industrieumgebungen.',
    'product2Name': 'Datenerfassungs- und Überwachungssystem',
    'product2Desc': 'Echtzeit-Datenerfassung, Fernüberwachung und Alarmmanagement für Anlagen und Umgebung.',
    'product3Name': 'SCADA-System',
    'product3Desc': 'Leit- und Überwachungssystem für Produktionslinien und Betriebsmittel.',
    'product4Name': 'Energiemanagementplattform (EMS)',
    'product4Desc': 'Überwachung des Energieverbrauchs, Optimierung der Effizienz und Kostensenkung für Fabriken und Gebäude.',
    'product5Name': 'Lösungen für intelligente Fertigung',
    'product5Desc': 'Lösungen für die digitale Fabrik inkl. OEE, Anlagenvernetzung und Produktionsvisualisierung.',
    'product6Name': 'PV- und Neue-Energie-Überwachung',
    'product6Desc': 'Überwachungssysteme für Photovoltaik und erneuerbare Energien mit Cloud-Dashboards.',

    'contact.title': 'Kontakt',
    'contact.subtitle': 'Teilen Sie uns Ihr Bedarf mit – meist antworten wir innerhalb von 24 Stunden.',
    'contact.infoTitle': 'Kontaktinformationen',
    'contact.name': 'Ihr Name',
    'contact.email': 'E-Mail',
    'contact.company': 'Unternehmen',
    'contact.message': 'Ihre Nachricht',
    'contact.submit': 'Anfrage senden',
    'contact.success': 'Danke! Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    'contact.phone': 'Telefon',
    'contact.mobile': 'Mobil / WhatsApp',
    'contact.person': 'Ansprechpartner',
    'contact.address': 'Adresse',

    'footer.contact': 'Kontakt',
    'footer.rights': 'Copyright © 2021-2025 DAQ-IOT Technology. Alle Rechte vorbehalten.',
    'footer.tagline': 'Datenerfassung einfacher machen.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
