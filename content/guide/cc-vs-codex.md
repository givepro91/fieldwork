---
title: Claude Code vs Codex — 무엇을 언제
track: agents
type: decision
stage: 탐색 중
updated: "2026-06-23"
order: 4
lead: 둘 중 하나를 고르는 글이 아니다. 써보니 우열보다 자리가 갈렸다 — 사람 없이 정기적으로 도는 일과, 곁에서 빠르게 주고받는 일.
related:
  - label: Claude Code를 AX 관점에서 쓰는 법
    href: "/guide/claude-code-ax"
  - label: Codex를 AX 관점에서 쓰는 법
    href: "/guide/codex-ax"
slides:
  - layout: cover
    kick: Fieldwork · 에이전트로 일하기
    title: Claude Code vs Codex
    body: 어느 게 낫냐가 아니라, 어떤 일에 무엇이 맞았나
  - layout: thesis
    kick: 테제
    title: 우열보다 자리가 먼저 갈렸다
    body: 어느 모델이 더 똑똑한가가 아니라, 사람이 얼마나 끼느냐에 따라 두 도구가 자연스럽게 다른 자리에 놓였다.
  - layout: compare
    kick: 가른 축
    title: 사람 개입 빈도가 자리를 갈랐다
    columns:
      - head: 무인 정기 → 러너
        sub: 사람이 매번 안 본다
        points:
          - 가드레일·검증이 본체
          - 안전하게 도는 게 관건
          - 나는 여기에 Codex
      - head: 개발·판단 → 협업
        sub: 사람과 빠르게 주고받는다
        accent: true
        points:
          - 위임 경계·승인이 관건
          - 맥락을 함께 쌓는 게 중요
          - 나는 여기에 Claude Code
    note: "\"둘 중 뭘 쓸까\"보다 \"이 일에 사람이 얼마나 껴야 하나\"를 먼저 물으면, 도구는 거기서 정해진다."
  - layout: flow
    kick: 분담 방식
    title: 작업 성격이 도구를 고른다
    steps:
      - label: 일의 성격 파악
        note: 사람이 매번 봐야 하는가, 아닌가
      - label: 무인 정기라면 → Codex 러너
        note: 가드레일·검증·기록이 핵심
      - label: 그때그때 개발·판단이라면 → Claude Code
        note: 빠른 주고받기, 위임 경계 설정
    note: 두 도구가 경쟁하기보다 작업 축의 양 끝에 각각 자리 잡았다.
  - layout: thesis
    kick: 솔직히
    title: 정밀 비교는 아직 보류
    body: 같은 작업을 두 도구에 똑같이 시켜 우열을 잰 적이 없다. 자리가 일찍 갈려 정면 비교를 할 동기가 없었다 — 이건 그대로 남겨둔 자리다.
  - layout: cover
    kick: 지금 단계의 한 줄
    title: 자리부터 보고, 도구는 거기서 고른다
    body: 같은 일을 양쪽에 시켜 보는 실험은 다음에 채울 자리로 남겨둔다.
---

도구 두 개를 두고 "어느 게 낫냐"는 질문을 자주 받지만, 나는 그 질문이 대개 틀을 잘못 잡았다고 본다. [Claude Code](/guide/claude-code-ax)와 [Codex](/guide/codex-ax)를 둘 다 쓰면서 느낀 건, 우열을 가리기 전에 **자리가 먼저 갈렸다**는 점이다. 그래서 이 글은 둘 중 하나를 고르는 글이 아니다.

<blockquote class="thesis">어느 도구가 더 똑똑한가가 아니라, 어떤 작업 성격에 무엇이 맞았는가. 써보니 둘은 경쟁하기보다 다른 자리에 앉았다.</blockquote>

## 무엇이 자리를 갈랐나

가른 축은 성능이 아니라 **사람이 얼마나 끼느냐**였다. 한쪽 끝에는 사람 없이 정해진 시각에 도는 일이 있고, 다른 끝에는 사람과 빠르게 주고받으며 그때그때 판단이 끼는 일이 있다. 이 축 위에서 두 도구가 자연스럽게 다른 자리에 놓였다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">무인 정기 → 러너</div>
      <ul><li>사람이 매번 안 본다</li><li>가드레일·검증이 본체</li><li>안전하게 도는 게 관건</li><li>나는 여기에 Codex</li></ul>
    </div>
    <div class="cmp-arrow">↔</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">개발·판단 → 협업</div>
      <ul><li>사람과 빠르게 주고받는다</li><li>위임 경계·승인이 관건</li><li>맥락을 함께 쌓는 게 중요</li><li>나는 여기에 Claude Code</li></ul>
    </div>
  </div>
  <figcaption>그림 1 · 사람 개입 빈도가 자리를 갈랐다 (분담)</figcaption>
</figure>

[Codex 글](/guide/codex-ax)에서 쓴 무인 러너 — 매주 같은 시각에 자료를 읽고 초안을 만들고 검증을 통과하면 커밋하는 — 가 왼쪽이다. 거기서 중요한 건 모델이 얼마나 똑똑한가가 아니라 사람이 안 보는 동안 안전하게 도느냐였다. 오른쪽은 [Claude Code 글](/guide/claude-code-ax)에서 쓴 협업 — 조사는 위임하고 결정은 내가 쥐며 맥락을 함께 쌓아가는 — 이다. 거기선 빠른 주고받기와 위임 경계가 관건이었다.

## 솔직히, 정밀 비교는 아직

여기서 글을 멋지게 닫고 싶지만 정직하게 적는다. 나는 **같은 작업을 두 도구에 똑같이 시켜 우열을 잰 적이 없다.** 자리가 일찍 갈려서 그럴 일이 적었기 때문이다. 무인으로 돌릴 일은 한쪽에, 곁에서 개발할 일은 다른 쪽에 두다 보니 정면 비교를 할 동기가 없었다.

그래서 "어느 게 코드를 더 잘 짜나", "복잡한 리팩터링은 어느 쪽이 나은가" 같은 질문에는 아직 근거 있는 답이 없다. 이건 [이 프로젝트가 피하려는 글](/guide/what-is-ax) — 안 해보고 비교하는 글 — 이 되지 않으려는 선이기도 하다. 같은 일을 양쪽에 시켜 보는 실험을 따로 해야 채울 수 있는 자리로 남겨 둔다.

지금 단계에서 말할 수 있는 한 줄은 이것뿐이다. **"둘 중 뭘 쓸까"보다 "이 일에 사람이 얼마나 껴야 하나"를 먼저 물으면, 도구는 대개 거기서 정해진다.**

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안에서 발행. 사람 개입 축으로 본 자리 분담 정리. 정밀 우열 비교는 보류(미실험) (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>같은 작업을 양쪽에 시킨 비교 실험 후 우열·세부 보강</span></li>
  </ul>
</section>
