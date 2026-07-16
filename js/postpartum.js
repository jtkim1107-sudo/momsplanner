// ============================================================
// 소행성 육아플래너 — 조리원 · 출산가방 준비물
// ------------------------------------------------------------
// 산후조리원 · 병원에 들고 갈 짐 리스트. 같은 엔진(체크 · 결론 ·
// 브랜드칩 · 별똥별) 재사용.
// ⚠️ 기준은 '판정' — 원자료 = 판정 데이터 + 체험단 리뷰. 아래 공유
// 리스트 3종은 초기 부트스트랩용 후보 풀(학습 자료). 병합된 자료:
//  · 조리원동기맘 · 산후8주맘 (기존)
//  · 남편찬스맘 — 스레드 "꼼꼼한 남편이 챙겨준 출산 가방 리스트"
//  · 기록왕맘 — 스레드 "내가 산거/선물받은거 리스트 기록"
// 조리원마다 제공 품목이 달라 "제공 여부 확인" 안내가 많다.
// ============================================================

const POSTPARTUM_CATEGORIES = [
  { nm:'산후 케어', emoji:'🩸', items:[
    {nm:'오버나이트 생리대 (입오버)', min:true, brands:'소피 · 유한킴벌리', ops:[
      {who:'남편찬스맘', verdict:'추천', txt:'오버나이트로, 대형도 챙기면 좋대요'},
      {who:'기록왕맘', buy:'소피 특대형', txt:'오로 많은 초반엔 입는 오버나이트가 편해'}]},
    {nm:'산모 안심팬티 · 팬티라이너', min:true, brands:'디팬드 · 좋은느낌', ops:[
      {who:'남편찬스맘', buy:'디팬드 맘스안심팬티'},
      {who:'산후8주맘', verdict:'추천', txt:'오로 때문에 넉넉히 — 버리면 되니 편해'}]},
    {nm:'산후복대 · 골반 밴드', ops:[
      {who:'산후8주맘', verdict:'쏘쏘', txt:'조리원에서 관리 받기도 하고 사람마다 갈려'},
      {who:'기록왕맘', txt:'제왕이면 필수 — 자연분만도 허리 잡아줘서 챙겼어'}]},
    {nm:'압박스타킹', ops:[
      {who:'기록왕맘', verdict:'추천', buy:'처방 압박스타킹', txt:'부종엔 병원 처방 압박스타킹이 제일'},
      {who:'남편찬스맘', txt:'양말이랑 같이 가방에'}]},
    {nm:'손목 보호대', carrot:true, brands:'언더렉스', ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'수유·안기 반복하면 산후 손목통증 급증'},
      {who:'남편찬스맘', buy:'언더렉스'}]},
    {nm:'도넛방석 (회음부)', ops:[
      {who:'산후8주맘', verdict:'쏘쏘', txt:'조리원에서 주기도 하니 확인하고'}]},
    {nm:'좌욕기 (제공 확인)', ops:[
      {who:'조리원동기맘', txt:'대부분 비치 — 개인 지참 전에 꼭 확인'}]},
    {nm:'붓기차', brands:'비너수', ops:[
      {who:'기록왕맘', buy:'비너수', txt:'미역국에 붓기차 조합으로 부종 뺐어'}]},
    {nm:'튼살크림', ops:[
      {who:'남편찬스맘', txt:'출산 후에도 꾸준히 발라야 한대요'}]},
    {nm:'산모 영양제 (철분·칼마디·유산균)', min:true, ops:[
      {who:'남편찬스맘', buy:'차병원 닥터프로그램', txt:'산모영양제에 엄마유산균까지'},
      {who:'기록왕맘', txt:'철분·칼마디·유산균 임신 때 먹던 거 이어서'}]},
    {nm:'마이비데 · 비데티슈', min:true, brands:'크리넥스 · 베베숲', ops:[
      {who:'호호마더', verdict:'추천', buy:'크리넥스 마이비데'},
      {who:'기록왕맘', buy:'베베숲 비데티슈'}]},
    {nm:'소독티슈 · 소독수', brands:'마더케이 · 소독하는아이', ops:[
      {who:'기록왕맘', buy:'마더케이 소독티슈 · 소독하는아이 소독수'}]},
  ]},
  { nm:'수유 용품', emoji:'🤱', items:[
    {nm:'수유패드', brands:'더블하트 · 마더케이 · 메델라', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'젖 새는 시기 — 조리원부터 바로 필요'},
      {who:'남편찬스맘', buy:'더블하트 컴포트필'},
      {who:'기록왕맘', buy:'마더케이'}]},
    {nm:'유두보호크림 (란시놀)', brands:'라시놀 · 멀티맘', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', buy:'라시놀', txt:'수유 초기 상처엔 이게 진짜 필수'},
      {who:'기록왕맘', buy:'란시노크림 · 카보크림(모유사)'}]},
    {nm:'모유저장팩 · 네임펜', brands:'스펙트라', ops:[
      {who:'남편찬스맘', buy:'스펙트라', txt:'네임펜으로 유축 날짜 적어서 — 조리원 필수'}]},
    {nm:'양배추 가슴팩 (울혈 케어)', brands:'닥터캐비지', ops:[
      {who:'남편찬스맘', verdict:'추천', buy:'닥터캐비지', txt:'울혈 올 때 신세계 — 마스크팩·쿨링볼 라인도 있어'}]},
    {nm:'가슴찜질팩', brands:'튼튼맘스', ops:[
      {who:'남편찬스맘', buy:'튼튼맘스'},
      {who:'기록왕맘', buy:'튼튼맘스', txt:'두 리스트에 다 있는 검증템'}]},
    {nm:'수유나시 · 수유브라', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'와이어 없는 걸로 — 젖 도는 시기엔 조이면 아파'},
      {who:'조리원동기맘', verdict:'비추', txt:'사이즈 변해서 미리 많이 사면 손해, 2개만'},
      {who:'남편찬스맘', txt:'수유나시는 기타 가방에 챙겼어요'}]},
    {nm:'젖병세척 브러쉬 · 세제', brands:'더블하트', ops:[
      {who:'남편찬스맘', buy:'더블하트 스펀지 브러쉬 세트', txt:'조리원에서 유축기 부품 씻을 때'}]},
  ]},
  { nm:'아기 용품', emoji:'👶', items:[
    {nm:'배냇저고리', min:true, ops:[
      {who:'남편찬스맘', txt:'조리원 제공 있지만 퇴소·사진용 1~2벌'},
      {who:'기록왕맘', txt:'아기준비물 1순위'}]},
    {nm:'속싸개', min:true, brands:'밤부베베 · 벨몽', ops:[
      {who:'산후8주맘', txt:'조리원 대부분 제공 — 개인용 원하면 소량만'},
      {who:'기록왕맘', buy:'밤부베베 · 벨몽'}]},
    {nm:'손발싸개 · 아기모자', ops:[
      {who:'남편찬스맘', txt:'체온 조절 못 하는 신생아 필수 3종'}]},
    {nm:'겉싸개 · 블랭킷', min:true, brands:'아뜰리에슈 · 벨몽', ops:[
      {who:'남편찬스맘', buy:'아뜰리에슈 블랭킷', txt:'겉싸개 대용으로 블랭킷 활용'},
      {who:'기록왕맘', buy:'벨몽 · 아뜰리에슈', txt:'겉싸개는 조리원에서 받았어'}]},
    {nm:'거즈손수건', min:true, brands:'밤부베베 · 밍크엘레팡', ops:[
      {who:'남편찬스맘', buy:'밤부베베'},
      {who:'기록왕맘', buy:'밤부베베 · 밍크엘레팡', txt:'엠보손수건도 같이 — 많을수록 좋아'}]},
    {nm:'아기물티슈', ops:[
      {who:'남편찬스맘', txt:'퇴소 이동 중에도 계속 찾게 돼요'}]},
    {nm:'기저귀크림 · 비판텐', brands:'무스텔라 · 비판텐', ops:[
      {who:'남편찬스맘', buy:'무스텔라'},
      {who:'기록왕맘', txt:'비판텐 하나로 발진·상처 다 커버'}]},
    {nm:'아기로션', brands:'세타필', ops:[
      {who:'남편찬스맘', buy:'세타필 베이비'}]},
    {nm:'배꼽소독약 · 신생아면봉', brands:'마더케이', ops:[
      {who:'기록왕맘', buy:'마더케이', txt:'배꼽 떨어질 때까지 매일 소독'}]},
    {nm:'흑백초점책', brands:'라운드그라운드', ops:[
      {who:'남편찬스맘', txt:'MY FIRST LOVE 초점책 챙김'},
      {who:'기록왕맘', buy:'라운드그라운드', txt:'조리원에서부터 보여줬어'}]},
    {nm:'애착인형 · 디데이달력', ops:[
      {who:'남편찬스맘', txt:'애착인형은 미리 안고 자서 냄새 배게'},
      {who:'기록왕맘', txt:'디데이달력은 신생아 사진 소품으로 최고'}]},
    {nm:'아기 퇴원복 (계절 확인)', ops:[
      {who:'조리원동기맘', txt:'조리원 이동·퇴원 때 — 계절 확인'}]},
  ]},
  { nm:'엄마 의류 · 세면', emoji:'👚', items:[
    {nm:'수유 잠옷 · 수유복', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'앞트임 필수 — 조리원복 주지만 면회·외출용으로 2벌'}]},
    {nm:'실내 슬리퍼 (아치형)', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'세면장·복도용 — 미끄럼 없는 걸로'},
      {who:'남편찬스맘', buy:'아치슬리퍼', txt:'푹신한 것보다 몸 균형 잡아주는 슬리퍼가 좋대요'}]},
    {nm:'세면도구 · 가글', ops:[
      {who:'산후8주맘', txt:'조리원 비치 여부 확인하고 부족한 것만 챙겨'},
      {who:'기록왕맘', txt:'가글은 새벽 수유 콜 때 은근 유용'}]},
    {nm:'개인 수건 2~3장', ops:[
      {who:'산후8주맘', txt:'조리원 제공하지만 머리 감을 때 개인용 있으면 편해'}]},
    {nm:'기초화장품 · 마스크팩', ops:[
      {who:'남편찬스맘', txt:'회복하면서 셀프케어 — 마스크팩 몇 장'}]},
    {nm:'드라이샴푸 · 샤워티슈', brands:'깨끄타월', ops:[
      {who:'기록왕맘', buy:'깨끄타월 샤워티슈', txt:'머리 못 감는 날 구세주'}]},
    {nm:'머리끈', ops:[
      {who:'남편찬스맘', txt:'안 챙기면 제일 아쉬운 1위 — 수유할 때 머리 묶어야 해요'}]},
    {nm:'마스크 (KF-AD)', ops:[
      {who:'남편찬스맘', buy:'에버렉스 KF-AD', txt:'신생아실 오갈 때'}]},
    {nm:'수면양말 · 무압박양말', ops:[
      {who:'산후8주맘', verdict:'추천', txt:'산후엔 발이 유독 시려'},
      {who:'기록왕맘', txt:'무압박 양말로 — 발목 조이면 부종 자국 나'}]},
    {nm:'카디건 · 수유 가운', ops:[
      {who:'조리원동기맘', txt:'수유실·면회 때 걸치기 좋아'}]},
    {nm:'임부복 바지 (퇴소용)', ops:[
      {who:'남편찬스맘', txt:'입고 온 임부복이 퇴소 때도 제일 편해요'}]},
  ]},
  { nm:'편의 · 전자', emoji:'🔌', items:[
    {nm:'고속충전기 (롱케이블 2m+)', brands:'벨킨 · 삼성', min:true, ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'침대 콘센트가 멀어 — 짧으면 누워서 폰 못 봐'},
      {who:'남편찬스맘', buy:'고속충전기'}]},
    {nm:'멀티탭', ops:[
      {who:'남편찬스맘', txt:'콘센트 부족 — 두 리스트에 다 등장한 은근 필수템'},
      {who:'기록왕맘', txt:'유축기·충전기·가습기 꽂을 데가 없어'}]},
    {nm:'텀블러 · 꺾이는 빨대', min:true, ops:[
      {who:'산후8주맘', verdict:'추천', txt:'수유 중 손 안 대고 물 마시기 — 부종 빼려면 물 많이'},
      {who:'남편찬스맘', txt:'텀블러에 꺾이는 빨대 조합'}]},
    {nm:'가습기 · 습도계', brands:'휴비딕', ops:[
      {who:'남편찬스맘', buy:'휴비딕 습도계', txt:'조리원 방이 건조해서 미니 가습기까지'}]},
    {nm:'다리마사지기', ops:[
      {who:'남편찬스맘', verdict:'쏘쏘', txt:'있으면 호강인데 부피 커서 호불호'}]},
    {nm:'안대 · 귀마개', ops:[
      {who:'조리원동기맘', verdict:'추천', txt:'신생아실 맡기고 잘 때 숙면템 — 이때 못 자면 회복 늦어'}]},
    {nm:'간식 · 비상식량', ops:[
      {who:'조리원동기맘', txt:'새벽 수유 후 출출할 때 — 견과·초콜릿 등'}]},
    {nm:'개인 베개', ops:[
      {who:'기록왕맘', txt:'베개 바뀌면 못 자는 사람은 꼭 챙겨'}]},
  ]},
  { nm:'서류 · 확인', emoji:'📋', items:[
    {nm:'산모수첩 · 신분증 · 지갑', min:true, ops:[
      {who:'조리원동기맘', txt:'입소·진료 시 필요'},
      {who:'기록왕맘', txt:'지갑에 신분증 꼭 — 서류 뗄 일 많아'}]},
    {nm:'출생신고 서류 미리 챙기기', ops:[
      {who:'산후8주맘', txt:'조리원에 있는 동안 준비해두면 나와서 편해'}]},
    {nm:'유축기 (제공 · 대여 확인)', ops:[
      {who:'조리원동기맘', txt:'대부분 대여 비치 — 개인 깔때기 세트만 챙기면 돼'}]},
    {nm:'조리원 제공품 미리 확인', ops:[
      {who:'산후8주맘', txt:'속싸개·좌욕기·유축기·드라이어 — 전화 한 통이면 짐 반으로 줄어'}]},
  ]},
];

