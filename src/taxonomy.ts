// 분류 체계 단일 출처 — content.config.ts 스키마 · nav · UI 가 공유한다.
// 정본 문서: strategy/product.md ("트랙", "콘텐츠 타입", "트랙별 허용 타입")

export const TRACKS = ['agents', 'ax', 'spec', 'solo', 'knowledge'] as const;
export const TYPES = ['concept', 'decision', 'playbook', 'template', 'log'] as const;

export type Track = (typeof TRACKS)[number];
export type Type = (typeof TYPES)[number];

// short = 좁은 자리(상단 nav)용 짧은 라벨. ko = 카드·색인용 풀네임.
export const TRACK_LABEL: Record<Track, { num: string; ko: string; short: string; en: string; desc: string }> = {
  agents: {
    num: '①',
    ko: '에이전트로 일하기',
    short: '에이전트',
    en: 'Agents',
    desc: '무엇을 어떻게 넘기고, 어디서 사람이 막는가 — 직접 써보고 남긴 판단.',
  },
  ax: {
    num: '②',
    ko: 'AX·업무 재설계',
    short: 'AX',
    en: 'AX',
    desc: '어떤 반복 판단을 다시 설계하고, 틀렸을 때 어떻게 되돌리는가.',
  },
  spec: {
    num: '③',
    ko: '기획·명세',
    short: '기획·명세',
    en: 'Spec',
    desc: '문제를 명세로 바꾸고, 에이전트가 실행할 수 있게 쓰는 법.',
  },
  solo: {
    num: '④',
    ko: '1인 개발·운영',
    short: '1인 운영',
    en: 'Solo Ops',
    desc: '혼자 만들고 배포하고 운영을 유지하는 법. 이 사이트가 그 사례다.',
  },
  knowledge: {
    num: '⑤',
    ko: '지식·업무 시스템',
    short: '지식 시스템',
    en: 'Knowledge',
    desc: '노트가 쌓이기만 하지 않고 실행 시스템이 되는가 — 아직 헤매는 중.',
  },
};

export const TYPE_LABEL: Record<Type, { ko: string; en: string }> = {
  concept: { ko: '개념', en: 'Concept' },
  decision: { ko: '선택', en: 'Decision' },
  playbook: { ko: '플레이북', en: 'Playbook' },
  template: { ko: '템플릿', en: 'Template' },
  log: { ko: '기록', en: 'Log' },
};

// 트랙별 허용 타입 — 재료가 없는 트랙에서 Playbook·Template 이 나오는 것을 구조로 막는다.
// ⑤ 지식·업무 시스템은 아직 제대로 운영해보지 않았으므로 헤매는 기록(log)만 허용한다.
// 승급 조건: 그 구조로 실제 프로젝트를 하나 끝냈을 때 (strategy/product.md).
export const ALLOWED_TYPES: Record<Track, readonly Type[]> = {
  agents: TYPES,
  ax: TYPES,
  spec: TYPES,
  solo: TYPES,
  knowledge: ['log'],
};
