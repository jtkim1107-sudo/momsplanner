// ============================================================
// 소행성 육아플래너 — 내 리스트 리포트 (바이럴 공유용)
// ------------------------------------------------------------
// 내가 정한 플랜을 캡처해서 공유하기 좋은 세로 리포트로 만든다.
// 맘카페에 시트 올리던 행동을 앱이 대신 — 하단 브랜딩이 유입 경로.
// ============================================================

function reportData(){
  const bought=[], toBuy=[], carrot=[], hand=[], passed=[];
  let baseSum=0, carrotSum=0, noPrice=0;
  let paidSum=0, paidBase=0, recCount=0; // 실구매 기록 통계

  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    const plan = myPlans[id];
    if(plan==='pass'){ passed.push(it.nm); return; }
    if(!sheetMine(id)) return;

    const pi = priceIntel(it, id);
    const rec = myBuys[id];
    // 🥇 판정 1등 브랜드로 샀는지 — "똑똑하게 샀다"의 근거
    let top = false;
    if(rec && rec.b && typeof brandRankFor==='function'){
      const rk = brandRankFor(it, id);
      top = !!(rk && rk.rows[0] && rec.b.startsWith(rk.rows[0].nm));
    }
    const row = { nm:it.nm, cat:c.nm, brand: rec?rec.b:null, paid: rec&&rec.p?rec.p:null, pi, top };

    if(sheetChecked.has(id)){ bought.push(row); }
    else if(plan==='carrot'){ carrot.push(row); }
    else if(plan==='hand'){ hand.push(row); }
    else { toBuy.push(row); }

    // 물려받은 항목은 시세만큼 아낀 것 — 실지출 절약 통계에도 반영
    if(rec){ recCount++; if(rec.p || rec.ch==='물려받음' || rec.ch==='선물받음'){ paidSum += rec.p||0; paidBase += pi ? pi.base : (rec.p||0); } }

    // 예상 지출 (구매 완료는 실지출로)
    if(sheetChecked.has(id)){
      if(rec && (rec.p || rec.ch==='물려받음' || rec.ch==='선물받음')){ baseSum += pi?pi.base:(rec.p||0); carrotSum += rec.p||0; }
      else if(pi){ baseSum += pi.base; carrotSum += pi.base; }
      else noPrice++;
    }else if(pi){
      baseSum += pi.base;
      carrotSum += (plan==='carrot') ? Math.round((pi.carrotLo+pi.carrotHi)/2)
                 : (plan==='hand')   ? 0
                 : pi.base;
    }else noPrice++;
  }));
  return {bought, toBuy, carrot, hand, passed, baseSum, carrotSum, noPrice, paidSum, paidBase, recCount};
}

function manwon(v){
  if(v >= 10000) return (Math.round(v/1000)/10).toLocaleString() + '만원';
  return v.toLocaleString() + '원';
}

