---
title: AX란 무엇인가
track: ax
type: concept
stage: 탐색 중
updated: "2026-06-22"
order: 1
lead: AX의 어려움은 "AI를 쓴다"에 있지 않다. 무엇을 AI에 넘기고 무엇을 사람이 쥐고 있을지 다시 정하는 데 있다.
related:
  - label: 어떤 루프를 먼저 고를까
    href: "#"
  - label: 승인 게이트
    href: "/guide/approval-gates"
slides:
  - layout: cover
    kick: AX Field Guide
    title: AX란 무엇인가
    body: 백엔드 출신 프로덕트 리드가 현장에서 정리하는 AX 작업 노트
  - layout: thesis
    kick: 테제
    title: 도입이 아니라 재설계다
    body: AX는 사람이 반복적으로 판단하던 업무 구조를 AI·데이터·자동화·승인 흐름으로 다시 설계하는 일.
  - layout: compare
    kick: 구분
    title: "도입 ≠ AX"
    columns:
      - head: AI 도입
        sub: 도구가 하나 늘어난다
        points:
          - 새 도구를 켜고 모델 성능을 본다
          - "“써봤다”에서 멈춘다"
          - 판단의 주체는 그대로 사람
      - head: AX 재설계
        sub: 판단 구조가 바뀐다
        accent: true
        points:
          - 판단이 내려지는 자리가 옮겨간다
          - 데이터·승인·롤백을 다시 짠다
          - 1년 돌아가게 운영까지 본다
    note: 바뀌는 건 도구가 아니라, 결정이 내려지는 자리다.
  - layout: thesis
    kick: 가르는 질문
    title: 누가 더는 직접 판단하지 않게 됐나
    body: 도입하고 나서 이 질문에 답이 없으면 도구가 하나 는 것. 답이 분명하면 거기서 진짜 질문이 시작된다 — 그 판단을 기계에 넘겨도 괜찮으려면 무엇이 참이어야 하는가.
  - layout: flow
    kick: 맡은 사람의 문제
    title: 모델보다 앞단
    steps:
      - label: 무엇을 바꿀지 고르기
        note: 시연 좋은 일이 가치 있는 일은 아니다
      - label: 결과를 믿게 만들기
        note: 검증·승인·감사
      - label: 1년 돌릴 수 있게
        note: 운영·롤백·유지
    note: 모델 성능보다, 그 앞뒤에 사람이 무엇을 쥐고 무엇을 넘기느냐가 먼저다.
  - layout: cover
    kick: 정리 중인 정의
    title: "실패를 전제로, 문제부터 고른다"
    body: 시스템 사고 + 제품 판단을 비결정적 부품 위에 다시 적용하는 일.
---

AX라는 말을 처음 들었을 때는 DX(디지털 전환)의 다음 버전 정도로 짐작했다. 종이를 디지털로 바꾼 게 DX였으니, 디지털을 AI로 바꾸는 게 AX겠거니. 틀린 짐작은 아니지만, 그 비유는 중요한 걸 가린다. AX의 어려움은 "AI를 쓴다"에 있지 않다. **무엇을 AI에 넘기고 무엇을 사람이 쥐고 있을지 다시 정하는 것**에 있다.

<blockquote class="thesis">AX는 AI를 도입하는 일이 아니라, 사람이 반복적으로 판단하던 업무 구조를 AI·데이터·자동화·승인 흐름으로 다시 설계하는 일이다.</blockquote>

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 480 200" role="img" aria-label="AX는 사람의 반복 판단을 AI·데이터·자동화·승인 흐름으로 재설계한다">
      <path class="edge edge-d" d="M188 90 C152 78 122 64 98 56"/>
      <path class="edge edge-d" d="M292 90 C328 78 358 64 382 56"/>
      <path class="edge edge-d" d="M188 110 C152 122 122 136 98 144"/>
      <path class="edge edge-d" d="M292 110 C328 122 358 136 382 144"/>
      <rect class="node-soft" x="36" y="36" rx="11" width="104" height="40"/>
      <text class="ntext" x="88" y="61" text-anchor="middle">AI</text>
      <rect class="node-soft" x="340" y="36" rx="11" width="104" height="40"/>
      <text class="ntext" x="392" y="61" text-anchor="middle">데이터</text>
      <rect class="node-soft" x="36" y="124" rx="11" width="104" height="40"/>
      <text class="ntext" x="88" y="149" text-anchor="middle">자동화</text>
      <rect class="node-soft" x="340" y="124" rx="11" width="104" height="40"/>
      <text class="ntext" x="392" y="149" text-anchor="middle">승인 흐름</text>
      <ellipse class="node" cx="240" cy="100" rx="64" ry="36"/>
      <text class="nlabel" x="240" y="97" text-anchor="middle">AX 재설계</text>
      <text class="nsub" x="240" y="114" text-anchor="middle">사람의 반복 판단을</text>
    </svg>
  </div>
  <figcaption>그림 1 · AX는 반복 판단을 네 가지로 다시 설계한다 (마인드맵)</figcaption>
