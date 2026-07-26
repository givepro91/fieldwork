---
title: AI에 승인 게이트가 필요한 이유
track: ax
type: playbook
stage: 탐색 중
updated: "2026-06-23"
order: 6
lead: 게이트를 어디에 둘지는 취향이 아니라 위험으로 정해진다. 되돌릴 수 있으면 먼저 하고 나중에 보고, 되돌리기 어려우면 하기 전에 멈춘다.
related:
  - label: AX를 맡으면 실제로 무엇을 하나
    href: "/guide/what-ax-work-looks-like"
  - label: AX란 무엇인가
    href: "/guide/what-is-ax"
slides:
  - layout: cover
    kick: AX Field Guide · 패턴·플레이북
    title: AI에 승인 게이트가 필요한 이유
    body: 자동으로 할 일과 사람이 멈춰 세울 일을 가르는 설계
  - layout: thesis
    kick: 테제
    title: 자리는 위험으로 정해진다
    body: 되돌릴 수 있으면 먼저 하고 나중에 본다. 되돌리기 어려우면 하기 전에 멈춘다.
  - layout: compare
    kick: 결정 매트릭스
    title: "되돌리기 × 파급 범위"
    columns:
      - head: 되돌리기 쉬움
        sub: 속도를 얻는 영역
        points:
          - "좁음 → 자동 적용, 로그만 남긴다"
          - "넓음 → 자동 + 사후 검토, 롤백을 준비"
      - head: 되돌리기 어려움
        sub: 사람을 앞에 두는 영역
        accent: true
        points:
          - "좁음 → 제안 후 사람 승인"
          - "넓음 → 승인 + 단계 차단, 게이트를 가장 앞에"
    note: 가장 위험한 칸(어려움·넓음)은 자동화 후보로 적절한지부터 다시 본다.
  - layout: flow
    kick: 세 게이트
    title: 실제로 쓰는 세 형태
    steps:
      - label: "제안 → 사람 승인"
        note: 되돌리기 어려운 일의 기본값. 느리지만 안전하다.
      - label: 자동 적용 + 사후 검토
        note: 롤백 경로가 없으면 쓰면 안 된다.
      - label: 단계적 게이트
        note: 임계치를 넘는 것만 사람에게 올린다. "무엇이 임계치인가"를 잘 정해야 한다.
  - layout: compare
    kick: 경고
    title: 도장이 된 게이트 vs 작동하는 게이트
    columns:
      - head: 도장이 된 게이트
        sub: 통제의 착시
        points:
          - 승인 화면에 맥락이 없다
          - 기본값이 승인이다
          - 양이 많아 다 못 본다
      - head: 작동하는 게이트
        sub: 실질적 통제
        accent: true
        points:
          - 판단에 필요한 맥락을 같이 준다
          - 반려·보류가 쉽다
          - 저위험은 자동으로 빼 양을 줄인다
    note: 항상 승인되는 게이트는 없는 것보다 나쁠 수 있다 — 사람이 봤다는 알리바이만 만든다.
  - layout: thesis
    kick: 같은 근육
    title: 배포 게이트와 다르지 않다
    body: 카나리·수동 승인·피처 플래그·롤백. AI 자동화의 승인 게이트는 이 패턴과 같다. 제안하는 주체가 사람 대신 비결정적 모델일 뿐이다.
  - layout: cover
    kick: 정리
    title: 게이트도 비용이다
    body: 너무 많으면 자동화의 값이 사라진다. 위험이 큰 자리에만 두고 나머지는 비우는 균형 — 그 선은 운영하면서 계속 옮긴다.
---

AI에게 일을 넘기기 시작하면 곧 같은 질문에 부딪힌다. 어디까지 알아서 하게 두고, 어디서 사람이 한 번 보게 할 것인가. [AX란 무엇인가](/guide/what-is-ax)에서 이걸 다섯 계층 중 "승인 구조"로, [실천편](/guide/what-ax-work-looks-like)에서 "게이트를 그린다"는 한 자리로 짚었다. 이 글은 그 자리만 따로 떼어, 게이트를 **어디에 둘지**를 정하는 기준을 정리한다.

