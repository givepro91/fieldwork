// 사이트 네비게이션 단일 출처 — SideNav 와 랜딩이 공유한다.
// 그룹 축 = 트랙(strategy/product.md). count = 실제 발행된 글 수(하드코딩 금지).
// 빈 트랙은 firstHref=null → 더미 링크 대신 비활성.

import { TRACKS, TRACK_LABEL, TYPE_LABEL, DO_TYPES, type Track, type Type } from './taxonomy';

export interface GuideEntry {
  id: string;
  data: { title: string; track: Track; type: Type; series?: string; order?: number; draft?: boolean };
}

export interface NavArticle { title: string; href: string; type: Type; typeKo: string; isDo: boolean; draft: boolean }
export interface NavSeries { name: string; articles: NavArticle[] }

export interface NavGroup {
  track: Track;
  num: string;
  ko: string;
  short: string;
  en: string;
  desc: string;
  topics: string;
  // 같은 도구·주제 묶음(예: Obsidian). 제목만으로 무엇에 대한 글인지 모를 때 색인에서 드러낸다.
  series: NavSeries[];
  // series 가 없는 글은 평평하게 둔다.
  articles: NavArticle[];
  planned: string[];
  count: number;
  firstHref: string | null;
}

// 아직 글이 없는 트랙의 첫 글 후보. 글이 생기면 여기서 지운다(카테고리는 글에서 자란다).
const PLANNED: Partial<Record<Track, string[]>> = {
  spec: ['에이전트가 실행할 수 있는 명세 쓰기'],
  solo: ['스키마로 규칙을 강제하기'],
  knowledge: ['Canvas 는 언제 표보다 나은가'],
};

export function buildNav(entries: GuideEntry[]): NavGroup[] {
  return TRACKS.map((track) => {
    const label = TRACK_LABEL[track];
    const rows = entries
      .filter((e) => e.data.track === track)
      .sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100))
      .map((e) => ({
        series: e.data.series,
        a: {
          title: e.data.title,
          href: `/guide/${e.id}`,
          type: e.data.type,
          typeKo: TYPE_LABEL[e.data.type].ko,
          isDo: DO_TYPES.includes(e.data.type),
          draft: e.data.draft ?? false,
        },
      }));

    // series 는 글이 등장하는 순서대로 만든다(order 정렬을 그대로 따른다).
    const series: NavSeries[] = [];
    const articles: NavArticle[] = [];
    for (const r of rows) {
      if (!r.series) {
        articles.push(r.a);
        continue;
      }
      let g = series.find((s) => s.name === r.series);
      if (!g) {
        g = { name: r.series, articles: [] };
        series.push(g);
      }
      g.articles.push(r.a);
    }

    return {
      track,
      num: label.num,
      ko: label.ko,
      short: label.short,
      en: label.en,
      desc: label.desc,
      topics: label.topics,
      series,
      articles,
      planned: PLANNED[track] ?? [],
      count: rows.length,
      firstHref: rows[0]?.a.href ?? null,
    };
  });
}

export interface TrendItem {
  date: string;
  title: string;
  url: string;
  source: string;
  sourceCategory?: string;
  category?: string;
  summary?: string;
  tags?: string[];
  keyPoints?: string[];
  publishedAt?: string;
}
