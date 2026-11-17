const categories = [
  {
    name: "브랜드 디자인", english: "BRAND DESIGN",
    intro: "브랜드가 가진 이야기에서 디자인의 단서를 찾는다.\n그 단서를 색과 형태, 캐릭터와 그래픽으로 구체화하고,\n서로 다른 매체에서도 하나의 인상으로 이어지도록 구성한다.\n각각의 조각이 모여 브랜드만의 모습을 만들어가는 과정이다.",
    projects: [
      ["T1 월즈 유니폼 리디자인", 9, 13, 10, "경기장에서의 응원이 일상으로 이어질 수 있도록 2026 T1 월즈 유니폼을 재해석한 개인 프로젝트다."],
      ["〈밀리의서재〉 북클럽 브랜드 굿즈 프로젝트", 14, 19, 17, "줄자를 모티프로 한 캐릭터 ‘밀리맨’에 네 가지 변형을 더해 독서용품과 생활 소품으로 확장했다."],
    ],
  },
  {
    name: "편집 디자인", english: "EDITORIAL DESIGN",
    intro: "글과 사진에 담긴 이야기를 읽고, 전달할 내용을 고른다.\n정보의 순서와 크기, 여백을 조율하며 읽는 흐름을 만들고,\n주제에 어울리는 서체와 이미지로 지면의 분위기를 더한다.\n흩어진 이야기의 조각을 엮어 하나의 기록으로 완성한다.",
    projects: [
      ["〈수록곡 기록실〉 웹매거진 디자인", 21, 25, 24, "음악을 듣고 감정을 기록하는 공간을 취재하고 촬영해 웹매거진으로 구성했다."],
      ["〈책을 만드는 사람들〉 잡지 디자인", 26, 29, 27, "개인적인 음악 경험을 글과 사진, 인물 실루엣과 악기 이미지로 엮어 잡지 지면을 디자인했다."],
    ],
  },
  {
    name: "북커버 디자인", english: "BOOK COVER DESIGN",
    intro: "이야기 속 인물과 장면에서 책을 대표할 순간을 찾는다.\n그 순간의 의미를 이미지와 색, 제목의 형태로 풀어내고,\n여러 표현을 비교하며 책의 분위기를 담을 구성을 찾아간다.\n한 장의 표지가 이야기 전체를 상상하게 하는 조각이 된다.",
    projects: [
      ["〈머리부터 천천히〉 북커버 디자인", 31, 33, 32, "다이빙 선수의 성장 이야기를 푸른 하늘, 수면, 인물의 움직임으로 표현했습니다."],
      ["〈설레는 건 많을수록 좋아〉 북커버 디자인", 34, 37, 35, "일상과 여행에서 발견하는 설렘을 캐릭터와 여행 소품, 연보라와 연노랑의 조합으로 표현했다."],
    ],
  },
  {
    name: "영상 제작", english: "VIDEO PRODUCTION",
    intro: "전하고 싶은 이야기를 중심으로 장면의 순서를 구성한다.\n화면과 소리를 고르고, 컷의 길이와 전환을 조절하며\n의도한 감정과 메시지가 자연스럽게 이어지도록 다듬는다.\n시간 속에 놓인 장면의 조각들을 하나의 흐름으로 연결한다.",
    projects: [
      ["〈어제의 나에게〉 단편영화", 39, 41, 41, "판타지 로맨스 단편영화 팀 프로젝트에서 컷 편집과 오디오 삽입을 담당했다."],
      ["〈지문에 새긴 음악〉 영상 제작", 42, 43, 43, "어린 시절부터 쌓아온 음악 경험이 글과 이미지로 기록되어 잡지 한 권으로 완성되는 과정을 영상에 담았다."],
      ["〈프로젝트 헤일메리〉 북트레일러 제작", 44, 45, 45, "앤디 위어의 소설을 바탕으로 흰 선 일러스트, 영어 내레이션, 한국어 자막을 사용한 북트레일러를 제작했다."],
    ],
  },
];

