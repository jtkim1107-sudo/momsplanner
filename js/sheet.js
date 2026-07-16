// ============================================================
// 소행성 육아플래너 — 출산 준비물 시트
// ------------------------------------------------------------
// ⚠️ 기준은 '판정'이다. 원자료 = 본체 앱 판정 데이터 + 체험단 리뷰.
// 아래 선배맘 공유 자료 4종은 초기 부트스트랩용 후보 풀(학습 자료) —
// 항목들이 판정을 거쳐 '판정템'으로 확정되면 스탠다드에 오른다.
// 병합된 원자료:
//  ① 공유용 스프레드시트(2025) — 참고 브랜드 · 핫딜가 · 당근 추천
//  ② 유월맘 실사용 리스트 — 필요 개수 · 실사용 경험담
//  ③ 호호마더 미니멀 리스트 — 추천/쏘쏘/비추 판정 · 실구매가 · 구매 경로
//  ④ 봄이맘 실구매 리스트 — 실제 구매한 제품명 위주
// 필드: brands 참고 브랜드 / deal 핫딜가 / carrot 중고(당근) 추천 /
//       need 필요 개수 / prep 이미 준비 완료 / min 미니멀 필수템(호호마더 기준) /
//       link 구간 체크리스트의 같은 아이템 id (체크 상태 공유) /
//       ops  선배맘별 의견 [{who, verdict(추천|쏘쏘|비추), buy(브랜드·경로·가격), txt}]
// ============================================================