function openReport(){
  const d = reportData();
  const total = d.bought.length + d.toBuy.length + d.carrot.length + d.hand.length;
  if(!total && !d.passed.length){
    toast('스탠다드에서 새제품으로 살지, 중고로 살지 먼저 골라보세요!');
    return;
  }
  const items = planListItems('sheet');
  const decided = items.filter(x=>myPlans[x.id]).length;
  const save = d.baseSum - d.carrotSum;
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;

  const li = (row, kind) => {
    const brand = row.brand ? `<b>${row.top?'🥇 ':''}${row.brand}</b>` : '';
    let price = '';
    if(kind==='bought') price = row.paid ? row.paid.toLocaleString()+'원' : '';
    else if(kind==='carrot') price = row.pi ? `${won(row.pi.carrotLo)}~${won(row.pi.carrotHi)}` : '';
    else if(kind==='hand') price = row.pi ? `${won(row.pi.base)} 아낌` : '0원';
    else price = row.pi ? `~${won(row.pi.dealAt)}` : '';
    return `<div class="rp-item"><span class="rp-nm">${row.nm}</span>${brand}<span class="rp-price">${price}</span></div>`;
  };

  const complete = d.toBuy.length===0 && d.carrot.length===0 && d.hand.length===0 && d.bought.length>0 && d.bought.every(r=>r.brand);
  const smartSave = d.paidBase - d.paidSum;

  const prepRate = items.length ? Math.round(decided/items.length*100) : 0;
  const topPicks = d.bought.filter(r=>r.top).length;
  const dday = (typeof state!=='undefined' && state.dday>0) ? state.dday : null;

  const body = document.getElementById('report-body');
  body.innerHTML = `
    <div class="rp-hero">
      <div class="ss-over">SOHAENGSEONG SMART LIST</div>
      <h2>🌠 ${PROFILE.nick}의<br>똑똑한 리스트</h2>
      <p>${dateStr}${dday?` · 출산 D-${dday}`:''} · 판정 데이터로 만든 준비물 플랜</p>
      ${complete?'<div class="rp-medal">🏅 리스트 100% 완성 — 전부 사고 전부 기록했어요</div>':''}
      <div class="rp-sum">
        ${topPicks?`<span class="hl">🥇 판정 1등픽 ${topPicks}</span>`:''}
        <span>🛍️ 살 것 ${d.toBuy.length}</span><span>🥕 당근 ${d.carrot.length}</span>${d.hand.length?`<span>🎁 물려 ${d.hand.length}</span>`:''}<span>✅ 샀어요 ${d.bought.length}</span>${d.passed.length?`<span>🚫 패스 ${d.passed.length}</span>`:''}
      </div>
    </div>

    <div class="rp-stats">
      <div class="rp-stat"><b>${prepRate}%</b><span>플랜 진행률</span></div>
      <div class="rp-stat"><b>${save>0?manwon(save):'0원'}</b><span>새것 대비 절약</span></div>
      <div class="rp-stat"><b>${(smartSave>0&&d.paidSum)?manwon(smartSave):(d.recCount+'건')}</b><span>${(smartSave>0&&d.paidSum)?'시세보다 아낌':'구매 기록'}</span></div>
    </div>

    ${d.recCount?`
    <div class="rp-brain">
      <h3>🧠 똑똑 지수</h3>
      <div class="rp-money-row"><span>구매 기록</span><b>${d.recCount}건${topPicks?` · 판정 1등 브랜드 ${topPicks}개`:''}</b></div>
      ${d.paidSum?`<div class="rp-money-row"><span>실제로 쓴 돈</span><b>${manwon(d.paidSum)}</b></div>`:''}
      ${smartSave>0?`<div class="rp-save">💡 시세보다 ${manwon(smartSave)} 똑똑하게 샀어요!</div>`
        : d.paidSum?`<div class="rp-money-row"><span>시세 대비</span><b>딱 시세에 샀어요</b></div>`:''}
    </div>`:''}

    <div class="rp-money">
      <div class="rp-money-row"><span>새것으로 다 사면</span><b>${manwon(d.baseSum)}</b></div>
      <div class="rp-money-row big"><span>${d.hand.length?'당근·물려받기 활용하면':'당근 활용하면'}</span><b>${manwon(d.carrotSum)}</b></div>
      ${save>0?`<div class="rp-save">💸 ${manwon(save)} 절약 플랜!</div>`:''}
      ${d.noPrice?`<span class="rp-note">시세 미집계 ${d.noPrice}개 제외 · 가격은 참고용</span>`:`<span class="rp-note">가격은 관측 시세 기준 참고용</span>`}
    </div>

    ${d.toBuy.length?`<div class="rp-sec"><h3>🛍️ 살 것 <span>매수 기준가</span></h3>${d.toBuy.map(r=>li(r,'buy')).join('')}</div>`:''}
    ${d.carrot.length?`<div class="rp-sec carrot"><h3>🥕 당근에서 찾을 것 <span>적정가</span></h3>${d.carrot.map(r=>li(r,'carrot')).join('')}</div>`:''}
    ${d.hand.length?`<div class="rp-sec hand"><h3>🎁 물려받을 것 <span>0원으로 해결</span></h3>${d.hand.map(r=>li(r,'hand')).join('')}</div>`:''}
    ${d.bought.length?`<div class="rp-sec done"><h3>✅ 이미 준비했어요</h3>${d.bought.map(r=>li(r,'bought')).join('')}</div>`:''}
    ${d.passed.length?`<div class="rp-pass">🚫 패스: ${d.passed.join(' · ')}</div>`:''}

    <div class="rp-footer">
      <div class="rp-logo">🌠 소행성 육아플래너</div>
      <p>수천 명의 판정이 고른 것만, 브랜드와 적정가까지<br>나도 만들기 → <b>jtkim1107-sudo.github.io/momsplanner</b></p>
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
  const items = planListItems('sheet');
  const decided = items.filter(x=>myPlans[x.id]).length;
  const prepRate = items.length ? Math.round(decided/items.length*100) : 0;
  const topPicks = d.bought.filter(r=>r.top).length;
  const dday = (typeof state!=='undefined' && state.dday>0) ? ` · D-${state.dday}` : '';
  const smartSave = d.paidBase - d.paidSum;
  // 헤드라인은 제일 큰 숫자(절약액)가 따옴표로 말한다 — 받는 사람이 3초 안에 반응하게
  const headline = smartSave>0 ? `"시세보다 ${manwon(smartSave)} 아끼고 샀어요"`
                 : save>0      ? `"새것으로 다 사는 것보다 ${manwon(save)} 아끼는 플랜"`
                 :               `"판정 데이터로 3분 만에 준비물 정리 끝"`;
  const text = `🌠 ${PROFILE.nick}의 똑똑한 출산준비${dday}\n`
    + `${headline}\n`
    + `━━━━━━━━━━━━━━\n`
    + `✅ 플랜 ${prepRate}% 완성${topPicks?` · 🥇 판정 1등 브랜드 ${topPicks}개`:''}\n`
    + `💰 새것 ${manwon(d.baseSum)} → 내 플랜 ${manwon(d.carrotSum)}\n`
    + `수천 명 선배맘 판정으로 골랐어요\n`
    + `👉 나도 만들기 https://jtkim1107-sudo.github.io/momsplanner/`;
  if(navigator.share){
    navigator.share({title:'소행성 출산 준비 리포트', text}).catch(()=>{});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>toast('리포트 요약을 복사했어요 — 붙여넣기 하세요!'));
  }else{
    toast('스크린샷으로 캡처해서 공유해주세요 📸');
  }
}