const home = document.querySelector("#home");
const detail = document.querySelector("#project");
const footer = document.querySelector("footer");
const projectTitle = document.querySelector("#project-title");
const returnLink = document.querySelector("#project-return");
const coverLinks = document.querySelector("#cover-links");
const puzzles = document.querySelector("#puzzles");
const collections = document.querySelector("#collections");
const projectPages = document.querySelector("#project-pages");
const coverPoints = [18.2, 44.2, 70.2].flatMap(y => [24, 50, 76].map(x => [x, y]));
const routes = new Map();
const layouts = { 9: "t1", 14: "millie", 21: "record-room", 26: "book-magazine", 31: "slow-cover", 34: "exciting-cover", 39: "yesterday-film", 42: "music-film" };
layouts[44] = "hail-mary";
const bookCoverBackgrounds = {
  31: "#91b4d3",
  32: "#b3d1e5",
  33: "#b3d1e5",
  34: "#ce99b4",
  35: "#f5f5f5",
  36: "#fff4c3",
  37: "#f5f5f5",
};
let coverIndex = 0;
let activeRoute = "";

function pageImage(page, alt) {
  const img = new Image(1339, 1339);
  img.src = "assets/huiwon-" + String(page).padStart(2, "0") + ".png";
  img.alt = alt;
  img.loading = "lazy";
  return img;
}

function artwork(name, alt = "", extension = "png") {
  const img = new Image();
  img.src = "assets/" + name + "." + extension;
  img.alt = alt;
  img.loading = "lazy";
  return img;
}

function t1Content() {
  const concept = document.createElement("section");
  concept.className = "t1-concept";
  concept.innerHTML = `
    <h2>콘셉트와 아이디어 전개</h2>
    <ol class="concept-steps">
      <li><strong>서커스 무대</strong>화려하고 압도적인 무대의 분위기</li>
      <li><strong>챔피언의 상징</strong>T1의 월즈 우승과 새로운 도전</li>
      <li><strong>상징색 유지</strong>화이트, 와인, 골드로 팀의 인상 연결</li>
      <li><strong>실루엣 전환</strong>바시티 자켓을 하이넥 바람막이로 재해석</li>
      <li><strong>일상 속 응원</strong>편하게 입을 수 있는 응원 자켓으로 구상</li>
    </ol>
    <div class="concept-notes">
      <div><h3>색상</h3><div class="t1-swatches" aria-label="화이트, 와인, 골드"><i></i><i></i><i></i></div><p>화이트를 바탕으로 와인색과 골드 포인트를 더해 기존 유니폼의 인상을 이어갔다. 와인색은 서커스 무대의 커튼을, 골드는 챔피언의 영광과 별의 이미지를 떠올리도록 활용했다.</p></div>
      <div><h3>실루엣과 디테일</h3><p>후드 없는 하이넥 형태와 중앙 지퍼 덮개로 깔끔한 인상을 만들었다. 어깨에서 주머니 방향으로 이어지는 곡선 절개선에 와인색 파이핑을 더해 실루엣에 포인트를 주고, 소매 벨크로와 밑단 스트링으로 핏을 조절할 수 있도록 구성했다.</p></div>
      <div><h3>그래픽 요소</h3><p>가슴의 T1 로고와 여섯 개의 별을 중심으로 팀의 상징성을 표현했다. 가슴과 소매, 등판에는 기존 유니폼의 스폰서 로고를 배치하고, 와인색 파이핑과 골드 포인트를 더해 서커스 무대의 화려한 분위기를 담았다.</p></div>
    </div>`;
  const details = document.createElement("section");
  details.className = "t1-details";
  details.innerHTML = `
    <h2><img class="t1-detailed-title" src="assets/t1-detailed-title.png" alt="Detailed Design" width="520" height="95"></h2>
    <div class="t1-feature">
      <div><h3>절개 라인</h3><p>어깨에서 몸판으로 이어지는 와인색 라인으로 시선을 연결하고 재킷의 형태를 강조</p></div>
      <img src="assets/t1-line.png" alt="와인색 어깨 절개 라인" loading="lazy">
    </div>
    <div class="t1-feature t1-feature-reverse">
      <div><h3>하이넥</h3><p>목을 감싸는 하이넥으로 재구성해<br>바람막이 재킷의 기능성과 단정한 실루엣</p></div>
      <img src="assets/t1-neck.png" alt="유니폼 하이넥" loading="lazy">
    </div>
    <div class="t1-feature">
      <div>
        <div class="t1-button-detail"><h3>단추</h3><div class="t1-button"><img src="assets/t1-button.png" alt="T1 로고 단추" loading="lazy"><p>와인색 단추에 T1 로고를 더해<br>작은 디테일에도 팀의 정체성을 담음</p></div></div>
        <h3>포켓, 소매 벨크로, 밑단 스트링</h3><p>와인색을 적용한 포인트<br>벨크로와 스트링은 핏을 조절할 수 있도록 구성</p>
        <h3>T1 로고</h3><p>소매에 여섯 개의 별을 포함한 T1 엠블럼을 배치</p>
      </div>
      <img src="assets/t1-sleeve.png" alt="소매 엠블럼, 포켓과 밑단 스트링" loading="lazy">
    </div>`;
  return [artwork("t1-intro", "T1 월즈 유니폼 앞면과 뒷면"), concept, details, artwork("t1-end", "본 작업은 비공식 리디자인입니다. 디자이너 문희원")];
}

