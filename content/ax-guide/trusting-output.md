---
title: AI 출력을 어디까지 믿을 것인가
track: ax
type: decision
stage: 탐색 중
updated: "2026-06-23"
order: 4
lead: '"믿어도 되나"는 감으로 답할 질문이 아니다. 정확도 하나가 아니라, 틀렸을 때의 회복 비용과 확인하는 검증 비용을 같이 놓고 따진다.'
related:
  - label: 어떤 루프를 먼저 고를까
    href: "/guide/choosing-loops"
  - label: AI에 승인 게이트가 필요한 이유
    href: "/guide/approval-gates"
slides:
  - layout: cover
    kick: AX Field Guide · 개념·관점
    title: AI 출력을 어디까지 믿을 것인가
    body: '"믿어도 되나"는 감으로 답할 질문이 아니다'
  - layout: thesis
    kick: 테제
    title: 신뢰는 정확도만으로 정해지지 않는다
    body: 얼마나 자주 맞는가, 틀렸을 때 되돌리는 비용은 얼마인가, 맞는지 확인하는 비용은 얼마인가 — 이 셋의 관계로 답한다.
  - layout: stack
    kick: 세 변수
    title: 신뢰를 정하는 세 축
    layers:
      - label: 정확도
        note: 얼마나 자주 맞나 — 신뢰의 출발점이지만 전부가 아니다
      - label: 회복 비용
        note: 틀렸을 때 되돌리는 값 — 클수록 사전에 더 확인해야 한다
      - label: 검증 비용
        note: 맞는지 확인하는 값 — 이게 회복 비용보다 작을 때만 검증이 값을 한다
    note: "99% 정확해도 나머지 1%가 치명적이면 못 믿고, 80%밖에 안 맞아도 즉시 고칠 수 있으면 쓸 만하다."
  - layout: flow
    kick: 검증 강도
    title: 위험에 맞춰 검증의 강도를 고른다
    steps:
      - label: 전수 검증
        note: 모든 출력을 사람이 본다. 회복 비용이 크고 양이 적을 때. 가장 안전하고 가장 비싸다.
      - label: 샘플 검증
        note: 일부만 뽑아 품질을 추정한다. 양이 많고 개별 오류가 감당 가능할 때. 드리프트 조기 감지에도 쓴다.
      - label: 자동 검증
        note: 규칙·스키마·다른 모델로 1차로 거른다. 사람은 걸러진 예외만 본다.
      - label: 무검증 + 사후 롤백
        note: 회복이 쉽고 검증이 비쌀 때만. 롤백 경로가 없으면 금지.
    note: 대개는 섞는다 — 자동 검증으로 거르고, 예외는 전수로, 통과 건은 샘플로 다시 확인.
  - layout: thesis
    kick: 드리프트
    title: 신뢰는 고정값이 아니다
    body: 입력 분포가 바뀌면 정확도도 변한다. 처음 검증했을 때 잘 맞던 모델이 몇 달 뒤 조용히 나빠질 수 있다. 샘플 검증으로 계속 다시 재는 값이다.
  - layout: cover
    kick: 정리
    title: 한 번 믿었다고 계속 믿지 않는다
    body: 검증 비용을 어떻게 정량화하느냐는 아직 답이 덜 났다. 검증 루프를 실제로 돌려보고 채울 자리로 남겨둔다.
---

[어떤 루프를 먼저 고를까](/guide/choosing-loops)에서 후보를 거르고 나면, 그다음 막히는 질문이 이거다. AI가 낸 출력을 그대로 써도 되나. 데이터를 잘 줬고([what-is-ax](/guide/what-is-ax)의 "데이터" 계층) 모델도 괜찮아 보이는데, 그 결과를 믿고 다음 일을 진행해도 되는지는 별개의 판단이다. 그리고 이건 감으로 답하면 안 되는 종류의 질문이다.

<blockquote class="thesis">"믿어도 되나"는 정확도 하나로 답할 수 없다. 얼마나 자주 맞는가, 틀렸을 때 되돌리는 비용은 얼마인가, 맞는지 확인하는 비용은 얼마인가 — 이 셋의 관계로 답한다.</blockquote>

## 세 개의 변수

