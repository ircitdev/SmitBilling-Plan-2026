import { Competitor, MatrixRow, Recommendation, RoadmapItem, PriceTier, MarketSegment, SormChecklistItem, MarketGrowthYearData, CompetitiveRadarMetric, PositioningData, ConclusionData, ThreatRisk } from '../types';

export const METADATA = {
  version: '1.3 от 30.08.2026',
  build: 'Build 2286',
  marketVolume: '5.28 млрд ₽',
  marketGrowth: '+12% в год',
  icp: 'малые ISP 500–5 000 клиентов',
  author: 'Александр Успешный',
  authorTelegram: 'https://t.me/uspeshnyy',
  authorPhoto: 'https://storage.googleapis.com/uspeshnyy-projects/smit/billing/plan2026/usp.jpg',
  reportPath: 'dev_reports/Документация/2026-05-13_Анализ_конкурентов_российский_рынок_биллинга.md',
  audioUrl: 'https://storage.googleapis.com/uspeshnyy-projects/smit/billing/audio/podcast_ai_smit_billing.m4a',
  googleDocUrl: 'https://docs.google.com/document/d/1w8h3y4DYf5q5O1f4IIx9XJERBLrCszsEIzryXwbwsX8/edit?usp=sharing',
  landingUrl: 'https://billing.smit34.ru/',
  docsUrl: 'https://docs.billing.smit34.ru/',
  roadmapUrl: 'https://billing.smit34.ru/plan2026/roadmap/',
  graphUrl: 'https://docs.billing.smit34.ru/understand/',
  licenseServerUrl: 'https://license.billing.smit34.ru',
  demoUrl: 'https://demo.billing.smit34.ru'
};

export const POSITIONING_DATA: PositioningData = {
  oneSentence:
    'СмИТ Биллинг — современная биллинг-система для малых и средних ISP с встроенным AI-агентом, мобильным приложением нового поколения и собственными Поддержкой и CRM. Без legacy наследия, на современном стеке Python/Django, с готовой миграцией из Carbon 4, Mikbill, UTM5.',
  author: {
    name: 'Александр Успешный',
    initials: 'АУ',
    role: 'автор плана',
    versionDate: 'версия 1.3 от 30.08.2026'
  },
  taglines: [
    '«Биллинг для провайдера, который не боится завтрашнего дня»',
    '«Современный биллинг с AI поддержкой ваших клиентов»',
    '«СмИТ Биллинг — биллинг провайдера в эпоху ChatGPT»'
  ],
  icps: [
    {
      id: 'icp1',
      name: 'ICP1: Mikbill',
      isStar: true,
      audienceRange: '500-2000',
      marketPotential: '50-100 в РФ',
      pricingRecommendation: '«Старт» 99k + 1–2 модуля ≈ 99–159k ₽/год.',
      strategyHighlight: 'Мигратор + демо AI.',
      badge: 'Цель №1'
    },
    {
      id: 'icp2',
      name: 'ICP2: МКС / коттеджи',
      isStar: false,
      audienceRange: '200-1000',
      marketPotential: '100+',
      pricingRecommendation: '«Старт» 99k ₽/год.',
      strategyHighlight: 'Сертификат СОРМ не нужен — продаём уже сегодня.'
    },
    {
      id: 'icp3',
      name: 'ICP3: Региональный ISP',
      isStar: false,
      audienceRange: '3000-10000',
      marketPotential: '30-50',
      pricingRecommendation: '«Pro» 249k / «Бизнес» 379k ₽/год.',
      strategyHighlight: 'Конкурируем с Carbon на AI и UX.'
    },
    {
      id: 'icp4',
      name: 'ICP4: Городской с UTM5',
      isStar: false,
      audienceRange: '5000-15000',
      marketPotential: '50+',
      pricingRecommendation: '«Бизнес» 379k / «Enterprise» 499k ₽/год.',
      strategyHighlight: 'После сертификации СОРМ.'
    }
  ],
  salesFunnel: [
    {
      step: 1,
      stage: 'Awareness',
      description: 'Telegram-каналы провайдеров, NAG.ru, Habr'
    },
    {
      step: 2,
      stage: 'Interest',
      description: 'Demo-видео на YouTube, AI-демонстрация'
    },
    {
      step: 3,
      stage: 'Consideration',
      description: 'Live-demo + проба на их данных'
    },
    {
      step: 4,
      stage: 'Decision',
      description: 'пилот 6 месяцев + бесплатная миграция данных'
    },
    {
      step: 5,
      stage: 'Retention',
      description: 'AI-поддержка + ежеквартальные обновления'
    }
  ],
  marketingQuickWins: [
    {
      step: 1,
      title: 'Demo-аккаунт на demo.billing.smit34.ru с реалистичными данными',
      actionUrl: 'https://demo.billing.smit34.ru',
      actionLabel: 'Открыть demo.billing.smit34.ru'
    },
    {
      step: 2,
      title: 'Калькулятор цены на сайте: тариф + модули → годовая цена',
      actionLabel: 'Открыть калькулятор'
    },
    {
      step: 3,
      title: 'Comparison page «СмИТ vs Carbon / UTM5 / Mikbill»',
      actionLabel: 'Сравнить в матрице'
    },
    {
      step: 4,
      title: 'YouTube канал с разборами фич + tutorials',
      actionUrl: 'https://youtube.com',
      actionLabel: 'Смотреть обзоры'
    },
    {
      step: 5,
      title: 'Telegram-канал разработки (твиттер-стиль)',
      actionUrl: 'https://t.me/uspeshnyy',
      actionLabel: 't.me/uspeshnyy'
    }
  ]
};

export const CONCLUSION_DATA: ConclusionData = {
  title: 'Ключевой инсайт',
  badge: 'ЗАКЛЮЧЕНИЕ',
  marketInsight: {
    lead: 'Российский рынок биллинг-систем для ISP — зрелый и насыщенный, но с двумя пробелами, где мы можем быстро выиграть:',
    gapList: [
      {
        id: 1,
        title: 'AI-функции',
        description: 'никто их не делает. Наша Claude-интеграция — отличный differentiator.'
      },
      {
        id: 2,
        title: 'Современный UX + mobile-app',
        description: 'у крупных конкурентов legacy. Мы уже опередили их по дизайну.'
      }
    ]
  },
  bottleneck: {
    heading: 'Главное ограничение прежнее — и стало острее:',
    description:
      'внешних платящих клиентов нет. В бою три собственные организации, продукт за год закрыл почти всё, что раньше значилось «сделаем при первом клиенте»: мультиорганизация, сервер лицензий, права по разделам, деньги от банковской выписки до чека в ОФД, обучающие ролики. Дальше наращивать функциональность — значит уходить в разработку ради разработки.'
  },
  keyRecommendation: {
    heading: 'Главная рекомендация не меняется:',
    target: '2-3 платных клиентов',
    details:
      'за ближайшие 3 месяца получить 2-3 платных клиентов. Из старого списка «активируется при клиентах» остались только DPI и защита кода — всё остальное уже готово и ждёт, когда его кому-то покажут.'
  }
};


export const MARKET_STATS = [
  { value: '5.28 млрд ₽', label: 'Объём рынка РФ (2024)', change: '+12% в год' },
  { value: '+12%', label: 'Годовой прирост рынка', change: 'TAdviser Telecom' },
  { value: '7–10', label: 'Серьёзных конкурентов', change: 'Зрелый рынок' },
  { value: '15–20 лет', label: 'История лидеров рынка', change: 'Накопленное legacy' },
  { value: '500–5 000', label: 'ICP (целевой размер ISP)', change: 'Наш sweet spot' },
  { value: '7 каналов', label: 'AI-ассистент СмИТ', change: 'Включая голос и телефон' }
];

export const MARKET_SEGMENTS: MarketSegment[] = [
  {
    id: 'micro',
    name: 'Micro',
    range: '< 500 абонентов',
    description: 'Mikbill (free), ABillS, самописные скрипты. Малый бюджет, базовая функциональность.',
    players: 'Mikbill, ABillS'
  },
  {
    id: 'small',
    name: 'Small',
    range: '500–5 000 абонентов',
    description: 'Mikbill paid, Carbon basic, СмИТ Биллинг. Наша главная целевая ниша, переход с самописных и устаревших систем.',
    players: 'СмИТ Биллинг, Carbon basic, Mikbill',
    isTarget: true
  },
  {
    id: 'medium',
    name: 'Medium',
    range: '5 000–30 000 абонентов',
    description: 'Carbon medium, UTM5, LANBilling, Hydra. Цель для масштабирования СмИТ через 2–3 года после сертификации СОРМ.',
    players: 'Carbon, UTM5, LANBilling, Hydra'
  },
  {
    id: 'large',
    name: 'Large',
    range: '30 000+ абонентов',
    description: 'Hydra, BGBilling, LANBilling, UTM5 enterprise. Крупные региональные операторы.',
    players: 'Hydra, BGBilling, LANBilling'
  },
  {
    id: 'tier1',
    name: 'Tier-1 / Телекомы',
    range: '1 000 000+ абонентов',
    description: 'Hydra international, BGBilling, кастомные enterprise АСР уровня Ростелеком, МТС, ЭР-Телеком.',
    players: 'Hydra, кастомные АСР'
  }
];

export const MARKET_GROWTH_DATA: MarketGrowthYearData[] = [
  {
    year: '2026',
    periodLabel: '2026 (Факт/Базовый)',
    microVolume: 0.52,
    smallVolume: 1.68,
    mediumVolume: 2.15,
    largeVolume: 2.15,
    totalVolume: 6.50,
    smallOperatorsCount: 1420,
    mediumOperatorsCount: 410,
    microOperatorsCount: 1200,
    aiAdoptionPct: 15,
    sormCompliantPct: 58,
    smitProjectedClients: 25
  },
  {
    year: '2027',
    periodLabel: '2027 (+1 год)',
    microVolume: 0.46,
    smallVolume: 2.05,
    mediumVolume: 2.52,
    largeVolume: 2.27,
    totalVolume: 7.30,
    smallOperatorsCount: 1580,
    mediumOperatorsCount: 460,
    microOperatorsCount: 1080,
    aiAdoptionPct: 34,
    sormCompliantPct: 76,
    smitProjectedClients: 85
  },
  {
    year: '2028',
    periodLabel: '2028 (+2 года)',
    microVolume: 0.40,
    smallVolume: 2.48,
    mediumVolume: 2.92,
    largeVolume: 2.38,
    totalVolume: 8.18,
    smallOperatorsCount: 1740,
    mediumOperatorsCount: 510,
    microOperatorsCount: 950,
    aiAdoptionPct: 55,
    sormCompliantPct: 91,
    smitProjectedClients: 190
  },
  {
    year: '2029',
    periodLabel: '2029 (+3 года)',
    microVolume: 0.35,
    smallVolume: 2.95,
    mediumVolume: 3.35,
    largeVolume: 2.50,
    totalVolume: 9.15,
    smallOperatorsCount: 1910,
    mediumOperatorsCount: 560,
    microOperatorsCount: 850,
    aiAdoptionPct: 78,
    sormCompliantPct: 98,
    smitProjectedClients: 340
  }
];

