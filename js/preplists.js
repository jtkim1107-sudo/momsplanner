// ============================================================
// 소행성 육아플래너 — 공용 리스트 엔진 (산부인과 · 수유 · 이유식 · 어린이집)
// ------------------------------------------------------------
// 조리원과 같은 UX(스탠다드/나의 기록 · 담기 · 체크 · 기록 · 완주 보상)를
// 설정 하나로 굴린다. ⚠️ 기준은 '판정' — 꼭 필요한 판정템만 올린다.
// 실 판정 데이터(엑셀)가 오면 cats만 교체하면 된다.
// ============================================================

const PREP_ENGINE = {
  hospital: {
    emoji:'🏥', title:'출산 전 산부인과 준비물',
    heroNote:'진통 오면 그대로 들고 갈 병원 가방 — 37주쯤엔 현관 앞에 싸두세요',
    bagLabel:'병원 가방', brief:'진통 오면 그대로 들고 갈 가방 — 37주 전에 싸두세요',
    cats:[
      { nm:'서류 · 입원', emoji:'📋', items:[
        {nm:'산모수첩 · 신분증 · 지갑', min:true, ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'입원 수속 1번 — 이것만 있으면 나머진 어떻게든 돼'}]},
        {nm:'입원 서류 · 진찰권 확인', ops:[
          {who:'산후8주맘', verdict:'추천', txt:'병원마다 준비 서류 달라 — 36주 검진 때 물어보세요'}]},
      ]},
      { nm:'진통 · 산모', emoji:'👩', items:[
        {nm:'립밤', ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'호흡하다 보면 입술이 쩍쩍 갈라져 — 진통 필수템 1위'}]},
        {nm:'꿀스틱 · 에너지젤리', ops:[
          {who:'산후8주맘', verdict:'쏘쏘', txt:'금식이면 못 먹어 — 병원 방침 확인하고'}]},
        {nm:'긴 충전선 · 보조배터리', min:true, ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'분만 대기 길어지면 폰이 생명줄'}]},
        {nm:'머리끈 · 헤어밴드', ops:[
          {who:'남편찬스맘', verdict:'추천', txt:'진통 중 머리카락 만큼 거슬리는 게 없어요'}]},
        {nm:'오버나이트 생리대 (소량)', ops:[
          {who:'기록왕맘', verdict:'추천', txt:'병원 제공 확인 — 부족할 때 쓸 소량만'}]},
        {nm:'마이비데 · 비데티슈', ops:[
          {who:'호호마더', verdict:'추천', buy:'크리넥스 마이비데'}]},
        {nm:'슬리퍼', ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'입원 기간 내내 신어 — 미끄럼 없는 걸로'}]},
        {nm:'빨대컵 · 텀블러', ops:[
          {who:'산후8주맘', verdict:'추천', txt:'누워서 물 마시려면 꺾이는 빨대가 답'}]},
      ]},
      { nm:'아기 · 퇴원', emoji:'👶', items:[
        {nm:'배냇저고리 1벌', min:true, ops:[
          {who:'기록왕맘', verdict:'추천', txt:'퇴원 때 입힐 한 벌 — 병원 제공도 확인'}]},
        {nm:'속싸개 · 겉싸개', min:true, ops:[
          {who:'남편찬스맘', verdict:'추천', txt:'퇴원 이동 필수 — 계절 맞춰서'}]},
        {nm:'카시트 (신생아 장착)', min:true, brands:'싸이벡스 · 조이', ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'퇴원 첫 이동부터 법정 필수 — 미리 차에 장착 연습'}]},
      ]},
    ],
  },
  nursing: {
    emoji:'🍼', title:'수유 준비물',
    heroNote:'모유든 분유든 첫 달에 바로 쓰는 것만 — 아기 성향 보고 늘리세요',
    bagLabel:'수유 리스트', brief:'첫 달에 바로 쓰는 것만 — 아기 성향 보고 늘리세요',
    cats:[
      { nm:'젖병 · 분유', emoji:'🍼', items:[
        {nm:'젖병 2~3개', min:true, brands:'헤겐 · 더블하트 · 닥터브라운', ops:[
          {who:'기록왕맘', verdict:'추천', buy:'헤겐', txt:'아기마다 젖꼭지 취향 갈려 — 처음엔 2~3개만'}]},
        {nm:'신생아 분유 (소량)', ops:[
          {who:'산후8주맘', verdict:'쏘쏘', txt:'조리원에서 먹던 분유 이어가는 게 안전 — 대량 금지'}]},
        {nm:'젖병솔 · 젖병세제', min:true, brands:'더블하트 · 베베숲', ops:[
          {who:'남편찬스맘', verdict:'추천', txt:'하루에도 몇 번씩 씻어 — 세트로'}]},
        {nm:'젖병소독기', brands:'유팡 · 해님', ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'열탕 소독 3일 하면 알게 돼 — 있으면 삶이 달라져'},
          {who:'산후8주맘', verdict:'쏘쏘', txt:'열탕+건조로 버티는 집도 많아'}]},
        {nm:'젖병건조대', ops:[
          {who:'기록왕맘', verdict:'추천', txt:'싱크대 옆 상주템 — 물빠짐 좋은 걸로'}]},
      ]},
      { nm:'모유수유', emoji:'🤱', items:[
        {nm:'유축기', carrot:true, brands:'스펙트라 · 메델라', ops:[
          {who:'산후8주맘', verdict:'쏘쏘', txt:'보건소 대여 먼저 확인 — 사는 건 그 다음'}]},
        {nm:'수유쿠션', brands:'엘라바', ops:[
          {who:'조리원동기맘', verdict:'추천', txt:'팔로 버티면 손목 나가 — 높이 맞는 게 중요'}]},
        {nm:'수유패드', min:true, brands:'더블하트 · 마더케이', ops:[
          {who:'산후8주맘', verdict:'추천', txt:'젖 새는 시기 필수 — 넉넉히'}]},
        {nm:'유두보호크림 (란시놀)', min:true, brands:'라시놀 · 멀티맘', ops:[
          {who:'조리원동기맘', verdict:'추천', buy:'라시놀', txt:'수유 초기 상처엔 진짜 필수'}]},
        {nm:'모유저장팩', brands:'스펙트라', ops:[
          {who:'남편찬스맘', verdict:'추천', buy:'스펙트라', txt:'유축하면 바로 필요 — 날짜 적어 냉동'}]},
      ]},
    ],
  },
  babyfood: {
    emoji:'🥣', title:'이유식 준비물',
    heroNote:'이유식 시작(생후 5~6개월) 전에 — 시작 시기는 소아과와 상담하세요',
    bagLabel:'이유식 리스트', brief:'시작(5~6개월) 전에 준비 — 시기는 소아과와 상담',
    cats:[
      { nm:'조리 도구', emoji:'🍳', items:[
        {nm:'이유식 마스터기 · 밥솥', brands:'베이비무브', ops:[
          {who:'이유식전쟁맘', verdict:'쏘쏘', txt:'냄비+믹서로 충분하단 파와 갈려 — 하나만 사보세요'}]},
        {nm:'아기 전용 냄비 · 도마', min:true, ops:[
          {who:'이유식전쟁맘', verdict:'추천', txt:'어른 양념 밴 도마는 못 써 — 전용으로 분리'}]},
        {nm:'큐브 보관용기', min:true, brands:'마더스콘', ops:[
          {who:'두돌맘', verdict:'추천', buy:'마더스콘', txt:'주말에 만들어 얼려두면 평일이 살아'}]},
        {nm:'미니 믹서 · 초퍼', brands:'테팔', ops:[
          {who:'이유식전쟁맘', verdict:'추천', txt:'초기 미음은 갈아야 — 소량 갈리는 미니가 편해'}]},
      ]},
      { nm:'먹이기', emoji:'🥄', items:[
        {nm:'아기 식탁의자', min:true, brands:'이케아 · 스토케', ops:[
          {who:'두돌맘', verdict:'추천', buy:'이케아 안틸로프', txt:'식습관은 의자에서 시작 — 가성비면 이케아'}]},
        {nm:'실리콘 턱받이', min:true, brands:'비베 · 마더케이', ops:[
          {who:'이유식전쟁맘', verdict:'추천', txt:'주머니형 실리콘이 설거지 끝'}]},
        {nm:'이유식 스푼 · 포크', brands:'넘넘 · 에디슨', ops:[
          {who:'두돌맘', verdict:'추천', buy:'넘넘', txt:'초기엔 부드러운 실리콘 스푼'}]},
        {nm:'흡착 식판 · 볼', brands:'마더케이', ops:[
          {who:'이유식전쟁맘', verdict:'쏘쏘', txt:'힘 세지면 흡착도 뜯어 던져 — 하나만 사보고 판단'}]},
        {nm:'빨대컵 · 스파우트컵', brands:'리치엘', ops:[
          {who:'두돌맘', verdict:'추천', buy:'리치엘', txt:'이유식 시작하면 물 연습 — 단계별 말고 빨대컵 직행파 많아'}]},
      ]},
    ],
  },
  daycare: {
    emoji:'🏫', title:'어린이집 준비물',
    heroNote:'입소 확정되면 원 안내문 먼저 — 원마다 지정 품목이 달라요',
    bagLabel:'등원 리스트', brief:'입소 확정되면 준비 — 원 안내문이 진짜 리스트',
    cats:[
      { nm:'이름표', emoji:'🏷️', items:[
        {nm:'네임스티커 · 의류 스티커', min:true, ops:[
          {who:'복직맘', verdict:'추천', txt:'전 소지품에 이름 필수 — 다리미형·방수형 세트로'}]},
      ]},
      { nm:'등원 기본', emoji:'🎒', items:[
        {nm:'낮잠이불 세트', min:true, brands:'마리엘르 · 라졸리메종', ops:[
          {who:'복직맘', verdict:'추천', txt:'원 지정 사이즈 확인 — 세탁 교대용 상태 좋게'}]},
        {nm:'실내화', ops:[
          {who:'세돌맘', verdict:'추천', txt:'혼자 신고 벗기 쉬운 걸로'}]},
        {nm:'여벌옷 2~3벌', min:true, ops:[
          {who:'복직맘', verdict:'추천', txt:'물·모래·밥풀 — 하루 두 번 갈아입는 날도 있어'}]},
        {nm:'기저귀 · 물티슈 (대량)', ops:[
          {who:'세돌맘', verdict:'추천', txt:'원에 박스째 맡겨두는 시스템이 흔해'}]},
      ]},
      { nm:'식사 · 위생', emoji:'🥤', items:[
        {nm:'빨대컵 · 물병', ops:[
          {who:'복직맘', verdict:'추천', txt:'혼자 열고 마실 수 있는 걸로'}]},
        {nm:'수저세트 · 수저집', brands:'에디슨', ops:[
          {who:'세돌맘', verdict:'추천', buy:'에디슨', txt:'수저집까지 세트로 — 이름 크게'}]},
        {nm:'양치컵 · 칫솔', ops:[
          {who:'복직맘', verdict:'추천', txt:'월령 맞는 칫솔로 여분까지'}]},
      ]},
      { nm:'확인', emoji:'📋', items:[
        {nm:'원 안내문 · 투약의뢰서 양식', ops:[
          {who:'복직맘', verdict:'추천', txt:'준비물 절반은 원이 정해줘 — 안내문이 진짜 리스트'}]},
      ]},
    ],
  },
};

