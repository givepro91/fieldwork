---
title: AI 자동화의 audit trail 설계
track: ax
type: playbook
stage: 탐색 중
updated: "2026-06-23"
order: 8
lead: 자동화가 무슨 판단을 왜 했는지 나중에 되짚을 수 없다면, 그 자동화는 사고가 났을 때 손쓸 데가 없다. 추적은 사고 후가 아니라 설계 때 정한다.
related:
  - label: AI에 승인 게이트가 필요한 이유
    href: "/guide/approval-gates"
  - label: Human-in-the-loop 패턴
    href: "/guide/human-in-the-loop"
slides:
  - layout: cover
    kick: AX Field Guide · 패턴·플레이북
    title: AI 자동화의 audit trail 설계
    body: 무슨 입력에 무슨 판단을 왜 했는지 되짚을 수 있게
  - layout: thesis
    kick: 테제
    title: 추적은 사후가 아니라 설계다
    body: 사고가 난 뒤 로그를 뒤지는 일이 아니라, 처음부터 "무슨 입력에 무슨 판단을 왜 했고 누가 통과시켰는지"를 되짚을 수 있게 남겨 두는 설계다.
  - layout: flow
    kick: 최소 구성
    title: 한 판단 = 네 칸이 하나로 이어진 레코드
    steps:
      - label: 입력
        note: 무엇을 봤나 — 판단의 출발점
      - label: "판단 + 근거"
        note: 무엇을·왜 냈나 — 비결정 시스템에서 가장 빠지기 쉬운 칸
      - label: 승인
        note: 누가 통과시켰나 — 책임 소재
      - label: 결과
        note: 적용됐나·롤백됐나
    note: 네 칸이 흩어져 있으면 사고 현장에서 다시 잇느라 시간을 다 쓴다.
  - layout: stack
    kick: 쓸모
    title: audit trail이 답해야 하는 세 질문
    layers:
      - label: 무슨 일이 있었나
        note: 어떤 입력에서 어떤 출력이 나왔는지 시간순 재구성 — 디버깅의 출발점
      - label: 누구 책임인가
        note: 자동 적용인지 사람 승인인지, 승인했다면 누가 무엇을 보고 했는지
      - label: 어떻게 되돌리나
        note: 변경 전 상태를 안 남기면 롤백할 방법이 없다
    note: 이 세 질문에 답이 안 나오는 기록은 양이 많아도 그냥 로그 더미다.
  - layout: compare
    kick: 함정
    title: 남기는 것과 찾는 것은 다르다
    columns:
      - head: 쌓기만 한 기록
        sub: 실제로는 없는 것과 같다
        points:
          - 로그가 흩어져 연결이 안 된다
          - 식별자 없이 검색이 안 된다
          - 사고 현장에서 그 기록을 쓸 수 없다
      - head: 찾을 수 있는 기록
        sub: 실질적인 audit trail
        accent: true
        points:
          - 식별자로 입력·판단·승인·결과를 묶는다
          - 한 사건을 한자리에 모아 볼 수 있다
          - 검색이 된다
  - layout: thesis
    kick: 비결정 시스템
    title: 매번 다른 답을 내는 부품일수록 더
    body: 결정론적 코드는 코드만 봐도 재현되지만, 모델은 같은 입력에도 다른 답이 나올 수 있다. "그때 왜 그랬나"를 남기지 않으면 사후에 복원할 길이 없다.
  - layout: cover
    kick: 정리
    title: 네 칸을 하나로 묶고, 세 질문에 답하게 하고, 찾을 수 있게 둔다
    body: 추적은 사고 후가 아니라 설계 때 정한다.
---

[승인 게이트](/guide/approval-gates)와 [Human-in-the-loop](/guide/human-in-the-loop)이 "틀리기 전에 막는" 장치라면, audit trail은 "틀린 뒤에 되짚는" 장치다. 둘은 짝이다. 아무리 게이트를 잘 둬도 비결정적인 시스템은 언젠가 예상 못 한 출력을 내고, 그때 무슨 일이 있었는지 되짚을 수 없으면 손쓸 데가 없다. 그리고 이 되짚기는 사고가 난 뒤에 만들 수 없다 — 무엇을 남길지는 설계할 때 정해진다.

<blockquote class="thesis">audit trail은 사고가 난 뒤 로그를 뒤지는 일이 아니라, 처음부터 "무슨 입력에 무슨 판단을 왜 했고 누가 통과시켰는지"를 되짚을 수 있게 남겨 두는 설계다.</blockquote>

## 최소한 무엇을 남기나

