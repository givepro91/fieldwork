---
title: 어떤 업무 루프를 먼저 AX로 만들까
track: ax
type: decision
stage: 탐색 중
updated: "2026-06-23"
order: 3
lead: 후보는 늘 많다. 문제는 무엇을 고르느냐인데, 가장 눈에 띄는 일과 가장 값있는 일은 대개 다르다.
related:
  - label: AX를 맡으면 실제로 무엇을 하나
    href: "/guide/what-ax-work-looks-like"
  - label: AI에 승인 게이트가 필요한 이유
    href: "/guide/approval-gates"
slides:
  - layout: cover
    kick: AX Field Guide · 개념·관점
    title: 어떤 업무 루프를 먼저 AX로 만들까
    body: AX의 첫 결정 — 무엇을 다시 설계할지 고르는 일
  - layout: thesis
    kick: 테제
    title: 고르는 게 결과의 절반을 정한다
    body: 좋은 구현도 잘못 고른 문제 위에서는 쓸모가 없다. AX의 흔한 실패는 모델이 약해서가 아니라 바꿀 필요 없는 일을 바꾸거나 바꿔야 할 일을 못 고르는 데서 온다.
  - layout: flow
    kick: 세 필터
    title: 빈도 → 경계 → 회복 순으로 거른다
    steps:
      - label: 빈도 — 자주 반복되는가
        note: 한 번뿐인 일은 자동화 값이 작다. 매일·매시간 반복되는 판단이 좋은 출발점.
      - label: 경계 — 입력과 성공이 분명한가
        note: 기준이 흐린 일은 자동화해도 결과를 검증할 수 없다.
      - label: 회복 — 틀려도 되돌릴 수 있는가
        note: 불가능하면 빈도·경계가 아무리 좋아도 후보에서 뺀다.
    note: 위에서 아래로 갈수록 더 강하게 거른다. 많은 후보가 빈도에서 살아남다가 회복 가능성에서 떨어진다.
  - layout: compare
    kick: 함정
    title: "시연용 루프 ≠ 가치 있는 루프"
    columns:
      - head: 시연용 루프
        sub: 고르고 싶어지는 것
        points:
          - 데모가 화려하다
          - 경계가 좁아 실제로 아끼는 시간이 적다
          - 이걸 시연하면 멋질까에 답이 있다
      - head: 가치 있는 루프
        sub: 먼저 해야 할 것
        accent: true
        points:
          - 업무 흐름 깊숙이 박혀 밋밋하다
          - 안 되면 누군가 매번 시간을 쓴다
          - 이게 안 되면 누가 시간을 쓰나에 답이 있다
    note: '"이걸 시연하면 멋질까"가 아니라 "이게 안 되면 누가 매번 시간을 쓰나"를 묻는다.'
  - layout: thesis
    kick: 순서
    title: 하나를 끝까지, 그다음으로
    body: 여러 개를 얕게 벌여두면 어느 것도 운영 단계까지 못 간다. 첫 루프는 결과물이면서 동시에 다음 선택을 위한 학습이다.
    note: 지금 단단한 기준은 둘 — 회복 불가는 먼저 거른다, 시연성에 속지 않는다.
  - layout: cover
    kick: 정리
    title: 먼저 거르고, 하나를 깊게
    body: 빈도·경계·회복으로 좁히고, 가장 값있는 하나를 운영까지 끌고 가 본다.
---

[AX를 맡으면 실제로 무엇을 하나](/guide/what-ax-work-looks-like)에서 다섯 자리 중 맨 앞에 "문제를 고른다"를 뒀다. 그리고 가장 자주 틀리는 자리라고도 적었다. 이 글은 그 자리만 떼어, 후보가 여럿 올라왔을 때 무엇을 먼저 집을지 거르는 기준을 정리한다.

<blockquote class="thesis">무엇을 고르느냐가 결과의 절반을 정한다. 좋은 구현도 잘못 고른 문제 위에서는 쓸모가 없고, AX의 흔한 실패는 모델이 약해서가 아니라 바꿀 필요 없는 일을 바꾸거나 바꿔야 할 일을 못 고르는 데서 온다.</blockquote>

## 세 개의 필터

