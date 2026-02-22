document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Dark Mode Logic
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    darkModeToggle.textContent = isDark ? '다크 모드' : '라이트 모드';
  });
});

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
  input.value = ""; // Reset input
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

  // Show Loading
  document.getElementById('analyze-btn').style.display = 'none';
  document.getElementById('loading').classList.remove('hidden');

  // Simulate AI Analysis (2 seconds delay)
  setTimeout(() => {
    showResult();
  }, 2000);
}

function showResult() {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('result-container').classList.remove('hidden');

  // Random Result Logic (Mock AI)
  const results = [
    { title: "천생 연예인상", desc: "화려한 이목구비와 넘치는 끼가 보입니다. 사람들의 시선을 사로잡는 매력이 있어 연예계나 인플루언서로 성공할 가능성이 높습니다." },
    { title: "자수성가형 사업가상", desc: "강직한 눈매와 다부진 턱선에서 강한 의지가 느껴집니다. 어려움이 있어도 스스로 헤쳐나가 큰 부를 이룰 관상입니다." },
    { title: "온화한 학자상", desc: "깊은 눈동자와 반듯한 이마는 지혜를 상징합니다. 한 분야를 깊이 파고들어 명예를 얻을 학자나 연구원의 기질이 보입니다." },
    { title: "만인에게 사랑받는 귀염상", desc: "동글동글한 인상과 선한 눈매가 매력 포인트! 어딜 가나 예쁨 받고 주변에 사람이 끊이지 않을 복덩이 관상입니다." },
    { title: "카리스마 리더상", desc: "상대를 압도하는 눈빛과 시원한 이목구비. 조직을 이끌고 중요한 결정을 내리는 리더의 자질을 타고났습니다." }
  ];

  const randomResult = results[Math.floor(Math.random() * results.length)];
  
  // Set Text
  document.getElementById('result-title').textContent = randomResult.title;
  document.getElementById('result-desc').textContent = randomResult.desc;

  // Set Random Bars
  setBarWidth('bar-wealth', Math.floor(Math.random() * 40) + 60); // 60~100%
  setBarWidth('bar-love', Math.floor(Math.random() * 40) + 60);
  setBarWidth('bar-career', Math.floor(Math.random() * 40) + 60);
}

function setBarWidth(id, percent) {
  const bar = document.getElementById(id);
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = percent + '%';
  }, 100);
}
