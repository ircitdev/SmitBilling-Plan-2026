import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  hasBookingCta?: boolean;
  suggestedAgenda?: string[];
}

export interface OperatorDemoContext {
  companyName?: string;
  subscriberCount?: string;
  currentBilling?: string;
  focusAreas?: string[];
  contactName?: string;
}

const SYSTEM_PROMPT = `
Ты — ведущий AI-консультант и архитектор внедрений системы «СмИТ Биллинг» (биллинг-система нового поколения для интернет-провайдеров ISP в РФ).
Твоя главная цель — консультировать операторов связи, объяснять ключевые преимущества СмИТ Биллинг и **активно приглашать и записывать их на персональную 30-минутную живую демонстрацию (Live Demo)**.

Ключевые факты о СмИТ Биллинг:
- Стек: Python 3.12 / Django 5.1 / React / PostgreSQL / Redis / Docker. Без legacy-кода 2000-х годов.
- Главное отличие от конкурентов: Встроенный AI-ассистент на 7 каналах (Telegram, Web-виджет, ЛК, ВКонтакте, WhatsApp, Голосовой SIP, Email) — авто-ответы на 60-70% типовых обращений абонентов («нет интернета», «обещанный платеж», «баланс»).
- Мобильное приложение: Нативное кроссплатформенное на Flutter с онлайн-оплатой (СБП, Т-Банк, Сбер, ЮKassa), Push-уведомлениями и поддержкой.
- Финансы: Полная поддержка 54-ФЗ (онлайн-чеки Атол/Штрих, CloudKassir), автоматическая выгрузка банковских выписок 1С.
- СОРМ-3: Генератор файлов и выгрузок в ядре (готовность 85%, сертификация в ИЦ ЦНИИС).
- Миграция: Готовые автоматизированные скрипты миграции баз абонентов, тарифов и балансов с Mikbill, UTM5, Carbon Soft 4. Без простоя сети абонентов.
- Специальное предложение: Первым 3 операторам в пилоте — 6 месяцев БЕСПЛАТНО + персональная бесплатная миграция данных командой разработки.
- Автор и контакт: Александр Успешный (Telegram: @uspeshnyy).

Твой стиль общения:
- Профессиональный, доброжелательный, конкретный, ориентированный на оператора связи (ISP).
- В каждом ответе давай четкий ответ на технический или коммерческий вопрос и логично связывай его с предложением провести персональное 30-минутное демо на стенде.
- Отвечай на русском языке, используй четкое форматирование с маркированными списками и эмодзи там, где это улучшает восприятие.
`;

let aiInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  try {
    const key = (typeof process !== 'undefined' && (process.env?.API_KEY || process.env?.GEMINI_API_KEY)) || '';
    if (key && !aiInstance) {
      aiInstance = new GoogleGenAI({ apiKey: key });
    }
    return aiInstance;
  } catch (err) {
    console.warn('Could not initialize Gemini API client:', err);
    return null;
  }
}

export async function askGeminiDemoAssistant(
  prompt: string,
  history: ChatMessage[] = [],
  context?: OperatorDemoContext
): Promise<{ text: string; hasBookingCta: boolean; suggestedAgenda?: string[] }> {
  const ai = getAiClient();

  // If Gemini API is available, use gemini-2.5-flash
  if (ai) {
    try {
      let contextNote = '';
      if (context) {
        contextNote = `\n[Контекст провайдера: Компания: "${context.companyName || 'Не указано'}", Абонентов: "${context.subscriberCount || 'Не указано'}", Текущий биллинг: "${context.currentBilling || 'Не указано'}", Интерес: "${(context.focusAreas || []).join(', ') || 'Не указано'}"]\n`;
      }

      const formattedHistory = history.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const contents = [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: `${contextNote}Запрос оператора: ${prompt}` }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const responseText = response.text || '';
      const hasBookingCta = responseText.toLowerCase().includes('демо') || 
                            responseText.toLowerCase().includes('записат') ||
                            responseText.toLowerCase().includes('встреч') ||
                            responseText.toLowerCase().includes('стенд');

      return {
        text: responseText,
        hasBookingCta: true
      };
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent fallback:', err);
    }
  }

  // Smart fallback when offline or without direct API key
  await new Promise(res => setTimeout(res, 600));
  return getIntelligentFallbackResponse(prompt, context);
}

