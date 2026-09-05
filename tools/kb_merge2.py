# -*- coding: utf-8 -*-
"""Свести в один файл всё, что должен знать консультант портала.

Три источника: данные стратегической страницы (подробности), её же
разделы, написанные в разметке, и страница исполнения плана
/plan2026/roadmap/ — та рисуется своим скриптом, поэтому её текст тоже
снимается с отрисованной страницы.

Файл идёт целиком: команда импорта удаляет статьи plan2026:*, которых в
нём нет, — иначе в базе остался бы прошлогодний текст, по которому
консультант отвечает как по действующему.
"""
import io
import json

STRATEGY = 'https://billing.smit34.ru/plan2026/strategy/'
ROADMAP = 'https://billing.smit34.ru/plan2026/roadmap/'
SECTION = 'Стратегия выхода на рынок'

# раздел стратегии → (заголовок статьи, ключевые слова, вес)
FROM_STRATEGY = {
    'tldr': ('Главные тезисы за 60 секунд', 'кратко, тезисы, выводы, главное', 6),
    'tldr-details': ('Ключевой вывод стратегии', 'вывод, вердикт, итог', 6),
    'strengths': ('Сильные стороны СмИТ Биллинга',
                  'сильные стороны, преимущества, чем лучше, отличия', 6),
    'weaknesses': ('Слабые места и чего пока нет',
                   'слабые стороны, недостатки, чего нет', 6),
    'status': ('Что сделано, что в работе, что в бэклоге',
               'статус, дорожная карта, готовность, прогресс', 5),
    'live': ('Продукт можно посмотреть прямо сейчас',
             'демо, живые адреса, ссылки, документация', 5),
    'schemes': ('Схемы устройства биллинга', 'схемы, архитектура, как устроено', 4),
    'license': ('Сервер лицензий: вторая половина продукта',
                'сервер лицензий, маркетплейс, шлюз, каталог модулей, подписка', 6),
}

# раздел роадмапа → (заголовок, ключевые слова, вес); None — заголовок из текста
FROM_ROADMAP = {
    'intro': ('Исполнение плана: что уже сделано',
              'исполнение плана, сделано, прогресс, роадмап', 6),
    'wave-1': (None, 'волна, этап, план работ, сроки', 5),
    'wave-2': (None, 'волна, этап, план работ, сроки', 5),
    'wave-3': (None, 'волна, этап, план работ, сроки', 5),
    'ongoing-sec': ('Постоянные работы по продукту',
                    'постоянные работы, поддержка, регулярные задачи', 5),
    'journal': ('Журнал работ по плану развития',
                'журнал работ, что делали, история, хроника', 5),
}


def load(path):
    return json.load(io.open(path, encoding='utf-8'))


def first_line(text, limit=90):
    """Заголовок блока — его первая строка: в разметке она и есть название."""
    line = (text.split('\n')[0] or '').strip()
    return (line[:limit] or 'Раздел плана')


data = load('D:/tmp/kb_plan2026.json')
page = {s['id']: s for s in load('D:/tmp/kb_page_sections.json')}
road = {s['id']: s for s in load('D:/tmp/kb_roadmap_sections.json')}

added_s = added_r = 0

for anchor, (title, kw, prio) in FROM_STRATEGY.items():
    src = page.get(anchor)
    if not src or len(src['text']) < 150:
        print('  нет раздела стратегии:', anchor)
        continue
    data.append({
        'external_id': 'plan2026:page:' + anchor, 'section': SECTION,
        'title': title, 'url': STRATEGY + '#' + anchor,
        'text': src['text'], 'keywords': kw, 'priority': prio,
    })
    added_s += 1

for anchor, (title, kw, prio) in FROM_ROADMAP.items():
    src = road.get(anchor)
    if not src or len(src['text']) < 150:
        print('  нет раздела роадмапа:', anchor)
        continue
    name = title or ('Этап плана: ' + first_line(src['text']))
    data.append({
        'external_id': 'plan2026:roadmap:' + anchor, 'section': SECTION,
        'title': name, 'url': ROADMAP,
        'text': src['text'], 'keywords': kw, 'priority': prio,
    })
    added_r += 1

# обзор рынка (Google Docs) и документы сравнений/планов — отдельные шаги,
# но в базу идут одним файлом: импорт удаляет статьи plan2026:*, которых в нём нет
extra = 0
for path, label in (('D:/tmp/kb_gdoc.json', 'обзор рынка'),
                    ('D:/tmp/kb_docs.json', 'документы сравнений и планов')):
    try:
        part = load(path)
    except (IOError, OSError):
        print('  ПРОПУЩЕН источник (%s): %s' % (label, path))
        continue
    data.extend(part)
    extra += len(part)
    print('  %s: %d' % (label, len(part)))

seen = set()
for a in data:
    assert a['external_id'] not in seen, 'повтор ключа: ' + a['external_id']
    seen.add(a['external_id'])

with io.open('D:/tmp/kb_plan2026_full.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=1)

total = sum(len(a['text']) for a in data)
print('со страницы стратегии: %d, со страницы исполнения: %d' % (added_s, added_r))
print('всего статей: %d, знаков: %d' % (len(data), total))
