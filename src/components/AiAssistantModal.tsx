import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { COMPETITORS, RECOMMENDATIONS, METADATA } from '../data/strategicData';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    text: 'Здравствуйте! Я AI-ассистент по стратегии и продукту **СмИТ Биллинг** (Build 2286). Вы можете спросить меня о сравнении с Carbon Soft, UTM5, Hydra или LANBilling, расчёте окупаемости, архитектуре AI на 7 каналах, модулях 54-ФЗ или плане сертификации СОРМ-3. Чем помочь?'
  }
];

const SUGGESTED_PROMPTS = [
  'В чём главное отличие СмИТ от Carbon Soft?',
  'Сколько времени и средств нужно для сертификации СОРМ-3?',
  'Как устроен мульти-провайдер AI на 7 каналах?',
  'Почему для ISP выгоднее Android SMS-шлюз, чем SMS-агрегаторы?'
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (promptToSend?: string) => {
    const query = promptToSend || inputValue.trim();
    if (!query || isLoading) return;

    const userMessage: Message = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build context from strategic facts
      const context = `
Вы — ведущий стратегический эксперт и продуктовый архитектор системы СмИТ Биллинг (версия Build 2286).
Ваша задача — давать точные, аргументированные, структурированные ответы на русском языке на вопросы операторов связи, инженеров и инвесторов.

Ключевые факты о СмИТ Биллинг:
- Архитектура: Python 3.12, Django 5.1, PostgreSQL 17, Redis, Celery, React 19, Flutter 3.27.
- Позиционирование: Биллинг провайдера в эпоху AI с современным UX.
- Главные преимущества:
  1. Мульти-провайдер AI-ассистент на 7 каналах (ЛК, Mobile, Email, Веб-виджет, SIP 61-32-40, Telegram, подсказки оператору) с поддержкой Claude, GPT-4o, Gemini 2.5, YandexGPT, Grok и 22 действиями.
  2. Современный UI с дизайн-системой .smit-* (Build 408-466), WCAG AA тёмная тема.
  3. Кроссплатформенное мобильное приложение на Flutter.
  4. Встроенная Поддержка + CRM в ядре (без оторванных систем).
  5. Встроенный маркетинг, конструктор лендингов, боты в воронке.
  6. Интерактивный граф знаний на /understand (2524 узла).
  7. Android SMS-шлюз (экономия до 180k ₽/год).
- Сравнение с конкурентами:
  - Carbon Soft: гигант рынка (1000+ сетей), но нет AI на каналах, устаревший UI, дорогой вход.
  - Hydra: enterprise-уровень, C++/Oracle, долгие внедрения, ориентир на 50k+ абонентов.
  - UTM5 / LANBilling / BGBilling: старые монолиты начала 2000-х без глубокого AI и современного CRM.
- Статус СОРМ: 13 форматов выгрузок СОРМ-3 и аудит готовы, требуется сертификация в ЦНИИС (~500k-1.2M ₽, 6-12 мес).

Отвечайте структурированно, с выделением ключевых преимуществ, фактов и практических цифр.
      `;

      // Try calling Gemini API via @google/genai
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
      
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${context}\n\nВопрос пользователя: ${query}`,
        });

        const replyText = response.text || 'Извините, не удалось сформировать ответ.';
        setMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
      } else {
        // Fallback simulated intelligent response based on keywords
        let fallbackReply = '';
        const lowerQ = query.toLowerCase();

        if (lowerQ.includes('carbon') || lowerQ.includes('карбон')) {
          fallbackReply = `**Сравнение СмИТ Биллинг с Carbon Soft:**\n\n1. **AI и автоматизация:** У Carbon Soft нет мультипровайдерного AI-ассистента на 7 каналах (SIP-телефон, мессенджеры, ЛК, почта). В СмИТ AI автоматизирует 72.6% типовых обращений.\n2. **Интерфейс:** Carbon использует устаревший UI начала 2010-х, СмИТ построен на единой дизайн-системе 2026 года с чистым UX и тёмной темой WCAG AA.\n3. **CRM и маркетинг:** У Carbon маркетинг оторван, в СмИТ конструктор лендингов, Salesbot и сбор лидов встроены прямо в ядро.\n4. **Сильная сторона Carbon:** 1000+ внедренных операторов и готовый сертификат СОРМ-3.`;
        } else if (lowerQ.includes('сорм') || lowerQ.includes('сертификат')) {
          fallbackReply = `**План сертификации СОРМ-3 для СмИТ Биллинг:**\n\n- **Что уже готово:** Все 13 форматов выгрузок по Приказу Минцифры №573, кольцевой буфер и неизменяемый лог аудита.\n- **Что требуется:** 1) Подготовка методики испытаний; 2) Выделение аппаратного тестового стенда; 3) Договор с ИЦ ЦНИИС (~500 000 – 1 200 000 ₽); 4) Стендовые испытания (3–6 мес); 5) Согласование с территориальным УФСБ оператора.\n- **Общий срок:** 6–12 месяцев.`;
        } else if (lowerQ.includes('sms') || lowerQ.includes('смс') || lowerQ.includes('шлюз')) {
          fallbackReply = `**Преимущество Android SMS-шлюза (sms-gate.app):**\n\n- **Стоимость агрегаторов:** SMS через SMSC/Stream Telecom стоит 3.2–3.8 ₽ за сообщение. При базе 3000 абонентов оператор тратит 10–15 тыс. ₽/мес.\n- **Android-шлюз в СмИТ:** Используется смартфон с SIM-картой с безлимитными SMS (около 700–900 ₽/мес). Экономия составляет до 150 000 – 180 000 ₽ в год.\n- Поддерживаются двусторонние команды: абонент может отправить «БАЛАНС» или «ОП» (обещанный платеж) в ответ и получить автоматическую обработку.`;
        } else {
          fallbackReply = `**СмИТ Биллинг (Build 2286)** — это комплексное решение для современных интернет-провайдеров. Ключевые возможности: ядро биллинга (Django/PostgreSQL 17), мульти-провайдер AI (Claude, GPT-4o, Gemini), встроенный HelpDesk и CRM, мобильное приложение на Flutter, 54-ФЗ онлайн-кассы и выгрузки СОРМ-3. Для конкретизации выберите один из быстрых вопросов ниже.`;
        }

        setMessages((prev) => [...prev, { role: 'assistant', text: fallbackReply }]);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'СмИТ Биллинг объединяет современный биллинг, CRM, HelpDesk и AI-автоматизацию на 7 каналах связи. Задайте уточняющий вопрос или воспользуйтесь подсказками ниже.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full h-[650px] max-h-[90vh] shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  СмИТ AI Консультант
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Gemini 2.5
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Стратегия, конкурентный анализ, расчёты внедрения и СОРМ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4 scrollbar-thin">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-[22px] max-w-[85%] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-sm shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-200/60 dark:border-slate-700/60 shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-[22px] bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs rounded-tl-sm flex items-center gap-2">
                <span className="animate-pulse">Формирую стратегический ответ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Container */}
        {messages.length < 3 && (
          <div className="px-5 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2.5"
          >
            <input
              type="text"
              placeholder="Спросите о стратегии, конкурентах, окупаемости..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
