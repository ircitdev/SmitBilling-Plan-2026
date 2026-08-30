import React, { useState, useEffect, useRef } from 'react';
import { useExitAnimation } from '../hooks/useExitAnimation';
import {
  MessageCircle, 
  Sparkles, 
  X, 
  Send, 
  Calendar, 
  Clock, 
  Bot, 
  CheckCircle2, 
  Download, 
  MessageSquare, 
  ExternalLink, 
  ArrowRight, 
  Building2, 
  Users, 
  Server, 
  Video, 
  Copy, 
  Check, 
  ChevronRight, 
  HelpCircle,
  Zap,
  RefreshCw,
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { ChatMarkdown } from './ChatMarkdown';
import { DemoBooking } from '../types';
import { METADATA } from '../data/strategicData';
import { 
  askGeminiDemoAssistant, 
  generateTailoredDemoAgenda, 
  ChatMessage, 
  OperatorDemoContext 
} from '../services/geminiService';

interface GeminiDemoWidgetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  initialMode?: 'chat' | 'book' | 'bookings';
  initialContext?: Partial<OperatorDemoContext>;
}

const STORAGE_KEY = 'smit_demo_bookings';

const QUICK_PROMPTS = [
  '📅 Записаться на 30-минутное live-демо',
  '🔄 Как проходит миграция с Mikbill / UTM5?',
  '🤖 Как работает AI-поддержка на 7 каналах?',
  '💰 Условия: 6 месяцев бесплатно в пилоте',
  '🛡️ Готовность к СОРМ-3 и 54-ФЗ'
];

const BILLING_OPTIONS = [
  'Mikbill',
  'UTM5',
  'Carbon Soft',
  'Hydra',
  'LANBilling',
  'BGBilling',
  'Самописный'
];

const SUBSCRIBER_RANGES = [
  '200 – 500',
  '500 – 2 000',
  '2 000 – 5 000',
  '5 000 – 15 000',
  '15 000+'
];

const FOCUS_AREAS_OPTIONS = [
  'AI-автоматизация техподдержки (7 каналов)',
  'Бесшовная миграция базы без простоя',
  'Мобильное приложение для абонентов (Flutter)',
  'Финансы: 54-ФЗ чеки, СБП и банковские выписки',
  'СОРМ-3 выгрузки и безопасность',
  'Управление RADIUS / BRAS / MikroTik'
];

const MEETING_FORMATS: Array<{ id: DemoBooking['format']; label: string; icon: string }> = [
  { id: 'google_meet', label: 'Google Meet', icon: '📹' },
  { id: 'telemost', label: 'Яндекс.Телемост', icon: '🌐' },
  { id: 'telegram_video', label: 'Telegram Видео', icon: '✈️' },
  { id: 'phone_call', label: 'Телефонный звонок', icon: '📞' }
];

export const GeminiDemoWidget: React.FC<GeminiDemoWidgetProps> = ({
  isOpen,
  onOpen,
  onClose,
  initialMode = 'chat',
  initialContext
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'book' | 'bookings'>(initialMode);
  
  // Floating banner dismiss state
  const [showTeaser, setShowTeaser] = useState(true);

  // Кнопка и подсказка появляются не сразу: первые секунды читатель
  // изучает документ, всплывающий помощник в этот момент только мешает.
  const { mounted: chatMounted, closing: chatClosing } = useExitAnimation(isOpen);
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setIsRevealed(true), 20000);
    return () => window.clearTimeout(t);
  }, []);

  // Подсказка живёт полминуты и убирается сама: своё дело она сделала,
  // дальше это просто плашка, перекрывающая текст. Кнопка остаётся.
  useEffect(() => {
    if (!isRevealed) return;
    const t = window.setTimeout(() => setShowTeaser(false), 30000);
    return () => window.clearTimeout(t);
  }, [isRevealed]);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Здравствуйте! 👋 Я **AI-консультант** по системе **СмИТ Биллинг**.

Моя цель — помочь вашей сети оптимизировать расходы, уйти от устаревшего софта и организовать для вас **персональное 30-минутное онлайн-демо** на живом стенде.

