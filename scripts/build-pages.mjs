import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'index.html');
let html = readFileSync(indexPath, 'utf8');

const urlMap = {
  'https://blog.kakaocdn.net/dn/TfIrE/btsNSBY75Fb/SpOyvqENMcXCDjhYMWani1/img.jpg': 'assets/portfolio/main-bg.jpg',
  'https://blog.kakaocdn.net/dn/Y8nwS/btsNR0k79RE/KLdREbDJkFKE1mUXGdq8l1/img.jpg': 'assets/portfolio/site-map-profile.jpg',
  'https://blog.kakaocdn.net/dn/2RKK7/btsNSfu7EcV/zoD4CdZDw5E31Djo6mIXUk/img.jpg': 'assets/portfolio/slide-01.jpg',
  'https://blog.kakaocdn.net/dn/cz4D44/btsNR0SUcf8/ZVAAPoqwn1B3nNfcMtbfnk/img.jpg': 'assets/portfolio/slide-02.jpg',
  'https://blog.kakaocdn.net/dn/coegwI/btsNRSHdm9G/pu6BFZ3os3ZNLcsJVarv3k/img.jpg': 'assets/portfolio/slide-03.jpg',
  'https://blog.kakaocdn.net/dn/dCUMcp/btsNRZ0KlZD/axYjZEpK5CQ7WMznipP1t1/img.jpg': 'assets/portfolio/slide-04.jpg',
  'https://blog.kakaocdn.net/dn/12C2L/btsNSATu1eh/rhPezvkk3QpbUUxOSUCqpk/img.jpg': 'assets/portfolio/profile-01.jpg',
  'https://blog.kakaocdn.net/dn/ndSch/btsNSHLCZiX/SUXZEhkuQfuU5nHX3L4UB0/img.jpg': 'assets/portfolio/profile-02.jpg',
  'https://blog.kakaocdn.net/dn/TcsD9/btsNRJjfyJR/9x7m7ZEjUCXfx1mGRkShtK/img.jpg': 'assets/portfolio/profile-03.jpg',
  'https://blog.kakaocdn.net/dn/vOf8Z/btsNSNLFMPz/zBDz3C6R01q0T2oKLJXvXk/img.png': 'assets/portfolio/modal-01-01.png',
  'https://blog.kakaocdn.net/dn/wko0w/btsNS910Sn0/KqDmfJw5F4qRHDpXiqJhtk/img.png': 'assets/portfolio/modal-02-01.png',
  'https://blog.kakaocdn.net/dn/OyqSP/btsNRJXOaEF/nVBnoyecJmKk8HqRTOJ9bk/img.png': 'assets/portfolio/modal-02-02.png',
  'https://blog.kakaocdn.net/dn/3d2LT/btsNRejq5Vd/wObm9cDPNJk4uhzKr7qX50/img.png': 'assets/portfolio/modal-02-03.png',
  'https://blog.kakaocdn.net/dn/tU21k/btsNQVj8TlQ/uFgmHRhnuDRBtkefIBVftk/img.png': 'assets/portfolio/modal-02-04.png',
  'https://blog.kakaocdn.net/dn/yldS7/btsNRFBukjv/gz95eoHXQANbICOz3TXckK/img.jpg': 'assets/portfolio/modal-03-01.jpg',
  'https://blog.kakaocdn.net/dn/uAWKD/btsNSz78qu0/FbkUAQvxNkgX1KWnnL6o7K/img.jpg': 'assets/portfolio/modal-03-02.jpg',
  'https://blog.kakaocdn.net/dn/cxi4Y4/btsNRJjgnbk/KM63BvbHSkG1vTxKO3Ckb1/img.jpg': 'assets/portfolio/modal-03-03.jpg',
  'https://blog.kakaocdn.net/dn/dJMpTM/btsNReqeQ8U/9QUYmIP1cjGefXP9EtA45K/img.png': 'assets/portfolio/modal-04-01.png',
  'https://blog.kakaocdn.net/dn/3toUR/btsNS5FsAZ3/Pqk46KtSgsTHaVChEkowyk/img.png': 'assets/portfolio/modal-04-02.png',
  'https://blog.kakaocdn.net/dn/b2NkX4/btsNSGzdzSr/eEJd5G9NdaLWnwZhjD0EmK/img.png': 'assets/portfolio/modal-04-03.png',
};