// ============================================================
// 📤 리스트 리포트 (전 리스트 공용) — 내 기록·메모를 그대로, 자랑하기 좋게
// ============================================================
function listSource(key){
  if(key==='postpartum') return {
    title:'조리원 출산가방', emoji:'🧳',
    cats: POSTPARTUM_CATEGORIES, idFn:(ci,ii)=>ppItemId(ci,ii), checked:()=>ppChecked,
  };
  const L = PREP_ENGINE[key];
  return {
    title: L.title, emoji: L.emoji,
    cats: L.cats, idFn:(ci,ii)=>plItemId(key,ci,ii), checked:()=>plState(key).checked,
  };
}

function listReportData(key){
  const src = listSource(key);
  const chk = src.checked();
  const cats=[]; let recCount=0, paidSum=0, paidBase=0, checkedCount=0, mineCount=0, topPicks=0, memoCount=0, totalItems=0, passCount=0;
  src.cats.forEach((c,ci)=>{
    const rows=[];
    c.items.forEach((it,ii)=>{
      const id = src.idFn(ci,ii);
      totalItems++;
      if(myPlans[id]==='pass'){ passCount++; return; }
      const mine = chk.has(id) || myPlans[id]==='buy' || myPlans[id]==='carrot';
      if(!mine) return;
      mineCount++;
      const rec = myBuys[id];
      const pi = (typeof priceIntel==='function') ? priceIntel(it, id) : null;
      let top=false;
      if(rec && rec.b && typeof brandRankFor==='function'){
        const rk = brandRankFor(it, id);
        top = !!(rk && rk.rows[0] && rec.b.startsWith(rk.rows[0].nm));
      }
      if(top) topPicks++;
      const done = chk.has(id);
      if(done) checkedCount++;
      const memo = (typeof myNotes!=='undefined' && myNotes[id] && myNotes[id].trim()) ? myNotes[id].trim() : null;
      if(memo) memoCount++;
      if(rec){ recCount++; if(rec.p || rec.ch==='물려받음' || rec.ch==='선물받음'){ paidSum += rec.p||0; paidBase += pi ? pi.base : (rec.p||0); } }
      rows.push({nm:it.nm, chk:done, brand:rec?rec.b:null, paid:rec&&rec.p?rec.p:null, ch:rec?rec.ch:null, top, memo});
    });
    if(rows.length) cats.push({nm:c.nm, emoji:c.emoji, rows});
  });
  // 완주 = 전 판정템 결정 끝 (챙기거나 패스) — 보상·여정과 같은 정의
  const complete = totalItems>0 && checkedCount===mineCount && (mineCount+passCount)===totalItems;
  return {cats, recCount, paidSum, paidBase, checkedCount, mineCount, topPicks, memoCount, totalItems, passCount, complete, src};
}

