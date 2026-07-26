// 로컬 dev 전용 페이지 묶음 — /admin(콘텐츠 현황, 읽기 전용) · /design(기획·디자인 시스템).
// prod 빌드(astro build)와 100% 분리된다: /admin 은 astro:server:setup 미들웨어,
// /design 은 command==='dev' 일 때만 injectRoute 하므로 dist 에 산출물이 생기지 않는다.
// 편집·발행·작성은 에이전트가 .md 를 직접 다루므로, admin 은 "전체 글 상태를 한눈에" 보는 용도만.
// write 엔드포인트 없음 → 인증 없는 쓰기 노출 위험도 없다.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';

const EXCLUDE = new Set(['README.md', 'backlog.md']); // 글이 아닌 문서 제외

export default function adminDev() {
  let dir = '';
  let uiPath = '';
  return {
    name: 'ax-admin-dev',
    hooks: {
      'astro:config:setup': ({ config, command, injectRoute }) => {
        dir = fileURLToPath(new URL('./content/ax-guide/', config.root));
        uiPath = fileURLToPath(new URL('./admin/ui.html', config.root));
        // 기획·디자인 시스템 페이지(/design)는 dev 에서만 라우팅한다.
        // src/pages/ 밖에 둬서 자동 라우팅을 피하고, 여기서만 주입 → prod dist 에 들어가지 않는다.
        if (command === 'dev') {
          injectRoute({ pattern: '/design', entrypoint: 'src/dev/design.astro' });
        }
      },
      // dev 서버 기동 시에만 호출 → build 엔 영향 없음.
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';

          if (url === '/admin' || url === '/admin/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.end(readFileSync(uiPath, 'utf-8'));
          }

          if (url.startsWith('/__admin/list')) {
            const items = readdirSync(dir)
              .filter((f) => f.endsWith('.md') && !EXCLUDE.has(f))
              .map((f) => {
                const { data } = matter(readFileSync(path.join(dir, f), 'utf-8'));
                return {
                  id: f.replace(/\.md$/, ''),
                  title: data.title || f,
                  track: data.track || '',
                  type: data.type || '',
                  draft: !!data.draft,
                  stage: data.stage || '',
                  updated: data.updated || '',
                  verified: data.verified || '',
                  reviewBy: data.review_by || '',
                  order: data.order ?? 100,
                };
              });
            // 트랙 그룹의 표시 순서는 UI(admin/ui.html)가 정한다. 여기서는 트랙 내 순서만.
            items.sort((a, b) => a.track.localeCompare(b.track) || a.order - b.order);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return res.end(JSON.stringify(items));
          }

          return next();
        });
        logger.info('dev 전용 페이지 → /admin (콘텐츠 현황) · /design (기획·디자인 시스템)');
      },
    },
  };
}