// ---- 상태 ----
const PP_CHK_KEY = 'sohaengseong-postpartum-checked';
const PP_QTY_KEY = 'sohaengseong-postpartum-qty';
const PP_MODE_KEY = 'sohaengseong-pp-mode';
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

// 출산 리스트와 동일한 구조 — 🏨 스탠다드(담기) ↔ 내 리스트(체크·기록)
let ppMode = 'std';
try{
  const m = localStorage.getItem(PP_MODE_KEY);
  if(m==='std'||m==='mine') ppMode = m;
}catch(e){}
function setPpMode(m){
  if(ppMode===m) return;
  ppMode = m; ppFilter = false;
  try{ localStorage.setItem(PP_MODE_KEY, m); }catch(e){}
  renderPostpartum();
}
let ppFilter = false;
function togglePpFilter(){ ppFilter = !ppFilter; renderPostpartum(); }
function ppMine(id){ return ppChecked.has(id) || myPlans[id]==='buy' || myPlans[id]==='carrot'; }
function ppItemDone(id){ return ppMode==='std' ? !!myPlans[id] : ppChecked.has(id); }

function ppTotals(){
  let total=0, done=0, mine=0;
  POSTPARTUM_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = ppItemId(ci,ii);
    if(ppMine(id)) mine++;
    if(ppMode==='mine' && !ppMine(id)) return;
    total++; if(ppItemDone(id)) done++;
  }));
  return {total, done, mine};
}
function ppCatCount(ci){
  let total=0, done=0;
  POSTPARTUM_CATEGORIES[ci].items.forEach((it,ii)=>{
    const id = ppItemId(ci,ii);
    if(ppMode==='mine' && !ppMine(id)) return;
    total++; if(ppItemDone(id)) done++;
  });
  return {total, done};
}