// 옛 모듈 호환 — PLAN_SOURCES 등이 참조하는 전역 이름
const BABYFOOD_CATEGORIES = PREP_ENGINE.babyfood.cats;
const DAYCARE_CATEGORIES  = PREP_ENGINE.daycare.cats;
function bfItemId(ci,ii){ return plItemId('babyfood',ci,ii); }
function dcItemId(ci,ii){ return plItemId('daycare',ci,ii); }
function renderBabyfood(){ renderPrepList('babyfood'); }
function renderDaycare(){ renderPrepList('daycare'); }

// ---- 리스트별 상태 (체크 · 모드) ----
const PL_STATE = {};
function plState(key){
  if(!PL_STATE[key]){
    let checked = new Set(), mode = 'std';
    try{
      const c = localStorage.getItem('sohaengseong-'+key+'-checked'); if(c) checked = new Set(JSON.parse(c));
      const m = localStorage.getItem('sohaengseong-'+key+'-mode'); if(m==='std'||m==='mine') mode = m;
    }catch(e){}
    PL_STATE[key] = {checked, mode};
  }
  return PL_STATE[key];
}
function plSave(key){ try{ localStorage.setItem('sohaengseong-'+key+'-checked', JSON.stringify([...plState(key).checked])); }catch(e){} }
function plSetMode(key, m){
  const s = plState(key);
  if(s.mode!==m){ s.mode = m; try{ localStorage.setItem('sohaengseong-'+key+'-mode', m); }catch(e){} }
  renderPrepList(key);
}
function plItemId(key,ci,ii){ return key+ci+'-'+ii; }
function plMine(key,id){ return plState(key).checked.has(id) || myPlans[id]==='buy' || myPlans[id]==='carrot'; }

