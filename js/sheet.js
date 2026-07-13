// ============================================================
// 소행성 육아플래너 — 출산 준비물 시트
// ------------------------------------------------------------
// 선배맘들이 실제로 공유해 쓰는 준비물 자료 4종을 병합해 이식:
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
    {nm:'배냇저고리', link:'B4', min:true, need:'2~3개', ops:[
      {who:'유월맘', txt:'입는 시기가 굉장히 짧음 — 아기 몸무게랑 키에 따라 달라짐 (나는 오래 사용했어!)'},
      {who:'호호마더', buy:'4장 선물 받음', txt:'선물로 들어오는 대표템이라 미리 많이 사지 말기'}]},
    {nm:'바디수트', min:true, need:'8~10개', ops:[
      {who:'유월맘', txt:'70 사이즈 구매 — 아기가 작게 태어나서 60도 많이 샀어!'},
      {who:'호호마더', verdict:'추천', buy:'유니클로 반팔 메쉬 · 60사이즈 4장 26,000원', txt:'여름 아기는 메쉬 소재가 진리'}]},
    {nm:'모자 · 손발싸개', min:true, need:'2~3개', ops:[
      {who:'유월맘', txt:'아기 딸꾹질 시 사용, 목욕하고 나면 추워서 씌워줬어!'},
      {who:'호호마더', verdict:'추천', buy:'순면 · 선물 받음'},
      {who:'봄이맘', buy:'코니 꼭지모자 미모사 1개', txt:'재입고되면 추가 구매 예정'}]},
    {nm:'손싸개', std:true, need:'8~10개', ops:[
      {who:'유월맘', txt:'아기가 손톱으로 얼굴에 상처낼 수도 있어ㅜ'},
      {who:'봄이맘', txt:'손싸개 1개면 충분, 발싸개는 굳이 없어도 양말로 대체 가능'}]},
    {nm:'발싸개 · 양말', std:true, need:'8~10개', ops:[
      {who:'유월맘', txt:'속싸개로 발이 가려져서 나는 아직 구매 안 했어'},
      {who:'봄이맘', buy:'위드 오가닉 양말'}]},
    {nm:'속싸개', link:'B5', min:true, need:'3~4개', ops:[
      {who:'유월맘', txt:'분유 토하고 하면 속싸개가 많이 필요하더라구'},
      {who:'호호마더', verdict:'추천', buy:'순면 · 선물 받음'},
      {who:'봄이맘', txt:'밤부베베 천기저귀로 대체했어'}]},
    {nm:'스와들업', need:'3~4개', carrot:true, ops:[
      {who:'유월맘', txt:'당근으로도 많이 사는데, 신생아 때는 손 부분을 입으로 빨아서 새 걸로 샀어'},
      {who:'봄이맘', buy:'스칸디맘'}]},
    {nm:'세탁망', std:true, need:'3개', ops:[
      {who:'유월맘', txt:'사이즈별 세트로 구매'},
      {who:'봄이맘', buy:'다이소 무형광 세탁망'}]},
    {nm:'아기 세탁세제', link:'B7', min:true, need:'1개', ops:[
      {who:'유월맘', txt:'아기 세제는 필수!'},
      {who:'호호마더', verdict:'비추', buy:'마더케이 · 네이버 13,200원'},
      {who:'봄이맘', buy:'프랭클린'}]},
    {nm:'아기 섬유유연제', min:true, need:'1개', ops:[
      {who:'호호마더', verdict:'추천', buy:'레드루트 · 네이버 31,680원'},
      {who:'봄이맘', buy:'프랭클린'}]},
    {nm:'턱받이', ops:[
      {who:'봄이맘', buy:'마리데 · 뚜띠뚜띠 · 알파베베 유령빕'}]},
    {nm:'옷장 or 서랍', need:'1개', ops:[
      {who:'유월맘', txt:'신생아 시기 지나고 옷 많아지면 필요!!!'},
      {who:'봄이맘', buy:'소유2 수납장'}]},
  ]},
  { nm:'수유용품', emoji:'🍼', items:[
    {nm:'젖병세척솔', min:true, brands:'마더케이', need:'넉넉히', ops:[
      {who:'유월맘', txt:'소모품이라 한 달에 한 번 교체'},
      {who:'호호마더', verdict:'추천', buy:'베베그로우 · 쿠팡 6,000원'},
      {who:'봄이맘', buy:'마더케이 (젖꼭지 솔 · 집게까지 세트로)'}]},
    {nm:'젖꼭지세척솔', brands:'마더케이', deal:'9,020원 (7개)'},
    {nm:'젖병세정제', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'비앤비 · 쿠팡 4,540원'},
      {who:'봄이맘', buy:'프랭클린'}]},
    {nm:'젖병+젖꼭지', link:'B2', min:true, brands:'더블하트 · 헤겐 · 닥터브라운 · 모윰', deal:'14,000원 (4개)', need:'160ml 6개 · 240ml 4개', ops:[
      {who:'유월맘', txt:'완분 기준 160ml 6~8개 추천! 처음엔 160만 쓰니까 240은 차차 추가해도 돼'},
      {who:'호호마더', verdict:'추천', buy:'닥터브라운 프리미 · 쿠팡 32,100원'},
      {who:'호호마더', verdict:'쏘쏘', buy:'레이퀸 · 선물 들어옴'},
      {who:'봄이맘', buy:'모윰 유리젖병 2 · 로열세브르 세라믹 1 · 엘리젖병 1', txt:'완분 기준 6~8개'}]},
    {nm:'젖꼭지', std:true, brands:'더블하트 · 베베그로우 등', deal:'3,400원', need:'SS 4개 · S 6개', ops:[
      {who:'유월맘', txt:'금방 사이즈업 할 것 같아서 S를 더 샀어'},
      {who:'봄이맘', buy:'더블하트 모유실감 S·M', txt:'로열세브르랑도 호환 가능'}]},
    {nm:'젖병소독기', std:true, brands:'유팡 · 픽셀', deal:'유팡 28만원대 · 픽셀 26만원대', ops:[
      {who:'유월맘', txt:'세척기를 들이면 소독기는 안 들이는 추세 같은데, 나는 소독기 사서 잘 쓰는 중이야'},
      {who:'봄이맘', txt:'열탕파 — 휘슬러 곰솥 냄비 연마해서 쓰고 있어'}]},
    {nm:'젖병집게', brands:'마더케이'},
    {nm:'젖병건조대', std:true, brands:'마더케이', prep:true, ops:[
      {who:'유월맘', txt:'세척기 있으면 없어도 될 것 같아'}]},
    {nm:'젖병세척기', brands:'베이비브레짜', deal:'300,510원', ops:[
      {who:'유월맘', txt:'요즘 엄청 유행하는 육아용품 — 있으면 좋을 것 같아'}]},
    {nm:'수유시트 · 쿠션', link:'C3', min:true, brands:'더스베이비(수유쿠션) · 알프레미오(수유시트)', carrot:true, prep:true, ops:[
      {who:'유월맘', txt:'분유 먹이다 보니 안 쓰게 돼서 추천은 안 해!'},
      {who:'호호마더', verdict:'쏘쏘', buy:'마더스베이비 수유쿠션 · 쿠팡 48,580원'},
      {who:'호호마더', verdict:'비추', buy:'알프레미오 수유시트 · 쿠팡 18,000원'}]},
    {nm:'분유제조기', brands:'베이비브레짜', deal:'24~25만원대', prep:true, ops:[
      {who:'유월맘', txt:'나는 세척이 어렵고 불편할 것 같아서 안 샀어!'}]},
    {nm:'분유포트', min:true, brands:'릴리브 · 보르르', deal:'릴리브 11만원대 · 보르르 6만원대', need:'1개', ops:[
      {who:'유월맘', txt:'릴리브 쓰는 중 — 첫만남이용권으로 샀고 매우 만족!'},
      {who:'호호마더', verdict:'추천', buy:'오쿠 · 쿠팡 67,150원'}]},
    {nm:'분유쉐이커', ops:[
      {who:'봄이맘', buy:'해님 v2'}]},
    {nm:'분유', link:'B3', std:true, ops:[
      {who:'봄이맘', buy:'압타밀 에센시스', txt:'비상용 소량부터'}]},
    {nm:'백색소음기 (수유등)', link:'NC2', brands:'말랑하니', deal:'34,200원', ops:[
      {who:'봄이맘', buy:'말랑허니 백색소음기'}]},
    {nm:'모유저장팩', min:true, brands:'마더케이', ops:[
      {who:'호호마더', verdict:'추천', buy:'마더케이 · 모윰 등 물려받음'}]},
    {nm:'쪽쪽이', link:'NC3', brands:'스와비넥스 · 모윰 · 누크 · 아벤트 등', need:'2개', ops:[
      {who:'유월맘', txt:'애바애지만 대부분 생후 50일은 지나야 무는 편이래'},
      {who:'봄이맘', buy:'모윰 1 · 엘리 1', txt:'취향 확인용으로 하나씩'}]},
  ]},
  { nm:'피부용품', emoji:'🧴', items:[
    {nm:'시카리페어크림 (침독크림)', brands:'몽디에스 등'},
    {nm:'태열키트', brands:'쁘리마쥬', deal:'68,400원'},
    {nm:'수딩젤', brands:'몽디에스 · 쁘리마쥬 · 아토팜 등', ops:[
      {who:'유월맘', txt:'여름 아기 필수템'},
      {who:'봄이맘', buy:'몽디에스 · 아토팜'}]},
    {nm:'기저귀발진크림', min:true, brands:'쁘리마쥬 · 비판텐', ops:[
      {who:'유월맘', txt:'발진 났을 때나 다쳤을 때 필수'},
      {who:'호호마더', verdict:'추천', buy:'비판텐 · 퇴원 시 받음'}]},
    {nm:'로션 · 크림 · 오일', min:true, brands:'몽디에스 · 쁘리마쥬 · 아토팜 등', ops:[
      {who:'호호마더', verdict:'쏘쏘', buy:'궁중비책 · 보건소 선물'},
      {who:'봄이맘', buy:'쁘리마쥬 · 킨더프리제'}]},
  ]},
  { nm:'목욕용품', emoji:'🛁', items:[
    {nm:'아기욕조', link:'B8', min:true, brands:'슈너글 · 온다베이비', deal:'슈너글 34,900원', need:'1~2개', ops:[
      {who:'유월맘', txt:'씻길용·헹굴용 두 개라는데, 신생아는 물로만 씻으니 하나로도 충분해'},
      {who:'호호마더', verdict:'추천', buy:'OK베이비 신생아 욕조 · 물려받음'},
      {who:'호호마더', verdict:'쏘쏘', buy:'니스툴그로우 · 네이버 19,900원'},
      {who:'봄이맘', buy:'말랑허니'}]},
    {nm:'샤워필터'},
    {nm:'세면대 워터탭', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'올스테인리스 · 쿠팡 12,800원', txt:'세면대 목욕할 때 유용'},
      {who:'봄이맘', buy:'대림바스 디클린 세면대용 멀티필터탭'}]},
    {nm:'바디워시', min:true, need:'1개', ops:[
      {who:'호호마더', verdict:'쏘쏘', buy:'궁중비책 샴푸&워시 · 보건소 선물'},
      {who:'봄이맘', buy:'쁘리마쥬 (샴푸 · 바디워시)'}]},
    {nm:'목욕수건', std:true, ops:[
      {who:'유월맘', txt:'신생아는 일주일에 2번 정도만 씻겨도 된대!'}]},
    {nm:'천기저귀', std:true, brands:'밤부베베 · 무루', deal:'4,817원', need:'5개', ops:[
      {who:'유월맘', txt:'샤워 후 수건 대용으로 많이 썼어 — 신생아 땐 블랭킷 대용으로도!'},
      {who:'봄이맘', buy:'밤부베베', txt:'천기저귀를 수건으로 쓰고 있어'}]},
    {nm:'아기 수건', std:true, brands:'대림바스', deal:'24,845원'},
    {nm:'아기 비데', brands:'힙비 · 포프베베', deal:'78,000원', ops:[
      {who:'유월맘', txt:'포브베베 많이 쓰는데 화장실이 좁다면 휴대용 추천'},
      {who:'봄이맘', buy:'포브베베'}]},
    {nm:'엉덩이클렌저'},
    {nm:'욕조클리너', need:'1개'},
    {nm:'탕온계'},
  ]},
  { nm:'위생용품', emoji:'🧻', items:[
    {nm:'거즈손수건', link:'B13', min:true, brands:'밤부베베', need:'50개 이상', ops:[
      {who:'유월맘', txt:'1년 이상 쓰는 손수건은 넉넉하게!'},
      {who:'호호마더', verdict:'추천', buy:'한스네이쳐 20장 · 네이버 10,000원', txt:'미니멀은 20장으로도 충분했어'},
      {who:'봄이맘', buy:'밤부베베 거즈 · 엠보', txt:'수납은 다이소 수납함이 딱 맞아'}]},
    {nm:'엠보손수건', brands:'밤부베베'},
    {nm:'지퍼백', brands:'마더케이', ops:[
      {who:'유월맘', txt:'출산하러 갈 때 아기 옷 넣어 갔어 — 태어나기 전에 미리 세탁해서 보관해놨어'},
      {who:'봄이맘', buy:'마더케이', txt:'옷 세탁 후 보관용'}]},
    {nm:'온습도계', link:'B10', std:true, brands:'휴비딕', carrot:true, ops:[
      {who:'유월맘', txt:'보건소 같은 데서 선물로도 많이 들어오는 편이야'},
      {who:'봄이맘', buy:'휴비딕 2개', txt:'거실이랑 아기방 하나씩'}]},
    {nm:'체온계', link:'B9', min:true, need:'1개', ops:[
      {who:'유월맘', txt:'지역 출산축하 선물로 브라운 체온계 받았어!'},
      {who:'호호마더', verdict:'추천', buy:'브라운 · 네이버 60,000원'}]},
    {nm:'건티슈', brands:'마더케이'},
    {nm:'물티슈', std:true, min:true, brands:'베베숲 · 브라운', deal:'3만4천원대', ops:[
      {who:'호호마더', verdict:'추천', buy:'브라운 프리미엄 · 쿠팡 28,900원'},
      {who:'봄이맘', buy:'베베숲'}]},
    {nm:'소독티슈', brands:'그린핑거 · 퓨어닷', deal:'28,740원'},
    {nm:'콧물흡입기', std:true, brands:'노시부', prep:true, ops:[
      {who:'봄이맘', buy:'한일 포근'}]},
    {nm:'손톱가위 · 깎이', link:'B12', min:true, brands:'마더케이 · 더블하트(가위)', deal:'7,250원', need:'1개', ops:[
      {who:'유월맘', txt:'가위랑 깎이 둘 다 샀어'},
      {who:'호호마더', verdict:'추천', buy:'알리익스프레스 세트 · 5,000원'},
      {who:'봄이맘', buy:'베이비 클라우드 3in1 네일트리머'}]},
    {nm:'신생아면봉', std:true, brands:'마더케이', need:'1통', ops:[
      {who:'봄이맘', buy:'마더케이 신생아 유아 면봉 3종세트'}]},
  ]},
  { nm:'기저귀', emoji:'👶', items:[
    {nm:'기저귀 (밴드형)', link:'B6', min:true, ops:[
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
      {who:'호호마더', verdict:'추천', buy:'홈플러스 · 19,900원', txt:'전용 제품 아니어도 뚜껑 있는 통이면 충분'}]},
  ]},
  { nm:'침구류', emoji:'🛏️', items:[
    {nm:'아기침대', link:'B11', min:true, brands:'리안 · 이케아 · 스토케', deal:'18만원대', carrot:true, prep:true, ops:[
      {who:'유월맘', txt:'원목·휴대용 등 다양하니 취향대로 — 나는 아직 이동식 쓰고 있어!'},
      {who:'호호마더', verdict:'추천', buy:'뉴나 · 당근 30,000원', txt:'당근으로 사면 새것 대비 1/6 가격'},
      {who:'봄이맘', buy:'도노도노 키큰 침대 (신생아) → 소유2 싱글침대'}]},
    {nm:'이불세트', std:true, brands:'포몽드', prep:true},
    {nm:'블랭킷 (얇은 담요)', min:true, brands:'아뜰리에슈', prep:true, ops:[
      {who:'유월맘', txt:'신생아 땐 천기저귀를 블랭킷 대용으로도 쓸 수 있어'},
      {who:'호호마더', verdict:'쏘쏘', buy:'알리익스프레스 2개 · 12,000원'}]},
    {nm:'두상베개', brands:'라비킷', deal:'39,800원', need:'1~2개', ops:[
      {who:'유월맘', txt:'두상 때문에 필요하다는데 사실 잘 베고 자진 않아ㅜ'}]},
    {nm:'방수요 (방수누비패드)', min:true, need:'3~4개', ops:[
      {who:'유월맘', txt:'생각보다 소변이 자주 새서 침대랑 기저귀갈이대에 깔기 필수'},
      {who:'호호마더', verdict:'추천', buy:'쁘리엘르 · 쿠팡 10,170원'},
      {who:'봄이맘', buy:'라비킷 방수매트'}]},
    {nm:'역류방지쿠션', min:true, carrot:true, need:'1개', ops:[
      {who:'유월맘', txt:'당근에서 살 땐 숨 안 죽은 걸로 잘 고르기! 첫만남이용권 사용 가능해'},
      {who:'호호마더', verdict:'추천', buy:'로토토 · 물려받음'},
      {who:'봄이맘', buy:'엔젤앤비'}]},
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
    {nm:'겉싸개', std:true, brands:'워낙 다양', carrot:true, need:'1~2개', ops:[
      {who:'유월맘', txt:'겨울엔 접종하러 갈 때 필수더라!'},
      {who:'봄이맘', txt:'아뜰리에 슈 블랭킷으로 대체했어'}]},
    {nm:'카시트', link:'B1', std:true, brands:'브라이텍스 · 다이치 · 맥시코시 · 조이 등', ops:[
      {who:'유월맘', txt:'생후 한 달간은 바구니 카시트 추천'},
      {who:'봄이맘', buy:'브라이텍스 프로 럭스 아이사이즈'}]},
    {nm:'바구니카시트', carrot:true},
    {nm:'아기띠 · 힙시트', link:'NC5', std:true, brands:'포그내 · 코니 · 아이엔젤 · 베이비뵨 등', carrot:true, ops:[
      {who:'유월맘', txt:'신생아 시기 이후에 많이 쓰는 편이야!'}]},
    {nm:'슬링', need:'1개', ops:[
      {who:'유월맘', txt:'신생아 시기에만 쓰지만 많이들 쓴대 — 고민 중이야'}]},
    {nm:'유모차', link:'B14', min:true, brands:'오이스터3 · 에그2 · 오르빗 · 부가부 등', carrot:true, ops:[
      {who:'유월맘', txt:'6개월 전까지는 디럭스나 절충형 추천'},
      {who:'호호마더', verdict:'추천', buy:'잉글레시나 · 당근 중고 35,000원', txt:'유모차야말로 당근이 진리'},
      {who:'봄이맘', buy:'잉글레시나 일렉타 절충형'}]},
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
    {nm:'수유브라', link:'A5', min:true, ops:[
      {who:'호호마더', verdict:'비추', buy:'브이랩 · 쿠팡 35,800원', txt:'입어보고 사는 걸 추천'}]},
    {nm:'도넛방석 (회음부 방석)', link:'C2', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'마더스베이비 · 쿠팡 11,880원'}]},
    {nm:'마이비데 물티슈', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'크리넥스 마이비데 · 쿠팡'}]},
    {nm:'유축기', link:'C4', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'스펙트라 2대 · 물려받음', txt:'보건소 무료 대여도 있으니 사기 전에 확인!'}]},
    {nm:'유축 깔때기 세트', min:true, ops:[
      {who:'호호마더', verdict:'추천', buy:'스펙트라 · 네이버 10,000원', txt:'깔때기는 위생상 새것으로'}]},
  ]},
  { nm:'발달 · 기타', emoji:'🧸', items:[
    {nm:'모빌 (타이니 등)', link:'NC1', std:true, carrot:true, need:'1개', ops:[
      {who:'유월맘', txt:'새제품 10만원대, 당근이면 3만원 정도 — 첫만남이용권으로 샀어!'},
      {who:'봄이맘', buy:'프롬식스 우드 흑백모빌'}]},
    {nm:'초점책', std:true, need:'1개', ops:[
      {who:'봄이맘', buy:'아카시아 봉봉 패브릭 흑백 초점책'}]},
    {nm:'아기체육관', link:'GA3', need:'1개', ops:[
      {who:'유월맘', txt:'애바애라 잘 안 노는 아가도 있어ㅜ'}]},
    {nm:'홈캠 (베이비캠)', ops:[
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
  try{ localStorage.setItem(SHEET_MODE_KEY, m); }catch(e){}
  renderSheet();
}
// 내 리스트 = 체크했거나 살 것/당근으로 정한 항목 (패스는 뺀 나만의 리스트)
function sheetMine(id){
  return sheetChecked.has(id) || myPlans[id]==='buy' || myPlans[id]==='carrot';
}
// 표준 구성 = 미니멀 필수(min) + 공통 필수(std) — 나머지는 '선택템'으로 접어둠
function isStd(it){ return !!(it.min || it.std); }
function sheetVisible(it, id){ return sheetMode==='mine' ? sheetMine(id) : isStd(it); }

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
// 무조건 사세요 / 하나만 사보세요 / 무조건 당근하세요 / 장롱템, 패스하세요 / 절대 사지 마세요
function sheetConclusion(it){
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
  if(rec>0)                        return {k:'yes',    label:'무조건 사세요'};
  if(it.carrot)                    return {k:'carrot', label:'무조건 당근하세요'};
  if(soso>0)                       return {k:'try',    label:'하나만 사보세요'};
  return null; // 아직 의견 없음
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
  if(it.brands) it.brands.split('·').forEach(push);         // 참고 브랜드 필드
  (it.ops||[]).forEach(o=>{ if(o.buy) push(o.buy.split('·')[0].split(' ')[0]); }); // 선배맘이 산 브랜드
  return out;
}

// ---- 선배맘 의견 렌더 (시트 + 구간 상세 공용) ----
function opIcon(v){ return v==='추천' ? '👍' : v==='비추' ? '👎' : v==='쏘쏘' ? '😐' : '💬'; }
function opsHtml(it, id){
  const ops = [...(it.ops||[])];
  if(id && myBuys[id]) ops.push({who: PROFILE.nick+' (나)', verdict: myVerdicts[id], buy: myBuys[id].b+' · '+myBuys[id].ch});
  if(!ops.length) return '';
  return `<div class="ops">` + ops.map(o=>{
    const head = o.verdict ? `${opIcon(o.verdict)} <b>${o.verdict}</b>` : '💬';
    const meta = [o.buy, o.who].filter(Boolean).join(' — ');
    return `<div class="op">${head}${o.txt?` ${o.txt}`:''}<span class="op-meta">${meta}</span></div>`;
  }).join('') + `</div>`;
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
    if(isStd(it)) std++;
    if(sheetMine(sheetItemId(ci,ii))) mine++;
  }));
  return {mine, std};
}

