let currentMode = 'face';

document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    darkModeToggle.textContent = isDark ? '다크 모드' : '라이트 모드';
  });
});

function setMode(mode) {
  currentMode = mode;
  const faceBtn = document.getElementById('mode-face');
  const criminalBtn = document.getElementById('mode-criminal');
  const mainTitle = document.getElementById('main-title');
  const analyzeBtn = document.getElementById('analyze-btn');
  const uploadText = document.getElementById('upload-text');

  if (mode === 'face') {
    faceBtn.classList.add('active');
    criminalBtn.classList.remove('active');
    mainTitle.textContent = 'AI 관상 테스트';
    analyzeBtn.textContent = '관상 분석하기';
    uploadText.textContent = '얼굴 사진을 올려주세요';
  } else {
    faceBtn.classList.remove('active');
    criminalBtn.classList.add('active');
    mainTitle.textContent = 'AI 범죄상 테스트';
    analyzeBtn.textContent = '범죄상 분석하기';
    uploadText.textContent = '범죄상 분석을 위해 사진을 올려주세요';
  }
  
  removeUpload(); // Reset when switching modes
}

function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.querySelector('.image-upload-wrap').style.display = 'none';
      const img = document.querySelector('.file-upload-image');
      img.setAttribute('src', e.target.result);
      document.querySelector('.file-upload-content').style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

function removeUpload() {
  const input = document.querySelector('.file-upload-input');
  if (input) input.value = "";
  document.querySelector('.file-upload-content').style.display = 'none';
  document.querySelector('.image-upload-wrap').style.display = 'block';
  document.getElementById('result-container').classList.add('hidden');
  document.getElementById('analyze-btn').style.display = 'inline-block';
}

function predict() {
  const imgInput = document.querySelector('.file-upload-input');
  if (!imgInput.files || !imgInput.files[0]) {
    alert("먼저 사진을 올려주세요!");
    return;
  }
  
  const loadingText = document.getElementById('loading-text');
  loadingText.textContent = currentMode === 'face' ? 'AI가 관상을 분석 중입니다...' : 'AI가 범죄상을 분석 중입니다...';
  
  document.getElementById('analyze-btn').style.display = 'none';
  document.getElementById('loading').classList.remove('hidden');
  
  setTimeout(() => {
    showResult();
  }, 2500);
}