전부를 남길 수는 없다. 비용도 들고 노이즈만 쌓인다. 그래서 한 번의 자동 판단을 나중에 재구성할 수 있는 최소 구성을 정한다. 네 가지가 한 줄로 이어져야 한다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 620 150" role="img" aria-label="입력, 판단과 근거, 승인, 결과가 하나의 추적 레코드로 이어지는 그림">
      <defs>
        <marker id="ah-au" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="8" y="50" width="128" height="54" rx="9"/>
      <text class="ntext" x="72" y="74" text-anchor="middle">입력</text>
      <text class="nsub" x="72" y="90" text-anchor="middle">무엇을 봤나</text>
      <line class="edge" marker-end="url(#ah-au)" x1="136" y1="77" x2="162" y2="77"/>
      <rect class="node" x="164" y="50" width="140" height="54" rx="9"/>
      <text class="ntext" x="234" y="74" text-anchor="middle">판단 + 근거</text>
      <text class="nsub" x="234" y="90" text-anchor="middle">무엇을·왜 냈나</text>
      <line class="edge" marker-end="url(#ah-au)" x1="304" y1="77" x2="330" y2="77"/>
      <rect class="node-soft" x="332" y="50" width="128" height="54" rx="9"/>
      <text class="ntext" x="396" y="74" text-anchor="middle">승인</text>
      <text class="nsub" x="396" y="90" text-anchor="middle">누가 통과시켰나</text>
      <line class="edge" marker-end="url(#ah-au)" x1="460" y1="77" x2="486" y2="77"/>
      <rect class="node-soft" x="488" y="50" width="124" height="54" rx="9"/>
      <text class="ntext" x="550" y="74" text-anchor="middle">결과</text>
      <text class="nsub" x="550" y="90" text-anchor="middle">적용·롤백</text>
      <text class="ctr" x="310" y="130" text-anchor="middle">한 판단 = 이 네 칸이 하나로 이어진 레코드</text>
    </svg>
  </div>
  <figcaption>그림 1 · 한 번의 자동 판단을 재구성하는 최소 레코드 (구조)</figcaption>
</figure>

핵심은 네 칸이 **하나로 묶여** 있어야 한다는 점이다. 입력 로그 따로, 출력 로그 따로, 승인 기록 따로 흩어져 있으면, 사고 났을 때 그걸 다시 잇느라 시간을 다 쓴다. "이 출력은 이 입력을 보고 이 근거로 냈고 이 사람이 통과시켰으며 결국 적용/롤백됐다"가 한 줄로 따라와야 한다. 특히 **판단의 근거**는 비결정적 시스템에서 빠지기 쉬운데, 같은 입력에도 다른 답이 나올 수 있으니 "왜 이 답이었나"가 없으면 재현조차 안 된다.

## 세 가지 질문에 답하려고 남긴다

audit trail이 답해야 하는 건 결국 세 질문이다. 이걸 기준으로 무엇을 남길지가 정해진다.

<ol class="seq">
  <li><b>무슨 일이 있었나.</b> 사고가 났을 때 어떤 입력에서 어떤 출력이 나왔는지 시간순으로 재구성할 수 있는가. 디버깅의 출발점.</li>
  <li><b>누구 책임인가.</b> 자동으로 적용된 건지, 사람이 승인한 건지, 승인했다면 누가 무엇을 보고 했는지. 책임 소재가 흐리면 같은 사고가 반복된다.</li>
  <li><b>어떻게 되돌리나.</b> 무엇이 어떻게 바뀌었는지 기록돼 있어야 롤백할 수 있다. 변경 전 상태를 안 남기면 되돌릴 방법이 없다.</li>
</ol>

이 세 질문에 답이 안 나오는 기록은 양이 많아도 audit trail이 아니라 그냥 로그 더미다.

## 남기는 것과 찾는 것은 다르다

흔한 함정은 "다 남겼으니 됐다"고 생각하는 것이다. 그런데 기록은 남기는 것과 **찾을 수 있는 것**이 다르다. 테라바이트로 쌓여 있어도 특정 사건을 검색해 관련 레코드를 연결해 볼 수 없으면, 사고 한복판에서 그 기록은 없는 것과 같다. 그래서 추적은 쌓는 설계만큼 읽는 설계가 중요하다 — 식별자로 묶고, 검색이 되고, 한 사건의 입력·판단·승인·결과를 한자리에 모아 볼 수 있어야 한다.

여기서 공개 가능한 범위를 넘는 구체적인 스키마나 보관 기간 같은 운영 디테일은 시스템마다 다르고, 이 글의 목적도 아니다. 패턴만 남긴다 — 네 칸을 하나로 묶고, 세 질문에 답하게 하고, 찾을 수 있게 둔다.

## 비결정 시스템일수록 더

audit trail은 새로운 개념이 아니다. 금융이든 인프라든 중요한 시스템은 늘 추적을 남겨 왔다. 다만 AI 자동화에서는 그 중요도가 한 단계 올라간다. 결정론적 코드는 같은 입력에 같은 출력이라 코드만 봐도 재현되지만, [모델은 매번 다른 답을 낼 수 있어서](/guide/driving-agents) "그때 왜 그랬나"를 기록으로 남겨두지 않으면 사후에 복원할 길이 없다. 매번 다른 답을 내는 부품일수록, 무엇을 보고 무엇을 왜 했는지가 더 중요해진다.

아직 정리 중인 건 근거(왜 이 출력인지)를 어느 수준까지 남기느냐다. 너무 적으면 재현이 안 되고, 전부 남기면 비용과 노이즈가 감당이 안 된다. 그 적정선은 사고를 몇 번 되짚어 보고 나서야 잡힐 것 같아 지금은 열어둔다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 최소 레코드 4칸·세 질문·찾을 수 있는 설계 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>판단 근거를 남기는 적정 수준을 익명화 사례로 보강</span></li>
  </ul>
</section>
