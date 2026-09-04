/**
 * Выгрузка содержания портала в базу знаний AI-консультанта.
 *
 * Виджет на странице отвечает по базе знаний сервера лицензий, а сама
 * страница — собранный React: её текст живёт в бандле, и никакой обход
 * ссылок его не достанет. Раньше статьи снимали с отрендеренной страницы
 * и резали по 2600 знаков — из ответов пропадали шаги рекомендаций,
 * половина параметров сравнения и все меры по рискам.
 *
 * Здесь источник — те же данные, из которых собрана страница: ничего не
 * обрезается и не пересказывается. Разделы, чей текст написан прямо в
 * разметке (тезисы, сильные и слабые стороны), снимаются отдельно со
 * страницы — этим занимается вторая половина выгрузки.
 *
 * Запуск: npx tsx tools/kb-export.ts > articles.json
 */
import {
  METADATA, POSITIONING_DATA, CONCLUSION_DATA, MARKET_STATS, MARKET_SEGMENTS,
  MARKET_GROWTH_DATA, COMPETITIVE_RADAR_DATA, REGULATORY_REQUIREMENTS,
  COMPETITORS, MATRIX_DATA, RECOMMENDATIONS, ROADMAP_ITEMS, PRICING_TIERS,
  PRICING_TERMS_CONFIG, ADDON_MODULES, SORM_CERT_STAGES, SORM_BUDGET_TABLE,
  SORM_CHECKLIST, THREAT_RISKS_DATA
} from '../src/data/strategicData';

const PAGE = 'https://billing.smit34.ru/plan2026/strategy/';
const SECTION = 'Стратегия выхода на рынок';

interface Article {
  external_id: string;
  section: string;
  title: string;
  url: string;
  text: string;
  keywords: string;
  priority: number;
}

const out: Article[] = [];

/** Одна статья. Пустые куски отбрасываем — они только разбавляют поиск. */
function add(id: string, title: string, anchor: string, parts: (string | undefined | false)[],
             keywords: string[], priority = 4) {
  const text = parts.filter(Boolean).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  if (text.length < 40) return;
  out.push({
    external_id: 'plan2026:' + id,
    section: SECTION,
    title,
    url: PAGE + (anchor ? '#' + anchor : ''),
    text,
    keywords: keywords.filter(Boolean).join(', ').slice(0, 400),
    priority
  });
}

const list = (items: (string | undefined)[], bullet = '— ') =>
  items.filter(Boolean).map((x) => bullet + x).join('\n');

// ── Общее о документе ───────────────────────────────────────────────────────
add('about', 'Что это за документ и кто его автор', '', [
  'Стратегический план развития СмИТ Биллинг — интерактивный портал с разбором рынка биллинговых систем для интернет-провайдеров России и планом вывода продукта на этот рынок.',
  `Версия ${METADATA.version} от ${METADATA.date}. Автор: ${POSITIONING_DATA.author.name}, ${POSITIONING_DATA.author.role}.`,
  `Позиционирование одной фразой: ${POSITIONING_DATA.oneSentence}`,
  METADATA.build ? `Сборка продукта на момент документа: ${METADATA.build}.` : '',
  'Разделы портала: ключевые выводы, сильные и слабые стороны, состояние рынка, карта конкурентов, сравнение по 50+ параметрам, матрица рисков, 12 рекомендаций, статус планов, сервер лицензий, цена и условия, позиционирование, заключение.'
], ['стратегия', 'план развития', 'портал', 'автор', 'версия документа'], 6);

// ── Рынок ───────────────────────────────────────────────────────────────────
add('market', 'Российский рынок биллинга для интернет-провайдеров', 'market', [
  'Состояние рынка в цифрах:',
  list(MARKET_STATS.map((s: any) => `${s.label}: ${s.value}${s.description ? ' — ' + s.description : ''}`)),
  '',
  'Сегменты рынка:',
  MARKET_SEGMENTS.map((s: any) =>
    `${s.name} (${s.range})${s.isTarget ? ' — наша цель' : ''}: ${s.description} Кто работает: ${s.players}.`
  ).join('\n')
], ['рынок', 'сегменты', 'объём рынка', 'провайдеры', 'ISP'], 5);