function renderPostpartum(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  const cnt = ppTotals();
  const totalAll = POSTPARTUM_CATEGORIES.reduce((a,c)=>a+c.items.length,0);

  // 여정 스텝바 — 담기 → 챙기기 (토글 대체)
  const mt = document.createElement('div');
  mt.className='journey';
  mt.id='journey';
  mt.innerHTML = journeyHtml(ppJourney());
  area.appendChild(mt);

  const intro = document.createElement('div');
  if(ppMode==='std'){
    intro.className='ss-card';
    intro.innerHTML = `
      <span class="ss-star">🏨</span>
      <div class="ss-over">SOHAENGSEONG STANDARD</div>
      <h3>조리원 · 출산가방</h3>
      <p>선배맘 판정으로 확정된 <b>출산가방 판정템 기준표</b>예요.<br>판정 결과 확인하고 <b>담기만 누르면</b> 내 가방 리스트 완성!</p>
      <div class="ss-chips"><span>판정템 ${totalAll}</span><span>원자료: 판정 데이터</span><span>+ 체험단 리뷰</span></div>
      <button class="ss-what" onclick="openStdAbout()">스탠다드가 뭐예요? ›</button>
    `;
  }else{
    intro.className='region-card';
    intro.style.cursor='default';
    intro.innerHTML = `
      <span class="ri">🧳</span>
      <div class="rc"><h3>내 출산가방</h3>
      <p>담은 것들이에요. <b>가방에 넣으면 체크</b>, 산 건 기록까지 — 생각이 바뀐 건 여기서 패스. "제공 확인" 항목은 조리원에 먼저 물어보세요!</p></div>
    `;
  }
  area.appendChild(intro);

  // 👉 다음 할 일 카드
  const nx = ppNextInfo();
  if(nx){
    const fb = document.createElement('div');
    fb.className = 'next-card';
    fb.id = 'next-card';
    fb.innerHTML = nextCardHtml(nx);
    area.appendChild(fb);
  }

  let shown = 0;
  POSTPARTUM_CATEGORIES.forEach((cat,ci)=>{
    const list = [];
    cat.items.forEach((it,ii)=>{
      const id = ppItemId(ci,ii);
      if(ppFilter && ppItemDone(id)) return;
      if(ppMode==='mine' && !ppMine(id)) return;
      list.push([it,ii]);
    });
    if(!list.length) return;
    shown++;
    const {total, done} = ppCatCount(ci);
    const gEl = document.createElement('div'); gEl.className='group';
    const chip = (total>0 && done===total)
      ? '<span class="deadline done">완료 ✓</span>'
      : '<span class="deadline info">준비 중</span>';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3>${chip}<span class="gprog" id="ppp-${ci}">${done}/${total}</span></div>
      <div class="group-items" id="ppi-${ci}"></div>
    `;
    const holder = gEl.querySelector('#ppi-'+ci);
    list.forEach(([it,ii])=> holder.appendChild(renderPostpartumItem(it,ci,ii)));
    area.appendChild(gEl);
  });
  if(!shown && ppMode==='mine'){
    const empty = document.createElement('div');
    empty.className='collect-box';
    empty.innerHTML='<b>아직 출산가방이 비어 있어요</b>조리원 스탠다드에서 담기를 누르면 여기 모여요.';
    area.appendChild(empty);
  }
  // 📚 완성된 스탠다드 카탈로그 — 다음 리스트로 이어가기
  if(ppMode==='std' && typeof stdCatalogHtml==='function'){
    const sc = document.createElement('div');
    sc.className='std-cat';
    sc.innerHTML = stdCatalogHtml('postpartum');
    area.appendChild(sc);
  }
  updatePostpartumProgress();
}

function renderPostpartumItem(it,ci,ii){
  const id = ppItemId(ci,ii);
  const el = document.createElement('div');
  // 체크(챙겼어요) 표시는 내 가방에서만 — 스탠다드는 답만 보여주는 곳
  el.className = 'item' + (ppMode==='mine' && ppChecked.has(id)?' checked':'');

  // 배지는 결론(2종) + 판정 규모 + 개수만
  let badges='';
  const rawC = sheetConclusion(it);
  const concl = displayConclusion(it);
  if(concl) badges += `<span class="badge concl ${concl.k}">${concl.label}</span>`;
  badges += verdictBadge(it, id);
  if(it.need) badges += `<span class="badge need">${it.need}</span>`;

  const showChk = ppMode==='mine';
  const ops = it.ops||[];
  const ppFeed = (typeof verdictFeedFor==='function') ? verdictFeedFor(it) : null;

  // 상세 채우기 (공용)
  const fillMore = (moreEl, pre)=>{
    if(moreEl.dataset.filled) return;
    moreEl.dataset.filled = '1';
    if(pre) moreEl.insertAdjacentHTML('beforeend', pre);
    if(ppFeed){ moreEl.insertAdjacentHTML('beforeend', feedDetailHtml(ppFeed)); }
    else{
      const sv = (typeof simVerdict==='function') ? simVerdict(it, id) : null;
      if(sv) moreEl.insertAdjacentHTML('beforeend', verdictPieHtml(sv, {src:'베타 · 판정 규모 기반 재현, 실판정 쌓이면 대체'}));
      else if(typeof unlockHtml==='function') moreEl.insertAdjacentHTML('beforeend', unlockHtml(simCollectN(id)));
      moreEl.insertAdjacentHTML('beforeend', brandRankHtml(it, id));
    }
    if(ops.length){
      const od = document.createElement('div');
      od.className = 'more-ops';
      od.innerHTML = opsHtml(it, id, 999);
      moreEl.appendChild(od);
    }
  };

  if(ppMode==='std'){
    // 스캔되는 한 줄 리스팅: 이름 + 결론 태그 + ＋담기
    el.innerHTML = `
      <div class="item-main slim">
        <div class="item-info">
          <div class="item-name">${it.nm}</div>
          <div class="item-tags">${concl?`<span class="badge concl ${concl.k}">${concl.label}</span>`:''}${faceBadges(it, id)}</div>
        </div>
        <button class="add-mini ${myPlans[id]?'on':''}" title="내 가방에 담기">${myPlans[id]?'✓':'＋'}</button>
        <span class="item-caret">﹀</span>
      </div>
      <div class="item-more"></div>
    `;
    const moreEl = el.querySelector('.item-more');
    const expandBadges = verdictBadge(it, id) + (it.need?`<span class="badge need">${it.need}</span>`:'');
    const pre = `<div class="more-top">${expandBadges?`<div class="item-badges">${expandBadges}</div>`:''}${opsHtml(it, id, 1, true)}</div>`;
    el.querySelector('.item-main').addEventListener('click', ()=>{
      const open = el.classList.toggle('open');
      if(open) fillMore(moreEl, pre);
    });
    const mini = el.querySelector('.add-mini');
    mini.addEventListener('click', e=>{
      e.stopPropagation();
      if(myPlans[id]) delete myPlans[id];
      else myPlans[id] = (rawC && rawC.k==='carrot') ? 'carrot' : 'buy';
      saveStars();
      mini.classList.toggle('on', !!myPlans[id]);
      mini.textContent = myPlans[id] ? '✓' : '＋';
      checkPlanComplete('postpartum');
      ppRefreshHeads();
    });
    return el;
  }

  // 내 가방 — 체크 + 새것/중고/패스 + 구매 기록
  const hasMore = ops.length || !!ppFeed || !!brandRankFor(it, id);
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      ${showChk?'<div class="chk"></div>':''}
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${badges?`<div class="item-badges">${badges}</div>`:''}
        ${opsHtml(it, id, 1, true)}
      </div>
      ${hasMore?'<span class="item-caret">﹀</span>':''}
    </div>
    ${hasMore?'<div class="item-more"></div>':''}
  `;
  const moreEl = el.querySelector('.item-more');
  if(moreEl){
    el.querySelector('.item-main').addEventListener('click', ()=>{
      const open = el.classList.toggle('open');
      if(open) fillMore(moreEl);
    });
  }
  if(myPlans[id]==='pass') el.classList.add('passed');
  el.appendChild(planRowEl(id, 'postpartum'));
  if(ppChecked.has(id) || myBuys[id]) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
  const chkEl = el.querySelector('.chk');
  if(chkEl) chkEl.addEventListener('click',e=>{
    e.stopPropagation();
    const now = !ppChecked.has(id);
    now ? ppChecked.add(id) : ppChecked.delete(id);
    el.classList.toggle('checked');
    savePostpartum();
    if(now){
      earnStars(5, '조리원 준비물 체크', 'chk-'+id);
      if(!el.querySelector('.buy-row')) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
    }else if(!myBuys[id]){
      const br = el.querySelector('.buy-row'); if(br) br.remove();
    }
    ppRefreshHeads(ci);
  });
  return el;
}

// 🧭 여정 (조리원) — 담기 → 챙기기
function ppJourney(){
  let total=0, planned=0;
  const ids=[];
  POSTPARTUM_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = ppItemId(ci,ii);
    total++; if(myPlans[id]) planned++;
    if(ppMine(id)) ids.push(id);
  }));
  const unchecked = ids.filter(id=>!ppChecked.has(id)).length;
  const s1 = total>0 && planned===total;
  const s2 = s1 && ids.length>0 && unchecked===0;
  const cur = !s1 ? 1 : unchecked>0 ? 2 : 2;
  return {steps:[{n:1,ic:'🧳',t:'담기'},{n:2,ic:'✅',t:'챙기기'}], done:[s1,s2], cur};
}

