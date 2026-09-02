import React, { useEffect, useRef } from 'react';
import { X, Send, Globe, Phone } from 'lucide-react';
import { METADATA } from '../data/strategicData';

/**
 * Боковая панель «об авторе».
 *
 * Открывается по клику на имя в шапке и в разделе позиционирования: читателю
 * плана важно понимать, кто его написал, но уводить его на внешний сайт
 * посреди чтения не нужно.
 *
 * Пока панель открыта, страница под ней не прокручивается — иначе фон уезжает
 * вместе с колесом мыши.
 */

interface AuthorPanelProps {
  open: boolean;
  onClose: () => void;
}

export const AuthorPanel: React.FC<AuthorPanelProps> = ({ open, onClose }) => {
  const panel = useRef<HTMLElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    // ширину исчезающей полосы прокрутки компенсируем, иначе вёрстка дёргается
    const gap = window.innerWidth - root.clientWidth;
    if (gap > 0) root.style.paddingRight = gap + 'px';
    root.classList.add('wf-locked');
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      root.classList.remove('wf-locked');
      root.style.paddingRight = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        className={open ? 'wf-bio-backdrop open' : 'wf-bio-backdrop'}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={panel}
        className={open ? 'wf-bio open' : 'wf-bio'}
        role="dialog"
        aria-modal="true"
        aria-label="Об авторе плана"
        aria-hidden={!open}
      >
        <div className="wf-bio-head">
          <span className="wf-bio-title">Об авторе</span>
          <button
            ref={closeBtn}
            type="button"
            className="wf-bio-close"
            aria-label="Закрыть панель об авторе"
            onClick={onClose}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="wf-bio-photo">
          <img src={METADATA.authorPhotoBio} alt="" loading="lazy" />
          <div className="wf-bio-caption">
            <div className="wf-bio-name">Успешный Александр Сергеевич</div>
            <div className="wf-bio-role">Архитектор AI-маркетинговых систем</div>
          </div>
        </div>

        <div className="wf-bio-body">
          <div className="wf-bio-facts">
            <div className="wf-bio-fact">
              <b>15+</b>
              <span>лет в IT и автоматизации</span>
            </div>
            <div className="wf-bio-fact">
              <b>MBA</b>
              <span>CIO, РАНХиГС</span>
            </div>
            <div className="wf-bio-fact">
              <b>30–45</b>
              <span>дней система под ключ</span>
            </div>
          </div>

          <p>
            Пятнадцать лет строил системы, которые должны работать без ручного управления, —
            иначе компания встаёт. Сейчас делает то же самое для небольших команд: чтобы клиенту
            отвечали, когда все заняты, а заявка не терялась между перепиской, звонком и блокнотом.
          </p>

          <h3>Подход</h3>
          <p>
            Не разовая настройка, а система: контент → интерес → заявка → продажа. Сначала карта,
            где сейчас теряются клиенты, затем сборка за 30–45 дней, дальше ежемесячная правка по
            цифрам — переделывать через полгода не придётся.
          </p>

          <h3>Связь</h3>
          <div className="wf-bio-links">
            <a href="https://uspeshnyy.ru/about" target="_blank" rel="noopener noreferrer">
              <Globe className="w-4 h-4" aria-hidden="true" />
              uspeshnyy.ru
            </a>
            <a href={METADATA.authorTelegram} target="_blank" rel="noopener noreferrer">
              <Send className="w-4 h-4" aria-hidden="true" />
              Telegram
            </a>
            <a href="tel:+79169535760">
              <Phone className="w-4 h-4" aria-hidden="true" />
              +7 916 953-57-60
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
