// ============================================================
// 소행성 육아플래너 — 별똥별 (활동 보상 포인트)
// ------------------------------------------------------------
// 데이터가 되는 활동에 별똥별을 준다. 체크(준비율) · 다시 산다면?
// 판정(사요/마요 핵심 데이터) · 한마디(맥락) · 제보(정보 갱신).
// 기여가 "부탁"이 아니라 사용의 부산물 + 보상이 되게 하는 장치.
// ============================================================

const STAR_KEY = 'sohaengseong-stars';
const STAR_ONCE_KEY = 'sohaengseong-star-once';
const STAR_LOG_KEY = 'sohaengseong-star-log';
const MY_VERDICT_KEY = 'sohaengseong-my-verdicts';
const MY_BUY_KEY = 'sohaengseong-my-buys';
const MY_PLAN_KEY = 'sohaengseong-my-plans';

let stars = 0;
let starOnce = new Set();   // 1회성 적립 중복 방지 키
let starLog = [];           // 최근 적립 내역
let myVerdicts = {};        // {itemId: '사요'|'마요'} — 내가 남긴 판정
let myBuys = {};            // {itemId: {b:'브랜드·제품', ch:'구매 경로'}} — 내가 뭘 샀는지
let myPlans = {};           // {itemId: 'buy'|'carrot'|'pass'} — 살 것/당근/패스 내 결정
try{
  stars = +localStorage.getItem(STAR_KEY) || 0;
  const o = localStorage.getItem(STAR_ONCE_KEY); if(o) starOnce = new Set(JSON.parse(o));
  const l = localStorage.getItem(STAR_LOG_KEY);  if(l) starLog = JSON.parse(l);
  const v = localStorage.getItem(MY_VERDICT_KEY); if(v) myVerdicts = JSON.parse(v);
  const b = localStorage.getItem(MY_BUY_KEY); if(b) myBuys = JSON.parse(b);
  const pl = localStorage.getItem(MY_PLAN_KEY); if(pl) myPlans = JSON.parse(pl);
}catch(e){}
function saveStars(){
  try{
    localStorage.setItem(STAR_KEY, stars);
    localStorage.setItem(STAR_ONCE_KEY, JSON.stringify([...starOnce]));
    localStorage.setItem(STAR_LOG_KEY, JSON.stringify(starLog.slice(0,30)));
    localStorage.setItem(MY_VERDICT_KEY, JSON.stringify(myVerdicts));
    localStorage.setItem(MY_BUY_KEY, JSON.stringify(myBuys));
    localStorage.setItem(MY_PLAN_KEY, JSON.stringify(myPlans));
  }catch(e){}
}

function earnStars(amount, reason, onceKey){
  if(onceKey){
    if(starOnce.has(onceKey)) return false;
    starOnce.add(onceKey);
  }
  stars += amount;
  starLog.unshift({a:amount, r:reason});
  saveStars();
  updateStarChip();
  toast(`⭐ 별똥별 +${amount} · ${reason}`);
  return true;
}

function updateStarChip(){
  const el = document.getElementById('star-chip');
  if(el) el.textContent = `⭐ ${stars.toLocaleString()}`;
}

const STAR_RULES = [
  ['준비물 · 아이템 체크', 5],
  ['"다시 산다면?" 판정', 10],
  ['뭘로 샀는지 기록', 15],
  ['리스트 플랜 완성 (리스트당)', 300],
  ['제품 등록 요청', 10],
  ['선배맘 한마디 남기기', 20],
  ['달라진 지역정보 제보', 20],
  ['논쟁템 투표', 30],
  ['구간 준비 전부 완료', 500],
];

function openStarModal(){
  const body = document.getElementById('star-body');
  body.innerHTML = `
    <div class="star-balance">⭐ ${stars.toLocaleString()}<span>모은 별똥별</span></div>
    <div class="detail-label">이렇게 모여요</div>
    <ul class="star-rules">${STAR_RULES.map(r=>`<li><span>${r[0]}</span><b>+${r[1]}</b></li>`).join('')}</ul>
    ${starLog.length ? `<div class="detail-label" style="margin-top:14px">최근 적립</div>
    <ul class="star-rules">${starLog.slice(0,6).map(l=>`<li><span>${l.r}</span><b>+${l.a}</b></li>`).join('')}</ul>` : ''}
    <p class="star-note">내 판정과 경험담이 후배맘의 데이터가 되고,<br>별똥별마켓이 열리면 육아용품 할인으로 바꿀 수 있어요</p>
  `;
  openModal('star-modal');
}

// ---- "다시 산다면?" 1탭 판정 — 체크한(=산) 항목에만 노출 ----
function judgeRowEl(id){
  const div = document.createElement('div');
  div.className = 'judge-row';
  const v = myVerdicts[id];
  if(v){
    div.innerHTML = `내 판정 · <b class="${v==='사요'?'jy':'jn'}">${v}</b> 남겼어요. 후배맘들에게 큰 도움!`;
    return div;
  }
  const q = document.createElement('span');
  q.textContent = '이거, 다시 산다면?';
  div.appendChild(q);
  ['사요','마요'].forEach(lab=>{
    const b = document.createElement('button');
    b.className = 'jbtn ' + (lab==='사요'?'yes':'no');
    b.textContent = lab;
    b.addEventListener('click', e=>{
      e.stopPropagation();
      myVerdicts[id] = lab;
      saveStars();
      earnStars(10, '"다시 산다면?" 판정', 'judge-'+id);
      div.replaceWith(judgeRowEl(id));
    });
    div.appendChild(b);
  });
  return div;
}

