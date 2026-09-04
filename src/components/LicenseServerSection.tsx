import React, { useRef, useState } from 'react';
import { ArrowRight, Play, KeyRound, Boxes, Plug, Store } from 'lucide-react';

/**
 * «Сервер лицензий» — коммерческая половина продукта.
 *
 * Остальная страница рассказывает про биллинг, который стоит у провайдера.
 * Здесь — про то, чем он продаётся и обслуживается: лицензии, каталог,
 * шлюз внешних сервисов и маркетплейс. Это ровно та часть, о которой
 * спрашивают партнёры и инвесторы, а на схемах её не видно.
 *
 * Ролик весит 61 МБ, поэтому загружается только по клику: до этого в
 * кадре стоит обложка, а не пустой прямоугольник и не тихая закачка
 * на мобильном трафике.
 */

const VIDEO = 'https://storage.googleapis.com/uspeshnyy-projects/smit/billing/video/license-server-overview.mp4';
const POSTER = 'https://storage.googleapis.com/uspeshnyy-projects/smit/billing/video/license-server-overview.jpg';

const PARTS: { icon: React.ElementType; title: string; text: string }[] = [
  {
    icon: KeyRound,
    title: 'Клиенты и лицензии',
    text: 'Карточка клиента с реквизитами, из которых печатаются договор, счёт и акт. ' +
          'Лицензия задаёт тариф, срок и предел по числу абонентов; напоминания о продлении уходят сами.'
  },
  {
    icon: Boxes,
    title: 'Каталог продукта',
    text: 'Модуль описывается один раз, а установки видят его сами: что доступно, ' +
          'решает тариф клиента. Новая версия доезжает без нашего участия.'
  },
  {
    icon: Plug,
    title: 'Шлюз внешних сервисов',
    text: 'Адреса, геокодер, карты и нейросети — по одному ключу вместо пяти договоров. ' +
          'Квоты на тарифе, расход перевыставляется, в журнале видны и отказы.'
  },
  {
    icon: Store,
    title: 'Маркетплейс разработчиков',
    text: 'Каталог пополняет не только команда: автор подаёт заявку, пакет проходит ' +
          'автоматический разбор и проверку человеком, после публикации автор получает долю от подписки.'
  }
];

export const LicenseServerSection: React.FC = () => {
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const start = () => {
    setStarted(true);
    // источник появляется вместе с первым кликом — до него ничего не качается
    const el = video.current;
    if (!el) return;
    if (!el.src) el.src = VIDEO;
    el.play().catch(() => {
      // автозапуск не дали — останутся штатные кнопки плеера
    });
  };

  return (
    <section id="license" className="lsx scroll-mt-20">
      <div className="lsx-inner">
        <div className="lsx-top">
          <div>
            <span className="lsx-eyebrow">Вторая половина продукта</span>
            <h2>Сервер лицензий</h2>
            <p className="lsx-lead">
              Биллинг работает у провайдера, а продаётся, обслуживается и развивается он отсюда.
              Здесь живут клиенты и лицензии, каталог модулей, шлюз внешних сервисов и
              маркетплейс сторонних разработчиков. Обзор — за две с половиной минуты.
            </p>
          </div>
          <a
            className="lsx-all"
            href="https://license.billing.smit34.ru/developers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Стать разработчиком <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="lsx-grid">
          <figure className="lsx-player">
            <div className={started ? 'lsx-frame lsx-frame-live' : 'lsx-frame'}>
              <video
                ref={video}
                className="lsx-video"
                poster={POSTER}
                controls={started}
                preload="none"
                playsInline
              />
              {!started && (
                <button type="button" className="lsx-play" onClick={start}>
                  <span className="lsx-play-icon" aria-hidden="true">
                    <Play className="w-6 h-6" />
                  </span>
                  <span className="lsx-play-text">
                    Смотреть обзор
                    <small>2 мин 17 с · со звуком</small>
                  </span>
                </button>
              )}
            </div>
            <figcaption className="lsx-cap">
              Записан с рабочего сервера: шесть разделов на живых данных, без макетов.
            </figcaption>
          </figure>

          <ul className="lsx-parts">
            {PARTS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="lsx-ico" aria-hidden="true">
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