export const COMPETITIVE_RADAR_DATA: CompetitiveRadarMetric[] = [
  {
    dimension: 'AI & Умная автоматизация',
    dimensionShort: 'AI & Боты',
    smitScore: 98,
    benchmarkScore: 22,
    carbonScore: 25,
    hydraScore: 30,
    category: 'strength',
    description: 'Мультипровайдерный AI (Claude/GPT/Gemini), 7 каналов включая живой телефонный номер и 22 действия.',
    smitAdvantage: 'Автономная обработка 72.6% обращений, авто-диагностика порта, авто-распределение тикетов.',
    marketReality: 'У традиционных систем (Carbon, UTM5) AI отсутствует или ограничивается сторонними кнопочными ботами.',
    target2027: 99
  },
  {
    dimension: 'Современный UX & Mobile App',
    dimensionShort: 'UX & Мобильность',
    smitScore: 95,
    benchmarkScore: 40,
    carbonScore: 55,
    hydraScore: 65,
    category: 'strength',
    description: 'Bento Grid, Next.js/React, Tailwind CSS, Dark/Light режимы, Flutter/PWA приложения для абонентов.',
    smitAdvantage: 'Бесшовный онбординг, мгновенный отклик <100ms, кастомизация брендинга без правки исходников.',
    marketReality: 'Большинство конкурентов работают на устаревших Win32-клиентах или PHP 5.6/Perl интерфейсах 2010-х годов.',
    target2027: 98
  },
  {
    dimension: 'Омниканальность & Голосовой бот',
    dimensionShort: 'Омниканальность',
    smitScore: 96,
    benchmarkScore: 32,
    carbonScore: 40,
    hydraScore: 48,
    category: 'strength',
    description: 'Web-чат, Telegram, VK, Email, SIP-телефония с голосовым ИИ-роботом, суфлер для живых операторов.',
    smitAdvantage: 'Единая сквозная карточка клиента, контекст диалога сохраняется между звонком и перепиской.',
    marketReality: 'Разрозненные модули, требующие платных коннекторов к сторонним сервисам (Usedesk, CarrotQuest).',
    target2027: 97
  },
  {
    dimension: 'Быстрота запуска & Time-to-Value',
    dimensionShort: 'Быстрый старт',
    smitScore: 92,
    benchmarkScore: 46,
    carbonScore: 62,
    hydraScore: 42,
    category: 'strength',
    description: 'Docker/K8s инсталляция за 15 минут, интерактивный демо-стенд, готовые парсеры для миграции.',
    smitAdvantage: 'Запуск провайдера в продакшн за 1–3 дня вместо месяцев внедрения.',
    marketReality: 'Тяжелый On-premise монтаж серверов, долгое конфигурирование ядра специалистами вендора.',
    target2027: 95
  },
  {
    dimension: 'Прозрачность TCO & Доступность',
    dimensionShort: 'Прозрачный TCO',
    smitScore: 90,
    benchmarkScore: 56,
    carbonScore: 65,
    hydraScore: 38,
    category: 'strength',
    description: 'Гибкая ежемесячная подписка, официальный сервер лицензий, без скрытых оплат за ядра и протоколы.',
    smitAdvantage: 'Старт от 5 000 ₽/мес, предсказуемая экономика, окупаемость за 2–3 месяца.',
    marketReality: 'Высокий входной порог (CAPEX 300k–1.5M ₽) + навязанная платная техподдержка.',
    target2027: 94
  },
  {
    dimension: 'Сертификация Минцифры СОРМ-3',
    dimensionShort: 'СОРМ-3 Сертификат',
    smitScore: 58,
    benchmarkScore: 92,
    carbonScore: 95,
    hydraScore: 96,
    category: 'weakness',
    description: '13 форматов выгрузок и аудит в ядре готовы, но официальный сертификат соответствия в процессе.',
    smitAdvantage: 'Архитектурно полностью готов к интеграции со всеми СОРМ-пультами (Норси-Транс, МФИ Софт, Сигнатек).',
    marketReality: 'Зрелые лидеры рынка имеют бессрочные или действующие сертификаты связи более 10–15 лет.',
    target2027: 95
  },
  {
    dimension: 'Масштаб клиентской базы (ISP)',
    dimensionShort: 'Клиентская база',
    smitScore: 40,
    benchmarkScore: 88,
    carbonScore: 90,
    hydraScore: 92,
    category: 'weakness',
    description: '3 боевые опорные сети (СмІТ, Робор, ИТЦ) + пилотные проекты в регионах против сотен у ветеранов.',
    smitAdvantage: 'Высокая маневренность, прямой контакт с фаундером, персональное сопровождение каждого провайдера.',
    marketReality: 'Carbon, LANBilling, UTM5 обладают базой в 300–1000+ внедрений по всей России и СНГ.',
    target2027: 80
  },
  {
    dimension: 'Партнерская сеть & Интеграторы',
    dimensionShort: 'Партнерская сеть',
    smitScore: 62,
    benchmarkScore: 82,
    carbonScore: 85,
    hydraScore: 78,
    category: 'weakness',
    description: 'Развитие комьюнити в Telegram, партнерских программ с монтажниками сетей и поставщиками железа.',
    smitAdvantage: 'Щедрая реферальная модель (до 25% LTV) и готовые API/Webhooks для любых интеграций.',
    marketReality: 'Устоявшиеся связи лидеров с крупными дистрибьюторами оборудования (NAG, SNR, Eltex).',
    target2027: 85
  }
];

export const REGULATORY_REQUIREMENTS = [
  {
    code: 'СОРМ-3',
    law: '149-ФЗ, Приказ Минкомсвязи №573 от 29.10.2018',
    detail: 'Обязательна для всех лицензированных операторов связи в РФ. 13 форматов выгрузок, FTP, аудит.'
  },
  {
    code: 'Реестр операторов РКН',
    law: '126-ФЗ «О связи»',
    detail: 'Лицензия на оказание телематических услуг связи и передачи данных.'
  },
  {
    code: '152-ФЗ',
    law: 'О персональных данных',
    detail: 'Хранение и обработка персональных данных строго на серверах внутри Российской Федерации.'
  },
  {
    code: 'Закон Яровой',
    law: '374-ФЗ',
    detail: 'Хранение NetFlow-логов и метаданных соединений 6 месяцев (через DPI/ОРМ).'
  },
  {
    code: '54-ФЗ',
    law: 'О применении ККТ',
    detail: 'Обязательная фискализация платежей физлиц, отправка чеков в ОФД и покупателям.'
  }
];

export const COMPETITORS: Competitor[] = [
  {
    id: 'carbon',
    name: 'Carbon Soft / Carbon Billing 5',
    subtitle: 'Главный соперник №1 — та же ниша, мы наследуем структуру их БД',
    website: 'https://carbonsoft.ru',
    clients: '250+ операторов в РФ',
    founded: '2009 (17 лет на рынке)',
    segment: 'Small / Medium / Large',
    price: 'от ~120 000 ₽ / год (всё включено)',
    stack: 'Firebird legacy → новый Carbon 5 стек',
    sormCert: 'Сертификат связи до 12.04.2028',
    pros: [
      'Самая известная марка в РФ для сегмента micro/small ISP',
      'Готовые migration tools (UTM, LANBilling, Hydra, Mikbill)',
      '6 сертифицированных вендоров СОРМ из коробки',
      'Активные релизы каждые 2–4 недели'
    ],
    cons: [
      'Архаичная база Firebird в Carbon 4 и тяжелое наследие',
      'Устаревший интерфейс управления (наследие 2015-2018)',
      'Полное отсутствие встроенных AI-функций и автоматизации',
      'Мобильное приложение давно не обновлялось'
    ],
    ourTake: 'Не идти в лобовую ценовую войну. Выигрывать за счет AI-автоматизации, превосходного современного UX и сфокусированности на болях малых ISP. Наследуя структуру БД Carbon 4, мы обеспечиваем легкий переход клиентов к нам.',
    badgeColor: 'amber',
    marketShareEstimate: 'Лидер в сегменте 500-5000'
  },
  {
    id: 'hydra',
    name: 'Hydra (Latera)',
    subtitle: 'Премиум-сегмент, верхний предел роста рынка',
    website: 'https://hydra-billing.ru',
    clients: '360+ провайдеров в 46 странах',
    founded: '2007 (19 лет)',
    segment: 'Medium / Large / Tier-1',
    price: 'от ~300 000 ₽ / год (премиум)',
    stack: 'Java + PostgreSQL',
    sormCert: 'Сертифицирован Минцифры',
    pros: [
      '50% исходного кода открыто + развитое API',
      'Multi-tenant SaaS архитектура (cloud.hydra-billing.ru)',
      'Универсальная тарификация (Internet, IPTV, VoIP, OTT, IoT)',
      'Успешная международная экспансия'
    ],
    cons: [
      'Очень высокая стоимость для небольших провайдеров',
      'Документация — слабое и фрагментарное место',
      'Длительные циклы исправления багов (от месяца)',
      'Платная и дорогая техническая поддержка'
    ],
    ourTake: 'Ориентир качества архитектуры и верхний предел нашего роста. Если вырастем до среднего сегмента — Hydra станет прямым конкурентом через 2–3 года. Сейчас пересекаемся редко.',
    badgeColor: 'emerald',
    marketShareEstimate: 'Топ-1 в премиум и Tier-1'
  },
  {
    id: 'utm5',
    name: 'UTM5 (NetUP)',
    subtitle: 'Крупный исторический игрок, но архаичный — отличный источник миграций',
    website: 'https://netup.ru',
    clients: 'Тысячи установок по СНГ',
    founded: '2003 (23 года)',
    segment: 'Small / Medium',
    price: 'от ~150 000 ₽ + платная поддержка',
    stack: 'C++ / собственный radius-сервер',
    sormCert: 'Сертификация и включение в Реестр',
    pros: [
      'Огромная установленная база клиентов с 2003 года',
      'Конвергентный биллинг (Internet + VoIP + IPTV)',
      'Полная сертификация связи и соответствие законам'
    ],
    cons: [
      'Сильно устаревшая архитектура ядра на C++',
      'Desktop-стиль интерфейса из 2000-х годов',
      'Мобильное приложение и AI отсутствуют или отстают',
      'Высокая сложность кастомизации и внедрения'
    ],
    ourTake: 'Очень уязвимы. Их клиенты устали от отсутствия развития и сложного интерфейса. Наш скрипт import_from_utm5 позволит легко забирать их операторов на современный СмИТ.',
    badgeColor: 'blue',
    marketShareEstimate: 'Огромная база legacy-установок'
  },
  {
    id: 'lanbilling',
    name: 'LANBilling',
    subtitle: 'Аналог нашего позиционирования, но старше и консервативнее',
    website: 'https://lanbilling.ru',
    clients: '~300+ операторов',
    founded: '2003 (23 года)',
    segment: 'Middle / Medium-Large',
    price: 'от ~100 000 ₽ (пакеты по числу абонентов)',
    stack: 'C/C++ + MySQL',
    sormCert: 'Сертификат СОРМ + Реестр Минцифры',
    pros: [
      'Сертификация СОРМ и включение в реестр отечественного ПО',
      'Круглосуточная техническая поддержка 24/7',
      'Четкие тарифные пакеты с градацией по числу абонентов'
    ],
    cons: [
      'Консервативный и медленно обновляемый UI',
      'Всего 3 месяца поддержки в бессрочной лицензии',
      'Мобильное приложение уступает современным стандартам'
    ],
    ourTake: 'Близкий аналог по сегменту. Конкурируем за счет встроенного AI, скорости внедрения, современных мобильных приложений и передового стека Python/Django/PG17.',
    badgeColor: 'purple',
    marketShareEstimate: 'Стабильные позиции в среднем сегменте'
  },
  {
    id: 'bgbilling',
    name: 'BGBilling',
    subtitle: 'Enterprise-система для крупных телекомов — вне нашей прямой зоны',
    website: 'https://bgbilling.ru',
    clients: '~200+ крупных операторов',
    founded: '2002 (24 года)',
    segment: 'Medium / Large / Телекомы',
    price: 'Бессрочные лицензии, высокая стоимость',
    stack: 'Java client-server архитектура',
    sormCert: 'Сертифицирован',
    pros: [
      'Максимальная гибкость кастомизации через Java API',
      'Проверенная стабильность более двух десятилетий',
      'Высокая производительность на миллионных базах'
    ],
    cons: [
      'Очень медленная консервативная разработка',
      'Интерфейс морально устарел',
      'Отсутствие официального современного mobile-app',
      'Высокий порог входа и дорогая разработка модулей'
    ],
    ourTake: 'Не пересекаемся в текущей стратегии. Не представляет непосредственной угрозы для сегмента малых ISP.',
    badgeColor: 'slate',
    marketShareEstimate: 'Крупные операторы связи'
  },
  {
    id: 'mikbill',
    name: 'Mikbill',
    subtitle: 'Главный источник наших будущих клиентов при росте',
    website: 'https://mikbill.pro',
    clients: 'Тысячи micro-провайдеров',
    founded: '2007 (19 лет)',
    segment: 'Micro / Small',
    price: 'Бесплатно до 150 клиентов, от $400 далее',
    stack: 'PHP + MySQL',
    sormCert: 'Нет сертификата СОРМ',
    pros: [
      'Open-source корни, доступность и активность сообщества',
      'Множество сторонних плагинов и интеграций',
      'Минимальная цена входа для начинающих сетей'
    ],
    cons: [
      'PHP-монолит с устаревшей архитектурой БД',
      'Нет современного личного кабинета и мобильных приложений',
      'Полное отсутствие СОРМ-3 сертификации и выгрузок',
      'Фрагментарная документация и отсутствие гарантий'
    ],
    ourTake: 'Ключевой донор клиентов! Когда оператор перерастает 500 абонентов, сталкивается с проверками СОРМ и запросами абонентов на мобильное приложение — он переходит к нам. Команда manage.py import_from_mikbill — наш главный инструмент захвата.',
    badgeColor: 'teal',
    marketShareEstimate: 'Доминирует в сегменте <500 абонентов'
  }
];

