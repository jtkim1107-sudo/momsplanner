// ============================================================
// 소행성 육아플래너 — 이유식 준비물
// ------------------------------------------------------------
// 출산준비물·어린이집과 같은 엔진(체크 · 사요마요 결론 · 브랜드칩 ·
// 별똥별)을 재사용. 축은 "이유식 시작(6개월~)".
// ============================================================

const BABYFOOD_CATEGORIES = [
  { nm:'조리도구', emoji:'🍲', items:[
    {nm:'이유식 마스터기 (찜 · 다지기)', brands:'베이비브레짜 · 리앙 · 휴롬', carrot:true, ops:[
      {who:'이유식전쟁맘', verdict:'추천', buy:'베이비브레짜 · 당근', txt:'한 번에 쪄서 갈아주니 초기엔 편해 — 근데 금방 안 써서 당근 추천'},
      {who:'두돌맘', verdict:'쏘쏘', txt:'손 많이 가는 편이라 나는 그냥 냄비파였어'}]},
    {nm:'이유식 냄비 (미니)', ops:[
      {who:'두돌맘', verdict:'추천', txt:'소량 끓이기 좋아 — 마스터기 없이 이걸로 다 했어'}]},
    {nm:'미니 절구 · 매셔', ops:[
      {who:'이유식전쟁맘', verdict:'쏘쏘', txt:'초기에 잠깐 쓰고 말아 — 포크로도 으깨져'}]},
    {nm:'다지기 · 채칼', brands:'해피콜 · 이케아', ops:[
      {who:'두돌맘', verdict:'추천', txt:'중기부터 입자 키울 때 진짜 자주 써'}]},
    {nm:'실리콘 주걱 · 스패출러', ops:[
      {who:'이유식전쟁맘', txt:'큐브에 알뜰하게 담을 때 하나 있으면 편해'}]},
  ]},
  { nm:'보관 · 큐브', emoji:'🧊', items:[
    {nm:'이유식 큐브 (냉동)', brands:'마더케이 · 리치밀', min:true, ops:[
      {who:'이유식전쟁맘', verdict:'추천', txt:'한 번에 만들어 소분 냉동 — 이유식은 큐브가 반이야'}]},
    {nm:'이유식 저장용기', brands:'마더케이 · 락앤락', min:true, ops:[
      {who:'두돌맘', verdict:'추천', txt:'전자레인지·열탕 되는 재질로'}]},
    {nm:'이유식 파우치 (외출용)', ops:[
      {who:'이유식전쟁맘', verdict:'쏘쏘', txt:'세척 번거로워서 나는 외출 땐 시판 사 먹였어'}]},
    {nm:'날짜 라벨 · 스티커', ops:[
      {who:'두돌맘', txt:'냉동 큐브 날짜 관리 안 하면 뭐가 뭔지 몰라'}]},
  ]},
  { nm:'식기 · 수저', emoji:'🥄', items:[
    {nm:'흡착 식판 · 볼', brands:'마미포포 · 에디슨 · 이지피지', min:true, ops:[
      {who:'이유식전쟁맘', verdict:'추천', buy:'이지피지 흡착볼', txt:'던지고 뒤집어도 안 쏟아져 — 자기주도엔 필수'}]},
    {nm:'이유식 스푼 (실리콘)', brands:'에디슨 · 그라비 · 마더케이', min:true, ops:[
      {who:'두돌맘', verdict:'추천', txt:'초기엔 잇몸 안 아프게 실리콘 끝으로'}]},
    {nm:'아기 포크', ops:[
      {who:'이유식전쟁맘', verdict:'쏘쏘', txt:'후기부터나 쓰니 급하게 살 필요는 없어'}]},
    {nm:'빨대컵 · 스파우트컵', brands:'리첼 · 비앤디 · 먼치킨', min:true, ops:[
      {who:'두돌맘', verdict:'추천', buy:'리첼 빨대컵'},
      {who:'이유식전쟁맘', verdict:'비추', txt:'어떤 건 눕히면 줄줄 새 — 후기 꼭 보고 사'}]},
  ]},
  { nm:'위생 · 턱받이', emoji:'🧷', items:[
    {nm:'실리콘 턱받이 (홈 있는 것)', brands:'마이비 · 사바트 · 아가짱', min:true, ops:[
      {who:'이유식전쟁맘', verdict:'추천', txt:'받이 홈 있는 방수형 — 물로 헹구면 끝, 천 빕은 빨래 지옥'}]},
    {nm:'롱빕 (소매형)', carrot:true, ops:[
      {who:'두돌맘', verdict:'추천', txt:'자기주도 이유식이면 팔까지 오는 소매형이 답'}]},
    {nm:'식탁 · 바닥 방수매트', ops:[
      {who:'이유식전쟁맘', verdict:'추천', txt:'바닥 난장판 방지 — 이거 깔고 안 깔고 청소 차이가 커'}]},
    {nm:'손 · 입 닦는 물티슈', brands:'베베숲 · 순둥이', ops:[
      {who:'두돌맘', txt:'식사용으로 한 통 따로 두면 편해'}]},
  ]},
  { nm:'식사 환경', emoji:'🪑', items:[
    {nm:'하이체어 · 식탁의자', brands:'스토케 트립트랩 · 이케아 안틸로프 · 뉴나', carrot:true, min:true, ops:[
      {who:'두돌맘', verdict:'추천', buy:'스토케 트립트랩', txt:'오래 쓰는 만큼 당근에도 매물 많아 — 상태 좋은 거 노려'},
      {who:'이유식전쟁맘', verdict:'쏘쏘', buy:'이케아 안틸로프', txt:'가성비 최고인데 홈에 음식 껴서 청소가 좀'}]},
    {nm:'부스터 시트', carrot:true, ops:[
      {who:'두돌맘', verdict:'추천', txt:'외출·여행용 · 식탁의자 졸업 후에도 오래 써'}]},
    {nm:'흡착 트레이 · 식탁 커버', ops:[
      {who:'이유식전쟁맘', txt:'하이체어 트레이가 작으면 하나 덧대면 편해'}]},
  ]},
  { nm:'식재료 · 원칙', emoji:'🥦', items:[
    {nm:'알레르기 도입 원칙', ops:[
      {who:'이유식전쟁맘', txt:'새 재료는 하나씩 · 3일 간격으로 · 이상반응 있으면 바로 소아과'}]},
    {nm:'철분 재료 챙기기', ops:[
      {who:'두돌맘', txt:'6개월부터 저장철 고갈 — 소고기·달걀노른자 등 꾸준히'}]},
    {nm:'간 · 조미료 원칙', ops:[
      {who:'이유식전쟁맘', txt:'돌 전엔 간 안 하기 — 어른 음식 그대로는 아직'}]},
  ]},
];

