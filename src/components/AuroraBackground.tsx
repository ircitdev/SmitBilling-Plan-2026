import React from 'react';

/**
 * Фон-«северное сияние» (по мотивам aurora-background, manuarora700).
 *
 * Слой лежит под всем содержимым и не перехватывает события. Палитра
 * заменена на фирменную зелёно-бирюзовую: в оригинале сине-фиолетовая,
 * а синий у нас не используется. Свечение приглушено и стянуто маской
 * к верху страницы — под длинным документом сплошная анимация мешала бы
 * читать. При prefers-reduced-motion анимация останавливается, сам
 * градиент остаётся.
 */
export const AuroraBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-layer absolute -inset-[10px] opacity-40 dark:opacity-30 blur-[10px] will-change-transform" />
    </div>
  );
};
