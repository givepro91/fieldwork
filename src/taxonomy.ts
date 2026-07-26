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

// 실행·산출물 타입. 목록에서 "읽는 글"과 "하는 글"을 가르는 데 쓴다(색을 5개로 늘리지 않는 대신).
export const DO_TYPES: readonly Type[] = ['playbook', 'template'];

// 트랙별 허용 타입. 2026-07-26: ⑤ knowledge 의 log-only 제약을 풀었다 —
// 경험은 근거의 한 종류일 뿐이고, 조사·정리로도 글을 쓴다. 지켜야 하는 선은
// "해보지 않은 것을 해본 것처럼 쓰지 않는다"이고, 그건 타입이 아니라 frontmatter
// `basis`(근거 출처)로 드러낸다. 지금은 모든 트랙이 모든 타입을 쓸 수 있다.
export const ALLOWED_TYPES: Record<Track, readonly Type[]> = {
  agents: TYPES,
  ax: TYPES,
  spec: TYPES,
  solo: TYPES,
  knowledge: TYPES,
};

// 글의 근거가 무엇인지 — 인포박스에 표시해 독자가 신뢰 수준을 알 수 있게 한다.
export const BASIS = ['practiced', 'researched', 'mixed'] as const;
export type Basis = (typeof BASIS)[number];

export const BASIS_LABEL: Record<Basis, { ko: string; note: string }> = {
  practiced: { ko: '직접 해봄', note: '실제로 써보고 남긴 기록' },
  researched: { ko: '조사·정리', note: '1차 소스를 확인해 정리, 실사용 경험은 아직 없음' },
  mixed: { ko: '일부 경험 + 조사', note: '해본 범위와 확인한 범위가 섞여 있음' },
};
