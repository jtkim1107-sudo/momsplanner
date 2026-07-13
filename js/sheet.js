// ============================================================
// 소행성 육아플래너 — 출산 준비물 시트
// ------------------------------------------------------------
// 선배맘들이 실제로 공유해 쓰는 준비물 스프레드시트(공유용 2025)를
// 앱 안에 이식한 것. 준비여부 체크 · 구매수량 · 참고 브랜드 ·
// 핫딜가 · 당근(중고) 추천 여부를 그대로 담는다.
// prep:true = 시트에서 이미 준비 완료로 체크돼 있던 항목.
// carrot:true = 중고(당근) 구매 추천 항목.
// ============================================================

const SHEET_CATEGORIES = [
  { nm:'수유용품', emoji:'🍼', items:[
    {nm:'젖병세척솔', brands:'마더케이'},
    {nm:'젖꼭지세척솔', brands:'마더케이', deal:'9,020원 (7개)'},
    {nm:'젖병+젖꼭지', brands:'더블하트 · 헤겐 · 닥터브라운 · 모윰', deal:'14,000원 (4개)'},
    {nm:'젖꼭지', brands:'더블하트 · 베베그로우 등', deal:'3,400원'},
    {nm:'젖병소독기', brands:'유팡 · 픽셀', deal:'유팡 28만원대 · 픽셀 26만원대'},
    {nm:'젖병집게', brands:'마더케이'},
    {nm:'젖병건조대', brands:'마더케이', prep:true},
    {nm:'젖병세척기', brands:'베이비브레짜', deal:'300,510원'},
    {nm:'수유시트 · 쿠션', brands:'더스베이비(수유쿠션) · 알프레미오(수유시트)', carrot:true, prep:true},
    {nm:'분유제조기', brands:'베이비브레짜', deal:'24~25만원대', prep:true},
    {nm:'분유포트', brands:'릴리브 · 보르르', deal:'릴리브 11만원대 · 보르르 6만원대'},
    {nm:'백색소음기 (수유등)', brands:'말랑하니', deal:'34,200원'},
    {nm:'모유저장팩', brands:'마더케이'},
    {nm:'쪽쪽이', brands:'스와비넥스 · 모윰 · 누크 · 아벤트 등'},
  ]},
  { nm:'피부용품', emoji:'🧴', items:[
    {nm:'시카리페어크림 (침독크림)', brands:'몽디에스 등'},
    {nm:'태열키트', brands:'쁘리마쥬', deal:'68,400원'},
    {nm:'수딩젤', brands:'몽디에스 · 쁘리마쥬 · 아토팜 등'},
    {nm:'기저귀발진크림', brands:'쁘리마쥬'},
    {nm:'로션 · 크림 · 오일', brands:'몽디에스 · 쁘리마쥬 · 아토팜 등'},
  ]},
  { nm:'목욕용품', emoji:'🛁', items:[
    {nm:'아기욕조', brands:'슈너글 · 온다베이비', deal:'슈너글 34,900원'},
    {nm:'샤워필터'},
    {nm:'바디워시'},
    {nm:'천기저귀', brands:'밤부베베', deal:'4,817원'},
    {nm:'아기 수건', brands:'대림바스', deal:'24,845원'},
    {nm:'아기 비데', brands:'힙비 · 포프베베', deal:'78,000원'},
    {nm:'엉덩이클렌저'},
    {nm:'탕온계'},
  ]},
  { nm:'위생용품', emoji:'🧻', items:[
    {nm:'거즈손수건', brands:'밤부베베'},
    {nm:'엠보손수건', brands:'밤부베베'},
    {nm:'지퍼백', brands:'마더케이'},
    {nm:'온습도계', brands:'휴비딕', carrot:true},
    {nm:'건티슈', brands:'마더케이'},
    {nm:'물티슈', brands:'베베숲 · 브라운', deal:'3만4천원대'},
    {nm:'소독티슈', brands:'그린핑거 · 퓨어닷', deal:'28,740원'},
    {nm:'콧물흡입기', brands:'노시부', prep:true},
    {nm:'손톱가위 · 깎이', brands:'마더케이 · 더블하트(가위)', deal:'7,250원'},
    {nm:'신생아면봉', brands:'마더케이'},
  ]},
  { nm:'기저귀', emoji:'👶', items:[
    {nm:'트롤리', brands:'코코맘 · 이케아', deal:'70,920원'},
    {nm:'천기저귀', brands:'무루 · 밤부베베'},
    {nm:'기저귀갈이대', brands:'소베맘', deal:'81,310원', carrot:true, prep:true},
    {nm:'방수커버', brands:'포몽드 · 마리데'},
    {nm:'기저귀쓰레기통', brands:'매직캔', deal:'47,710원'},
  ]},
  { nm:'외출용품', emoji:'🚗', items:[
    {nm:'겉싸개', brands:'워낙 다양', carrot:true},
    {nm:'카시트', brands:'브라이텍스 · 다이치 · 맥시코시 · 조이 등'},
    {nm:'바구니카시트', carrot:true},
    {nm:'아기띠', brands:'포그내 · 코니 · 아이엔젤 · 베이비뵨 등', carrot:true},
    {nm:'유모차', brands:'오이스터3 · 에그2 · 오르빗 · 부가부 등', carrot:true},
    {nm:'유모차패드'},
    {nm:'쿨시트 · 웜시트'},
    {nm:'휴대용 방수패드'},
    {nm:'유모차커버 (방풍 · 레인 등)'},
    {nm:'보틀워머'},
    {nm:'일회용젖병', brands:'마더케이 · 유미'},
    {nm:'휴대용 분유포트', brands:'보아르', deal:'4만원대'},
    {nm:'휴대용 쪽쪽이 소독기', brands:'픽셀 · 모윰', carrot:true},
  ]},
  { nm:'침구류', emoji:'🛏️', items:[
    {nm:'아기침대', brands:'리안 · 이케아 · 스토케', deal:'18만원대', carrot:true, prep:true},
    {nm:'이불세트', brands:'포몽드', prep:true},
    {nm:'블랭킷', brands:'아뜰리에슈', prep:true},
    {nm:'두상베개', brands:'라비킷', deal:'39,800원'},
  ]},
];

