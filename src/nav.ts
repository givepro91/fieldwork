// 사이트 네비게이션 단일 출처 — SideNav 와 랜딩이 공유한다.
// 그룹 축 = 트랙(strategy/product.md). count = 실제 발행된 글 수(하드코딩 금지).
// 빈 트랙은 firstHref=null → 더미 링크 대신 비활성.

import { TRACKS, TRACK_LABEL, TYPE_LABEL, DO_TYPES, type Track, type Type } from './taxonomy';

export interface GuideEntry {
  id: string;
  data: { title: string; track: Track; type: Type; order?: number; draft?: boolean };
}

export interface NavGroup {
  track: Track;
  num: string;
  ko: string;
  short: string;
  en: string;
  desc: string;
  articles: { title: string; href: string; type: Type; typeKo: string; isDo: boolean; draft: boolean }[];
  planned: string[];
  count: number;
  firstHref: string | null;
}

// 아직 글이 없는 트랙의 첫 글 후보. 글이 생기면 여기서 지운다(카테고리는 글에서 자란다).
const PLANNED: Partial<Record<Track, string[]>> = {
  spec: ['에이전트가 실행할 수 있는 명세 쓰기'],
  solo: ['이 사이트를 혼자 만들고 운영한 기록'],
  knowledge: ['노트가 쌓이기만 하는 이유 — 헤매는 기록'],
};

export function buildNav(entries: GuideEntry[]): NavGroup[] {
  return TRACKS.map((track) => {
    const label = TRACK_LABEL[track];
    const articles = entries
      .filter((e) => e.data.track === track)
      .sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100))
      .map((e) => ({
        title: e.data.title,
        href: `/guide/${e.id}`,
        type: e.data.type,
        typeKo: TYPE_LABEL[e.data.type].ko,
        isDo: DO_TYPES.includes(e.data.type),
        draft: e.data.draft ?? false,
      }));
    return {
      track,
      num: label.num,
      ko: label.ko,
      short: label.short,
      en: label.en,
      desc: label.desc,
      articles,
      planned: PLANNED[track] ?? [],
      count: articles.length,
      firstHref: articles[0]?.href ?? null,
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
