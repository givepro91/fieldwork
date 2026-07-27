---
title: AX를 맡으면 실제로 무엇을 하나
track: ax
type: concept
basis: mixed
stage: 탐색 중
updated: "2026-06-23"
order: 2
lead: 정의는 다른 글에 적었다. 여기서는 그 정의가 일이 되었을 때, 하루가 실제로 무엇으로 채워지는지를 다섯 자리로 나눠 본다.
related:
  - label: AX란 무엇인가
    href: "/guide/what-is-ax"
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
slides:
  - layout: cover
    kick: Fieldwork · AX·업무 재설계
    title: AX를 맡으면 실제로 무엇을 하나
    body: 정의가 일이 되었을 때, 하루는 무엇으로 채워지는가
  - layout: thesis
    kick: 테제
    title: 모델이 아니라 다섯 자리의 판단
    body: "맡은 사람의 일은 더 똑똑한 모델을 고르는 게 아니라, 다섯 자리에서 판단을 내리는 것이다 — 무엇을 바꿀지, 무엇을 보여줄지, 어디에 끼울지, 어디서 멈출지, 언제 접을지."
  - layout: flow
    kick: 루프
    title: 일은 한 바퀴 도는 루프다
    steps:
      - label: 문제를 고른다
        note: 빈도·경계·회복 가능성으로 거른다
      - label: 맥락을 공급한다
        note: 접근 권한·최신성·출처 신뢰도
      - label: 흐름에 심는다
        note: 결과가 다음 단계로 자연스럽게 흘러야
      - label: 게이트를 그린다
        note: 위험이 클수록 개입 지점을 앞에 둔다
      - label: 운영하고, 접는다
        note: 드리프트·비용·신뢰 하락이 신호
    note: 운영에서 드러난 문제가 다음 선택을 바꾼다
  - layout: compare
    kick: 1. 문제
    title: "시연용 루프 ≠ 가치 있는 루프"
    columns:
      - head: 시연하기 좋은 루프
        sub: 화면이 예쁘고 데모가 쉽다
        points:
          - 경계가 좁다
          - 실제로 아끼는 시간은 작다
          - 값있어 보이지만 임팩트가 적다
      - head: 값있는 루프
        sub: 업무 흐름에 박혀 있다
        accent: true
        points:
          - 자주 반복되고 회복 가능
          - 시연은 밋밋하지만 시간을 아낀다
          - 거르는 기준 — 빈도·경계·회복 가능성
    note: 가장 시연하기 좋은 루프가 가장 값있는 경우는 드물다
  - layout: stack
    kick: 안 하는 일
    title: 무게중심이 있는 쪽
    layers:
      - label: "무엇을 사람이 더 이상 직접 판단하지 않아도 되게 만들었나"
        note: 이 질문에 답이 없으면 도구가 하나 는 것
      - label: 틀렸을 때 어떻게 되돌리는가
        note: 회복 가능성이 선택 기준
      - label: 모델 벤치마크·새 도구 갈아타기·시연을 위한 시연
        note: 이건 안 한다
  - layout: cover
    kick: 지도
    title: 각 자리를 더 깊이 — 개별 글로 이어간다
    body: 문제 선택, 승인 게이트, 폐기 판단 — 이 글은 그 지도 역할이다
---

[AX란 무엇인가](/guide/what-is-ax)에서 AX를 "사람이 반복적으로 판단하던 업무 구조를 다시 설계하는 일"로 정의했다. 정의는 거기 적어뒀으니 반복하지 않는다. 이 글은 그 정의가 누군가의 실제 업무가 되었을 때, 하루가 무엇으로 채워지는지에 대한 것이다. 맡고 보면 생각보다 모델을 들여다보는 시간은 적고, 그 앞뒤의 판단에 시간이 간다.

<blockquote class="thesis">맡은 사람의 일은 더 똑똑한 모델을 고르는 게 아니라, 다섯 자리에서 판단을 내리는 것이다 — 무엇을 바꿀지, 무엇을 보여줄지, 어디에 끼울지, 어디서 멈출지, 언제 접을지.</blockquote>

## 일은 한 바퀴 도는 루프다

