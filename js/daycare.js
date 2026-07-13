// ============================================================
// 소행성 육아플래너 — 어린이집 입소 준비물
// ------------------------------------------------------------
// 출산준비물과 같은 엔진(체크 · 사요마요 결론 · 브랜드칩 · 별똥별)을
// 재사용하되, 축이 "월령"이 아니라 "입소 시즌"인 별도 리스트.
// 공용 헬퍼(sheetConclusion · opsHtml · sheetBrandCandidates ·
// judgeRowEl · purchaseRowEl · earnStars)를 그대로 쓴다.
// ============================================================

const DAYCARE_CATEGORIES = [
  { nm:'가방 · 등원', emoji:'🎒', items:[
    {nm:'등원 가방 (백팩)', brands:'코니 · 일꼬르소 · 스케이터', carrot:true, min:true, ops:[
      {who:'복직맘', verdict:'추천', buy:'코니 미니 백팩', txt:'금방 크니까 당근으로 상태 좋은 거 노려도 돼'}]},
    {nm:'물통 (빨대 · 원터치)', brands:'써모스 · 비앤디 · 리첼', min:true, ops:[
      {who:'복직맘', verdict:'추천', buy:'써모스 스트로우 보틀', txt:'보온 되는 걸로 사면 사계절 써'},
      {who:'세돌맘', verdict:'쏘쏘', buy:'리첼 · 뚜껑 부품을 자주 잃어버려'}]},
    {nm:'미아방지 네임택 · 팔찌', min:true, ops:[
      {who:'세돌맘', verdict:'추천', txt:'등하원 도우미·차량 이용하면 특히 필요'}]},
    {nm:'알림장 · 서류 파우치', ops:[
      {who:'복직맘', verdict:'쏘쏘', txt:'요즘은 앱 알림장이 많아 종이 파우치는 애매'}]},
  ]},
  { nm:'낮잠 · 이불', emoji:'😴', items:[
    {nm:'낮잠이불 세트', brands:'포래즈 · 마리마리 · 쁘띠라뺑', min:true, ops:[
      {who:'복직맘', verdict:'추천', buy:'포래즈 낮잠이불', txt:'어린이집 지정 규격 먼저 확인하고 사!'}]},
    {nm:'낮잠매트 · 통풍패드', carrot:true, ops:[
      {who:'세돌맘', verdict:'추천', txt:'여름엔 통풍패드 하나 더 — 땀 많은 아이는 필수'}]},
    {nm:'이불 보관 가방', ops:[
      {who:'복직맘', txt:'금요일에 이불 가져오니 세탁·보관용 가방 하나 있으면 편해'}]},
  ]},
  { nm:'여벌옷 · 의류', emoji:'👕', items:[
    {nm:'여벌옷 세트 (상하)', need:'3~5벌', min:true, ops:[
      {who:'복직맘', verdict:'추천', txt:'물놀이·실수 대비 넉넉히 — 이름표 필수'}]},
    {nm:'어린이집용 실내화', brands:'크록스 · 아기짱 · 나이키', min:true, ops:[
      {who:'세돌맘', verdict:'추천', buy:'크록스 · 벗기 편하고 물청소 쉬움'},
      {who:'복직맘', verdict:'쏘쏘', txt:'사이즈 금방 커서 저렴이도 괜찮아'}]},
    {nm:'계절 외투 · 바람막이', carrot:true, ops:[
      {who:'세돌맘', txt:'한 철 입고 작아지니 중고가 이득'}]},
    {nm:'스타이 · 침받이 여유분', ops:[
      {who:'복직맘', verdict:'추천', txt:'아직 침 많은 월령이면 넉넉히'}]},
  ]},
  { nm:'식사 · 위생', emoji:'🍽️', items:[
    {nm:'유아 식판 · 수저 세트', brands:'에디슨 · 실리콘 스텐', min:true, ops:[
      {who:'복직맘', verdict:'추천', buy:'에디슨 학습 수저', txt:'적응기 도시락 보낼 때 필요할 수 있어'}]},
    {nm:'물티슈 (대용량)', brands:'베베숲 · 순둥이', ops:[
      {who:'세돌맘', verdict:'추천', txt:'어린이집에 한 팩 상비로 보내달라는 곳 많아'}]},
    {nm:'기저귀 여유분', need:'1팩', min:true, ops:[
      {who:'복직맘', txt:'이름 써서 한 봉지 보내두면 마음 편해'}]},
    {nm:'상비 파우치 (밴드 · 연고)', ops:[
      {who:'세돌맘', txt:'상비약은 어린이집 정책 확인 후 — 임의 투약 금지인 곳 많아'}]},
  ]},
  { nm:'이름표기', emoji:'🏷️', items:[
    {nm:'이름 스티커 (방수)', brands:'파스텔풍선 · 스티커팜 · 오뜨', min:true, ops:[
      {who:'복직맘', verdict:'추천', buy:'파스텔풍선 방수 세트', txt:'물통·도시락엔 방수·열전사가 안 떨어져'}]},
    {nm:'옷 라벨 (다리미 · 봉제)', brands:'스티커팜 · 마이비네임', ops:[
      {who:'세돌맘', verdict:'쏘쏘', txt:'다리미형은 세탁 반복하면 떨어져 — 봉제형이 오래가'}]},
    {nm:'네임 스탬프', min:true, ops:[
      {who:'복직맘', verdict:'추천', txt:'옷·용품 한 번에 찍어서 시간 절약, 물건 잃어버려도 돌아와'}]},
  ]},
  { nm:'서류 · 행정', emoji:'📋', items:[
    {nm:'입소 제출 서류', ops:[
      {who:'복직맘', txt:'주민등록등본 · (해당 시)재직증명서 등 — 어린이집 안내문대로 미리 발급'}]},
    {nm:'예방접종 증명서', ops:[
      {who:'세돌맘', txt:'"예방접종도우미"에서 출력 — 누락 접종 있으면 입소 전 챙기기'}]},
    {nm:'비상연락망 · 응급동의서', ops:[
      {who:'복직맘', txt:'조부모·시터까지 연락 순서 미리 정해서 제출'}]},
    {nm:'알레르기 · 특이사항 안내문', ops:[
      {who:'복직맘', verdict:'추천', txt:'식품 알레르기는 반드시 서면으로 — 급식 대체 요청까지'}]},
  ]},
];

