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
  ['뭘로 샀는지 기록', 15],
  ['리스트 플랜 완성 (리스트당)', 300],
  ['내 똑똑한 리스트 완성 (전부 채우면)', 500],
  ['새 브랜드 · 제품 등록 요청', 10],
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

// ---- "뭘로 샀어요? 얼마에 샀어요?" 내 구매 기록 ----
// 브랜드는 칩 선택 or 자동완성 입력(깜빡해도 앞 글자만 치면 후보 제시),
// 가격은 시세 가이드의 원천 데이터가 된다.
const BUY_CHANNELS = ['새것', '당근(중고)', '선물받음', '물려받음'];

// ---- 등록 브랜드 사전 ----
// 오타로 집계가 깨지지 않도록, 구매 기록은 등록된 브랜드에서 '선택'한다.
// 없는 브랜드는 '등록 요청'으로 저장 → 운영 확인 후 정식 등록되는 흐름.
const BRAND_REGISTRY = [
  // 수유 · 젖병
  '더블하트','헤겐','닥터브라운','모윰','레이퀸','엘리','로열세브르','베베그로우','필립스아벤트','토미티피','유미','마더케이',
  '유팡','픽셀','베이비브레짜','해님','릴리브','보르르','오쿠','보아르','비앤비','프랭클린','스와비넥스','누크','아벤트',
  // 분유 · 이유식
  '압타밀','남양','매일유업','일동후디스','앱솔루트','아이배냇','베베쿡','에디슨','이지피지','마미포포','그라비','락앤락','리치밀','먼치킨','리첼','비앤디','써모스',
  // 스킨 · 위생
  '몽디에스','쁘리마쥬','아토팜','킨더프리제','궁중비책','비판텐','그린핑거','퓨어닷','베베숲','순둥이','브라운','유한킴벌리','노시부','한일','휴비딕','좋은느낌','예지미인','라시놀','멀티맘','메델라','스펙트라','시밀레',
  // 기저귀
  '하기스','팸퍼스','마미포코','군기저귀','페넬로페','매직캔','소베맘','도노도노','코코맘',
  // 목욕
  '슈너글','온다베이비','OK베이비','니스툴그로우','말랑하니','말랑허니','대림바스','힙비','포프베베','밤부베베','무루','한스네이쳐',
  // 침구 · 가구
  '이케아','리안','스토케','뉴나','포몽드','아뜰리에슈','라비킷','쁘리엘르','로토토','엔젤앤비','알프레미오','더스베이비','마더스베이비','소유','포래즈','마리마리','쁘띠라뺑','크래들스윙','포맘스',
  // 이동 · 외출
  '브라이텍스','다이치','맥시코시','조이','싸이벡스','오이스터','에그','오르빗','부가부','잉글레시나','와이업','폴레드','에르고베이비','베이비뵨','포그내','코니','아이엔젤','타보','리틀라이프',
  // 의류 · 잡화
  '유니클로','스칸디맘','러브투드림','위드오가닉','다이소','알리익스프레스','무신사키즈','자라키즈','H&M키즈','마리데','뚜띠뚜띠','알파베베','크록스','나이키','뉴발란스','아기짱','스케이터','일꼬르소','파스텔풍선','스티커팜','오뜨','마이비네임','마이비','사바트','아가짱',
  // 가전 · 기타
  '티피링크','헤이홈','샤오미','벨킨','삼성','LG','발뮤다','휘슬러','해피콜','휴롬','리앙','타이니러브','프롬식스','아카시아봉봉','커틀앤카이드','레드루트','올스테인리스','크리넥스','위닉스','블루에어',
  // 스레드 공유 리스트에서 관측 (남편찬스맘 · 기록왕맘)
  '마더케이','밍크엘레팡','스와들업','스와들미','벨몽','바미블랑','허긴','네츄레메디','케일라가든','클리어잭','바이오가이아',
  '베이비부스트','옥소','꿈비','일리맘','쪼비','뉴코코맘','나리몽','순성','디즈니','하베브릭스','라운드그라운드',
  '소피','비너수','튼튼맘스','깨끄타월','소독하는아이','닥터엔젤','베베스완','무스텔라','세타필','닥터캐비지','언더렉스','디팬드','에버렉스',
];
let _brandDict = null;
function brandDict(){
  if(_brandDict) return _brandDict;
  const set = new Set(BRAND_REGISTRY);
  [typeof SHEET_CATEGORIES!=='undefined' && SHEET_CATEGORIES,
   typeof POSTPARTUM_CATEGORIES!=='undefined' && POSTPARTUM_CATEGORIES,
   typeof DAYCARE_CATEGORIES!=='undefined' && DAYCARE_CATEGORIES,
   typeof BABYFOOD_CATEGORIES!=='undefined' && BABYFOOD_CATEGORIES,
  ].filter(Boolean).forEach(cats=> cats.forEach(c=> c.items.forEach(it=>{
    sheetBrandCandidates(it).forEach(b=> set.add(b));
  })));
  Object.values(myBuys).forEach(r=>{ if(r.b) set.add(r.b); }); // 등록 요청한 브랜드도 노출
  _brandDict = [...set];
  return _brandDict;
}