for (const [from, to] of Object.entries(urlMap)) html = html.split(from).join(to);
html = html.replace(/background:url\('assets\/portfolio\/main-bg\.jpg'\)[^;]*;/, 'background:none;');
html = html.replace(/background:url\(assets\/portfolio\/site-map-profile\.jpg\)[^;]*;/, 'background:none;');
if (!html.includes('data-asset-bg="assets/portfolio/main-bg.jpg"')) {
  html = html.replace('<div class="main-bg"></div>', '<div class="main-bg" data-asset-bg="assets/portfolio/main-bg.jpg"></div>');
}
html = html.replace(
  '<div class="cont cont02">\n                        <div class="cont-inner"></div>',
  '<div class="cont cont02">\n                        <div class="cont-inner" data-asset-bg="assets/portfolio/site-map-profile.jpg"></motion.div>'.replace('</motion.div>', '</motion.div>').replace('motion.', '')
);

writeFileSync(indexPath, html, 'utf8');

let en = readFileSync(indexPath, 'utf8');
en = en.replace('<html lang="ko">', '<html lang="en">');
en = en.replace('<title>2026 Portfolio | 김혜영</title>', '<title>2026 Portfolio | Hye-Young Kim</title>');
en = en.replace('<a href="index.html" class="is--on">KO</a>', '<a href="index.html">KO</a>');
en = en.replace('<a href="index-en.html">EN</a>', '<a href="index-en.html" class="is--on">EN</a>');