후보를 거를 때 나는 세 가지를 차례로 통과시킨다. 빈도, 경계, 회복 가능성. 위에서 아래로 갈수록 더 강하게 거른다 — 많은 후보가 빈도에서 살아남았다가 회복 가능성에서 떨어진다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 460 250" role="img" aria-label="후보가 빈도, 경계, 회복 가능성 세 필터를 거쳐 좁혀지는 깔때기">
      <rect class="node-soft" x="40" y="20" width="380" height="40" rx="8"/>
      <text class="ntext" x="230" y="44" text-anchor="middle">후보 업무 루프 (많다)</text>
      <path class="edge edge-d" d="M230 60 L230 76" marker-end=""/>
      <rect class="node" x="80" y="78" width="300" height="40" rx="8"/>
      <text class="ntext" x="230" y="98" text-anchor="middle">① 빈도 — 자주 반복되는가</text>
      <text class="nsub" x="230" y="112" text-anchor="middle">한 번뿐인 일은 자동화 값이 작다</text>
      <rect class="node" x="120" y="130" width="220" height="40" rx="8"/>
      <text class="ntext" x="230" y="150" text-anchor="middle">② 경계 — 입력·성공이 분명한가</text>
      <text class="nsub" x="230" y="164" text-anchor="middle">기준이 흐리면 검증도 못 한다</text>
      <rect class="node" x="155" y="182" width="150" height="40" rx="8"/>
      <text class="ntext" x="230" y="202" text-anchor="middle">③ 회복 — 되돌릴 수 있나</text>
      <text class="nsub" x="230" y="216" text-anchor="middle">불가면 탈락</text>
      <text class="ctr" x="230" y="240" text-anchor="middle">↓ 남은 것 = 먼저 만들 루프</text>
    </svg>
  </div>
  <figcaption>그림 1 · 세 필터를 차례로 통과시켜 후보를 좁힌다 (깔때기)</figcaption>
</figure>

**빈도.** 자주 반복되는 일일수록 자동화가 아끼는 시간이 누적된다. 한 달에 한 번 하는 일은 잘 만들어도 본전 뽑기 어렵고, 만드는 동안 그 일이 또 바뀐다. 매일·매시간 반복되는 판단이 좋은 출발점이다.

**경계.** 입력이 무엇이고 무엇이 "잘 된 것"인지가 분명해야 한다. 경계가 흐린 일은 자동화해도 결과를 검증할 수가 없어서, 믿을 수 있는지조차 답하지 못한다. 사람이 봐도 "이게 맞나?" 싶은 모호한 판단은 기계에 넘기기 전에 먼저 기준부터 세워야 한다.

**회복 가능성.** 틀렸을 때 되돌릴 수 있는가. 이건 다른 둘보다 우선한다 — 빈도가 높고 경계가 분명해도 한 번 틀리면 복구 불가능한 일이라면 후보에서 뺀다. 자동화의 전제는 "가끔 틀린다"이기 때문에, 틀림을 감당할 수 없는 일은 애초에 대상이 아니다.

## 시연용과 가치 있는 루프

세 필터를 통과해도 함정이 하나 남는다. 가장 고르고 싶어지는 일이 대개 가장 값있는 일이 아니라는 점이다. [실천편](/guide/what-ax-work-looks-like)에서도 짚었지만, 데모가 잘 나오는 루프는 보통 경계가 좁아 실제로 아끼는 시간이 적고, 정작 시간을 잡아먹는 루프는 업무 흐름 깊숙이 박혀 있어 보여주기엔 밋밋하다.

그래서 "이걸 시연하면 멋질까"가 아니라 "이게 안 되면 누가 매번 시간을 쓰나"를 묻는다. 후자에 또렷한 답이 있으면, 화면이 밋밋해도 그게 먼저다.

## 하나를 끝까지

마지막은 욕심의 문제다. 후보가 여럿 통과하면 다 건드리고 싶어지는데, 여러 개를 얕게 벌여두면 어느 것도 운영 단계까지 못 간다. 하나를 골라 [승인 게이트](/guide/approval-gates)와 운영까지 끝까지 끌고 가 보면, 그 과정에서 다음에 무엇을 골라야 할지에 대한 감이 훨씬 정확해진다. 첫 루프는 결과물이면서 동시에 다음 선택을 위한 학습이다.

아직 정리 중인 부분도 있다. 세 필터에 가중치를 어떻게 줄지, 빈도는 낮지만 한 번의 가치가 큰 일(예: 분기 한 번이지만 큰 결정)을 어떻게 다룰지는 사례가 더 쌓여야 답할 수 있다. 지금은 "회복 불가는 먼저 거르고, 시연성에 속지 않는다"까지를 단단한 기준으로 둔다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 세 필터(빈도·경계·회복)와 시연/가치 함정 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>저빈도·고가치 루프 다루는 법 · 필터 가중치를 익명화 사례로 보강</span></li>
  </ul>
</section>
