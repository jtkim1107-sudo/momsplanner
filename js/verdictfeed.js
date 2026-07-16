// ============================================================
// 소행성 육아플래너 — 본체 앱 판정 연동 어댑터
// ------------------------------------------------------------
// 본체 소행성 앱의 "이 육아템, 살까 말까?" 판정 플로우에서 쌓이는
// 데이터를 체크리스트의 결론으로 변환한다.
//   판정 1문항: 필요했다 / 필요없었다  → need %
//   본격 판정: 어떻게 구했어요? (새제품·중고·대여·선물받음·구매안함)
//             + 사용시기 · 브랜드 · 한마디 (별똥별 3조각)
// 실서비스에선 이 파일이 판정 집계 API 응답으로 대체된다.
// 아래 샘플은 실제 판정 화면 형식 그대로 (유아 자석칠판 = 13/21명 박빙).
// ============================================================

const VERDICT_FEED = {
  // 출산 준비물 — brands: 본격 판정의 브랜드 응답 집계 (점유율순)
  '유모차':            {need:93, n:412, ch:{'새제품':38,'중고':44,'대여':5,'선물받음':11,'구매안함':2},
                        brands:[{nm:'오이스터',p:23,won:680000},{nm:'잉글레시나',p:19,won:850000},{nm:'부가부',p:14,won:1390000}]},
  '젖병소독기':        {need:78, n:214, ch:{'새제품':52,'중고':31,'대여':6,'선물받음':8,'구매안함':3},
                        brands:[{nm:'유팡',p:41,won:280000},{nm:'에디슨',p:22,won:230000},{nm:'픽셀',p:11,won:260000}]},
  '아기욕조':          {need:81, n:186, ch:{'새제품':47,'중고':28,'대여':3,'선물받음':17,'구매안함':5},
                        brands:[{nm:'슈너글',p:32,won:35000},{nm:'마더케이',p:21,won:30000},{nm:'말랑하니',p:17,won:20000}]},
  '역류방지쿠션':      {need:64, n:143, ch:{'새제품':41,'중고':33,'대여':2,'선물받음':16,'구매안함':8},
                        brands:[{nm:'로토토',p:38,won:46000},{nm:'엔젤앤비',p:16,won:40000},{nm:'포몽드',p:9,won:36000}]},
  '바운서':            {need:52, n:97,  hot:true, ch:{'새제품':24,'중고':48,'대여':11,'선물받음':9,'구매안함':8},
                        brands:[{nm:'베이비뵨',p:34,won:240000},{nm:'포맘스',p:18,won:320000},{nm:'타이니러브',p:12,won:130000}]},
  '도넛방석 (회음부 방석)': {need:49, n:26, hot:true, ch:{'새제품':55,'중고':14,'대여':0,'선물받음':22,'구매안함':9}}, // 30명 미만 — 순위 비공개 (신뢰 게이트)
  // 조리원 준비물
  '손목 보호대':       {need:71, n:58,  ch:{'새제품':66,'중고':9,'대여':0,'선물받음':19,'구매안함':6},
                        brands:[{nm:'언더렉스',p:44,won:25000},{nm:'다이소',p:13,won:5000},{nm:'멀티맘',p:8,won:15000}]},
  '다리마사지기':      {need:47, n:41,  hot:true, ch:{'새제품':31,'중고':27,'대여':18,'선물받음':15,'구매안함':9},
                        brands:[{nm:'LG',p:21,won:590000},{nm:'샤오미',p:18,won:130000},{nm:'휴롬',p:9,won:450000}]},
};

function verdictFeedFor(it){
  const f = VERDICT_FEED[it.nm] || null;
  if(f && !f.nm) f.nm = it.nm; // 쿠팡 검색어 등에 품목명 사용
  return f;
}

// 📈 역대가 스파크라인 — 시드 고정 12주 가격 흐름 재현 + 역대최저
// 실서비스에선 가격 트래킹 API(다나와·쿠팡 이력)가 이 자리를 대체한다.
function sparkSeries(brand, itemNm, won){
  const r = bdRng(bdSeed('spark-'+brand+'-'+(itemNm||'')));
  const pts=[]; let v = won * (1.04 + r()*0.14);
  for(let i=0;i<11;i++){
    pts.push(v);
    v = Math.max(won*0.82, Math.min(won*1.25, v * (0.94 + r()*0.1)));
  }
  pts.push(won); // 마지막 점 = 현재 적정가
  return pts;
}

