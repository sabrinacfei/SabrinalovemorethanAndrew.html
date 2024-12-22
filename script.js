const introText = document.querySelector('.intro-text');
const extraContent = document.getElementById('extra-content');
const packs = document.querySelector('.packs');
let selectedCount = 0; // 用來計算已選擇的卡片數量
const selectedCards = []; // 儲存選中的卡片

// 監聽卡片點擊事件
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (selectedCount < 3 && card.getAttribute('data-flipped') === 'false') { // 限制最多只能抽取三張卡片
      // 翻轉整個卡片，顯示背面
      card.setAttribute('data-flipped', 'true'); // 標記卡片為已翻轉

      // 禁用再次點擊
      card.style.pointerEvents = 'none'; // 禁用點擊

      // 記錄選中的卡片內容
      const cardBack = card.querySelector('.back');
      const cardContent = cardBack.innerHTML;
      selectedCards.push(cardContent);

      // 延遲檢查是否完成抽卡
      setTimeout(() => {
        selectedCount++; // 更新已選擇的卡片數量
        if (selectedCount === 3) {
          showCards(selectedCards); // 顯示總結結果
        }
      }, 300); // 動畫延遲
    }
  });
});

// 顯示抽卡結果的函數
function showCards(cards) {
  const result = document.querySelector('.result');
  result.innerHTML = '<h2>你抽到了以下卡片：</h2>'; // 添加標題
  cards.forEach(card => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-result';
    cardContainer.innerHTML = card; // 顯示卡片內容
    result.appendChild(cardContainer);
  });

  // 顯示額外內容
  extraContent.style.opacity = '1';
  extraContent.style.visibility = 'visible'; // 顯示額外內容區域
  packs.style.opacity = '1';
  packs.style.visibility = 'visible'; // 顯示卡片遊戲區
}

// 滾動事件：滾動到底部時顯示更多內容
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  // 當頁面滾動到接近底部時顯示隱藏內容
  if (scrollPosition >= pageHeight - 100) {
    introText.classList.add('fade-out'); // 使intro-text消失
    extraContent.style.opacity = '1';
    extraContent.style.visibility = 'visible'; // 顯示隱藏區域
    packs.style.opacity = '1';
    packs.style.visibility = 'visible'; // 顯示卡片遊戲
  }
});