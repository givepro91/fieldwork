---
title: 에이전트를 모는 법 — 프롬프트에서 루프로
track: agents
type: concept
basis: practiced
stage: 탐색 중
updated: "2026-06-23"
order: 1
lead: 좋은 답을 끌어내는 무게중심은 더 이상 프롬프트 문장에 있지 않다. 에이전트가 일하는 환경을 설계하고, 그 환경을 사람 없이 돌게 만드는 데 있다.
related:
  - label: AX란 무엇인가
    href: "/guide/what-is-ax"
  - label: 어떤 루프를 먼저 고를까
    href: "#"
slides:
  - layout: cover
    kick: Fieldwork · 에이전트로 일하기
    title: 에이전트를 모는 법
    body: 프롬프트를 잘 쓰는 일에서, 에이전트가 일하는 환경을 설계하는 일로
  - layout: thesis
    kick: 테제
    title: 프롬프트가 아니라 환경이다
    body: 에이전트를 잘 쓴다는 건 더 나은 프롬프트 문장이 아니라, 모델이 일하는 환경(harness)을 설계하고 그 환경을 사람 없이 돌릴 수 있게(loop) 만드는 일이다.
  - layout: stack
    kick: 사다리
    title: 네 단어는 추상도가 다른 한 사다리다
    layers:
      - label: "Ralph — 구현"
        note: "while :; do cat PROMPT.md | claude-code ; done — 가장 손에 잡히는 한 줄"
      - label: Loop engineering — 자동화
        note: 사람이 매번 돌리던 프롬프트·검증·재실행을 루프로 대체
      - label: Harness engineering — 환경
        note: "Agent = Model + Harness — 도구 실행·상태·검증 게이트·실패 복구 전부"
      - label: Context engineering — 원리
        note: 다음 스텝에 필요한 정확한 정보로 컨텍스트 윈도우를 채우는 기술
    note: 아래가 원리, 위로 갈수록 손에 잡히는 구현. 경쟁하는 유행어가 아니라 같은 사다리의 다른 칸이다.
  - layout: compare
    kick: 사람의 자리
    title: "in the loop → on the loop"
    columns:
      - head: "루프 안에서 (in the loop)"
        sub: 매 단계 내가 개입
        points:
          - 매 단계 내가 프롬프트
          - 다음 지시도 내가
          - 에이전트 수만큼 내가 병목
      - head: "루프 위에서 (on the loop)"
        sub: 환경·게이트를 설계
        accent: true
        points:
          - 환경·검증·종료조건을 설계
          - 루프가 돌고 나는 교정
          - 사람은 게이트로 남는다
    note: 자동화가 값을 하려면 자동화 바깥이 더 단단해야 한다.
  - layout: flow
    kick: Ralph
    title: 가장 단순한 루프의 작동 방식
    steps:
      - label: "PROMPT.md 읽기"
        note: 기억은 파일시스템·코드베이스·git이 쥔다
      - label: "claude-code 실행"
        note: 매 iteration마다 새 컨텍스트 — 대화 히스토리 없음
      - label: 결과 확인
        note: 검증 통과 여부 판단
      - label: 반복
        note: "while :; — 종료 조건은 밖에서 단단히"
    note: 작명은 농담(Ralph Wiggum), 기법은 진지하다. 흔히 RALF로 잘못 적히지만 원전 표기는 Ralph다.
  - layout: cover
    kick: 배운 점
    title: "사다리의 어느 칸이 지금 이 일에 맞는지 고르는 판단"
    body: 회복 가능하고 검증 가능한 반복에만 루프가 값을 한다. 도구를 늘리는 게 아니라 일의 성격을 읽는 쪽이 먼저다.
---

처음 한동안은 프롬프트를 잘 쓰는 게 전부인 줄 알았다. 같은 모델이라도 질문을 어떻게 던지느냐로 결과가 갈렸으니 아주 틀린 생각은 아니었다. 그런데 코딩 에이전트를 며칠씩 붙여 일을 시키다 보면, 좋은 답을 만드는 무게중심이 프롬프트 문장에서 다른 데로 옮겨가 있다는 걸 느낀다. 모델에게 무엇을 보여줄지, 모델이 어떤 환경에서 도구를 쓰고 어디서 멈춰 검증받는지, 그리고 그 과정을 내가 매번 손으로 돌릴지 자동으로 돌게 둘지 — 결과는 거기서 갈렸다.

<blockquote class="thesis">에이전트를 잘 쓴다는 건 더 나은 프롬프트를 쓰는 일이 아니라, 에이전트가 일하는 환경(harness)을 설계하고 그 환경을 사람 없이 돌릴 수 있게(loop) 만드는 일이다.</blockquote>

## 네 단어는 한 사다리다