const SHEET_CATEGORIES = [
  { nm:'의류', emoji:'🧥', items:[
    {nm:'배냇저고리', how:'2~3벌만. 선물로 많이 들어와요 — 출산 전에 미리 세탁해 두기', link:'B4', min:true, need:'2~3개', ops:[
      {who:'유월맘', txt:'입는 시기가 굉장히 짧음 — 아기 몸무게랑 키에 따라 달라짐 (나는 오래 사용했어!)'},
      {who:'호호마더', buy:'4장 선물 받음', txt:'선물로 들어오는 대표템이라 미리 많이 사지 말기'},
      {who:'봄이맘', buy:'마리마리 3벌 세트 24,900원'}]},
    {nm:'바디수트', how:'계절 맞춰 4벌부터. 사이즈는 60·70 섞어서 — 금방 커요', min:true, need:'8~10개', ops:[
      {who:'유월맘', txt:'70 사이즈 구매 — 아기가 작게 태어나서 60도 많이 샀어!'},
      {who:'호호마더', verdict:'추천', buy:'유니클로 반팔 메쉬 · 60사이즈 4장 26,000원', txt:'여름 아기는 메쉬 소재가 진리'}]},
    {nm:'모자 · 손발싸개', how:'각 1~2개면 충분. 목욕 후·외출할 때 씌워요', min:true, need:'2~3개', ops:[
      {who:'유월맘', txt:'아기 딸꾹질 시 사용, 목욕하고 나면 추워서 씌워줬어!'},
      {who:'호호마더', verdict:'추천', buy:'순면 · 선물 받음'},
      {who:'봄이맘', buy:'코니 꼭지모자 미모사 1개', txt:'재입고되면 추가 구매 예정'},
      {who:'기록왕맘', buy:'아가짱 모자·손발싸개 세트 8,900원'}]},
    {nm:'손싸개', how:'2~3개. 얼굴 긁힘 방지 — 신생아 첫 달 필수', std:true, need:'8~10개', ops:[
      {who:'유월맘', txt:'아기가 손톱으로 얼굴에 상처낼 수도 있어ㅜ'},
      {who:'봄이맘', txt:'손싸개 1개면 충분, 발싸개는 굳이 없어도 양말로 대체 가능'},
      {who:'기록왕맘', buy:'밤부베베 2개 7,900원'}]},
    {nm:'발싸개 · 양말', how:'양말 2~3켤레로 대체 가능 — 따로 안 사도 돼요', std:true, need:'8~10개', ops:[
      {who:'유월맘', txt:'속싸개로 발이 가려져서 나는 아직 구매 안 했어'},
      {who:'봄이맘', buy:'위드 오가닉 양말 6,900원'}]},
    {nm:'속싸개', how:'3~4장. 토하면 바로 갈아줘야 해요 — 출산 전 세탁', link:'B5', min:true, need:'3~4개', ops:[
      {who:'유월맘', txt:'분유 토하고 하면 속싸개가 많이 필요하더라구'},
      {who:'호호마더', verdict:'추천', buy:'순면 · 선물 받음'},
      {who:'봄이맘', txt:'밤부베베 천기저귀로 대체했어'},
      {who:'기록왕맘', buy:'밤부베베 2장 19,800원'}]},
    {nm:'스와들업', need:'3~4개', carrot:true, ops:[
      {who:'유월맘', txt:'당근으로도 많이 사는데, 신생아 때는 손 부분을 입으로 빨아서 새 걸로 샀어'},
      {who:'봄이맘', buy:'스칸디맘'}]},
    {nm:'세탁망', how:'사이즈별 세트 1개. 아기 빨래는 따로 돌려요', std:true, need:'3개', ops:[
      {who:'유월맘', txt:'사이즈별 세트로 구매'},
      {who:'봄이맘', buy:'다이소 무형광 세탁망 · 3,000원'}]},
    {nm:'아기 세탁세제', how:'1통. 아기 옷 전부 출산 전에 미리 세탁하기', link:'B7', min:true, need:'1개', ops:[
      {who:'유월맘', txt:'아기 세제는 필수!'},
      {who:'호호마더', verdict:'비추', buy:'마더케이 · 네이버 13,200원'},
      {who:'봄이맘', buy:'프랭클린'}]},
    {nm:'아기 섬유유연제', how:'세제랑 같이 1통 — 같은 브랜드면 편해요', min:true, need:'1개', ops:[
      {who:'호호마더', verdict:'추천', buy:'레드루트 · 네이버 31,680원'},
      {who:'봄이맘', buy:'프랭클린'}]},
    {nm:'턱받이', ops:[
      {who:'봄이맘', buy:'마리데 · 뚜띠뚜띠 · 알파베베 유령빕'}]},
    {nm:'옷장 or 서랍', need:'1개', ops:[
      {who:'유월맘', txt:'신생아 시기 지나고 옷 많아지면 필요!!!'},
      {who:'봄이맘', buy:'소유2 수납장'}]},
  ]},
  { nm:'수유용품', emoji:'🍼', items:[
    {nm:'젖병세척솔', how:'젖병 살 때 같이 1세트. 한 달마다 교체하는 소모품', min:true, brands:'마더케이', need:'넉넉히', ops:[
      {who:'유월맘', txt:'소모품이라 한 달에 한 번 교체'},
      {who:'호호마더', verdict:'추천', buy:'베베그로우 · 쿠팡 6,000원'},
      {who:'봄이맘', buy:'마더케이 (젖꼭지 솔 · 집게까지 세트로)'}]},
    {nm:'젖꼭지세척솔', brands:'마더케이', deal:'9,020원 (7개)'},
    {nm:'젖병세정제', how:'1통. 주방세제 말고 아기 전용으로', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'비앤비 · 쿠팡 4,540원'},
      {who:'봄이맘', buy:'프랭클린'}]},
    {nm:'젖병+젖꼭지', how:'160ml 2~3개로 시작. 아기 취향 확인하고 추가 구매', link:'B2', min:true, brands:'더블하트 · 헤겐 · 닥터브라운 · 모윰', deal:'14,000원 (4개)', need:'160ml 6개 · 240ml 4개', ops:[
      {who:'유월맘', txt:'완분 기준 160ml 6~8개 추천! 처음엔 160만 쓰니까 240은 차차 추가해도 돼'},
      {who:'호호마더', verdict:'추천', buy:'닥터브라운 프리미 · 쿠팡 32,100원'},
      {who:'호호마더', verdict:'쏘쏘', buy:'레이퀸 · 선물 들어옴'},
      {who:'봄이맘', buy:'모윰 유리젖병 2 · 로열세브르 세라믹 1 · 엘리젖병 1', txt:'완분 기준 6~8개'}]},
    {nm:'젖꼭지', how:'SS 2개부터 — 쓰는 젖병과 같은 브랜드로', std:true, brands:'더블하트 · 베베그로우 등', deal:'3,400원', need:'SS 4개 · S 6개', ops:[
      {who:'유월맘', txt:'금방 사이즈업 할 것 같아서 S를 더 샀어'},
      {who:'봄이맘', buy:'더블하트 모유실감 S·M', txt:'로열세브르랑도 호환 가능'}]},
    {nm:'젖병소독기', how:'처음엔 열탕(냄비)로 충분. 기계는 써보고 결정', std:true, brands:'유팡 · 픽셀', deal:'유팡 28만원대 · 픽셀 26만원대', ops:[
      {who:'유월맘', txt:'세척기를 들이면 소독기는 안 들이는 추세 같은데, 나는 소독기 사서 잘 쓰는 중이야'},
      {who:'봄이맘', txt:'열탕파 — 휘슬러 곰솥 냄비 연마해서 쓰고 있어'}]},
    {nm:'젖병집게', brands:'마더케이'},
    {nm:'젖병건조대', how:'1개. 소독기에 건조 기능 있으면 생략 가능', std:true, brands:'마더케이', prep:true, ops:[
      {who:'유월맘', txt:'세척기 있으면 없어도 될 것 같아'},
      {who:'기록왕맘', buy:'옥소 · 32,900원'}]},
    {nm:'젖병세척기', brands:'베이비브레짜', deal:'300,510원', ops:[
      {who:'유월맘', txt:'요즘 엄청 유행하는 육아용품 — 있으면 좋을 것 같아'}]},
    {nm:'수유시트 · 쿠션', how:'일단 1개만. 수유 방식 정해지기 전엔 더 사지 않기', link:'C3', min:true, brands:'더스베이비(수유쿠션) · 알프레미오(수유시트)', carrot:true, prep:true, ops:[
      {who:'유월맘', txt:'분유 먹이다 보니 안 쓰게 돼서 추천은 안 해!'},
      {who:'호호마더', verdict:'쏘쏘', buy:'마더스베이비 수유쿠션 · 쿠팡 48,580원'},
      {who:'호호마더', verdict:'비추', buy:'알프레미오 수유시트 · 쿠팡 18,000원'},
      {who:'기록왕맘', buy:'뉴코코맘 수유시트'}]},
    {nm:'분유제조기', brands:'베이비브레짜', deal:'24~25만원대', prep:true, ops:[
      {who:'유월맘', txt:'나는 세척이 어렵고 불편할 것 같아서 안 샀어!'}]},
    {nm:'분유포트', how:'1개. 새벽 수유 때 체감 최고 — 첫만남이용권으로 사기 좋아요', min:true, brands:'릴리브 · 보르르', deal:'릴리브 11만원대 · 보르르 6만원대', need:'1개', ops:[
      {who:'유월맘', txt:'릴리브 쓰는 중 — 첫만남이용권으로 샀고 매우 만족!'},
      {who:'호호마더', verdict:'추천', buy:'오쿠 · 쿠팡 67,150원'}]},
    {nm:'분유쉐이커', ops:[
      {who:'봄이맘', buy:'해님 v2'},
      {who:'기록왕맘', buy:'꿈비'}]},
    {nm:'분유', link:'B3', how:'작은 통 1개만 비상용. 병원에서 먹인 분유 확인 후 결정', std:true, ops:[
      {who:'봄이맘', buy:'압타밀 에센시스 · 800g 38,000원', txt:'비상용 소량부터'}]},
    {nm:'백색소음기 (수유등)', link:'NC2', brands:'말랑하니', deal:'34,200원', ops:[
      {who:'봄이맘', buy:'말랑허니 백색소음기'},
      {who:'기록왕맘', buy:'일리맘 수유등+백색소음기'}]},
    {nm:'모유저장팩', how:'1팩. 모유수유 계획 있을 때 — 물려받아도 충분', min:true, brands:'마더케이', ops:[
      {who:'호호마더', verdict:'추천', buy:'마더케이 · 모윰 등 물려받음'},
      {who:'봄이맘', buy:'스펙트라 60매 9,900원'}]},
    {nm:'쪽쪽이', link:'NC3', brands:'스와비넥스 · 모윰 · 누크 · 아벤트 등', need:'2개', ops:[
      {who:'유월맘', txt:'애바애지만 대부분 생후 50일은 지나야 무는 편이래'},
      {who:'봄이맘', buy:'모윰 1 · 엘리 1', txt:'취향 확인용으로 하나씩'},
      {who:'기록왕맘', buy:'더블하트 · 모윰 · 누크 · 스펙트라', txt:'취향템이라 브랜드별로 하나씩 시도'}]},
  ]},
  { nm:'피부용품', emoji:'🧴', items:[
    {nm:'시카리페어크림 (침독크림)', brands:'몽디에스 등'},
    {nm:'태열키트', brands:'쁘리마쥬', deal:'68,400원'},
    {nm:'수딩젤', brands:'몽디에스 · 쁘리마쥬 · 아토팜 등', ops:[
      {who:'유월맘', txt:'여름 아기 필수템'},
      {who:'봄이맘', buy:'몽디에스 · 아토팜'}]},
    {nm:'기저귀발진크림', how:'1개 상비. 발진은 예고 없이 와요', min:true, brands:'쁘리마쥬 · 비판텐', ops:[
      {who:'유월맘', txt:'발진 났을 때나 다쳤을 때 필수'},
      {who:'호호마더', verdict:'추천', buy:'비판텐 · 퇴원 시 받음'},
      {who:'기록왕맘', buy:'비판텐 100g 14,900원'}]},
    {nm:'로션 · 크림 · 오일', how:'로션 1개부터. 보건소 선물로 받는 경우 많으니 확인 후 구매', min:true, brands:'몽디에스 · 쁘리마쥬 · 아토팜 등', ops:[
      {who:'호호마더', verdict:'쏘쏘', buy:'궁중비책 · 보건소 선물'},
      {who:'봄이맘', buy:'쁘리마쥬 · 킨더프리제'},
      {who:'기록왕맘', buy:'세타필 베이비 로션 · 쿠팡 21,900원'}]},
  ]},
  { nm:'목욕용품', emoji:'🛁', items:[
    {nm:'아기욕조', how:'1개면 충분. 신생아는 물로만 씻겨요', link:'B8', min:true, brands:'슈너글 · 온다베이비', deal:'슈너글 34,900원', need:'1~2개', ops:[
      {who:'유월맘', txt:'씻길용·헹굴용 두 개라는데, 신생아는 물로만 씻으니 하나로도 충분해'},
      {who:'호호마더', verdict:'추천', buy:'OK베이비 신생아 욕조 · 물려받음'},
      {who:'호호마더', verdict:'쏘쏘', buy:'니스툴그로우 · 네이버 19,900원'},
      {who:'봄이맘', buy:'말랑허니'},
      {who:'기록왕맘', buy:'마더케이 · 말랑하니'}]},
    {nm:'샤워필터'},
    {nm:'세면대 워터탭', how:'세면대에서 씻길 거면 1개 — 허리가 살아요', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'올스테인리스 · 쿠팡 12,800원', txt:'세면대 목욕할 때 유용'},
      {who:'봄이맘', buy:'대림바스 디클린 세면대용 멀티필터탭'}]},
    {nm:'바디워시', how:'1개. 신생아 목욕은 주 2회면 충분', min:true, need:'1개', ops:[
      {who:'호호마더', verdict:'쏘쏘', buy:'궁중비책 샴푸&워시 · 보건소 선물'},
      {who:'봄이맘', buy:'쁘리마쥬 (샴푸 · 바디워시) 17,900원'}]},
    {nm:'목욕수건', how:'큰 것 2장. 천기저귀로 대체해도 돼요', std:true, ops:[
      {who:'유월맘', txt:'신생아는 일주일에 2번 정도만 씻겨도 된대!'},
      {who:'봄이맘', buy:'후드타월 2장 15,900원'}]},
    {nm:'천기저귀', how:'5장. 수건·블랭킷·손수건 대체까지 되는 만능템', std:true, brands:'밤부베베 · 무루', deal:'4,817원', need:'5개', ops:[
      {who:'유월맘', txt:'샤워 후 수건 대용으로 많이 썼어 — 신생아 땐 블랭킷 대용으로도!'},
      {who:'봄이맘', buy:'밤부베베', txt:'천기저귀를 수건으로 쓰고 있어'}]},
    {nm:'아기 수건', how:'2~3장. 새 어른 수건으로 대체해도 OK', std:true, brands:'대림바스', deal:'24,845원'},
    {nm:'아기 비데', brands:'힙비 · 포프베베', deal:'78,000원', ops:[
      {who:'유월맘', txt:'포브베베 많이 쓰는데 화장실이 좁다면 휴대용 추천'},
      {who:'봄이맘', buy:'포브베베'}]},
    {nm:'엉덩이클렌저'},
    {nm:'욕조클리너', need:'1개'},
    {nm:'탕온계'},
  ]},
  { nm:'위생용품', emoji:'🧻', items:[
    {nm:'거즈손수건', how:'20장부터. 어차피 더 사게 되는 1순위 소모품', link:'B13', min:true, brands:'밤부베베', need:'50개 이상', ops:[
      {who:'유월맘', txt:'1년 이상 쓰는 손수건은 넉넉하게!'},
      {who:'호호마더', verdict:'추천', buy:'한스네이쳐 20장 · 네이버 10,000원', txt:'미니멀은 20장으로도 충분했어'},
      {who:'봄이맘', buy:'밤부베베 거즈 · 엠보', txt:'수납은 다이소 수납함이 딱 맞아'}]},
    {nm:'엠보손수건', brands:'밤부베베'},
    {nm:'지퍼백', brands:'마더케이', ops:[
      {who:'유월맘', txt:'출산하러 갈 때 아기 옷 넣어 갔어 — 태어나기 전에 미리 세탁해서 보관해놨어'},
      {who:'봄이맘', buy:'마더케이', txt:'옷 세탁 후 보관용'}]},
    {nm:'온습도계', how:'아기 자는 방에 1개. 22~24℃ · 50~60% 맞추기', link:'B10', std:true, brands:'휴비딕', carrot:true, ops:[
      {who:'유월맘', txt:'보건소 같은 데서 선물로도 많이 들어오는 편이야'},
      {who:'봄이맘', buy:'휴비딕 2개 · 개당 15,900원', txt:'거실이랑 아기방 하나씩'}]},
    {nm:'체온계', how:'비접촉이나 귀 체온계 1개 — 퇴원 전 필수', link:'B9', min:true, need:'1개', ops:[
      {who:'유월맘', txt:'지역 출산축하 선물로 브라운 체온계 받았어!'},
      {who:'호호마더', verdict:'추천', buy:'브라운 · 네이버 60,000원'},
      {who:'기록왕맘', verdict:'추천', buy:'브라운 6025'}]},
    {nm:'건티슈', brands:'마더케이'},
    {nm:'물티슈', how:'캡형 1박스. 방마다 하나씩 두게 돼요', std:true, min:true, brands:'베베숲 · 브라운', deal:'3만4천원대', ops:[
      {who:'호호마더', verdict:'추천', buy:'브라운 프리미엄 · 쿠팡 28,900원'},
      {who:'봄이맘', buy:'베베숲'}]},
    {nm:'소독티슈', brands:'그린핑거 · 퓨어닷', deal:'28,740원'},
    {nm:'콧물흡입기', how:'1개 상비. 첫 감기 때 새벽에 찾게 돼요', std:true, brands:'노시부', prep:true, ops:[
      {who:'봄이맘', buy:'한일 포근'},
      {who:'기록왕맘', buy:'한일 포근 · 49,000원'}]},
    {nm:'손톱가위 · 깎이', how:'신생아용 1세트. 생후 1주부터 손톱 관리 시작', link:'B12', min:true, brands:'마더케이 · 더블하트(가위)', deal:'7,250원', need:'1개', ops:[
      {who:'유월맘', txt:'가위랑 깎이 둘 다 샀어'},
      {who:'호호마더', verdict:'추천', buy:'알리익스프레스 세트 · 5,000원'},
      {who:'봄이맘', buy:'베이비 클라우드 3in1 네일트리머'}]},
    {nm:'신생아면봉', how:'1통. 배꼽 소독하고 콧구멍 정리할 때', std:true, brands:'마더케이', need:'1통', ops:[
      {who:'봄이맘', buy:'마더케이 신생아 유아 면봉 3종세트 · 8,900원'}]},
  ]},
  { nm:'기저귀', emoji:'👶', items:[
    {nm:'기저귀 (밴드형)', how:'신생아용 1팩만! 샘플로 브랜드 테스트부터 — 쟁이면 낭비', link:'B6', min:true, ops:[
      {who:'호호마더', verdict:'쏘쏘', buy:'하기스 이른둥이 · 쿠팡 42,900원'},
      {who:'호호마더', verdict:'쏘쏘', buy:'하기스 1단계 · 쿠팡 40,680원', txt:'사이즈 금방 커지니 쟁이지 말기'},
      {who:'봄이맘', txt:'미리 너무 많이 사지 말고 샘플 신청해서 골라!'}]},
    {nm:'트롤리', brands:'코코맘 · 이케아', deal:'70,920원', ops:[
      {who:'유월맘', txt:'신생아 때는 옷장 대신 쓸 수 있어'}]},
    {nm:'기저귀갈이대', brands:'소베맘', deal:'81,310원', carrot:true, prep:true, ops:[
      {who:'유월맘', txt:'고민하다 안 샀는데, 수납장으로 대신하니 딱히 아쉽진 않아!'},
      {who:'봄이맘', buy:'도노도노'}]},
    {nm:'기저귀정리함', need:'1개', ops:[
      {who:'유월맘', txt:'기저귀갈이대가 있다면 필수는 아니야'}]},
    {nm:'방수커버', brands:'포몽드 · 마리데'},
    {nm:'기저귀쓰레기통', min:true, brands:'매직캔', deal:'47,710원', ops:[
      {who:'호호마더', verdict:'추천', buy:'홈플러스 · 19,900원', txt:'전용 제품 아니어도 뚜껑 있는 통이면 충분'},
      {who:'기록왕맘', buy:'매직캔'}]},
  ]},
  { nm:'침구류', emoji:'🛏️', items:[
    {nm:'아기침대', how:'1개. 당근 시세부터 확인 — 새것의 1/6 가격도 나와요', link:'B11', min:true, brands:'리안 · 이케아 · 스토케', deal:'18만원대', carrot:true, prep:true, ops:[
      {who:'유월맘', txt:'원목·휴대용 등 다양하니 취향대로 — 나는 아직 이동식 쓰고 있어!'},
      {who:'호호마더', verdict:'추천', buy:'뉴나 · 당근 30,000원', txt:'당근으로 사면 새것 대비 1/6 가격'},
      {who:'봄이맘', buy:'도노도노 키큰 침대 (신생아) → 소유2 싱글침대'}]},
    {nm:'이불세트', how:'1세트. 두꺼운 이불은 금지 — 얇은 걸 여러 장', std:true, brands:'포몽드', prep:true, ops:[
      {who:'봄이맘', buy:'포몽드 · 89,000원'}]},
    {nm:'블랭킷 (얇은 담요)', how:'얇은 것 2장. 여름엔 이걸로 이불 대체', min:true, brands:'아뜰리에슈', prep:true, ops:[
      {who:'유월맘', txt:'신생아 땐 천기저귀를 블랭킷 대용으로도 쓸 수 있어'},
      {who:'호호마더', verdict:'쏘쏘', buy:'알리익스프레스 2개 · 12,000원'}]},
    {nm:'두상베개', brands:'라비킷', deal:'39,800원', need:'1~2개', ops:[
      {who:'유월맘', txt:'두상 때문에 필요하다는데 사실 잘 베고 자진 않아ㅜ'}]},
    {nm:'방수요 (방수누비패드)', how:'3~4장. 침대와 기저귀 가는 자리에 깔기', min:true, need:'3~4개', ops:[
      {who:'유월맘', txt:'생각보다 소변이 자주 새서 침대랑 기저귀갈이대에 깔기 필수'},
      {who:'호호마더', verdict:'추천', buy:'쁘리엘르 · 쿠팡 10,170원'},
      {who:'봄이맘', buy:'라비킷 방수매트'}]},
    {nm:'역류방지쿠션', how:'1개. 당근에서 살 땐 푹 꺼진 것 피하기', min:true, carrot:true, need:'1개', ops:[
      {who:'유월맘', txt:'당근에서 살 땐 숨 안 죽은 걸로 잘 고르기! 첫만남이용권 사용 가능해'},
      {who:'호호마더', verdict:'추천', buy:'로토토 · 물려받음'},
      {who:'봄이맘', buy:'엔젤앤비 · 45,000원'}]},
    {nm:'바운서', carrot:true, need:'1개', ops:[
      {who:'유월맘', txt:'종류 많고 아기 취향 타서 새제품보다 당근 추천! 우리 아긴 잘 써'},
      {who:'봄이맘', buy:'크래들 스윙 · 포맘스(자동) · 베이비뵨(수동)'}]},
    {nm:'쿨매트', need:'1~2개', ops:[
      {who:'유월맘', txt:'여름 아니어도 아기가 더워할 수 있어 — 많이 울다 보면 땀이 많이 나'},
      {who:'봄이맘', buy:'포몽드'}]},
    {nm:'옆눕베개', need:'1개', ops:[
      {who:'유월맘', txt:'아기 취향을 탈 수 있어서 고민해보고 사야 해'}]},
  ]},
  { nm:'외출용품', emoji:'🚗', items:[
    {nm:'겉싸개', how:'계절 맞춰 1개. 퇴원하는 날 바로 필요해요', std:true, brands:'워낙 다양', carrot:true, need:'1~2개', ops:[
      {who:'유월맘', txt:'겨울엔 접종하러 갈 때 필수더라!'},
      {who:'봄이맘', buy:'아뜰리에슈 블랭킷 39,000원', txt:'아뜰리에 슈 블랭킷으로 대체했어'}]},
    {nm:'카시트', link:'B1', how:'출산 전에 설치와 장착 연습까지 끝내기 — 퇴원날 법적 필수', std:true, brands:'브라이텍스 · 다이치 · 맥시코시 · 조이 등', ops:[
      {who:'유월맘', txt:'생후 한 달간은 바구니 카시트 추천'},
      {who:'봄이맘', buy:'브라이텍스 프로 럭스 아이사이즈 · 백화점 55만원대'},
      {who:'기록왕맘', buy:'조이'}]},
    {nm:'바구니카시트', carrot:true, ops:[
      {who:'기록왕맘', buy:'순성'}]},
    {nm:'아기띠 · 힙시트', how:'매장에서 실착 후 구매. 생후 1개월부터 본격 사용', link:'NC5', std:true, brands:'포그내 · 코니 · 아이엔젤 · 베이비뵨 등', carrot:true, ops:[
      {who:'유월맘', txt:'신생아 시기 이후에 많이 쓰는 편이야!'},
      {who:'기록왕맘', buy:'닥터엔젤 · 베베스완 · 신품 18만원대'}]},
    {nm:'슬링', need:'1개', ops:[
      {who:'유월맘', txt:'신생아 시기에만 쓰지만 많이들 쓴대 — 고민 중이야'}]},
    {nm:'유모차', link:'B14', how:'당근 매물부터 확인. 신생아 사용 가능 모델인지 체크', min:true, brands:'오이스터3 · 에그2 · 오르빗 · 부가부 등', carrot:true, ops:[
      {who:'유월맘', txt:'6개월 전까지는 디럭스나 절충형 추천'},
      {who:'호호마더', verdict:'추천', buy:'잉글레시나 · 당근 중고 35,000원', txt:'유모차야말로 당근이 진리'},
      {who:'봄이맘', buy:'잉글레시나 일렉타 절충형'},
      {who:'기록왕맘', buy:'오이스터4 · 신품 68만원대'}]},
    {nm:'유모차패드'},
    {nm:'쿨시트 · 웜시트', ops:[
      {who:'봄이맘', buy:'폴레드 에어러브 통풍시트'}]},
    {nm:'휴대용 방수패드'},
    {nm:'유모차커버 (방풍 · 레인 등)'},
    {nm:'보틀워머'},
    {nm:'일회용젖병', brands:'마더케이 · 유미'},
    {nm:'휴대용 분유포트', brands:'보아르', deal:'4만원대'},
    {nm:'휴대용 쪽쪽이 소독기', brands:'픽셀 · 모윰', carrot:true},
  ]},
  { nm:'산모용', emoji:'🤱', items:[
    {nm:'수유브라', link:'A5', how:'와이어 없는 걸로 2개만 — 가슴 사이즈가 계속 변해요', min:true, ops:[
      {who:'호호마더', verdict:'비추', buy:'브이랩 · 쿠팡 35,800원', txt:'입어보고 사는 걸 추천'}]},
    {nm:'도넛방석 (회음부 방석)', how:'1개. 퇴원 후 2주의 삶의 질을 결정해요', link:'C2', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'마더스베이비 · 쿠팡 11,880원'}]},
    {nm:'마이비데 물티슈', how:'1팩 상비 — 산후 회복기 필수', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'크리넥스 마이비데 · 쿠팡 6,200원'}]},
    {nm:'유축기', link:'C4', how:'사기 전에 보건소 무료 대여부터 확인!', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'스펙트라 2대 · 물려받음', txt:'보건소 무료 대여도 있으니 사기 전에 확인!'},
      {who:'기록왕맘', buy:'스펙트라 듀얼콤팩트 · 신품 25만원대'}]},
    {nm:'유축 깔때기 세트', how:'새것 1세트. 유축기는 중고여도 깔때기는 위생상 새것', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'스펙트라 · 네이버 10,000원', txt:'깔때기는 위생상 새것으로'}]},
  ]},
  { nm:'발달 · 기타', emoji:'🧸', items:[
    {nm:'모빌 (타이니 등)', how:'흑백 1개. 당근 3만원대 — 첫만남이용권도 가능', link:'NC1', std:true, carrot:true, need:'1개', ops:[
      {who:'유월맘', txt:'새제품 10만원대, 당근이면 3만원 정도 — 첫만남이용권으로 샀어!'},
      {who:'봄이맘', buy:'프롬식스 우드 흑백모빌'},
      {who:'기록왕맘', buy:'디즈니 · 타이니러브 · 6만원대'}]},
    {nm:'초점책', how:'1권. 신생아 눈엔 흑백 대비만 보여요', std:true, need:'1개', ops:[
      {who:'봄이맘', buy:'아카시아 봉봉 패브릭 흑백 초점책'},
      {who:'기록왕맘', buy:'라운드그라운드 · 9,800원'}]},
    {nm:'아기체육관', link:'GA3', need:'1개', ops:[
      {who:'유월맘', txt:'애바애라 잘 안 노는 아가도 있어ㅜ'}]},
    {nm:'홈캠 (베이비캠)', how:'1대. 아기 잘 때 딴 일 할 자유가 생겨요', ops:[
      {who:'호호마더', verdict:'추천', buy:'티피링크 · 네이버 82,600원', txt:'아기 자는 동안 딴 일 볼 수 있는 육아 필수템'},
      {who:'봄이맘', buy:'헤이홈 프로 플러스 5MP'}]},
    {nm:'애착인형', ops:[
      {who:'봄이맘', buy:'커틀앤카이드'}]},
    {nm:'아기 식탁의자', link:'GD2', ops:[
      {who:'봄이맘', buy:'스토케 트립트랩 하이체어 + 뉴본 · 베이비 · 트레이 세트', txt:'커버는 베베드빈 자수커버로'}]},
    {nm:'이유식 제조기', link:'GD3', ops:[
      {who:'봄이맘', buy:'닌자 바이탈믹서'}]},
    {nm:'가습기 · 필터 관리', ops:[
      {who:'봄이맘', buy:'발뮤다', txt:'필터는 베이킹소다 · 구연산으로 청소'}]},
    {nm:'비타민D', ops:[
      {who:'유월맘', txt:'엄마 선택사항 — 필수로 안 먹여도 돼요'}]},
    {nm:'유산균', ops:[
      {who:'유월맘', txt:'엄마 선택사항 — 필수로 안 먹여도 돼요'}]},
  ]},
];