function millieContent() {
  const section = document.createElement("section");
  section.className = "millie-fresheners";
  section.innerHTML = `
    <h2><img src="assets/millie-freshener-heading.png" alt="밀리맨 종이방향제" width="421" height="82" loading="lazy"></h2>
    <div class="freshener-grid"></div>
    <p>밀리맨 캐릭터를 활용한 종이 방향제로, 일상 속에서 은은한 향과 함께 작은 즐거움을 전달한다. 책갈피처럼 가볍게 사용할 수 있어, 독서의 순간에도 자연스럽게 어우러진다.</p>`;
  const grid = section.querySelector(".freshener-grid");
  grid.append(
    artwork("millie-red", "빨간 모자를 쓴 밀리맨 종이방향제"),
    artwork("millie-brown", "곰 모자를 쓴 밀리맨 종이방향제"),
    artwork("millie-blue", "검은 모자를 쓴 밀리맨 종이방향제"),
    artwork("millie-pink", "분홍 모자를 쓴 밀리맨 종이방향제"),
  );
  const goods = document.createElement("section");
  goods.className = "millie-goods";
  const layout = artwork("millie-end", "책 밖에서도 함께하는 밀리맨 생활 굿즈");
  layout.width = 1920;
  layout.height = 2748;
  goods.append(layout);
  const items = [
    ["shirt", "티셔츠", 53, 121, 131, 142],
    ["mug", "머그컵", 205, 173, 79, 71],
    ["cursor", "디지털 커서", 302, 153, 120, 108],
    ["cover", "북커버", 71, 271, 103, 116],
    ["charger", "무선 충전기", 184, 276, 87, 122],
  ];
  const images = items.map(([file, name]) => artwork("millie-goods-" + file, "밀리맨 " + name));
  const viewer = imageViewer("밀리맨 굿즈 확대", images);
  goods.append(viewer.dialog);
  items.forEach(([, , x, y, width, height], index) => {
    const button = previewButton(images[index], () => viewer.open(index));
    button.className = "goods-zoom";
    button.style.left = (x / 480 * 100) + "%";
    button.style.top = (y / 687 * 100) + "%";
    button.style.width = (width / 480 * 100) + "%";
    button.style.height = (height / 687 * 100) + "%";
    goods.append(button);
  });
  return [artwork("millie-intro", "밀리맨 탄생신화와 캐릭터 베리에이션"), section, goods];
}

