---
title: Codex를 AX 관점에서 쓰는 법
track: agents
type: decision
stage: 탐색 중
updated: "2026-06-23"
order: 3
lead: Codex는 "코드를 잘 짜는 모델"보다 "사람 없이 도는 에이전트 러너"로 쓸 때 값이 달랐다. 무인으로 돌릴수록 가드레일·검증·기록이 본체가 된다.
related:
  - label: 에이전트를 모는 법
    href: "/guide/driving-agents"
  - label: Claude Code를 AX 관점에서 쓰는 법
    href: "/guide/claude-code-ax"
  - label: AI 자동화의 audit trail 설계
    href: "/guide/audit-trail"
slides:
  - layout: cover
    kick: AX Field Guide · 도구·기법
    title: Codex · AX 관점
    body: 코딩 모델이 아니라, 사람 없이 도는 무인 러너로 본다면
  - layout: thesis
    kick: 테제
    title: 무인이면 가드레일이 본체다
    body: 사람이 매번 보지 않으니, 무엇을 못 하게 막고 무엇을 견디게 하고 무엇을 남길지가 모델의 똑똑함보다 중요해진다.
  - layout: flow
    kick: 실사용
    title: 정기 작업을 사람 없이 돌린다
    steps:
      - label: 정기 실행 (cron)
        note: 매주 같은 시각, 사람 없이
      - label: 자료 읽기 · 초안 생성
        note: 정해진 작업 수행
      - label: 검증 게이트
        note: 통과하면 반영, 실패하면 기록
      - label: 반영 또는 기록
        note: 못 하면 멈추지 말고 무엇을 못 했는지 파일에 남긴다
    note: 핵심은 그 과정에 사람이 끼지 않는다는 점이다.
  - layout: stack
    kick: 가드레일
    title: 막고 · 견디고 · 남긴다
    layers:
      - label: 막는다
        note: 공개 안전 룰 — 시크릿·개인정보가 산출물에 섞이지 않게 스캔
      - label: 견딘다
        note: 외부 접근 실패·빈 자료 — 멈추지 말고 무엇을 못 했는지 남기고 진행
      - label: 남긴다
        note: 검증 통과한 것만 반영, 무엇을 왜 바꿨는지 기록 (audit trail)
    note: 사람이라면 자연히 했을 판단을 명시적으로 적어 줘야 한다.
  - layout: compare
    kick: 분담
    title: 무인 정기 vs 곁에서 모는
    columns:
      - head: Codex 러너
        sub: 사람 없이 정기적으로
        points:
          - 안전하게 도는 게 관건
          - 가드레일이 본체
          - 이상한 날을 설계한다
      - head: Claude Code
        sub: 그때그때 개발·판단
        accent: true
        points:
          - 빠른 주고받기가 관건
          - 위임 경계 설정이 핵심
          - 사람과 맥락을 함께 쌓는다
    note: 어느 쪽이 더 낫다기보다 작업의 성격이 다르다.
  - layout: cover
    kick: 정리
    title: 러너의 품질 = 가드레일의 품질
    body: 모델이 얼마나 똑똑한가보다, 틀렸을 때 무엇을 안 하게 막아 뒀는지가 결과를 지킨다.
---

[Claude Code 글](/guide/claude-code-ax)과 같은 틀로 Codex를 본다. 다만 내가 Codex를 쓰는 자리는 결이 좀 다르다. Claude Code가 곁에서 개발을 거드는 쪽이라면, Codex는 **사람 없이 정해진 일을 도는 러너**로 쓸 때 값이 가장 달랐다. 그래서 이 글의 각도는 "Codex가 코드를 얼마나 잘 짜나"가 아니라 <strong>"Codex를 무인 에이전트로 거는 법"</strong>이다.

<blockquote class="thesis">무인으로 도는 에이전트에서는 모델의 똑똑함보다, 무엇을 못 하게 막고 무엇을 견디게 하고 무엇을 남기게 했는가 — 가드레일이 본체가 된다.</blockquote>

## 정기 작업을 사람 없이 돌린다

내가 Codex를 실제로 거는 방식은 단순하다. 매주 같은 시각에, 정해진 자료를 읽고, 정리·초안을 만들고, 검증을 통과하면 결과를 커밋하고 끝낸다. 개인 콘텐츠를 정리하는 파이프라인을 이렇게 무인으로 돌려 두는데, 핵심은 그 과정에 내가 끼지 않는다는 점이다. [에이전트를 모는 법](/guide/driving-agents)에서 말한 loop의 한 형태 — 사람이 매번 프롬프트하는 대신, 프롬프트·검증·실행을 정해두고 자동으로 돌게 한 것 — 에 가깝다.

사람이 매 실행을 들여다보지 않으니, "잘 도는 날"이 아니라 **"이상한 날"을 어떻게 다루느냐**가 전부가 된다. 그래서 글의 무게가 모델에서 가드레일로 옮겨갔다.

## 막고, 견디고, 남긴다

무인 러너에 거는 가드레일은 결국 세 가지로 정리됐다.