// ---- 상태 (준비여부 · 구매수량 · 미니멀/맥시멀 모드) ----
const SHEET_CHK_KEY = 'sohaengseong-sheet-checked';
const SHEET_QTY_KEY = 'sohaengseong-sheet-qty';
const SHEET_MODE_KEY = 'sohaengseong-sheet-mode';

let sheetMode = 'std'; // 'std' 표준 리스트(전체) | 'mine' 내 리스트(체크·사기로 한 것)
try{
  const m = localStorage.getItem(SHEET_MODE_KEY);
  if(m==='std'||m==='mine') sheetMode = m;
}catch(e){}
function setSheetMode(m){
  if(sheetMode===m) return;
  sheetMode = m;
  sheetFilter = false; // 모드 바꾸면 필터 초기화
  try{ localStorage.setItem(SHEET_MODE_KEY, m); }catch(e){}
  renderSheet();
}

// 🎯 하나씩 준비하는 분들용 — 남은 것만 모아 보기
let sheetFilter = false;
function toggleSheetFilter(){ sheetFilter = !sheetFilter; renderSheet(); }
// 스탠다드: 아직 플랜 안 정한 것 / 내 리스트: 체크·기록이 안 끝난 것
function sheetItemDone(it, id){
  return sheetMode==='std' ? !!myPlans[id] : (sheetChecked.has(id) && !!myBuys[id]);
}
// 내 리스트 = 체크했거나 새제품 구매/당근으로/물려받기로 정한 항목 (패스만 뺀 나만의 리스트)
function sheetMine(id){
  return sheetChecked.has(id) || myPlans[id]==='buy' || myPlans[id]==='carrot' || myPlans[id]==='hand';
}
// 표준 구성 = 미니멀 필수(min) + 공통 필수(std) — 나머지는 '선택템'으로 접어둠
function isStd(it){ return !!(it.min || it.std); }
// 스탠다드에 올라가는 것 = 사야 하는 것만. 판정상 장롱템·사지마세요는 아예 안 올림
function stdListed(it){
  if(!isStd(it)) return false;
  const c = sheetConclusion(it);
  return !(c && (c.k==='no' || c.k==='closet'));
}
// 스탠다드 표시용 결론은 딱 두 개 — 무조건 필요해요 / 하나만 사보세요
// (당근이 이득이란 정보는 '판정 결과' 줄이 당근 시세로 말해준다)
function displayConclusion(it){
  const c = sheetConclusion(it);
  if(!c) return null;
  if(c.k==='carrot') return {k:'yes', label:'무조건 필요해요'};
  return c;
}
function sheetVisible(it, id){ return sheetMode==='mine' ? sheetMine(id) : stdListed(it); }

