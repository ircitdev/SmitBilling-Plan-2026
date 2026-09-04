# Знания AI-консультанта портала

На портале работает один помощник — виджет сервера лицензий
(`license.billing.smit34.ru/widget.js`, код `Pn23sDwUN6JSqDfQ`). Отвечает
он по базе знаний сервера, а не по странице: портал собран в один
JS-бандл, и никакой обход ссылок его текст не достанет.

Отсюда эта кухня. Она готовит файл со статьями, который забирает команда
`manage.py import_kb_plan` на сервере лицензий.

## Порядок

```bash
# 1. Подробности — из данных, которыми отрисован портал
npx tsx tools/kb-export.ts > D:/tmp/kb_plan2026.json

# 2. Разделы, написанные прямо в разметке (тезисы, сильные и слабые стороны)
browser-harness < tools/grab_sections.py      # → D:/tmp/kb_page_sections.json

# 3. Страница исполнения плана: её рисует свой скрипт из массивов в файле
browser-harness < tools/grab_roadmap.py       # → D:/tmp/kb_roadmap_sections.json

# 4. Внешний обзор рынка (Google Docs → plain text)
curl -sL -o D:/tmp/gdoc.txt \
  "https://docs.google.com/document/d/<id>/export?format=txt"
python tools/gdoc_split.py                    # → D:/tmp/kb_gdoc.json

# 5. Свести всё в один файл и залить
python tools/kb_merge2.py                     # → D:/tmp/kb_plan2026_full.json
scp D:/tmp/kb_plan2026_full.json root@31.44.7.144:/tmp/
ssh root@31.44.7.144 "cd /opt/license-server && \
  C=\$(docker compose ps -q web) && \
  docker cp /tmp/kb_plan2026_full.json \$C:/tmp/ && \
  docker compose exec -T web python manage.py import_kb_plan /tmp/kb_plan2026_full.json"
```

Файл идёт **целиком**: команда удаляет статьи `plan2026:*`, которых в нём
нет. Загрузить один кусок отдельно — значит стереть остальные.

## Что важно помнить

- **Тексты не режутся.** Первая версия базы снималась с отрисованной
  страницы и обрезалась по 2600 знаков: из ответов пропадали шаги
  рекомендаций, половина параметров сравнения и все меры по рискам.
- **Поиск отбрасывает слова короче четырёх букв.** Статья про TCO не
  находилась по слову «TCO» — пришлось положить расшифровку в
  `keywords`. Это же касается любых коротких аббревиатур.
- **После импорта сбросить кэш весов**: `cache.delete('kb_idf_v1')`,
  иначе новые статьи неделю ранжируются по старой статистике.
- **Кириллица в выражениях для браузера** (`js(...)` в harness) портится
  по дороге — в скриптах она либо в `String.fromCharCode`, либо файл
  целиком без русских букв.
- Проверять отбор удобно на сервере: `relevant_articles('вопрос', limit=4)`
  из `licenses.kb_search` — видно, что именно уйдёт в промпт.