Чем я могу помочь прямо сейчас? Вы можете задать любой вопрос по архитектуре, миграции или сразу выбрать удобное время для демонстрации!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasBookingCta: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Booking Form State
  const [companyName, setCompanyName] = useState(initialContext?.companyName || '');
  const [contactName, setContactName] = useState(initialContext?.contactName || '');
  const [contactChannel, setContactChannel] = useState<'telegram' | 'phone' | 'email'>('telegram');
  const [contactValue, setContactValue] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(initialContext?.subscriberCount || '500 – 2 000');
  const [currentBilling, setCurrentBilling] = useState(initialContext?.currentBilling || 'Mikbill');
  const [focusAreas, setFocusAreas] = useState<string[]>(
    initialContext?.focusAreas || ['AI-автоматизация техподдержки (7 каналов)', 'Бесшовная миграция базы без простоя']
  );
  const [format, setFormat] = useState<DemoBooking['format']>('google_meet');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [customNotes, setCustomNotes] = useState('');
  
  // AI Tailored Agenda State
  const [generatedAgenda, setGeneratedAgenda] = useState<string[]>([]);
  const [isGeneratingAgenda, setIsGeneratingAgenda] = useState(false);

  // Stored Bookings State
  const [savedBookings, setSavedBookings] = useState<DemoBooking[]>([]);
  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<DemoBooking | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load saved bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to load demo bookings:', e);
    }
  }, []);

  // Update context when initialContext changes
  useEffect(() => {
    if (initialContext) {
      if (initialContext.companyName) setCompanyName(initialContext.companyName);
      if (initialContext.currentBilling) setCurrentBilling(initialContext.currentBilling);
      if (initialContext.subscriberCount) setSubscriberCount(initialContext.subscriberCount);
      if (initialContext.focusAreas) setFocusAreas(initialContext.focusAreas);
    }
  }, [initialContext]);

  // Set initial mode
  useEffect(() => {
    if (isOpen && initialMode) {
      setActiveTab(initialMode);
    }
  }, [isOpen, initialMode]);

  // Scroll chat to bottom
  useEffect(() => {
    if (activeTab === 'chat' && isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isOpen, isTyping]);

  // Save booking to storage
  const saveBookingToStorage = (booking: DemoBooking) => {
    try {
      const updated = [booking, ...savedBookings.filter(b => b.id !== booking.id)];
      setSavedBookings(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save demo booking:', e);
    }
  };

  // Handle Chat Submit
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    const context: OperatorDemoContext = {
      companyName,
      subscriberCount,
      currentBilling,
      focusAreas,
      contactName
    };

    try {
      const response = await askGeminiDemoAssistant(query, [...messages, userMsg], context);
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasBookingCta: response.hasBookingCta,
        suggestedAgenda: response.suggestedAgenda
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error getting response:', err);
    } finally {
      setIsTyping(false);
    }
  };

  // Generate AI tailored agenda
  const handleGenerateAgenda = async () => {
    setIsGeneratingAgenda(true);
    try {
      const agenda = await generateTailoredDemoAgenda({
        companyName,
        subscriberCount,
        currentBilling,
        focusAreas,
        contactName
      });
      setGeneratedAgenda(agenda);
    } catch (err) {
      console.error('Agenda generation failed:', err);
    } finally {
      setIsGeneratingAgenda(false);
    }
  };

  // Handle Booking Form Submit
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) return;

    const bookingId = `SMIT-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: DemoBooking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      companyName: companyName || 'Не указано',
      contactName: contactName || 'Представитель провайдера',
      contactChannel,
      contactValue,
      subscriberCount,
      currentBilling,
      focusAreas,
      preferredDate,
      preferredTime,
      format,
      customNotes,
      aiTailoredAgenda: generatedAgenda.length > 0 ? generatedAgenda : undefined,
      status: 'confirmed'
    };

    saveBookingToStorage(newBooking);
    setLastConfirmedBooking(newBooking);
    setActiveTab('bookings');

    // Add confirmation message to chat
    const confMessage: ChatMessage = {
      id: `sys-${Date.now()}`,
      sender: 'system',
      text: `🎉 **Заявка на демонстрацию успешно зарегистрирована!** (Код: \`${bookingId}\`)\n\nДата и время: **${preferredDate} в ${preferredTime} (МСК)**\nФормат: **${MEETING_FORMATS.find(f => f.id === format)?.label || format}**\n\nМы отправили уведомление команде внедрения СмИТ Биллинг. Вы можете скачать файл календаря (.ics) или написать Александру напрямую в Telegram.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confMessage]);
  };

  // Generate .ics calendar download
  const handleDownloadIcs = (booking: DemoBooking) => {
    const [year, month, day] = booking.preferredDate.split('-').map(Number);
    const [hour, minute] = booking.preferredTime.split(':').map(Number);
    
    // Create Date objects (assume MSK UTC+3 for consistency)
    const startDate = new Date(Date.UTC(year, month - 1, day, hour - 3, minute));
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 mins

    const formatIcsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const agendaText = (booking.aiTailoredAgenda || [])
      .map(item => `- ${item}`)
      .join('\\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//СмИТ Биллинг//Демонстрация системы//RU',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${booking.id}@billing.smit34.ru`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:Живая демонстрация СмИТ Биллинг для ${booking.companyName}`,
      `DESCRIPTION:Персональное 30-минутное онлайн-демо СмИТ Биллинг.\\n\\nОператор: ${booking.companyName}\\nТекущий биллинг: ${booking.currentBilling}\\nАбонентов: ${booking.subscriberCount}\\nФормат: ${booking.format}\\n\\nПрограмма встречи:\\n${agendaText || 'Презентация возможностей ядра, AI-ассистента и плана миграции.'}\\n\\nКонтакты: Александр Успешный (@uspeshnyy)`,
      `LOCATION:${MEETING_FORMATS.find(f => f.id === booking.format)?.label || 'Онлайн-встреча'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `smit-billing-demo-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy to clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Delete booking
  const handleDeleteBooking = (id: string) => {
    const updated = savedBookings.filter(b => b.id !== id);
    setSavedBookings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (lastConfirmedBooking?.id === id) {
      setLastConfirmedBooking(null);
    }
  };

  // Telegram notification URL
  const getTelegramShareUrl = (booking: DemoBooking) => {
    const msg = `Здравствуйте, Александр! Записался на демонстрацию СмИТ Биллинг.\nКод: ${booking.id}\nКомпания: ${booking.companyName}\nТекущий биллинг: ${booking.currentBilling} (${booking.subscriberCount} абонентов)\nУдобное время: ${booking.preferredDate} в ${booking.preferredTime} МСК (${booking.format})\nКонтакт: ${booking.contactName} (${booking.contactValue})`;
    return `https://t.me/uspeshnyy?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (Fixed in bottom right) */}
      <div
        className={`fixed bottom-5 right-5 z-[45] flex flex-col items-end gap-3 transition-opacity duration-500 motion-reduce:transition-none ${isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isRevealed}
      >
        {/* Floating Teaser Bubble (Dismissable / Auto-inviting) */}
        {showTeaser && !isOpen && (
          <div className="frosted-card relative bg-white/70 dark:bg-slate-900/70 border border-emerald-500/40 dark:border-emerald-500/30 rounded-2xl p-4 shadow-2xl max-w-xs sm:max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors"
              title="Закрыть подсказку"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div className="pr-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    AI-Консультант
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                  Запишитесь на <strong>живое 30-мин демо</strong> СмИТ Биллинг с разбором вашей сети и спец-условиями (6 мес бесплатно)!
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowTeaser(false);
                      onOpen();
                      setActiveTab('book');
                    }}
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
                  >
                    <span>Записаться на демо</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Pill */}
        {!isOpen && (
          <button
            onClick={() => {
              setShowTeaser(false);
              setActiveTab('chat');
              onOpen();
            }}
            className="liquid-metal liquid-metal-dark group relative w-16 h-16 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300 hover:scale-105 border border-slate-700/50 dark:border-emerald-400/40 flex items-center justify-center motion-reduce:transition-none motion-reduce:hover:scale-100"
            title="Спросить AI и записаться на демо"
            aria-label="Спросить AI и записаться на демо"
          >
            {/* Glowing Accent Aura */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 opacity-40 group-hover:opacity-75 blur-sm transition-opacity" />

            <MessageCircle className="relative z-10 w-7 h-7" />

            {/* У круглой кнопки нет места для текста — статус показываем точкой */}
            <span className="absolute top-1 right-1 z-10 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900 dark:border-emerald-700" />
            </span>

            {/* Подпись выезжает слева при наведении и с клавиатуры */}
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-slate-900 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 hidden sm:block">
              Запись на демо
            </span>
          </button>
        )}
      </div>

      {/* MODAL / WIDGET WINDOW */}
      {chatMounted && (
        <div className={`fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 ${chatClosing ? 'is-closing' : ''}`}>
          <div 
            className="panel-bottom w-full h-[100dvh] sm:h-auto sm:max-w-2xl bg-white dark:bg-slate-900 border-0 sm:border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-[32px] shadow-2xl flex flex-col max-h-none sm:max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom-6 duration-300 motion-reduce:animate-none"
          >
            {/* WIDGET HEADER */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      AI • Запись на демонстрацию
                    </h3>
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Персональный разбор вашей сети и ядра СмИТ Биллинг (30 мин)
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                title="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* NAVIGATION TABS */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 bg-white dark:bg-slate-900">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Диалог</span>
              </button>

              <button
                onClick={() => setActiveTab('book')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors relative ${
                  activeTab === 'book'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Бронь</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Записи ({savedBookings.length})</span>
              </button>
            </div>

            {/* TAB CONTENT 1: CHAT WITH GEMINI */}
            {activeTab === 'chat' && (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Chat Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[50vh] sm:max-h-[55vh]">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender !== 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 dark:bg-emerald-600 text-white rounded-tr-none'
                          : msg.sender === 'system'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white'
                          : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/60 dark:border-slate-700/60'
                      }`}>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ChatMarkdown text={msg.text} />
                        </div>

                        {/* Suggested Agenda Items if present */}
                        {msg.suggestedAgenda && msg.suggestedAgenda.length > 0 && (
                          <div className="mt-3 p-3 bg-white/70 dark:bg-slate-900/70 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                            <p className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-amber-500" />
                              Рекомендуемый план демонстрации:
                            </p>
                            <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                              {msg.suggestedAgenda.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-500 font-bold">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Interactive Call to Action button inside chat bubble */}
                        {msg.hasBookingCta && msg.sender === 'assistant' && (
                          <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-2">
                            <button
                              onClick={() => setActiveTab('book')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all hover:scale-105"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Забронировать демо под эти параметры</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        <div className={`text-[10px] mt-1.5 opacity-60 text-right ${
                          msg.sender === 'user' ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 justify-start items-center text-slate-400 text-xs py-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">Gemini формирует ответ...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Prompts Bar */}
                <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex items-center gap-2 no-scrollbar">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Подсказки:
                  </span>
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Задайте вопрос или напишите параметры вашей сети..."
                      className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isTyping}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Отправить</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: DEMO BOOKING FORM */}
            {activeTab === 'book' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[65vh]">
                <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800/80">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                        Спец-предложение для участников демонстрации
                      </h4>
                      <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-0.5 leading-relaxed">
                        Первые 3 подключившихся провайдера получают <strong>6 месяцев бесплатного пилота</strong> + бесплатную миграцию базы данных нашими инженерами под ключ.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  {/* Company & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Название провайдера / сети
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Например: ООО «Сеть-Телеком»"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Контактное лицо
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Имя и должность (напр. Алексей, ТД)"
                        className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Contact Channel & Value */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Способ связи для подтверждения встречи *
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {(['telegram', 'phone', 'email'] as const).map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setContactChannel(ch)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                            contactChannel === ch
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {ch === 'telegram' ? '✈️ Telegram' : ch === 'phone' ? '📞 Телефон' : '✉️ Email'}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      required
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        contactChannel === 'telegram'
                          ? '@username или номер в Telegram'
                          : contactChannel === 'phone'
                          ? '+7 (999) 000-00-00'
                          : 'isp@provider.ru'
                      }
                      className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Current Billing & Subscribers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Текущий биллинг сети
                      </label>
                      <select
                        value={currentBilling}
                        onChange={(e) => setCurrentBilling(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {BILLING_OPTIONS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Абонентская база
                      </label>
                      <select
                        value={subscriberCount}
                        onChange={(e) => setSubscriberCount(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {SUBSCRIBER_RANGES.map((r) => (
                          <option key={r} value={r}>{r} абонентов</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Focus Areas Multi-select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Что вам важнее всего увидеть на демонстрации?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FOCUS_AREAS_OPTIONS.map((area) => {
                        const isSelected = focusAreas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setFocusAreas(focusAreas.filter(a => a !== area));
                              } else {
                                setFocusAreas([...focusAreas, area]);
                              }
                            }}
                            className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all border flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                            }`}
                          >
                            <span>{area}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Tailored Agenda Generator Button */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Индивидуальная программа демо
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          AI сформирует 5 персонализированных этапов под ваши параметры
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleGenerateAgenda}
                        disabled={isGeneratingAgenda}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 disabled:opacity-50"
                      >
                        {isGeneratingAgenda ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                        )}
                        <span>{isGeneratingAgenda ? 'Создание...' : 'Сгенерировать'}</span>
                      </button>
                    </div>

                    {/* Render Agenda if generated */}
                    {generatedAgenda.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1.5 animate-in fade-in">
                        {generatedAgenda.map((item, idx) => (
                          <div key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Meeting Format & Date/Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                        Формат встречи
                      </label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {MEETING_FORMATS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.icon} {f.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          Дата
                        </label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-2.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                          Время (МСК)
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full px-2.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="10:00">10:00 МСК</option>
                          <option value="11:30">11:30 МСК</option>
                          <option value="14:00">14:00 МСК</option>
                          <option value="15:30">15:30 МСК</option>
                          <option value="17:00">17:00 МСК</option>
                          <option value="18:30">18:30 МСК</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Special requirements */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Комментарии или вопросы к инженеру (необязательно)
                    </label>
                    <textarea
                      rows={2}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Например: хотим уточнить возможность работы с BRAS на Linux или выгрузки в 1С..."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Записаться на демонстрацию СмИТ Биллинг</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
                      После записи будет доступен календарь (.ics) и прямой контакт с разработчиком в Telegram
                    </p>
                  </div>
                </form>
              </div>
            )}

            {/* TAB CONTENT 3: MY BOOKINGS & CONFIRMATION */}
            {activeTab === 'bookings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[65vh]">
                {lastConfirmedBooking && (
                  <div className="mb-6 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-slate-900 dark:text-white animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">
                        Демонстрация успешно забронирована!
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                      Код бронирования: <strong className="font-mono text-emerald-700 dark:text-emerald-300">{lastConfirmedBooking.id}</strong>. Мы зафиксировали за вами время и спец-условия (6 месяцев бесплатно в пилоте).
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleDownloadIcs(lastConfirmedBooking)}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-emerald-50"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Скачать в Календарь (.ics)</span>
                      </button>

                      <a
                        href={getTelegramShareUrl(lastConfirmedBooking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-emerald-500"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Открыть в Telegram (@uspeshnyy)</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Запланированные демонстрации ({savedBookings.length})
                  </h4>
                  {savedBookings.length > 0 && (
                    <button
                      onClick={() => setActiveTab('book')}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>+ Записаться ещё</span>
                    </button>
                  )}
                </div>

                {savedBookings.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <Calendar className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      У вас пока нет активных записей
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                      Заполните форму записи или попросите AI подобрать для вас персональный тайм-слот
                    </p>
                    <button
                      onClick={() => setActiveTab('book')}
                      className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-sm hover:bg-emerald-500"
                    >
                      Забронировать демо сейчас
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {savedBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                                {b.id}
                              </span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {b.companyName}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {b.contactName} ({b.contactValue}) · Текущий: {b.currentBilling} ({b.subscriberCount} аб.)
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                            title="Удалить запись"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Meeting Metadata */}
                        <div className="grid grid-cols-2 gap-2 my-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{b.preferredDate} в {b.preferredTime} МСК</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <Video className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{MEETING_FORMATS.find(f => f.id === b.format)?.label || b.format}</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            onClick={() => handleDownloadIcs(b)}
                            className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs font-medium flex items-center gap-1.5 hover:bg-slate-100"
                          >
                            <Download className="w-3 h-3" />
                            <span>.ICS Календарь</span>
                          </button>

                          <a
                            href={getTelegramShareUrl(b)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-500 shadow-xs"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Написать в Telegram</span>
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          </a>

                          <button
                            onClick={() => handleCopyText(`Запись СмИТ Демо ${b.id}: ${b.companyName}, ${b.preferredDate} ${b.preferredTime} МСК (${b.format})`, b.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 text-xs font-medium flex items-center gap-1 hover:bg-slate-200"
                          >
                            {copiedId === b.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span>Скопировано</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Скопировать</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WIDGET FOOTER */}
            <div className="p-3.5 bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">СмИТ Биллинг</span>
                <span>·</span>
                <span>Архитектура на Python/Django без legacy</span>
              </div>
              <a
                href={METADATA.authorTelegram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Telegram: @uspeshnyy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