function sheetItemId(ci, ii){ return 'sh' + ci + '-' + ii; }

function sheetDefaultChecked(){
  const s = new Set();
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{ if(it.prep) s.add(sheetItemId(ci,ii)); }));
  return s;
}
let sheetChecked = sheetDefaultChecked();
let sheetQty = {};
try{
  const sc = localStorage.getItem(SHEET_CHK_KEY);
  if(sc) sheetChecked = new Set(JSON.parse(sc));
  const sq = localStorage.getItem(SHEET_QTY_KEY);
  if(sq) sheetQty = JSON.parse(sq);
}catch(e){}
function saveSheet(){
  try{
    localStorage.setItem(SHEET_CHK_KEY, JSON.stringify([...sheetChecked]));
    localStorage.setItem(SHEET_QTY_KEY, JSON.stringify(sheetQty));
  }catch(e){}
}

// ---- 구간 체크리스트 연동 ----
const TL_SHEET_LINK = {}; // 구간 아이템 id → 시트 항목 위치
SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
  if(it.link) TL_SHEET_LINK[it.link] = {ci, ii, it};
}));
function sheetInfoFor(tlId){
  const e = TL_SHEET_LINK[tlId];
  return e ? e.it : null;
}
function tlSegIdx(tlId){
  for(let i=0;i<SEGMENTS.length;i++){
    const c = CONTENT[SEGMENTS[i].id];
    if(c && c.groups.some(g=>g.items.some(x=>x.id===tlId))) return i;
  }
  return -1;
}
// 시작 시 한쪽만 체크돼 있으면 양쪽 다 체크로 정합
function reconcileSheetLinks(){
  Object.entries(TL_SHEET_LINK).forEach(([tlId, e])=>{
    const sid = sheetItemId(e.ci, e.ii);
    if(checked.has(tlId) || sheetChecked.has(sid)){ checked.add(tlId); sheetChecked.add(sid); }
  });
}

