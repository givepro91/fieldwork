import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:schema';
import { TRACKS, TYPES, ALLOWED_TYPES, TRACK_LABEL, TYPE_LABEL } from './taxonomy';

// repo 루트의 content/ax-guide/*.md 를 글 컬렉션으로 로드.
// README.md(홈 문서) · backlog.md(메타)는 글이 아니므로 제외.
const guide = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md', '!backlog.md'], base: './content/ax-guide' }),
  schema: z
    .object({
      title: z.string(),
      // 분류 2축 — track(어느 트랙) × type(어떤 성격). 라벨은 src/taxonomy.ts.
      // 기본값을 두지 않는다: 빠뜨리면 빌드가 실패하는 게 잘못 분류되는 것보다 낫다.
      track: z.enum(TRACKS),
      type: z.enum(TYPES),
      stage: z.string().default('탐색 중'),
      updated: z.string().optional(),
      // 최신성 — verified: 외부 사실을 마지막으로 확인한 날 / review_by: 다음 검토 예정일.
      // updated(글을 고친 날)와 다른 정보다. 빠르게 변하는 주제일수록 review_by 를 짧게.
      verified: z.string().optional(),
      review_by: z.string().optional(),
      sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
      // 이 문서를 끝냈을 때 독자에게 남는 것. Playbook·Template 에서 주로 쓴다.
      outcomes: z.array(z.string()).default([]),
      // 이 문서가 대체한 문서 id (폐기·재작성 이력).
      supersedes: z.string().optional(),
      lead: z.string().optional(),
      related: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      slides: z
        .array(
          z.object({
            // layout 미지정 시 Deck 이 데이터로 추론(cover/columns/steps/layers → 해당 레이아웃, 그 외 bullets).
            layout: z.enum(['cover', 'thesis', 'compare', 'flow', 'stack', 'bullets']).optional(),
            kick: z.string().optional(),
            title: z.string(),
            body: z.string().optional(),
            bullets: z.array(z.string()).optional(),
            cover: z.boolean().optional().default(false),
            // 시각+내용 레이아웃 데이터 (해당 레이아웃에서만 사용)
            columns: z
              .array(z.object({ head: z.string(), sub: z.string().optional(), points: z.array(z.string()).default([]), accent: z.boolean().optional() }))
              .optional(),
            steps: z.array(z.object({ label: z.string(), note: z.string().optional() })).optional(),
            layers: z.array(z.object({ label: z.string(), note: z.string().optional() })).optional(),
            note: z.string().optional(), // 시각 레이아웃 아래 보조 한 줄
          }),
        )
        .default([]),
      order: z.number().default(100),
      draft: z.boolean().default(false),
    })
    .superRefine((d, ctx) => {
      // 재료가 없는 트랙에서 Playbook·Template 이 나오는 것을 구조로 막는다.
      const allowed = ALLOWED_TYPES[d.track];
      if (!allowed.includes(d.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['type'],
          message: `트랙 "${TRACK_LABEL[d.track].ko}"은 ${allowed
            .map((t) => TYPE_LABEL[t].ko)
            .join('·')} 타입만 허용한다 (받은 값: ${TYPE_LABEL[d.type].ko}). 승급 조건은 strategy/product.md 참고.`,
        });
      }
      // 출처를 적었으면 언제 확인했는지도 적는다. 확인일 없는 출처는 최신성 체계를 거짓으로 만든다.
      if (d.sources.length > 0 && !d.verified) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['verified'],
          message: 'sources 를 적었으면 verified(마지막 확인일)도 필요하다.',
        });
      }
    }),
});

export const collections = { guide };