<blockquote class="thesis">승인 게이트의 자리는 취향이 아니라 위험으로 정해진다. 되돌릴 수 있으면 먼저 하고 나중에 보고, 되돌리기 어려우면 하기 전에 멈춘다.</blockquote>

## 게이트는 위험으로 정해진다

게이트를 어디 둘지 고민될 때 나는 두 축으로 따진다. 하나는 **되돌리기**가 쉬운가 어려운가, 다른 하나는 틀렸을 때 **파급 범위**가 좁은가 넓은가. 이 둘을 교차하면 어떤 동작에 어떤 게이트가 맞는지가 대략 떨어진다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 520 300" role="img" aria-label="되돌리기 난이도와 파급 범위로 나눈 2x2 게이트 결정 매트릭스">
      <rect x="70" y="20" width="215" height="115" rx="8" style="fill:#f7faff;stroke:#cfe0ff;stroke-width:1.5"/>
      <text class="ntext" x="177" y="72" text-anchor="middle">자동 적용</text>
      <text class="nsub" x="177" y="90" text-anchor="middle">로그만 남긴다</text>
      <rect x="287" y="20" width="213" height="115" rx="8" style="fill:#eaf0ff;stroke:#cfe0ff;stroke-width:1.5"/>
      <text class="ntext" x="393" y="72" text-anchor="middle">자동 적용 + 사후 검토</text>
      <text class="nsub" x="393" y="90" text-anchor="middle">롤백을 준비해 둔다</text>
      <rect x="70" y="137" width="215" height="115" rx="8" style="fill:#e3ebff;stroke:#bcd2ff;stroke-width:1.5"/>
      <text class="ntext" x="177" y="189" text-anchor="middle">제안 → 사람 승인</text>
      <text class="nsub" x="177" y="207" text-anchor="middle">적용 전에 멈춘다</text>
      <rect x="287" y="137" width="213" height="115" rx="8" style="fill:#dbe6ff;stroke:#9bbcff;stroke-width:1.5"/>
      <text class="nlabel" x="393" y="189" text-anchor="middle">승인 + 단계 차단</text>
      <text class="nsub" x="393" y="207" text-anchor="middle">게이트를 가장 앞에</text>
      <text class="ctr" x="285" y="278" text-anchor="middle">← 파급 범위 좁음 · 넓음 →</text>
      <text class="ctr" x="20" y="80" text-anchor="middle" transform="rotate(-90 20 80)">되돌리기 쉬움 →</text>
      <text class="ctr" x="20" y="195" text-anchor="middle" transform="rotate(-90 20 195)">← 어려움</text>
    </svg>
  </div>
  <figcaption>그림 1 · 되돌리기 난이도 × 파급 범위로 게이트를 정한다 (결정 매트릭스)</figcaption>
</figure>

규칙은 단순하다. 아래로 내려갈수록(되돌리기 어려움) 사람의 개입을 더 앞에 두고, 오른쪽으로 갈수록(파급 넓음) 차단을 더 강하게 건다. 가장 위험한 칸 — 되돌리기 어렵고 파급도 넓은 동작 — 은 애초에 자동화 후보로 적절한지부터 다시 본다.

## 세 가지 게이트

매트릭스를 동작으로 옮기면 결국 세 형태로 정리된다.