</figure>

## AI 도입과 AX는 다른 일이다

"AI를 도입했다"는 말은 보통 도구를 하나 들였다는 뜻이다. 팀이 코파일럿을 쓰기 시작했다, 고객 문의에 챗봇을 붙였다, 회의록을 자동으로 요약한다. 다 의미 있는 일이고, 시작점으로 충분하다. 다만 이건 **도구 도입**이지 **구조 변경**은 아니다. 일하는 사람도, 그 일을 책임지는 사람도, 결정이 내려지는 자리도 그대로다. 도구만 하나 늘었다.

AX는 그 한 칸 더 들어간다. 지금까지 사람이 매번 들여다보고 판단하던 자리 — 입력을 보고, 기준을 적용하고, 결과를 내고, 누군가 그 결과를 믿고 다음 일을 하던 자리 — 그 판단의 위치 자체를 옮긴다. 누가 결정하는가, 그 결정을 누가 책임지는가, 틀렸을 때 어떻게 되돌리는가가 바뀐다.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">AI 도입</div>
      <ul><li>도구가 하나 늘어난다</li><li>결정의 주체는 그대로</li><li>끝이 있는 프로젝트</li></ul>
    </div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">AX</div>
      <ul><li>판단의 위치가 바뀐다</li><li>책임·롤백을 다시 설계</li><li>계속 돌리는 운영</li></ul>
    </div>
  </div>
  <figcaption>그림 2 · 도구 도입과 AX는 다른 일이다 (비교)</figcaption>
</figure>

구분이 흐릿할 때 나는 이렇게 물어본다. **이걸 도입하고 나서, 누가 무슨 판단을 더 이상 직접 하지 않게 되었나?** 답이 "없음"이면 도구를 하나 더 쓰는 것에 가깝다. 답이 분명하면 거기서부터 진짜 질문이 시작된다. 그 판단을 기계에 넘겨도 괜찮으려면 무엇이 참이어야 하는가.

## 맡은 사람이 보는 문제

AX Engineer나 AX Lead가 실제로 마주하는 문제는 "어떤 모델이 더 똑똑한가"가 아니다. 대부분은 그 앞단에 있다. 무엇을 바꿀지 고르고(가장 시연하기 좋은 것이 가장 가치 있는 것은 거의 아니다), 그 결과를 사람들이 믿게 만들고, 1년을 돌릴 수 있게 운영하는 일이다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 460 240" role="img" aria-label="관찰·결정·행동을 목표 달성까지 반복하는 판단 루프">
      <defs>
        <marker id="ah-loop" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <path class="edge edge-d" marker-end="url(#ah-loop)" d="M140 138 Q150 80 198 72"/>
      <path class="edge edge-d" marker-end="url(#ah-loop)" d="M302 80 Q346 102 340 148"/>
      <path class="edge edge-d" marker-end="url(#ah-loop)" d="M322 196 Q232 240 150 202"/>
      <circle class="node" cx="108" cy="166" r="46"/>
      <text class="nlabel" x="108" y="163" text-anchor="middle">관찰</text>
      <text class="nsub" x="108" y="180" text-anchor="middle">Observe</text>
      <circle class="node" cx="250" cy="62" r="46"/>
      <text class="nlabel" x="250" y="59" text-anchor="middle">결정</text>
      <text class="nsub" x="250" y="76" text-anchor="middle">Decide</text>
      <circle class="node" cx="360" cy="166" r="46"/>
      <text class="nlabel" x="360" y="163" text-anchor="middle">행동</text>
      <text class="nsub" x="360" y="180" text-anchor="middle">Act</text>
      <text class="ctr" x="238" y="150" text-anchor="middle">목표까지</text>
      <text class="ctr" x="238" y="166" text-anchor="middle">반복</text>
    </svg>
  </div>
  <figcaption>그림 3 · 사람이 반복하던 판단 루프 — AX는 이 루프를 다시 짠다 (사이클)</figcaption>
</figure>

## 중요한 다섯 가지

써보면서 정리된 다섯 가지다. 순서에 의미가 있다 — 아래 계층이 무너지면 위가 무너진다.