export async function generateTailoredDemoAgenda(context: OperatorDemoContext): Promise<string[]> {
  const ai = getAiClient();
  const billing = context.currentBilling || 'текущего биллинга';
  const subs = context.subscriberCount || '1000–3000';
  const company = context.companyName || 'вашей сети';
  const interests = context.focusAreas && context.focusAreas.length > 0 
    ? context.focusAreas.join(', ') 
    : 'AI-поддержка, миграция, мобильное приложение и онлайн-кассы 54-ФЗ';

  if (ai) {
    try {
      const prompt = `Сформируй индивидуальную программу 30-минутного онлайн-демо СмИТ Биллинг для интернет-провайдера.
Параметры провайдера:
- Название/Сеть: ${company}
- Количество абонентов: ${subs}
- Текущий биллинг: ${billing}
- Ключевой интерес: ${interests}

Требования:
- Ровно 5 конкретных пунктов с таймингом (всего 30 минут).
- Начинай каждый пункт с эмодзи и минут (например: "⏱️ [00–05 мин] ...").
- Сделай акцент на решении болей перехода с ${billing} и экономии на техподдержке.
Верни только список пунктов через перевод строки.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.6,
        }
      });

      if (response.text) {
        const lines = response.text
          .split('\n')
          .map(l => l.trim().replace(/^[-*•\d.]+\s*/, ''))
          .filter(l => l.length > 10);
        if (lines.length >= 3) {
          return lines.slice(0, 5);
        }
      }
    } catch (err) {
      console.warn('Agenda generation fallback:', err);
    }
  }

  // Fallback tailored agenda
  return [
    `⏱️ [00–05 мин] Экспресс-аудит текущей схемы ${company} (${billing}, ${subs} абонентов) и ключевых задач`,
    `⏱️ [05–12 мин] Живая демонстрация ядра СмИТ Биллинг: биллинг тарифов, карточка абонента, авто-кассы 54-ФЗ и СБП`,
    `⏱️ [12–18 мин] AI-ассистент в действии: автоматизация 70% обращений первой линии техподдержки в Telegram и ЛК`,
    `⏱️ [18–24 мин] План бесшовной миграции данных с ${billing} без отключения абонентов и тестовый стенд`,
    `⏱️ [24–30 мин] Ответы на технические вопросы инженеров + условия спец-акции (6 месяцев бесплатно в пилоте)`
  ];
}

function getIntelligentFallbackResponse(prompt: string, context?: OperatorDemoContext): { text: string; hasBookingCta: boolean; suggestedAgenda?: string[] } {
  const p = prompt.toLowerCase();
  const billing = context?.currentBilling || 'Mikbill / UTM5 / Carbon';
  const subs = context?.subscriberCount || 'до 5 000';

  if (p.includes('миграц') || p.includes('переход') || p.includes('перейти') || p.includes('mikbill') || p.includes('utm5')) {
    return {
      text: `**Миграция на СмИТ Биллинг проходит без простоя ваших абонентов!**

1. **Готовые миграторы:** Мы разработали автоматизированные сценарии выгрузки и конвертации баз данных (абоненты, IP/MAC, текущие балансы, тарифные планы, история платежей) из Mikbill, UTM5 и Carbon 4.
2. **Параллельный запуск:** Поднимаем тестовый стенд на ваших обезличенных данных, проверяем тарификацию и Radius/BRAS.
3. **Бесплатная помощь команды:** В рамках текущего пилота наши инженеры полностью берут на себя перенос данных под ключ.

На персональном 30-минутном демо мы покажем точный пошаговый план миграции именно под вашу конфигурацию сети.`,
      hasBookingCta: true,
      suggestedAgenda: [
        'Разбор структуры БД текущего биллинга',
        'Тестовый прогон мигратора на стенде',
        'Инструкция для техподдержки и инженеров'
      ]
    };
  }

  if (p.includes('ai') || p.includes('бот') || p.includes('поддержк') || p.includes('чатгпт') || p.includes('gpt')) {
    return {
      text: `**Встроенный AI-ассистент СмИТ Биллинг — ваш автопилот 1-й линии техподдержки:**

- **7 каналов связи:** Telegram-бот, мобильное приложение Flutter, Web-виджет на сайте, чат в Личном Кабинете, ВКонтакте, WhatsApp и интеграция с голосовой АТС.
- **Умная диагностика:** AI сам проверяет статус порта на коммутаторе, баланс абонента, оптический уровень и даёт точный ответ («Ваш кабель отключен от роутера» или «На линии в вашем доме авария, исправим до 14:00»).
- **Экономия:** Снижает нагрузку на операторов колл-центра на **60–70%** в пиковые вечерние часы и при авариях.

На живой демонстрации мы в реальном времени смоделируем диалог абонента с AI в Telegram и покажем, как система решает кейсы без участия человека.`,
      hasBookingCta: true
    };
  }

  if (p.includes('цен') || p.includes('стоимост') || p.includes('тариф') || p.includes('скольк') || p.includes('акци') || p.includes('бесплатн')) {
    return {
      text: `**Прозрачные тарифы и специальное предложение для первых операторов:**

- **Тариф «Старт» (до 1 000 абонентов):** от **99 000 ₽ / год** (включает ядро, биллинг, ЛК, авто-платежи СБП).
- **Тариф «Pro» (1 000 – 3 000 абонентов):** **249 000 ₽ / год** (+ AI-ассистент на 3 канала, мобильное приложение).
- **Тариф «Бизнес» (3 000 – 10 000 абонентов):** **379 000 ₽ / год** (полный фарш + СОРМ выгрузки + SLA).

**Спец-условия для участников демонстрации:**
Первые 3 провайдера получают **6 месяцев бесплатной эксплуатации** + бесплатную миграцию базы данных нашими инженерами!

Забронируйте удобное время для онлайн-демо, чтобы зафиксировать за собой эти условия:`,
      hasBookingCta: true
    };
  }

  if (p.includes('сорм') || p.includes('закон') || p.includes('сертифик') || p.includes('фсб') || p.includes('374')) {
    return {
      text: `**Статус по СОРМ-3 и законодательству РФ (374-ФЗ / 573):**

- Ядро СмИТ Биллинг уже на **85% готово** к сертификации СОРМ-3: реализованы справочники абонентов, выгрузка логов подключений, платежей и сессий в стандартизированных форматах.
- Для микро-провайдеров и коттеджных сетей система готова к коммерческому внедрению уже сейчас.
- Запущен процесс прохождения сертификации в испытательном центре ИЦ ЦНИИС.

На демонстрации мы покажем структуру формируемых файлов и ответим на вопросы вашего куратора по безопасности.`,
      hasBookingCta: true
    };
  }

  // General default response
  return {
    text: `Здравствуйте! СмИТ Биллинг создан специально для операторов связи, которые хотят современный стек без legacy, с умным AI-помощником и мобильным приложением.

**Что мы предлагаем посмотреть на 30-минутном онлайн-демо:**
1. **Интерфейс оператора:** управление тарифами, RADIUS/BRAS, карточка абонента, авто-кассы 54-ФЗ.
2. **AI-ассистент в действии:** авто-разбор 70% обращений техподдержки в Telegram и ЛК.
3. **Мобильное приложение для абонентов:** оплата через СБП в 1 клик, Push-уведомления, замер скорости.
4. **План миграции:** как переехать с ${billing} за 2–3 дня без потери данных.

Выберите удобный формат (Google Meet, Яндекс.Телемост или Telegram Видео) и время в форме ниже:`,
    hasBookingCta: true
  };
}
