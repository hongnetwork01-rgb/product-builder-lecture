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
  const container = document.querySelector('.container');

  if (mode === 'face') {
    faceBtn.classList.add('active');
    criminalBtn.classList.remove('active');
    container.classList.remove('criminal-theme');
    mainTitle.textContent = 'AI 관상 테스트';
    analyzeBtn.textContent = '관상 분석하기';
    uploadText.textContent = '얼굴 사진을 올려주세요';
  } else {
    faceBtn.classList.remove('active');
    criminalBtn.classList.add('active');
    container.classList.add('criminal-theme');
    mainTitle.textContent = 'AI 범죄상 테스트';
    analyzeBtn.textContent = '범죄상 분석하기';
    uploadText.textContent = '범죄상 분석을 위해 사진을 올려주세요';
  }
  
  removeUpload();
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
  loadingText.textContent = currentMode === 'face' ? 'AI가 관상을 분석 중입니다...' : 'AI가 실제 범죄자 관상 데이터와 대조 중입니다...';
  
  document.getElementById('analyze-btn').style.display = 'none';
  document.getElementById('loading').classList.remove('hidden');
  
  setTimeout(() => {
    showResult();
  }, 3000);
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
  ];

  const criminalResults = [
    {
      title: "연쇄 강력범죄형 (Serial Offender)",
      desc: "실제 강력범죄자들의 공통적인 특징인 '차가운 무표정'과 '비대칭적인 눈빛'이 강하게 검출되었습니다. 감정 조절 능력이 낮고 우발적인 폭력성이 잠재되어 있을 가능성이 높습니다.",
      l1: "🩸 살인 및 폭력 위험도", d1: "매우 위험한 수치입니다. 순간적인 분노가 폭발하면 스스로를 제어하기 힘든 타입입니다.",
      l2: "💸 경제 범죄 가능성", d2: "수단과 방법을 가리지 않고 목적을 달성하려는 경향이 있어 금융 범죄에 노출될 수 있습니다.",
      l3: "💊 약물 중독 위험도", d3: "현실 도피적인 성향이 강해 중독성 물질에 의존할 확률이 다른 관상보다 높습니다."
    },
    {
      title: "지능형 경제 사기범형 (White Collar)",
      desc: "상대방을 안심시키는 부드러운 미소 뒤에 치밀한 계산이 숨겨져 있습니다. 남의 재물을 탐하며 합법의 테두리를 교묘히 넘나드는 전형적인 지능범의 관상입니다.",
      l1: "🩸 살인 및 폭력 위험도", d1: "직접적인 폭력보다는 정신적인 지배와 착취를 즐기는 소시오패스적 성향이 보입니다.",
      l2: "💸 경제 범죄 가능성", d2: "최고 수치입니다. 타인의 신뢰를 이용해 막대한 이익을 챙기는 사기 범죄에 최적화된 관상입니다.",
      l3: "💊 약물 중독 위험도", d3: "이성적인 판단을 중시하여 약물에는 의존하지 않으나, 도박과 같은 투기성 중독에 취약합니다."
    },
    {
      title: "성범죄 및 스토킹 고위험군",
      desc: "비뚤어진 소유욕과 집착이 안색과 눈동자의 움직임에서 포착되었습니다. 상대의 거부 의사를 무시하고 자기중심적으로 해석하여 범죄를 정당화할 위험이 큽니다.",
      l1: "🩸 살인 및 폭력 위험도", d1: "집착이 광기로 변할 경우 극단적인 선택을 할 수 있는 위험한 잠재력이 검출되었습니다.",
      l2: "💸 경제 범죄 가능성", d2: "물욕보다는 소유욕에 집중되어 있어 상대적으로 경제 범죄 수치는 낮게 나타납니다.",
      l3: "🔞 성범죄 지수", d3: "위험 수위입니다. 자신의 욕망을 사회적 도덕보다 우선시하는 경향이 뚜렷하게 보입니다."
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

  const barColor = currentMode === 'face' ? '' : '#ff4d4d'; // Red for criminal
  for(let i=1; i<=3; i++) {
    const bar = document.getElementById(`bar-${i}`);
    bar.style.background = barColor;
    setBarWidth(`bar-${i}`, Math.floor(Math.random() * 40) + 60);
  }
}

function setBarWidth(id, percent) {
  const bar = document.getElementById(id);
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = percent + '%';
  }, 100);
}
