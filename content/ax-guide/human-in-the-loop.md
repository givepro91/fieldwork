---
title: Human-in-the-loop — 사람이 "아니오"를 말할 자리
track: ax
type: playbook
stage: 탐색 중
updated: "2026-06-23"
order: 7
lead: 사람을 어디에 끼울지보다, 그 사람이 진짜로 "아니오"를 말할 수 있는지가 중요하다. 개입이 형식이 되면 없는 것만 못하다.
related:
  - label: AI에 승인 게이트가 필요한 이유
    href: "/guide/approval-gates"
  - label: AI 출력을 어디까지 믿을 것인가
    href: "/guide/trusting-output"
slides:
  - layout: cover
    kick: AX Field Guide · 패턴·플레이북
    title: "Human-in-the-loop — 사람이 \"아니오\"를 말할 자리"
    body: 사람을 끼우는 것과 그 사람이 실제로 거부할 수 있는 것은 다른 문제다
  - layout: thesis
    kick: 테제
    title: 자리보다 권한이다
    body: 사람을 루프에 끼우는 것만으로는 통제가 생기지 않는다. 그 자리에서 거부가 실제로 가능하고, 거부가 흐름을 멈출 때에만 개입은 통제가 된다.
  - layout: flow
    kick: 세 자리
    title: 흐름의 어디에 사람을 두나
    steps:
      - label: 사전 승인
        note: 적용 전에 멈춘다. 되돌리기 어려운 일의 기본값. 가장 안전하고 가장 느리다.
      - label: 사후 검토
        note: 일단 적용 후 샘플을 보거나 문제가 드러나면 롤백한다. 회복이 쉬운 일에서 속도를 얻는다.
      - label: 예외 에스컬레이션
        note: 평소엔 자동으로 흘리다 이상 신호가 잡힌 건만 사람에게 올린다. 양을 감당하면서 위험만 거른다.
    note: 대부분은 셋을 섞는다 — 저위험은 에스컬레이션, 고위험만 사전 승인, 전체를 사후 샘플로 다시 본다.
  - layout: compare
    kick: 실패 vs 설계
    title: 형식이 된 개입 vs 살아있는 개입
    columns:
      - head: 형식이 된 개입
        sub: 사람이 있어도 통제가 없다
        points:
          - 판단할 맥락이 화면에 없다
          - 거부보다 승인이 쉽다
          - 양이 많아 다 못 본다
      - head: 살아있는 개입
        sub: 거부가 실제로 가능하다
        accent: true
        points:
          - "왜 이 제안인지 근거를 같이 본다"
          - "아니오·보류가 한 번에 된다"
          - 저위험은 빼 양을 줄인다
    note: 개입이 형식이 되면 "사람이 봤다"는 알리바이만 남는다.
  - layout: thesis
    kick: 균형
    title: 사람은 아껴 쓰는 자원이다
    body: 모든 자리에 사람을 두면 자동화가 주려던 값이 사라진다. 사람의 "아니오"는 가장 위험한 자리에 아껴 둔다 — 나머지는 기계가 거르게 둔다.
  - layout: cover
    kick: 정리
    title: 끼운 사람이 진짜로 멈출 수 있는가
    body: 에스컬레이션 임계치를 어디에 그을지는 운영하면서 새는 곳을 보고 계속 조정한다.
---

[승인 게이트](/guide/approval-gates) 글에서 게이트를 어디 둘지를 위험으로 정했다면, 이 글은 그 게이트에 앉는 사람에 관한 것이다. "사람이 개입한다"는 말은 쉽지만, 실제로 그 사람이 흐름을 멈출 수 있게 만드는 건 다른 문제다. Human-in-the-loop의 핵심은 사람을 어디에 끼우느냐가 아니라, 끼운 그 사람이 진짜로 "아니오"를 말할 수 있느냐에 있다.

<blockquote class="thesis">사람을 루프에 끼우는 것만으로는 통제가 생기지 않는다. 그 자리에서 거부가 실제로 가능하고, 거부가 흐름을 멈출 때에만 개입은 통제가 된다.</blockquote>

## 사람이 들어가는 세 자리