function previewButton(image, open) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", image.alt + " 확대");
  button.setAttribute("aria-haspopup", "dialog");
  button.addEventListener("click", open);
  return button;
}

function imageViewer(label, images) {
  const dialog = document.createElement("dialog");
  dialog.className = "magazine-preview";
  dialog.setAttribute("aria-label", label);
  dialog.innerHTML = `
    <form method="dialog"><button type="submit" autofocus>닫기 ×</button></form>
    <img alt="">
    <div class="preview-navigation">
      <button type="button" aria-label="이전 이미지">←</button>
      <span aria-live="polite"></span>
      <button type="button" aria-label="다음 이미지">→</button>
    </div>`;
  const enlarged = dialog.querySelector("img");
  const navigation = dialog.querySelector(".preview-navigation");
  navigation.hidden = images.length === 1;
  const [previous, next] = navigation.querySelectorAll("button");
  const position = navigation.querySelector("span");
  let current = 0;
  let touchStart;
  function show(index) {
    current = (index + images.length) % images.length;
    enlarged.src = images[current].src;
    enlarged.alt = images[current].alt;
    position.textContent = (current + 1) + " / " + images.length;
  }
  previous.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(current + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  enlarged.addEventListener("touchstart", (event) => {
    touchStart = event.touches[0].clientX;
  }, { passive: true });
  enlarged.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
  });
  return { dialog, open(index) { show(index); dialog.showModal(); } };
}

function magazineSpread() {
  const gallery = document.createElement("section");
  gallery.className = "magazine";
  gallery.innerHTML = `
    <h2>최종 지면 디자인</h2>
    <div class="magazine-grid"></div>`;
  const grid = gallery.querySelector(".magazine-grid");
  const images = Array.from({ length: 5 }, (_, index) => {
    const number = index + 1;
    const image = artwork("record-room-original-" + number, "수록곡 기록실 지면 " + number, "jpg");
    image.width = 1080;
    image.height = 1400;
    return image;
  });
  const viewer = imageViewer("수록곡 기록실 확대 지면", images);
  gallery.append(viewer.dialog);
  images.forEach((image, index) => {
    const button = previewButton(image, () => viewer.open(index));
    button.append(image);
    grid.append(button);
  });
  return gallery;
}

function projectVideoPlayer(filename, label, poster = filename.replace(/\.mp4$/, "-poster.jpg")) {
  const video = document.createElement("video");
  video.className = "project-video-player";
  video.src = "assets/" + filename;
  video.poster = "assets/" + poster;
  video.controls = true;
  video.playsInline = true;
  video.preload = "none";
  video.setAttribute("aria-label", label);
  return video;
}

function musicProduction(page) {
  const storyboard = [[artwork("music-storyboard", "영상 구성 및 내레이션 표"), 205, 268, 803, 298]];
  const stills = [
    [artwork("music-still-1", "피아노 연주 장면"), 206, 672, 395, 222],
    [artwork("music-still-2", "기타 연주 장면"), 609, 672, 398, 222],
    [artwork("music-still-3", "기타 조율 장면"), 206, 902, 396, 221],
    [artwork("music-still-4", "잡지 편집 장면"), 609, 901, 398, 222],
  ];
  const frame = productionGallery(page, [["내레이션 표 확대", storyboard], ["영상 스틸 확대", stills]]);
  const qr = artwork("music-film-qr", "지문에 새긴 음악 전체 영상 QR 코드");
  qr.className = "music-film-qr";
  const videoLink = document.createElement("a");
  videoLink.className = "music-video-link";
  videoLink.href = "https://drive.google.com/file/d/1AlaDK9tE5wtz-6K0knaBPbuhkRcTswYX/view?usp=drive_link";
  videoLink.target = "_blank";
  videoLink.rel = "noopener noreferrer";
  videoLink.textContent = "영상 보기 ↗";
  frame.append(qr, videoLink);
  return frame;
}

