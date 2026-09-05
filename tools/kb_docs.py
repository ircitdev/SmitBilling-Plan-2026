# -*- coding: utf-8 -*-
"""Документы сравнений и планов → статьи базы знаний консультанта.

Источник — markdown из `carbon_modern/dev_reports/`, тот же, из которого
собираются страницы портала `/plan2026/plans/…` и `/plan2026/compare/…`
(см. `dev_reports/tools/plan2026_pages/`). Консультант должен отвечать по ним
так же, как по разделам стратегии: это свежие материалы, которых нет ни в
данных портала, ни на странице исполнения плана.

Режем по разделам `##`: целый документ на 30 КБ перебивает в отборе всё
остальное, а раздел отвечает ровно на свой вопрос.

Результат: D:/tmp/kb_docs.json — забирает `tools/kb_merge2.py`.
"""
import io
import json
import os
import re

DR = 'd:/DevTools/Database/2026Carbon/carbon_modern/dev_reports/'
OUT = 'D:/tmp/kb_docs.json'
SECTION = 'Стратегия выхода на рынок'
BASE = 'https://billing.smit34.ru/plan2026/'

# slug, файл, короткое имя, url, ключевые слова документа, вес
DOCS = [
    ('cmp-lanbilling',
     'Исследования/2026-09-04_Исследование_Сравнение_с_LANBilling_модули.md',
     'Сравнение с LANBilling', BASE + 'compare/lanbilling/',
     'LANBilling, ЛАНБиллинг, сравнение, конкурент, модули, коннекторы', 6),
    ('cmp-carbon',
     'Исследования/2026-09-04_Исследование_Сравнение_с_Carbon_Soft.md',
     'Сравнение с Carbon Soft', BASE + 'compare/carbon/',
     'Carbon Soft, Карбон, Carbon Billing, сравнение, конкурент, Reductor, NetMon, Provision', 6),
    ('paritet',
     'Планы/2026-09-04_План_Дорожная_карта_конкурентного_паритета.md',
     'Дорожная карта паритета', BASE + 'plans/roadmap-paritet/',
     'дорожная карта, паритет, приоритеты, волны, треки, что делаем дальше', 6),
    ('onec',
     'Планы/2026-09-04_План_Модуль_Обмен_с_1С_Предприятие.md',
     'План: обмен с 1С', BASE + 'plans/onec/',
     '1С, 1C, Предприятие, Бухгалтерия, бухгалтерия, бухгалтерии, бухгалтеру, обмен, выгрузка, синхронизация, EnterpriseData, контрагенты, начисления, платежи, закрывающие документы, электронный документооборот, Диадок, СБИС', 5),
    ('iptv-packs',
     'Планы/2026-09-04_План_Расширение_IPTV_платформ_вендор-паки.md',
     'План: IPTV вендор-паками', BASE + 'plans/iptv-packs/',
     'IPTV, телевидение, платформы, вендор-паки, IPTVPORTAL, Ministra, Смотрёшка, TVIP', 5),
    ('kassa',
     'Планы/2026-09-04_План_Физическая_касса_и_рабочее_место_кассира.md',
     'План: физическая касса', BASE + 'plans/kassa/',
     'касса, ККТ, фискальный накопитель, чек, кассир, 54-ФЗ, печать чеков', 5),
]


def clean(text):
    """Markdown → простой текст: разметка мешает и поиску, и модели."""
    text = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', text)
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    text = re.sub(r'`{3}[a-z]*\n(.*?)`{3}', r'\1', text, flags=re.S)
    text = text.replace('`', '').replace('**', '').replace('> ', '')
    text = re.sub(r'^\s*\|', '', text, flags=re.M)
    text = re.sub(r'^[\s|:-]+$', '', text, flags=re.M)
    text = text.replace(' | ', ' — ')
    text = re.sub(r'[\u2190-\u2BFF\U0001F300-\U0001FAFF]', '', text)
    text = re.sub(r'^#{1,6}\s*', '', text, flags=re.M)   # \u043F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u2014 \u043E\u0431\u044B\u0447\u043D\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u043E\u0439
    text = re.sub(r'\s*\|\s*$', '', text, flags=re.M)    # \u0445\u0432\u043E\u0441\u0442\u044B \u043E\u0442 \u0442\u0430\u0431\u043B\u0438\u0446
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def sections(md):
    """(заголовок, текст) по разделам верхнего уровня."""
    out, title, buf = [], None, []
    for line in md.split('\n'):
        m = re.match(r'^##\s+(?!#)(.+)$', line)
        if m:
            if title and buf:
                out.append((title, '\n'.join(buf)))
            title, buf = re.sub(r'^\d+[.)]?\s*', '', m.group(1)).strip(), []
        elif title:
            buf.append(line)
    if title and buf:
        out.append((title, '\n'.join(buf)))
    return out