add('market-growth', 'Динамика рынка и прогноз по годам', 'market', [
  'Оценка объёма рынка и числа операторов по годам (объёмы — млн ₽):',
  MARKET_GROWTH_DATA.map((y: any) =>
    `${y.year} (${y.periodLabel}): всего ${y.totalVolume}; микро ${y.microVolume}, малые ${y.smallVolume}, ` +
    `средние ${y.mediumVolume}, крупные ${y.largeVolume}. Операторов: микро ${y.microOperatorsCount}, ` +
    `малых ${y.smallOperatorsCount}, средних ${y.mediumOperatorsCount}. Проникновение AI ${y.aiAdoptionPct}%, ` +
    `готовность к СОРМ ${y.sormCompliantPct}%. Наш план по клиентам: ${y.smitProjectedClients}.`
  ).join('\n')
], ['динамика рынка', 'прогноз', 'рост', 'по годам'], 4);

add('regulatory', 'Требования регуляторов к биллингу провайдера', 'market', [
  'Обязательные требования, которые закрывает биллинг:',
  REGULATORY_REQUIREMENTS.map((r: any) => `${r.code} (${r.law}): ${r.detail}`).join('\n')
], ['СОРМ', 'закон', 'регулятор', 'требования', 'Роскомнадзор'], 5);

// ── Конкуренты ──────────────────────────────────────────────────────────────
COMPETITORS.forEach((c: any) => {
  add('competitor:' + c.id, `Конкурент: ${c.name}`, 'competitors', [
    `${c.name} — ${c.subtitle}. Сайт: ${c.website}.`,
    `Клиентов: ${c.clients}. На рынке с ${c.founded}. Сегмент: ${c.segment}. Цена: ${c.price}. Стек: ${c.stack}. Сертификация СОРМ: ${c.sormCert}.`,
    c.pros?.length ? 'Сильные стороны:\n' + list(c.pros) : '',
    c.cons?.length ? 'Слабые стороны:\n' + list(c.cons) : '',
    c.ourTake ? `Как мы с ним конкурируем: ${c.ourTake}` : ''
  ], ['конкурент', c.name, 'сравнение', c.segment], 5);
});

add('competitors-map', 'Карта конкурентов на рынке РФ', 'competitors', [
  'Основные системы, с которыми мы встречаемся в сделках:',
  COMPETITORS.map((c: any) =>
    `${c.name} — ${c.subtitle}; клиентов ${c.clients}, цена ${c.price}, СОРМ: ${c.sormCert}.`
  ).join('\n')
], ['конкуренты', 'карта конкурентов', 'Hydra', 'UTM5', 'LANBilling', 'BGBilling', 'Mikbill', 'Carbon'], 5);

// ── Сравнение по параметрам ─────────────────────────────────────────────────
const byCategory = new Map<string, any[]>();
MATRIX_DATA.forEach((r: any) => {
  const arr = byCategory.get(r.category) || [];
  arr.push(r);
  byCategory.set(r.category, arr);
});
/** Пометки готовности в чек-листе СОРМ: без расшифровки «warn» ничего не значит. */
const STAGE_STATUS: Record<string, string> = {
  ok: 'готово', no: 'не сделано', warn: 'под вопросом', partial: 'частично'
};

