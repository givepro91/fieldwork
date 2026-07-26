import { defineConfig } from 'astro/config';
import adminDev from './admin-dev.mjs';

import mdx from '@astrojs/mdx';

// 정적 출력(기본). Vercel 이 Astro 를 자동 감지해 dist/ 를 배포한다.
// adminDev 는 dev 서버 훅에서만 동작 → build/배포엔 영향 없음(정적 출력 그대로).
export default defineConfig({
  server: { port: 8351 }, // dev 포트 (Astro 기본 4321 은 다른 도구와 충돌 회피)
  integrations: [adminDev(), mdx()],
  // site: 'https://your-domain', // 배포 도메인 정해지면 설정
});