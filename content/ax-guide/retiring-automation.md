---
title: 운영 자동화는 언제 폐기해야 하나
track: ax
type: decision
stage: 탐색 중
updated: "2026-06-23"
order: 9
lead: 만드는 결정보다 접는 결정이 어렵다. 돌아가는 자동화를 끄기는 두렵고, 그래서 신뢰가 떨어진 채 방치되며 빚이 된다.
related:
  - label: AI 출력을 어디까지 믿을 것인가
    href: "/guide/trusting-output"
  - label: AX를 맡으면 실제로 무엇을 하나
    href: "/guide/what-ax-work-looks-like"
slides:
  - layout: cover
    kick: AX Field Guide
    title: 운영 자동화는 언제 폐기해야 하나
    body: 만드는 결정보다 접는 결정이 어렵다
  - layout: thesis
    kick: 테제
    title: 접는 것도 설계의 일부다
    body: "자동화는 영원하지 않다. 언제 끌지를 만들 때 같이 정해두지 않으면, 신뢰를 잃은 자동화가 켜진 채로 방치되며 부채가 된다."
  - layout: compare
    kick: 세 신호
    title: 폐기를 알리는 세 가지 신호
    columns:
      - head: 드리프트
        sub: 품질이 조용히 샌다
        points:
          - 입력 분포가 변했다
          - 예전 기준이 안 맞는다
          - 샘플 검증 없이는 티가 안 난다
      - head: 비용 역전
        sub: 예외 처리가 본업이 됐다
        points:
          - 유지·감시 비용이 늘었다
          - 아끼는 시간보다 수고가 크다
          - 이미 역전됐을 수 있다
      - head: 신뢰 하락
        sub: 있으나 마나가 됐다
        accent: true
        points:
          - 사람들이 결과를 다시 확인한다
          - "\"믿을 수 없다\"가 퍼진다"
          - 일을 줄이는 게 아니라 한 단계 더 늘린다
    note: 신뢰 하락은 가장 늦게 보이지만 가장 결정적이다
  - layout: flow
    kick: 수명
    title: 자동화에도 수명 곡선이 있다
    steps:
      - label: 도입
        note: 초기 설정, 자리 잡기
      - label: 안정
        note: 순가치가 올라가는 구간
      - label: 드리프트
        note: 환경이 바뀌며 품질이 조용히 나빠진다
      - label: 값 < 비용 교차점
        note: 유지 비용이 아끼는 값을 넘어선다
      - label: 폐기 또는 재설계
        note: 끌어올리는 비용이 새로 만드는 것보다 크면 접는다
    note: 안정 구간이 영원할 거라 가정하지 않는 것이 시작이다
  - layout: stack
    kick: 미리 정하기
    title: 만들 때 폐기 기준을 같이 적어둔다
    layers:
      - label: "샘플 정확도가 이 밑으로 떨어지면"
        note: 드리프트 감지 기준
      - label: "예외 처리에 주당 N시간 넘게 들면"
        note: 비용 역전 기준
      - label: "사람들이 결과를 다시 확인하기 시작하면"
        note: 신뢰 하락 기준
    note: 나중에 끌 때 그건 누군가의 실패 인정이 아니라 처음 약속한 기준의 발동이 된다
  - layout: cover
    kick: 안티패턴
    title: 접는 것도 설계다
    body: 폐기 기준을 미리 적어두면, 끌 때 용기가 덜 든다
---

AX를 이야기할 때 대부분 무엇을 만들지를 말한다. 그런데 [실천편](/guide/what-ax-work-looks-like)의 마지막 자리에 적었듯, 실제로 더 어려운 건 언제 접느냐다. 한번 돌아가기 시작한 자동화는 끄기가 두렵다. 끄면 그 일이 다시 사람에게 돌아오고, 그동안 그게 잘 돌고 있었는지 아닌지가 드러나기 때문이다. 그래서 신뢰를 잃은 자동화가 조용히 방치되며 빚으로 쌓인다.

<blockquote class="thesis">자동화는 영원하지 않다. 언제 끌지를 만들 때 같이 정해두지 않으면, 신뢰를 잃은 자동화가 켜진 채로 방치되며 부채가 된다. 접는 것도 설계의 일부다.</blockquote>

## 접어야 할 세 신호

자동화를 끌 때가 됐다는 신호는 대개 셋 중 하나다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">드리프트</div>
      <ul><li>입력 분포가 변했다</li><li>예전 기준이 안 맞는다</li><li>품질이 조용히 샌다</li></ul>
    </div>
    <div class="cmp-card">
      <div class="cmp-h">비용 역전</div>
      <ul><li>유지·감시 비용이 늘었다</li><li>아끼는 시간보다 크다</li><li>예외 처리가 본업이 됐다</li></ul>
    </div>
    <div class="cmp-card">
      <div class="cmp-h">신뢰 하락</div>
      <ul><li>사람들이 결과를 다시 확인한다</li><li>"믿을 수 없다"가 퍼진다</li><li>있으나 마나가 됐다</li></ul>
    </div>
  </div>
  <figcaption>그림 1 · 폐기를 알리는 세 신호 (비교)</figcaption>