articles = []
for slug, path, name, url, kw, prio in DOCS:
    md = io.open(os.path.join(DR, path), encoding='utf-8', newline='').read().replace('\r\n', '\n')

    # аннотация документа: всё до первого раздела
    head = clean(md.split('\n## ')[0])
    articles.append({
        'external_id': 'plan2026:doc:%s' % slug,
        'section': SECTION,
        'title': name,
        'url': url,
        'text': head,
        'keywords': kw,
        'priority': prio,
    })

    for n, (title, body) in enumerate(sections(md), start=1):
        text = clean(body)
        if len(text) < 200:          # оглавления и однострочные врезки не нужны
            continue
        articles.append({
            'external_id': 'plan2026:doc:%s:%d' % (slug, n),
            'section': SECTION,
            'title': '%s — %s' % (name, title),
            'url': url,
            'text': '%s. %s\n\n%s' % (name, title, text),
            'keywords': '%s, %s' % (kw, title.lower()),
            'priority': prio,
        })

# Сводка «что нового»: без неё вопросы вида «что нового по 1С» уводят отбор
# на статьи с этими словами в заголовке из совсем других разделов базы.
WHATS_NEW = """Что нового в стратегии и планах — сентябрь 2026

4 сентября 2026 разобраны две линейки конкурентов и написаны планы по трём
пробелам. Свежие материалы, все со своими страницами в портале:

1. Сравнение с LANBilling. У конкурента 25 модулей, 18 из них — коннекторы к
   чужим платформам (7 IPTV, 2 CAS, 2 домофонии, 1С, ЭДО, СберБизнес, Trassir,
   Fidelio). Цены закрыты. Пять пробелов по значимости для клиента.

2. Сравнение с Carbon Soft. Экосистема из десяти продуктов: Carbon Billing 5,
   Reductor DPI X (фильтрация по спискам Роскомнадзора), NetMon (мониторинг по
   зеркалу трафика), Provision (резервный сервер). Цены публичные: 3000
   абонентов — от 92 до 184 тысяч рублей. Сертификат связи ОС-1-СТ-0866 до
   01.04.2028 и три записи в реестре российского ПО.

3. План: обмен с 1С:Предприятие 8.3 — модуль onec, формат EnterpriseData,
   16–24 дня. Нужна пилотная база «Бухгалтерии 3.0».

4. План: расширение IPTV вендор-паками — новая ТВ-платформа подключается
   данными с сервера лицензий, а не релизом, 17–25 дней.

5. План: физическая касса и рабочее место кассира — агент на кассовом ПК,
   отдельный модуль kassa как продуктовая опция, 26–38 дней.

6. Дорожная карта конкурентного паритета — восемь направлений в трёх треках
   (регуляторика, позиционирование, разработка) и четырёх волнах, с разделом о
   том, чего сознательно не делаем.

Главный вывод: функционально мы не отстаём, а по CRM, AI, лендингам,
видеонаблюдению, складу и мультиорганизации впереди обоих конкурентов.
Отставание — в регуляторных документах (реестр российского ПО и сертификат
на автоматизированную систему расчётов), в смежных продуктах (фильтрация
трафика, горячий резерв, мониторинг по трафику) и в ширине интеграций
(платёжные каналы, IPTV-платформы, бухгалтерия).
"""

articles.append({
    'external_id': 'plan2026:doc:whats-new',
    'section': SECTION,
    'title': 'Что нового в стратегии и планах (сентябрь 2026)',
    'url': BASE + 'plans/roadmap-paritet/',
    'text': WHATS_NEW,
    'keywords': ('что нового, обновления, новое, свежее, последние изменения, новости, '
                 'сентябрь 2026, сравнения конкурентов, новые планы, апдейт'),
    'priority': 7,
})

with io.open(OUT, 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=1)

print('статей из документов: %d, знаков: %d'
      % (len(articles), sum(len(a['text']) for a in articles)))
for slug, _, name, _, _, _ in DOCS:
    n = sum(1 for a in articles if a['external_id'].startswith('plan2026:doc:' + slug))
    print('  %-16s %d' % (slug, n))
