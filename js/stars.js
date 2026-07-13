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

let stars = 0;
let starOnce = new Set();   // 1회성 적립 중복 방지 키
let starLog = [];           // 최근 적립 내역
let myVerdicts = {};        // {itemId: '사요'|'마요'} — 내가 남긴 판정
try{
  stars = +localStorage.getItem(STAR_KEY) || 0;
  const o = localStorage.getItem(STAR_ONCE_KEY); if(o) starOnce = new Set(JSON.parse(o));
  const l = localStorage.getItem(STAR_LOG_KEY);  if(l) starLog = JSON.parse(l);
  const v = localStorage.getItem(MY_VERDICT_KEY); if(v) myVerdicts = JSON.parse(v);
}catch(e){}
function saveStars(){
  try{
    localStorage.setItem(STAR_KEY, stars);
    localStorage.setItem(STAR_ONCE_KEY, JSON.stringify([...starOnce]));
    localStorage.setItem(STAR_LOG_KEY, JSON.stringify(starLog.slice(0,30)));
    localStorage.setItem(MY_VERDICT_KEY, JSON.stringify(myVerdicts));
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
