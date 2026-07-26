---
title: Claude Code를 AX 관점에서 쓰는 법
track: agents
type: decision
stage: 탐색 중
updated: "2026-06-23"
order: 2
lead: 코딩 도구로만 보면 작아진다. AX 관점에서 Claude Code는 반복 작업을 위임하고, 그 위임에 승인·검증·기록을 거는 운영의 대상이다.
related:
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
  - label: AI에 승인 게이트가 필요한 이유
    href: "/guide/approval-gates"
  - label: AX를 맡으면 실제로 무엇을 하나
    href: "/guide/what-ax-work-looks-like"
slides:
  - layout: cover
    kick: AX Field Guide · 도구·기법
    title: Claude Code · AX 관점
    body: 코딩 보조가 아니라, AI가 일할 운영 구조를 짜는 도구로
  - layout: thesis
    kick: 테제
    title: 쓰기보다 운영이다
    body: "Claude Code를 잘 쓴다는 건 더 좋은 프롬프트가 아니라, 무엇을 위임하고 어디서 멈춰 검증받게 할지를 정하는 일이다."
  - layout: compare
    kick: 전환
    title: 그냥 쓰기에서 운영으로
    columns:
      - head: 도구로 쓰기
        sub: 그때그때 프롬프트
        points:
          - 결과를 매번 손으로 확인
          - 잘 되면 운, 안 되면 다시
          - 병목은 항상 나
      - head: 운영으로 쓰기
        sub: 반복 흐름을 키트·설정으로 고정
        accent: true
        points:
          - 승인·검증을 흐름에 박아둠
          - 같은 품질로 다시 돌릴 수 있음
          - 설정 동기화·워크플로우 키트가 생긴다
    note: 어느 순간 도구를 쓰기 위한 도구를 만들고 있는 자신을 발견할 때, 운영이 시작됐다는 신호다.
  - layout: stack
    kick: 위임 경계
    title: 무엇을 맡기고 무엇을 쥘까
    layers:
      - label: 조사·초안 → 위임
        note: 경계가 분명하고 검증 가능하고 회복 가능한 일
      - label: 결정·채택 → 직접
        note: 되돌리기 어렵거나 판단의 책임이 큰 일
      - label: 위임이 늘수록 "내가 쥘 판단"이 더 또렷해진다
        note: 위임은 내 판단을 빼앗는 게 아니라 선명하게 만든다
    note: 한 작업 안에서도 갈린다 — 조사는 맡기고, 무엇을 넣을지는 내가 한다.
  - layout: flow
    kick: 게이트
    title: 위임에는 게이트가 따라온다
    steps:
      - label: 위임
        note: 경계 분명한 반복 작업
      - label: 승인 게이트
        note: 자동 적용할지, 멈춰 확인받을지
      - label: 검증
        note: 빌드·테스트로 기계가 거를 수 있으면 자동, 아니면 사람이 본다
      - label: 기록
        note: 무엇을 왜 바꿨나 — 나중에 되짚을 근거
    note: 위임의 상한은 모델 성능이 아니라 검증을 자동화할 수 있느냐에서 정해진다.
  - layout: cover
    kick: 정리
    title: 모델이 아니라 운영을 바꿨을 때 결과가 달라졌다
    body: 같은 모델이라도 무엇을 맡기고 어디서 검증받게 하느냐로 결과가 갈린다.
---

[에이전트를 모는 법](/guide/driving-agents)에서 세운 틀 — 역할·한계·언제 쓰나 — 을 한 도구에 대입해 본다. Claude Code를 코딩 자동완성으로만 보면 핵심을 놓친다. AX의 질문은 "코드를 얼마나 잘 짜나"가 아니라 <strong>"사람이 반복하던 작업을 어디까지 위임할 수 있고, 그 위임에 승인과 검증을 어디에 둘 것인가"</strong>다. 나는 "AI를 붙이는" 쪽보다 **AI가 일할 수 있는 운영 구조를 짜는** 쪽에 관심이 있고, Claude Code는 그 운영의 가장 가까운 대상이다.

<blockquote class="thesis">Claude Code를 잘 쓴다는 건 더 좋은 프롬프트를 쓰는 일이 아니라, 무엇을 위임하고 어디서 멈춰 검증받게 할지를 정하는 일이다.</blockquote>

## 도구 위에 도구를 만들게 된다

그냥 쓰는 것과 운영하는 것의 차이는, 어느 순간 도구를 쓰기 위한 도구를 만들고 있는 자신을 발견할 때 드러난다. 나는 여러 프로젝트에 흩어진 Claude Code 설정을 동기화하는 작은 CLI를 만들어 쓰고, 반복하는 작업 흐름을 스킬·워크플로우 키트로 묶어 두고, 에이전트가 쏟아내는 산출물을 다시 찾고 맥락으로 돌아오기 위한 도구를 따로 둔다. 처음부터 그러려던 건 아니었다. 같은 작업을 반복하다 보니 "이 부분은 매번 똑같이 하는데"가 쌓였고, 그게 도구가 됐다.

이 경험이 알려준 건 단순하다. **AI 코딩의 병목은 모델의 똑똑함이 아니라, 그 모델을 어떻게 반복 가능하게 운영하느냐**에 있다. 프롬프트 한 줄을 잘 쓰는 것보다, 같은 작업을 매번 같은 품질로 돌리는 흐름을 만드는 게 훨씬 크게 작용했다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">도구로 쓰기</div>
      <ul><li>그때그때 프롬프트</li><li>결과를 매번 손으로 확인</li><li>잘 되면 운, 안 되면 다시</li></ul>
    </div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">운영으로 쓰기</div>
      <ul><li>반복 흐름을 키트·설정으로 고정</li><li>승인·검증을 흐름에 박아둠</li><li>같은 품질로 다시 돌릴 수 있음</li></ul>
    </div>
  </div>
  <figcaption>그림 1 · 그냥 쓰기와 운영하기의 차이 (비교)</figcaption>