function plIds(key, mineOnly){
  const out=[];
  PREP_ENGINE[key].cats.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = plItemId(key,ci,ii);
    if(mineOnly && !plMine(key,id)) return;
    out.push(id);
  }));
  return out;
}

function plJourney(key){
  const s = plState(key);
  const all = plIds(key), mine = plIds(key,true);
  const planned = all.filter(id=>myPlans[id]).length;
  const s1 = all.length>0 && planned===all.length;
  const unchecked = mine.filter(id=>!s.checked.has(id)).length;
  const s2 = s1 && mine.length>0 && unchecked===0;
  return {steps:[{n:1,ic:'🌠',t:'소행성 스탠다드'},{n:2,ic:'📝',t:'나의 기록'}], done:[s1,s2], cur: s.mode==='std'?1:2};
}

function plRewardHtml(key){
  const s = plState(key);
  const mine = plIds(key,true);
  if(!mine.length) return `🎁 <b>완주 보상</b> — 스탠다드에서 담고, 다 챙기면 <b>⭐500</b> + 아기의 깜짝 선물`;
  const un = mine.filter(id=>!s.checked.has(id)).length;
  if(un>0) return `🎁 <b>완주 보상</b> — 남은 <b>${un}개</b>만 챙기면 <b>⭐500</b> + 아기의 깜짝 선물이 와요`;
  return `🎉 <b>완주!</b> ⭐500 + 아기의 깜짝 선물까지 받았어요 — 기록 하나마다 <b>⭐15</b>는 계속`;
}

