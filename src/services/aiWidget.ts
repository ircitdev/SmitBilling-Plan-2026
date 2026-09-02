/**
 * Единственный AI на портале — консультант с сервера лицензий.
 *
 * Виджет («Стратегический портал», токен в оболочке `index.html`) знает
 * продукт, ведёт журнал разговоров и умеет передать диалог человеку, поэтому
 * второй, встроенный в страницу ассистент не нужен: две разные памяти и два
 * разных промпта на одной странице путают и читателя, и статистику.
 *
 * Скрипт виджета грузится с `defer`, поэтому к моменту клика он обычно уже на
 * месте; если нет — коротко ждём его появления, а не молчим в ответ на клик.
 */

interface SmitWidgetApi {
  ask?: (question: string) => void;
  open?: (mode?: string) => void;
  book?: () => void;
}

const STRATEGY_QUESTION = 'Расскажи коротко о стратегии СмИТ Биллинга';

const widget = (): SmitWidgetApi | undefined =>
  (window as unknown as { SmitWidget?: SmitWidgetApi }).SmitWidget;

/**
 * Открывает консультанта с готовым вопросом.
 *
 * @param question о чём спросить; по умолчанию — общий вопрос о стратегии
 * @param fallback что сделать, если виджет так и не загрузился
 */
export const askAi = (question: string = STRATEGY_QUESTION, fallback?: () => void) => {
  const run = (api: SmitWidgetApi) => {
    if (api.ask) api.ask(question);
    else if (api.open) api.open('chat');
    else fallback?.();
  };

  const ready = widget();
  if (ready) {
    run(ready);
    return;
  }

  // виджет ещё грузится — ждём его до полутора секунд, затем запасной путь
  let waited = 0;
  const timer = window.setInterval(() => {
    const api = widget();
    waited += 150;
    if (api) {
      window.clearInterval(timer);
      run(api);
    } else if (waited >= 1500) {
      window.clearInterval(timer);
      fallback?.();
    }
  }, 150);
};
