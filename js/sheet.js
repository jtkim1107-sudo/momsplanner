// ============================================================
// 소행성 육아플래너 — 출산 준비물 시트
// ------------------------------------------------------------
// 선배맘들이 실제로 공유해 쓰는 준비물 자료 2종을 병합해 이식:
//  ① 공유용 스프레드시트(2025) — 참고 브랜드 · 핫딜가 · 당근 추천
//  ② 선배맘 실사용 리스트 — 필요 개수 · 실사용 경험담
// 필드: brands 참고 브랜드 / deal 핫딜가 / carrot 중고(당근) 추천 /
//       need 필요 개수 / note 선배맘 경험담 / prep 이미 준비 완료
// ============================================================

const SHEET_CATEGORIES = [
  { nm:'의류', emoji:'🧥', items:[
    {nm:'배냇저고리', need:'2~3개', note:'입는 시기가 굉장히 짧음 — 아기 몸무게랑 키에 따라 달라짐 (나는 오래 사용했어!)'},
    {nm:'바디수트', need:'8~10개', note:'70 사이즈 구매 — 아기가 작게 태어나서 60도 많이 샀어!'},
    {nm:'모자', need:'2~3개', note:'아기 딸꾹질 시 사용, 목욕하고 나면 추워서 씌워줬어!'},
    {nm:'손싸개', need:'8~10개', note:'아기가 손톱으로 얼굴에 상처낼 수도 있어ㅜ'},
    {nm:'발싸개 · 양말', need:'8~10개', note:'속싸개로 발이 가려져서 나는 아직 구매 안 했어'},
    {nm:'속싸개', need:'3~4개', note:'분유 토하고 하면 속싸개가 많이 필요하더라구'},
    {nm:'스와들업', need:'3~4개', carrot:true, note:'당근으로도 많이 사는데, 신생아 때는 손 부분을 입으로 빨아서 새 걸로 샀어'},
    {nm:'세탁망', need:'3개', note:'사이즈별 세트로 구매'},
    {nm:'아기 세탁세제', need:'1개', note:'아기 세제는 필수!'},
    {nm:'아기 섬유유연제', need:'1개'},
    {nm:'옷장 or 서랍', need:'1개', note:'신생아 시기 지나고 옷 많아지면 필요!!!'},
  ]},
  { nm:'수유용품', emoji:'🍼', items:[
    {nm:'젖병세척솔', brands:'마더케이', need:'넉넉히', note:'소모품이라 한 달에 한 번 교체'},
    {nm:'젖꼭지세척솔', brands:'마더케이', deal:'9,020원 (7개)'},
    {nm:'젖병+젖꼭지', brands:'더블하트 · 헤겐 · 닥터브라운 · 모윰', deal:'14,000원 (4개)', need:'160ml 6개 · 240ml 4개', note:'완분 기준 160ml 6~8개 추천! 처음엔 160만 쓰니까 240은 차차 추가해도 돼'},
    {nm:'젖꼭지', brands:'더블하트 · 베베그로우 등', deal:'3,400원', need:'SS 4개 · S 6개', note:'금방 사이즈업 할 것 같아서 S를 더 샀어'},
    {nm:'젖병소독기', brands:'유팡 · 픽셀', deal:'유팡 28만원대 · 픽셀 26만원대', note:'세척기를 들이면 소독기는 안 들이는 추세 같은데, 나는 소독기 사서 잘 쓰는 중이야'},
    {nm:'젖병집게', brands:'마더케이'},
    {nm:'젖병건조대', brands:'마더케이', prep:true, note:'세척기 있으면 없어도 될 것 같아'},
    {nm:'젖병세척기', brands:'베이비브레짜', deal:'300,510원', note:'요즘 엄청 유행하는 육아용품 — 있으면 좋을 것 같아'},
    {nm:'수유시트 · 쿠션', brands:'더스베이비(수유쿠션) · 알프레미오(수유시트)', carrot:true, prep:true, note:'분유 먹이다 보니 안 쓰게 돼서 추천은 안 해!'},
    {nm:'분유제조기', brands:'베이비브레짜', deal:'24~25만원대', prep:true, note:'나는 세척이 어렵고 불편할 것 같아서 안 샀어!'},
    {nm:'분유포트', brands:'릴리브 · 보르르', deal:'릴리브 11만원대 · 보르르 6만원대', need:'1개', note:'릴리브 쓰는 중 — 첫만남이용권으로 샀고 매우 만족!'},
    {nm:'백색소음기 (수유등)', brands:'말랑하니', deal:'34,200원'},
    {nm:'모유저장팩', brands:'마더케이'},
    {nm:'쪽쪽이', brands:'스와비넥스 · 모윰 · 누크 · 아벤트 등', need:'2개', note:'애바애지만 대부분 생후 50일은 지나야 무는 편이래'},
  ]},
  { nm:'피부용품', emoji:'🧴', items:[
    {nm:'시카리페어크림 (침독크림)', brands:'몽디에스 등'},
    {nm:'태열키트', brands:'쁘리마쥬', deal:'68,400원'},
    {nm:'수딩젤', brands:'몽디에스 · 쁘리마쥬 · 아토팜 등', note:'여름 아기 필수템'},
    {nm:'기저귀발진크림', brands:'쁘리마쥬 · 비판텐', note:'발진 났을 때나 다쳤을 때 필수'},
    {nm:'로션 · 크림 · 오일', brands:'몽디에스 · 쁘리마쥬 · 아토팜 등'},
  ]},
  { nm:'목욕용품', emoji:'🛁', items:[
    {nm:'아기욕조', brands:'슈너글 · 온다베이비', deal:'슈너글 34,900원', need:'1~2개', note:'씻길용·헹굴용 두 개라는데, 신생아는 물로만 씻으니 하나로도 충분해'},
    {nm:'샤워필터'},
    {nm:'바디워시', need:'1개'},
    {nm:'목욕수건', note:'신생아는 일주일에 2번 정도만 씻겨도 된대!'},
    {nm:'천기저귀', brands:'밤부베베', deal:'4,817원', need:'5개', note:'샤워 후 수건 대용으로 많이 썼어'},
    {nm:'아기 수건', brands:'대림바스', deal:'24,845원'},
    {nm:'아기 비데', brands:'힙비 · 포프베베', deal:'78,000원', note:'포브베베 많이 쓰는데 화장실이 좁다면 휴대용 추천'},
    {nm:'엉덩이클렌저'},
    {nm:'욕조클리너', need:'1개'},
    {nm:'탕온계'},
  ]},
  { nm:'위생용품', emoji:'🧻', items:[
    {nm:'거즈손수건', brands:'밤부베베', need:'50개 이상', note:'1년 이상 쓰는 손수건은 넉넉하게!'},
    {nm:'엠보손수건', brands:'밤부베베'},
    {nm:'지퍼백', brands:'마더케이', note:'출산하러 갈 때 아기 옷 넣어 갔어 — 태어나기 전에 미리 세탁해서 보관해놨어'},
    {nm:'온습도계', brands:'휴비딕', carrot:true, note:'보건소 같은 데서 선물로도 많이 들어오는 편이야'},
    {nm:'체온계', need:'1개', note:'지역 출산축하 선물로 브라운 체온계 받았어!'},
    {nm:'건티슈', brands:'마더케이'},
    {nm:'물티슈', brands:'베베숲 · 브라운', deal:'3만4천원대'},
    {nm:'소독티슈', brands:'그린핑거 · 퓨어닷', deal:'28,740원'},
    {nm:'콧물흡입기', brands:'노시부', prep:true},
    {nm:'손톱가위 · 깎이', brands:'마더케이 · 더블하트(가위)', deal:'7,250원', need:'1개', note:'가위랑 깎이 둘 다 샀어'},
    {nm:'신생아면봉', brands:'마더케이', need:'1통'},
  ]},
  { nm:'기저귀', emoji:'👶', items:[
    {nm:'트롤리', brands:'코코맘 · 이케아', deal:'70,920원', note:'신생아 때는 옷장 대신 쓸 수 있어'},
    {nm:'천기저귀 (교체용)', brands:'무루 · 밤부베베'},
    {nm:'기저귀갈이대', brands:'소베맘', deal:'81,310원', carrot:true, prep:true, note:'고민하다 안 샀는데, 수납장으로 대신하니 딱히 아쉽진 않아!'},
    {nm:'기저귀정리함', need:'1개', note:'기저귀갈이대가 있다면 필수는 아니야'},
    {nm:'방수커버', brands:'포몽드 · 마리데'},
    {nm:'기저귀쓰레기통', brands:'매직캔', deal:'47,710원'},
  ]},
  { nm:'침구류', emoji:'🛏️', items:[
    {nm:'아기침대', brands:'리안 · 이케아 · 스토케', deal:'18만원대', carrot:true, prep:true, note:'원목·휴대용 등 다양하니 취향대로 — 나는 아직 이동식 쓰고 있어!'},
    {nm:'이불세트', brands:'포몽드', prep:true},
    {nm:'블랭킷', brands:'아뜰리에슈', prep:true, note:'신생아 땐 천기저귀를 블랭킷 대용으로도 쓸 수 있어'},
    {nm:'두상베개', brands:'라비킷', deal:'39,800원', need:'1~2개', note:'두상 때문에 필요하다는데 사실 잘 베고 자진 않아ㅜ'},
    {nm:'방수요', need:'3~4개', note:'생각보다 소변이 자주 새서 침대랑 기저귀갈이대에 깔기 필수'},
    {nm:'역류방지쿠션', carrot:true, need:'1개', note:'당근에서 살 땐 숨 안 죽은 걸로 잘 고르기! 첫만남이용권 사용 가능해'},
    {nm:'바운서', carrot:true, need:'1개', note:'종류 많고 아기 취향 타서 새제품보다 당근 추천! 우리 아긴 잘 써'},
    {nm:'쿨매트', need:'1~2개', note:'여름 아니어도 아기가 더워할 수 있어 — 많이 울다 보면 땀이 많이 나'},
    {nm:'옆눕베개', need:'1개', note:'아기 취향을 탈 수 있어서 고민해보고 사야 해'},
  ]},
  { nm:'외출용품', emoji:'🚗', items:[
    {nm:'겉싸개', brands:'워낙 다양', carrot:true, need:'1~2개', note:'겨울엔 접종하러 갈 때 필수더라!'},
    {nm:'카시트', brands:'브라이텍스 · 다이치 · 맥시코시 · 조이 등', note:'생후 한 달간은 바구니 카시트 추천'},
    {nm:'바구니카시트', carrot:true},
    {nm:'아기띠 · 힙시트', brands:'포그내 · 코니 · 아이엔젤 · 베이비뵨 등', carrot:true, note:'신생아 시기 이후에 많이 쓰는 편이야!'},
    {nm:'슬링', need:'1개', note:'신생아 시기에만 쓰지만 많이들 쓴대 — 고민 중이야'},
    {nm:'유모차', brands:'오이스터3 · 에그2 · 오르빗 · 부가부 등', carrot:true, note:'6개월 전까지는 디럭스나 절충형 추천'},
    {nm:'유모차패드'},
    {nm:'쿨시트 · 웜시트'},
    {nm:'휴대용 방수패드'},
    {nm:'유모차커버 (방풍 · 레인 등)'},
    {nm:'보틀워머'},
    {nm:'일회용젖병', brands:'마더케이 · 유미'},
    {nm:'휴대용 분유포트', brands:'보아르', deal:'4만원대'},
    {nm:'휴대용 쪽쪽이 소독기', brands:'픽셀 · 모윰', carrot:true},
  ]},
  { nm:'발달 · 기타', emoji:'🧸', items:[
    {nm:'모빌 (타이니 등)', carrot:true, need:'1개', note:'새제품 10만원대, 당근이면 3만원 정도 — 첫만남이용권으로 샀어!'},
    {nm:'초점책', need:'1개'},
    {nm:'아기체육관', need:'1개', note:'애바애라 잘 안 노는 아가도 있어ㅜ'},
    {nm:'비타민D', note:'엄마 선택사항 — 필수로 안 먹여도 돼요'},
    {nm:'유산균', note:'엄마 선택사항 — 필수로 안 먹여도 돼요'},
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
    <div class="rc"><h3>선배맘 준비물 시트 2종 병합</h3>
    <p>공유용 시트(2025)의 브랜드·핫딜가에 선배맘 실사용 리스트의 필요 개수·경험담을 합쳤어요. 🥕 표시는 중고(당근) 추천 — 가격은 시세 참고용!</p></div>
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
  if(it.need)   badges += `<span class="badge need">📦 ${it.need}</span>`;
  if(it.brands) badges += `<span class="badge brand">🏷️ ${it.brands}</span>`;
  if(it.deal)   badges += `<span class="badge price">💰 ${it.deal}</span>`;
  if(it.carrot) badges += `<span class="badge carrot">🥕 당근 추천</span>`;

  const qty = sheetQty[id]||0;
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      <div class="chk"></div>
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${it.note?`<div class="item-guide">💬 ${it.note}</div>`:''}
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