<figure class="fig">
  <div class="dia">
    <svg viewBox="0 0 560 184" role="img" aria-label="정기 실행에서 작업, 검증 게이트를 거쳐 통과 시 반영, 실패 시 기록으로 갈라지는 무인 러너 흐름">
      <defs>
        <marker id="ah-cx" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" style="fill:#2563eb"/>
        </marker>
      </defs>
      <rect class="node-soft" x="8" y="68" width="104" height="46" rx="9"/>
      <text class="ntext" x="60" y="88" text-anchor="middle">정기 실행</text>
      <text class="nsub" x="60" y="104" text-anchor="middle">cron · 사람 없음</text>
      <line class="edge" marker-end="url(#ah-cx)" x1="112" y1="91" x2="140" y2="91"/>
      <rect class="node" x="142" y="68" width="104" height="46" rx="9"/>
      <text class="ntext" x="194" y="88" text-anchor="middle">작업</text>
      <text class="nsub" x="194" y="104" text-anchor="middle">읽기·생성</text>
      <line class="edge" marker-end="url(#ah-cx)" x1="246" y1="91" x2="272" y2="91"/>
      <path class="node-soft" d="M330 64 L380 91 L330 118 L280 91 z"/>
      <text class="nsub" x="330" y="88" text-anchor="middle">검증</text>
      <text class="nsub" x="330" y="101" text-anchor="middle">게이트</text>
      <path class="edge" marker-end="url(#ah-cx)" d="M360 76 Q410 50 440 50 L470 50"/>
      <text class="nsub" x="395" y="44" text-anchor="middle">통과</text>
      <rect class="node" x="472" y="30" width="84" height="40" rx="8"/>
      <text class="ntext" x="514" y="54" text-anchor="middle">반영</text>
      <path class="edge edge-d" marker-end="url(#ah-cx)" d="M360 106 Q410 132 440 132 L470 132"/>
      <text class="nsub" x="395" y="140" text-anchor="middle">실패·불가</text>
      <rect class="node" x="472" y="112" width="84" height="40" rx="8"/>
      <text class="ntext" x="514" y="136" text-anchor="middle">기록</text>
    </svg>
  </div>
  <figcaption>그림 1 · 무인 러너 — 검증 통과만 반영하고, 못 하면 멈추지 말고 남긴다 (흐름)</figcaption>
</figure>

**견딘다.** 무인 작업은 중간에 막히는 일이 흔하다 — 외부 앱 접근이 안 되거나, 자료가 비어 있거나. 이때 그냥 멈춰 버리면 그 주는 통째로 날아간다. 그래서 "못 하면 멈추지 말고, 무엇을 못 했는지 파일에 남기고 할 수 있는 데까지 진행하라"를 규칙으로 넣는다. 사람이라면 자연히 했을 "이건 일단 건너뛰고"를 명시적으로 적어 줘야 한다.

**막는다.** 무인이라 결과를 바로 확인하지 못하니, 나가면 안 되는 것이 나가지 않게 막는 게 중요하다. 공개 안전 룰 — 시크릿·개인정보·연락처 같은 게 산출물에 섞이지 않았는지 스캔하는 단계 — 을 검증에 넣는다. [공개 위험 게이트](/guide/what-is-ax)를 사람이 매번 못 보니, 그 검사를 자동화 안으로 끌어들이는 셈이다.

**남긴다.** 검증을 통과한 것만 반영하고, 무엇을 왜 바꿨는지 기록을 남긴다. [audit trail](/guide/audit-trail)에서 말한 그것이 무인 러너에서는 선택이 아니라 필수다 — 사람이 실시간으로 못 보니, 나중에 되짚을 기록이 없으면 무슨 일이 있었는지 영영 모른다.

## 곁에서 모는 도구와 분담한다

이렇게 쓰다 보니 [Claude Code](/guide/claude-code-ax)와 자연스럽게 자리가 갈렸다. 정해진 일을 사람 없이 정기적으로 도는 건 Codex 러너에, 그때그때 개발하고 판단이 끼는 건 곁에서 모는 도구에. 어느 쪽이 더 낫다기보다 작업의 성격이 다르다 — 한쪽은 "사람이 안 보는 동안 안전하게 도는 것"이 관건이고, 다른 쪽은 "사람과 빠르게 주고받는 것"이 관건이다. 이 분담 자체를 한 편으로 더 풀 생각이다([Claude Code vs Codex](/guide/cc-vs-codex)).

## 정리하면

Codex를 무인 러너로 쓰면서 배운 건, 러너의 품질이 모델의 품질이 아니라 **가드레일의 품질**이더라는 것이다. 똑똑한 모델이 가끔 자신만만하게 틀리는 것보다, 틀렸을 때 무엇을 안 하게 막아 뒀는지가 결과를 지켰다. 무인이라는 건 결국 "사람이 없는 동안의 실패를 어떻게 설계하느냐"의 문제고, 그건 백엔드에서 늘 하던 질문과 다르지 않다.

<section class="log" aria-label="변경 로그">
  <div class="lg-h">변경 로그</div>
  <ul>
    <li><time>2026-06-23</time><span>초안에서 발행. 무인 러너·가드레일 3종(견디고·막고·남긴다) 정리 (성숙도: 탐색 중)</span></li>
    <li><time>예정</time><span>검증 게이트(공개 안전 스캔·diff 점검)의 구체 구성 보강</span></li>
  </ul>
</section>