function hailMaryProduction(page) {
  const boxes = [
    [190, 261, 275, 155], [473, 261, 275, 155], [756, 261, 273, 155],
    [190, 511, 338, 191], [538, 511, 338, 191], [886, 512, 340, 190],
    [189, 741, 339, 191], [538, 741, 338, 190], [886, 741, 338, 190],
    [190, 974, 338, 190],
  ];
  const items = boxes.map((box, index) => [
    artwork(
      index < 3 ? "hail-mary-process-" + (index + 1) : "hail-mary-original-" + (index - 2),
      "헤일메리 이미지 " + (index + 1),
    ),
    ...box,
  ]);
  const frame = productionGallery(page, [["헤일메리 제작 과정 확대", items.slice(0, 3)], ["헤일메리 최종 영상 이미지 확대", items.slice(9)]]);
  frame.classList.add("hail-mary-production");
  const scenes = items.slice(3, 9).map(([image]) => image);
  const viewer = imageViewer("헤일메리 주요 장면 확대", scenes);
  const reel = document.createElement("section");
  reel.className = "hail-mary-reel";
  reel.setAttribute("aria-label", "헤일메리 주요 장면");
  reel.innerHTML = '<div class="reel-window"><div class="reel-track"></div></div><button type="button" class="reel-toggle">일시정지</button>';
  const track = reel.querySelector(".reel-track");
  for (const duplicate of [false, true]) {
    const row = document.createElement("div");
    row.className = "reel-row";
    if (duplicate) row.setAttribute("aria-hidden", "true");
    scenes.forEach((image, index) => {
      const button = previewButton(image, () => viewer.open(index));
      if (duplicate) button.tabIndex = -1;
      button.append(duplicate ? image.cloneNode() : image);
      row.append(button);
    });
    track.append(row);
  }
  const toggle = reel.querySelector(".reel-toggle");
  toggle.addEventListener("click", () => {
    toggle.textContent = reel.classList.toggle("is-paused") ? "재생" : "일시정지";
  });
  frame.append(reel, viewer.dialog);
  const qr = artwork("hail-mary-qr", "프로젝트 헤일메리 영상 QR 코드");
  qr.className = "hail-mary-qr";
  const videoLink = document.createElement("a");
  videoLink.className = "hail-mary-video-link";
  videoLink.href = "https://drive.google.com/file/d/1lKdGxXwepxDq7gCQmtHVLTZhURA2zb7R/view?usp=drive_link";
  videoLink.target = "_blank";
  videoLink.rel = "noopener noreferrer";
  videoLink.textContent = "영상 보기 ↗";
  frame.append(qr, videoLink);
  return frame;
}

function productionGallery(page, groups) {
  const frame = document.createElement("div");
  frame.className = "music-production";
  frame.append(page);
  for (const [label, items] of groups) {
    const viewer = imageViewer(label, items.map(([image]) => image));
    frame.append(viewer.dialog);
    items.forEach(([image, x, y, width, height], index) => {
      const button = previewButton(image, () => viewer.open(index));
      button.className = "music-image-zoom";
      button.style.left = (x / 1339 * 100) + "%";
      button.style.top = (y / 1339 * 100) + "%";
      button.style.width = (width / 1339 * 100) + "%";
      button.style.height = (height / 1339 * 100) + "%";
      button.append(image);
      frame.append(button);
    });
  }
  return frame;
}

const projectMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectSectionObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (!projectMotionPreference.matches) playProjectEntrance(target, 18, 420);
    }
  }, { rootMargin: "0px 0px -24px 0px" })
  : null;

function playProjectEntrance(element, distance, duration, delay = 0) {
  element.animate(
    [{ opacity: 0, translate: "0 " + distance + "px" }, { opacity: 1, translate: "0 0" }],
    { duration, delay, easing: "ease-out", fill: "backwards" }
  );
}