const translations = [
  ['포트폴리오', 'Portfolio'],
  ['프로필', 'Profile'],
  ['제조 스마트팩토리부터 공공기관 시스템, 시니어케어 플랫폼까지 기획부터 운영까지 전 과정을 이끄는 실행 중심의 프로젝트 매니저입니다.', 'From smart factory manufacturing to public-sector systems and senior-care platforms, I lead every phase from planning through operations as an execution-focused project manager.'],
  ['복잡한 기술을 사용자 일상에 스며드는 서비스로 풀어내며, 사람과 데이터를 연결하는 송루션을 만듭니다.', 'I turn complex technology into services that fit naturally into everyday life, building solutions that connect people and data.'],
  ['복잡한 기술을 사용자 일상에 스며드는 서비스로 풀어내며, 사람과 데이터를 연결하는 솔루션을 만듭니다.', 'I turn complex technology into services that fit naturally into everyday life, building solutions that connect people and data.'],
  ['지금까지의 경험은 다음 혁신을 위한 🚀출발점입니다.', 'Everything I have done so far is the launchpad for the next innovation.'],
  ['공공부문통합모니터링시스템구축', 'Public Sector Integrated Monitoring System'],
  ['스마트공장 고도화 사업', 'Smart Factory Advancement'],
  ['공공기관 홈페이지 리뉴얼', 'Public Agency Website Renewal'],
  ['산출물', 'Deliverables'],
  ['안녕하십니까?', 'Hello'],
  ['함께 일하면 즐거운 지원자 김혜영입니다.', 'I am Hye-Young Kim, and I genuinely enjoy working with others.'],
  ['저는 매사에 도전적이고 끈기가 있는 사람입니다.', 'I am ambitious, persistent, and always ready to take on new challenges.'],
  ['흥미가 있는 분야가 생기면 배우고자하는 마음하나로 그 분야에 관련된것들에 적극적으로 도전하였고 그 것을 첫걸음으로 내것으로 만들기위해 노력하며 그 괴정들이 뜻깊은 경험으로 남았습니다.', 'When a field catches my interest, I dive in immediately and keep learning until I truly make it my own.'],
  ['사회생활을 하면서도 간단한 업무라도 주어지면 제 일에 책임감을 갖고 임하며, 사소한 일에도 겉넘지 않고 실수없이 정확하게 해결하기 위해 부가적인 것들도 활용해 완벽하게 소화해 냈습나다.', 'In every role, even for small tasks, I take ownership and aim to deliver accurate results without cutting corners.'],
  ['또한 외향적이고 사교적인 성격으로 동료들에게 긍정적인 인상을 줄수 있었으며 타인에게 최대한 배려하고 존중하기 위해 노력하고 실천하고 있습니다.', 'Outgoing and collaborative by nature, I strive to bring positive energy to teams while treating others with care and respect.'],
  ['직장내에서도 함께 일하는 동료과도 친화적으로 지내며 밝은 에너지를 주고 업무 부분에서 또한그 조직에 없어서는 안될 인재로 자리매김 할수있는 사람으로 남고싶습니다.', 'I want to be someone teammates enjoy working with and who becomes indispensable to the organization.'],
  ['성격의 장단점', 'Strengths & Weaknesses'],
  ['저의 장점은 세심하고 진취적인 성격으로 새로 배우는 것에 거침없다는 것 입니다.', 'My strengths are attention to detail, drive, and fearlessness when learning something new.'],
  ['그래서 도전을 자주 하며 덕분에 새로운 환경에 거부감이 없습니다.', 'I seek out new challenges often, which helps me adapt quickly to unfamiliar environments.'],
  ['또, 꼼꼼하게 메모하는 습관때문에 한 번 듣고 잊어버리기 쉬운 것까지 기억합니다.', 'I also take detailed notes, which helps me retain information others might forget.'],
  ['단점은 계획이나 목표가 없을 때 늘어지는 경향이 있습니다.', 'My weakness is that I can lose momentum when I do not have a clear plan or goal.'],
  ['그래서 저는 목표를 위한 계획을 세밀하게 세우고, 끊임없이 새로운 것을 도전하며 저 자신에게 self 자극을 주고 있습니다.', 'To counter that, I set detailed plans and keep challenging myself to stay focused.'],
  ['저의 여러가지 방면의 것들을 최대한으로 사용하여 입사 후 필요한 분야에 사고하고 더 세심하게 공부해서 발전할 수 있는 인재가 되겠습니다.', 'I will use every strength I have to keep learning deeply in whatever area the team needs.'],
  ['입사 후 포부', 'Career Goals'],
  ['회사에서 필요로 하는 역량이 있다면 현재에 안주하지 않고 공부하고 도전하는 인재가 되고 싶습니다.', 'If the company needs a new capability, I want to be the kind of person who keeps studying and stepping up.'],
  ['분석하고 공부하는 것을 좋아하기에 새로운 업무나 분야가 생기더라도 부담스럽지 않을 것 입니다.', 'Because I enjoy analyzing and learning, new responsibilities do not intimidate me.'],
  ['새로운 것을 좋아하여 새로운 환경에서 적응을 잘 하는 편이라 어서 많은 사람들과 서로 긍정적인 에너지를 주고 받으며 시너지효과를 내어 즐거운 마음으로 근무를 하고 싶습니다.', 'I adapt well to new environments and hope to create positive synergy with colleagues.'],
  ['앞으로도 항상 공부하고 발전있는 인재가 되도록 도력하겠습니다.', 'I will keep learning and growing as a professional.'],
  ['감사합니다.', 'Thank you.'],
  ['“좋은 기획은 누구나 이해할 수 있는 흐름에서 시작됩니다.”', '"Good planning starts with a flow that anyone can understand."'],
  ['직책', 'Role'],
  ['주요업무', 'Key Responsibilities'],
  ['주요성과', 'Key Achievements'],
  ['성과', 'Achievements'],
  ['링크', 'Links'],
  ['프로젝트매니저(PM)', 'Project Manager (PM)'],
  ['IT 기획및사업관리PM', 'IT Planning & Project Management PM'],
  ['화면 기획자', 'UX Planner'],
  ['대표 (GigCareer / D-GIG)', 'Founder & CEO (GigCareer / D-GIG)'],
  ['사업 전략·비전 수립 및 D-GIG 로컬 긱 플랫폼 총괄 (기획·개발·운영 일원화)', 'Defined business strategy and vision; led the D-GIG local gig platform end to end'],
  ['투자자 IR·피칭 및 사업 모델·수익 구조 설계', 'Investor relations, pitching, and business/revenue model design'],
  ['지역 청년·기업 대상 서비스 IA·화면 설계 및 B2B 사업 사이트 직접 구축', 'Designed IA and screens; built the B2B site directly'],
  ['LER(학습·고용 기록) 검증·포트폴리오 자동화 MVP 프로토타입 기획·개발', 'Planned and built an MVP for LER verification and automated portfolios'],
  ['청년/기업/PM 역할별 MVP 체험 플로우 설계 및 React 기반 데모 구현', 'Designed role-based MVP demo flows and implemented a React demo'],
  ['노동시장 데이터 인사이트 리포트 기획 및 gigcareer.kr 배포·운영', 'Planned labor-market insight reports and deployed gigcareer.kr'],
  ['지역 미스매치 문제를 Local Gig → LER → Global Match 3-Step 솔루션으로 구조화', 'Structured regional mismatch into Local Gig → LER → Global Match'],
  ['비즈니스·기술·투자 커뮤니케이션을 대표 1인 체계로 총괄 수행', 'Solo founder oversight across business, technology, and investor communication'],
  ['로컬크루 MVP 체험형 데모(역할 기반 대시보드) 프로토타입 단독 완성', 'Independently completed a Local Crew MVP demo with role-based dashboards'],
  ['사업 사이트·체험·데모 페이지 통합 구축 및 gigcareer.kr 배포', 'Built and deployed the business site, experience pages, and demo on gigcareer.kr'],
  ['사업 사이트', 'Business Site'],
  ['체험·데모 페이지', 'Experience & Demo'],
  ['GigCareer 메인', 'GigCareer main'],
  ['GigCareer 메인 랜딩', 'GigCareer main landing'],
  ['D-GIG 서비스 소개', 'D-GIG service overview'],
  ['로컬크루 체험하기', 'Local Crew experience'],
  ['로컬크루 MVP 데모', 'Local Crew MVP demo'],
  ['지자체사회복지과담당자를위한노인돌봄관제플랫폼기획및PM', 'Planned and managed an elderly care monitoring platform for municipal welfare officers'],
  ['IoT 센서, AI 카메라, 음성감지장치등다양한장비연동구조설계', 'Designed integration architecture for IoT sensors, AI cameras, and voice detection devices'],
  ['실시간데이터연계API 기획', 'Planned real-time data integration APIs'],
  ['사용자유형별대시보드UI/UX 구성안작성', 'Created dashboard UI/UX proposals by user type'],
  ['시니어케어위험도평가알고리즘설계및Excel 모델작성', 'Designed senior-care risk scoring algorithms and Excel models'],
  ['관리자알림기능, 리마인드기능등제안및구현', 'Proposed and implemented admin alerts and reminder features'],
  ['고독사위험노인을조기인지가능한실시간관제기능구현', 'Implemented real-time monitoring to detect seniors at risk early'],
  ['내부개발자와외부기관(구청, 장비업체) 간커뮤니케이션', 'Coordinated communication between internal developers and external agencies/vendors'],
  ['MES 고도화및IoT 설비자동화기획및요구사항정의', 'Planned MES upgrades and IoT equipment automation requirements'],
  ['공정별주요KPI(설비가동률, 불량률등) 데이터구조설계', 'Designed data structures for process KPIs such as uptime and defect rate'],
  ['정부지원스마트공장과제대응산출물작성(수행계획서, 결과보고서등)', 'Prepared deliverables for government smart-factory programs'],
  ['공정데이터수집 > 시각화 > 관리자알림연동프로세스설계', 'Designed process flows from data collection to visualization and admin alerts'],
  ['정부평가대응용중간/최종산출물문서관리', 'Managed interim and final documentation for government evaluations'],
  ['기초 단계 스마트 HACCP 구축 및 고도화.', 'Built and upgraded foundational Smart HACCP systems.'],
  ['공정별 데이터 자동 취득 및 알람 관리 기능 구현.', 'Implemented automated process data capture and alarm management.'],
  ['실시간 생산성 및 품질 데이터 대시보드 설계', 'Designed real-time productivity and quality dashboards'],
  ['생산 공정별 실시간생산수량 및 중량 관리체계 구축. ', 'Built real-time production quantity and weight management by process'],
  ['공정별 데이터 기반 품질관리로 불량률감소.', 'Reduced defect rates through process-based quality control'],
  ['AI 기반 포장기 설비 예지보전 시스템 구축.', 'Built AI-based predictive maintenance for packaging equipment'],
  ['MES 및 ERP 통합 관리 시스템 설계.', 'Designed integrated MES and ERP management systems'],
  ['EPIK, 국립국제교육원, 지자체홈페이지 등 정보구조개편', 'Restructured information architecture for EPIK, NIIED, and municipal websites'],
  ['과도하게 세분화 된 메뉴구조를 통합· 슬림화', 'Consolidated overly fragmented menu structures'],
  ['민원중심, 사용자목적중심의 카드형레이아웃 제안', 'Proposed citizen-centric card layouts focused on user goals'],
  ['기반페이지구성 및 화면설계서작성', 'Defined base page structures and screen specifications'],
  ['기등록된현행정보시스템내기능· 메뉴구조및서비스흐름을항목별로정리한 분석자료입니다. 기능명, 화면유형등을기준으로업무흐름을파악하고기능재정의를위한기초자료로활용했습니다.', 'Analysis document organizing features, menu structures, and service flows of the existing system.'],
  ['기능별단계구분(1차~3차)을기준으로핵심기능을 구조화한표입니다. 로그인, 통합알림, 활동일지, 시스템관리 등 주요기능군을 정의하고 각기능의 세부역할과 개발범위를 명확히 구분하였습니다.', 'Structured core features by phase including login, unified alerts, activity logs, and system admin.'],
  ['연구개발 계획서', 'R&D Project Plan'],
];

for (const [from, to] of translations) en = en.split(from).join(to);

writeFileSync(path.join(root, 'index-en.html'), en, 'utf8');
writeFileSync(path.join(root, '2026 HY KIM PORTFOLIO V.3.0.html'), readFileSync(indexPath, 'utf8'), 'utf8');
console.log('done', (html.match(/blog\.kakaocdn/g) || []).length, 'kakao left');