<ol class="seq">
  <li><b>제안 → 사람 승인.</b> AI는 무엇을 할지 제안만 하고, 사람이 승인해야 적용된다. 되돌리기 어려운 일의 기본값. 느리지만 안전하다.</li>
  <li><b>자동 적용 + 사후 검토.</b> 일단 적용하고 기록을 남겨 나중에 검토·롤백한다. 되돌리기 쉬운 일에서 속도를 얻는 방법. 롤백 경로가 없으면 쓰면 안 된다.</li>
  <li><b>단계적 게이트.</b> 위험이 낮은 건 자동으로 흘리고, 임계치를 넘는 것만 사람에게 올린다. 양을 감당하면서 위험만 거르는 절충 — 대신 "무엇이 임계치인가"를 잘 정해야 한다.</li>
</ol>

대부분의 실제 시스템은 이 셋을 섞는다. 같은 자동화 안에서도 작은 변경은 자동으로, 큰 변경은 승인으로 가르는 식이다. 게이트는 하나만 있는 게 아니라 동작마다 다를 수 있다.

## 게이트가 도장으로 변할 때

가장 흔한 실패는 게이트가 없는 게 아니라, **있는데 작동하지 않는** 것이다. 사람이 하루에 수백 건을 내용도 안 보고 승인하기 시작하면, 그 게이트는 통제가 아니라 통제의 착시다. 오히려 "사람이 봤다"는 알리바이만 만들어 주니, 없는 것보다 나쁠 수 있다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">도장이 된 게이트</div>
      <ul><li>승인 화면에 맥락이 없다</li><li>기본값이 "승인"이다</li><li>양이 많아 다 못 본다</li></ul>
    </div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">작동하는 게이트</div>
      <ul><li>판단에 필요한 맥락을 같이 준다</li><li>반려·보류가 쉽다</li><li>저위험은 자동으로 빼 양을 줄인다</li></ul>
    </div>
  </div>
  <figcaption>그림 2 · 형식적 승인과 작동하는 승인의 차이 (비교)</figcaption>
</figure>

작동하는 게이트는 세 가지를 갖춘다. 승인하는 사람이 판단할 수 있을 만큼의 맥락을 화면에 같이 주고, "아니오"를 누르는 게 "예"만큼 쉽고, 저위험 동작은 자동으로 빼서 사람이 봐야 할 양 자체를 줄인다. 게이트의 품질은 위치보다 이 세 가지에서 갈린다.

## 배포 게이트와 같은 근육

이건 새로운 개념이 아니다. 백엔드에서 배포를 다룰 때 쓰던 것과 같은 근육이다. 위험한 변경 앞에 수동 승인 단계를 두고, 카나리로 일부에만 먼저 적용해 보고, 피처 플래그로 켜고 끌 수 있게 하고, 문제가 생기면 롤백한다. AI 자동화의 승인 게이트도 정확히 이 패턴이고, 다만 변경을 제안하는 주체가 사람이 아니라 비결정적인 모델일 뿐이다. 그래서 "자동 적용 + 사후 검토"가 안전하려면 그 앞에 멱등성과 롤백이 받쳐 줘야 한다는 조건도 그대로 따라온다. 무엇을 누가 언제 승인했는지 남기는 audit trail은 이 게이트와 짝을 이루는 다음 글로 따로 다룰 생각이다.

## 정리하면, 게이트도 비용이다

게이트는 공짜가 아니다. 하나 둘 때마다 자동화가 아끼려던 시간을 다시 사람에게 돌려준다. 그래서 모든 곳에 게이트를 거는 건 자동화를 안 하는 것과 비슷해지고, 아무 데도 안 거는 건 되돌릴 수 없는 사고를 기다리는 일이 된다. 결국 위험이 큰 자리에만 게이트를 두고 나머지는 비우는 균형의 문제인데, 그 선을 어디에 그을지는 한 번에 정해지지 않는다. 운영하면서 무엇이 새고 무엇이 과했는지를 보고 계속 옮기는 수밖에 없다고 지금은 보고 있다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 위험 2축 매트릭스·세 게이트·도장 안티패턴 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>audit trail 설계 글과 연결 · 단계적 게이트 임계치 설정의 익명화 사례 보강</span></li>
  </ul>
</section>