const STATUS: Record<string, string> = {
  yes: 'есть', no: 'нет', partial: 'частично', limited: 'ограниченно'
};
byCategory.forEach((rows, cat) => {
  add('matrix:' + cat, `Сравнение с конкурентами: ${cat}`, 'table', [
    `Параметры категории «${cat}» — СмІТ Биллинг против Carbon 4, UTM5, Hydra, LANBilling, BGBilling и Mikbill:`,
    rows.map((r: any) =>
      `${r.parameter}. СмІТ: ${r.smit} (${STATUS[r.smitStatus] || r.smitStatus}). ` +
      `Carbon 4: ${r.carbon}. UTM5: ${r.utm5}. Hydra: ${r.hydra}. ` +
      `LANBilling: ${r.lanbilling}. BGBilling: ${r.bgbilling}. Mikbill: ${r.mikbill}.`
    ).join('\n')
  ], ['сравнение', 'параметры', cat, 'таблица сравнения'], 4);
});

add('matrix-summary', 'Итоги сравнения по 50+ параметрам', 'table', [
  `Всего в сравнении ${MATRIX_DATA.length} параметров в ${byCategory.size} категориях: ${[...byCategory.keys()].join(', ')}.`,
  `Где СмІТ Биллинг полностью закрывает параметр: ${MATRIX_DATA.filter((r: any) => r.smitStatus === 'yes').length}; ` +
  `частично: ${MATRIX_DATA.filter((r: any) => r.smitStatus === 'partial').length}; ` +
  `ограниченно: ${MATRIX_DATA.filter((r: any) => r.smitStatus === 'limited').length}; ` +
  `нет: ${MATRIX_DATA.filter((r: any) => r.smitStatus === 'no').length}.`,
  'Чего у нас нет:',
  list(MATRIX_DATA.filter((r: any) => r.smitStatus === 'no').map((r: any) => `${r.parameter} — ${r.smit}`))
], ['сравнение итоги', 'чего нет', 'преимущества', '50 параметров'], 5);

// ── Радар возможностей ──────────────────────────────────────────────────────
COMPETITIVE_RADAR_DATA.forEach((m: any) => {
  add('radar:' + m.dimensionShort, `Оценка направления: ${m.dimension}`, 'table', [
    `${m.description}`,
    `Баллы (0–10): СмІТ ${m.smitScore}, рынок в среднем ${m.benchmarkScore}, Carbon 4 ${m.carbonScore}, Hydra ${m.hydraScore}. Цель к 2027 году: ${m.target2027}.`,
    m.smitAdvantage ? `Наше преимущество: ${m.smitAdvantage}` : '',
    m.marketReality ? `Как на рынке: ${m.marketReality}` : '',
    `Направление отнесено к категории: ${m.category === 'strength' ? 'сильная сторона' : m.category === 'weakness' ? 'слабая сторона' : 'нейтрально'}.`
  ], ['радар', m.dimension, 'оценка', 'баллы'], 4);
});

// ── Риски ───────────────────────────────────────────────────────────────────
THREAT_RISKS_DATA.forEach((r: any) => {
  add('risk:' + r.id, `Риск ${r.code}: ${r.name}`, 'risks', [
    `Категория: ${r.categoryLabel}. Уровень: ${r.levelLabel}. Вероятность ${r.probability}%, влияние ${r.impact}%, итоговая оценка ${r.riskScore}.`,
    r.mitigatedScore !== undefined ? `После мер: вероятность ${r.mitigatedProbability}%, влияние ${r.mitigatedImpact}%, оценка ${r.mitigatedScore}.` : '',
    r.description,
    r.consequences ? `Чем грозит: ${r.consequences}` : '',
    r.mitigationStrategy ? `Что делаем: ${r.mitigationStrategy}` : '',
    r.preventiveActions?.length ? 'Предупреждающие меры:\n' + list(r.preventiveActions) : '',
    `Ответственный: ${r.owner}. Срок: ${r.timeline}. Остаточный риск: ${r.residualRisk}.`
  ], ['риск', r.code, r.name, r.categoryLabel], 5);
});