// 1등 브랜드의 역대가 요약 — 스탠다드 겉면 배지와 상세 그래프가 같은 숫자를 말한다
function bestPriceInfo(it, id){
  let brand=null, won=0;
  const f = verdictFeedFor(it);
  if(f && f.n>=30 && f.brands && f.brands[0] && f.brands[0].won){
    brand = f.brands[0].nm; won = f.brands[0].won;
  }else if(typeof brandRankFor==='function' && typeof priceIntel==='function'){
    const rk = brandRankFor(it, id), pi = priceIntel(it, id);
    if(rk && !rk.real && rk.rows[0] && pi){
      brand = rk.rows[0].nm;
      const r = bdRng(bdSeed('bw-'+id+'-0')); // brandRankHtml의 1등 시세와 동일 시드
      won = Math.round(pi.base * (0.9 + r()*0.12) / 100) * 100;
    }
  }
  if(!brand || !won) return null;
  const pts = sparkSeries(brand, it.nm, won);
  const lo = Math.min(...pts);
  return {brand, won, lo: Math.round(lo/1000)*1000, isLow: won <= lo*1.03};
}

function priceSparkHtml(brand, itemNm, won){
  if(!won) return '';
  const pts = sparkSeries(brand, itemNm, won);
  const lo = Math.min(...pts), hi = Math.max(...pts);
  const loR = Math.round(lo/1000)*1000;
  const W=46, H=15;
  const xy = pts.map((p,i)=>[ (i/11)*W, (H-2) - ((p-lo)/((hi-lo)||1))*(H-4) ]);
  const path = xy.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const mi = pts.indexOf(lo);
  const isLow = won <= lo*1.03; // 지금이 역대가 수준
  return `<span class="spark" title="12주 가격 흐름 · 역대최저 ${vfWon(loR)}">
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path d="${path}" fill="none" stroke="${isLow?'#5C7F63':'#BCA483'}" stroke-width="1.4"/><circle cx="${xy[mi][0].toFixed(1)}" cy="${xy[mi][1].toFixed(1)}" r="2" fill="#C4552D"/></svg>
    <em>${isLow?'지금이 역대가 🔥':'역대가 '+vfWon(loR)}</em>
  </span>`;
}

// 🛒 쿠팡 검색 링크 — 브랜드+품목 바로 검색 (추후 파트너스 링크로 교체할 자리)
function coupangLink(brand, itemNm){
  const item = (itemNm||'').replace(/\(.*?\)/g,'').split('·')[0].trim();
  const q = encodeURIComponent((brand+' '+item).trim());
  return `<a class="cp-link" href="https://www.coupang.com/np/search?q=${q}" target="_blank" rel="noopener" onclick="event.stopPropagation()">쿠팡 ↗</a>`;
}

// 판정 집계 → 5단계 결론 (30명 미만이면 결론 유보)
function feedConclusion(f){
  if(f.n < 30) return null;
  const used = 100 - (f.ch['구매안함']||0);
  const secondhand = (f.ch['중고']||0) + (f.ch['대여']||0);
  if(f.hot || (f.need>=45 && f.need<=55)) return {k:'try', label:'하나만 사보세요'};
  if(f.need < 25)  return {k:'no',     label:'절대 사지 마세요'};
  if(f.need < 45)  return {k:'closet', label:'장롱템, 패스하세요'};
  if(f.need >= 60 && secondhand >= Math.max(...Object.values(f.ch))) return {k:'carrot', label:'무조건 당근하세요'};
  if(f.need >= 75 && used >= 90) return {k:'yes', label:'무조건 필요해요'};
  if(f.need >= 60) return {k:'yes', label:'무조건 필요해요'};
  return {k:'try', label:'하나만 사보세요'};
}

// 카드 배지: 실제 참여 수 (+ 논쟁템)
function feedBadge(f){
  let b = '';
  if(f.hot) b += `<span class="badge hot">🔥 논쟁템</span>`;
  b += (f.n >= 30)
    ? `<span class="badge vcount">⚖️ ${f.n.toLocaleString()}명 판정</span>`
    : `<span class="badge collecting">🔓 판정 ${f.n}/30 · ${30-f.n}명 남음</span>`;
  if(f.n >= 30 && f.brands && f.brands[0]) b += `<span class="badge rank1">🥇 ${f.brands[0].nm}</span>`; // 판정 완료 → 1등 브랜드 노출
  return b;
}

