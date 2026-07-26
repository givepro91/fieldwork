// AX 동향 수집기 — 의존성 0 (Node 18+ 내장 fetch).
// 기본 = 무료. 피드 자체 발췌를 요약으로 쓰고 LLM 을 호출하지 않는다(비용·API 키 불필요).
// 옵션: --summarize (또는 TRENDS_SUMMARIZE=1) → Claude API 로 한국어 요약(비용 발생, ANTHROPIC_API_KEY 필요).
// 사용:
//   node scripts/collect-trends.mjs            # 무료 수집·저장
//   node scripts/collect-trends.mjs --dry      # fetch/파싱만 점검
//   TRENDS_SUMMARIZE=1 ANTHROPIC_API_KEY=… node scripts/collect-trends.mjs   # LLM 요약(유료)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TRENDS_DIR = path.join(ROOT, 'content', 'trends');
const SOURCES_FILE = path.join(ROOT, 'scripts', 'trends-sources.json');
const INDEX_FILE = path.join(TRENDS_DIR, 'index.json');
const DRY = process.argv.includes('--dry');
const SUMMARIZE = process.argv.includes('--summarize') || process.env.TRENDS_SUMMARIZE === '1';
const MODEL = process.env.TRENDS_MODEL || 'claude-haiku-4-5-20251001'; // --summarize 시에만. 모델/가격은 시간민감.
const today = new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function unescapeEntities(s) {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
}
function decode(s = '') {
  let t = s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  // 2패스: 이중 인코딩(&amp;lt; → &lt; → <)과 escape 된 태그를 모두 정리
  t = unescapeEntities(t).replace(/<[^>]+>/g, ' ');
  t = unescapeEntities(t).replace(/<[^>]+>/g, ' ');
  return t.replace(/\s+/g, ' ').trim();
}
function tag(block, name) {
  const m = block.match(new RegExp('<' + name + '[^>]*>([\\s\\S]*?)<\\/' + name + '>', 'i'));
  return m ? m[1] : '';
}
function atomLink(block) {
  const m = block.match(/<link[^>]*href="([^"]+)"[^>]*\/?>/i);
  return m ? m[1] : '';
}
function parseFeed(xml) {
  const out = [];
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) || [];
  for (const b of blocks) {
    const title = decode(tag(b, 'title'));
    const link = decode(tag(b, 'link')) || atomLink(b);
    const published = decode(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated'));
    const content = decode(tag(b, 'content:encoded') || tag(b, 'content') || tag(b, 'summary') || tag(b, 'description'));
    if (title && link) out.push({ title, link, published, content });
  }
  return out;
}

// --- 무료 요약: 피드 발췌 + 키워드 태그 ---
function excerpt(s, n = 180) {
  const t = (s || '').trim();
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  const sp = cut.lastIndexOf(' ');
  return (sp > n * 0.6 ? cut.slice(0, sp) : cut).trim() + '…';
}
const TAG_WORDS = ['agent', '에이전트', 'mcp', 'eval', '평가', 'rag', 'llm', 'claude', 'openai', 'gemini', 'model', '모델', 'tool', '도구', 'workflow', 'prompt', 'release', '릴리스'];
function tagsFrom(text) {
  const low = (text || '').toLowerCase();
  const out = [];
  for (const w of TAG_WORDS) {
    if (low.includes(w.toLowerCase()) && !out.includes(w)) out.push(w);
    if (out.length >= 4) break;
  }
  return out;
}

// --- 옵션: LLM 한국어 요약(유료) ---
async function summarize(a) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('--summarize 모드인데 ANTHROPIC_API_KEY 가 없다');
  const prompt = `다음은 공개된 기술 기사다. 아래 JSON만 한국어로 출력하라(다른 설명 금지):
{"summary":"2-3문장 핵심 요약","category":"분류 한 단어","tags":["키워드"],"keyPoints":["핵심1","핵심2"]}
규칙: 주어진 제목·본문만 근거로 한다. 추측·과장 금지. 회사 내부 정보는 절대 언급하지 않는다.
제목: ${a.title}
본문: ${(a.content || '').slice(0, 8000)}`;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, max_tokens: 700, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = (data.content?.[0]?.text || '').trim();
  return JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
}

async function main() {
  const cfg = JSON.parse(await readFile(SOURCES_FILE, 'utf8'));
  const maxPer = cfg.maxPerSource ?? 5;
  const keep = cfg.keepInIndex ?? 40;
  const sources = cfg.sources.filter((s) => s.enabled);

  let index = { updated: today, items: [] };
  if (existsSync(INDEX_FILE)) { try { index = JSON.parse(await readFile(INDEX_FILE, 'utf8')); } catch {} }
  const seen = new Set((index.items || []).map((i) => i.url));

  console.log(`[mode] ${DRY ? 'dry-run' : SUMMARIZE ? 'LLM 요약(유료)' : '무료(피드 발췌)'}`);

  const collected = [];
  for (const src of sources) {
    try {
      const res = await fetch(src.url, { headers: { 'user-agent': 'fieldwork-trends/1.0' } });
      if (!res.ok) { console.warn(`[skip] ${src.id}: HTTP ${res.status}`); continue; }
      const items = parseFeed(await res.text()).slice(0, maxPer);
      console.log(`[${src.id}] ${items.length} items fetched`);
      for (const it of items) {
        if (seen.has(it.link)) continue;
        seen.add(it.link);
        if (DRY) { collected.push({ source: src.id, title: it.title, url: it.link }); continue; }
        const base = { date: today, title: it.title, url: it.link, source: src.label || src.id, sourceCategory: src.category, publishedAt: it.published || '' };
        try {
          if (SUMMARIZE) {
            const s = await summarize(it);
            collected.push({ ...base, category: s.category || src.category, summary: s.summary || excerpt(it.content), tags: s.tags || [], keyPoints: s.keyPoints || [] });
            await sleep(1200);
          } else {
            collected.push({ ...base, category: src.category, summary: excerpt(it.content) || it.title, tags: tagsFrom(`${it.title} ${it.content}`), keyPoints: [] });
          }
          console.log(`  + ${it.title}`);
        } catch (e) { console.warn(`  [fail] ${it.title}: ${e.message}`); }
      }
    } catch (e) { console.warn(`[error] ${src.id}: ${e.message}`); }
  }

  if (DRY) {
    console.log(`\n[dry] 신규 ${collected.length}건 (저장 안 함):`);
    collected.forEach((c) => console.log(`  - (${c.source}) ${c.title}`));
    return;
  }
  if (!collected.length) { console.log('신규 항목 없음.'); return; }

  await mkdir(TRENDS_DIR, { recursive: true });
  const dayFile = path.join(TRENDS_DIR, `${today}.json`);
  let day = { date: today, items: [] };
  if (existsSync(dayFile)) { try { day = JSON.parse(await readFile(dayFile, 'utf8')); } catch {} }
  day.items.push(...collected);
  await writeFile(dayFile, JSON.stringify(day, null, 2) + '\n');

  index.items = [...collected, ...(index.items || []).filter((i) => !String(i.url).startsWith('https://example.com'))].slice(0, keep);
  index.updated = today;
  await writeFile(INDEX_FILE, JSON.stringify(index, null, 2) + '\n');
  console.log(`\n저장: ${collected.length}건 → content/trends/${today}.json · index.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