function sheetCatCount(ci){
  let total=0, done=0;
  SHEET_CATEGORIES[ci].items.forEach((it,ii)=>{
    const id = sheetItemId(ci,ii);
    if(!sheetVisible(it, id)) return;
    total++; if(sheetChecked.has(id)) done++;
  });
  return {total, done};
}

function renderSheet(){
  const area = document.getElementById('body-area');
  area.innerHTML='';

  // 표준 리스트 / 내 리스트 토글 — 남들 표준과 내가 고른 것 비교
  const cnt = sheetCountAll();
  const mt = document.createElement('div');
  mt.className='sheet-mode';
  mt.innerHTML = `
    <button class="ss ${sheetMode==='std'?'on':''}" onclick="setSheetMode('std')">🌠 소행성 스탠다드 · ${cnt.std}</button>
    <button class="${sheetMode==='mine'?'on':''}" onclick="setSheetMode('mine')">내 리스트 · ${cnt.mine}</button>
  `;
  area.appendChild(mt);

  const intro = document.createElement('div');
  if(sheetMode==='std'){
    intro.className='ss-card';
    intro.innerHTML = `
      <span class="ss-star">🌠</span>
      <div class="ss-over">SOHAENGSEONG STANDARD</div>
      <h3>소행성 스탠다드</h3>
      <p>선배맘들의 리스트에서 <b>공통 필수만 추린 공식 기준표</b>예요.<br>이대로만 준비해도 충분해요 — 취향템은 "선택템 더 보기"에.</p>
      <div class="ss-chips"><span>공통 필수 ${cnt.std}</span><span>선배맘 4명 검증</span><span>판정 데이터 기반</span></div>
    `;
  }else{
    intro.className='region-card';
    intro.style.cursor='default';
    intro.innerHTML = `
      <span class="ri">✨</span>
      <div class="rc"><h3>내가 고른 리스트</h3>
      <p>체크했거나 살 것 · 당근으로 정한 것만 모았어요. 소행성 스탠다드와 오가며 비교해보세요 — 빠진 게 보이면 담으면 돼요.</p></div>
    `;
  }
  area.appendChild(intro);

  let shownCats = 0;
  SHEET_CATEGORIES.forEach((cat,ci)=>{
    const main=[], extra=[];
    cat.items.forEach((it,ii)=>{
      if(sheetMode==='mine'){ if(sheetMine(sheetItemId(ci,ii))) main.push([it,ii]); }
      else { (isStd(it) ? main : extra).push([it,ii]); }
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
    if(sheetMode==='std' && extra.length){
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
    empty.innerHTML='<b>아직 내 리스트가 비어 있어요</b>소행성 스탠다드에서 체크하거나 "살 것 · 당근으로"를 고르면 여기 모여요.';
    area.appendChild(empty);
  }
  updateSheetProgress();
}

function renderSheetItem(it,ci,ii){
  const id = sheetItemId(ci,ii);
  const el = document.createElement('div');
  el.className = 'item' + (sheetChecked.has(id)?' checked':'');

  let badges='';
  const concl = sheetConclusion(it);
  if(concl) badges += `<span class="badge concl ${concl.k}">${concl.label}</span>`;
  if(it.min) badges += `<span class="badge minimal">🌱 미니멀</span>`;
  if(it.need)   badges += `<span class="badge need">${it.need}</span>`;
  if(it.brands) badges += `<span class="badge brand">${it.brands}</span>`;
  if(it.deal)   badges += `<span class="badge price">핫딜 ${it.deal}</span>`;
  if(it.carrot) badges += `<span class="badge carrot">🥕 당근 추천</span>`;
  if(it.link){
    const si = tlSegIdx(it.link);
    if(si>=4) badges += `<span class="badge region" data-link="${it.link}" data-seg="${si}">${SEGMENTS[si].name} ↗</span>`; // 월령 리스트로 점프
  }

  const qty = sheetQty[id]||0;
  el.innerHTML = `
    <div class="item-main" style="align-items:center;">
      <div class="chk"></div>
      <div class="item-info">
        <div class="item-name">${it.nm}</div>
        ${opsHtml(it, id)}
        ${badges?`<div class="item-badges">${badges}</div>`:''}
      </div>
      <div class="qty">
        <button class="qbtn" data-d="-1">−</button><span class="qnum">${qty}</span><button class="qbtn" data-d="1">＋</button>
      </div>
    </div>
  `;

  el.querySelector('.chk').addEventListener('click',e=>{
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
    // 별똥별 + "다시 산다면?" 판정 노출
    if(nowChecked){
      earnStars(5, '준비물 체크', 'chk-'+(it.link||id));
      if(!el.querySelector('.judge-row:not(.buy-row)')) el.appendChild(judgeRowEl(id));
      if(!el.querySelector('.buy-row')) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));
    }else{
      if(!myVerdicts[id]){ const jr = el.querySelector('.judge-row:not(.buy-row)'); if(jr) jr.remove(); }
      if(!myBuys[id]){ const br = el.querySelector('.buy-row'); if(br) br.remove(); }
    }
  });
  // 살 것 / 당근 / 패스 선택
  if(myPlans[id]==='pass') el.classList.add('passed');
  el.appendChild(planRowEl(id, 'sheet'));

  // 체크한(=산) 항목엔 "다시 산다면?" 판정 + "뭘로 샀어요?" 기록
  if(sheetChecked.has(id) || myVerdicts[id]) el.appendChild(judgeRowEl(id));
  if(sheetChecked.has(id) || myBuys[id]) el.appendChild(purchaseRowEl(id, sheetBrandCandidates(it)));

  el.querySelectorAll('[data-link]').forEach(b=> b.addEventListener('click',e=>{
    e.stopPropagation();
    gotoItem(+b.dataset.seg, b.dataset.link);
  }));
  el.querySelectorAll('.qbtn').forEach(b=> b.addEventListener('click',e=>{
    e.stopPropagation();
    const next = Math.max(0, Math.min(99, (sheetQty[id]||0) + (+b.dataset.d)));
    sheetQty[id] = next;
    if(next===0) delete sheetQty[id];
    el.querySelector('.qnum').textContent = next;
    saveSheet();
  }));
  return el;
}

function updateSheetProgress(){
  const {total, done} = sheetTotals();
  document.getElementById('prog-name').textContent = sheetMode==='mine' ? '출산 준비물 · 내 리스트' : '소행성 스탠다드';
  document.getElementById('prog-text').textContent = done+' / '+total+' 완료';
  document.getElementById('prog-fill').style.width = (done/total*100)+'%';
}
