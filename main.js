
class LunchRecommender extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #recommendation {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          margin: 20px 0;
        }

        button {
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f0f0f0;
        }
      </style>
      <div>
        <p id="recommendation">추천 메뉴가 여기에 표시됩니다.</p>
        <button id="recommend-btn">점심 메뉴 추천받기</button>
      </div>
    `;

    this.lunchMenu = ['김치찌개', '된장찌개', '비빔밥', '칼국수', '돈까스', '냉면', '부대찌개', '제육볶음'];
    this.recommendationElement = this.shadowRoot.querySelector('#recommendation');
    this.recommendBtn = this.shadowRoot.querySelector('#recommend-btn');

    this.recommendBtn.addEventListener('click', () => this.recommend());
  }

  recommend() {
    const randomIndex = Math.floor(Math.random() * this.lunchMenu.length);
    const recommendedMenu = this.lunchMenu[randomIndex];
    this.recommendationElement.textContent = `오늘의 추천 메뉴는 ${recommendedMenu} 입니다!`;
  }
}

customElements.define('lunch-recommender', LunchRecommender);