</figure>

## 무엇을 맡기고 무엇을 쥘까

위임의 경계는 [어떤 루프를 먼저 고를까](/guide/choosing-loops)에서 쓴 기준과 같다. 경계가 분명하고 검증 가능하고 회복 가능한 일은 맡긴다. 되돌리기 어렵거나 판단의 책임이 큰 일은 직접 쥔다. 실제로는 한 작업 안에서도 갈린다 — 조사하고 초안을 잡는 일은 위임하고, 무엇을 채택할지 결정하는 일은 내가 한다.

이 글을 포함한 작업도 그렇게 했다. 용어의 출처를 확인하거나 여러 파일에 흩어진 자료를 훑는 일은 별도의 에이전트에 맡기고 결론만 받았다. 무엇을 글에 넣고 무엇을 버릴지, 어떤 톤으로 쓸지는 위임하지 않았다. 위임이 늘수록 "내가 붙잡아야 할 판단"이 오히려 더 또렷해지더라는 게 반복해서 느낀 점이다.

## 위임에는 게이트가 따라온다

작업을 맡기는 순간 [승인 게이트](/guide/approval-gates) 문제가 그대로 따라온다. 어디까지 자동으로 적용하게 두고, 어디서 멈춰 내 확인을 받게 할 것인가. 위험이 작고 되돌리기 쉬운 변경은 일단 적용하고 나중에 보고, 되돌리기 어려운 변경은 적용 전에 멈춰 세운다. 그리고 검증을 무엇으로 할지 — 빌드와 테스트로 기계가 거를 수 있으면 그렇게 하고, 그게 안 되는 판단은 사람이 본다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 600 150" role="img" aria-label="위임에서 시작해 승인 게이트, 검증을 거쳐 기록으로 이어지는 흐름">
      <defs>
        <marker id="ah-cc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="8" y="54" width="120" height="46" rx="9"/>
      <text class="ntext" x="68" y="74" text-anchor="middle">위임</text>
      <text class="nsub" x="68" y="90" text-anchor="middle">경계 분명한 반복</text>
      <line class="edge" marker-end="url(#ah-cc)" x1="128" y1="77" x2="156" y2="77"/>
      <path class="node-soft" d="M214 52 L262 77 L214 102 L166 77 z"/>
      <text class="nsub" x="214" y="74" text-anchor="middle">승인</text>
      <text class="nsub" x="214" y="88" text-anchor="middle">게이트</text>
      <line class="edge" marker-end="url(#ah-cc)" x1="262" y1="77" x2="292" y2="77"/>
      <rect class="node" x="294" y="54" width="120" height="46" rx="9"/>
      <text class="ntext" x="354" y="74" text-anchor="middle">검증</text>
      <text class="nsub" x="354" y="90" text-anchor="middle">빌드·테스트·사람</text>
      <line class="edge" marker-end="url(#ah-cc)" x1="414" y1="77" x2="444" y2="77"/>
      <rect class="node-soft" x="446" y="54" width="146" height="46" rx="9"/>
      <text class="ntext" x="519" y="74" text-anchor="middle">기록</text>
      <text class="nsub" x="519" y="90" text-anchor="middle">무엇을 왜 바꿨나</text>
    </svg>
  </div>
  <figcaption>그림 2 · Claude Code를 운영으로 본다 — 위임에 게이트·검증·기록이 붙는다 (흐름)</figcaption>
</figure>

여기서 멀티에이전트로 일을 나누면 검증이 한 겹 더 생긴다. 작성하는 에이전트와 그걸 평가하는 에이전트를 분리하면, 같은 맥락 안에서 자기 일을 자기가 통과시키는 일을 막을 수 있다. 만드는 쪽과 검사하는 쪽을 다른 자리에 두는 건 사람 조직에서 하던 것과 다르지 않다.

## 한계는 분명하다

운영으로 감싼다고 모델이 똑똑해지는 건 아니다. Claude Code도 결국 [비결정적인 부품](/guide/driving-agents)이라 같은 작업에 매번 같은 답을 내지 않고, 자신만만하게 틀린다. 그래서 위임을 늘릴수록 검증을 더 단단히 박아야 하고, 검증을 코드로 쓸 수 없는 일(예: 글의 톤, 설계의 적절성)은 결국 사람이 봐야 한다. 위임의 상한은 모델 성능이 아니라 **검증을 자동화할 수 있느냐**에서 정해지더라는 게 지금까지의 감이다.

## 그래서 어떻게 쓰나

한 줄로 줄이면, Claude Code는 "코드를 짜 주는 도구"가 아니라 **반복 작업을 맡기고 그 위임에 승인·검증·기록을 거는 대상**으로 쓴다. 같은 모델이라도 무엇을 맡기고 어디서 멈춰 검증받게 하느냐로 결과가 갈렸다. 모델을 바꾼 게 아니라 모델을 둘러싼 운영을 바꿨을 때 결과가 달라진 경험이, 이 도구를 코딩 보조가 아니라 운영의 대상으로 보게 만든 이유다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안에서 발행. 운영 관점·위임 경계·게이트 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>멀티에이전트 분담·검증 자동화의 익명화 사례 보강</span></li>
  </ul>
</section>