요즘 이 분야에서 같이 묶여 도는 말이 넷 있다 — context engineering, harness engineering, loop engineering, 그리고 Ralph. 처음엔 비슷한 유행어가 경쟁하는 줄 알았는데, 출처를 따라가 보니 서로 다투는 게 아니라 추상도가 다른 한 사다리였다. 아래는 가장 일반적인 원리, 위로 갈수록 손에 잡히는 구현이다.

<figure class="fig">
  <div class="stack">
    <div class="layer l4"><span class="ln">04</span><span class="lt">Ralph</span><span class="desc">구현 — 한 줄짜리 while 루프</span></div>
    <div class="layer l3"><span class="ln">03</span><span class="lt">Loop engineering</span><span class="desc">자동화 — 사람 대신 루프가 돌린다</span></div>
    <div class="layer l2"><span class="ln">02</span><span class="lt">Harness engineering</span><span class="desc">환경 — 모델 바깥 전부</span></div>
    <div class="layer l1"><span class="ln">01</span><span class="lt">Context engineering</span><span class="desc">원리 — 컨텍스트를 올바로 채운다</span></div>
  </div>
  <figcaption>그림 1 · 원리(아래)에서 구현(위)으로 — 네 용어의 추상도 사다리 (스택)</figcaption>
</figure>

날짜와 출처를 적어두는 건, 이 말들이 전부 최근 1년 안에 자리 잡은 신생어라 정의가 아직 굳지 않았기 때문이다. 기억으로 단정하기보다 어디서 나온 말인지 같이 들고 다니는 편이 안전하다.

## Context engineering — 무엇을 보여줄지

가장 바닥이자 가장 오래된 감각이다. Andrej Karpathy가 2025년 중반에 "prompt engineering보다 context engineering"이라고 정리하면서 퍼졌는데, 정의는 단순하다. **다음 스텝에 필요한 정확한 정보로 컨텍스트 윈도우를 채우는 기술.** 지시·검색해 온 지식·이전 출력·도구 설명을, 너무 적지도 너무 많지도 않게 넣는 일이다.

써보면 이게 바닥인 이유가 분명해진다. 에이전트가 멍청해 보일 때 열에 아홉은 모델이 부족해서가 아니라 사람이라면 당연히 봤을 자료를 내가 안 줬기 때문이었다. 이 가이드 사이트를 만들 때도, 기준 문서와 규칙을 한곳에 정리해 매번 같이 물려주기 시작하니 같은 모델이 내놓는 답의 결이 달라졌다. 이건 [AX란 무엇인가](/guide/what-is-ax)에서 "데이터" 계층이라고 부른 것과 같은 이야기다 — 모델은 우리가 줄 수 있는 맥락만큼만 똑똑하다.

## Harness — 모델 바깥의 전부

한 칸 위는 환경이다. LangChain이 정리한 등식이 외우기 좋다 — **Agent = Model + Harness.** 모델의 추론을 뺀 나머지 전부가 harness다. 도구를 실행하는 부분, 상태와 메모리를 남기는 부분, 출력을 검증하는 게이트, 실패했을 때 복구하는 장치. OpenAI가 2026년 2월 "harness engineering"이라는 이름으로 이걸 정식화하면서 핵심을 한 줄로 못 박았다. *사람은 방향을 잡고, 에이전트가 실행한다(Humans steer, agents execute).* (이 용어는 Mitchell Hashimoto에게도 흔히 귀속되는데, 원 글을 독립적으로 확인하지 못해 여기선 둘 다 적어둔다.)

같은 모델이라도 무슨 도구를 쥐여주고 어디서 멈춰 검증받게 하느냐로 결과가 갈린다. 코드를 뱉고 끝내게 한 작업과, 빌드와 테스트를 붙여 스스로 통과를 확인하게 한 작업은 신뢰도가 달랐다. 모델을 바꾼 게 아니라 모델을 둘러싼 환경을 바꿨을 뿐인데. harness를 짠다는 건 결국 비결정적인 부품 하나를 믿을 만한 시스템으로 감싸는 일이고, 이건 백엔드에서 늘 하던 일과 다르지 않다.

## Loop — 사람을 루프에서 빼다

그 위가 자동화다. Addy Osmani가 2026년 6월에 "loop engineering"으로 정리했고, 그가 인용한 Boris Cherny(Anthropic의 Claude Code 책임자)의 표현이 가장 또렷하다. *나는 더 이상 Claude를 프롬프트하지 않는다. Claude를 프롬프트하는 루프를 돌린다.* 사람이 매번 손으로 던지던 프롬프트·검증·재실행을, 그 일을 대신 하는 시스템으로 바꾸는 것이다. Osmani는 이걸 "harness보다 한 층 위"라고 표현하는데, 이 상하 관계는 그의 프레이밍이지 업계가 합의한 정의는 아니라는 점은 적어둔다.