add('risks-summary', 'Матрица рисков: общая картина', 'risks', [
  `Всего учтено рисков: ${THREAT_RISKS_DATA.length}.`,
  THREAT_RISKS_DATA.map((r: any) =>
    `${r.code} ${r.name} — ${r.levelLabel}, оценка ${r.riskScore}${r.mitigatedScore !== undefined ? ` (после мер ${r.mitigatedScore})` : ''}. Ответственный: ${r.owner}.`
  ).join('\n')
], ['риски', 'матрица рисков', 'угрозы'], 5);

// ── Рекомендации ────────────────────────────────────────────────────────────
RECOMMENDATIONS.forEach((r: any) => {
  add('reco:' + r.id, `Рекомендация №${r.rank}: ${r.title}`, 'recommendations', [
    `${r.rankLabel}. ${r.summary}`,
    r.intro,
    r.why ? `Зачем это нужно: ${r.why}` : '',
    r.budget ? `Оценка: срок ${r.budget.time}, бюджет ${r.budget.money}, команда ${r.budget.team}.` : '',
    r.steps?.length ? 'Как делать:\n' + r.steps.map((s: any, i: number) =>
      `${i + 1}. ${s.title}${s.meta ? ` (${s.meta})` : ''}: ${s.body}`).join('\n') : '',
    r.kpis?.length ? 'По чему поймём, что получилось:\n' + list(r.kpis) : ''
  ], ['рекомендация', r.title, 'что делать', 'приоритет'], 6);
});

add('recommendations-list', '12 стратегических рекомендаций: список', 'recommendations', [
  'Рекомендации по приоритету:',
  RECOMMENDATIONS.map((r: any) => `№${r.rank} (${r.rankLabel}) ${r.title} — ${r.summary}`).join('\n')
], ['рекомендации', 'приоритеты', 'план действий'], 6);

// ── Дорожная карта ──────────────────────────────────────────────────────────
const byStatus = new Map<string, any[]>();
ROADMAP_ITEMS.forEach((i: any) => {
  const arr = byStatus.get(i.statusLabel) || [];
  arr.push(i);
  byStatus.set(i.statusLabel, arr);
});
byStatus.forEach((items, statusLabel) => {
  add('roadmap:' + statusLabel, `Статус планов: ${statusLabel}`, 'status', [
    `Пункты дорожной карты со статусом «${statusLabel}» (${items.length}):`,
    items.map((i: any) =>
      `${i.title}${i.build ? ` (build ${i.build})` : ''}${i.priority ? ` [${i.priority}]` : ''}: ${i.description}`
    ).join('\n')
  ], ['дорожная карта', 'статус', statusLabel, 'что сделано', 'в работе'], 5);
});

// ── Цена и условия ──────────────────────────────────────────────────────────
add('pricing', 'Цена и условия для первых клиентов', 'pricing', [
  'Тарифы:',
  PRICING_TIERS.map((t: any) =>
    `${t.name}${t.badge ? ` (${t.badge})` : ''}: ${t.annualPrice.toLocaleString('ru-RU')} ₽ в год ` +
    `или ${t.monthlyPrice.toLocaleString('ru-RU')} ₽ в месяц. Кому подходит: ${t.recommendedFor}. ` +
    (t.inheritText ? `${t.inheritText} ` : '') +
    `Входит: ${t.features.join('; ')}.`
  ).join('\n'),
  '',
  ADDON_MODULES?.length ? 'Дополнительные модули (подключаются к любому тарифу):\n' +
    list(ADDON_MODULES.map((m: any) =>
      `${m.name} — ${m.price.toLocaleString('ru-RU')} ₽ в месяц: ${m.desc}`)) : '',
  '',
  (PRICING_TERMS_CONFIG as any).subtitle || '',
  (PRICING_TERMS_CONFIG as any).moduleNotice || '',
  (PRICING_TERMS_CONFIG as any).firstClientsPolicy
    ? (PRICING_TERMS_CONFIG as any).firstClientsPolicy.title + '\n' +
      ((PRICING_TERMS_CONFIG as any).firstClientsPolicy.points || [])
        .map((p: any) => `${p.heading} ${p.text}`).join('\n')
    : ''
], ['цена', 'тариф', 'стоимость', 'подписка', 'условия', 'сколько стоит'], 6);

