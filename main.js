document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const ballsContainer = document.getElementById('lotto-balls');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Dark Mode Toggle
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    darkModeToggle.textContent = isDark ? '다크 모드' : '라이트 모드';
  });

  // Lotto Number Generation
  generateBtn.addEventListener('click', () => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    
    numbers.sort((a, b) => a - b);
    
    renderBalls(numbers);
  });

  function renderBalls(numbers) {
    ballsContainer.innerHTML = '';
    
    numbers.forEach(num => {
      const ball = document.createElement('span');
      ball.className = 'ball';
      ball.textContent = num;
      
      // Color coding
      if (num <= 10) ball.classList.add('yellow');
      else if (num <= 20) ball.classList.add('blue');
      else if (num <= 30) ball.classList.add('red');
      else if (num <= 40) ball.classList.add('gray');
      else ball.classList.add('green');
      
      // Add animation effect
      ball.style.transform = 'scale(0)';
      ballsContainer.appendChild(ball);
      
      setTimeout(() => {
        ball.style.transform = 'scale(1)';
      }, 50);
    });
  }
});
