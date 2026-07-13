// ============================================================
// 소행성 육아플래너 — 조리원 준비물
// ------------------------------------------------------------
// 산후조리원에 들고 갈 짐 리스트. 같은 엔진(체크 · 사요마요 결론 ·
// 브랜드칩 · 별똥별) 재사용. 조리원마다 제공 품목이 달라 "제공 여부
// 확인" 안내가 많다.
// ============================================================

const POSTPARTUM_CATEGORIES = [
  { nm:'세면 · 위생', emoji:'🧴', items:[
    {nm:'세면도구 세트 (칫솔·치약·클렌저)', ops:[
      {who:'산후8주맘', txt:'조리원 비치 여부 확인하고 부족한 것만 챙겨'}]},
    {nm:'샴푸 · 바디워시 (개인용)', ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'향 순한 걸로 — 아기 안고 있으면 향 강한 거 부담'}]},
    {nm:'개인 수건 2~3장', ops:[
      {who:'산후8주맘', txt:'조리원 제공하지만 머리 감을 때 개인용 있으면 편해'}]},
    {nm:'실내 슬리퍼', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'세면장·복도용 — 미끄럼 없는 걸로'}]},
    {nm:'헤어드라이어 (제공 확인)', ops:[
      {who:'산후8주맘', txt:'대부분 공용 비치 — 개인용 원하면 미니 사이즈'}]},
  ]},
  { nm:'산모 의류', emoji:'👚', items:[
    {nm:'수유 잠옷 · 수유복', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'앞트임 필수 — 조리원복 주지만 면회·외출용으로 2벌'}]},
    {nm:'수유나시 · 수유브라', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'와이어 없는 걸로 — 젖 도는 시기엔 조이면 아파'},
      {who:'조리원동기맘', verdict:'비추', txt:'사이즈 변해서 미리 많이 사면 손해, 2개만'}]},
    {nm:'수면양말', ops:[
      {who:'산후8주맘', verdict:'추천', txt:'산후엔 발이 유독 시려'}]},
    {nm:'카디건 · 수유 가운', ops:[
      {who:'조리원동기맘', txt:'수유실·면회 때 걸치기 좋아'}]},
    {nm:'복대 · 골반 밴드', ops:[
      {who:'산후8주맘', verdict:'쏘쏘', txt:'조리원에서 관리 받기도 하고 사람마다 갈려'}]},
  ]},
  { nm:'산후 케어', emoji:'🩸', items:[
    {nm:'산모패드 (오로용)', brands:'예지미인 · 좋은느낌', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'대형 필수 — 조리원 초반 제공량 확인하고 부족분 지참'}]},
    {nm:'일회용 팬티', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'오로 때문에 넉넉히 — 버리면 되니 편해'}]},
    {nm:'유두보호크림', brands:'라시놀 · 멀티맘', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', buy:'라시놀', txt:'수유 초기 상처엔 이게 진짜 필수'}]},
    {nm:'수유패드', brands:'메델라 · 유한킴벌리', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'젖 새는 시기 — 조리원부터 바로 필요'}]},
    {nm:'손목 보호대', carrot:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'수유·안기 반복하면 산후 손목통증 급증'}]},
    {nm:'도넛방석 (회음부)', ops:[
      {who:'산후8주맘', verdict:'쏘쏘', txt:'조리원에서 주기도 하니 확인하고'}]},
    {nm:'좌욕기 (제공 확인)', ops:[
      {who:'조리원동기맘', txt:'대부분 비치 — 개인 지참 전에 꼭 확인'}]},
  ]},
  { nm:'편의 · 전자', emoji:'🔌', items:[
    {nm:'충전기 (롱케이블 2m+)', brands:'벨킨 · 삼성', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'침대 콘센트가 멀어 — 짧으면 누워서 폰 못 봐'}]},
    {nm:'텀블러 · 빨대컵', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'수유 중 손 안 대고 물 마시기 — 미역국 부종 빼려면 물 많이'}]},
    {nm:'안대 · 귀마개', ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'신생아실 맡기고 잘 때 숙면템 — 이때 못 자면 회복 늦어'}]},
    {nm:'개인 물컵 · 수저', ops:[
      {who:'산후8주맘', txt:'식사 외 간식·차 마실 때'}]},
    {nm:'간식 · 비상식량', ops:[
      {who:'조리원동기맘', txt:'새벽 수유 후 출출할 때 — 견과·초콜릿 등'}]},
    {nm:'카메라 · 셀카봉 (선택)', ops:[
      {who:'산후8주맘', txt:'신생아·50일 기록 — 폰으로도 충분'}]},
  ]},
  { nm:'아기 · 서류', emoji:'📋', items:[
    {nm:'아기 퇴원복 · 겉싸개', ops:[
      {who:'조리원동기맘', txt:'조리원 이동·퇴원 때 — 계절 확인'}]},
    {nm:'속싸개 · 손싸개 (제공 확인)', ops:[
      {who:'산후8주맘', txt:'조리원 대부분 제공 — 개인용 원하면 소량만'}]},
    {nm:'산모수첩 · 신분증', min:true, ops:[
      {who:'조리원동기맘', txt:'입소·진료 시 필요'}]},
    {nm:'출생신고 서류 미리 챙기기', ops:[
      {who:'산후8주맘', txt:'조리원에 있는 동안 준비해두면 나와서 편해'}]},
    {nm:'유축기 (제공 · 대여 확인)', ops:[
      {who:'조리원동기맘', txt:'대부분 대여 비치 — 개인 깔때기 세트만 챙기면 돼'}]},
  ]},
];

