document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
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
  input.value = "";
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
  document.getElementById('analyze-btn').style.display = 'none';
  document.getElementById('loading').classList.remove('hidden');
  setTimeout(() => {
    showResult();
  }, 2500);
}

function showResult() {
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('result-container').classList.remove('hidden');

  const results = [
    {
      title: "대기만성형 황제상",
      desc: "전체적으로 이목구비가 뚜렷하고 기백이 넘치는 관상입니다. 초년보다 중년 이후의 운이 강력하게 트이는 전형적인 대기만성형입니다.",
      wealth: "창고에 곡식이 가득 차는 형국입니다. 중년 이후에는 예상치 못한 곳에서 큰 재물이 들어오며 자산이 눈덩이처럼 불어날 것입니다.",
      love: "포용력이 넓어 배우자 복이 매우 좋습니다. 서로를 밀어주고 끌어주는 동반자를 만나 평온하고 행복한 가정을 꾸릴 운명입니다.",
      career: "조직 내에서 정점에 오를 리더의 기질입니다. 자신의 소신을 굽히지 않는 강직함이 결국 큰 성공으로 이끌어 만인의 존경을 받게 됩니다."
    },
    {
      title: "재기발랄한 천재 예술가상",
      desc: "섬세한 눈매와 유연한 얼굴선에서 남다른 감각이 느껴집니다. 남들이 보지 못하는 것을 찾아내는 통찰력이 뛰어난 예술가적 기질이 충만합니다.",
      wealth: "재물보다는 명예가 먼저 따르는 운입니다. 자신의 전문 분야에서 독보적인 위치에 오르며, 그 명성이 자연스럽게 큰 부를 가져다줄 것입니다.",
      love: "불꽃 같은 열정적인 사랑을 할 관상입니다. 감수성이 풍부하여 상대방을 깊이 매료시키며, 평생 잊지 못할 로맨틱한 인연을 만납니다.",
      career: "창의적인 분야에서 빛을 발합니다. 정해진 틀에 박힌 일보다는 자유로운 환경에서 자신의 재능을 펼칠 때 세상의 주목을 받게 됩니다."
    },
    {
      title: "신뢰를 주는 현명한 책사상",
      desc: "차분한 눈빛과 반듯한 이마는 지혜와 신중함을 상징합니다. 어떤 위기 상황에서도 흔들리지 않고 최선의 답을 찾아내는 명석한 두뇌의 소유자입니다.",
      wealth: "티끌 모아 태산을 이루는 형국입니다. 철저한 자산 관리와 신중한 투자로 평생 경제적 결핍 없이 안정적이고 풍요로운 삶을 누릴 운입니다.",
      love: "자극적이지 않지만 깊은 우정 같은 사랑을 지향합니다. 서로의 지적인 교감을 중요시하며, 시간이 갈수록 신뢰가 쌓이는 견고한 사랑을 합니다.",
      career: "누구에게나 인정받는 실력자입니다. 뒤에서 전체를 조율하고 핵심적인 전략을 세우는 역할에서 최고의 능력을 발휘하며 없어서는 안 될 존재가 됩니다."
    },
    {
      title: "복을 부르는 만인의 연인상",
      desc: "밝고 선한 인상에서 긍정적인 에너지가 뿜어져 나옵니다. 굳이 노력하지 않아도 주변에 사람이 모여들고, 행운이 스스로 찾아오는 복이 많은 관상입니다.",
      wealth: "인복이 곧 재물운으로 이어집니다. 주변 지인의 도움이나 귀인의 등장으로 중요한 기회를 잡게 되며, 평생 먹을 복이 끊이지 않는 상입니다.",
      love: "연애운이 매우 강력합니다. 상대방을 기분 좋게 만드는 마력을 지니고 있어 늘 사랑받으며, 다정다감하고 세심한 파트너와 인연이 깊습니다.",
      career: "서비스업이나 대인 관계가 중요한 직종에서 성공합니다. 특유의 친화력과 소통 능력으로 복잡한 문제도 부드럽게 해결하여 승승장구할 것입니다."
    },
    {
      title: "강직한 승부사 리더상",
      desc: "강렬한 눈빛과 시원시원한 이목구비는 도전 정신을 나타냅니다. 한 번 목표를 정하면 끝까지 밀어붙이는 투지와 에너지가 남다른 승부사 관상입니다.",
      wealth: "승부사 기질로 큰 기회를 잡아 일확천금을 거머쥘 운입니다. 과감한 결정력이 재테크나 사업에서 빛을 발하여 남부럽지 않은 부를 축적합니다.",
      love: "사랑에서도 주도권을 잡는 편입니다. 자신이 사랑하는 사람을 끝까지 책임지고 보호하는 듬직한 스타일로, 강한 신뢰를 바탕으로 한 사랑을 합니다.",
      career: "경쟁이 치열한 분야에서 독보적인 존재감을 드러냅니다. 남들이 주저할 때 앞장서서 길을 개척하며, 높은 성취욕으로 분야의 일인자가 될 가능성이 높습니다."
    }
  ];

  const randomResult = results[Math.floor(Math.random() * results.length)];
  
  document.getElementById('result-title').textContent = randomResult.title;
  document.getElementById('result-desc').textContent = randomResult.desc;
  document.getElementById('desc-wealth').textContent = randomResult.wealth;
  document.getElementById('desc-love').textContent = randomResult.love;
  document.getElementById('desc-career').textContent = randomResult.career;

  setBarWidth('bar-wealth', Math.floor(Math.random() * 30) + 70);
  setBarWidth('bar-love', Math.floor(Math.random() * 30) + 70);
  setBarWidth('bar-career', Math.floor(Math.random() * 30) + 70);
}

function setBarWidth(id, percent) {
  const bar = document.getElementById(id);
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = percent + '%';
  }, 100);
}
