// 定义单词数组
const words = ['apple', 'banana', 'cherry', 'dragon', 'elephant', 'flower', 'guitar', 'hamburger', 'ice cream', 'jacket', 'kangaroo', 'lemon', 'motorcycle', 'notebook', 'ocean', 'piano', 'queen', 'rainbow', 'sunglasses', 'telephone', 'umbrella', 'violin', 'watermelon', 'xylophone', 'yellow', 'zebra'];

let score = 0; // 初始分数
let timeLeft = 60; // 初始时间

// 获取 DOM 元素
const timeLeftSpan = document.getElementById('time-left');
const scoreSpan = document.getElementById('score');
const currentWordSpan = document.getElementById('current-word');
const wordInput = document.getElementById('word-input');
const startButton = document.getElementById('start-button');

// 在指定时间内随机选择单词并显示
function chooseWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWordSpan.innerHTML = words[randomIndex];
}

// 检查输入是否正确并更新分数
function checkInput() {
  if (wordInput.value === currentWordSpan.innerHTML) {
    score += 10;
    scoreSpan.innerHTML = score;
    wordInput.value = '';
    chooseWord();
  }
}

// 开始游戏
function startGame() {
  startButton.disabled = true;
  chooseWord();
  setInterval(() => {
    timeLeft--;
    timeLeftSpan.innerHTML = timeLeft;
    if (timeLeft === 0) {
      clearInterval();
      alert(`时间到！你的得分是 ${score}`);
      startButton.disabled = false;
      score = 0;
      timeLeft = 60;
      scoreSpan.innerHTML = score;
      timeLeftSpan.innerHTML = timeLeft;
    }
  }, 1000);
}

// 绑定事件
wordInput.addEventListener('input', checkInput);
startButton.addEventListener('click', startGame);
