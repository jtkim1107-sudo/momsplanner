// ============================================================
// 소행성 육아플래너 — 본체 앱 판정 연동 어댑터
// ------------------------------------------------------------
// 본체 소행성 앱의 "이 육아템, 살까 말까?" 판정 플로우에서 쌓이는
// 데이터를 체크리스트의 결론으로 변환한다.
//   판정 1문항: 필요했다 / 필요없었다  → need %
//   본격 판정: 어떻게 구했어요? (새제품·중고·대여·선물받음·구매안함)
//             + 사용시기 · 브랜드 · 한마디 (별똥별 3조각)
// 실서비스에선 이 파일이 판정 집계 API 응답으로 대체된다.
// 아래 샘플은 실제 판정 화면 형식 그대로 (유아 자석칠판 = 13/21명 박빙).
// ============================================================

const VERDICT_FEED = {
  // 출산 준비물
  '유모차':            {need:93, n:412, ch:{'새제품':38,'중고':44,'대여':5,'선물받음':11,'구매안함':2}, top:'오이스터 · 잉글레시나'},
  '젖병소독기':        {need:78, n:214, ch:{'새제품':52,'중고':31,'대여':6,'선물받음':8,'구매안함':3},  top:'유팡'},
  '아기욕조':          {need:81, n:186, ch:{'새제품':47,'중고':28,'대여':3,'선물받음':17,'구매안함':5}, top:'슈너글 · 마더케이'},
  '역류방지쿠션':      {need:64, n:143, ch:{'새제품':41,'중고':33,'대여':2,'선물받음':16,'구매안함':8}, top:'로토토'},
  '바운서':            {need:52, n:97,  hot:true, ch:{'새제품':24,'중고':48,'대여':11,'선물받음':9,'구매안함':8}, top:'베이비뵨'},
  '도넛방석 (회음부 방석)': {need:49, n:26, hot:true, ch:{'새제품':55,'중고':14,'대여':0,'선물받음':22,'구매안함':9}}, // 30명 미만 — 신뢰 게이트 시연
  // 조리원 준비물
  '손목 보호대':       {need:71, n:58,  ch:{'새제품':66,'중고':9,'대여':0,'선물받음':19,'구매안함':6}, top:'언더렉스'},
  '다리마사지기':      {need:47, n:41,  hot:true, ch:{'새제품':31,'중고':27,'대여':18,'선물받음':15,'구매안함':9}},
};

function verdictFeedFor(it){
  return VERDICT_FEED[it.nm] || null;
}

// 판정 집계 → 5단계 결론 (30명 미만이면 결론 유보)
function feedConclusion(f){
  if(f.n < 30) return null;
  const used = 100 - (f.ch['구매안함']||0);
  const secondhand = (f.ch['중고']||0) + (f.ch['대여']||0);
  if(f.hot || (f.need>=45 && f.need<=55)) return {k:'try', label:'하나만 사보세요'};
  if(f.need < 25)  return {k:'no',     label:'절대 사지 마세요'};
  if(f.need < 45)  return {k:'closet', label:'장롱템, 패스하세요'};
  if(f.need >= 60 && secondhand >= Math.max(...Object.values(f.ch))) return {k:'carrot', label:'무조건 당근하세요'};
  if(f.need >= 75 && used >= 90) return {k:'yes', label:'무조건 사세요'};
  if(f.need >= 60) return {k:'yes', label:'무조건 사세요'};
  return {k:'try', label:'하나만 사보세요'};
}

// 카드 배지: 실제 참여 수 (+ 논쟁템)
function feedBadge(f){
  let b = '';
  if(f.hot) b += `<span class="badge hot">🔥 논쟁템</span>`;
  b += (f.n >= 30)
    ? `<span class="badge vcount">⚖️ ${f.n.toLocaleString()}명 판정</span>`
    : `<span class="badge collecting">판정 모으는 중 · ${f.n}명</span>`;
  return b;
}

// 상세(2뎁스): 판정 결과 바 + 어떻게 구했는지 분포
function feedDetailHtml(f){
  const chips = Object.entries(f.ch)
    .filter(([,v])=>v>0)
    .sort((a,b)=>b[1]-a[1])
    .map(([k,v])=>`<span>${k} ${v}%</span>`).join('');
  return `
    <div class="vf">
      <span class="vf-head">📊 선배맘 판정 · ${f.n.toLocaleString()}명 참여${f.hot?' · 박빙 진행 중':''}</span>
      <div class="vf-bar"><div class="vf-yes" style="width:${f.need}%"></div></div>
      <div class="vf-lbl"><span>👍 필요했다 ${f.need}%</span><span>필요없었다 ${100-f.need}% 👎</span></div>
      <div class="vf-ch">${chips}</div>
      ${f.top?`<div class="vf-top">🏷️ 많이 쓴 브랜드 — ${f.top}</div>`:''}
      <span class="vf-src">소행성 앱 판정 데이터 연동</span>
    </div>`;
}