function renderRoute() {
  const hash = location.hash;
  const route = routes.get(hash);
  if (!route) {
    projectSectionObserver?.disconnect();
    home.hidden = false;
    footer.hidden = false;
    detail.hidden = true;
    document.title = "문희원 포트폴리오";
    if (activeRoute) document.getElementById(hash.slice(1) || "top")?.scrollIntoView({ behavior: "instant" });
    activeRoute = "";
    return;
  }
  if (activeRoute === hash) return;
  activeRoute = hash;
  const { category, project } = route;
  const [title, first, last, , description] = project;
  document.querySelector("#project-category").textContent = category.english;
  projectTitle.textContent = title;
  document.querySelector("#project-description").textContent = description;
  document.title = title + " · 문희원 포트폴리오";
  returnLink.href = history.state?.returnTo || "#contents";
  detail.dataset.theme = layouts[first] || "portfolio";
  const pages = [];
  if (first === 9) {
    pages.push(...t1Content());
  } else if (first === 14) {
    pages.push(...millieContent());
  } else {
    const finalPage = first === 21 ? 23 : last;
    for (let page = first; page <= finalPage; page++) {
      const image = pageImage(page, title + " 작업 이미지");
      if (page === 21) {
        const cover = document.createElement("div");
        cover.className = "magazine-cover";
        cover.innerHTML = `
          <div class="record-room-intro">
            <img src="assets/record-room-type-21.png" width="1850" height="810" alt="">
            <div class="sr-only">
            <h2>Web Magazine Design - 수록곡 기록실</h2>
            <p>제작 기간: 2026.07<br>작업 프로그램: Adobe Illustrator, Adobe Photoshop<br>작업형태: 개인프로젝트, 동아리활동</p>
            <p>학과 벤처창업동아리 지울림의 잡지 '지울림 18호'를 위해 청음 공간 ‘수록곡 기록실’을 직접 취재하고 촬영, 기사 작성을 진행했다. 음악을 듣고 그날의 감정을 기록하는 공간의 매력을 담았으며, 이를 5장 분량의 웹매거진으로 확장했다. 방문 경험의 흐름에 따라 글과 사진을 재구성하고, 공간의 차분한 분위기를 편집디자인으로 표현했다.</p>
            </div>
          </div>`;
        pages.push(cover);
      } else if (first === 21) {
        image.src = "assets/record-room-detail-" + page + ".png";
        image.width = 2410;
        image.height = 2250;
        image.alt = page === 22 ? "취재와 콘텐츠 기획" : "편집 방향과 디자인";
        pages.push(image);
      } else if (bookCoverBackgrounds[page]) {
        const panel = document.createElement("div");
        panel.className = "book-cover-panel";
        panel.style.backgroundColor = bookCoverBackgrounds[page];
        if (page === 36) {
          panel.classList.add("exciting-character-panel");
          panel.append(
            artwork("exciting-character-heading", "인물 일러스트 및 캐릭터 디자인"),
            artwork("exciting-character-portrait", "인물 일러스트와 제작 설명"),
            artwork("exciting-character-notes", "캐릭터 디자인 방향과 표현 요소"),
          );
        } else if (page === 33 || page === 37) {
          const frame = document.createElement("div");
          frame.className = "slow-cover-frame";
          const spread = artwork(page === 33 ? "slow-cover-spread" : "exciting-cover-spread", title + " 표지와 책날개");
          const viewer = imageViewer("표지와 책날개 확대", [spread]);
          const button = previewButton(spread, () => viewer.open(0));
          button.className = "slow-cover-zoom";
          if (page === 37) button.classList.add("exciting-cover-zoom");
          button.append(spread);
          frame.append(image, button, viewer.dialog);
          panel.append(frame);
        } else {
          panel.append(image);
        }
        pages.push(panel);
      } else if (page === 39 || page === 42 || page === 44) {
        const cover = document.createElement("div");
        cover.className = "video-cover-panel";
        if (page === 39) image.src = "assets/yesterday-film-cover.png";
        cover.append(image);
        pages.push(cover);
      } else if (page === 41) {
        const finalVideo = document.createElement("div");
        finalVideo.className = "yesterday-final-video";
        image.alt = "어제의 나에게 최종 영상 포스터와 주요 장면";
        const qr = artwork("yesterday-film-qr", "어제의 나에게 전체 영상 QR 코드");
        qr.className = "yesterday-film-qr";
        const videoLink = document.createElement("a");
        videoLink.className = "yesterday-video-link";
        videoLink.href = "https://drive.google.com/file/d/12cnU8-Rdojvsrfz0jHacMxYR30VYbRrw/view?usp=drive_link";
        videoLink.target = "_blank";
        videoLink.rel = "noopener noreferrer";
        videoLink.textContent = "영상 보기 ↗";
        const video = projectVideoPlayer("yesterday-film.mp4", "〈어제의 나에게〉 전체 영상");
        finalVideo.append(image, qr, videoLink);
        const finalSection = document.createElement("section");
        finalSection.setAttribute("aria-label", "어제의 나에게 최종 영상");
        finalSection.append(finalVideo, video);
        pages.push(finalSection);
      } else if (page === 43) {
        pages.push(musicProduction(image), projectVideoPlayer("music-film.mp4", "〈지문에 새긴 음악〉 전체 영상"));
      } else if (page === 45) {
        pages.push(hailMaryProduction(image), projectVideoPlayer(
          "hail-mary-trailer.mov",
          "〈프로젝트 헤일메리〉 북트레일러",
          "hail-mary-trailer-poster.png"
        ));
      } else if (page === 26) {
        const cover = document.createElement("div");
        cover.className = "book-magazine-cover";
        cover.append(image);
        pages.push(cover);
      } else if (page === 27) {
        const spreads = document.createElement("section");
        spreads.className = "book-magazine-spreads";
        spreads.setAttribute("aria-label", "책을 만드는 사람들 잡지 목업");
        for (let number = 1; number <= 6; number++) {
          spreads.append(artwork("book-spread-" + number, "잡지 목업 " + number));
        }
        pages.push(spreads);
      } else {
        pages.push(image);
      }
    }
    if (first === 21) pages.push(magazineSpread());
  }
  projectPages.replaceChildren(...pages);
  const projectOrder = [...routes.keys()];
  const projectIndex = projectOrder.indexOf(hash);
  const previousHash = projectOrder[(projectIndex - 1 + projectOrder.length) % projectOrder.length];
  const nextHash = projectOrder[(projectIndex + 1) % projectOrder.length];
  const previousLink = projectLink(previousHash, history.state?.returnTo || "#contents", "next-project-link");
  previousLink.textContent = "← 이전 프로젝트";
  previousLink.setAttribute("aria-label", "이전 프로젝트: " + routes.get(previousHash).project[0]);
  const nextLink = projectLink(nextHash, history.state?.returnTo || "#contents", "next-project-link");
  nextLink.textContent = "다음 프로젝트 →";
  nextLink.setAttribute("aria-label", "다음 프로젝트: " + routes.get(nextHash).project[0]);
  document.querySelector("#next-project").replaceChildren(previousLink, nextLink);
  home.hidden = true;
  footer.hidden = true;
  detail.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
  projectTitle.focus({ preventScroll: true });
  projectSectionObserver?.disconnect();
  if (!projectMotionPreference.matches && typeof detail.animate === "function") {
    if (first === 9) {
      for (const image of projectPages.querySelectorAll("img")) projectSectionObserver?.observe(image);
    } else {
      [projectTitle, document.querySelector("#project-description")].forEach((element, index) => {
        playProjectEntrance(element, 12, 360, index * 65);
      });
      for (const section of pages) projectSectionObserver?.observe(section);
      projectSectionObserver?.observe(nextLink);
    }
  }
}