// ── СОРМ ────────────────────────────────────────────────────────────────────
add('sorm-cert', 'Сертификация СОРМ: этапы, сроки и бюджет', 'risks', [
  'Этапы сертификации:',
  SORM_CERT_STAGES.map((st: any) =>
    st.title + '\n' + (st.items || []).map((it: any) =>
      `  ${it.req} — ${STAGE_STATUS[it.status] || it.status}: ${it.detail}`).join('\n')
  ).join('\n'),
  '',
  SORM_BUDGET_TABLE?.length ? 'Бюджет сертификации:\n' +
    list(SORM_BUDGET_TABLE.map((b: any) => `${b.item}: ${b.cost}`)) : ''
], ['СОРМ', 'сертификация', 'бюджет', 'сроки', 'ФСБ'], 5);

add('sorm-checklist', 'Что уже готово для СОРМ, а что нет', 'risks', [
  SORM_CHECKLIST.map((c: any) =>
    `${c.title} (${c.duration}). ${c.description} Нужны документы: ${c.requiredArtifacts}. Состояние у нас: ${c.currentSmITStatus}.`
  ).join('\n')
], ['СОРМ', 'чеклист', 'готовность', 'документы'], 5);

// ── Позиционирование ────────────────────────────────────────────────────────
add('positioning', 'Позиционирование и выход на рынок', 'positioning', [
  `Одной фразой: ${POSITIONING_DATA.oneSentence}`,
  POSITIONING_DATA.taglines?.length ? 'Формулировки для рынка:\n' + list(POSITIONING_DATA.taglines) : '',
  '',
  'Профили целевых клиентов:',
  POSITIONING_DATA.icps.map((i: any) =>
    `${i.name}${i.isStar ? ' — главный профиль' : ''}: абонентов ${i.audienceRange}, потенциал ${i.marketPotential}, ` +
    `рекомендуемая цена ${i.pricingRecommendation}. ${i.strategyHighlight}`
  ).join('\n')
], ['позиционирование', 'ICP', 'целевая аудитория', 'go-to-market'], 6);

add('sales-funnel', 'Воронка продаж и первые маркетинговые шаги', 'positioning', [
  'Воронка:',
  POSITIONING_DATA.salesFunnel.map((s: any) => `${s.step}. ${s.stage}: ${s.description}`).join('\n'),
  '',
  'Быстрые шаги в маркетинге:',
  POSITIONING_DATA.marketingQuickWins.map((w: any) =>
    `${w.step}. ${w.title}${w.actionLabel ? ` (${w.actionLabel}${w.actionUrl ? ': ' + w.actionUrl : ''})` : ''}`
  ).join('\n')
], ['воронка', 'продажи', 'маркетинг', 'лиды'], 5);

// ── Заключение ──────────────────────────────────────────────────────────────
add('conclusion', CONCLUSION_DATA.title || 'Заключение', 'conclusion', [
  CONCLUSION_DATA.marketInsight.lead,
  CONCLUSION_DATA.marketInsight.gapList.map((g: any) => `${g.id}. ${g.title}: ${g.description}`).join('\n'),
  '',
  `${CONCLUSION_DATA.bottleneck.heading}: ${CONCLUSION_DATA.bottleneck.description}`,
  '',
  `${CONCLUSION_DATA.keyRecommendation.heading} — ${CONCLUSION_DATA.keyRecommendation.target}. ${CONCLUSION_DATA.keyRecommendation.details}`
], ['заключение', 'вывод', 'главная рекомендация', 'ключевой инсайт'], 6);

process.stdout.write(JSON.stringify(out, null, 1));
