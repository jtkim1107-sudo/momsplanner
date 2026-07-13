// ============================================================
// 소행성 육아플래너 — 빅데이터 시뮬레이션 레이어
// ------------------------------------------------------------
// 전 구간의 구매 아이템에 대규모 판정 데이터(살까말까 비율,
// 브랜드 순위, 선배맘 댓글)를 생성해 실서비스 상태를 재현한다.
// 아이템 id 를 시드로 쓰는 고정 난수라서 새로고침해도 수치가
// 변하지 않는다. 실제 서비스에서는 이 파일 전체가 서버 집계
// API 응답으로 대체된다.
// ============================================================

// ---- 시드 고정 난수 (mulberry32 + FNV-1a) ----
function bdSeed(str){
  let h = 2166136261;
  for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function bdRng(seed){
  return function(){
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- 브랜드 풀 (가상 브랜드 — 실제 상표와 무관) ----
const BD_BRAND_POOLS = [
  {keys:['유모차'],            pool:['에어로휠','휠라이트','네스트로','캐리브','폴딩고','루나글라이드']},
  {keys:['카시트'],            pool:['세이프티온','가디안베베','락앤라이드','아이프로텍','서클시트']},
  {keys:['젖병','소독기'],     pool:['마미핏','베베보틀','순유','릴리펀트','포근수유','밀크바니']},
  {keys:['기저귀'],            pool:['보송보송','포근결','아기숨','순면일기','코튼데이']},
  {keys:['체온계','온습도계'], pool:['써모아이','헬로체크','베베써모','케어센스룸']},
  {keys:['아기띠'],            pool:['허그본','캥거루핏','포포랩','안아안아']},
  {keys:['분유'],              pool:['튼튼밀','아기꿈분유','포근한끼','마더스랩']},
  {keys:['세제','목욕','욕조'],pool:['순비누','베베클린','거품숲','포근워시']},
  {keys:['매트'],              pool:['폭신폭신','세이프그라운드','구름바닥','토닥매트']},
  {keys:['수유패드','수유나시','수유브라','수유쿠션'], pool:['마망코튼','포근품','수유일기','밀크맘']},
  {keys:['빨대컵','컵'],       pool:['쭉쭉컵','아기물병','스트로베베','꿀꺽리틀']},
  {keys:['좌욕기','방석'],     pool:['맘스케어','회복의자','포근시트','릴리프맘']},
  {keys:['모빌','체육관','치발기'], pool:['꼬망스토이','아기별토이','무지개숲','토리토리']},
  {keys:['수유등'],            pool:['달빛무드','스르르등','포근불빛']},
  {keys:['신발'],              pool:['아장아장','첫걸음슈즈','토들핏']},
  {keys:['안전문','보호대','커버','잠금','끼임'], pool:['세이프하우스','아이가드','꼼꼼이안전','베베락']},
];
const BD_BRAND_DEFAULT = ['맘앤베베','아가랑','포근네스트','리틀문','베이비웨일','슈슈베베','코코마망','달빛베베','오브베베','밤부베이비'];

function bdBrandPool(nm){
  for(const e of BD_BRAND_POOLS){
    if(e.keys.some(k=>nm.includes(k))) return e.pool;
  }
  return BD_BRAND_DEFAULT;
}

// ---- 댓글 풀 ----
const BD_NICKS = [
  '7개월아기맘','예비맘J','둘째맘','복직준비맘','초보아빠','9월예정맘','쌍둥이맘','신생아맘',
  '두돌맘','워킹맘K','밤수유중맘','새벽수유맘','15주예비맘','막달맘','산후6주맘','이유식전쟁맘',
  '뒤집기성공맘','걸음마응원맘','조리원동기맘','삼남매맘','늦둥이맘','아들쌍둥이파파','육아휴직아빠','첫째6살둘째2살'
];
const BD_WHENS = ['방금','2시간 전','어제','3일 전','1주 전','2주 전','3주 전','1개월 전','2개월 전'];

const BD_CMT_BUY = [
  '이건 진짜 사길 잘했다 싶었어요. 지금도 매일 써요',
  '없이 버텨보려다 결국 샀어요… 그냥 처음부터 사세요',
  '가성비로 시작했다가 결국 후기 좋은 걸로 갈아탔어요. 처음부터 제대로!',
  '중고로 사도 충분한 아이템이에요. 상태 좋은 매물 많아요',
  '선물로 받았는데 생각보다 활용도가 높았어요',
  '둘째 때도 그대로 다시 썼어요. 보관 잘 해두세요',
  '아기마다 취향이 갈려요. 일단 최소 수량만 사보고 늘리는 걸 추천해요',
  '조리원 동기들 사이에서도 만족도 1위였어요',
  '샀는데 우리 아기는 잘 안 맞았어요. 아기 반응 보고 추가 구매하세요',
  '출산 전엔 몰랐는데 지나고 보니 이게 제일 효자템이었어요',
];
const BD_CMT_ACT = [
  '이거 미루다가 고생했어요. 미리미리 하세요',
  '캘린더에 알림 걸어두니까 안 놓치고 챙겼어요',
  '남편이랑 같이 해두니 나중에 정말 편했어요',
  '저는 이걸 늦게 알아서 아쉬웠어요. 이 앱 보시는 분들은 꼭 챙기세요',
  '막상 해보니 30분도 안 걸렸어요. 부담 갖지 마세요',
  '병원(보건소)에 전화 한 번 해보세요. 생각보다 챙겨주는 게 많아요',
  '이 항목 덕분에 시기 안 놓쳤어요. 체크리스트 만든 분 상 주세요',
  '둘째 때는 눈감고도 하는데 첫째 땐 이런 목록이 절실했어요',
];

// ---- 생성 결과 저장소 ----
const GEN_COMMENTS = {};       // {itemId: [{who,txt,when}]}
const BIG_STATS = { moms:0, verdicts:0, comments:0 };

// ---- 메인: CONTENT 전 구간 순회하며 데이터 생성 ----
function augmentBigData(){
  let totalVerdicts = 0, totalComments = 0;

  SEGMENTS.forEach(seg=>{
    const c = CONTENT[seg.id];
    if(!c) return;
    c.groups.forEach(g=> g.items.forEach(it=>{
      const r = bdRng(bdSeed('sohaeng-' + it.id));

      // --- 판정 데이터 (구매템만, 논쟁템 제외) ---
      if(it.type === 'buy' && !it.debate){
        const baseYes = (it.verdict && it.verdict.yes) ? it.verdict.yes : 0;
        const yes = baseYes || Math.round(56 + r()*41);            // 56~97%
        // 약 12%는 아직 '판정 모으는 중' 상태로 남겨 신뢰 게이트 시연
        const collecting = !baseYes && r() < 0.12;
        const n = collecting
          ? 4 + Math.floor(r()*24)                                  // 30명 미만
          : 140 + Math.floor(r()*2860);                             // 140~3,000명
        it.verdict = { yes, n };
        totalVerdicts += n;

        // --- 브랜드 순위 ---
        if(!collecting){
          const pool = bdBrandPool(it.nm).slice();
          // 시드 셔플
          for(let i=pool.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
          const cnt = Math.min(pool.length, 3 + Math.floor(r()*3)); // 3~5개
          let re = 84 + Math.floor(r()*10);                         // 1위 84~93%
          let remain = n;
          it.rank = pool.slice(0,cnt).map((b,i)=>{
            const bn = Math.max(30, Math.floor(remain * (0.24 + r()*0.14)));
            remain -= bn;
            const row = { b, re: Math.max(55, re), n: bn };
            re -= 3 + Math.floor(r()*6);
            return row;
          });
        }else{
          delete it.rank;
        }
      }

      // --- 선배맘 댓글 생성 (샘플 댓글에 추가) ---
      const pool = it.type === 'buy' ? BD_CMT_BUY : BD_CMT_ACT;
      const cmtCnt = Math.floor(r()*4.4);                           // 0~4개
      if(cmtCnt > 0){
        const used = new Set();
        GEN_COMMENTS[it.id] = [];
        for(let i=0;i<cmtCnt;i++){
          let ti = Math.floor(r()*pool.length);
          while(used.has(ti)) ti = (ti+1) % pool.length;
          used.add(ti);
          GEN_COMMENTS[it.id].push({
            who: BD_NICKS[Math.floor(r()*BD_NICKS.length)],
            txt: pool[ti],
            when: BD_WHENS[Math.floor(r()*BD_WHENS.length)],
          });
        }
        totalComments += cmtCnt;
      }
    }));
  });

  // --- 논쟁템 스케일 업 ---
  DEBATE.count = 8437;
  DEBATE.goal = 10000;

  // --- 전체 통계 ---
  BIG_STATS.verdicts = totalVerdicts;
  BIG_STATS.comments = totalComments;
  BIG_STATS.moms = Math.round(totalVerdicts / 9.7);                 // 1인당 평균 9.7건 판정 가정

  console.log('[bigdata] 판정', totalVerdicts.toLocaleString(), '건 · 선배맘', BIG_STATS.moms.toLocaleString(), '명 · 댓글', totalComments, '개 생성');
}

augmentBigData();
