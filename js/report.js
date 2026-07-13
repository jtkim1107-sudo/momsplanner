// ============================================================
// 소행성 육아플래너 — 내 리스트 리포트 (바이럴 공유용)
// ------------------------------------------------------------
// 내가 정한 플랜을 캡처해서 공유하기 좋은 세로 리포트로 만든다.
// 맘카페에 시트 올리던 행동을 앱이 대신 — 하단 브랜딩이 유입 경로.
// ============================================================

function reportData(){
  const bought=[], toBuy=[], carrot=[], passed=[];
  let baseSum=0, carrotSum=0, noPrice=0;

  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    const plan = myPlans[id];
    const isMine = sheetChecked.has(id) || plan==='buy' || plan==='carrot';
    if(plan==='pass'){ passed.push(it.nm); return; }
    if(!isMine) return;

    const pi = priceIntel(it, id);
    const rec = myBuys[id];
    const row = { nm:it.nm, cat:c.nm, brand: rec?rec.b:null, paid: rec&&rec.p?rec.p:null, pi };

    if(sheetChecked.has(id)){ bought.push(row); }
    else if(plan==='carrot'){ carrot.push(row); }
    else { toBuy.push(row); }

    // 예상 지출 (구매 완료는 실지출로)
    if(sheetChecked.has(id)){
      if(rec && rec.p){ baseSum += rec.p; carrotSum += rec.p; }
      else if(pi){ baseSum += pi.base; carrotSum += pi.base; }
      else noPrice++;
    }else if(pi){
      baseSum += pi.base;
      carrotSum += (plan==='carrot') ? Math.round((pi.carrotLo+pi.carrotHi)/2) : pi.base;
    }else noPrice++;
  }));
  return {bought, toBuy, carrot, passed, baseSum, carrotSum, noPrice};
}

function manwon(v){
  if(v >= 10000) return (Math.round(v/1000)/10).toLocaleString() + '만원';
  return v.toLocaleString() + '원';
}

function openReport(){
  const d = reportData();
  const total = d.bought.length + d.toBuy.length + d.carrot.length;
  if(!total && !d.passed.length){
    toast('스탠다드에서 따라하기·당근으로를 먼저 골라보세요!');
    return;
  }
  const items = planListItems('sheet');
  const decided = items.filter(x=>myPlans[x.id]).length;
  const save = d.baseSum - d.carrotSum;
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;

  const li = (row, kind) => {
    const brand = row.brand ? `<b>${row.brand}</b>` : '';
    let price = '';
    if(kind==='bought') price = row.paid ? row.paid.toLocaleString()+'원' : '';
    else if(kind==='carrot') price = row.pi ? `${won(row.pi.carrotLo)}~${won(row.pi.carrotHi)}` : '';
    else price = row.pi ? `~${won(row.pi.dealAt)}` : '';
    return `<div class="rp-item"><span class="rp-nm">${row.nm}</span>${brand}<span class="rp-price">${price}</span></div>`;
  };

  const body = document.getElementById('report-body');
  body.innerHTML = `
    <div class="rp-hero">
      <div class="ss-over">SOHAENGSEONG STANDARD REPORT</div>
      <h2>🌠 ${PROFILE.nick}의<br>출산 준비 리포트</h2>
      <p>${dateStr} · 소행성 스탠다드 ${decided}/${items.length} 완성${decided<items.length?' (진행 중)':' 🎉'}</p>
      <div class="rp-sum">
        <span>🛍️ 살 것 ${d.toBuy.length}</span><span>🥕 당근 ${d.carrot.length}</span><span>✅ 샀어요 ${d.bought.length}</span><span>🚫 패스 ${d.passed.length}</span>
      </div>
    </div>

    <div class="rp-money">
      <div class="rp-money-row"><span>새것으로 다 사면</span><b>${manwon(d.baseSum)}</b></div>
      <div class="rp-money-row big"><span>당근 활용하면</span><b>${manwon(d.carrotSum)}</b></div>
      ${save>0?`<div class="rp-save">💸 ${manwon(save)} 절약 플랜!</div>`:''}
      ${d.noPrice?`<span class="rp-note">시세 미집계 ${d.noPrice}개 제외 · 가격은 참고용</span>`:`<span class="rp-note">가격은 관측 시세 기준 참고용</span>`}
    </div>

    ${d.toBuy.length?`<div class="rp-sec"><h3>🛍️ 살 것 <span>매수 기준가</span></h3>${d.toBuy.map(r=>li(r,'buy')).join('')}</div>`:''}
    ${d.carrot.length?`<div class="rp-sec carrot"><h3>🥕 당근에서 찾을 것 <span>적정가</span></h3>${d.carrot.map(r=>li(r,'carrot')).join('')}</div>`:''}
    ${d.bought.length?`<div class="rp-sec done"><h3>✅ 이미 준비했어요</h3>${d.bought.map(r=>li(r,'bought')).join('')}</div>`:''}
    ${d.passed.length?`<div class="rp-pass">🚫 패스: ${d.passed.join(' · ')}</div>`:''}

    <div class="rp-footer">
      <div class="rp-logo">🌠 소행성 육아플래너</div>
      <p>선배맘 데이터로 3분 만에 만든 준비물 플랜<br>나도 만들기 → <b>jtkim1107-sudo.github.io/momsplanner</b></p>
    </div>

    <div class="rp-actions">
      <button class="rp-share" onclick="shareReport()">공유하기</button>
      <button class="rp-close" onclick="closeReport()">닫기</button>
    </div>
    <p class="rp-hint">📸 길게 스크롤 캡처하면 카페·카톡에 올리기 딱 좋아요</p>
  `;
  document.getElementById('report-veil').classList.add('on');
}

function closeReport(){
  document.getElementById('report-veil').classList.remove('on');
}

function shareReport(){
  const d = reportData();
  const save = d.baseSum - d.carrotSum;
  const text = `🌠 ${PROFILE.nick}의 출산 준비 리포트\n`
    + `🛍️ 살 것 ${d.toBuy.length} · 🥕 당근 ${d.carrot.length} · ✅ 샀어요 ${d.bought.length} · 🚫 패스 ${d.passed.length}\n`
    + `💰 새것 ${manwon(d.baseSum)} → 당근 활용 ${manwon(d.carrotSum)}${save>0?` (${manwon(save)} 절약!)`:''}\n`
    + `나도 만들기 → https://jtkim1107-sudo.github.io/momsplanner/`;
  if(navigator.share){
    navigator.share({title:'소행성 출산 준비 리포트', text}).catch(()=>{});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>toast('리포트 요약을 복사했어요 — 붙여넣기 하세요!'));
  }else{
    toast('스크린샷으로 캡처해서 공유해주세요 📸');
  }
}