여기서 사람의 자리가 바뀐다. 루프 안에서 매 단계 개입하던 데서, 루프 위에 앉아 환경과 게이트를 설계하는 쪽으로.

<figure class="fig">
  <div class="compare">
    <div class="cmp-card">
      <div class="cmp-h">루프 안에서</div>
      <ul><li>매 단계 내가 프롬프트</li><li>다음 지시도 내가</li><li>에이전트 수만큼 내가 병목</li></ul>
    </div>
    <div class="cmp-arrow">→</div>
    <div class="cmp-card is-ax">
      <div class="cmp-h">루프 위에서</div>
      <ul><li>환경·검증·종료조건을 설계</li><li>루프가 돌고 나는 교정</li><li>사람은 게이트로 남는다</li></ul>
    </div>
  </div>
  <figcaption>그림 2 · 사람의 자리가 바뀐다 — in the loop에서 on the loop로 (비교)</figcaption>
</figure>

직접 옮겨보면 손은 분명히 편해진다. 다만 환경 설계가 허술하면 루프가 엉뚱한 방향으로 자신만만하게 달려가 토큰만 태운다. 무인으로 돌리는 만큼 종료 조건과 검증을 밖에 단단히 박아두는 게 전제다. 자동화가 값을 하려면 자동화 바깥이 더 단단해야 한다는 게 역설처럼 남는다.

## Ralph — 가장 단순한 루프

사다리 맨 위, 가장 손에 잡히는 칸이 Ralph다. Geoffrey Huntley가 2025년 7월에 블로그에 올린 패턴인데, 순수한 형태는 정말로 이 한 줄이다.

```bash
while :; do cat PROMPT.md | claude-code ; done
```

핵심은 매 iteration마다 **대화 히스토리가 아니라 같은 프롬프트 파일을 새 컨텍스트에 다시 먹인다**는 데 있다. 기억은 파일시스템·코드베이스·git이 대신 쥐고, 루프 한 바퀴엔 딱 한 작업만 시킨다. 컨텍스트가 매번 깨끗이 리셋되니 context engineering의 원리(다음 스텝에 필요한 것만 넣기)를 가장 거칠게 실천하는 셈이다. 이름은 《심슨》의 끈질기지만 맹한 캐릭터 Ralph Wiggum에서 따온 농담이다. 흔히 "RALF"라는 약어로 잘못 적히는데, 그건 나중에 갖다 붙인 말이고 원전 표기는 그냥 **Ralph**다.

작은 반복 작업 — 비슷한 파일 여러 개를 같은 규칙으로 고치거나, 포맷을 맞추는 일 — 에는 의외로 잘 들었다. 반대로 경계가 흐리거나 한 번 틀리면 되돌리기 어려운 일에는 손대지 않았다. [AX란 무엇인가](/guide/what-is-ax)에서 "빈도가 높고, 경계가 분명하고, 틀려도 회복 가능한 일이 좋은 후보"라고 적었는데, 무인 루프를 돌릴 일을 고르는 기준도 정확히 그것이었다.

## 백엔드 눈으로 본 하네스

이 사다리 전체가 새로운 사고방식은 아니다. 비결정적인 노드 하나를 어떻게 믿을 만하게 둘러싸고(harness — 재시도·검증·게이트), 어떻게 사람 없이 돌리고(loop), 틀렸을 때 어떻게 되돌릴지를 묻는 일이다. 분산 시스템에서 늘 하던 질문이고, 다만 그 노드가 매번 다른 답을 낼 수 있다는 점만 다르다. 그래서 나는 "프롬프트를 잘 쓰는 사람"보다 "에이전트가 일하는 환경을 설계하고 루프 위에 앉는 사람"이 이 일의 실제 모양에 가깝다고 본다.

## 그래서 무엇을 배웠나

배운 것을 한 문장으로 줄이면 "Ralph를 써라"가 아니다. **사다리의 어느 칸이 지금 이 일에 맞는지 고르는 판단**이다. 한 번 보고 끝낼 탐색이라면 그냥 대화가 낫고, 경계가 분명하고 검증이 가능한 반복이라면 그제야 위 칸의 루프가 값을 한다. 도구를 늘리는 게 아니라 일의 성격을 읽는 쪽이 먼저다.

아직 결론이 안 난 것도 있다. 무인 루프가 정말 값을 하는 작업의 경계가 어디까지인지, 검증을 얼마나 촘촘히 짜야 토큰을 덜 태우면서 신뢰가 서는지는 더 써봐야 안다. 그건 그대로 다음에 채울 자리로 남겨둔다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안 작성. 용어 4종(context·harness·loop·Ralph) 1차 소스 검증 후 사다리로 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>무인 루프가 값을 하는 작업의 경계 — 익명화 사례로 보강</span></li>
  </ul>
</section>
