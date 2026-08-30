import { useEffect, useState } from 'react';

/**
 * Держит окно в дереве, пока проигрывается анимация закрытия.
 *
 * Возвращает `mounted` — рендерить ли окно вообще, и `closing` — идёт ли
 * сейчас обратная анимация. Без этого закрытие получается мгновенным:
 * компонент с `if (!isOpen) return null` исчезает раньше, чем успела бы
 * отработать любая анимация.
 */
export const useExitAnimation = (isOpen: boolean, durationMs = 220) => {
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const t = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, durationMs);
    return () => window.clearTimeout(t);
  }, [isOpen, mounted, durationMs]);

  return { mounted, closing };
};
