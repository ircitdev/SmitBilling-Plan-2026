# -*- coding: utf-8 -*-
"""Снять тексты разделов портала прямо со страницы.

Часть текста написана в разметке компонентов, а не в данных: тезисы,
сильные и слабые стороны, витрина схем. Достать их можно только из уже
отрисованной страницы.

Ответ забираем через base64: кириллица по пути из браузера в консоль
Windows иначе портится.
"""
import base64
import json
import time

new_tab("https://billing.smit34.ru/plan2026/strategy/")
wait_for_load()
time.sleep(7)

SCRIPT = r"""(() => {
  const out = [];
  document.querySelectorAll('main section[id], main div[id]').forEach(el => {
    const t = (el.innerText || '').replace(/\n{3,}/g, '\n\n').trim();
    if (t.length < 120) return;
    if (out.some(o => o.id === el.id)) return;
    out.push({ id: el.id, len: t.length, text: t });
  });
  const s = JSON.stringify(out);
  return btoa(String.fromCharCode(...new TextEncoder().encode(s)));
})()"""

raw = js(SCRIPT)
data = json.loads(base64.b64decode(raw).decode('utf-8'))
with open(r"D:\tmp\kb_page_sections.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)

for d in data:
    print("%-24s %6d" % (d["id"], d["len"]))
print("разделов:", len(data))
