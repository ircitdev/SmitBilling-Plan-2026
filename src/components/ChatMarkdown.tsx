import React from 'react';

/**
 * Разметка в сообщениях чата.
 *
 * Модель отвечает markdown-ом, а сообщения выводились как обычный текст —
 * читатель видел «**AI-консультант**» со звёздочками. Готовую библиотеку
 * не тянем ради четырёх правил: здесь строится дерево React-элементов,
 * поэтому HTML из ответа модели в разметку не попадает в принципе.
 *
 * Поддержано: **жирный**, *курсив*, `код`, [ссылка](url), маркированные
 * и нумерованные списки, заголовки ###, горизонтальная черта.
 */

/** Инлайновая разметка внутри одной строки. */
const inline = (text: string, keyPrefix: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  // порядок важен: код первым, иначе `**` внутри кода станет жирным
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith('`')) {
      out.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700/70 text-[0.9em] font-mono"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**')) {
      out.push(
        <strong key={key} className="font-bold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('[')) {
      const cut = token.indexOf('](');
      const label = token.slice(1, cut);
      const href = token.slice(cut + 2, -1);
      const safe = /^(https?:|mailto:|tel:|\/)/i.test(href);
      out.push(
        safe ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline decoration-emerald-500/50 underline-offset-2 hover:decoration-emerald-500"
          >
            {label}
          </a>
        ) : (
          <span key={key}>{label}</span>
        )
      );
    } else {
      out.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
};

export const ChatMarkdown: React.FC<{ text: string; className?: string }> = ({
  text,
  className = ''
}) => {
  const lines = (text || '').split('\n');
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushList = (key: string) => {
    if (!list) return;
    const items = list.items.map((it, i) => (
      <li key={`${key}-li${i}`} className="leading-relaxed">
        {inline(it, `${key}-li${i}`)}
      </li>
    ));
    blocks.push(
      list.ordered ? (
        <ol key={key} className="list-decimal pl-5 space-y-1 my-2">{items}</ol>
      ) : (
        <ul key={key} className="list-disc pl-5 space-y-1 my-2">{items}</ul>
      )
    );
    list = null;
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    const key = `b${idx}`;

    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    const numbered = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    const heading = line.match(/^\s*(#{1,4})\s+(.*)$/);

    if (bullet) {
      if (!list || list.ordered) flushList(key + '-l');
      list = list || { ordered: false, items: [] };
      list.items.push(bullet[1]);
      return;
    }
    if (numbered) {
      if (!list || !list.ordered) flushList(key + '-l');
      list = list || { ordered: true, items: [] };
      list.items.push(numbered[2]);
      return;
    }

    flushList(key + '-l');

    if (!line.trim()) return;

    if (heading) {
      blocks.push(
        <p key={key} className="font-bold text-slate-900 dark:text-white mt-3 mb-1">
          {inline(heading[2], key)}
        </p>
      );
      return;
    }
    if (/^\s*(-{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={key} className="my-3 border-slate-200 dark:border-slate-700" />);
      return;
    }

    blocks.push(
      <p key={key} className="leading-relaxed my-1.5">
        {inline(line, key)}
      </p>
    );
  });

  flushList('tail-l');

  return <div className={className}>{blocks}</div>;
};
