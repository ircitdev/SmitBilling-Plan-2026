# -*- coding: utf-8 -*-
"""Разбор внешнего обзора рынка на статьи базы знаний.

Документ выгружается из Google Docs как plain text: разметки уровней в
нём нет, заголовок отличается от абзаца только тем, что он короткий и
без точки в конце. Поэтому режем по таким строкам, а короткие огрызки
(ячейки таблиц — «Цена», «Решение», «API») приклеиваем к предыдущему
куску: отдельной статьёй они бесполезны и только сбивают поиск.
"""
import io
import json
import re

SRC = 'D:/tmp/gdoc.txt'
OUT = 'D:/tmp/kb_gdoc.json'
URL = ('https://docs.google.com/document/d/'
       '1w8h3y4DYf5q5O1f4IIx9XJERBLrCszsEIzryXwbwsX8/edit')
SECTION = 'Аналитика рынка ISP-биллинга'
MIN_PART = 600          # короче — это не раздел, а подпись или ячейка

# разделы верхнего уровня — из оглавления самого документа
TOP = [
    'Исполнительное резюме',
    'Рынок и конкурентная карта',
    'Сравнение продуктов и ценовых моделей',
    'Тренды, барьеры и риски',
    'Кейсы внедрений в России',
    'Технические требования и чек-лист выбора',
    'Миграция, интеграция и TCO',
    'Источники и методология',
]

text = io.open(SRC, encoding='utf-8-sig').read().replace('\r', '')
lines = text.split('\n')
doc_title = lines[0].strip()

# оглавление (маркированный список в начале) в статьи не нужно
start = 0
for i, ln in enumerate(lines[:40]):
    if ln.strip() == TOP[0] and i > 2:
        start = i
        break
else:
    start = 3
body = lines[start:]


def is_heading(s):
    s = s.strip()
    if not s or len(s) > 80:
        return False
    if s.startswith(('•', '-', '–', '\t')):
        return False
    if re.search(r'[.:;,]$', s):
        return False
    if s.startswith(('Рисунок', 'Таблица', 'Rendered Mermaid')):
        return False
    return True


# режем по заголовкам, храня, к какому разделу верхнего уровня относится кусок
chunks = []
cur_top = TOP[0]
cur_title = TOP[0]
buf = []


def flush():
    if not buf:
        return
    txt = '\n'.join(buf).strip()
    if not txt:
        return
    chunks.append({'top': cur_top, 'title': cur_title, 'text': txt})


for ln in body:
    if is_heading(ln):
        s = ln.strip()
        flush()
        buf = []
        if s in TOP:
            cur_top = s
        cur_title = s
        continue
    buf.append(ln)
flush()

# склеиваем мелочь с предыдущим куском
merged = []
for ch in chunks:
    if merged and len(ch['text']) < MIN_PART:
        merged[-1]['text'] += '\n' + ch['title'] + '\n' + ch['text']
        continue
    merged.append(ch)

# «Источники и методология» — восемь килобайт ссылок и оговорок о том, как
# считали. Консультанту это отвечать нечем, а в отборе такой кусок только
# перебивает содержательные статьи, поэтому в базу он не идёт.
merged = [c for c in merged if c['top'] != 'Источники и методология']

articles = []
for i, ch in enumerate(merged, 1):
    # подписи к картинкам и заглушки схем: в текстовом ответе от них пусто
    txt = '\n'.join(ln for ln in ch['text'].split('\n')
                    if not re.match(r'\s*(Рисунок \d|Rendered Mermaid|Таблица \d)', ln))
    txt = re.sub(r'\n{3,}', '\n\n', txt).strip()
    if len(txt) < 400:
        continue
    same = ch['title'] == ch['top']
    title = ch['title'] if same else '%s — %s' % (ch['top'], ch['title'])
    articles.append({
        'external_id': 'plan2026:gdoc:%02d' % i,
        'section': SECTION,
        'title': ('Обзор рынка: ' + title)[:300],
        'url': URL,
        'text': ('Из аналитического обзора «%s».\n\n%s' % (doc_title, txt))[:12000],
        # заголовок подраздела уходит в ключевые слова, а короткие
        # аббревиатуры — с расшифровкой: поиск отбрасывает слова короче
        # четырёх букв, и по «TCO» статья про TCO не находилась
        'keywords': ', '.join([
            'обзор рынка', 'аналитика', 'ISP', 'биллинг',
            ch['top'].lower(),
            ch['title'].lower() if ch['title'] != ch['top'] else '',
            'совокупная стоимость владения, расходы за три года' if 'TCO' in ch['title'] else '',
            'сертификация, требования регулятора' if 'требован' in ch['title'].lower() else '',
        ]).replace(', ,', ',').strip(', '),
        'priority': 3,
    })

io.open(OUT, 'w', encoding='utf-8').write(json.dumps(articles, ensure_ascii=False, indent=1))

print('документ: %s' % doc_title)
print('статей: %d, знаков: %d' % (len(articles), sum(len(a['text']) for a in articles)))
for a in articles:
    print('  %-72s %5d' % (a['title'][:72], len(a['text'])))