// ---- 결론 5단계 ----
// 선배맘 의견(추천/쏘쏘/비추)·당근 추천을 집계해 한 줄 결론:
// 무조건 필요해요 / 하나만 사보세요 / 무조건 당근하세요 / 장롱템, 패스하세요 / 절대 사지 마세요
function sheetConclusion(it){
  // 본체 앱 판정 데이터가 있으면 그 집계가 결론의 원천
  if(typeof verdictFeedFor==='function'){
    const f = verdictFeedFor(it);
    if(f) return feedConclusion(f); // 30명 미만이면 null → 결론 유보
  }
  const ops = it.ops||[];
  let rec  = ops.filter(o=>o.verdict==='추천').length;
  const bad  = ops.filter(o=>o.verdict==='비추').length;
  const soso = ops.filter(o=>o.verdict==='쏘쏘').length;
  if(it.min) rec++; // 미니멀 필수 선정 = 추천 한 표
  if(bad>0 && rec===0 && soso===0) return {k:'no',     label:'절대 사지 마세요'};
  if(bad>0 && rec===0)             return {k:'closet', label:'장롱템, 패스하세요'};   // 쏘쏘+비추
  if(bad>0 && rec>0)               return {k:'try',    label:'하나만 사보세요'};      // 의견 갈림
  if(it.carrot && rec>0)           return {k:'carrot', label:'무조건 당근하세요'};
  if(rec>0 && soso>rec)            return {k:'try',    label:'하나만 사보세요'};
  if(rec>0)                        return {k:'yes',    label:'무조건 필요해요'};
  if(it.carrot)                    return {k:'carrot', label:'무조건 당근하세요'};
  if(soso>0)                       return {k:'try',    label:'하나만 사보세요'};
  return null; // 아직 의견 없음
}

// ---- 판정 규모 티어 — 결론 난 템에 "N명 판정템" 신뢰 배지 ----
// 실서비스에선 서버 집계 판정 수. 베타에선 시드 고정 난수로 재현하고
// 100 / 300 / 500 / 1,000 / 3,000명 단위로 끊어 보여준다.
const VERDICT_TIERS = [3000, 2000, 1000, 500, 300, 100, 50];
function verdictCount(it, id){
  if(!sheetConclusion(it)) return null;           // 결론 없으면 아직 판정 중
  const r = bdRng(bdSeed('vc-' + id));
  const boost = it.min ? 6 : it.std ? 2.5 : 1;    // 필수템일수록 판정도 많다
  const n = Math.round((40 + r()*220) * boost * (1 + (it.ops||[]).length*0.4));
  for(const t of VERDICT_TIERS) if(n >= t) return t;
  return null;                                    // 50명 미만 — 표시 안 함 (신뢰 게이트)
}
function verdictBadge(it, id){
  // 본체 앱 판정 연동 항목은 실제 참여 수를 그대로
  if(typeof verdictFeedFor==='function'){
    const f = verdictFeedFor(it);
    if(f) return feedBadge(f);
  }
  const t = verdictCount(it, id);
  return t ? `<span class="badge vcount">⚖️ ${t.toLocaleString()}명 판정템</span>` : '';
}

// ---- 브랜드 후보 추출 — 항목이 이미 아는 유명 브랜드를 칩으로 ----
const BRAND_STOPWORDS = ['순면','선물','당근','새것','새거','물려받음','보건소','제공','기타'];
function sheetBrandCandidates(it){
  const out = [];
  const push = v => {
    v = (v||'').replace(/\(.*?\)/g,'').trim();
    if(!v || /^\d/.test(v) || BRAND_STOPWORDS.includes(v)) return; // 수량·일반명사는 브랜드가 아님
    if(!out.includes(v) && out.length<8) out.push(v);
  };
  // 판정 순위 브랜드가 있으면 그게 최우선 후보 (1등부터)
  if(typeof verdictFeedFor==='function'){
    const f = verdictFeedFor(it);
    if(f && f.n>=30 && f.brands) f.brands.forEach(b=> push(b.nm));
  }
  // 추천 판정을 받은 브랜드부터 — "어떤 브랜드를 사야 하는지"의 근거
  (it.ops||[]).forEach(o=>{ if(o.verdict==='추천' && o.buy) push(o.buy.split('·')[0].split(' ')[0]); });
  if(it.brands) it.brands.split('·').forEach(push);         // 참고 브랜드 필드
  (it.ops||[]).forEach(o=>{ if(o.buy) push(o.buy.split('·')[0].split(' ')[0]); }); // 선배맘이 산 브랜드
  return out;
}

// ---- 브랜드 순위 — 전 품목 "어떤 브랜드를 사야 하는지" ----
// 판정 연동 항목은 실제 판정 브랜드 순위, 나머지는 관측 브랜드(추천 우선)에
// 시드 고정 점유율을 붙여 재현. 실서비스에선 판정 집계로 대체.
function brandRankFor(it, id){
  if(typeof verdictFeedFor==='function'){
    const f = verdictFeedFor(it);
    if(f){
      if(f.n>=30 && f.brands) return {rows:f.brands, real:true};
      return null; // 판정 진행 중 — 순위 비공개
    }
  }
  const cands = sheetBrandCandidates(it);
  if(!cands.length) return null;
  const r = bdRng(bdSeed('brk-'+id));
  const p1 = Math.round(24 + r()*22);
  const p2 = Math.round(p1*(0.45 + r()*0.3));
  const p3 = Math.round(p2*(0.4 + r()*0.4));
  return {rows: cands.slice(0,3).map((nm,i)=>({nm, p:[p1,p2,p3][i]})), real:false};
}
function brandRankHtml(it, id){
  const rk = brandRankFor(it, id);
  if(!rk || rk.real) return ''; // 판정 연동 항목은 feedDetailHtml이 그린다
  const medals = ['🥇','🥈','🥉'];
  return `<div class="vf sim">
    <div class="vf-rank">
      <span class="vf-rank-head">🏆 브랜드 순위 · 선배맘 관측</span>
      ${rk.rows.map((b,i)=>`<div class="vf-rk"><span class="rk-medal">${medals[i]}</span><span class="rk-nm">${b.nm} <b>${b.p}%</b></span></div>`).join('')}
      <span class="rk-note">구매 기록 기반 관측치 · 판정이 쌓이면 정확해져요</span>
    </div>
  </div>`;
}

