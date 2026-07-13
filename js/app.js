// ============================================================
// 소행성 육아플래너 — 앱 로직
// ============================================================

let viewMode = 'preg';
let viewSegIdx = null; // null = 내 구간
const STORE_KEY = 'sohaengseong-planner-checked';
let checked = new Set(['A1','A2','A3']);
try{
  const saved = localStorage.getItem(STORE_KEY);
  if(saved) checked = new Set(JSON.parse(saved));
}catch(e){ /* 저장 미지원 환경에서는 세션 내 상태만 유지 */ }
function saveChecked(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify([...checked])); }catch(e){}
}

let userComments = {};
try{
  const cs = localStorage.getItem(CMT_KEY);
  if(cs) userComments = JSON.parse(cs);
}catch(e){}
function getComments(id){
  return [...(SAMPLE_COMMENTS[id]||[]), ...(GEN_COMMENTS[id]||[]), ...(userComments[id]||[])];
}
function commentSection(it){
  const cmts = getComments(it.id);
  const list = cmts.length
    ? cmts.map(c=>`<div class="cmt"><div class="who">${c.who}<span class="when">${c.when||'샘플'}</span></div><div class="txt">${c.txt}</div></div>`).join('')
    : `<div class="cmt-empty">아직 한마디가 없어요 — 첫 경험담을 남겨주세요</div>`;
  return `
    <div class="cmt-sec" onclick="event.stopPropagation()">
      <div class="detail-label">💬 선배맘 한마디 (${cmts.length})</div>
      <div class="cmt-list" id="cl-${it.id}">${list}</div>
      <div class="cmt-input">
        <input id="ci-${it.id}" placeholder="내 경험 한 줄 남기기" maxlength="120" onkeydown="if(event.key==='Enter')addComment(event,'${it.id}')">
        <button onclick="addComment(event,'${it.id}')">등록</button>
      </div>
    </div>`;
}
function addComment(e,id){
  e.stopPropagation();
  const input = document.getElementById('ci-'+id);
  const txt = input.value.trim();
  if(!txt) return;
  if(!userComments[id]) userComments[id]=[];
  userComments[id].push({who:PROFILE.nick, txt, when:'방금'});
  try{ localStorage.setItem(CMT_KEY, JSON.stringify(userComments)); }catch(e2){}
  input.value='';
  const cmts = getComments(id);
  document.getElementById('cl-'+id).innerHTML = cmts.map(c=>`<div class="cmt"><div class="who">${c.who}<span class="when">${c.when||'샘플'}</span></div><div class="txt">${c.txt}</div></div>`).join('');
  const lbl = document.querySelector('#cl-'+id).parentElement.querySelector('.detail-label');
  lbl.textContent = `💬 선배맘 한마디 (${cmts.length})`;
  toast('한마디가 등록됐어요 🌟');
}
let debateVoted = false;
let retroIdx = 0;
const celebratedSegs = new Set();

function computeState(){
  const today = new Date(); today.setHours(0,0,0,0);
  const due = new Date(PROFILE.dueDate);
  const daysLeft = Math.round((due - today)/86400000);
  const weeks = Math.max(1, Math.min(42, Math.floor((280 - daysLeft)/7)));
  // 프리맘(임신 준비)은 예정일이 없어 자동 매칭 대상 아님 — 온보딩/프로필에서 별도 선택
  const segIdx = weeks>=28 ? 3 : weeks>=16 ? 2 : 1;
  return {weeks, dday:daysLeft, segIdx};
}
const state = computeState();

function currentSegIdx(){
  if(viewMode==='senior') return 6; // 아기 7개월 → 6~12개월 구간
  return viewSegIdx===null ? state.segIdx : viewSegIdx;
}

function deadlineChip(g, done, total){
  if(done===total) return `<span class="deadline done">완료 ✓</span>`;
  if(g.deadlineWeek && currentSegIdx()===state.segIdx && viewMode==='preg'){
    const left = g.deadlineWeek - state.weeks;
    const label = g.deadlineWeek===40 ? '출산 전' : g.deadlineWeek+'주까지';
    if(left<=0) return `<span class="deadline urgent">${label} · 지금!</span>`;
    if(left<=2) return `<span class="deadline urgent">${label} · ${left}주 남음</span>`;
    return `<span class="deadline">${label} · ${left}주 남음</span>`;
  }
  const label = g.deadlineLabel || (g.deadlineWeek===40?'출산 전':g.deadlineWeek+'주까지');
  return `<span class="deadline info">${label}</span>`;
}

