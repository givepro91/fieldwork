# Fieldwork

> 전 범위를 가르치는 곳이 아니라, 끝까지 갈 수 있는 하나의 경로를 주는 곳.

직접 해본 것을 기록하는 공개 학습 필드가이드다. 글(콘텐츠)과 그것을 보여주는 위키·프레젠테이션 웹으로 이루어져 있다. Astro 로 만들고 Vercel 에 정적 배포한다.

**https://ax-field-guide.vercel.app**

## 무엇을 주나

판단(무엇을 왜 골랐나), 경로(처음부터 운영까지 통과 가능한 순서), 산출물(끝내면 자기 레포에 남는 것)을 함께 둔다. 읽고 끝나는 글이 아니라 읽는 사람이 자기 것을 만들어 남기게 하는 쪽을 목표로 한다.

## 5트랙

| 키 | 트랙 | 다루는 것 |
|---|---|---|
| `agents` | ① 에이전트로 일하기 | 무엇을 어떻게 넘기고, 어디서 사람이 막는가 |
| `ax` | ② AX · 업무 재설계 | 어떤 반복 판단을 다시 설계하고, 틀렸을 때 어떻게 되돌리는가 |
| `spec` | ③ 기획 · 명세 | 문제를 명세로 바꿔 에이전트가 실행할 수 있게 쓰는 법 |
| `solo` | ④ 1인 개발 · 운영 | 혼자 만들고 배포하고 운영을 유지하는 법 (이 사이트가 사례) |
| `trends` | ⑤ 동향 | 매일 자동 수집해 쌓는 자료 |

2026-07-26 에 AX 단독 필드북에서 5트랙 학습 제품으로 방향을 바꿨다. AX 는 트랙 ② 로 내려갔다. 제품 정의와 단계 게이트의 정본은 [`strategy/product.md`](strategy/product.md) 다.

## 글에 근거를 붙인다

처음 규칙은 "직접 해본 것만 쓴다" 였다. 그러면 경험이 없는 주제를 아예 다룰 수 없어서 규칙을 바꿨다. 지금은 글마다 `basis` 를 적어 **무엇에 근거한 글인지** 밝힌다. 안 해본 것도 쓰되, 안 해봤다고 적는다.

## 구조

```
strategy/product.md      제품 정본 (정의 · 5트랙 · 콘텐츠 타입 · 단계 게이트)
strategy/tracks/ax.md    트랙 ② 기준 문서
src/taxonomy.ts          트랙 · 타입 단일 출처 (스키마 · nav · UI 가 공유)
src/content.config.ts    글 frontmatter 스키마
content/guide/           글
content/trends/          매일 자동 수집되는 동향 (GitHub Actions cron)
AGENTS.md                코딩 에이전트 지침 정본 (CLAUDE.md 가 import)
```

## 개발

```bash
npm install
npm run dev     # http://localhost:4321
npm run build
```

`/admin` 은 콘텐츠 현황(트랙 · 타입 · 검토 기한)을 읽기 전용으로 보는 dev 전용 화면이고, `/design` 은 디자인 결정을 모아 둔 목업이다. 둘 다 프로덕션 빌드에서 빠진다.

## 만든 사람

[장근식 (@givepro91)](https://github.com/givepro91)