[what-is-ax](/guide/what-is-ax)에서는 같은 다섯 가지를 무너지면 위가 무너지는 계층으로 그렸다. 막상 일로 하다 보면 계층이라기보다 한 바퀴 도는 루프에 가깝다. 운영하다 드러난 문제가 다음에 무엇을 고를지를 바꾸기 때문이다. 그래서 같은 다섯을 이번엔 행위의 순서로 다시 본다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 640 210" role="img" aria-label="문제 고르기, 맥락 공급, 흐름에 심기, 게이트 설계, 운영을 거쳐 다시 문제 고르기로 돌아오는 루프">
      <defs>
        <marker id="ah-w1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="6" y="50" rx="9" width="112" height="50"/>
      <text class="ntext" x="62" y="72" text-anchor="middle">① 고르기</text>
      <text class="nsub" x="62" y="88" text-anchor="middle">문제 선택</text>
      <line class="edge" marker-end="url(#ah-w1)" x1="118" y1="75" x2="148" y2="75"/>
      <rect class="node" x="150" y="50" rx="9" width="112" height="50"/>
      <text class="ntext" x="206" y="72" text-anchor="middle">② 공급</text>
      <text class="nsub" x="206" y="88" text-anchor="middle">맥락·데이터</text>
      <line class="edge" marker-end="url(#ah-w1)" x1="262" y1="75" x2="292" y2="75"/>
      <rect class="node" x="294" y="50" rx="9" width="112" height="50"/>
      <text class="ntext" x="350" y="72" text-anchor="middle">③ 심기</text>
      <text class="nsub" x="350" y="88" text-anchor="middle">워크플로우</text>
      <line class="edge" marker-end="url(#ah-w1)" x1="406" y1="75" x2="436" y2="75"/>
      <rect class="node-soft" x="438" y="50" rx="9" width="112" height="50"/>
      <text class="ntext" x="494" y="72" text-anchor="middle">④ 게이트</text>
      <text class="nsub" x="494" y="88" text-anchor="middle">승인 구조</text>
      <rect class="node-soft" x="528" y="130" rx="9" width="106" height="48"/>
      <text class="ntext" x="581" y="151" text-anchor="middle">⑤ 운영</text>
      <text class="nsub" x="581" y="167" text-anchor="middle">관측·폐기</text>
      <path class="edge" marker-end="url(#ah-w1)" d="M500 100 C540 118 560 120 581 128"/>
      <path class="edge edge-d" marker-end="url(#ah-w1)" d="M528 154 C300 198 140 168 62 104"/>
      <text class="ctr" x="288" y="192" text-anchor="middle">운영에서 드러난 문제가 다음 선택을 바꾼다</text>
    </svg>
  </div>
  <figcaption>그림 1 · 맡은 사람이 도는 다섯 자리 — 계층이 아니라 루프 (사이클)</figcaption>
</figure>

## 1. 문제를 고른다

가장 먼저, 그리고 가장 자주 틀리는 자리다. 후보가 올라오면 빈도·경계·회복 가능성으로 거른다. 자주 반복되는가, 입력과 성공 기준이 분명한가, 틀려도 되돌릴 수 있는가. 셋 다 약한 일은 멋져 보여도 미룬다.

함정은 가장 시연하기 좋은 일이 가장 값있는 일과 거의 겹치지 않는다는 데 있다. 데모가 화려한 루프는 보통 경계가 좁아 실제로 아끼는 시간이 적고, 정작 값있는 루프는 업무 흐름 깊숙이 박혀 있어 화면으로 보여주기엔 밋밋하다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">시연하기 좋은 루프</div>
      <ul><li>화면이 예쁘고 데모가 쉽다</li><li>경계가 좁다</li><li>실제로 아끼는 시간은 작다</li></ul>
    </div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">값있는 루프</div>
      <ul><li>자주 반복되고 회복 가능</li><li>업무 흐름에 박혀 있다</li><li>시연은 밋밋하지만 시간을 아낀다</li></ul>
    </div>
  </div>
  <figcaption>그림 2 · 무엇을 먼저 고를까 — 시연용과 가치 있는 루프는 다르다 (비교)</figcaption>
</figure>

이 거르는 기준 자체를 한 편으로 더 풀 생각이다(`어떤 루프를 먼저 고를까`). 여기서는 "고르는 일이 맨 앞에 있고, 시연성과 가치를 헷갈리지 않는다"까지만 붙잡는다.

## 2. 맥락을 공급한다

문제를 골랐으면 그다음은 모델이 사람만큼 보게 만드는 일이다. 모델은 우리가 줄 수 있는 맥락만큼만 똑똑하다. 현장에서 "AI가 영 별로다"의 상당수는 모델이 약해서가 아니라, 사람이라면 당연히 펼쳐봤을 자료를 안 줬기 때문이었다. 그래서 접근 권한, 자료의 최신성, 출처의 신뢰도를 챙기는 지루한 작업이 실제로는 결과를 가장 크게 흔든다.