// 👉 다음 할 일 계산 (조리원)
function ppNextInfo(){
  if(ppMode==='std'){
    const todos = [];
    POSTPARTUM_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
      if(!myPlans[ppItemId(ci,ii)]) todos.push(it.nm);
    }));
    if(todos.length) return {
      title:`안 담은 것 <b>${todos.length}개</b> — 판정 보고 담기만 하면 끝`,
      nudge: todos.length>3 ? todos.slice(0,3) : null,
      btn: ppFilter ? '전체 보기' : '모아 보기', act:'togglePpFilter()',
    };
    ppFilter = false;
    return {title:'가방 리스트 완성! 이제 하나씩 챙겨요 🧳', btn:'내 가방으로', act:"setPpMode('mine')"};
  }
  const ids = [];
  POSTPARTUM_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = ppItemId(ci,ii);
    if(ppMine(id)) ids.push(id);
  }));
  if(!ids.length){ ppFilter = false; return null; }
  const unchecked = ids.filter(id=>!ppChecked.has(id)).length;
  if(unchecked) return {
    title:`가방에 넣을 것 <b>${unchecked}개</b> — 챙기면 바로 체크!`,
    btn: ppFilter ? '전체 보기' : '남은 것만', act:'togglePpFilter()',
  };
  ppFilter = false;
  return {title:'출산가방 완성! 이제 몸만 가면 돼요 🎉', btn:null};
}

// 진행률 · 카테고리 카운트 · 다음 할 일 카드 갱신
function ppRefreshHeads(){
  updatePostpartumProgress();
  POSTPARTUM_CATEGORIES.forEach((c,ci)=>{
    const gp = document.getElementById('ppp-'+ci);
    if(gp){ const cc = ppCatCount(ci); gp.textContent = cc.done+'/'+cc.total; }
  });
  const fb = document.getElementById('next-card');
  if(fb){
    const nx = ppNextInfo();
    if(nx) fb.innerHTML = nextCardHtml(nx);
    else fb.remove();
  }
  const jn = document.getElementById('journey');
  if(jn) jn.innerHTML = journeyHtml(ppJourney());
}

function updatePostpartumProgress(){
  const {total, done} = ppTotals();
  if(ppMode==='std'){
    document.getElementById('prog-name').textContent = '조리원 스탠다드';
    document.getElementById('prog-text').textContent = done+' / '+total+' 담았어요';
  }else{
    document.getElementById('prog-name').textContent = '조리원 · 내 가방';
    document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  }
  document.getElementById('prog-fill').style.width = (total?done/total*100:0)+'%';
}
