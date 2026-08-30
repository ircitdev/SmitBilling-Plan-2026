import React, { useState, useMemo, useEffect } from 'react';
import { useExitAnimation } from '../hooks/useExitAnimation';
import { X, Calculator, ArrowRight, DollarSign, TrendingUp, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface RoiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [subscribers, setSubscribers] = useState<number>(2500);
  const [arpu, setArpu] = useState<number>(550);
  const [supportStaff, setSupportStaff] = useState<number>(2);
  const [monthlySmsCount, setMonthlySmsCount] = useState<number>(3500);
  const [legacyBillingCostMonthly, setLegacyBillingCostMonthly] = useState<number>(25000);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const calculations = useMemo(() => {
    // 1. Staff savings from 72.6% AI automation (reduction in extra support load)
    const staffSalaryMonthly = 55000;
    const aiSupportSavingsMonthly = Math.round(supportStaff * staffSalaryMonthly * 0.45);

    // 2. SMS Gateway savings (using Android gateway vs SMS aggregator at ~3.5 rub/sms)
    const aggregatorSmsCostMonthly = monthlySmsCount * 3.5;
    const androidSimCostMonthly = 900; // unlimited SMS SIM card
    const smsSavingsMonthly = Math.max(0, aggregatorSmsCostMonthly - androidSimCostMonthly);

    // 3. Churn reduction due to proactive Telegram/Push notifications and instant payments (est 0.4% lower churn)
    const churnSavedMonthly = Math.round(subscribers * 0.004 * arpu);

    // 4. Billing license comparison (SmIT PRO ~ 15,000/mo amortized or standard plan vs legacy ~25,000/mo)
    const smitMonthlyLicense = subscribers > 5000 ? 25000 : subscribers > 1000 ? 15000 : 8000;
    const billingCostSavingsMonthly = Math.max(0, legacyBillingCostMonthly - smitMonthlyLicense);

    // Totals
    const totalMonthlySavings = aiSupportSavingsMonthly + smsSavingsMonthly + churnSavedMonthly + billingCostSavingsMonthly;
    const totalAnnualSavings = totalMonthlySavings * 12;
    const roiMonths = totalAnnualSavings > 0 ? (249000 / (totalMonthlySavings || 1)).toFixed(1) : '12';

    return {
      aiSupportSavingsMonthly,
      smsSavingsMonthly,
      churnSavedMonthly,
      billingCostSavingsMonthly,
      totalMonthlySavings,
      totalAnnualSavings,
      roiMonths
    };
  }, [subscribers, arpu, supportStaff, monthlySmsCount, legacyBillingCostMonthly]);

  const { mounted, closing } = useExitAnimation(isOpen);


  if (!mounted) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 ${closing ? 'is-closing' : ''}`}
      onClick={onClose}
    >
      <div 
        className="panel-right w-full max-w-xl sm:max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto shadow-2xl p-6 sm:p-8 flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Калькулятор окупаемости (ROI)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Оцените годовую экономию при переходе на СмИТ Биллинг
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Закрыть (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inputs */}
          <div className="py-6 space-y-5">
            {/* Subscribers Slider */}
            <div className="p-4 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Активная база абонентов</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 text-sm font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                  {subscribers.toLocaleString('ru-RU')} аб.
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="20000"
                step="100"
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                <span>200</span>
                <span>5 000</span>
                <span>10 000</span>
                <span>20 000+</span>
              </div>
            </div>

            {/* ARPU & Support Staff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Средний ARPU (₽/мес)
                </label>
                <input
                  type="number"
                  value={arpu}
                  onChange={(e) => setArpu(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none font-mono"
                />
              </div>

              <div className="p-4 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Сотрудников HelpDesk
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={supportStaff}
                  onChange={(e) => setSupportStaff(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Monthly SMS & Current Billing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  SMS в месяц (уведомления)
                </label>
                <input
                  type="number"
                  value={monthlySmsCount}
                  onChange={(e) => setMonthlySmsCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none font-mono"
                />
              </div>

              <div className="p-4 rounded-[22px] bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Расходы на старый биллинг (₽/мес)
                </label>
                <input
                  type="number"
                  value={legacyBillingCostMonthly}
                  onChange={(e) => setLegacyBillingCostMonthly(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Results Banner */}
            <div className="p-5 sm:p-6 rounded-[28px] bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/10 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 border border-emerald-500/30 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Итоговая экономия
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-300 font-mono">
                    {calculations.totalAnnualSavings.toLocaleString('ru-RU')} ₽ / год
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-slate-500 block">Окупаемость перехода:</span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                    ~ {calculations.roiMonths} мес.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-emerald-500/20 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">AI-автоматизация:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    +{calculations.aiSupportSavingsMonthly.toLocaleString('ru-RU')} ₽/мес
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Android SMS шлюз:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    +{calculations.smsSavingsMonthly.toLocaleString('ru-RU')} ₽/мес
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Снижение оттока:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    +{calculations.churnSavedMonthly.toLocaleString('ru-RU')} ₽/мес
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Экономия на ПО:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    +{calculations.billingCostSavingsMonthly.toLocaleString('ru-RU')} ₽/мес
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Расчет основан на метриках Build 2286
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Закрыть сайдбар
          </button>
        </div>
      </div>
    </div>
  );
};