function plCheckComplete(key){
  const s = plState(key);
  const mine = plIds(key,true);
  if(mine.length && mine.every(id=>s.checked.has(id))){
    if(earnStars(500, PREP_ENGINE[key].title+' 완주', 'pl-alldone-'+key)){
      babySurprise(PREP_ENGINE[key].bagLabel+' 챙기기', 'baby-pl-'+key, 150, 900);
    }
  }
}

function plProgress(key){
  const s = plState(key);
  const L = PREP_ENGINE[key];
  const all = plIds(key), mine = plIds(key,true);
  if(s.mode==='std'){
    const done = all.filter(id=>myPlans[id]).length;
    document.getElementById('prog-name').textContent = L.title;
    document.getElementById('prog-text').textContent = done+' / '+all.length+' 담았어요';
    document.getElementById('prog-fill').style.width = (all.length?done/all.length*100:0)+'%';
  }else{
    const done = mine.filter(id=>s.checked.has(id)).length;
    document.getElementById('prog-name').textContent = L.title+' · 나의 기록';
    document.getElementById('prog-text').textContent = done+' / '+mine.length+' 완료';
    document.getElementById('prog-fill').style.width = (mine.length?done/mine.length*100:0)+'%';
  }
}

function plRefreshHeads(key){
  plProgress(key);
  const jn = document.getElementById('journey');
  if(jn) jn.innerHTML = journeyHtml(plJourney(key));
  const rs = document.getElementById('reward-strip');
  if(rs) rs.innerHTML = plRewardHtml(key);
  PREP_ENGINE[key].cats.forEach((c,ci)=>{
    const gp = document.getElementById('plp-'+ci);
    if(!gp) return;
    let total=0, done=0;
    const s = plState(key);
    c.items.forEach((it,ii)=>{
      const id = plItemId(key,ci,ii);
      if(s.mode==='mine' && !plMine(key,id)) return;
      total++;
      if(s.mode==='std' ? !!myPlans[id] : s.checked.has(id)) done++;
    });
    gp.textContent = done+'/'+total;
  });
}