// ---- 상태 (준비여부 · 구매수량) ----
const SHEET_CHK_KEY = 'sohaengseong-sheet-checked';
const SHEET_QTY_KEY = 'sohaengseong-sheet-qty';

function sheetItemId(ci, ii){ return 'sh' + ci + '-' + ii; }

function sheetDefaultChecked(){
  const s = new Set();
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{ if(it.prep) s.add(sheetItemId(ci,ii)); }));
  return s;
}
let sheetChecked = sheetDefaultChecked();
let sheetQty = {};
try{
  const sc = localStorage.getItem(SHEET_CHK_KEY);
  if(sc) sheetChecked = new Set(JSON.parse(sc));
  const sq = localStorage.getItem(SHEET_QTY_KEY);
  if(sq) sheetQty = JSON.parse(sq);
}catch(e){}
function saveSheet(){
  try{
    localStorage.setItem(SHEET_CHK_KEY, JSON.stringify([...sheetChecked]));
    localStorage.setItem(SHEET_QTY_KEY, JSON.stringify(sheetQty));
  }catch(e){}
}

// ---- 렌더링 ----
function sheetTotals(){
  let total=0, done=0;
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    total++; if(sheetChecked.has(sheetItemId(ci,ii))) done++;
  }));
  return {total, done};
}

function renderSheet(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  const intro = document.createElement('div');
  intro.className='region-card';
  intro.style.cursor='default';
  intro.innerHTML = `
    <span class="ri">🛒</span>
    <div class="rc"><h3>선배맘 공유 시트 (2025) 이식</h3>
    <p>준비여부 체크 · 참고 브랜드 · 핫딜가 그대로 — 🥕 표시는 중고(당근) 구매 추천 항목이에요. 가격은 시세 참고용!</p></div>
  `;
  area.appendChild(intro);

  SHEET_CATEGORIES.forEach((cat,ci)=>{
    const gEl = document.createElement('div'); gEl.className='group';
    const done = cat.items.filter((it,ii)=>sheetChecked.has(sheetItemId(ci,ii))).length;
    const chip = done===cat.items.length
      ? '<span class="deadline done">완료 ✓</span>'
      : '<span class="deadline info">준비 중</span>';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3>${chip}<span class="gprog" id="shp-${ci}">${done}/${cat.items.length}</span></div>
      <div class="group-items" id="shi-${ci}"></div>
    `;
    const holder = gEl.querySelector('#shi-'+ci);
    cat.items.forEach((it,ii)=> holder.appendChild(renderSheetItem(it,ci,ii)));
    area.appendChild(gEl);
  });
  updateSheetProgress();
}

function renderSheetItem(it,ci,ii){
  const id = sheetItemId(ci,ii);
  const el = document.createElement('div');
  el.className = 'item' + (sheetChecked.has(id)?' checked':'');

  let badges='';
  if(it.brands) badges += `<span class="badge brand">🏷️ ${it.brands}</span>`;
  if(it.deal)   badges += `<span class="badge price">💰 ${it.deal}</span>`;
  if(it.carrot) badges += `<span class="badge carrot">🥕 당근 추천</span>`;

  const qty = sheetQty[id]||0;
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      <div class="chk"></div>
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${badges?`<div class="item-badges">${badges}</div>`:''}
      </div>
      <div class="qty">
        <button class="qbtn" data-d="-1">−</button><span class="qnum">${qty}</span><button class="qbtn" data-d="1">＋</button>
      </div>
    </div>
  `;

  el.querySelector('.chk').addEventListener('click',e=>{
    e.stopPropagation();
    sheetChecked.has(id)?sheetChecked.delete(id):sheetChecked.add(id);
    el.classList.toggle('checked');
    saveSheet();
    updateSheetProgress();
    const done = SHEET_CATEGORIES[ci].items.filter((x,i)=>sheetChecked.has(sheetItemId(ci,i))).length;
    const gp = document.getElementById('shp-'+ci);
    if(gp) gp.textContent = done+'/'+SHEET_CATEGORIES[ci].items.length;
  });
  el.querySelectorAll('.qbtn').forEach(b=> b.addEventListener('click',e=>{
    e.stopPropagation();
    const next = Math.max(0, Math.min(99, (sheetQty[id]||0) + (+b.dataset.d)));
    sheetQty[id] = next;
    if(next===0) delete sheetQty[id];
    el.querySelector('.qnum').textContent = next;
    saveSheet();
  }));
  return el;
}

function updateSheetProgress(){
  const {total, done} = sheetTotals();
  document.getElementById('prog-name').textContent = '출산 준비물';
  document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  document.getElementById('prog-fill').style.width = (done/total*100)+'%';
}
