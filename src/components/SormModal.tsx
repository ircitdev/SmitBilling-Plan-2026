import React, { useState, useEffect } from 'react';
import { useExitAnimation } from '../hooks/useExitAnimation';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ExternalLink, 
  AlertTriangle,
  Server,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SORM_CHECKLIST } from '../data/strategicData';

interface SormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SormModal: React.FC<SormModalProps> = ({ isOpen, onClose }) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    'sorm-1': true, // 13 formats ready
    'sorm-4': true, // audit ready
    'sorm-7': true  // multi-org ready
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">
                  Приказ Минцифры №573 / ПП РФ №538 / 374-ФЗ
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Сертификация СОРМ-3: шаги и регламент
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
            aria-label="Закрыть справку по СОРМ"
              className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Закрыть (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Intro */}
          <div className="py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-b border-slate-100 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white">Решение от 30.08.2026: сертификацию не начинаем.</strong>{' '}
            Сертификат соответствия выдаётся на технические средства СОРМ — оборудование
            в сети оператора, — а не на биллинг. От биллинга требуется выгрузка сведений
            об абонентах по приказу Минцифры №573: она реализована полностью и работает
            в бою. За полтора года переговоров письменного требования «сертифицированный
            биллинг» не предъявил никто.{' '}
            <br /><br />
            Испытания в ЦНИИС стоили бы 500 тыс. – 1,2 млн ₽ и заняли 6–12 месяцев, а
            сертификат выдаётся на конкретную версию — при еженедельных релизах он устареет
            раньше, чем окупится. Ниже — что именно пришлось бы сделать, если решение
            придётся пересмотреть:
          </div>

          {/* 7-Step Interactive Checklist */}
          <div className="py-4 space-y-3">
            {SORM_CHECKLIST.map((item, index) => {
              const isChecked = checkedIds[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 sm:p-5 rounded-[22px] border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="mt-0.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent div
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {index + 1}. {item.title}
                      </h3>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 border border-slate-200/60 dark:border-slate-800">
                        {item.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5">
                      {item.description}
                    </p>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-500 space-y-1">
                      <div>
                        <strong className="text-slate-700 dark:text-slate-300">Требуемые артефакты:</strong> {item.requiredArtifacts}
                      </div>
                      <div>
                        <strong className="text-slate-700 dark:text-slate-300">Текущий статус в СмИТ:</strong>{' '}
                        <span className={item.currentSmITStatus.includes('Готово') ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : 'text-amber-700 dark:text-amber-400'}>
                          {item.currentSmITStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary note */}
          <div className="p-4 rounded-[22px] bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Что делаем сейчас:</strong> три пункта из семи — наша зона, и они закрыты:
              13 форматов выгрузки, неизменяемый журнал аудита, изоляция выгрузок по организациям.
              Остальные четыре — внешние: документация по ГОСТ, аппаратный стенд, испытания
              в ЦНИИС, согласование с территориальным УФСБ. Они запускаются только по триггеру:
              клиент с письменным требованием от территориального органа и готовностью
              участвовать в расходах. До того деньги нужнее на продукт и продажи.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <a
            href="/plan2026/sorm/"
            target="_blank"
            rel="noopener"
            className="mr-auto text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Что говорить клиенту →
          </a>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 transition-colors shadow-xs"
          >
            Закрыть сайдбар
          </button>
        </div>
      </div>
    </div>
  );
};