// ---- 상태 ----
const BF_CHK_KEY = 'sohaengseong-babyfood-checked';
const BF_QTY_KEY = 'sohaengseong-babyfood-qty';
function bfItemId(ci, ii){ return 'bf' + ci + '-' + ii; }

let bfChecked = new Set();
let bfQty = {};
try{
  const c = localStorage.getItem(BF_CHK_KEY); if(c) bfChecked = new Set(JSON.parse(c));
  const q = localStorage.getItem(BF_QTY_KEY); if(q) bfQty = JSON.parse(q);
}catch(e){}
function saveBabyfood(){
  try{
    localStorage.setItem(BF_CHK_KEY, JSON.stringify([...bfChecked]));
    localStorage.setItem(BF_QTY_KEY, JSON.stringify(bfQty));
  }catch(e){}
}

function bfTotals(){
  let total=0, done=0;
  BABYFOOD_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    total++; if(bfChecked.has(bfItemId(ci,ii))) done++;
  }));
  return {total, done};
}
function bfCatCount(ci){
  let total=0, done=0;
  BABYFOOD_CATEGORIES[ci].items.forEach((it,ii)=>{ total++; if(bfChecked.has(bfItemId(ci,ii))) done++; });
  return {total, done};
}

function renderBabyfood(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  const cnt = bfTotals();
  const intro = document.createElement('div');
  intro.className='region-card';
  intro.style.cursor='default';
  intro.innerHTML = `
    <span class="ri">🍽️</span>
    <div class="rc"><h3>이유식 준비물 ${cnt.total}가지</h3>
    <p>이유식 시작(만 4~6개월) 전 준비 리스트 — 시작 시기는 아기 발달 신호와 소아과 상담으로 정해요!</p></div>
  `;
  area.appendChild(intro);

  BABYFOOD_CATEGORIES.forEach((cat,ci)=>{
    const {total, done} = bfCatCount(ci);
    const gEl = document.createElement('div'); gEl.className='group';
    const chip = done===total
      ? '<span class="deadline done">완료 ✓</span>'
      : '<span class="deadline info">준비 중</span>';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3>${chip}<span class="gprog" id="bfp-${ci}">${done}/${total}</span></div>
      <div class="group-items" id="bfi-${ci}"></div>
    `;
    const holder = gEl.querySelector('#bfi-'+ci);
    cat.items.forEach((it,ii)=> holder.appendChild(renderBabyfoodItem(it,ci,ii)));
    area.appendChild(gEl);
  });
  updateBabyfoodProgress();
}

function renderBabyfoodItem(it,ci,ii){
  const id = bfItemId(ci,ii);
  const el = document.createElement('div');
  el.className = 'item' + (bfChecked.has(id)?' checked':'');

  let badges='';
  const concl = sheetConclusion(it);
  if(concl) badges += `<span class="badge concl ${concl.k}">${concl.label}</span>`;
  if(it.need)   badges += `<span class="badge need">${it.need}</span>`;
  if(it.brands) badges += `<span class="badge brand">${it.brands}</span>`;
  if(it.carrot) badges += `<span class="badge carrot">🥕 당근 추천</span>`;

  const qty = bfQty[id]||0;
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      <div class="chk"></div>
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${opsHtml(it, id)}
        ${badges?`<div class="item-badges">${badges}</div>`:''}
      </div>
      <div class="qty">
        <button class="qbtn" data-d="-1">−</button><span class="qnum">${qty}</span><button class="qbtn" data-d="1">＋</button>
      </div>
    </div>
  `;

  if(bfChecked.has(id) || myVerdicts[id]) el.appendChild(judgeRowEl(id));
  if(bfChecked.has(id) || myBuys[id]) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));

  el.querySelector('.chk').addEventListener('click',e=>{
    e.stopPropagation();
    const now = !bfChecked.has(id);
    now ? bfChecked.add(id) : bfChecked.delete(id);
    el.classList.toggle('checked');
    saveBabyfood();
    updateBabyfoodProgress();
    const cc = bfCatCount(ci);
    const gp = document.getElementById('bfp-'+ci);
    if(gp) gp.textContent = cc.done+'/'+cc.total;
    if(now){
      earnStars(5, '이유식 준비물 체크', 'chk-'+id);
      if(!el.querySelector('.judge-row:not(.buy-row)')) el.appendChild(judgeRowEl(id));
      if(!el.querySelector('.buy-row')) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
    }else{
      if(!myVerdicts[id]){ const jr = el.querySelector('.judge-row:not(.buy-row)'); if(jr) jr.remove(); }
      if(!myBuys[id]){ const br = el.querySelector('.buy-row'); if(br) br.remove(); }
    }
  });
  el.querySelectorAll('.qbtn').forEach(b=> b.addEventListener('click',e=>{
    e.stopPropagation();
    const next = Math.max(0, Math.min(99, (bfQty[id]||0) + (+b.dataset.d)));
    bfQty[id] = next;
    if(next===0) delete bfQty[id];
    el.querySelector('.qnum').textContent = next;
    saveBabyfood();
  }));
  return el;
}

function updateBabyfoodProgress(){
  const {total, done} = bfTotals();
  document.getElementById('prog-name').textContent = '이유식 준비물';
  document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  document.getElementById('prog-fill').style.width = (done/total*100)+'%';
}