<ol class="seq">
  <li><b>문제 정의.</b> 어떤 반복 판단을 다시 설계할지 고르는 일. 빈도가 높고, 경계가 분명하고, 틀려도 회복 가능한 일이 좋은 후보다. 회복이 안 되는 일은 애초에 자동화하면 안 된다.</li>
  <li><b>데이터.</b> 모델은 우리가 줄 수 있는 맥락만큼만 똑똑하다. "AI가 멍청하다"의 상당수는 "사람이라면 봤을 자료를 안 줬다"이다. 접근·최신성·출처.</li>
  <li><b>워크플로우.</b> AI 단계는 기존 업무 흐름 안에서 살아야 한다. 흐름 옆에 챗봇을 따로 세워두는 것으로는 보통 아무것도 안 바뀐다.</li>
  <li><b>승인 구조.</b> 누가 무엇을 언제 승인하는가. 어디까지 자동 적용하고 어디서부터 사람의 확인을 기다리는가. 위험이 클수록 개입 지점을 더 앞에 둔다.</li>
  <li><b>운영 가능성.</b> 관측·감사 추적·비용·드리프트. 1년 뒤에도 믿고 돌릴 수 있는가. 여기가 안 받치면 데모로 끝난다.</li>
</ol>

<figure class="fig">
  <div class="stack">
    <div class="layer l5"><span class="ln">05</span><span class="lt">운영 가능성</span><span class="desc">관측·감사·비용·드리프트</span></div>
    <div class="layer l4"><span class="ln">04</span><span class="lt">승인 구조</span><span class="desc">자동 적용 vs 사람 확인</span></div>
    <div class="layer l3"><span class="ln">03</span><span class="lt">워크플로우</span><span class="desc">기존 업무 동선 위에</span></div>
    <div class="layer l2"><span class="ln">02</span><span class="lt">데이터</span><span class="desc">접근·최신성·출처</span></div>
    <div class="layer l1"><span class="ln">01</span><span class="lt">문제 정의</span><span class="desc">어떤 루프를 고를까</span></div>
  </div>
  <figcaption>그림 4 · AX 5계층 — 문제 정의가 바닥이다 (스택)</figcaption>
</figure>

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 640 170" role="img" aria-label="입력에서 AI 제안, 사람 승인 게이트를 거쳐 적용 또는 반려·롤백">
      <defs>
        <marker id="ah-arch" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node" x="8" y="58" rx="9" width="92" height="48"/>
      <text class="ntext" x="54" y="87" text-anchor="middle">입력</text>
      <line class="edge" marker-end="url(#ah-arch)" x1="100" y1="82" x2="142" y2="82"/>
      <rect class="node" x="144" y="58" rx="9" width="120" height="48"/>
      <text class="ntext" x="204" y="87" text-anchor="middle">AI 제안</text>
      <line class="edge" marker-end="url(#ah-arch)" x1="264" y1="82" x2="300" y2="82"/>
      <path class="node-soft" d="M356 44 L408 82 L356 120 L304 82 z"/>
      <text class="nlabel" x="356" y="79" text-anchor="middle" style="font-size:12px">승인</text>
      <text class="nsub" x="356" y="95" text-anchor="middle">사람</text>
      <path class="edge" marker-end="url(#ah-arch)" d="M390 62 Q442 38 472 38 L502 38"/>
      <rect class="node-soft" x="504" y="16" rx="9" width="120" height="44"/>
      <text class="ntext" x="564" y="43" text-anchor="middle">적용</text>
      <path class="edge" marker-end="url(#ah-arch)" d="M390 102 Q442 124 472 124 L502 124"/>
      <rect class="node" x="504" y="102" rx="9" width="128" height="44"/>
      <text class="ntext" x="568" y="129" text-anchor="middle">반려 · 롤백</text>
    </svg>
  </div>
  <figcaption>그림 5 · 승인 게이트 — 사람이 "아니오"를 말할 자리 (Human-in-the-loop / 아키텍처)</figcaption>
</figure>

## 경험과 만나는 지점

이 다섯 가지는 새로운 사고방식이 아니다. 같은 근육을 쓴다. 백엔드를 하면서 가장 많이 한 생각은 "이게 실패하면 어떻게 되나"였고, AI 자동화는 한 노드가 매번 다른 답을 낼 수 있는 분산 시스템일 뿐이라 같은 질문이 그대로 적용된다. 프로덕트 리드를 하면서 배운 건 구현보다 **무엇을 안 만들지 정하는 일**이 어렵다는 점이다. 그래서 나는 AX를, 시스템 사고와 제품 판단을 AI라는 비결정적 부품 위에서 다시 적용하는 일로 본다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-22</time><span>초안 작성. 정의·5계층·도식 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>도구 사용 후 "데이터·운영" 섹션에 익명화 사례 보강</span></li>
  </ul>
</section>