function render(){
  document.getElementById('vs-preg').classList.toggle('on', viewMode==='preg');
  document.getElementById('vs-senior').classList.toggle('on', viewMode==='senior');
  document.getElementById('vs-sheet').classList.toggle('on', viewMode==='sheet');
  document.getElementById('timeline').style.display = viewMode==='sheet' ? 'none' : 'flex';
  document.querySelector('.searchwrap').style.display = viewMode==='sheet' ? 'none' : 'block';

  // 준비물 시트 뷰 — 타임라인 없이 시트 전용 렌더
  if(viewMode==='sheet'){
    document.getElementById('hero-title').textContent = '출산 준비물 체크리스트';
    document.getElementById('hero-dday').textContent = `출산예정일 D-${state.dday}`;
    document.getElementById('demo-note').textContent = '선배맘 준비물 시트 2종 병합 — 브랜드 · 가격 · 경험담은 참고용이에요';
    document.getElementById('preview-note').style.display='none';
    renderSheet();
    return;
  }

  const segIdx = currentSegIdx();
  const seg = SEGMENTS[segIdx];

  if(viewMode==='preg'){
    document.getElementById('hero-title').textContent = `${PROFILE.nick}님, 임신 ${state.weeks}주차예요`;
    document.getElementById('hero-dday').textContent = `출산예정일 D-${state.dday}`;
  }else{
    document.getElementById('hero-title').textContent = `다인맘님, 아기 7개월차예요`;
    document.getElementById('hero-dday').textContent = `임신 후기를 지나오셨어요`;
  }
  document.getElementById('demo-note').textContent =
    `선배맘 ${BIG_STATS.moms.toLocaleString()}명 · 누적 판정 ${BIG_STATS.verdicts.toLocaleString()}건 — 판정·순위·댓글은 시뮬레이션 데이터입니다`;

  // 미리보기 노트
  const pn = document.getElementById('preview-note');
  if(viewMode==='preg' && segIdx!==state.segIdx){
    pn.style.display='block';
    pn.textContent = segIdx < state.segIdx
      ? `👀 지나온 구간을 보고 있어요 — 내 구간으로 돌아가려면 "${SEGMENTS[state.segIdx].name}" 탭`
      : `👀 다음 구간 미리보기 — 지금은 "${SEGMENTS[state.segIdx].name}"에 집중해도 충분해요`;
  }else{ pn.style.display='none'; }

  const tl = document.getElementById('timeline');
  tl.innerHTML='';
  const myIdx = viewMode==='senior' ? 6 : state.segIdx;
  SEGMENTS.forEach((s,i)=>{
    const el=document.createElement('span');
    let cls = 'seg ';
    if(i===segIdx) cls+='active';
    else if(i<myIdx) cls+='done';
    else if(i>myIdx) cls+='future';
    el.className=cls;
    el.textContent = s.name + (i===segIdx?` (${s.range})`:'');
    el.onclick=()=>{ if(viewMode==='preg'){ viewSegIdx = (i===state.segIdx? null : i); render(); } };
    tl.appendChild(el);
  });

  document.getElementById('prog-name').textContent = seg.name + ' 준비';

  const area = document.getElementById('body-area');
  area.innerHTML='';

  if(viewMode==='senior'){
    const rb = document.createElement('div');
    rb.className='retro-banner';
    rb.innerHTML = `
      <span class="rt">💬 지나온 길 판정</span>
      <h3>다인맘님은 임신 후기를 지나오셨죠.<br>그때 산 것들, 다시 산다면?</h3>
      <p>좌욕기 · 손목보호대 · 수유나시 — 30초면 끝나요. 지금 이 구간을 준비 중인 후배맘 ${Math.round(BIG_STATS.moms*0.26).toLocaleString()}명이 기다리고 있어요.</p>
      <button class="retro-btn" onclick="openRetro()">그때 산 ${RETRO_ITEMS.length}개 아이템 판정하기 →</button>
    `;
    area.appendChild(rb);
  }else if(segIdx<=4){
    const rc = document.createElement('div');
    rc.className='region-card';
    rc.onclick=()=>openModal('region-modal');
    rc.innerHTML=`
      <span class="ri">📍</span>
      <div class="rc"><h3>${PROFILE.region} 예비맘 혜택 5가지</h3><p>출산지원금 · 산후도우미 지원 · 유축기 대여 — 놓치면 못 받아요</p></div>
      <span class="arrow">›</span>
    `;
    area.appendChild(rc);
  }

  const content = CONTENT[seg.id];
  content.groups.forEach(g=>{
    const gEl = document.createElement('div'); gEl.className='group';
    const done = g.items.filter(i=>checked.has(i.id)).length;
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">GROUP ${g.id}</span><h3>${g.title}</h3>${deadlineChip(g,done,g.items.length)}<span class="gprog" id="gp-${g.id}">${done}/${g.items.length}</span></div>
      ${g.note?`<p class="group-note">${g.note}</p>`:''}
      <div class="group-items" id="gi-${g.id}"></div>
    `;
    const holder = gEl.querySelector('#gi-'+g.id);
    g.items.forEach(it=> holder.appendChild(renderItem(it)));
    area.appendChild(gEl);
  });
  updateProgress();
}

function isNational(it){ return it.verdict && it.verdict.n>=N_MIN && it.verdict.yes>=NATIONAL_MIN; }

function renderItem(it){
  const el = document.createElement('div');
  el.className='item'+(checked.has(it.id)?' checked':'');
  el.id='item-'+it.id;

  let badges='';
  if(it.type==='buy'){
    if(it.debate){ badges+=`<span class="badge debate">🔥 논쟁 중 — 의견이 갈려요</span>`; }
    else if(it.verdict && it.verdict.n>=N_MIN){
      if(isNational(it)) badges+=`<span class="badge national">🏆 국민템</span>`;
      badges+=`<span class="badge verdict">👍 사요 ${it.verdict.yes}% · 선배맘 ${it.verdict.n.toLocaleString()}명</span>`;
    }
    else if(it.verdict){ badges+=`<span class="badge collecting">⏳ 선배맘 판정 모으는 중 (${it.verdict.n}명)</span>`; }
  }
  if(it.gender) badges+=`<span class="badge gender">👶 성별 팁</span>`;
  if(it.region) badges+=`<span class="badge region" onclick="event.stopPropagation();openModal('region-modal')">📍 지역혜택</span>`;

  let detail='';
  if(it.type==='buy' && it.verdict && it.verdict.n>=N_MIN && it.rank){
    detail += `<div><div class="detail-label">살까 말까 — 선배맘 ${it.verdict.n.toLocaleString()}명의 판정</div>
      <div class="verdict-bar"><span class="pct g">👍 ${it.verdict.yes}%</span>
      <div class="track"><div class="yes" style="width:${it.verdict.yes}%"></div></div>
      <span class="pct" style="color:var(--red)">${100-it.verdict.yes}%</span></div>
      <div class="detail-label" style="margin-bottom:4px">브랜드 순위 (판정 30명 이상만 표시)</div>
      <ul class="rank">${it.rank.map((r,i)=>`<li><span class="no2">${i+1}</span><span class="bname">${r.b}</span><span class="rn">다시 산다 ${r.re}% · n=${r.n.toLocaleString()}</span></li>`).join('')}</ul></div>`;
  }else if(it.type==='buy' && it.verdict && it.verdict.n>=N_MIN && !it.rank){
    detail += `<div><div class="detail-label">살까 말까 — 선배맘 ${it.verdict.n.toLocaleString()}명의 판정</div>
      <div class="verdict-bar"><span class="pct g">👍 ${it.verdict.yes}%</span>
      <div class="track"><div class="yes" style="width:${it.verdict.yes}%"></div></div>
      <span class="pct" style="color:var(--red)">${100-it.verdict.yes}%</span></div>
      <div class="collect-box"><b>브랜드 순위는 아직이에요</b>브랜드별 판정 30명이 모이면 순위가 열립니다.</div></div>`;
  }else if(it.type==='buy' && it.verdict && it.verdict.n<N_MIN && !it.debate){
    detail += `<div class="collect-box"><b>아직 순위를 보여드리지 않아요</b>판정 30명이 모이면 브랜드 순위가 열립니다. 지금은 ${it.verdict.n}명 — 정확하지 않은 순위는 없는 것만 못하니까요.</div>`;
  }else if(it.debate){
    detail += `
      <div class="debate-box">
        <span class="dt">🔥 이번 주 논쟁템 · 1개만 운영</span>
        <h4>${DEBATE.title}</h4>
        <div class="debate-actions" id="da-${it.id}" ${debateVoted?'style="display:none"':''}>
          <button class="dbtn yes" onclick="voteDebate(event,'${it.id}')">${DEBATE.yesLabel}</button>
          <button class="dbtn no" onclick="voteDebate(event,'${it.id}')">${DEBATE.noLabel}</button>
        </div>
        <div class="debate-done" id="dd-${it.id}" ${debateVoted?'style="display:block"':''}>판정 완료! 결과는 ${DEBATE.goal.toLocaleString()}명이 모이면 공개돼요</div>
        <div class="debate-meta" id="dm-${it.id}">${(DEBATE.count + (debateVoted?1:0)).toLocaleString()} / ${DEBATE.goal.toLocaleString()}명 참여 · ${DEBATE.goal.toLocaleString()}명 도달 시 결과 공개</div>
      </div>`;
  }
  if(it.tip){ detail += `<div class="tip-box">${it.tip}</div>`; }
  // 준비물 시트에 같은 항목이 있으면 시트 정보(개수·브랜드·가격·경험담) 표시
  const si = sheetInfoFor(it.id);
  if(si){
    const parts = [
      si.need ? '📦 필요 '+si.need : null,
      si.brands ? '🏷️ '+si.brands : null,
      si.deal ? '💰 '+si.deal : null,
      si.carrot ? '🥕 당근 추천' : null,
    ].filter(Boolean);
    detail += `<div class="tip-box">🛒 <b>준비물 시트 연동</b>${parts.length?'<br>'+parts.join(' · '):''}${si.note?`<br>💬 "${si.note}"`:''}</div>`;
  }
  if(it.gender){ detail += `<div class="tip-box"><b>👶 성별 팁:</b> 성별 확정 전이면 화이트·아이보리 계열이 무난 — 둘째까지 물려 입히기도 좋아요.</div>`; }
  if(it.type==='buy' && detail){
    detail += `<button class="add-product" onclick="requestProduct(event,'${it.nm}')">＋ 내가 쓴 제품이 목록에 없어요 · 등록 요청</button>`;
  }
  // 모든 항목에 댓글 섹션 부착
  const cmtCount = getComments(it.id).length;
  if(cmtCount>0) badges+=`<span class="badge cmt-badge">💬 ${cmtCount}</span>`;
  detail += commentSection(it);

  el.innerHTML = `
    <div class="item-main">
      <div class="chk"></div>
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        <div class="item-guide">${it.gd}</div>
        ${badges?`<div class="item-badges">${badges}</div>`:''}
      </div>
      ${detail?'<span class="chev">▸</span>':''}
    </div>
    ${detail?`<div class="item-detail">${detail}</div>`:''}
  `;

  el.querySelector('.chk').addEventListener('click',e=>{
    e.stopPropagation();
    checked.has(it.id)?checked.delete(it.id):checked.add(it.id);
    el.classList.toggle('checked');
    const se = TL_SHEET_LINK[it.id];
    if(se){ // 준비물 시트와 상태 동기화
      const sid = sheetItemId(se.ci, se.ii);
      checked.has(it.id) ? sheetChecked.add(sid) : sheetChecked.delete(sid);
      saveSheet();
    }
    saveChecked();
    updateProgress();
    refreshChips();
  });
  el.querySelector('.item-main').addEventListener('click',()=>{
    if(!el.querySelector('.item-detail'))return;
    const was = el.classList.contains('open');
    document.querySelectorAll('.item.open').forEach(i=>i.classList.remove('open'));
    if(!was) el.classList.add('open');
  });
  return el;
}

function refreshChips(){
  const content = CONTENT[SEGMENTS[currentSegIdx()].id];
  content.groups.forEach(g=>{
    const done = g.items.filter(i=>checked.has(i.id)).length;
    const head = document.getElementById('gp-'+g.id);
    if(head){
      const chipHolder = head.parentElement.querySelector('.deadline');
      if(chipHolder){
        const tmp = document.createElement('div');
        tmp.innerHTML = deadlineChip(g,done,g.items.length);
        chipHolder.replaceWith(tmp.firstElementChild);
      }
    }
  });
}

function updateProgress(){
  const segIdx = currentSegIdx();
  const seg = SEGMENTS[segIdx];
  const content = CONTENT[seg.id];
  let total=0, done=0;
  content.groups.forEach(g=>{
    const gd = g.items.filter(i=>checked.has(i.id)).length;
    total+=g.items.length; done+=gd;
    const gp=document.getElementById('gp-'+g.id);
    if(gp) gp.textContent = gd+'/'+g.items.length;
  });
  document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  document.getElementById('prog-fill').style.width = (done/total*100)+'%';
  if(done===total && !celebratedSegs.has(seg.id)){
    celebratedSegs.add(seg.id);
    document.getElementById('cel-title').textContent = `${seg.name} 준비, 전부 끝!`;
    document.getElementById('cel-desc').textContent = `${total}개 항목을 빠짐없이 준비하셨어요.`;
    setTimeout(()=>openModal('complete-modal'), 400);
  }
}

function voteDebate(e,id){
  e.stopPropagation();
  debateVoted = true;
  document.getElementById('da-'+id).style.display='none';
  document.getElementById('dd-'+id).style.display='block';
  document.getElementById('dm-'+id).textContent = `${(DEBATE.count+1).toLocaleString()} / ${DEBATE.goal.toLocaleString()}명 참여 · ${DEBATE.goal.toLocaleString()}명 도달 시 결과 공개`;
  toast('판정이 반영됐어요 🌟');
}

function requestProduct(e,nm){
  e.stopPropagation();
  toast(`"${nm}" 제품 등록 요청이 접수됐어요`);
}

function setView(v){ if(viewMode===v) return; viewMode=v; viewSegIdx=null; render(); }

function openRetro(){
  retroIdx = 0;
  document.getElementById('m-done').style.display='none';
  document.getElementById('m-close').style.display='none';
  document.getElementById('m-card').style.display='block';
  showRetroCard();
  openModal('retro-modal');
}
function showRetroCard(){
  const it = RETRO_ITEMS[retroIdx];
  document.getElementById('m-prog').textContent = (retroIdx+1)+' / '+RETRO_ITEMS.length;
  document.getElementById('m-emoji').textContent = it.emoji;
  document.getElementById('m-name').textContent = it.nm;
}
function retroAnswer(ans){
  retroIdx++;
  if(retroIdx < RETRO_ITEMS.length){ showRetroCard(); return; }
  document.getElementById('m-card').style.display='none';
  document.getElementById('m-prog').textContent='완료';
  document.getElementById('m-done').style.display='block';
  document.getElementById('m-close').style.display='block';
}

function openModal(id){ document.getElementById(id).classList.add('on'); }
function closeModal(id){ document.getElementById(id).classList.remove('on'); }

let toastTimer=null;
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('on'),2200);
}

// ===== 검색: 전 구간 항목 인덱스 → 결과 탭 시 해당 구간·항목으로 점프 =====
const SEARCH_INDEX = [];
SEGMENTS.forEach((s,si)=>{
  const c = CONTENT[s.id];
  if(!c) return;
  c.groups.forEach(g=> g.items.forEach(it=> SEARCH_INDEX.push({segIdx:si, segName:s.name, id:it.id, nm:it.nm})));
});

function doSearch(){
  const q = document.getElementById('search').value.trim();
  const box = document.getElementById('search-results');
  if(q.length < 1){ box.classList.remove('on'); box.innerHTML=''; return; }
  const hits = SEARCH_INDEX.filter(x=>x.nm.includes(q)).slice(0,8);
  box.innerHTML = hits.length
    ? hits.map(h=>`<div class="sr" onclick="gotoItem(${h.segIdx},'${h.id}')"><span class="sn">${h.nm}</span><span class="ss">${h.segName}</span></div>`).join('')
    : `<div class="sr-empty">"${q}" 항목이 아직 없어요 — 제품 등록 요청으로 알려주세요</div>`;
  box.classList.add('on');
}

function gotoItem(segIdx, itemId){
  document.getElementById('search').value='';
  document.getElementById('search-results').classList.remove('on');
  if(viewMode!=='preg'){ viewMode='preg'; }
  viewSegIdx = (segIdx===state.segIdx ? null : segIdx);
  render();
  const el = document.getElementById('item-'+itemId);
  if(el){
    if(el.querySelector('.item-detail')) el.classList.add('open');
    el.scrollIntoView({behavior:'smooth', block:'center'});
    el.style.borderColor='var(--brown-deep)';
    setTimeout(()=>{ el.style.borderColor=''; }, 1800);
  }
}

// 프로필 주소 → 시도 매핑 (프로토타입: 성남시 → 경기도)
function profileRegionIdx(){
  const r = PROFILE.region || '';
  if(r.includes('성남')||r.includes('수원')||r.includes('용인')||r.includes('고양')) return 1;
  const hit = REGIONS.findIndex(x=>x.nm.startsWith(r.slice(0,2)));
  return hit>=0 ? hit : 0;
}

function initRegionSelect(){
  const sel = document.getElementById('rg-select');
  sel.innerHTML = REGIONS.map((r,i)=>`<option value="${i}">${r.nm}</option>`).join('');
  sel.value = profileRegionIdx();
  renderRegionSheet();
}

function renderRegionSheet(){
  const idx = +document.getElementById('rg-select').value;
  const r = REGIONS[idx];
  // 프로필 지역(시군구)이 선택된 시도에 속하면 시군구까지 표시 (프로필이 광역 자체면 중복 표기 안 함)
  const isMyRegion = (idx === profileRegionIdx()) && PROFILE.region;
  const myGu = (isMyRegion && r.nm.slice(0,2) !== PROFILE.region.slice(0,2)) ? PROFILE.region : null;
  document.getElementById('rg-title').textContent = (myGu ? `${r.nm} ${myGu}` : r.nm) + ' 예비맘이라면';
  const askWhere = myGu ? `${myGu}청 · ${myGu} 보건소` : r.where;
  let html = '';
  html += NATIONAL_BENEFITS.map(b=>`
    <div class="benefit">
      <h4>${b.nm} <span class="when">${b.when}</span></h4>
      <p>${b.desc}</p>
      <span class="where">확인처: ${b.where}</span>
    </div>`).join('');
  if(r.sig.length){
    html += r.sig.map(s=>`
      <div class="benefit" style="border-color:#C8D5E8;background:#F7FAFD;">
        <h4>${s.split(' — ')[0]} <span class="when" style="background:var(--gold)">${r.nm.slice(0,2)} 지역</span></h4>
        <p>${s.includes(' — ')? s.split(' — ')[1]+'.' : '시행 여부·조건 확인 필요.'}</p>
        <span class="where">확인처: ${r.where}</span>
      </div>`).join('');
  }
  html += `
    <div class="benefit" style="border-style:dashed;">
      <h4>${myGu ? myGu+'에' : '거주 시·군·구에'} 이것만 물어보세요 <span class="when" style="background:var(--brown-deep)">전화 한 번이면 끝</span></h4>
      <p>${REGION_ASK.map(a=>'☐ '+a).join('<br>')}</p>
      <span class="where">확인처: ${askWhere}</span>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;">
      <span style="font-size:11px;color:var(--sub);">정보 기준일 ${REGION_META.verified} · 수시 갱신</span>
      <button onclick="reportRegion()" style="background:none;border:1.5px solid var(--line);border-radius:16px;padding:6px 13px;font-size:11.5px;font-weight:700;color:var(--sub);cursor:pointer;font-family:inherit;">달라진 정보 제보하기</button>
    </div>`;
  document.getElementById('rg-body').innerHTML = html;
}

function reportRegion(){
  toast('제보 감사해요! 확인 후 정보를 갱신할게요 🌟');
}

reconcileSheetLinks();
render();
initRegionSelect();