export const MATRIX_DATA: MatrixRow[] = [
  // Базовая информация
  {
    id: 'm1',
    category: 'Базовая информация',
    parameter: 'Год основания',
    smit: '2025 (Build 2286)',
    smitStatus: 'yes',
    carbon: '2009',
    utm5: '2003',
    hydra: '2007',
    lanbilling: '2003',
    bgbilling: '2002',
    mikbill: '2007'
  },
  {
    id: 'm2',
    category: 'Базовая информация',
    parameter: 'Количество клиентов',
    smit: '3 орг. (СмІТ, Робор, ИТЦ)',
    smitStatus: 'limited',
    carbon: '250+',
    utm5: 'тысячи',
    hydra: '360 / 46 стран',
    lanbilling: '~300',
    bgbilling: '~200',
    mikbill: 'open/тысячи'
  },
  {
    id: 'm3',
    category: 'Базовая информация',
    parameter: 'Реестр Минцифры',
    smit: 'В процессе подачи',
    smitStatus: 'no',
    carbon: 'Есть',
    utm5: 'Есть',
    hydra: 'Есть',
    lanbilling: 'Есть',
    bgbilling: 'Есть',
    mikbill: 'Нет'
  },
  {
    id: 'm4',
    category: 'Базовая информация',
    parameter: 'Сертификат связи СОРМ',
    smit: 'Технически готов (СОРМ-3)',
    smitStatus: 'partial',
    carbon: 'До 12.04.2028',
    utm5: 'Есть',
    hydra: 'Есть',
    lanbilling: 'Есть',
    bgbilling: 'Есть',
    mikbill: 'Нет'
  },
  {
    id: 'm5',
    category: 'Базовая информация',
    parameter: 'Open-source / доступ к коду',
    smit: 'Proprietary + открытые API',
    smitStatus: 'limited',
    carbon: 'Закрыт',
    utm5: 'Закрыт',
    hydra: '50% открыто',
    lanbilling: 'Закрыт',
    bgbilling: 'Закрыт',
    mikbill: 'Open-source'
  },

  // Архитектура
  {
    id: 'm6',
    category: 'Архитектура и стек',
    parameter: 'Технологический стек',
    smit: 'Python 3.11 + Django 4.2 LTS + PG 17',
    smitStatus: 'yes',
    smitDocTip: 'Современный поддерживаемый стек с Celery и Redis',
    carbon: 'Firebird legacy',
    utm5: 'C++',
    hydra: 'Java + PostgreSQL',
    lanbilling: 'C/C++ + MySQL',
    bgbilling: 'Java client-server',
    mikbill: 'PHP + MySQL'
  },
  {
    id: 'm7',
    category: 'Архитектура и стек',
    parameter: 'Контейнеризация / деплой',
    smit: 'Docker + docker-compose',
    smitStatus: 'yes',
    carbon: 'Docker / bare metal',
    utm5: 'bare metal / Docker',
    hydra: 'bare metal / Docker',
    lanbilling: 'bare metal',
    bgbilling: 'Java VM',
    mikbill: 'bare metal'
  },
  {
    id: 'm8',
    category: 'Архитектура и стек',
    parameter: 'Мультиорганизация / White-label',
    smit: 'Полная изоляция + брендинг',
    smitStatus: 'yes',
    smitLink: 'https://billing.smit34.ru/#module-multiorg',
    smitDocTip: 'Изоляция данных по организациям, раздельные реквизиты, кассы 54-ФЗ, почта и телефония',
    carbon: 'Частично (OPERATOR_ID)',
    utm5: 'Ограниченно',
    hydra: 'Multi-tenant SaaS',
    lanbilling: 'Ограниченно',
    bgbilling: 'Ограниченно',
    mikbill: 'Нет'
  },

  // Биллинг (ядро)
  {
    id: 'm9',
    category: 'Биллинг (ядро)',
    parameter: 'Тарификация по трафику и скорости',
    smit: 'Да (гибкие шейперы, burst, CoA)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Да'
  },
  {
    id: 'm10',
    category: 'Биллинг (ядро)',
    parameter: 'Обещанный платёж / Кредит',
    smit: 'Да (с автоответом по SMS «ОП»)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Ограниченно'
  },
  {
    id: 'm11',
    category: 'Биллинг (ядро)',
    parameter: 'Программы лояльности и бонусы',
    smit: 'Да (автоназначение по стажу, скидки %)',
    smitStatus: 'yes',
    smitDocTip: 'Build 401: реальное применение скидок и бонусов',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Плагины'
  },
  {
    id: 'm12',
    category: 'Биллинг (ядро)',
    parameter: 'Юр.лица + НДС + акты + договоры',
    smit: 'Да (автогенерация PDF с реквизитами)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Ограниченно'
  },

  // СОРМ
  {
    id: 'm13',
    category: 'СОРМ и регуляторика',
    parameter: 'СОРМ-3 экспорт (Приказ №573)',
    smit: 'Да (13 типов отчетов, FTP/SFTP, hex IP)',
    smitStatus: 'yes',
    smitDocTip: 'Build 412-415: SormReadinessCheck и аудит',
    carbon: 'Да (6 вендоров)',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Нет'
  },
  {
    id: 'm14',
    category: 'СОРМ и регуляторика',
    parameter: 'Аудит выгрузок СОРМ (SormExportLog)',
    smit: 'Да (полный журнал для проверок ФСБ)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Нет'
  },

  // RADIUS / Сеть
  {
    id: 'm15',
    category: 'RADIUS и сеть',
    parameter: 'FreeRADIUS / MikroTik CoA Disconnect',
    smit: 'Да (мгновенное переподключение и сброс)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Свой radius',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Частично'
  },
  {
    id: 'm16',
    category: 'RADIUS и сеть',
    parameter: 'Captive Portal + Гости в СОРМ',
    smit: 'Да (автоблокировка + фиксация по ПП №758)',
    smitStatus: 'yes',
    smitLink: 'https://docs.billing.smit34.ru/pages/billing.html#system-settings-blocks',
    smitDocTip: 'Гости публичного Wi-Fi автоматически попадают в СОРМ',
    carbon: 'Да',
    utm5: 'Нет',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Плагин',
    mikbill: 'Нет'
  },
  {
    id: 'm17',
    category: 'RADIUS и сеть',
    parameter: 'DPI (СКАТ от VAS Experts)',
    smit: 'План готов (модуль dpi в бэклоге)',
    smitStatus: 'no',
    carbon: 'Интеграция',
    utm5: 'Интеграция',
    hydra: 'Встроенный / СКАТ',
    lanbilling: 'Интеграция',
    bgbilling: 'Интеграция',
    mikbill: 'Нет'
  },

  // IPTV / VoIP / Видео
  {
    id: 'm18',
    category: 'IPTV / VoIP / Видеонаблюдение',
    parameter: 'IPTV биллинг (TVIP / LFStream)',
    smit: 'Да (готовые интеграции с ТВ-провайдерами)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Нет'
  },
  {
    id: 'm19',
    category: 'IPTV / VoIP / Видеонаблюдение',
    parameter: 'IP-телефония (Asterisk / Novofon)',
    smit: 'Да (звонки из CRM, запись + транскрибация)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Нет'
  },
  {
    id: 'm20',
    category: 'IPTV / VoIP / Видеонаблюдение',
    parameter: 'Видеонаблюдение «под ключ»',
    smit: 'Да (проект → монтаж → подписки → ЛК)',
    smitStatus: 'yes',
    smitLink: 'https://billing.smit34.ru/#module-video',
    carbon: 'Частично',
    utm5: 'Нет',
    hydra: 'Ограниченно',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // Финансы и платежи
  {
    id: 'm21',
    category: 'Финансы и платежи',
    parameter: 'Эквайринг (ЮKassa, W1, T-Bank, СБП)',
    smit: 'Да (REST API v3, webhooks, автозачисление)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Да'
  },
  {
    id: 'm22',
    category: 'Финансы и платежи',
    parameter: 'Авторазбор банковских выписок (Сбер/Альфа)',
    smit: 'Да (почта → парсер → поиск клиента → чек)',
    smitStatus: 'yes',
    smitLink: 'https://docs.billing.smit34.ru/pages/settings.html#bank-ux-2240',
    smitDocTip: 'Сквозной путь: выписка из почты → сопоставление по ИНН/ФИО → счет/акт → чек в ОФД',
    carbon: 'Нет аналога',
    utm5: 'Нет аналога',
    hydra: 'Нет аналога',
    lanbilling: 'Нет аналога',
    bgbilling: 'Нет аналога',
    mikbill: 'Нет'
  },
  {
    id: 'm23',
    category: 'Финансы и платежи',
    parameter: 'Чеки 54-ФЗ (АТОЛ Онлайн) в боевом режиме',
    smit: 'Да (касса на организацию, ФД 27480 в ОФД)',
    smitStatus: 'yes',
    carbon: 'Да',
    utm5: 'Да',
    hydra: 'Да',
    lanbilling: 'Да',
    bgbilling: 'Да',
    mikbill: 'Плагин'
  },

  // Личный кабинет и Mobile
  {
    id: 'm24',
    category: 'Личный кабинет и Mobile',
    parameter: 'Современный Web ЛК абонента',
    smit: 'Да (адаптивный, смена тарифа, темная тема)',
    smitStatus: 'yes',
    carbon: 'Устаревший',
    utm5: 'Устаревший',
    hydra: 'Современный',
    lanbilling: 'Средний',
    bgbilling: 'Средний',
    mikbill: 'Базовый'
  },
  {
    id: 'm25',
    category: 'Личный кабинет и Mobile',
    parameter: 'Мобильное приложение (iOS / Android)',
    smit: 'Да (Flutter 3.27, Push FCM, биометрия)',
    smitStatus: 'yes',
    smitLink: 'https://play.google.com/store/apps/details?id=ru.smit34.smit_billing',
    carbon: 'Устарело',
    utm5: 'Устарело',
    hydra: 'Ограниченно',
    lanbilling: 'Базовое',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },
  {
    id: 'm26',
    category: 'Личный кабинет и Mobile',
    parameter: 'Авторизация через Telegram / VK OAuth',
    smit: 'Да (в 1 клик без паролей)',
    smitStatus: 'yes',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // HelpDesk / CRM
  {
    id: 'm27',
    category: 'Поддержка и CRM',
    parameter: 'Встроенная Поддержка + CRM',
    smit: 'Да (собственный модуль вместо внешних систем)',
    smitStatus: 'yes',
    smitLink: 'https://billing.smit34.ru/#module-helpdesk',
    smitDocTip: 'Тикеты, 9 каналов приёма, SLA, воронки продаж, наряды монтажникам',
    carbon: 'Базовый',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // AI и Автоматизация
  {
    id: 'm28',
    category: 'AI и автоматизация',
    parameter: 'Мульти-провайдер AI-агент (7 каналов)',
    smit: 'Да (Claude, GPT, Gemini, Grok, Yandex)',
    smitStatus: 'yes',
    smitLink: 'https://billing.smit34.ru/#module-ai',
    smitDocTip: 'ЛК, mobile, email, виджет, голос и реальный телефон 61-32-40, подсказка оператору',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },
  {
    id: 'm29',
    category: 'AI и автоматизация',
    parameter: 'AI-помощник генерации SQL-отчётов',
    smit: 'Да (генерация SQL по фразе на русском)',
    smitStatus: 'yes',
    smitDocTip: 'Build 455: CodeMirror + Claude Haiku SQL generator',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },
  {
    id: 'm30',
    category: 'AI и автоматизация',
    parameter: 'Голосовой AI на телефонной линии',
    smit: 'Да (Gemini Live + реальный SIP номер)',
    smitStatus: 'yes',
    smitLink: 'https://billing.smit34.ru/#module-voice',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // Маркетинг и продажи
  {
    id: 'm31',
    category: 'Маркетинг и привлечение',
    parameter: 'Встроенный конструктор лендингов',
    smit: 'Да (20+ блоков, публикация на поддомене)',
    smitStatus: 'yes',
    smitLink: 'https://billing.smit34.ru/#module-landing',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },
  {
    id: 'm32',
    category: 'Маркетинг и привлечение',
    parameter: 'AI-мастер рекламных кампаний + боты-воронки',
    smit: 'Да (генерация объявлений, форм и воронок)',
    smitStatus: 'yes',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // Сообщения
  {
    id: 'm33',
    category: 'SMS и рассылки',
    parameter: 'SMS-шлюз через Android-телефон (sms-gate.app)',
    smit: 'Да (отправка по тарифу SIM-карты, автоответы)',
    smitStatus: 'yes',
    smitDocTip: 'Экономия 5-15 тыс. ₽/мес на платных агрегаторах! Автоответы: БАЛАНС, ОП, ВКЛ/ВЫКЛ',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // Документация и знания
  {
    id: 'm34',
    category: 'Документация и знания',
    parameter: 'Интерактивный граф знаний архитектуры',
    smit: 'Да (11 слоев, docs.billing.smit34.ru/understand)',
    smitStatus: 'yes',
    smitLink: 'https://docs.billing.smit34.ru/understand/',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },
  {
    id: 'm35',
    category: 'Документация и знания',
    parameter: 'Обучающие видеоролики к каждому модулю',
    smit: 'Да (встроены в панель и лендинг)',
    smitStatus: 'yes',
    carbon: 'Нет',
    utm5: 'Нет',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Нет'
  },

  // Цены
  {
    id: 'm36',
    category: 'Ценообразование',
    parameter: 'Стартовая годовая стоимость',
    smit: '99 000 ₽ / год («Старт»)',
    smitStatus: 'yes',
    carbon: '~120 000 ₽ / год',
    utm5: '~150 000 ₽ / год',
    hydra: '~300 000 ₽ / год',
    lanbilling: '~100 000 ₽ / год',
    bgbilling: '~200 000 ₽ / год',
    mikbill: 'Free / $400'
  },
  {
    id: 'm37',
    category: 'Ценообразование',
    parameter: 'Условия для первых клиентов',
    smit: '6 месяцев бесплатно + миграция в подарок',
    smitStatus: 'yes',
    carbon: 'Демо 30 дней',
    utm5: 'Демо Softrouter',
    hydra: 'Нет',
    lanbilling: 'Нет',
    bgbilling: 'Нет',
    mikbill: 'Free до 150 абон.'
  }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'r1',
    rank: 1,
    rankLabel: 'Приоритет №1',
    title: 'Найти 2–3 платных клиентов в регионе',
    summary: 'ISP 500–3 000 клиентов в Волгоградской, Ростовской, Краснодарской областях. Пилот 6 месяцев бесплатно в обмен на отзыв, кейс и 2-3 референс-звонка.',
    intro: 'Без выполнения этой рекомендации все остальные планы — over-engineering. Это критический блокер. План лицензий, обновлений и масштабирования активируется только от реальных внешних клиентов.',
    why: 'Один клиент = нельзя собрать публичные отзывы, use cases, sales references. Потенциальные клиенты спрашивают: «А кто ещё у вас внедрён?» — нечего ответить. У конкурентов — 200–1000+ клиентов.',
    impactScore: 96,
    effortScore: 65,
    quadrant: 'major_projects',
    quadrantLabel: 'Стратегическая ставка',
    categoryTag: 'Продажи & Выручка',
    roiRatio: 1.48,
    budget: {
      time: 'Q2 2026 (3 месяца)',
      money: '0 ₽ прямых + ~80k ₽ скидок',
      team: 'admin + личные контакты'
    },
    steps: [
      {
        title: 'Определить список ICP1 (20 ISP)',
        body: 'Собрать таблицу 20 независимых ISP в радиусе 500 км с абонентской базой 500–3 000 клиентов. Источники: Реестр операторов РКН, 2GIS, Telegram-каналы провайдеров.',
        meta: 'Срок: 1 неделя · admin'
      },
      {
        title: 'Подготовить компактные sales-материалы',
        body: '1-pager в PDF с главными фичами (AI-чат, мобильное приложение, Поддержка+CRM, 54-ФЗ). Demo-видео 3 мин — как Claude отвечает клиенту в ЛК. Калькулятор цены на сайте.',
        meta: 'Срок: 1 неделя · admin'
      },
      {
        title: 'Прямые контакты через Telegram и звонки',
        body: 'Каналы @nag_ru, @tspu_ru, личные контакты. Сообщения CTO/CEO региональных ISP. Pitch: «Полгода бесплатно и миграция данных за наш счет — взамен на кейс и видеоотзыв».',
        meta: '2 недели · 30 контактов · response ~10%'
      },
      {
        title: 'Заключение Pilot-договора',
        body: 'Шаблон договора: 6 месяцев бесплатно, полный доступ, установка на сервер клиента, миграция данных бесплатно, цена зафиксирована на 24 месяца. Взамен — отзыв и кейс с цифрами. Далее тариф «Старт» 99 000 ₽/год без ломания цены.',
        meta: 'Срок: 3 дня · юрист'
      },
      {
        title: 'Запуск мигратора данных',
        body: 'Команда manage.py import_from_mikbill / import_from_utm5. Перенос клиентов, тарифов, сальдо и истории платежей за 1 день.',
        meta: 'Срок: 1 день на перенос'
      },
      {
        title: 'Pilot-инсталляция и обучение',
        body: 'Развертывание СмИТ на сервере клиента (docker-compose), обучение оператора (2 часа Zoom). Backup-план: мгновенный возврат к старой системе.',
        meta: 'Срок: 1-2 дня'
      }
    ],
    kpis: [
      'Сформирована база контактов 20 региональных ISP (Q2 неделя 2)',
      '3 ISP согласились на пилотное тестирование (Q2 месяц 1)',
      '1 успешный пилот конвертирован в платный договор (Q3 месяц 1)',
      '2–3 платных клиента в бою к концу Q3 2026'
    ],
    risks: 'Конкуренты могут предложить скидки. Митигация: делать упор на AI и современный mobile — у конкурентов этого нет.'
  },
  {
    id: 'r2',
    rank: 2,
    rankLabel: 'Приоритет №2',
    title: 'Закрепить AI как ключевой differentiator',
    summary: 'Мульти-провайдер AI-ассистент на 7 каналах (включая голос и телефон), AI-генератор SQL-отчетов, предиктивный анализ оттока абонентов.',
    intro: 'У нас уже есть AI-функциональность, которой нет ни у одного конкурента в РФ. Нужно защитить это преимущество как ядро позиционирования.',
    why: 'Carbon Soft, Hydra, UTM5, LANBilling — ни у кого нет реального AI-чата и голосового агента. Конкуренты догонят через 1–2 года. Сейчас наше окно возможностей.',
    impactScore: 94,
    effortScore: 32,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа',
    categoryTag: 'AI & Инновации',
    roiRatio: 2.94,
    budget: {
      time: 'Q2–Q3 2026 (~30 дней)',
      money: 'Claude / Gemini API ~10k ₽/мес',
      team: 'admin + AI-инженер'
    },
    steps: [
      {
        title: 'Стабилизировать мульти-провайдер AI',
        body: 'Claude 3.5 Sonnet / Haiku + fallback на GPT/Gemini/Yandex. Набор из 50 eval-тестов, мониторинг через Sentry, ограничение затрат токенов.',
        meta: '1 неделя · build 600+'
      },
      {
        title: 'AI-помощник создания тарифов',
        body: 'Оператор пишет на русском: «хочу тариф 100 Мбит МКД за 450 руб со скидкой студентам». AI формирует Tarif + TarifUsersUsluga + параметры RADIUS.',
        meta: '5 дней разработки'
      },
      {
        title: 'AI-анализ оттока клиентов',
        body: 'Модель предсказывает вероятность оттока по снижению трафика, просрочкам и жалобам в Поддержку. Бейдж риска в карточке абонента.',
        meta: '7 дней (модель + UI)'
      },
      {
        title: 'AI-резюмирование обращений',
        body: 'В карточке клиента — кнопка «AI-summary всех тикетов»: ключевые проблемы клиента за последние 6 месяцев в 3 предложениях.',
        meta: '3 дня'
      },
      {
        title: 'Voice-bot на телефонной линии',
        body: 'Интеграция Gemini Live / Yandex SpeechKit с Asterisk. Ответ на входящие звонки, проверка баланса, статус сети, перевод на оператора.',
        meta: '14 дней'
      }
    ],
    kpis: [
      'Uptime AI-сервисов 99.5%',
      '72.6%+ типовых тикетов закрываются AI без участия человека',
      'AI упоминается в 80% sales-презентаций как ключевое отличие'
    ],
    risks: 'Блокировки зарубежных API. Митигация: мультипровайдерность (Claude через прокси, YandexGPT, GigaChat, локальные модели).'
  },
  {
    id: 'r3',
    rank: 3,
    rankLabel: 'Приоритет №3',
    title: 'Сертификация СОРМ в Минцифры (ЦНИИС)',
    summary: 'Официальный сертификат соответствия средства связи. 6–12 месяцев, 500k–1M ₽. Блокер для лицензированных операторов связи.',
    intro: 'Без сертификата СОРМ мы не можем легально продавать биллинг крупным операторам связи с лицензией РКН.',
    why: 'Carbon, LANBilling, Hydra, UTM5 — все сертифицированы. Это обязательный пункт в тендерах и при проверках Роскомнадзора.',
    impactScore: 98,
    effortScore: 88,
    quadrant: 'major_projects',
    quadrantLabel: 'Стратегическая ставка',
    categoryTag: 'Комплаенс & СОРМ',
    roiRatio: 1.11,
    budget: {
      time: '6–12 месяцев',
      money: '500k–1.5M ₽ (испытания ЦНИИС)',
      team: 'admin + эксперты ЦНИИС'
    },
    steps: [
      {
        title: 'Подача заявки в ФГУП ЦНИИС',
        body: 'Подготовка ТУ, описания архитектуры безопасности и исходного кода для проведения испытаний.',
        meta: '1 месяц подготовки'
      },
      {
        title: 'Технические испытания в лаборатории',
        body: 'Проверка формата 13 отчетов СОРМ-3 по Приказу №573, FTP-передачи, hex IP, таймстампов и журнала SormExportLog.',
        meta: '3–6 месяцев · ~300k ₽'
      },
      {
        title: 'Устранение замечаний лаборатории',
        body: 'Доработка отчета FLOW (через NetFlow или DPI) и закрытие протокола испытаний.',
        meta: '1–2 месяца'
      },
      {
        title: 'Получение сертификата соответствия',
        body: 'Выдача сертификата на 3 года и внесение в реестр сертифицированных средств связи Минцифры РФ.',
        meta: '1 месяц после испытаний'
      }
    ],
    kpis: [
      'Заявка принята в ЦНИИС (Q3 2026)',
      'Протокол испытаний без замечаний (Q1 2027)',
      'Сертификат получен и опубликован на сайте (Q2 2027)'
    ],
    risks: 'Необходимость отчета FLOW. Митигация: параллельно внедрять связку с сертифицированным СКАТ DPI от VAS Experts.'
  },
  {
    id: 'r4',
    rank: 4,
    rankLabel: 'Приоритет №4',
    title: 'Маркетинг и публичное присутствие',
    summary: 'TAdviser, NAG.ru, Habr, YouTube, Telegram-канал разработки, отраслевые конференции (ConnectedEvent, T+ Telecom).',
    intro: 'Конкуренты известны 15–20 лет. У СмИТ Биллинг нулевая публичная известность. Нужно систематически строить бренд.',
    why: 'Прямые холодные продажи дают конверсию 1–3%. При узнаваемом бренде и экспертных статьях входящая конверсия достигает 15–20%.',
    impactScore: 70,
    effortScore: 38,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа',
    categoryTag: 'Маркетинг & Бренд',
    roiRatio: 1.84,
    budget: {
      time: 'Непрерывно с Q2 2026',
      money: '~30k ₽/мес контент + 100-200k/год конференции',
      team: 'admin + tech writer part-time'
    },
    steps: [
      {
        title: 'Карточка на TAdviser и ComNews',
        body: 'Публикация страницы продукта в каталоге российских биллинг-систем со скриншотами и версиями.',
        meta: '1 день · 0 ₽'
      },
      {
        title: 'Техническая статья на NAG.ru',
        body: '«Как мы создали современный биллинг на Django 4.2 + AI для малых провайдеров».',
        meta: '5 дней · 0 ₽'
      },
      {
        title: 'Статья на Habr про Граф Знаний',
        body: '«Визуализация архитектуры биллинга с 2524 узлами с помощью graphify».',
        meta: '5 дней · 0 ₽'
      },
      {
        title: 'YouTube-канал и демо-ролики',
        body: 'Короткие 2–4 минутные видеоразборы фич: «AI в ЛК», «Разбор банковских выписок за 60 секунд», «SMS через Android».',
        meta: '2 видео в месяц'
      }
    ],
    kpis: [
      'Публикации на TAdviser, NAG.ru, Habr (Q3 2026)',
      '100+ подписчиков в Telegram-канале разработки',
      'Доклад на отраслевой телеком-конференции в 2026 г.'
    ],
    risks: 'Медленный органический рост. Митигация: комбинация прямых продаж (ICP1) и контент-маркетинга.'
  },
  {
    id: 'r5',
    rank: 5,
    rankLabel: 'Приоритет №5',
    title: 'Тарифная модель + сервер обновлений',
    summary: 'Сервер лицензий в бою на license.billing.smit34.ru: тарифы, каталог модулей и виджетов, счета/акты, ЮKassa, автообновление.',
    intro: 'Активируется при появлении нескольких клиентов. Полная инфраструктура лицензирования уже запущена.',
    why: 'Ручное обновление через scp работает для 1–2 установок, но для масштабирования необходим централизованный сервер релизов.',
    impactScore: 82,
    effortScore: 18,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа (Готово)',
    categoryTag: 'Инфраструктура & Лицензии',
    roiRatio: 4.55,
    budget: {
      time: 'MVP запущен',
      money: 'admin time + ~10k ₽ Роспатент',
      team: 'admin'
    },
    steps: [
      {
        title: 'Сервер лицензий license.billing.smit34.ru',
        body: 'Модели Installation + Release + LicenseKey. API проверки обновлений и загрузки пакетов с подписью Ed25519.',
        meta: 'Выполнено'
      },
      {
        title: 'Сетка тарифов (Старт / Pro / Бизнес / Enterprise)',
        body: 'Разграничение доступных модулей по тарифу через has_module() и проверка лимитов абонентов.',
        meta: 'Выполнено'
      },
      {
        title: 'Регистрация в Роспатенте',
        body: 'Подача заявления в ФИПС на государственную регистрацию программы для ЭВМ для защиты прав.',
        meta: '2 месяца ожидания · ~10k ₽'
      }
    ],
    kpis: [
      'Сервер лицензий стабильно выдает обновления',
      'Клиентские инсталляции обновляются в 1 клик с бэкапом',
      'Свидетельство Роспатента получено'
    ],
    risks: 'Безопасность приватных ключей подписи. Митигация: хранение ключей на защищенном сервере с правами 0600.',
    done: 'Сделано. license.billing.smit34.ru работает: тарифы лицензий, каталог модулей с версиями, счета/акты, ЮKassa, кабинет клиента, автообновление.'
  },
  {
    id: 'r6',
    rank: 6,
    rankLabel: 'Приоритет №6',
    title: 'Мультиорганизация / Multi-tenant (Фаза 1)',
    summary: 'Изоляция данных по организациям в одной БД: реквизиты, кассы 54-ФЗ, платежные настройки, почта, брендинг. В бою СмІТ, Робор, ИТЦ.',
    intro: 'Реализовано как модуль мультиорганизации вместо устаревшего OPERATOR_ID из Carbon 4.',
    why: 'Позволяет холдингам или провайдерам с несколькими юрлицами вести раздельный учет на одной инсталляции.',
    impactScore: 76,
    effortScore: 20,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа (Готово)',
    categoryTag: 'Архитектура',
    roiRatio: 3.80,
    budget: {
      time: 'Выполнено',
      money: '0 ₽',
      team: 'admin'
    },
    steps: [
      {
        title: 'Изоляция данных по Organization FK',
        body: 'Все финансовые операции, счета, кассы и абоненты привязаны к конкретной организации с контролем прав.',
        meta: 'Выполнено'
      },
      {
        title: 'Индивидуальные платежные шлюзы и кассы',
        body: 'У каждой организации — собственный магазин ЮKassa и кассовый аппарат АТОЛ Онлайн 54-ФЗ.',
        meta: 'Выполнено'
      }
    ],
    kpis: [
      '0 утечек данных между организациями',
      '3 реальные организации в бою на одной инсталляции'
    ],
    risks: 'Ошибки фильтрации при сложных SQL-запросах. Митигация: глобальные mixins и тесты изоляции.',
    done: 'Сделано. Данные изолируются по организациям, раздельные реквизиты, кассы 54-ФЗ, почта и телефония. В бою СмІТ, Робор, ИТЦ.'
  },
  {
    id: 'r7',
    rank: 7,
    rankLabel: 'Приоритет №7',
    title: 'Migration tools (миграторы из конкурентов)',
    summary: 'Автоматизированный перенос абонентов, тарифов, сальдо и платежей из Mikbill, UTM5, Carbon 4, LANBilling.',
    intro: 'Главный барьер смены биллинга для провайдера — страх потерять данные абонентов и балансы.',
    why: 'Наличие проверенного скрипта миграции превращает сложный процесс перехода в задачу на 1 рабочий день.',
    impactScore: 88,
    effortScore: 46,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа',
    categoryTag: 'Продажи & Миграция',
    roiRatio: 1.91,
    budget: {
      time: '15–20 дней на 4 мигратора',
      money: 'admin time',
      team: 'admin'
    },
    steps: [
      {
        title: 'import_from_mikbill (приоритет)',
        body: 'MySQL dump Mikbill → PostgreSQL СмИТ. Маппинг таблиц users → abonents, tariffs → tarif, payments → finance_operations. Режим --dry-run.',
        meta: '5 дней разработки'
      },
      {
        title: 'import_from_utm5 (NetUP)',
        body: 'Конвертация выгрузок UTM5 в промежуточный формат и импорт в СмИТ с пересчетом кредитов.',
        meta: '7 дней'
      },
      {
        title: 'import_from_carbon4',
        body: 'Прямой перенос из структуры Firebird/PostgreSQL Carbon 4 со 100% совместимостью полей.',
        meta: '3 дня'
      },
      {
        title: 'Инструкции и лендинг «Миграция за 1 день»',
        body: 'Пошаговый гайд со скриншотами и видеозаписью тестового переноса.',
        meta: '2 дня'
      }
    ],
    kpis: [
      '4 мигратора протестированы на реальных дампах',
      'Миграция 1 000 абонентов занимает < 30 минут',
      '0 расхождений в балансах после тестовой миграции'
    ],
    risks: 'Нестандартные кастомные поля в базах клиентов. Митигация: валидационный отчёт перед импортом.'
  },
  {
    id: 'r8',
    rank: 8,
    rankLabel: 'Приоритет №8',
    title: 'DPI-интеграция (СКАТ от VAS Experts)',
    summary: 'Подключение к аппаратно-программному комплексу СКАТ DPI через открытый REST API при появлении клиентов от 5 000 абонентов.',
    intro: 'Стандарт де-факто для средних и крупных операторов РФ для управления трафиком и блокировок.',
    why: 'Позволяет гибко шейпить трафик по категориям (видео, торренты), резать рекламу и выдавать СОРМ-3 FLOW-отчёты.',
    impactScore: 64,
    effortScore: 48,
    quadrant: 'fill_ins',
    quadrantLabel: 'Тактическое улучшение',
    categoryTag: 'Сетевые протоколы',
    roiRatio: 1.33,
    budget: {
      time: '5–7 дней',
      money: 'Лицензия СКАТ на стороне клиента',
      team: 'admin'
    },
    steps: [
      {
        title: 'Модуль dpi_scat.py',
        body: 'Синхронизация абонентов, тарифов и применение политик фильтрации через ScatDpiClient.',
        meta: '3 дня'
      },
      {
        title: 'Тарификация по типам трафика',
        body: 'Настройка тарифных планов с безлимитными мессенджерами и приоритетом онлайн-видео.',
        meta: '2 дня'
      }
    ],
    kpis: [
      'Успешный тест на виртуальном стенде СКАТ DPI',
      'Передача абонентов и правил фильтрации за < 1 сек'
    ],
    risks: 'Высокая цена СКАТ для малых ISP. Митигация: предлагать как опциональный enterprise-модуль.'
  },
  {
    id: 'r9',
    rank: 9,
    rankLabel: 'Приоритет №9',
    title: 'Voice-bot (голосовой AI на реальном телефоне)',
    summary: 'Голосовой AI-ассистент на Gemini Live: ответ на реальном номере 61-32-40, голосовой виджет, транскрибация звонков.',
    intro: 'Реализовано на передовом мультимодальном стеке Gemini Live вместо устаревшего классического IVR.',
    why: '30% абонентов старшего поколения предпочитают звонить по телефону, а не писать в чаты.',
    impactScore: 78,
    effortScore: 28,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа (Готово)',
    categoryTag: 'AI & Телефония',
    roiRatio: 2.79,
    budget: {
      time: 'Выполнено в бою',
      money: 'API вызовов + SIP-канал',
      team: 'admin + AI-инженер'
    },
    steps: [
      {
        title: 'SIP-интеграция с телефонией Asterisk / Novofon',
        body: 'Прием входящих звонков на реальный городской номер и маршрутизация на AI-конвейер.',
        meta: 'Выполнено'
      },
      {
        title: 'Голосовые сценарии с вызовом инструментов',
        body: 'Проверка баланса, активация обещанного платежа голосом, перезагрузка порта, эскалация на живого оператора.',
        meta: 'Выполнено'
      }
    ],
    kpis: [
      'Среднее время распознавания и ответа < 800 мс',
      'Автоматическое закрытие 65%+ голосовых обращений по балансу'
    ],
    risks: 'Шумы в телефонной линии. Митигация: устойчивые алгоритмы шумоподавления и DTMF-подстраховка.',
    done: 'Сделано. Голосовой AI на Gemini Live работает на реальной телефонной линии, в веб-виджете, с автообзвоном и расшифровкой записей.'
  },
  {
    id: 'r10',
    rank: 10,
    rankLabel: 'Приоритет №10',
    title: 'Видеонаблюдение и домофония «под ключ»',
    summary: 'Модуль управления IP-камерами, живой просмотр, архив, паспорта моделей, сметы монтажа и интеграция со складом ТМЦ.',
    intro: 'Полностью реализовано и прошло 5 спринтов UX-аудита (Build 2030–2044).',
    why: 'Видеонаблюдение — высокомаржинальная допуслуга для ISP с ARPU +150–500 ₽/мес на абонента.',
    impactScore: 72,
    effortScore: 25,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа (Готово)',
    categoryTag: 'Допуслуги & ARPU',
    roiRatio: 2.88,
    budget: {
      time: 'Выполнено в проде',
      money: 'admin time',
      team: 'admin'
    },
    steps: [
      {
        title: 'Модели Camera, Stream, Archive',
        body: 'Интеграция с медиасерверами, генерация ссылок HLS/WebRTC для ЛК и мобильного приложения.',
        meta: 'Выполнено'
      },
      {
        title: 'Связка с CRM и нарядами монтажа',
        body: 'Проект → выдача камер со склада по штрихкоду → наряд монтажнику → автоподключение подписки.',
        meta: 'Выполнено'
      }
    ],
    kpis: [
      'Просмотр камер в ЛК и мобильном приложении работает с задержкой < 1.5 сек',
      'Автоматическое списание абонентской платы за облачный архив'
    ],
    risks: 'Нагрузка на каналы оператора. Митигация: адаптивный битрейт и локальная запись.'
  },
  {
    id: 'r12',
    rank: 11,
    rankLabel: 'Приоритет №11 (Новое)',
    title: 'Продавать замкнутый денежный контур «под ключ»',
    summary: '54-ФЗ + выписки из почты + акты/счета + касса на организацию. Высвобождает ставку бухгалтера у малого ISP.',
    intro: 'За последние 200 билдов достроена цепочка: письмо банка → разбор выписки → автопоиск абонента → зачисление → чек 54-ФЗ в ОФД → акт PDF.',
    why: 'У большинства малых ISP этот процесс ведется вручную в 1С и кассовой программе. СмИТ полностью автоматизирует финансовый цикл.',
    impactScore: 86,
    effortScore: 22,
    quadrant: 'quick_wins',
    quadrantLabel: 'Быстрая победа (High ROI)',
    categoryTag: 'Финансы & 54-ФЗ',
    roiRatio: 3.91,
    budget: {
      time: '2–3 недели упаковки',
      money: '0 ₽ прямых',
      team: 'admin'
    },
    steps: [
      {
        title: 'Упаковка 4-минутного демо-ролика',
        body: 'Наглядный сквозной проход: приход выписки в почту → автосопоставление по ИНН/договору → чек в ОФД (ФД 27480) → вкладка «Банк» в карточке.',
        meta: 'Срок: 3 дня'
      },
      {
        title: 'Гайд по быстрому подключению АТОЛ Онлайн',
        body: 'Пошаговая инструкция настройки кассы на организацию за 1 рабочий день.',
        meta: 'Срок: 2 дня'
      },
      {
        title: 'Включение в КП как главный ROI-аргумент',
        body: 'Раздел в коммерческом предложении: «Экономия до 40 000 ₽/мес на ручном труде бухгалтера».',
        meta: 'Срок: 2 дня'
      }
    ],
    kpis: [
      '0 висящих платежей в очереди ручного разбора',
      'Пилотный клиент подключает выписки и кассу за 1 день',
      'Конверсия коммерческих предложений с фин-блоком выше на 25%'
    ],
    risks: 'Ошибочно пробитые чеки. Митигация: строгие права, подтверждение опасных действий, режим предварительного тестирования.',
    isNew: true
  },
  {
    id: 'r11',
    rank: 12,
    rankLabel: 'Приоритет №12',
    title: 'Круглосуточная поддержка 24/7 (при 10+ клиентах)',
    summary: 'Найм второго инженера техподдержки при масштабировании базы. До этого 80% типовых вопросов решает встроенный AI-агент.',
    intro: 'Необходимый этап зрелости B2B-продукта при росте числа платящих клиентов.',
    why: 'Крупные операторы требуют жесткий SLA в договоре (время ответа < 15 мин).',
    impactScore: 48,
    effortScore: 82,
    quadrant: 'thankless',
    quadrantLabel: 'Отложено до 10+ клиентов',
    categoryTag: 'Операционка & SLA',
    roiRatio: 0.59,
    budget: {
      time: 'Постоянная роль',
      money: '80–120k ₽/мес',
      team: 'Middle DevOps / Python'
    },
    steps: [
      {
        title: 'Усиление базы знаний AI-агента',
        body: 'Пополнение 73+ статей базы знаний типовыми сценариями решения инцидентов для закрытия ночных смен.',
        meta: 'Непрерывно'
      },
      {
        title: 'Формализация SLA-регламента',
        body: 'Разработка официального SLA: время реакции 1 час в рабочее время, 4 часа в нерабочее, uptime 99.5%.',
        meta: '1 день'
      }
    ],
    kpis: [
      'AI закрывает 80%+ ночных тикетов',
      'Среднее время ответа оператора < 30 минут'
    ],
    risks: 'Высокие постоянные расходы до окупаемости. Митигация: нанимать строго после достижения 5+ платных клиентов.'
  }
];

export const ROADMAP_ITEMS: RoadmapItem[] = [
  // Свежие и ключевые завершенные
  {
    id: 'rd1',
    title: 'Фискализация 54-ФЗ в боевом режиме',
    description: 'Очередь чеков, права и аудит, касса и режим на каждую организацию, ежедневный отчёт в Telegram. Первый боевой чек в ОФД — ФД 27480.',
    status: 'done',
    statusLabel: 'Готово · Build 2177–2226',
    category: 'finance',
    build: '2177-2226'
  },
  {
    id: 'rd2',
    title: 'Банковские выписки — сквозной разбор очереди',
    description: 'Поиск абонента по ФИО, договору, телефону, e-mail и ИНН (с подтягиванием реквизитов из ФНС), привязка строки, аудит изменений, сквозной путь выписка → операция → чек ОФД.',
    status: 'done',
    statusLabel: 'Готово · Build 2171–2250',
    category: 'finance',
    build: '2171-2250'
  },
  {
    id: 'rd3',
    title: 'Единая библиотека компонентов интерфейса',
    description: 'Таблицы, боковые панели, массовые действия, модалки, фильтры на мобильных, полосы чипов, бейдж организации — единый набор вместо самодельной верстки. Настройки колонок хранятся в профиле.',
    status: 'done',
    statusLabel: 'Готово · Build 2013–2250',
    category: 'ux',
    build: '2013-2250'
  },
  {
    id: 'rd4',
    title: 'Собственная Поддержка + CRM (отказ от FreeScout)',
    description: 'Тикеты из 9 каналов (email, TG, VK, SMS, звонки), SLA, автотеги, канбан сделок, наряды монтажникам, Salesbot. В работе более 3 550 сделок и 9 950 обращений.',
    status: 'done',
    statusLabel: 'Готово · Build 1431–1442',
    category: 'core',
    build: '1431-1442'
  },
  {
    id: 'rd5',
    title: 'Мультиорганизация / Multi-tenant',
    description: 'Изоляция данных по организациям в одной установке, per-org реквизиты, кассы 54-ФЗ, платежные шлюзы, почта и брендинг. В бою: СмІТ, Робор, ИТЦ.',
    status: 'done',
    statusLabel: 'Готово · В бою',
    category: 'core'
  },
  {
    id: 'rd6',
    title: 'Централизованный сервер лицензий',
    description: 'license.billing.smit34.ru: тарифы лицензий, каталог модулей и виджетов, счета/акты/договоры, оплата ЮKassa, клиентский портал, удаленное включение модулей.',
    status: 'done',
    statusLabel: 'Готово · В бою',
    category: 'infra'
  },
  {
    id: 'rd7',
    title: 'Голосовой AI-ассистент + реальная телефонная линия',
    description: 'Голосовой AI-виджет (Gemini Live), ответ на реальном номере 61-32-40, автообзвон должников, транскрибация звонков.',
    status: 'done',
    statusLabel: 'Готово · В бою',
    category: 'ai'
  },
  {
    id: 'rd8',
    title: 'SMS-шлюз через личный Android-телефон',
    description: 'Интеграция с sms-gate.app: отправка SMS по тарифу SIM-карты (экономия 5-15k ₽/мес), автоответы на БАЛАНС, ОП, ВКЛ/ВЫКЛ, fallback на агрегаторы.',
    status: 'done',
    statusLabel: 'Готово · Build 516–538',
    category: 'network',
    build: '516-538'
  },
  {
    id: 'rd9',
    title: 'Видеонаблюдение «под ключ»',
    description: 'Проект → монтаж → подписки/аренда → просмотр в ЛК и приложении, архив, сметы, связь со складом ТМЦ. 5 спринтов аудита.',
    status: 'done',
    statusLabel: 'Готово · Build 2030–2044',
    category: 'core',
    build: '2030-2044'
  },
  {
    id: 'rd10',
    title: 'Конструктор лендингов и ботов-воронок',
    description: '20+ блоков, drag-and-drop, публикация на поддомене, формы заявок сразу в воронку CRM. Боты-воронки в TG/VK с квизами и отчетами.',
    status: 'done',
    statusLabel: 'Готово · Build 1907–1972',
    category: 'core',
    build: '1907-1972'
  },
  {
    id: 'rd11',
    title: 'AI-мастер рекламных кампаний',
    description: 'Диалог с AI → кампания с метками, лендинг, форма в CRM, чек-лист готовности, тексты объявлений под Яндекс Директ и Telegram.',
    status: 'done',
    statusLabel: 'Готово · Build 1975',
    category: 'ai',
    build: '1975'
  },
  {
    id: 'rd12',
    title: 'Склад ТМЦ со сканером штрихкодов',
    description: 'Остатки и дефицит, подотчет монтажников, перемещения, поставщики, инвентаризация, мобильный сканер штрихкодов с офлайн-режимом.',
    status: 'done',
    statusLabel: 'Готово · Build 2013–2029',
    category: 'core',
    build: '2013-2029'
  },
  {
    id: 'rd13',
    title: 'Почтовый сервер оператора связи',
    description: 'Ящики сотрудников с квотами и ролями, ответ на письмо из панели уведомлений, подпись и аватар из профиля, встроенный календарь.',
    status: 'done',
    statusLabel: 'Готово · Build 2049–2112',
    category: 'infra',
    build: '2049-2112'
  },
  {
    id: 'rd14',
    title: 'СОРМ-3 вендор-паки и журнал аудита',
    description: '13 отчетов по Приказу №573, FTP/SFTP выгрузка, hex IP, SormReadinessCheck, SormExportLog audit trail.',
    status: 'done',
    statusLabel: 'Готово · Build 412–415',
    category: 'compliance',
    build: '412-415'
  },
  {
    id: 'rd15',
    title: 'Обучающие видеоролики к каждому разделу',
    description: 'Видеоролик у каждого модуля — плеер в карточке модуля и на лендинге; контекстные подсказки и ссылки на документацию.',
    status: 'done',
    statusLabel: 'Готово · Build 2170, 2265',
    category: 'ux',
    build: '2170, 2265'
  },
  {
    id: 'rd16',
    title: 'Права доступа по разделам (RBAC)',
    description: 'Запрет по умолчанию, доступ по группам, аварийный выключатель. Закрыт межорганизационный доступ к чужим данным.',
    status: 'done',
    statusLabel: 'Готово · Build 1978',
    category: 'core',
    build: '1978'
  },

  // Частично готовые
  {
    id: 'rd17',
    title: 'B2B / Корпоративный сегмент',
    description: 'Сделано: юрлица, выписки, счета/акты, кассы. В плане: иерархия холдингов («головная → филиалы»), ЭДО (Диадок / СБИС), кабинет с ролями.',
    status: 'partial',
    statusLabel: 'Частично · Основа есть',
    category: 'core',
    priority: 'HIGH'
  },
  {
    id: 'rd18',
    title: 'AI-агент поддержки v2',
    description: 'Сделано: 22 инструмента, голос, отбор базы знаний по релевантности. В плане: долговременная память (pgvector), анализ скриншотов.',
    status: 'partial',
    statusLabel: 'Частично · В проде',
    category: 'ai',
    priority: 'MED'
  },
  {
    id: 'rd19',
    title: 'Политики автоначислений за неактивность',
    description: '«Содержание линии» (150 ₽/мес). Пока работает в режиме мониторинга (1 918 кандидатов). Боевой запуск после уведомления абонентов.',
    status: 'partial',
    statusLabel: 'Режим наблюдения',
    category: 'finance'
  },
  {
    id: 'rd20',
    title: 'ЧОП — приём тревожных сигналов',
    description: 'Разбор Contact ID, SIA, Surgard и JSON. Код готов, выключен до аудита оборудования первого заказчика пультовой охраны.',
    status: 'partial',
    statusLabel: 'Код готов',
    category: 'core'
  },

  // В планах / Roadmap
  {
    id: 'rd21',
    title: 'Open API + OAuth2 Developer Portal',
    description: 'REST API v3 (camelCase, курсорная пагинация), OAuth2 (4 flows), webhook подписки с HMAC, Swagger UI, песочница и коннекторы 1С/Битрикс24.',
    status: 'planned',
    statusLabel: 'План · 13–15 недель',
    category: 'infra',
    priority: 'MED'
  },
  {
    id: 'rd22',
    title: 'DPI-интеграция (СКАТ / nDPI)',
    description: 'Deep Packet Inspection: СОРМ-3 FLOW-отчеты, walled-garden по SNI/Host вместо DNS, приоритизация VoIP/IPTV.',
    status: 'planned',
    statusLabel: 'План · 10–12 недель',
    category: 'network',
    priority: 'MED'
  },
  {
    id: 'rd23',
    title: 'Multi-Tenant Cloud SaaS',
    description: 'Изолированные схемы БД на клиента, самостоятельная регистрация, биллинг платформы. Ждет решения по 152-ФЗ.',
    status: 'planned',
    statusLabel: 'Стратегический бэклог',
    category: 'infra',
    priority: 'MED'
  },
  {
    id: 'rd24',
    title: 'OTT / VoD сервисы (Онлайн-кинотеатры)',
    description: 'VoD-каталог + pay-per-view + EPG + мобильный плеер с DRM. Требует контракта с Окко/Wink (мин. 1000+ подписчиков).',
    status: 'planned',
    statusLabel: 'Бэклог (низкий приоритет)',
    category: 'core',
    priority: 'LOW'
  },
  {
    id: 'rd25',
    title: 'Captive Portal — сетевая часть (Walled Garden)',
    description: 'Логика биллинга готова (block_policy.py, kill-switch), сетевая часть настроена на площадке.',
    status: 'done',
    statusLabel: 'Готово',
    category: 'network'
  }
];

export const PRICING_TIERS: PriceTier[] = [
  {
    id: 'start',
    name: 'Старт',
    annualPrice: 99000,
    monthlyPrice: 9900,
    badge: 'ПРОДАЁМ ПЕРВЫМ',
    isPrimary: true,
    features: [
      'Биллинг и тарификация',
      'Личный кабинет',
      'Мобильные приложения',
      'СОРМ',
      'Captive-портал'
    ],
    recommendedFor: 'Малые ISP до 1 000 абонентов, миграция с Mikbill'
  },
  {
    id: 'pro',
    name: 'Pro',
    annualPrice: 249000,
    monthlyPrice: 24900,
    inheritText: 'Всё из «Старт», плюс:',
    features: [
      'Банковские выписки',
      'Фискализация 54-ФЗ',
      'Видеонаблюдение',
      'IPTV',
      'Поддержка и CRM'
    ],
    recommendedFor: 'Развивающиеся ISP 1 000–3 000 абонентов'
  },
  {
    id: 'business',
    name: 'Бизнес',
    annualPrice: 379000,
    monthlyPrice: 37900,
    inheritText: 'Всё из «Pro», плюс:',
    features: [
      'IP-телефония',
      'AI-ассистент',
      'Мультиорганизация'
    ],
    recommendedFor: 'Зрелые операторы 3 000–8 000 абонентов'
  },
  {
    id: 'video',
    name: 'Видеонаблюдение',
    annualPrice: 79000,
    monthlyPrice: 7900,
    features: [
      'Личный кабинет',
      'Модуль видеонаблюдения',
      'Без интернет-биллинга'
    ],
    recommendedFor: 'Операторы видеонаблюдения, УК и ТСЖ'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    annualPrice: 499000,
    monthlyPrice: 49900,
    inheritText: 'Всё из «Бизнес», плюс:',
    features: [
      'Автообзвон',
      'Маркетинговые механики',
      'White-label — свой бренд'
    ],
    recommendedFor: 'Крупные операторы от 8 000 абонентов'
  }
];

export const PRICING_TERMS_CONFIG = {
  title: 'Цена и условия для первых клиентов',
  subtitle: 'Решено 30.08.2026. Прайс заведён на сервере лицензий и работает.',
  moduleNotice: 'Отдельные модули — банковские выписки, фискализация, видео, CRM — подключаются к любому тарифу по 2 500 ₽ в месяц. Цены без НДС, тарифы заведены на сервере лицензий.',
  firstClientsPolicy: {
    title: 'Скидку даём временем, не рублями',
    points: [
      {
        heading: 'Первым трём клиентам:',
        text: 'шесть месяцев бесплатно (не три — за три месяца провайдер успевает только развернуться и перенести данные), бесплатная миграция (обычно 40 000 ₽), цена зафиксирована на 24 месяца.'
      },
      {
        heading: 'Взамен:',
        text: 'отзыв с названием компании, кейс с цифрами, 2–3 референс-звонка. Не выполнил — доплачивает за льготный период по прайсу.'
      },
      {
        heading: 'Почему не скидка:',
        text: 'цену, однажды сломанную, обратно не поднять. Клиент, привыкший к «Pro» за 100k, не заплатит 249k; шесть бесплатных месяцев вернуть можно.'
      }
    ]
  },
  upsellPolicy: {
    title: 'Апселл вместо скидки',
    points: [
      {
        heading: '',
        text: 'Банковские выписки, фискализация, видео, CRM подключаются модулями по 2 500 ₽/мес. Клиент с тремя модулями платит 189 000 ₽/год — и это его решение, а не наша уступка.'
      },
      {
        heading: 'Экономика первого года честная:',
        text: 'три клиента по полгода платно ≈ 150 тыс. ₽. Второй год на прайсе с парой модулей у каждого ≈ 477 тыс. ₽. Первый год не про деньги, а про три кейса, без которых не появится четвёртый клиент.'
      }
    ]
  }
};

export const ADDON_MODULES = [
  { id: 'bank', name: 'Банковские выписки из почты', price: 2500, desc: 'Автосопоставление, счета, акты' },
  { id: 'fiscal', name: 'Фискализация 54-ФЗ (ОФД)', price: 2500, desc: 'Касса на организацию, отправка чеков' },
  { id: 'video_mod', name: 'Видеонаблюдение', price: 2500, desc: 'Облачный архив, просмотр в ЛК' },
  { id: 'crm_mod', name: 'Поддержка + CRM', price: 2500, desc: 'Тикеты, наряды, воронки' },
  { id: 'ai_mod', name: 'AI-ассистент (7 каналов)', price: 2500, desc: 'Claude / GPT / Gemini / Grok' },
  { id: 'voice_mod', name: 'Голосовой AI-агент', price: 3500, desc: 'Ответ на реальном телефоне' }
];

export const SORM_CERT_STAGES = [
  {
    id: 's1',
    title: '1. Юридическая база',
    items: [
      { req: 'Юр.лицо РФ — разработчик', status: 'ok', detail: 'ООО «СмИТ» (актуальный ЕГРЮЛ)' },
      { req: 'Регистрация программы в Роспатенте', status: 'no', detail: 'Свидетельство ФИПС, госпошлина 4500 ₽, срок 2 мес' },
      { req: 'Реестр российского ПО Минцифры', status: 'no', detail: 'Заявка бесплатна, срок 2–3 мес (нужно для тендеров)' },
      { req: 'Лицензия на разработку СЗИ (при криптографии)', status: 'warn', detail: 'ФСТЭК/ФСБ — уточняется при подаче в ЦНИИС' },
      { req: 'NDA с лабораторией и аудит кода', status: 'ok', detail: 'Полная готовность предоставить репозиторий' }
    ]
  },
  {
    id: 's2',
    title: '2. Технические требования (Приказ Минкомсвязи №573)',
    items: [
      { req: '13 типов отчетов СОРМ-3', status: 'ok', detail: 'Реализовано (Build 412–415)' },
      { req: 'FTP/SFTP передача по расписанию', status: 'ok', detail: 'billing/tasks/sorm_export.py' },
      { req: 'Hex-кодировка IP-адресов (uf_ip2hex)', status: 'ok', detail: 'Реализовано' },
      { req: 'UTF-8, разделитель «;», ISO-даты', status: 'ok', detail: 'Реализовано' },
      { req: 'SormExportLog (аудит всех выгрузок)', status: 'ok', detail: 'Реализовано для проверок ФСБ' },
      { req: 'Хранение данных 6 месяцев (Яровая)', status: 'warn', detail: 'Зависит от емкости хранилища клиента' },
      { req: 'Отчет FLOW (per-flow трафик)', status: 'bad', detail: 'Критический пробел — требует NetFlow или DPI' }
    ]
  },
  {
    id: 's3',
    title: '3. Документация по ГОСТ',
    items: [
      { req: 'Технический паспорт продукта (ОПИ)', status: 'no', detail: 'Требуется написать 40–80 страниц' },
      { req: 'Программа и методика испытаний (ПМИ)', status: 'no', detail: 'Согласовывается с лабораторией ЦНИИС' },
      { req: 'Руководство системного администратора', status: 'warn', detail: 'Есть в онлайн-docs, перевести в ГОСТ' },
      { req: 'Руководство оператора биллинга', status: 'warn', detail: 'Есть в онлайн-docs, перевести в ГОСТ' },
      { req: 'Описание архитектуры безопасности', status: 'no', detail: 'Требуется подготовить' }
    ]
  }
];

export const SORM_BUDGET_TABLE = [
  { item: 'Роспатент + патентный поверенный', cost: '~10–15 тыс. ₽' },
  { item: 'Включение в Реестр Минцифры', cost: 'Бесплатно (госпошлина 0 ₽)' },
  { item: 'DPI-интеграция (своими силами на NetFlow)', cost: '10–15 дней разработки' },
  { item: 'Подготовка комплекта документации по ГОСТ', cost: '50–150 тыс. ₽' },
  { item: 'Испытания в лаборатории ЦНИИС', cost: '300–500 тыс. ₽' },
  { item: 'Резерв на доработки (1–2 итерации)', cost: '100–300 тыс. ₽' },
  { item: 'Итоговая стоимость и срок', cost: '~500 тыс. – 1.2 млн ₽ (6–12 месяцев)' }
];

export const SORM_CHECKLIST: SormChecklistItem[] = [
  {
    id: 'sorm-1',
    title: '13 форматов выгрузок данных абонентов (Приказ №573)',
    duration: 'Реализовано',
    description: 'Генерация файлов абонентских договоров, IP-сессий, платежей, телефонных соединений и паспортных данных в формате CSV/XML/ASN.1.',
    requiredArtifacts: 'Генераторы отчетов, фоновые cron-воркеры, валидация ИНН/СНИЛС/паспорта РФ',
    currentSmITStatus: 'Готово на 100% (Build 2286)'
  },
  {
    id: 'sorm-2',
    title: 'Комплект документации по ГОСТ (ОПИ, ТУ, ПМИ)',
    duration: '2–3 месяца',
    description: 'Технический паспорт системы, описание программы и методика испытаний (ПМИ), руководство администратора и оператора по ГОСТ 19.xxx.',
    requiredArtifacts: 'Комплект из 4 документов на 150+ страниц по стандартам ЕСПД',
    currentSmITStatus: 'Онлайн-документация готова, требуется оформление по ГОСТ'
  },
  {
    id: 'sorm-3',
    title: 'Выделенный аппаратный тестовый стенд',
    duration: '2–4 недели',
    description: 'Серверный стенд с имитацией RADIUS/NetFlow трафика, базой 50k+ абонентов и генерацией тестовых событий для испытаний ЦНИИС.',
    requiredArtifacts: 'Сервер 2x Xeon, 64GB RAM, NVMe RAID, тестовые скрипты генерации нагрузки',
    currentSmITStatus: 'В плане (бюджет заложен)'
  },
  {
    id: 'sorm-4',
    title: 'Неизменяемый журнал аудита действий операторов',
    duration: 'Реализовано',
    description: 'Защищенное протоколирование любых обращений к карточкам абонентов, выгрузкам и платежам с защитой от изменения администратором.',
    requiredArtifacts: 'Модуль audit_log с хэшированием цепочки блоков (blockchain-like audit)',
    currentSmITStatus: 'Готово в ядре Django (Build 2140)'
  },
  {
    id: 'sorm-5',
    title: 'Лабораторные испытания в ИЦ ЦНИИС',
    duration: '3–6 месяцев',
    description: 'Проведение официальных испытаний соответствия в аккредитованной испытательной лаборатории (ЦНИИС или НИИР).',
    requiredArtifacts: 'Договор на испытания (~300–500k ₽), протокол испытаний, устранение замечаний',
    currentSmITStatus: 'Планируется после набора 5 платных клиентов'
  },
  {
    id: 'sorm-6',
    title: 'Согласование схемы включения с УФСБ',
    duration: '1–3 месяца',
    description: 'Утверждение схемы подключения биллинга и съемника СОРМ к пульту управления УФСБ по региону оператора.',
    requiredArtifacts: 'Типовая 3-сторонняя схема (Оператор связи, СмИТ, УФСБ)',
    currentSmITStatus: 'По типовому регламенту'
  },
  {
    id: 'sorm-7',
    title: 'Мульти-организационная изоляция выгрузок',
    duration: 'Реализовано',
    description: 'Раздельная выгрузка данных для разных юрлиц (ISP) на одной инсталляции с разными номерами лицензий связи.',
    requiredArtifacts: 'Модуль multi_tenant_sorm',
    currentSmITStatus: 'Готово (СмІТ, Робор, ИТЦ работают раздельно)'
  }
];

export const THREAT_RISKS_DATA: ThreatRisk[] = [
  {
    id: 'risk-sorm',
    code: 'RISK-01',
    name: 'Отсутствие сертификата СОРМ-3 Минцифры',
    category: 'regulatory',
    categoryLabel: 'Регуляторный',
    probability: 80,
    impact: 90,
    riskScore: 72,
    mitigatedProbability: 25,
    mitigatedImpact: 35,
    mitigatedScore: 9,
    level: 'critical',
    levelLabel: 'Критический',
    description: 'Требование УФСБ и Минцифры (Приказ №573 / ПП РФ №538) к операторам связи иметь сертифицированный биллинг при согласовании плана СОРМ. Блокирует прямые продажи крупным городским ISP (>5 000 абонентов).',
    consequences: 'Отказ консервативных провайдеров от перехода из-за риска предписаний Роскомнадзора и штрафов по ст. 13.45 КоАП РФ.',
    mitigationStrategy: '1) Партнерство с производителями сертифицированных съемников (Норси-Транс / МФИ Софт / Сигнатек), отдавая 13 форматов по типовому протоколу. 2) Фокус на ICP1/ICP2 (до 2 000 аб., коттеджи, МКС), где отдельный сертификат на биллинг не запрашивается. 3) Подготовка испытательного стенда в ЦНИИС (~500k ₽) за счет пула первых 5 платных клиентов.',
    preventiveActions: [
      'В ядре Build 2286 реализованы все 13 форматов выгрузок СОРМ-3 (абоненты, платежи, сессии, договоры)',
      'Реализован кольцевой буфер и неизменяемый журнал аудита действий операторов',
      'Обеспечена мульти-орг изоляция данных для работы нескольких юрлиц'
    ],
    owner: 'Архитектор / Юрист по связи',
    timeline: 'Q3 2026 – Q1 2027',
    residualRisk: 'Низкий при работе через сертифицированный съемник партнера',
    color: '#ef4444',
    iconName: 'ShieldAlert'
  },
  {
    id: 'risk-cto-inertia',
    code: 'RISK-02',
    name: 'Технический консерватизм и инерция CTO («Работает — не трогай»)',
    category: 'market',
    categoryLabel: 'Рыночный',
    probability: 85,
    impact: 80,
    riskScore: 68,
    mitigatedProbability: 30,
    mitigatedImpact: 30,
    mitigatedScore: 9,
    level: 'critical',
    levelLabel: 'Критический',
    description: 'Главный психологический барьер B2B продаж телеком-софта: страх остановки сети, потери балансов абонентов и ночных сбоев при миграции со старого биллинга 10-летней давности (Carbon 4, Mikbill, UTM5).',
    consequences: 'Затягивание цикла сделки (6–12 месяцев) и высокий процент отвалов на этапе согласования миграции.',
    mitigationStrategy: 'Внедрение программы «Безопасный переход»: автоматический конвертер БД + 6 месяцев бесплатного параллельного запуска (Dual-run без риска) + контрактная гарантия сохранения биллинговой истории и 100% манибэк.',
    preventiveActions: [
      'Созданы скрипты автоматической миграции баз Mikbill, Carbon 4 и UTM5',
      'Запуск интерактивного live-демо на обезличенных данных заказчика за 1 рабочий день',
      'Круглосуточный инженерный саппорт на период переключения абонентов'
    ],
    owner: 'Техлид / Пресейл-инженер',
    timeline: 'Постоянно (внедрено в Build 2286)',
    residualRisk: 'Умеренный, снимается наглядным Dual-run пилотом',
    color: '#ef4444',
    iconName: 'Clock'
  },
  {
    id: 'risk-competitor-dumping',
    code: 'RISK-03',
    name: 'Ответный демпинг и маркетинговое давление лидеров (Carbon, UTM5)',
    category: 'market',
    categoryLabel: 'Рыночный',
    probability: 70,
    impact: 65,
    riskScore: 45.5,
    mitigatedProbability: 35,
    mitigatedImpact: 30,
    mitigatedScore: 10.5,
    level: 'high',
    levelLabel: 'Высокий',
    description: 'Крупные игроки рынка могут предложить закрытые спец-скидки, бесплатный апгрейд на Carbon 5/X или рассрочку на 2 года для удержания уходящих клиентов при попытке смены биллинга.',
    consequences: 'Ценовое давление на тарифы СмИТ Биллинг и увеличение расходов на привлечение (CAC).',
    mitigationStrategy: 'Асимметричная дифференциация: встроенный AI-ассистент первого уровня поддержки (72.6% автоматизации) и современный адаптивный UI/UX, которых нет у legacy-конкурентов; открытый API и нулевая плата за дополнительные модули.',
    preventiveActions: [
      'Все 8 модулей (HelpDesk, CRM, Telegram Bot, СОРМ) включены в базовую подписку без скрытых доплат',
      'Встроенный Android SMS шлюз экономит оператору до 25 000 ₽/мес на оповещениях',
      'Публичный калькулятор ROI показывает чистую окупаемость перехода за 2.3 месяца'
    ],
    owner: 'Product Lead / Маркетинг',
    timeline: 'Q3–Q4 2026',
    residualRisk: 'Низкий за счет превосходства в AI и экономии на SMS',
    color: '#f97316',
    iconName: 'TrendingDown'
  },
  {
    id: 'risk-telecom-mna',
    code: 'RISK-04',
    name: 'M&A консолидация и поглощение малых ISP федеральными операторами',
    category: 'market',
    categoryLabel: 'Рыночный',
    probability: 80,
    impact: 60,
    riskScore: 48,
    mitigatedProbability: 50,
    mitigatedImpact: 35,
    mitigatedScore: 17.5,
    level: 'high',
    levelLabel: 'Высокий',
    description: 'Федеральные телеком-гиганты (Ростелеком, ЭР-Телеком / Дом.ру, МТС, МегаФон) ежегодно выкупают десятки региональных независимых операторов, переводя их на корпоративные проприетарные биллинги.',
    consequences: 'Постепенное сжатие общей емкости рынка классических локальных Ethernet-провайдеров в крупных городах.',
    mitigationStrategy: 'Диверсификация в растущие ниши: МКС (многоквартирные сети в новостройках), частный сектор и коттеджные поселки (PON), B2B операторы видеонаблюдения, СКУД и домофонии, а также экспансия в страны СНГ (Казахстан, Узбекистан, Беларусь).',
    preventiveActions: [
      'Архитектура мульти-организаций и партнерских франшиз в одном биллинге',
      'Поддержка специфики PON/GPON сетей и интеграция с OLT Huawei, ZTE, BDCOM, Eltex',
      'Готовые модули учета камер видеонаблюдения и умных домофонов'
    ],
    owner: 'Бизнес-девелопмент / CEO',
    timeline: '2026–2028',
    residualRisk: 'Контролируемый за счет смежных B2B и Smart City ниш',
    color: '#f97316',
    iconName: 'Building2'
  },
  {
    id: 'risk-reestr-import',
    code: 'RISK-05',
    name: 'Ужесточение требований Реестра отечественного ПО и 152-ФЗ',
    category: 'regulatory',
    categoryLabel: 'Регуляторный',
    probability: 60,
    impact: 75,
    riskScore: 45,
    mitigatedProbability: 20,
    mitigatedImpact: 25,
    mitigatedScore: 5,
    level: 'high',
    levelLabel: 'Высокий',
    description: 'Требования регуляторов и госкомпаний использовать ПО исключительно из Единого реестра Минцифры РФ с обязательной поддержкой отечественных ОС (Astra Linux, РЕД ОС, Альт Линукс) и СУБД (Postgres Pro).',
    consequences: 'Ограничение участия провайдеров-клиентов в государственных программах («УЦН 2.0», школы, ведомства) и риск предписаний.',
    mitigationStrategy: 'Подготовка пакета документации и подача заявки в Единый реестр российских программ; тестирование и сертификация совместимости с Astra Linux Special Edition и РЕД ОС.',
    preventiveActions: [
      '100% чистый открытый стек: Python 3.12, Django 5, PostgreSQL 16, NGINX, Docker',
      'Полное отсутствие зарубежных проприетарных библиотек и бинарных блобов',
      'Соответствие требованиям 152-ФЗ по хранению и обработке персональных данных на территории РФ'
    ],
    owner: 'DevOps / Системный архитектор',
    timeline: 'Q4 2026 – Q2 2027',
    residualRisk: 'Минимальный благодаря чистому Linux/Postgres стеку',
    color: '#f97316',
    iconName: 'FileCheck2'
  },
  {
    id: 'risk-llm-dependency',
    code: 'RISK-06',
    name: 'Блокировки зарубежных LLM API / Требования суверенного AI',
    category: 'technical',
    categoryLabel: 'Технический',
    probability: 50,
    impact: 70,
    riskScore: 35,
    mitigatedProbability: 15,
    mitigatedImpact: 20,
    mitigatedScore: 3,
    level: 'medium',
    levelLabel: 'Умеренный',
    description: 'Риск блокировок, изменения условий использования внешних API нейросетей или запрет передачи пользовательских промптов на зарубежные серверы.',
    consequences: 'Временный сбой в работе AI-ассистента техподдержки или регуляторные риски трансграничной передачи данных.',
    mitigationStrategy: 'Абстрактный модуль AI-Engine с поддержкой отечественных облачных LLM (YandexGPT, GigaChat) и возможностью запуска локальных Open-Source моделей (Qwen 2.5, Llama 3, DeepSeek через Ollama / vLLM) прямо на сервере провайдера.',
    preventiveActions: [
      'Автоматическое маскирование персональных данных (ФИО, паспорта, IP) перед отправкой в AI',
      'Модульная архитектура провайдеров LLM с мгновенным переключением fallback-моделей',
      'Возможность автономной работы без интернета на локальных квантованных моделях GGUF'
    ],
    owner: 'AI / Backend Team',
    timeline: 'Внедрено в Build 2286',
    residualRisk: 'Практически устранен локальным on-premise AI контуром',
    color: '#eab308',
    iconName: 'Bot'
  },
  {
    id: 'risk-cyberattacks',
    code: 'RISK-07',
    name: 'Целевые кибератаки, DDoS на биллинг и компрометация личного кабинета',
    category: 'technical',
    categoryLabel: 'Технический',
    probability: 45,
    impact: 85,
    riskScore: 38.25,
    mitigatedProbability: 15,
    mitigatedImpact: 25,
    mitigatedScore: 3.75,
    level: 'medium',
    levelLabel: 'Умеренный',
    description: 'Атаки на финансовый шлюз, распределенный DDoS на личный кабинет абонента или попытки несанкционированного списания/начисления средств администраторами.',
    consequences: 'Простой критического сервиса провайдера, финансовые потери и утечки абонентских баз.',
    mitigationStrategy: 'Полная изоляция биллингового ядра во внутреннем сегменте сети (DMZ), обязательная двухфакторная аутентификация (2FA) для админов, Rate Limiting и аппаратная фильтрация трафика.',
    preventiveActions: [
      'Криптографически защищенный аудит всех финансовых транзакций без возможности правки',
      'Изоляция платежных шлюзов (СБП, Т-Банк, Сбер, ЮKassa) с валидацией webhook-подписей',
      'Автоматическое шифрование резервных копий БД и выгрузка в географически распределенное хранилище'
    ],
    owner: 'Security Engineer',
    timeline: 'Постоянный аудит',
    residualRisk: 'Низкий при соблюдении регламента сетевой изоляции',
    color: '#eab308',
    iconName: 'Lock'
  },
  {
    id: 'risk-scaling-support',
    code: 'RISK-08',
    name: 'Узкое горлышко техподдержки при резком масштабировании установок',
    category: 'operational',
    categoryLabel: 'Операционный',
    probability: 65,
    impact: 50,
    riskScore: 32.5,
    mitigatedProbability: 25,
    mitigatedImpact: 20,
    mitigatedScore: 5,
    level: 'medium',
    levelLabel: 'Умеренный',
    description: 'При резком наплыве клиентов (10+ одновременных внедрений в месяц) команда разработчиков рискует перегрузиться задачами развертывания, кастомизации и обучения операторов.',
    consequences: 'Срыв сроков запуска пилотов, падение NPS и отвлечение ресурсов от продуктовой разработки ядра.',
    mitigationStrategy: 'Автоматизация онбординга: Docker-инсталлятор «в одну команду», интерактивная база знаний docs.billing.smit34.ru, видео-гайды и развитие сети региональных сертифицированных интеграторов.',
    preventiveActions: [
      'Развернут готовый демо-стенд demo.billing.smit34.ru для быстрого тест-драйва без участия инженеров',
      'Интерактивный AI-консультант в документации отвечает на 80% типовых вопросов настройки',
      'Модульная структура Ansible-плейбуков для развертывания за 15 минут'
    ],
    owner: 'Support Lead / DevOps',
    timeline: 'Q3–Q4 2026',
    residualRisk: 'Низкий благодаря стандартизации инсталляций',
    color: '#eab308',
    iconName: 'Users'
  },
  {
    id: 'risk-sms-provider-costs',
    code: 'RISK-09',
    name: 'Рост тарифов сотовых операторов на сервисные SMS-уведомления',
    category: 'operational',
    categoryLabel: 'Операционный',
    probability: 75,
    impact: 35,
    riskScore: 26.25,
    mitigatedProbability: 10,
    mitigatedImpact: 10,
    mitigatedScore: 1,
    level: 'low',
    levelLabel: 'Низкий',
    description: 'Операторы «Большой четверки» повышают цены на сервисные SMS до 4–6 ₽ за сообщение, что приводит к дополнительным расходам малого провайдера в 15–30k ₽/мес.',
    consequences: 'Рост эксплуатационных расходов оператора и жалобы на дороговизну информирования абонентов.',
    mitigationStrategy: 'Перевод абонентов на бесплатные омниканальные каналы: встроенный Android SMS шлюз (безлимитные SMS со смартфона провайдера за 0 ₽), Telegram Mini App бот, VK-уведомления и Push-сообщения в мобильном приложении.',
    preventiveActions: [
      'В Build 2286 полностью отлажен Android SMS Gateway с поддержкой нескольких SIM-карт и балансировкой',
      'Запущен официальный Telegram-бот самообслуживания абонентов с оплатой через СБП в 1 клик',
      'Push-уведомления доставляются бесплатно через Firebase / RuStore Push SDK'
    ],
    owner: 'Mobile / Integration Lead',
    timeline: 'Реализовано в Build 2286',
    residualRisk: 'Нулевой (затраты провайдера на SMS снижены до 0 ₽)',
    color: '#10b981',
    iconName: 'Smartphone'
  },
  {
    id: 'risk-cash-flow-delay',
    code: 'RISK-10',
    name: 'Кассовые разрывы и задержки платежей со стороны малых ISP',
    category: 'operational',
    categoryLabel: 'Операционный',
    probability: 35,
    impact: 40,
    riskScore: 14,
    mitigatedProbability: 15,
    mitigatedImpact: 15,
    mitigatedScore: 2.25,
    level: 'low',
    levelLabel: 'Низкий',
    description: 'Несвоевременная оплата ежемесячной абонентской платы или ежегодной подписки провайдерами в условиях сезонных кассовых разрывов.',
    consequences: 'Неравномерный денежный поток (Cash Flow) и риски кассового разрыва на этапе активного масштабирования.',
    mitigationStrategy: 'Стимулирование годовой предоплаты со скидкой 15–20%, система автоматических счетов с фискализацией 54-ФЗ и интеграция с облачным сервером лицензий license.billing.smit34.ru с 14-дневным grace-периодом.',
    preventiveActions: [
      'Лицензионный сервер автоматически формирует счета и акты за 10 дней до окончания периода',
      'Встроен мягкий 14-дневный grace-период для исключения остановки абонентской сети',
      'Поддержка оплаты по безналичному расчету и бизнес-картами с автоплатежом'
    ],
    owner: 'Финансовый директор / Бухгалтерия',
    timeline: 'Внедрено в Build 2286',
    residualRisk: 'Низкий, гарантирован годовыми контрактами',
    color: '#10b981',
    iconName: 'CreditCard'
  }
];