// ---- 상태 ----
const PP_CHK_KEY = 'sohaengseong-postpartum-checked';
const PP_QTY_KEY = 'sohaengseong-postpartum-qty';
function ppItemId(ci, ii){ return 'pp' + ci + '-' + ii; }

let ppChecked = new Set();
let ppQty = {};
try{
  const c = localStorage.getItem(PP_CHK_KEY); if(c) ppChecked = new Set(JSON.parse(c));
  const q = localStorage.getItem(PP_QTY_KEY); if(q) ppQty = JSON.parse(q);
}catch(e){}
function savePostpartum(){
  try{
    localStorage.setItem(PP_CHK_KEY, JSON.stringify([...ppChecked]));
    localStorage.setItem(PP_QTY_KEY, JSON.stringify(ppQty));
  }catch(e){}
}

function ppTotals(){
  let total=0, done=0;
  POSTPARTUM_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    total++; if(ppChecked.has(ppItemId(ci,ii))) done++;
  }));
  return {total, done};
}
function ppCatCount(ci){
  let total=0, done=0;
  POSTPARTUM_CATEGORIES[ci].items.forEach((it,ii)=>{ total++; if(ppChecked.has(ppItemId(ci,ii))) done++; });
  return {total, done};
}

function renderPostpartum(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  const cnt = ppTotals();
  const intro = document.createElement('div');
  intro.className='region-card';
  intro.style.cursor='default';
  intro.innerHTML = `
    <span class="ri">🏨</span>
    <div class="rc"><h3>조리원 준비물 ${cnt.total}가지</h3>
    <p>산후조리원 들어갈 짐 — 조리원마다 제공 품목이 달라요. "제공 확인" 항목은 예약한 조리원에 먼저 물어보세요!</p></div>
  `;
  area.appendChild(intro);

  POSTPARTUM_CATEGORIES.forEach((cat,ci)=>{
    const {total, done} = ppCatCount(ci);
    const gEl = document.createElement('div'); gEl.className='group';
    const chip = done===total
      ? '<span class="deadline done">완료 ✓</span>'
      : '<span class="deadline info">준비 중</span>';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3>${chip}<span class="gprog" id="ppp-${ci}">${done}/${total}</span></div>
      <div class="group-items" id="ppi-${ci}"></div>
    `;
    const holder = gEl.querySelector('#ppi-'+ci);
    cat.items.forEach((it,ii)=> holder.appendChild(renderPostpartumItem(it,ci,ii)));
    area.appendChild(gEl);
  });
  updatePostpartumProgress();
}

function renderPostpartumItem(it,ci,ii){
  const id = ppItemId(ci,ii);
  const el = document.createElement('div');
  el.className = 'item' + (ppChecked.has(id)?' checked':'');

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

  if(myPlans[id]==='pass') el.classList.add('passed');
  el.appendChild(planRowEl(id, 'postpartum'));
  if(ppChecked.has(id) || myVerdicts[id]) el.appendChild(judgeRowEl(id));
  if(ppChecked.has(id) || myBuys[id]) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));

  el.querySelector('.chk').addEventListener('click',e=>{
    e.stopPropagation();
    const now = !ppChecked.has(id);
    now ? ppChecked.add(id) : ppChecked.delete(id);
    el.classList.toggle('checked');
    savePostpartum();
    updatePostpartumProgress();
    const cc = ppCatCount(ci);
    const gp = document.getElementById('ppp-'+ci);
    if(gp) gp.textContent = cc.done+'/'+cc.total;
    if(now){
      earnStars(5, '조리원 준비물 체크', 'chk-'+id);
      if(!el.querySelector('.judge-row:not(.buy-row)')) el.appendChild(judgeRowEl(id));
      if(!el.querySelector('.buy-row')) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
    }else{
      if(!myVerdicts[id]){ const jr = el.querySelector('.judge-row:not(.buy-row)'); if(jr) jr.remove(); }
      if(!myBuys[id]){ const br = el.querySelector('.buy-row'); if(br) br.remove(); }
    }
  });
  return el;
}

function updatePostpartumProgress(){
  const {total, done} = ppTotals();
  document.getElementById('prog-name').textContent = '조리원 준비물';
  document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  document.getElementById('prog-fill').style.width = (done/total*100)+'%';
}