function openListReport(key){
  const d = listReportData(key);
  if(!d.mineCount){
    toast('스탠다드에서 담기부터 눌러보세요!');
    return;
  }
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()}`;
  const dday = (typeof state!=='undefined' && state.dday>0) ? state.dday : null;
  const rate = Math.round(d.checkedCount/d.mineCount*100);
  const smartSave = d.paidBase - d.paidSum;
  const complete = d.complete;

  const li = r => `<div class="rp-item">
      <span class="rp-chk">${r.chk?'✅':'◻️'}</span><span class="rp-nm">${r.nm}</span>
      ${r.brand?`<b>${r.top?'🥇 ':''}${r.brand}</b>`:''}
      <span class="rp-price">${r.paid?r.paid.toLocaleString()+'원':(r.ch&&!r.brand?r.ch:'')}</span>
    </div>${r.memo?`<div class="rp-memo">✏️ ${r.memo}</div>`:''}`;

  const body = document.getElementById('report-body');
  body.innerHTML = `
    <div class="rp-hero">
      <div class="ss-over">SOHAENGSEONG STANDARD</div>
      <h2>${d.src.emoji} ${PROFILE.nick}의<br>${d.src.title}</h2>
      <p>${dateStr}${dday?` · 출산 D-${dday}`:''} · 선배맘 판정 리스트로 골랐어요</p>
      ${complete?'<div class="rp-medal">🏅 리스트 완주 — 전 항목 결정 끝</div>':''}
      <div class="rp-sum">
        <span>✅ 챙김 ${d.checkedCount}/${d.mineCount}</span>
        ${d.recCount?`<span>📝 기록 ${d.recCount}건</span>`:''}
        ${d.topPicks?`<span class="hl">🥇 판정 1등픽 ${d.topPicks}</span>`:''}
      </div>
    </div>

    <div class="rp-stats">
      <div class="rp-stat"><b>${rate}%</b><span>챙김률</span></div>
      <div class="rp-stat"><b>${d.recCount}건</b><span>구매 기록</span></div>
      <div class="rp-stat"><b>${(smartSave>0&&d.paidSum)?manwon(smartSave):(d.paidSum?manwon(d.paidSum):'—')}</b><span>${(smartSave>0&&d.paidSum)?'시세보다 아낌':'쓴 돈'}</span></div>
    </div>

    ${d.cats.map(c=>`<div class="rp-sec"><h3>${c.emoji} ${c.nm}</h3>${c.rows.map(li).join('')}</div>`).join('')}

    <div class="rp-footer">
      <div class="rp-logo">🌠 소행성 육아플래너</div>
      <p>수천 명의 판정으로 만든 준비물 리스트<br>나도 만들기 → <b>jtkim1107-sudo.github.io/momsplanner</b></p>
    </div>

    <div class="rp-actions">
      <button class="rp-share" onclick="shareListReport('${key}')">공유하기</button>
      <button class="rp-close" onclick="closeReport()">닫기</button>
    </div>
    <p class="rp-hint">📸 길게 스크롤 캡처하면 카페·카톡에 올리기 딱 좋아요</p>
  `;
  document.getElementById('report-veil').classList.add('on');
}

function shareListReport(key){
  const d = listReportData(key);
  const dday = (typeof state!=='undefined' && state.dday>0) ? ` · D-${state.dday}` : '';
  const smartSave = d.paidBase - d.paidSum;
  const complete = d.complete;
  const headline = complete       ? `"${d.src.title} ${d.totalItems}개 전부 결정 완료!"`
                 : smartSave>0    ? `"판정 브랜드로 시세보다 ${manwon(smartSave)} 아꼈어요"`
                 :                  `"선배맘 판정 리스트로 3분 만에 정리 끝"`;
  const recLines = [];
  d.cats.forEach(c=> c.rows.forEach(r=>{
    if(r.brand && recLines.length<6) recLines.push(`· ${r.nm} — ${r.top?'🥇':''}${r.brand}${r.paid?` ${r.paid.toLocaleString()}원`:''}`);
  }));
  const text = `${d.src.emoji} ${PROFILE.nick}의 ${d.src.title}${dday}\n`
    + `${headline}\n`
    + `━━━━━━━━━━━━━━\n`
    + `✅ 챙김 ${d.checkedCount}/${d.mineCount}${d.recCount?` · 📝 기록 ${d.recCount}건`:''}${d.topPicks?` · 🥇 1등픽 ${d.topPicks}개`:''}\n`
    + (recLines.length? recLines.join('\n')+'\n':'')
    + `👉 나도 만들기 https://jtkim1107-sudo.github.io/momsplanner/`;
  if(navigator.share){
    navigator.share({title:'소행성 육아플래너 — '+d.src.title, text}).catch(()=>{});
  }else if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=>toast('리포트를 복사했어요 — 붙여넣기 하세요!'));
  }else{
    toast('스크린샷으로 캡처해서 공유해주세요 📸');
  }
}

// 하위 호환 별칭
function openPpReport(){ openListReport('postpartum'); }
function sharePpReport(){ shareListReport('postpartum'); }