function renderPrepList(key){
  const L = PREP_ENGINE[key];
  const s = plState(key);
  const area = document.getElementById('body-area');
  area.innerHTML = '';

  // 카테고리 설명 카드 (컴팩트) — 리스트가 주인공
  const totalAll = L.cats.reduce((a,c)=>a+c.items.length,0);
  const brief = document.createElement('div');
  brief.className = 'list-brief';
  brief.innerHTML = `
    <span class="lb-ic">${L.emoji}</span>
    <div class="lb-tx"><h3>${L.title}</h3>
    <p>${L.brief}</p></div>
    <span class="lb-n">판정템 ${totalAll}</span>
  `;
  area.appendChild(brief);

  // 탭 — 설명 카드 아래
  const mt = document.createElement('div');
  mt.className='journey'; mt.id='journey';
  mt.innerHTML = journeyHtml(plJourney(key));
  area.appendChild(mt);

  if(s.mode==='mine'){
    const rs = document.createElement('div');
    rs.className='reward-strip'; rs.id='reward-strip';
    rs.innerHTML = plRewardHtml(key);
    area.appendChild(rs);
  }

  let shown=0;
  L.cats.forEach((cat,ci)=>{
    const list=[];
    cat.items.forEach((it,ii)=>{
      const id = plItemId(key,ci,ii);
      if(s.mode==='mine' && !plMine(key,id)) return;
      list.push([it,ii]);
    });
    if(!list.length) return;
    shown++;
    const gEl = document.createElement('div'); gEl.className='group';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3><span class="deadline info">준비 중</span><span class="gprog" id="plp-${ci}"></span></div>
      <div class="group-items" id="pli-${ci}"></div>
    `;
    const holder = gEl.querySelector('#pli-'+ci);
    list.forEach(([it,ii])=> holder.appendChild(renderPrepListItem(key,it,ci,ii)));
    area.appendChild(gEl);
  });
  if(!shown && s.mode==='mine'){
    const empty = document.createElement('div');
    empty.className='collect-box';
    empty.innerHTML=`<b>아직 ${L.bagLabel}이 비어 있어요</b>소행성 스탠다드에서 담기를 누르면 여기 모여요.`;
    area.appendChild(empty);
  }

  if(s.mode==='std' && typeof stdCatalogHtml==='function'){
    const sc = document.createElement('div');
    sc.className='std-cat';
    sc.innerHTML = stdCatalogHtml(key);
    area.appendChild(sc);
  }
  plRefreshHeads(key);
}

function renderPrepListItem(key,it,ci,ii){
  const id = plItemId(key,ci,ii);
  const s = plState(key);
  const el = document.createElement('div');
  el.className = 'item' + (s.mode==='mine' && s.checked.has(id)?' checked':'');

  const rawC = sheetConclusion(it);
  const concl = displayConclusion(it);
  const ops = it.ops||[];

  const fillMore = (moreEl, pre)=>{
    if(moreEl.dataset.filled) return;
    moreEl.dataset.filled = '1';
    if(pre) moreEl.insertAdjacentHTML('beforeend', pre);
    const f = (typeof verdictFeedFor==='function') ? verdictFeedFor(it) : null;
    if(f){ moreEl.insertAdjacentHTML('beforeend', feedDetailHtml(f)); }
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

  if(s.mode==='std'){
    el.innerHTML = `
      <div class="item-main slim">
        <div class="item-info">
          <div class="item-name">${it.nm}</div>
          <div class="item-tags">${concl?`<span class="badge concl ${concl.k}">${concl.label}</span>`:''}${faceBadges(it, id)}</div>
        </div>
        <button class="add-mini ${myPlans[id]?'on':''}" title="담기">${myPlans[id]?'✓':'＋'}</button>
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
      checkPlanComplete(key);
      plRefreshHeads(key);
    });
    return el;
  }

  // 나의 기록 — 체크 · 플랜 · 구매 기록
  let badges='';
  if(concl) badges += `<span class="badge concl ${concl.k}">${concl.label}</span>`;
  badges += verdictBadge(it, id);
  const hasMore = ops.length || !!brandRankFor(it, id);
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      <div class="chk"></div>
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
  el.appendChild(planRowEl(id, key));
  if(s.checked.has(id) || myBuys[id]) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
  el.querySelector('.chk').addEventListener('click', e=>{
    e.stopPropagation();
    const now = !s.checked.has(id);
    now ? s.checked.add(id) : s.checked.delete(id);
    el.classList.toggle('checked');
    plSave(key);
    if(now){
      earnStars(5, '준비물 체크', 'chk-'+id);
      plCheckComplete(key);
      if(!el.querySelector('.buy-row')) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
    }else if(!myBuys[id]){
      const br = el.querySelector('.buy-row'); if(br) br.remove();
    }
    plRefreshHeads(key);
  });
  return el;
}