// 상세(2뎁스): 판정 파이차트 — "몇 명 중 몇 %가 필요하다고 했나"
// 겉면 배지(N명 판정)·결론 칩과 수치가 논리적으로 일치해야 신뢰가 생긴다.
function verdictPieHtml(v, opts){
  const chips = Object.entries(v.ch||{})
    .filter(([,x])=>x>0)
    .sort((a,b)=>b[1]-a[1])
    .map(([k,x])=>`<span>${k} ${x}%</span>`).join('');
  return `
    <div class="vf">
      <span class="vf-head">📊 선배맘 판정 · ${v.n.toLocaleString()}명 참여${v.hot?' · 박빙 진행 중':''}</span>
      <div class="vf-flex">
        <div class="pie" style="background:conic-gradient(#7FA487 0 ${v.need}%, #E4D4C6 ${v.need}% 100%)"><b>${v.need}%</b><span>필요했다</span></div>
        <div class="vf-side">
          <div class="vf-leg"><i class="lg-g"></i>필요했다 <b>${v.need}%</b> (${Math.round(v.n*v.need/100).toLocaleString()}명)</div>
          <div class="vf-leg"><i class="lg-r"></i>필요없었다 <b>${100-v.need}%</b></div>
          ${chips?`<div class="vf-ch">${chips}</div>`:''}
        </div>
      </div>
      ${opts && opts.extra ? opts.extra : ''}
      <span class="vf-src">${(opts && opts.src) || '소행성 앱 판정 데이터 연동'}</span>
    </div>`;
}
// 🔓 언락 진행바 — 부족함이 참여 동기가 되도록 (N명 남으면 결론이 열려요)
function unlockHtml(n){
  const pct = Math.min(100, Math.round(n/30*100));
  return `<div class="vf-unlock">
    <div class="vu-bar"><div class="vu-fill" style="width:${pct}%"></div></div>
    <span>🔓 <b>${30-n}명</b>만 더 판정하면 결론·브랜드 순위가 열려요 — 커뮤니티 '살까 말까'에서 참여!</span>
  </div>`;
}
function feedDetailHtml(f){
  const extra = (f.n<30 ? unlockHtml(f.n) : '') + feedRankHtml(f);
  return verdictPieHtml({need:f.need, n:f.n, ch:f.ch, hot:f.hot}, {extra});
}

// 결론이 아직 없는 판정템 = 판정 모집 중 — 겉면 🔓 n/30 배지와 상세 진행바가 같은 숫자
function simCollectN(id){
  const r = bdRng(bdSeed('cl-'+id));
  return 6 + Math.round(r()*22); // 6~28명 — 30명 게이트 미달
}

// 판정 미연동 항목의 분포 재현 — 배지 숫자(verdictCount)·결론과 반드시 일치
// 실서비스에선 판정 집계 API가 이 자리를 대체한다.
function simVerdict(it, id){
  if(verdictFeedFor(it)) return null;                        // 연동 항목은 실데이터
  if(typeof verdictCount!=='function' || typeof sheetConclusion!=='function') return null;
  const n = verdictCount(it, id);                            // 겉면 배지와 같은 숫자
  if(!n) return null;
  const c = sheetConclusion(it);
  if(!c) return null;
  const r = bdRng(bdSeed('sv-'+id));
  let need;
  if(c.k==='try')         need = 46 + Math.round(r()*9);     // 하나만 사보세요 = 박빙
  else if(c.k==='carrot') need = 64 + Math.round(r()*20);    // 필요하되 중고가 이득
  else if(c.k==='yes')    need = 76 + Math.round(r()*18);    // 무조건 필요해요 = 압도적
  else return null;
  // 획득 채널 분포 — 당근 결론이면 중고가 1위 (결론의 근거가 분포에 있어야 한다)
  const carrotTop = c.k==='carrot' || !!it.carrot;
  let hi = 30 + Math.round(r()*18), lo = 14 + Math.round(r()*12);
  const rent = Math.round(r()*7), gift = 6 + Math.round(r()*12);
  const none = Math.max(1, Math.round((100-need)/4));
  const newP = carrotTop ? lo : hi, usedP = carrotTop ? hi : lo;
  const sum = newP+usedP+rent+gift+none;
  const sc = 100/sum;
  const ch = {'새제품':Math.round(newP*sc), '중고':Math.round(usedP*sc), '대여':Math.round(rent*sc), '선물받음':Math.round(gift*sc)};
  ch['구매안함'] = Math.max(0, 100 - ch['새제품'] - ch['중고'] - ch['대여'] - ch['선물받음']);
  return {need, n, ch};
}

// 판정 완료 상품의 브랜드 1·2·3등 + 브랜드별 적정가 — 30명 미만이면 비공개
function vfWon(v){ return v>=100000 ? Math.round(v/10000)+'만원' : v.toLocaleString()+'원'; }
function feedRankHtml(f){
  if(!f.brands || !f.brands.length) return '';
  if(f.n < 30) return `<div class="vf-rank wait">🏷️ 브랜드 순위는 판정 30명부터 공개돼요</div>`;
  const medals = ['🥇','🥈','🥉'];
  const rows = f.brands.slice(0,3).map((b,i)=>{
    const price = b.won ? `<span class="rk-price">${vfWon(b.won)}</span>` : '';
    return `<div class="vf-rk"><span class="rk-medal">${medals[i]}</span>
      <span class="rk-nm">${b.nm} <b>${b.p}%</b></span>${price}${b.won?priceSparkHtml(b.nm, f.nm, b.won):''}${coupangLink(b.nm, f.nm)}</div>`;
  }).join('');
  return `<div class="vf-rank">
    <span class="vf-rank-head">🏆 브랜드 순위 · 적정가</span>
    ${rows}
    <span class="rk-note">점유율은 판정 브랜드 응답 · 가격은 구매 기록(뭘로·얼마에) 집계</span>
  </div>`;
}