function projectLink(hash, returnTo, className) {
  const link = document.createElement("a");
  link.href = hash;
  link.className = className;
  link.addEventListener("click", (event) => {
    if (event.button || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    history.pushState({ returnTo }, "", hash);
    renderRoute();
  });
  return link;
}

const projectIndex = document.querySelector(".project-index");
const projectIndexLinks = projectIndex.querySelector("ul");
document.addEventListener("click", event => {
  if (!projectIndex.contains(event.target)) projectIndex.open = false;
});
projectIndex.addEventListener("keydown", event => {
  if (event.key !== "Escape" || !projectIndex.open) return;
  projectIndex.open = false;
  projectIndex.querySelector("summary").focus();
});

categories.forEach((category, index) => {
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "puzzle";
  toggle.style.setProperty("--piece-delay", index * 90 + "ms");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "collection-" + index);
  const number = String(index + 1).padStart(2, "0");
  toggle.innerHTML = '<img src="assets/puzzle-' + (index + 1) + '.png" alt="" width="275" height="280" loading="lazy"><span class="puzzle-number">' + number + '</span><strong>' + category.name + '</strong><small>' + category.english + '</small>';
  puzzles.append(toggle);

  const collection = document.createElement("section");
  collection.className = "collection";
  collection.id = "collection-" + index;
  collection.hidden = true;
  collection.innerHTML = '<div class="category-intro"><span class="category-number" aria-hidden="true">' + number + '</span><img class="category-artwork" src="assets/category-intro-' + (index + 1) + '.png" width="1100" height="625" alt="" loading="lazy"><div class="sr-only"><h3>' + category.english + '</h3><h4>' + category.name + '</h4><p></p></div></div><div class="cards"></div>';
  collection.querySelector(".category-intro p").textContent = category.intro;
  collections.append(collection);
  const cards = collection.querySelector(".cards");
  toggle.addEventListener("click", () => {
    const expand = collection.hidden;
    for (const button of puzzles.children) button.setAttribute("aria-expanded", "false");
    for (const panel of collections.children) panel.hidden = true;
    if (expand) {
      collection.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      collection.scrollIntoView({ block: "nearest" });
    }
  });

  for (const project of category.projects) {
    const [title, first, , thumbnail] = project;
    const hash = "#project-" + String(first).padStart(2, "0");
    routes.set(hash, { category, project });
    const indexItem = document.createElement("li");
    const indexLink = projectLink(hash, "#contents", "project-index-link");
    indexLink.textContent = String(routes.size).padStart(2, "0") + " " + title;
    indexLink.addEventListener("click", () => { projectIndex.open = false; });
    indexItem.append(indexLink);
    projectIndexLinks.append(indexItem);
    const coverLink = projectLink(hash, "#top", "cover-link");
    coverLink.setAttribute("aria-label", title);
    const [x, y] = coverPoints[coverIndex++];
    const coverLabel = document.createElement("span");
    coverLabel.className = "cover-label";
    coverLabel.textContent = title;
    coverLink.append(artwork("cover-glyph-" + coverIndex), coverLabel);
    coverLink.style.setProperty("--x", x + "%");
    coverLink.style.setProperty("--y", y + "%");
    coverLinks.append(coverLink);

    const card = projectLink(hash, "#" + collection.id, "card");
    const label = document.createElement("span");
    label.textContent = title;
    card.append(pageImage(thumbnail, ""), label);
    cards.append(card);
  }
});

if ("IntersectionObserver" in window && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const contentsObserver = new IntersectionObserver((entries, observer) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.replace("contents-pending", "contents-entered");
      observer.unobserve(target);
    }
  }, { threshold: 0.12 });

  for (const element of [document.querySelector("#contents-title"), puzzles]) {
    element.classList.add("contents-pending");
    contentsObserver.observe(element);
  }
}

window.addEventListener("hashchange", renderRoute);
window.addEventListener("popstate", renderRoute);
renderRoute();