// ---- 상태 (준비여부 · 수량) ----
const DC_CHK_KEY = 'sohaengseong-daycare-checked';
const DC_QTY_KEY = 'sohaengseong-daycare-qty';
function dcItemId(ci, ii){ return 'dc' + ci + '-' + ii; }

let dcChecked = new Set();
let dcQty = {};
try{
  const c = localStorage.getItem(DC_CHK_KEY); if(c) dcChecked = new Set(JSON.parse(c));
  const q = localStorage.getItem(DC_QTY_KEY); if(q) dcQty = JSON.parse(q);
}catch(e){}
function saveDaycare(){
  try{
    localStorage.setItem(DC_CHK_KEY, JSON.stringify([...dcChecked]));
    localStorage.setItem(DC_QTY_KEY, JSON.stringify(dcQty));
  }catch(e){}
}

function dcTotals(){
  let total=0, done=0;
  DAYCARE_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    total++; if(dcChecked.has(dcItemId(ci,ii))) done++;
  }));
  return {total, done};
}
function dcCatCount(ci){
  let total=0, done=0;
  DAYCARE_CATEGORIES[ci].items.forEach((it,ii)=>{ total++; if(dcChecked.has(dcItemId(ci,ii))) done++; });
  return {total, done};
}

function renderDaycare(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  const cnt = dcTotals();
  const intro = document.createElement('div');
  intro.className='region-card';
  intro.style.cursor='default';
  intro.innerHTML = `
    <span class="ri">🏫</span>
    <div class="rc"><h3>어린이집 입소 준비물 ${cnt.total}가지</h3>
    <p>3월 입소철 필수템 — 어린이집마다 준비물 안내가 조금씩 달라요. 지정 규격(이불 등)은 꼭 먼저 확인!</p></div>
  `;
  area.appendChild(intro);

  DAYCARE_CATEGORIES.forEach((cat,ci)=>{
    const {total, done} = dcCatCount(ci);
    const gEl = document.createElement('div'); gEl.className='group';
    const chip = done===total
      ? '<span class="deadline done">완료 ✓</span>'
      : '<span class="deadline info">준비 중</span>';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3>${chip}<span class="gprog" id="dcp-${ci}">${done}/${total}</span></div>
      <div class="group-items" id="dci-${ci}"></div>
    `;
    const holder = gEl.querySelector('#dci-'+ci);
    cat.items.forEach((it,ii)=> holder.appendChild(renderDaycareItem(it,ci,ii)));
    area.appendChild(gEl);
  });
  updateDaycareProgress();
}

function renderDaycareItem(it,ci,ii){
  const id = dcItemId(ci,ii);
  const el = document.createElement('div');
  el.className = 'item' + (dcChecked.has(id)?' checked':'');

  let badges='';
  const concl = sheetConclusion(it);
  if(concl) badges += `<span class="badge concl ${concl.k}">${concl.label}</span>`;
  if(it.need)   badges += `<span class="badge need">${it.need}</span>`;
  if(it.brands) badges += `<span class="badge brand">${it.brands}</span>`;
  if(it.carrot) badges += `<span class="badge carrot">🥕 당근 추천</span>`;

  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      <div class="chk"></div>
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${opsHtml(it, id)}
        ${badges?`<div class="item-badges">${badges}</div>`:''}
      </div>
    </div>
  `;
  bindOpsMore(el, it, id);

  if(myPlans[id]==='pass') el.classList.add('passed');
  el.appendChild(planRowEl(id, 'daycare'));
  if(dcChecked.has(id) || myVerdicts[id]) el.appendChild(judgeRowEl(id));
  if(dcChecked.has(id) || myBuys[id]) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));

  el.querySelector('.chk').addEventListener('click',e=>{
    e.stopPropagation();
    const now = !dcChecked.has(id);
    now ? dcChecked.add(id) : dcChecked.delete(id);
    el.classList.toggle('checked');
    saveDaycare();
    updateDaycareProgress();
    const cc = dcCatCount(ci);
    const gp = document.getElementById('dcp-'+ci);
    if(gp) gp.textContent = cc.done+'/'+cc.total;
    if(now){
      earnStars(5, '어린이집 준비물 체크', 'chk-'+id);
      if(!el.querySelector('.judge-row:not(.buy-row)')) el.appendChild(judgeRowEl(id));
      if(!el.querySelector('.buy-row')) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
    }else{
      if(!myVerdicts[id]){ const jr = el.querySelector('.judge-row:not(.buy-row)'); if(jr) jr.remove(); }
      if(!myBuys[id]){ const br = el.querySelector('.buy-row'); if(br) br.remove(); }
    }
  });
  return el;
}

function updateDaycareProgress(){
  const {total, done} = dcTotals();
  document.getElementById('prog-name').textContent = '어린이집 준비물';
  document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  document.getElementById('prog-fill').style.width = (done/total*100)+'%';
}