신뢰를 정확도 한 축으로만 보면 자꾸 틀린 결정을 한다. 99% 정확해도 나머지 1%가 되돌릴 수 없는 사고면 못 믿고, 80%밖에 안 맞아도 틀린 걸 즉시 알아채 쉽게 고칠 수 있으면 충분히 쓸 만하다. 그래서 나는 세 변수를 같이 본다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 440 240" role="img" aria-label="정확도, 회복 비용, 검증 비용 세 변수가 신뢰 판단을 이루는 삼각 관계">
      <defs>
        <marker id="ah-to" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <circle class="node" cx="220" cy="56" r="48"/>
      <text class="nlabel" x="220" y="52" text-anchor="middle">정확도</text>
      <text class="nsub" x="220" y="70" text-anchor="middle">얼마나 맞나</text>
      <circle class="node" cx="96" cy="180" r="48"/>
      <text class="nlabel" x="96" y="176" text-anchor="middle">회복 비용</text>
      <text class="nsub" x="96" y="194" text-anchor="middle">틀리면 드는 값</text>
      <circle class="node" cx="344" cy="180" r="48"/>
      <text class="nlabel" x="344" y="176" text-anchor="middle">검증 비용</text>
      <text class="nsub" x="344" y="194" text-anchor="middle">확인하는 값</text>
      <path class="edge edge-d" d="M186 90 L130 146"/>
      <path class="edge edge-d" d="M254 90 L310 146"/>
      <path class="edge edge-d" d="M144 180 L296 180"/>
      <text class="ctr" x="220" y="172" text-anchor="middle">셋의 균형이</text>
      <text class="ctr" x="220" y="188" text-anchor="middle">신뢰를 정한다</text>
    </svg>
  </div>
  <figcaption>그림 1 · 신뢰는 정확도·회복 비용·검증 비용의 균형이다 (관계도)</figcaption>
</figure>

이 셋을 함께 놓으면 하나의 실용적인 규칙이 나온다. **검증 비용이 회복 비용보다 쌀 때만, 사람이 일일이 확인하는 게 값을 한다.** 확인하는 데 드는 수고가 사고를 수습하는 값보다 크다면, 차라리 자동 적용하고 틀린 것만 사후에 잡는 편이 낫다. 반대로 한 번의 사고가 치명적이면, 검증이 번거로워도 적용 전에 사람이 본다. 이건 [승인 게이트](/guide/approval-gates)에서 "되돌리기 × 파급 범위"로 게이트 위치를 정하던 것과 같은 계산을, 신뢰의 언어로 다시 한 것이다.

## 검증의 강도를 고른다

신뢰가 흑백이 아니듯 검증도 전부냐 아니냐가 아니다. 위험에 맞춰 강도를 고른다.

<ol class="seq">
  <li><b>전수 검증.</b> 모든 출력을 사람이 본다. 회복 비용이 크고 양이 적을 때. 가장 안전하고 가장 비싸다.</li>
  <li><b>샘플 검증.</b> 일부만 뽑아 보고 품질을 추정한다. 양이 많고 개별 오류는 감당 가능할 때. 드리프트를 조기에 잡는 용도로도 쓴다.</li>
  <li><b>자동 검증.</b> 규칙·스키마·다른 모델로 기계가 1차로 거른다. 검증 기준을 코드로 쓸 수 있을 때. 사람은 걸러진 예외만 본다.</li>
  <li><b>무검증 + 사후 롤백.</b> 일단 적용하고 문제가 드러나면 되돌린다. 회복이 쉽고 검증이 비쌀 때만. 롤백 경로가 없으면 금지.</li>
</ol>

대개는 이걸 섞는다. 자동 검증으로 대부분을 거르고, 통과 못 한 것만 사람이 전수로 보고, 통과한 것 중 일부를 샘플로 다시 확인하는 식이다.

## 신뢰는 고정값이 아니다

마지막으로, 한 번 믿었다고 계속 믿으면 안 된다. AI 출력의 정확도는 입력 분포가 바뀌면 같이 변한다. 처음 검증했을 때 잘 맞던 모델이, 몇 달 뒤 들어오는 데이터의 성격이 달라지면서 조용히 나빠질 수 있다([what-is-ax](/guide/what-is-ax)에서 말한 드리프트). 그래서 신뢰는 한 번 정하고 끝나는 값이 아니라, 샘플 검증으로 계속 다시 재는 값이다. "예전에 믿을 만했다"는 지금도 믿어도 된다는 뜻이 아니다.

여기서 결론이 덜 난 부분은 검증 비용을 어떻게 정량화하느냐다. 회복 비용은 그래도 추정해 본 적이 있지만, "사람이 확인하는 비용"은 맥락에 따라 들쭉날쭉해서 아직 깔끔한 기준을 못 세웠다. 이건 실제로 검증 루프를 몇 개 돌려보고 다시 채울 자리로 남겨둔다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 신뢰 3변수·검증 강도 4단계·드리프트 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>검증 비용 정량화 · 샘플 검증 주기 설정의 익명화 사례 보강</span></li>
  </ul>
</section>