</figure>

**드리프트**는 [신뢰도 글](/guide/trusting-output)에서 말한 그것이다. 입력의 성격이 바뀌면서 처음엔 잘 맞던 판단이 조용히 나빠진다. 무서운 건 티가 안 난다는 점이라, 샘플 검증으로 계속 재지 않으면 한참 새고 나서야 안다. **비용 역전**은 유지와 감시에 드는 수고가 자동화가 아끼는 시간을 넘어선 상태다. 예외를 손으로 처리하는 게 본업이 됐다면 이미 역전됐다. **신뢰 하락**은 가장 늦게 보이지만 가장 결정적이다. 사람들이 자동화 결과를 어차피 다시 확인하기 시작하면, 그 자동화는 일을 줄여주는 게 아니라 한 단계 더 늘리고 있는 것이다.

## 자동화에도 수명 곡선이 있다

세 신호를 하나로 묶으면 자동화에도 수명이 있다는 그림이 된다. 도입해서 자리 잡고, 한동안 안정적으로 값을 내다가, 환경이 바뀌며 드리프트가 시작되고, 어느 지점에서 값보다 비용이 커진다. 문제는 안정 구간이 영원할 거라 가정하고 폐기를 아무도 생각하지 않는 데 있다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 520 220" role="img" aria-label="자동화가 도입, 안정, 드리프트, 폐기 지점을 거치며 순가치가 오르내리는 수명 곡선">
      <line class="edge" x1="40" y1="180" x2="500" y2="180"/>
      <line class="edge" x1="40" y1="180" x2="40" y2="24"/>
      <text class="nsub" x="20" y="100" text-anchor="middle" transform="rotate(-90 20 100)">순가치</text>
      <text class="nsub" x="270" y="205" text-anchor="middle">시간 →</text>
      <path class="edge" style="stroke-width:2.5" d="M50 168 C110 80 150 70 210 68 C300 66 320 70 360 110 C400 150 440 168 490 174"/>
      <line class="edge edge-d" x1="380" y1="40" x2="380" y2="180"/>
      <circle cx="380" cy="122" r="5" style="fill:#fff;stroke:#2563eb;stroke-width:2"/>
      <text class="ntext" x="120" y="150" text-anchor="middle">도입</text>
      <text class="ntext" x="210" y="54" text-anchor="middle">안정</text>
      <text class="ntext" x="320" y="60" text-anchor="middle">드리프트</text>
      <text class="ntext" x="430" y="120" text-anchor="middle">폐기 구간</text>
      <text class="nsub" x="380" y="36" text-anchor="middle">값 &lt; 비용 교차점</text>
    </svg>
  </div>
  <figcaption>그림 2 · 자동화의 수명 곡선 — 값이 비용 아래로 내려가는 지점에서 접는다 (곡선)</figcaption>
</figure>

곡선이 가로축 아래로 내려가는 지점, 즉 순가치가 마이너스가 되는 교차점이 폐기를 진지하게 검토할 자리다. 그 전에 손보거나 다시 학습시켜 곡선을 끌어올릴 수 있으면 그렇게 하고, 끌어올리는 비용이 새로 만드는 것보다 크면 접는다.

## 끄기가 두려운 이유, 그리고 미리 정하기

폐기가 어려운 건 기술 문제가 아니라 심리·정치 문제에 가깝다. 돌아가던 걸 끄면 당장 그 일이 사람에게 돌아와 일이 늘고, "이게 사실 별 값이 없었다"는 게 드러나며, 만든 사람의 판단이 도마에 오른다. 그래서 다들 미룬다.

이걸 덜 어렵게 만드는 한 가지 방법은, 만들 때 폐기 기준을 같이 적어 두는 것이다. "샘플 정확도가 이 밑으로 떨어지면", "예외 처리에 주당 몇 시간 넘게 들면", "사람들이 결과를 다시 확인하기 시작하면" 같은 조건을 미리 써두면, 나중에 끌 때 그건 누군가의 실패 인정이 아니라 처음 약속한 기준의 발동이 된다. [audit trail](/guide/audit-trail)에 쌓인 기록이 이 판단의 근거가 된다.

이 글은 안티패턴 축의 첫 글로 둔다. 만들었다가 접은 실제 기록 — 무엇을 보고 껐고, 너무 늦었거나 너무 일렀던 판단 — 은 익명화해서 따로 쌓을 생각이다. 지금은 "접는 것도 설계이고, 기준을 미리 적어둔다"까지를 기준으로 남긴다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 폐기 세 신호·수명 곡선·기준 사전 합의 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>실제 폐기 판단(너무 늦음/이름)을 익명화 사례로 보강</span></li>
  </ul>
</section>