// ---- 시세 가이드 — 내 리스트 전용 ----
// 이미 수집된 가격(핫딜가 deal · 선배맘 실구매가 buy)에서 기준가를 뽑고,
// 역대 최저 · 매수 기준선 · 당근 적정가를 시드 고정 난수로 산출한다.
// 실서비스에서는 가격 트래킹 API로 대체되는 자리.
function parseWon(str){
  if(!str) return null;
  let m = str.match(/([\d,]{4,})원/);          // 34,900원
  if(m) return parseInt(m[1].replace(/,/g,''));
  m = str.match(/(\d+)만\s*(\d)천원대/);      // 3만4천원대
  if(m) return (+m[1])*10000 + (+m[2])*1000;
  m = str.match(/(\d+)~?\d*만원대/);           // 28만원대 · 24~25만원대
  if(m) return (+m[1])*10000;
  return null;
}
function itemBasePrice(it, id){
  const cands = [];
  const d = parseWon(it.deal); if(d) cands.push(d);
  (it.ops||[]).forEach(o=>{
    if(o.buy && /당근|중고|물려|선물/.test(o.buy)) return; // 중고·물려받은 가격은 새것 시세가 아님
    const v = parseWon(o.buy); if(v) cands.push(v);
  });
  if(id && myBuys[id] && myBuys[id].p && myBuys[id].ch==='새것') cands.push(myBuys[id].p); // 내 새것 구매가도 관측치
  if(!cands.length) return null;
  return Math.max(...cands); // 새 상품 기준가는 관측치 중 최댓값
}
function round100(v){ return Math.round(v/100)*100; }
function priceIntel(it, id){
  const base = itemBasePrice(it, id);
  if(!base || base < 2000) return null;
  const r = bdRng(bdSeed('price-'+id));
  return {
    base: round100(base),
    low: round100(base*(0.62 + r()*0.13)),      // 역대 최저
    dealAt: round100(base*(0.78 + r()*0.07)),   // 이 밑이면 사세요
    carrotLo: round100(base*0.35),
    carrotHi: round100(base*0.5),
  };
}
const won = v => v.toLocaleString()+'원';
function priceRowEl(it, id){
  const div = document.createElement('div');
  div.className = 'price-row';
  const pi = priceIntel(it, id);
  if(!pi){
    div.innerHTML = `<span class="pr-head">💸 시세 가이드</span><span class="pr-wait">아직 모으는 중 — 구매 기록이 쌓이면 열려요</span>`;
    return div;
  }
  const carrotPlan = myPlans[id]==='carrot';
  const handPlan = myPlans[id]==='hand';
  div.innerHTML = `
    <span class="pr-head">💸 시세 가이드</span>
    <div class="pr-line">역대 최저 <b>${won(pi.low)}</b> · 요즘 시세 ${won(pi.base)}</div>
    ${handPlan
      ? `<div class="pr-hand">🎁 물려받으면 새것값 ${won(pi.base)}을 아끼는 셈이에요</div>`
      : `<div class="pr-buy">👉 ${won(pi.dealAt)} 이하로 보이면 바로 사세요</div>`}
    ${(carrotPlan||(it.carrot&&!handPlan))?`<div class="pr-carrot">🥕 당근 적정가 ${won(pi.carrotLo)} ~ ${won(pi.carrotHi)} — 그 이상이면 새것 핫딜이 나아요</div>`:''}
    <span class="pr-note">베타 · 관측된 구매 기록 기반, 판매처별 확인</span>
  `;
  return div;
}

// ---- 선배맘 의견 렌더 (시트 + 구간 상세 공용) ----
function opIcon(v){ return v==='추천' ? '👍' : v==='비추' ? '👎' : v==='쏘쏘' ? '😐' : '💬'; }
function opsHtml(it, id, limit, hideMore){
  const ops = [...(it.ops||[])];
  if(id && myBuys[id]) ops.push({who: PROFILE.nick+' (나)', verdict: myVerdicts[id], buy: myBuys[id].b+' · '+myBuys[id].ch+(myBuys[id].p?' '+myBuys[id].p.toLocaleString()+'원':'')});
  if(!ops.length) return '';
  // 코멘트 있는 의견 우선, 기본 2개까지 — 나머지는 접어둔다 (누더기 방지)
  const sorted = [...ops].sort((a,b)=> (b.txt?1:0)-(a.txt?1:0));
  const max = limit || 2;
  const shown = sorted.slice(0, max);
  const rest = hideMore ? 0 : sorted.length - shown.length;
  const row = o => {
    const head = o.verdict ? `${opIcon(o.verdict)} <b>${o.verdict}</b>` : '💬';
    if(o.txt){ // 코멘트가 본문, 산 것·작성자는 메타로
      const meta = [o.buy, o.who].filter(Boolean).join(' — ');
      return `<div class="op">${head} ${o.txt}<span class="op-meta">${meta}</span></div>`;
    }
    // 코멘트 없이 구매 기록만 — 산 것을 본문으로 (빈 말풍선 방지)
    return `<div class="op">${head} ${o.buy||''}<span class="op-meta">${o.who}</span></div>`;
  };
  return `<div class="ops">` + shown.map(row).join('')
    + (rest>0?`<button class="ops-more" data-oid="${id||''}">선배맘 의견 ${rest}개 더 보기</button>`:'')
    + `</div>`;
}
// "더 보기" 클릭 시 그 자리에서 전체 의견으로 펼침
function bindOpsMore(el, it, id){
  const om = el.querySelector('.ops-more');
  if(!om) return;
  om.addEventListener('click', e=>{
    e.stopPropagation();
    const wrap = om.closest('.ops');
    if(wrap) wrap.outerHTML = opsHtml(it, id, 999);
  });
}

// ---- 렌더링 ----
function sheetTotals(){
  let total=0, done=0;
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    if(!sheetVisible(it, id)) return;
    total++; if(sheetChecked.has(id)) done++;
  }));
  return {total, done};
}
function sheetCountAll(){
  let mine=0, std=0;
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    if(stdListed(it)) std++;
    if(sheetMine(sheetItemId(ci,ii))) mine++;
  }));
  return {mine, std};
}

function sheetCatCount(ci){
  let total=0, done=0;
  SHEET_CATEGORIES[ci].items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    if(!sheetVisible(it, id)) return;
    total++;
    if(sheetMode==='std' ? !!myPlans[id] : sheetChecked.has(id)) done++;
  });
  return {total, done};
}

function renderSheet(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  // 마이그레이션 — 물려받기 버튼 제거 이전에 저장된 플랜은 중고로 흡수 (유령 상태 방지)
  let migrated = false;
  Object.keys(myPlans).forEach(k=>{ if(myPlans[k]==='hand'){ myPlans[k]='carrot'; migrated = true; } });
  if(migrated) saveStars();

  // 여정 스텝바 — 담기 → 사기 → 기록 → 자랑 (토글 대체, 탭하면 그 단계로)
  const cnt = sheetCountAll();
  const mt = document.createElement('div');
  mt.className='journey';
  mt.id='journey';
  mt.innerHTML = journeyHtml(sheetJourney());
  area.appendChild(mt);

  const intro = document.createElement('div');
  if(sheetMode==='std'){
    intro.className='ss-card';
    intro.innerHTML = `
      <span class="ss-star">🌠</span>
      <div class="ss-over">SOHAENGSEONG STANDARD</div>
      <h3>소행성 스탠다드</h3>
      <p>선배맘 판정으로 확정된 <b>판정템만 올라오는 기준표</b>예요.<br>판정 결과 확인하고 <b>담기만 누르면</b> 내 리스트 완성!</p>
      <div class="ss-chips"><span>판정템 ${cnt.std}</span><span>원자료: 판정 데이터</span><span>+ 체험단 리뷰</span></div>
    `;
  }else{
    intro.className='region-card';
    intro.style.cursor='default';
    // ⚖️ 판정 통계 — 내 리스트 전체를 판정 데이터로 요약
    let stats = '';
    if(typeof reportData==='function' && typeof manwon==='function'){
      const dd = reportData();
      const sv = dd.baseSum - dd.carrotSum;
      stats = `<div class="mine-stats">
        <div><b>${manwon(dd.baseSum)}</b><span>새것 시세 합</span></div>
        <div><b>${manwon(dd.carrotSum)}</b><span>내 플랜 예상</span></div>
        <div><b>${sv>0?manwon(sv):'0원'}</b><span>판정대로면 절약</span></div>
      </div>`;
    }
    intro.innerHTML = `
      <span class="ri">✨</span>
      <div class="rc"><h3>내가 고른 리스트</h3>
      <p>항목마다 <b>⚖️ 판정 결과(뭘로 · 얼마에)</b>가 붙어요. 준비되면 체크, 기록까지 남기면 별똥별 — 생각이 바뀐 건 여기서 패스.</p>
      ${stats}
      <button class="rp-open" onclick="openReport()">📄 내 똑똑한 리스트 만들기 — 친구 공유용</button></div>
    `;
  }
  area.appendChild(intro);

  // 👉 다음 할 일 카드 — 지금 해야 할 액션 하나를 크게
  const nx = sheetNextInfo();
  if(nx){
    const fb = document.createElement('div');
    fb.className = 'next-card';
    fb.id = 'next-card';
    fb.innerHTML = nextCardHtml(nx);
    area.appendChild(fb);
  }
  // 🚀 판정 부스트 — 판정은 커뮤니티에서, 지금은 별똥별 2배
  const bs = document.createElement('button');
  bs.className = 'boost-strip';
  bs.innerHTML = `🚀 <b>런칭 부스트</b> — 커뮤니티 '살까 말까' 판정 남기면 별똥별 <b>2배</b>`;
  bs.addEventListener('click', ()=> toast('판정은 소행성 앱 커뮤니티에서 참여할 수 있어요 🌠'));
  area.appendChild(bs);

  let shownCats = 0;
  SHEET_CATEGORIES.forEach((cat,ci)=>{
    const main=[], extra=[];
    cat.items.forEach((it,ii)=>{
      const iid = sheetItemId(ci,ii);
      if(sheetFilter && sheetItemDone(it, iid)) return; // 끝낸 건 치우기
      if(sheetMode==='mine'){ if(sheetMine(iid)) main.push([it,ii]); }
      else if(stdListed(it)){ main.push([it,ii]); }
      else if(!isStd(it)){ extra.push([it,ii]); } // 판정상 패스템은 아예 안 올림
    });
    if(!main.length && !extra.length) return;
    const {total, done} = sheetCatCount(ci);
    shownCats++;
    const gEl = document.createElement('div'); gEl.className='group';
    const chip = (total>0 && done===total)
      ? '<span class="deadline done">완료 ✓</span>'
      : '<span class="deadline info">준비 중</span>';
    gEl.innerHTML = `
      <div class="group-head"><span class="overline">${cat.emoji}</span><h3>${cat.nm}</h3>${chip}<span class="gprog" id="shp-${ci}">${done}/${total}</span></div>
      <div class="group-items" id="shi-${ci}"></div>
    `;
    const holder = gEl.querySelector('#shi-'+ci);
    main.forEach(([it,ii])=> holder.appendChild(renderSheetItem(it,ci,ii)));
    if(sheetMode==='std' && extra.length && !sheetFilter){ // 집중 모드에선 선택템 감춤
      const more = document.createElement('button');
      more.className='more-row';
      more.textContent = `＋ 선택템 ${extra.length}개 더 보기`;
      more.addEventListener('click',()=>{
        more.remove();
        extra.forEach(([it,ii])=> holder.appendChild(renderSheetItem(it,ci,ii)));
      });
      holder.appendChild(more);
    }
    area.appendChild(gEl);
  });
  if(!shownCats){
    const empty = document.createElement('div');
    empty.className='collect-box';
    empty.innerHTML='<b>아직 내 리스트가 비어 있어요</b>소행성 스탠다드에서 담기를 누르면 여기 모여요.';
    area.appendChild(empty);
  }
  updateSheetProgress();
}