function showResult() {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('result-container').classList.remove('hidden');

  const faceResults = [
    {
      title: "대기만성형 황제상",
      desc: "전체적으로 이목구비가 뚜렷하고 기백이 넘치는 관상입니다. 초년보다 중년 이후의 운이 강력하게 트이는 전형적인 대기만성형입니다.",
      l1: "💰 재물운", d1: "창고에 곡식이 가득 차는 형국입니다. 중년 이후에는 예상치 못한 곳에서 큰 재물이 들어오며 자산이 눈덩이처럼 불어날 것입니다.",
      l2: "❤️ 연애운", d2: "포용력이 넓어 배우자 복이 매우 좋습니다. 서로를 밀어주고 끌어주는 동반자를 만나 평온하고 행복한 가정을 꾸릴 운명입니다.",
      l3: "💼 직업운", d3: "조직 내에서 정점에 오를 리더의 기질입니다. 자신의 소신을 굽히지 않는 강직함이 결국 큰 성공으로 이끌어 만인의 존경을 받게 됩니다."
    },
    {
      title: "재기발랄한 천재 예술가상",
      desc: "섬세한 눈매와 유연한 얼굴선에서 남다른 감각이 느껴집니다. 남들이 보지 못하는 것을 찾아내는 통찰력이 뛰어난 예술가적 기질이 충만합니다.",
      l1: "💰 재물운", d1: "재물보다는 명예가 먼저 따르는 운입니다. 자신의 전문 분야에서 독보적인 위치에 오르며, 그 명성이 자연스럽게 큰 부를 가져다줄 것입니다.",
      l2: "❤️ 연애운", d2: "불꽃 같은 열정적인 사랑을 할 관상입니다. 감수성이 풍부하여 상대방을 깊이 매료시키며, 평생 잊지 못할 로맨틱한 인연을 만납니다.",
      l3: "💼 직업운", d3: "창의적인 분야에서 빛을 발합니다. 정해진 틀에 박힌 일보다는 자유로운 환경에서 자신의 재능을 펼칠 때 세상의 주목을 받게 됩니다."
    }
    // ... (rest of face results simplified for brevity in mock)
  ];

  const criminalResults = [
    {
      title: "잠재적 사이코패스 살인마상",
      desc: "차가운 눈빛과 감정이 메마른 듯한 얼굴선이 특징입니다. 타인의 고통에 무감각하며, 치밀하고 계획적인 행동 양상을 보일 수 있는 위험한 관상입니다.",
      l1: "🔪 살인마 지수", d1: "한 번 정한 목표는 수단과 방법을 가리지 않고 처리하는 냉혹함이 보입니다. 감정 컨트롤이 매우 뛰어나 주변에서 알아차리기 어렵습니다.",
      l2: "💊 마약 중독 지수", d2: "현실 도피적인 성향은 낮으나, 자극을 위해 위험한 약물에 손을 댈 가능성이 있습니다. 자신의 쾌락을 최우선으로 생각합니다.",
      l3: "🔞 성범죄 지수", d3: "지배 욕구가 강하여 타인을 소유물로 보려는 경향이 있습니다. 비정상적인 집착이 범죄로 이어질 수 있으니 주의가 필요합니다."
    },
    {
      title: "교활한 사기꾼 마약 밀매상",
      desc: "화려한 언변과 상대를 현혹시키는 눈웃음 뒤에 비수가 숨겨져 있습니다. 남의 재물을 탐하며 합법과 불법의 경계를 아슬아슬하게 넘나드는 상입니다.",
      l1: "🔪 살인마 지수", d1: "직접적인 폭력보다는 정신적인 고통을 주는 것을 즐깁니다. 필요하다면 배신을 밥 먹듯 하며 타인의 삶을 파괴합니다.",
      l2: "💊 마약 중독 지수", d2: "쾌락보다는 돈을 목적으로 약물을 유통하거나 이용하는 기질이 강합니다. 마약 범죄의 중심에 있을 확률이 높습니다.",
      l3: "🔞 성범죄 지수", d3: "상대방의 약점을 잡아 이용하는 가스라이팅형 범죄 성향이 농후합니다. 교묘한 수법으로 타인의 심리를 조종합니다."
    },
    {
      title: "충동적인 연쇄 성범죄자상",
      desc: "욕망을 참지 못하는 번들거리는 눈빛과 불안정한 안면 근육이 보입니다. 순간적인 충동을 억제하지 못해 반복적인 범죄 저지를 가능성이 높은 상입니다.",
      l1: "🔪 살인마 지수", d1: "우발적인 폭력성이 강합니다. 계획적이지는 않으나 순간적인 분노가 끔찍한 결과를 초래할 수 있는 위험한 관상입니다.",
      l2: "💊 마약 중독 지수", d2: "의지력이 약해 중독성 약물에 매우 취약합니다. 환각 상태에서 더 큰 범죄를 저지를 위험이 도사리고 있습니다.",
      l3: "🔞 성범죄 지수", d3: "가장 위험한 수치를 보입니다. 비뚤어진 성적 욕망이 사회적 금기를 깨트리며 타인에게 씻을 수 없는 상처를 남길 수 있습니다."
    }
  ];

  const targetResults = currentMode === 'face' ? faceResults : criminalResults;
  const randomResult = targetResults[Math.floor(Math.random() * targetResults.length)];
  
  document.getElementById('result-title').textContent = randomResult.title;
  document.getElementById('result-desc').textContent = randomResult.desc;
  
  document.getElementById('label-1').textContent = randomResult.l1;
  document.getElementById('desc-1').textContent = randomResult.d1;
  document.getElementById('label-2').textContent = randomResult.l2;
  document.getElementById('desc-2').textContent = randomResult.d2;
  document.getElementById('label-3').textContent = randomResult.l3;
  document.getElementById('desc-3').textContent = randomResult.d3;

  setBarWidth('bar-1', Math.floor(Math.random() * 40) + 60);
  setBarWidth('bar-2', Math.floor(Math.random() * 40) + 60);
  setBarWidth('bar-3', Math.floor(Math.random() * 40) + 60);
}

function setBarWidth(id, percent) {
  const bar = document.getElementById(id);
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = percent + '%';
  }, 100);
}