개입은 흐름의 어디에 놓이느냐로 세 가지로 나뉜다. 위험과 양에 따라 고른다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 620 200" role="img" aria-label="입력에서 출력까지 흐름에 사전 승인, 사후 검토, 예외 에스컬레이션 세 개입점이 놓인 그림">
      <defs>
        <marker id="ah-hl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="10" y="80" width="78" height="42" rx="8"/>
      <text class="ntext" x="49" y="105" text-anchor="middle">입력</text>
      <line class="edge" marker-end="url(#ah-hl)" x1="88" y1="101" x2="118" y2="101"/>
      <rect class="node" x="120" y="80" width="90" height="42" rx="8"/>
      <text class="ntext" x="165" y="105" text-anchor="middle">AI 처리</text>
      <line class="edge" marker-end="url(#ah-hl)" x1="210" y1="101" x2="240" y2="101"/>
      <path class="node-soft" d="M300 78 L348 101 L300 124 L252 101 z"/>
      <text class="nsub" x="300" y="98" text-anchor="middle">① 사전</text>
      <text class="nsub" x="300" y="111" text-anchor="middle">승인</text>
      <line class="edge" marker-end="url(#ah-hl)" x1="348" y1="101" x2="378" y2="101"/>
      <rect class="node" x="380" y="80" width="78" height="42" rx="8"/>
      <text class="ntext" x="419" y="105" text-anchor="middle">적용</text>
      <line class="edge" marker-end="url(#ah-hl)" x1="458" y1="101" x2="488" y2="101"/>
      <rect class="node-soft" x="490" y="80" width="120" height="42" rx="8"/>
      <text class="nsub" x="550" y="98" text-anchor="middle">② 사후 검토</text>
      <text class="nsub" x="550" y="111" text-anchor="middle">샘플·롤백</text>
      <path class="edge edge-d" marker-end="url(#ah-hl)" d="M165 80 Q165 30 300 30 Q430 30 430 76"/>
      <text class="ctr" x="300" y="22" text-anchor="middle">③ 예외 에스컬레이션 — 이상 신호일 때만 사람 호출</text>
    </svg>
  </div>
  <figcaption>그림 1 · 사람이 들어가는 세 자리 — 사전·사후·예외 (개입점)</figcaption>
</figure>

**사전 승인**은 적용 전에 멈춰 사람의 확인을 기다린다. 되돌리기 어려운 일의 기본값이다. 가장 안전하지만 흐름을 느리게 하고, 양이 많으면 곧 병목이 된다. **사후 검토**는 일단 적용하고 나중에 표본을 보거나 문제가 드러나면 롤백한다. 회복이 쉬운 일에서 속도를 얻는 방법이다. **예외 에스컬레이션**은 평소엔 자동으로 흘리다가, 신뢰도가 낮거나 이상 신호가 잡힌 건만 사람에게 올린다. 양을 감당하면서 위험만 거르는 절충이다.

대부분은 셋을 섞는다. 저위험은 예외 에스컬레이션으로 흘리고, 고위험만 사전 승인으로 막고, 전체를 사후 샘플로 다시 본다.

## 개입이 형식이 될 때

가장 흔한 실패는 [승인 게이트](/guide/approval-gates)에서 말한 "도장이 된 게이트"와 같다. 사람이 자리에는 있는데, 실제로는 내용을 안 보고 통과시킨다. 이렇게 되는 데는 늘 같은 세 가지 이유가 있다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">형식이 된 개입</div>
      <ul><li>판단할 맥락이 화면에 없다</li><li>거부보다 승인이 쉽다</li><li>양이 많아 다 못 본다</li></ul>
    </div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">살아있는 개입</div>
      <ul><li>왜 이 제안인지 근거를 같이 본다</li><li>아니오·보류가 한 번에 된다</li><li>저위험은 빼 양을 줄인다</li></ul>
    </div>
  </div>
  <figcaption>그림 2 · 형식적 개입과 살아있는 개입 (비교)</figcaption>
</figure>

거꾸로 말하면, 살아있는 개입을 만드는 건 이 셋을 뒤집는 일이다. 승인하는 사람이 판단할 수 있도록 제안의 근거와 맥락을 같이 보여주고, "아니오"와 "보류"를 "예"만큼 쉽게 누를 수 있게 하고, [신뢰도가 높은](/guide/trusting-output) 저위험 건은 자동으로 빼서 사람이 봐야 할 양 자체를 줄인다.

## 사람은 아껴 쓰는 자원이다

결국 균형의 문제다. 사람의 판단은 비싸고 느린 자원이라, 모든 자리에 사람을 두면 자동화가 주려던 값이 사라진다. 그렇다고 아무 데도 안 두면 되돌릴 수 없는 사고를 기다리는 셈이다. 그래서 사람의 "아니오"는 가장 위험한 자리에 아껴 둔다. 어디가 그 자리인지는 [승인 게이트](/guide/approval-gates)의 위험 2축으로 정하고, 나머지는 기계가 거르게 둔다.

아직 답이 안 난 건 에스컬레이션의 임계치를 어떻게 잡느냐다. 너무 낮으면 사람이 다시 병목이 되고, 너무 높으면 위험한 것까지 자동으로 흘러간다. 이 선을 어디에 그을지는 운영하면서 새는 곳을 보고 조정하는 수밖에 없다고 지금은 보고 있다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 개입 세 자리·형식화 안티패턴·아껴 쓰기 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>에스컬레이션 임계치 설정을 익명화 사례로 보강</span></li>
  </ul>
</section>