function renderSheetItem(it,ci,ii){
  const id = sheetItemId(ci,ii);
  const el = document.createElement('div');
  el.className = 'item' + (sheetChecked.has(id)?' checked':'');

  // 배지는 핵심만: 결론 + 판정 규모 (+ 개수는 가이드 없을 때만, 월령 점프)
  // 브랜드·핫딜가·당근추천·미니멀 배지는 의견/시세/결론과 중복이라 제거
  let badges='';
  const rawC = sheetConclusion(it);     // 원본 결론 (당근 판별용)
  const concl = displayConclusion(it);  // 표시용 — 무조건 필요해요 / 하나만 사보세요
  if(concl) badges += `<span class="badge concl ${concl.k}">${concl.label}</span>`;
  badges += verdictBadge(it, id);
  if(!it.how && it.need) badges += `<span class="badge need">${it.need}</span>`;
  if(it.link){
    const si = tlSegIdx(it.link);
    if(si>=4) badges += `<span class="badge region" data-link="${it.link}" data-seg="${si}">${SEGMENTS[si].name} ↗</span>`; // 월령 리스트로 점프
  }

  const showChk = sheetMode==='mine'; // 체크(샀어요)는 내 리스트에서

  // ⚖️ 판정 결과 한 줄 — "뭘로 · 대략 얼마에"는 실제 구매 작업대인 내 리스트에서
  // (스탠다드는 '필요하냐'는 판정만 — 무조건 필요해요 / 하나만 사보세요)
  let answer = '';
  if(sheetMode==='mine' && rawC){
    const pi = priceIntel(it, id);
    const f = (typeof verdictFeedFor==='function') ? verdictFeedFor(it) : null;
    const brand = (f && f.n>=30 && f.brands && f.brands[0]) ? f.brands[0].nm : sheetBrandCandidates(it)[0];
    let verdictLine = '';
    if(rawC.k==='yes' && pi)
      verdictLine = `<b>${brand?brand+' · ':''}${won(pi.dealAt)} 이하</b>로 사세요`;
    else if(rawC.k==='carrot' && pi)
      verdictLine = `<b>${brand?brand+' · ':''}당근 ${won(pi.carrotLo)}~${won(pi.carrotHi)}</b>에 사세요`;
    else if(rawC.k==='try' && pi)
      verdictLine = `하나만 사보세요 — <b>${won(pi.dealAt)} 이하</b>`;
    if(verdictLine) answer = `<span class="ans-k">⚖️ 판정 결과</span>${verdictLine}`;
  }

  // 투뎁스 — 겉면: 이름 · 결론 · 정답 한 줄 · 따라하기 · 대표 의견 1개
  //          상세(탭): 시세 숫자 전체 · 선배맘 의견 전체
  const ops = it.ops||[];
  const hasMore = !!(priceIntel(it, id) || ops.length || brandRankFor(it, id));
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      ${showChk?'<div class="chk"></div>':''}
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${badges?`<div class="item-badges">${badges}</div>`:''}
        ${answer?`<div class="ans">${answer}</div>`:''}
        ${it.how?`<div class="how">👉 ${it.how}</div>`:opsHtml(it, id, 1, true)}
      </div>
      ${hasMore?'<span class="item-caret">﹀</span>':''}
    </div>
    ${hasMore?'<div class="item-more"></div>':''}
  `;
  // 상세는 펼칠 때 채운다
  const moreEl = el.querySelector('.item-more');
  if(moreEl){
    el.querySelector('.item-main').addEventListener('click', ()=>{
      const open = el.classList.toggle('open');
      if(open && !moreEl.dataset.filled){
        moreEl.dataset.filled = '1';
        const f = (typeof verdictFeedFor==='function') ? verdictFeedFor(it) : null;
        if(f){ moreEl.insertAdjacentHTML('beforeend', feedDetailHtml(f)); } // 본체 판정 결과가 맨 위
        else{
          // 판정 파이차트 — 배지의 N명이 실제로 뭘 선택했는지 (숫자 일치)
          const sv = (typeof simVerdict==='function') ? simVerdict(it, id) : null;
          if(sv) moreEl.insertAdjacentHTML('beforeend', verdictPieHtml(sv, {src:'베타 · 판정 규모 기반 재현, 실판정 쌓이면 대체'}));
          moreEl.insertAdjacentHTML('beforeend', brandRankHtml(it, id));
        }
        moreEl.appendChild(priceRowEl(it, id));
        if(ops.length){
          const od = document.createElement('div');
          od.className = 'more-ops';
          od.innerHTML = opsHtml(it, id, 999);
          moreEl.appendChild(od);
        }
      }
    });
  }

  const chkEl = el.querySelector('.chk');
  if(chkEl) chkEl.addEventListener('click',e=>{
    e.stopPropagation();
    sheetChecked.has(id)?sheetChecked.delete(id):sheetChecked.add(id);
    el.classList.toggle('checked');
    const nowChecked = sheetChecked.has(id);
    if(it.link){ // 구간 체크리스트와 상태 동기화
      nowChecked ? checked.add(it.link) : checked.delete(it.link);
      saveChecked();
    }
    saveSheet();
    updateSheetProgress();
    const cc = sheetCatCount(ci);
    const gp = document.getElementById('shp-'+ci);
    if(gp) gp.textContent = cc.done+'/'+cc.total;
    if(nowChecked){
      earnStars(5, '준비물 체크', 'chk-'+(it.link||id));
      checkSmartListComplete();
    }
    updateFocusBar();
  });
  // 내 리스트에선 내가 채우는 구매 기록 빈칸 (시세 숫자는 상세에서)
  // 판정은 커뮤니티 '살까 말까'에서 따로 받는다 — 여긴 기록까지만
  if(sheetMode==='mine'){
    el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
  }

  // 스탠다드: "어떻게 살까"는 판정이 이미 답했다 — 액션은 담기 하나
  // (담으면 판정 추천 방식(새것/당근)이 자동 플랜으로, 내 리스트에서 변경 가능)
  if(sheetMode==='std'){
    const addBtn = document.createElement('button');
    const label = ()=> myPlans[id] ? '✓ 내 리스트에 담겼어요' : '🛒 내 리스트에 담기';
    addBtn.className = 'add-mine' + (myPlans[id]?' on':'');
    addBtn.textContent = label();
    addBtn.addEventListener('click', e=>{
      e.stopPropagation();
      if(myPlans[id]) delete myPlans[id];
      else myPlans[id] = (rawC && rawC.k==='carrot') ? 'carrot' : 'buy';
      saveStars();
      addBtn.classList.toggle('on', !!myPlans[id]);
      addBtn.textContent = label();
      checkPlanComplete('sheet');
      if(typeof onPlanChanged==='function') onPlanChanged('sheet');
    });
    el.appendChild(addBtn);
  }else{
    if(myPlans[id]==='pass') el.classList.add('passed');
    el.appendChild(planRowEl(id, 'sheet'));
  }

  el.querySelectorAll('[data-link]').forEach(b=> b.addEventListener('click',e=>{
    e.stopPropagation();
    gotoItem(+b.dataset.seg, b.dataset.link);
  }));
  return el;
}

function updateSheetProgress(){
  if(sheetMode==='std'){
    const items = planListItems('sheet');
    const decided = items.filter(x=>myPlans[x.id]).length;
    document.getElementById('prog-name').textContent = '소행성 스탠다드';
    document.getElementById('prog-text').textContent = decided+' / '+items.length+' 담았어요';
    document.getElementById('prog-fill').style.width = (items.length?decided/items.length*100:0)+'%';
  }else{
    const {total, done} = sheetTotals();
    document.getElementById('prog-name').textContent = '출산 준비물 · 내 리스트';
    document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
    document.getElementById('prog-fill').style.width = (total?done/total*100:0)+'%';
  }
}

// 내 리스트를 전부 채우면(체크+구매기록) 똑똑한 리스트 완성 → ⭐500 + 리포트
function myListComplete(){
  const ids=[];
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    if(sheetMine(id)) ids.push(id);
  }));
  return ids.length>0 && ids.every(id=> sheetChecked.has(id) && myBuys[id]);
}
function checkSmartListComplete(){
  if(!myListComplete()) return;
  if(earnStars(500, '내 똑똑한 리스트 완성', 'smart-list-sheet')){
    setTimeout(()=> openReport(), 800); // 완성 순간 리포트가 짠!
    babySurprise('출산 준비', 'baby-smart-sheet', 100, 2000); // 리포트 위로 아기 선물이 짠!
  }
}
function onBuyRecordSaved(){ checkSmartListComplete(); updateFocusBar(); }
function onVerdictSaved(){ updateFocusBar(); }

// 🧭 여정 — 담기 → 사기 → 기록 → 자랑. 지금 어느 단계인지 한눈에.
function sheetJourney(){
  const items = planListItems('sheet');
  const decided = items.filter(x=>myPlans[x.id]).length;
  const ids = [];
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    if(sheetMine(id)) ids.push(id);
  }));
  const unchecked = ids.filter(id=>!sheetChecked.has(id)).length;
  const norec = ids.filter(id=>sheetChecked.has(id) && !myBuys[id]).length;
  const s1 = items.length>0 && decided===items.length;
  // '사기' 단계 = 체크·기록까지 (판정은 커뮤니티에서)
  const s2 = s1 && ids.length>0 && unchecked===0 && norec===0;
  const cur = !s1 ? 1 : !s2 ? 2 : 3;
  return {
    steps:[{n:1,ic:'🛒',t:'담기'},{n:2,ic:'🛍️',t:'사기'},{n:3,ic:'📄',t:'자랑'}],
    done:[s1,s2,false], cur,
  };
}
function journeyHtml(j){
  return j.steps.map((s,i)=>
    `<button class="j-step ${j.cur===s.n?'cur':''} ${j.done[i]?'done':''}" onclick="journeyGo(${s.n})">
      <span class="ji">${j.done[i]?'✅':s.ic}</span><span class="jt">${s.t}</span>
    </button>`
  ).join('<span class="j-arrow">›</span>');
}
function journeyGo(n){
  if(viewMode==='postpartum'){
    if(n===1) setPpMode('std'); else setPpMode('mine');
    return;
  }
  if(n===1) setSheetMode('std');
  else if(n===3) openReport();
  else setSheetMode('mine');
}

// 👉 다음 할 일 계산 — 상태에 따라 지금 할 액션 하나를 정확히 알려준다
function sheetNextInfo(){
  if(sheetMode==='std'){
    const todos = [];
    SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
      const id = sheetItemId(ci,ii);
      if(!stdListed(it)) return;
      if(!myPlans[id]) todos.push(it.nm);
    }));
    if(todos.length) return {
      title:`안 담은 것 <b>${todos.length}개</b> — 판정 보고 담기만 하면 끝`,
      nudge: todos.length>3 ? todos.slice(0,3) : null,
      btn: sheetFilter ? '전체 보기' : '모아 보기', act:'toggleSheetFilter()',
    };
    sheetFilter = false;
    return {title:'스탠다드 다 담았어요! 이제 사러 갈 시간 🛍️', btn:'내 리스트로', act:"setSheetMode('mine')"};
  }
  // 내 리스트: 체크 → 기록 → 완성 순으로 다음 할 일 안내
  const ids = [];
  SHEET_CATEGORIES.forEach((c,ci)=> c.items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    if(sheetMine(id)) ids.push(id);
  }));
  if(!ids.length){ sheetFilter = false; return null; }
  const unchecked = ids.filter(id=>!sheetChecked.has(id)).length;
  const norec = ids.filter(id=>sheetChecked.has(id) && !myBuys[id]).length;
  if(unchecked) return {
    title:`살 것 <b>${unchecked}개</b> — 사면 바로 체크!`,
    btn: sheetFilter ? '전체 보기' : '남은 것만', act:'toggleSheetFilter()',
  };
  if(norec) return {
    title:`구매 기록 <b>${norec}개</b> 남았어요 — 남기면 ⭐15씩`,
    btn: sheetFilter ? '전체 보기' : '남은 것만', act:'toggleSheetFilter()',
  };
  sheetFilter = false;
  return {title:'내 리스트 완성! 친구에게 자랑해볼까요 🎉', btn:'📄 리포트 공유', act:'openReport()'};
}
function nextCardHtml(nx){
  return `
    <div class="nx-body">
      <span class="nx-k">👉 다음 할 일</span>
      <div class="nx-t">${nx.title}</div>
      ${nx.nudge?`<span class="nx-sub">오늘은 딱 3개만 — ${nx.nudge.join(', ')}</span>`:''}
    </div>
    ${nx.btn?`<button class="nx-btn" onclick="${nx.act}">${nx.btn}</button>`:''}
  `;
}

// 패스 = 내 리스트에서 뺀다 — 체크 해제하고 카드가 바로 사라진다 (유령 취소선 방지)
function onPlanSet(id, plan, listKey, itemEl){
  if(plan!=='pass') return;
  if(listKey==='sheet'){
    if(sheetChecked.has(id)){ sheetChecked.delete(id); saveSheet(); }
  }else if(listKey==='postpartum' && typeof ppChecked!=='undefined'){
    if(ppChecked.has(id)){ ppChecked.delete(id); savePostpartum(); }
  }else{
    return; // 다른 리스트는 기존 동작 유지
  }
  toast('패스 — 내 리스트에서 뺐어요. 스탠다드에서 다시 담을 수 있어요');
  if(itemEl){
    itemEl.style.transition = 'opacity .25s ease, transform .25s ease';
    itemEl.style.opacity = '0';
    itemEl.style.transform = 'scale(.97)';
    setTimeout(()=> itemEl.remove(), 260);
  }
}

// 플랜을 고르면 스탠다드 진행률·카테고리 카운트·집중 필터 라벨 즉시 갱신
function onPlanChanged(listKey){
  if(typeof viewMode==='undefined') return;
  if(listKey==='postpartum' && viewMode==='postpartum'){ // 조리원도 동일 갱신
    if(typeof ppRefreshHeads==='function') ppRefreshHeads();
    return;
  }
  if(listKey!=='sheet' || viewMode!=='sheet') return;
  updateSheetProgress();
  SHEET_CATEGORIES.forEach((c,ci)=>{
    const gp = document.getElementById('shp-'+ci);
    if(gp){ const cc = sheetCatCount(ci); gp.textContent = cc.done+'/'+cc.total; }
  });
  updateFocusBar();
}
// 다음 할 일 카드 + 여정 스텝바 라이브 갱신
function updateFocusBar(){
  if(typeof viewMode==='undefined' || viewMode!=='sheet') return;
  const fb = document.getElementById('next-card');
  if(fb){
    const nx = sheetNextInfo();
    if(nx) fb.innerHTML = nextCardHtml(nx);
    else fb.remove();
  }
  const jn = document.getElementById('journey');
  if(jn) jn.innerHTML = journeyHtml(sheetJourney());
}