function purchaseRowEl(id, candidates){
  candidates = candidates || [];
  const div = document.createElement('div');
  div.className = 'judge-row buy-row';
  const rec = myBuys[id];
  if(rec){
    const price = rec.p ? ' · ' + rec.p.toLocaleString() + '원' : '';
    const reqTag = rec.req ? '<span class="buy-ch req">등록 확인 중</span>' : '';
    const head = (rec.ch==='물려받음'||rec.ch==='선물받음') ? '내 기록' : '내 구매';
    div.innerHTML = `${head} · <b class="jy">${rec.b}</b><span class="buy-ch">${rec.ch}${price}</span>${reqTag} — 시세·순위 데이터에 반영돼요`;
    return div;
  }

  let chosen = null; // 칩에서 고른 브랜드 (직접 입력 시 null)

  const isHand = typeof myPlans!=='undefined' && myPlans[id]==='hand'; // 물려받기 플랜은 질문이 다름
  const q = document.createElement('div');
  q.className = 'buy-q';
  q.textContent = isHand ? '뭘 물려받았어요?' : '뭘로 샀어요?';

  const chips = document.createElement('div');
  chips.className = 'brand-chips';

  const inp = document.createElement('input');
  inp.className = 'buy-inp';
  inp.placeholder = '브랜드 검색 — 앞 글자만 치면 나와요';
  inp.maxLength = 40;
  inp.style.display = 'none';
  inp.addEventListener('click', e=>e.stopPropagation());

  // 검색 → 등록된 브랜드에서 선택 (오타 방지: 선택해야 저장돼요)
  let regReq = false; // 미등록 브랜드 등록 요청 여부
  const suggest = document.createElement('div');
  suggest.className = 'brand-suggest';
  suggest.style.display = 'none';
  inp.addEventListener('input', ()=>{
    const v = inp.value.trim();
    chosen = null; regReq = false;
    suggest.innerHTML='';
    if(!v){ suggest.style.display='none'; return; }
    const dict = brandDict();
    const hits = dict
      .filter(b=> b.startsWith(v) || b.includes(v))
      .sort((a,b)=> (b.startsWith(v)?1:0)-(a.startsWith(v)?1:0))
      .slice(0,6);
    hits.forEach(name=>{
      const c = document.createElement('button');
      c.className = 'brand-chip sug';
      c.textContent = name;
      c.addEventListener('click', e=>{
        e.stopPropagation();
        inp.value = name; chosen = name; regReq = false;
        suggest.style.display='none'; suggest.innerHTML='';
      });
      suggest.appendChild(c);
    });
    if(v.length>=2 && !dict.includes(v)){ // 등록 안 된 브랜드 → 등록 요청 경로
      const reg = document.createElement('button');
      reg.className = 'brand-chip reg';
      reg.textContent = `“${v}” 새 브랜드 등록 요청`;
      reg.addEventListener('click', e=>{
        e.stopPropagation();
        chosen = v; regReq = true;
        suggest.style.display='none'; suggest.innerHTML='';
      });
      suggest.appendChild(reg);
    }
    suggest.style.display = suggest.children.length ? 'flex' : 'none';
  });

  function clearSel(){ chips.querySelectorAll('.brand-chip').forEach(x=>x.classList.remove('on')); }

  candidates.forEach(name=>{
    const c = document.createElement('button');
    c.className = 'brand-chip';
    c.textContent = name;
    c.addEventListener('click', e=>{
      e.stopPropagation();
      chosen = name; inp.value=''; inp.style.display='none';
      suggest.style.display='none';
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

  // 얼마에 샀어요?
  const priceInp = document.createElement('input');
  priceInp.className = 'buy-inp price';
  priceInp.placeholder = isHand ? '들인 돈 있으면 (원 · 선택)' : '얼마에 샀어요? (원 · 선택)';
  priceInp.inputMode = 'numeric';
  priceInp.maxLength = 12;
  priceInp.addEventListener('click', e=>e.stopPropagation());
  priceInp.addEventListener('input', ()=>{ // 숫자만 + 천 단위 콤마
    const digits = priceInp.value.replace(/[^\d]/g,'').slice(0,9);
    priceInp.value = digits ? (+digits).toLocaleString() : '';
  });

  const ctrl = document.createElement('div');
  ctrl.className = 'buy-ctrl';
  const sel = document.createElement('select');
  sel.className = 'buy-sel';
  BUY_CHANNELS.forEach(c=>{ const o=document.createElement('option'); o.textContent=c; sel.appendChild(o); });
  if(isHand) sel.value = '물려받음';
  sel.addEventListener('click', e=>e.stopPropagation());
  const btn = document.createElement('button');
  btn.className = 'jbtn save';
  btn.textContent = '남기기';
  btn.addEventListener('click', e=>{
    e.stopPropagation();
    let b = chosen;
    if(!b){ // 타이핑만 하고 선택 안 한 경우 — 정확히 일치하면 인정
      const typed = inp.value.trim();
      if(typed && brandDict().includes(typed)) b = typed;
    }
    if(!b){
      toast(inp.value.trim() ? '목록에서 브랜드를 골라주세요 — 없으면 "등록 요청"을 눌러요' : '브랜드를 골라주세요');
      return;
    }
    const digits = priceInp.value.replace(/[^\d]/g,'');
    const rec = {b, ch: sel.value};
    if(digits) rec.p = +digits;
    if(regReq) rec.req = true;
    myBuys[id] = rec;
    _brandDict = null; // 등록 요청 브랜드도 사전에 노출
    saveStars();
    if(regReq) earnStars(10, '새 브랜드 등록 요청', 'breq-'+b);
    earnStars(15, '구매 기록 (뭘로 · 얼마에)', 'buy-'+id);
    div.replaceWith(purchaseRowEl(id, candidates));
    if(typeof onBuyRecordSaved==='function') onBuyRecordSaved(id);
  });
  ctrl.append(sel, btn);

  div.append(q, chips, inp, suggest, priceInp, ctrl);
  return div;
}

// ---- 살 것 / 당근 / 패스 — 항목별 내 결정 ----
// 리스트의 모든 항목을 정하면(플랜 완성) 리스트당 별똥별 +300.
const PLAN_META = [
  {k:'buy',    label:'새제품 구매', cls:'p-buy'},
  {k:'carrot', label:'당근으로', cls:'p-carrot'},
  {k:'hand',   label:'물려받기', cls:'p-hand'},
  {k:'pass',   label:'패스',    cls:'p-pass'},
];
const PLAN_SOURCES = [
  {key:'sheet',      label:'출산',     cats:()=>SHEET_CATEGORIES,      idFn:(ci,ii)=>sheetItemId(ci,ii), keep:it=>isStd(it)},
  {key:'postpartum', label:'조리원',   cats:()=>POSTPARTUM_CATEGORIES, idFn:(ci,ii)=>ppItemId(ci,ii)},
  {key:'daycare',    label:'어린이집', cats:()=>DAYCARE_CATEGORIES,    idFn:(ci,ii)=>dcItemId(ci,ii)},
  {key:'babyfood',   label:'이유식',   cats:()=>BABYFOOD_CATEGORIES,   idFn:(ci,ii)=>bfItemId(ci,ii)},
];
function planListItems(listKey){
  const src = PLAN_SOURCES.find(x=>x.key===listKey);
  if(!src) return [];
  const out=[];
  src.cats().forEach((c,ci)=> c.items.forEach((it,ii)=>{
    if(src.keep && !src.keep(it)) return; // 출산은 표준 구성 기준으로 플랜 완성 판정
    out.push({id:src.idFn(ci,ii), nm:it.nm});
  }));
  return out;
}
function checkPlanComplete(listKey){
  const src = PLAN_SOURCES.find(x=>x.key===listKey);
  const items = planListItems(listKey);
  if(src && items.length && items.every(x=>myPlans[x.id])){
    if(earnStars(300, src.label+' 준비물 플랜 완성', 'plan-done-'+listKey)){
      babySurprise(src.label+' 준비 플랜', 'baby-plan-'+listKey, 100, 900);
    }
  }
}

// 👶 완성의 순간 — 태명이가 몰래 모아둔 별똥별을 깜짝 선물
function babySurprise(occasion, onceKey, amount, delay){
  const nm = PROFILE.baby || '아기';
  if(!earnStars(amount, nm+'의 깜짝 선물 · '+occasion, onceKey)) return;
  document.getElementById('baby-title').textContent = `${nm}의 깜짝 선물이 도착했어요!`;
  document.getElementById('baby-desc').textContent = `"엄마, ${occasion} 다 해줘서 고마워요. 몰래 모아둔 별똥별 드릴게요!" — ${nm} 올림`;
  document.getElementById('baby-reward').textContent = `🌟 별똥별 ${amount}개`;
  setTimeout(()=> document.getElementById('baby-modal').classList.add('on'), delay||600);
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
      if(typeof onPlanChanged==='function') onPlanChanged(listKey);
    });
    div.appendChild(b);
  });
  return div;
}
