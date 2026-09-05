# -*- coding: ascii -*-
# Snyat teksty razdelov stranicy /plan2026/roadmap/.
# Stranica risuetsya klientskim skriptom iz massivov v samom fajle,
# poetomu berem uzhe otrisovannyj tekst, a ne ishodnyj HTML.
import base64
import json
import time

new_tab("https://billing.smit34.ru/plan2026/roadmap/")
wait_for_load()

# волны 2 и 3 свёрнуты в <details> — без раскрытия их задачи не попадают в innerText
js("(() => { document.querySelectorAll('details').forEach(d => d.open = true); return 1; })()")
import time as _t; _t.sleep(1)
time.sleep(7)

SCRIPT = r"""(() => {
  const out = [];
  const push = (id, el) => {
    if (!el) return;
    const t = (el.innerText || '').replace(/\n{3,}/g, '\n\n').trim();
    if (t.length > 80) out.push({ id, len: t.length, text: t });
  };
  ['kpis', 'waves', 'ongoing-sec', 'ongoing', 'journal'].forEach(id =>
    push(id, document.getElementById(id)));
  // шапка страницы: заголовок и вводный текст до первой секции
  const h1 = document.querySelector('h1');
  if (h1) {
    const head = h1.closest('header, section, div') || h1.parentElement;
    push('intro', head);
  }
  // каждая волна отдельно: они самостоятельны по смыслу
  document.querySelectorAll('#waves > *').forEach((el, i) => push('wave-' + (i + 1), el));
  const s = JSON.stringify(out);
  return btoa(String.fromCharCode(...new TextEncoder().encode(s)));
})()"""

data = json.loads(base64.b64decode(js(SCRIPT)).decode('utf-8'))
with open(r"D:\tmp\kb_roadmap_sections.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)

for d in data:
    print("%-16s %6d" % (d["id"], d["len"]))
print("sections:", len(data))