// ---- "뭘로 샀어요?" 내 구매 기록 — 브랜드 순위의 원천 데이터 ----
// 유명 브랜드를 칩으로 먼저 제시(표기 통일 → 집계 가능), 없으면 직접 입력.
const BUY_CHANNELS = ['새것', '당근(중고)', '선물받음', '물려받음'];
function purchaseRowEl(id, candidates){
  candidates = candidates || [];
  const div = document.createElement('div');
  div.className = 'judge-row buy-row';
  const rec = myBuys[id];
  if(rec){
    div.innerHTML = `내 구매 · <b class="jy">${rec.b}</b><span class="buy-ch">${rec.ch}</span> — 브랜드 순위에 반영돼요`;
    return div;
  }

  let chosen = null; // 칩에서 고른 브랜드 (직접 입력 시 null)

  const q = document.createElement('div');
  q.className = 'buy-q';
  q.textContent = '뭘로 샀어요?';

  const chips = document.createElement('div');
  chips.className = 'brand-chips';

  const inp = document.createElement('input');
  inp.className = 'buy-inp';
  inp.placeholder = '브랜드 · 제품명 직접 입력';
  inp.maxLength = 40;
  inp.style.display = 'none';
  inp.addEventListener('click', e=>e.stopPropagation());

  function clearSel(){ chips.querySelectorAll('.brand-chip').forEach(x=>x.classList.remove('on')); }

  candidates.forEach(name=>{
    const c = document.createElement('button');
    c.className = 'brand-chip';
    c.textContent = name;
    c.addEventListener('click', e=>{
      e.stopPropagation();
      chosen = name; inp.value=''; inp.style.display='none';
      clearSel(); c.classList.add('on');
    });
    chips.appendChild(c);
  });

  const other = document.createElement('button');
  other.className = 'brand-chip other';
  other.textContent = candidates.length ? '＋ 직접 입력' : '＋ 브랜드 입력';
  other.addEventListener('click', e=>{
    e.stopPropagation();
    chosen = null; clearSel(); other.classList.add('on');
    inp.style.display=''; inp.focus();
  });
  chips.appendChild(other);

  const ctrl = document.createElement('div');
  ctrl.className = 'buy-ctrl';
  const sel = document.createElement('select');
  sel.className = 'buy-sel';
  BUY_CHANNELS.forEach(c=>{ const o=document.createElement('option'); o.textContent=c; sel.appendChild(o); });
  sel.addEventListener('click', e=>e.stopPropagation());
  const btn = document.createElement('button');
  btn.className = 'jbtn save';
  btn.textContent = '남기기';
  btn.addEventListener('click', e=>{
    e.stopPropagation();
    const b = chosen || inp.value.trim();
    if(!b){ toast('브랜드를 고르거나 직접 적어주세요'); return; }
    myBuys[id] = {b, ch: sel.value};
    saveStars();
    earnStars(15, '뭘로 샀는지 기록', 'buy-'+id);
    div.replaceWith(purchaseRowEl(id, candidates));
  });
  ctrl.append(sel, btn);

  div.append(q, chips, inp, ctrl);
  return div;
}

// ---- 살 것 / 당근 / 패스 — 항목별 내 결정 ----
// 리스트의 모든 항목을 정하면(플랜 완성) 리스트당 별똥별 +300.
const PLAN_META = [
  {k:'buy',    label:'살 것',   cls:'p-buy'},
  {k:'carrot', label:'당근으로', cls:'p-carrot'},
  {k:'pass',   label:'패스',    cls:'p-pass'},
];
const PLAN_SOURCES = [
  {key:'sheet',      label:'출산',     cats:()=>SHEET_CATEGORIES,      idFn:(ci,ii)=>sheetItemId(ci,ii)},
  {key:'postpartum', label:'조리원',   cats:()=>POSTPARTUM_CATEGORIES, idFn:(ci,ii)=>ppItemId(ci,ii)},
  {key:'daycare',    label:'어린이집', cats:()=>DAYCARE_CATEGORIES,    idFn:(ci,ii)=>dcItemId(ci,ii)},
  {key:'babyfood',   label:'이유식',   cats:()=>BABYFOOD_CATEGORIES,   idFn:(ci,ii)=>bfItemId(ci,ii)},
];
function planListItems(listKey){
  const src = PLAN_SOURCES.find(x=>x.key===listKey);
  if(!src) return [];
  const out=[];
  src.cats().forEach((c,ci)=> c.items.forEach((it,ii)=> out.push({id:src.idFn(ci,ii), nm:it.nm})));
  return out;
}
function checkPlanComplete(listKey){
  const src = PLAN_SOURCES.find(x=>x.key===listKey);
  const items = planListItems(listKey);
  if(src && items.length && items.every(x=>myPlans[x.id])){
    earnStars(300, src.label+' 준비물 플랜 완성', 'plan-done-'+listKey);
  }
}
function planRowEl(id, listKey){
  const div = document.createElement('div');
  div.className = 'plan-row';
  const q = document.createElement('span');
  q.className = 'plan-q';
  q.textContent = '어떻게 할까?';
  div.appendChild(q);
  PLAN_META.forEach(m=>{
    const b = document.createElement('button');
    b.className = 'plan-chip '+m.cls + (myPlans[id]===m.k?' on':'');
    b.textContent = m.label;
    b.addEventListener('click', e=>{
      e.stopPropagation();
      if(myPlans[id]===m.k) delete myPlans[id];   // 다시 누르면 해제
      else myPlans[id] = m.k;
      saveStars();
      div.querySelectorAll('.plan-chip').forEach(c=>c.classList.remove('on'));
      if(myPlans[id]) b.classList.add('on');
      const item = div.closest('.item');
      if(item) item.classList.toggle('passed', myPlans[id]==='pass');
      checkPlanComplete(listKey);
    });
    div.appendChild(b);
  });
  return div;
}