여기엔 따로 다룰 질문이 하나 붙어 있다 — 맥락을 줬다고 출력을 믿어도 되는가. "믿어도 되나"를 감이 아니라 정확도·검증 비용·회복 비용의 관계로 답하는 일은 별도 글(`AI 출력의 신뢰도 판단`)로 미뤄둔다.

## 3. 흐름에 심는다

맥락까지 갖췄으면 그 AI 단계를 기존 업무 동선 안에 넣어야 한다. 흐름 옆에 챗봇이나 도구를 따로 세워두는 것으로는 대개 아무것도 바뀌지 않는다. 사람들이 원래 일하던 자리에서 한 번 더 다른 창을 열어야 한다면, 그 단계는 곧 안 쓰이게 된다. 심는다는 건 결과가 다음 단계로 자연스럽게 흘러 들어가도록, 입출력의 자리를 기존 흐름에 맞추는 일이다. [에이전트를 모는 법](/guide/driving-agents)에서 다룬 harness — 모델을 둘러싼 환경 — 이 여기서 실제 업무 흐름과 만난다.

## 4. 게이트를 그린다

자동화가 흐름에 들어가는 순간 "어디까지 알아서 하고 어디서 사람을 기다릴까"가 문제가 된다. 자동으로 적용할지, 제안만 하고 사람의 승인을 기다릴지. 원칙은 단순하다. 위험이 클수록 사람의 개입 지점을 더 앞에 둔다. 되돌리기 쉬운 일은 먼저 적용하고 나중에 검토해도 되지만, 되돌리기 어려운 일은 적용 전에 멈춰 세운다.

이 게이트를 어디에 몇 개 둘지, 개입이 형식적인 도장 찍기로 전락하지 않게 하려면 무엇이 필요한지는 [AI에 승인 게이트가 필요한 이유](/guide/approval-gates)에서 위험 2축으로 따로 풀었다(이어서 `Human-in-the-loop 패턴`도). [what-is-ax](/guide/what-is-ax)의 승인 게이트 도식이 그 출발점이다.

## 5. 운영하고, 접는다

만들고 흐름에 심어 게이트까지 달면 끝이 아니라 거기서부터 진짜 일이 시작된다. 관측이 되는가, 무슨 입력에 무슨 출력을 냈는지 추적이 남는가, 비용은 감당 가능한가, 시간이 지나며 입력 분포가 바뀌어 슬그머니 품질이 떨어지지는 않는가(드리프트). 여기가 안 받치면 잘 만든 자동화도 데모로 끝난다.

그리고 가장 어려운 판단이 마지막에 있다 — 언제 접을 것인가. 만드는 결정보다 접는 결정이 늘 어렵다. 한번 돌아가는 자동화는 끄기가 두렵고, 그래서 신뢰가 떨어진 채로 방치되며 빚이 된다. 드리프트가 누적되거나, 유지 비용이 아끼는 값을 넘어서거나, 사람들이 결과를 더 이상 믿지 않기 시작하면 그게 접을 신호다. 이 폐기 기준은 안티패턴 축의 첫 글로 따로 쓸 생각이다(`운영 자동화는 언제 폐기하나`).

## 안 하는 일

다섯 자리를 보면 맡은 사람이 안 하는 일도 또렷해진다. 모델 벤치마크 점수를 쫓지 않고, 새 도구가 나올 때마다 갈아타지 않으며, 시연을 위한 시연을 만들지 않는다. 이 일의 무게중심은 "무엇이 가능한가"가 아니라 "무엇을 사람이 더 이상 직접 판단하지 않아도 되게 만들었고, 틀렸을 때 어떻게 되돌리는가"에 있다. 그 질문에 답이 없으면 도구가 하나 는 것이지 구조가 바뀐 건 아니다.

## 같은 근육을 쓴다

이 다섯이 특별히 새로운 일은 아니다. 백엔드에서 늘 하던 "이게 실패하면 어떻게 되나"와, 프로덕트에서 배운 "무엇을 안 만들지 정하는 일"을 비결정적인 부품 위에 다시 얹은 것에 가깝다. 그래서 나는 AX를 맡는 일을 낯선 분야로 새로 배운다기보다, 쓰던 감각을 새 재료에 맞춰 다시 적용하는 일로 본다. 각 자리의 더 깊은 이야기는 위에 링크해둔 개별 글들로 이어갈 생각이다 — 이 글은 그 지도 역할이다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 5계층을 행위 루프로 재구성한 허브 글 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>각 자리(문제 선택·승인 게이트·폐기 판단)를 개별 글로 분화하며 링크 연결</span></li>
  </ul>
</section>
