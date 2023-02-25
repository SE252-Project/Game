// 定义单词数组
const words = ['apple', 'banana', 'cherry', 'dragon', 'elephant', 'flower', 'guitar', 'hamburger', 'ice cream', 'jacket', 'kangaroo', 'lemon', 'motorcycle', 'notebook', 'ocean', 'piano', 'queen', 'rainbow', 'sunglasses', 'telephone', 'umbrella', 'violin', 'watermelon', 'xylophone', 'yellow', 'zebra'];

let score = 0; // 初始分数
let timeLeft = 60; // 初始时间

// 获取 DOM 元素
const timeLeftSpan = document.getElementById('time-left');
const scoreSpan = document.getElementById('score');
// const currentWordSpan = document.getElementById('current-word');
const wordInput = document.getElementById('word-input');
const startButton = document.getElementById('start-button');
const text = document.createElement("div");
let currentword ="";

// 在指定时间内随机选择单词并显示
function chooseWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  // currentWordSpan.innerHTML = words[randomIndex];
  const text = document.createElement("div");
  text.classList.add("text");
  text.innerHTML = words[randomIndex];
  currentword = text.innerHTML
  text.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
  text.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
  document.body.appendChild(text);
}

// 检查输入是否正确并更新分数
function checkInput() {
  console.log("word input: " + wordInput.value);
  console.log("text: "+ currentword);
  if (wordInput.value === currentword) {
    score += 10;
    scoreSpan.innerHTML = score;
    wordInput.value = '';
    const divs = document.getElementsByTagName("div");

// 循环遍历所有的 div 元素，将它们从其父元素中删除
    for (let i = divs.length - 1; i >= 0; i--) {
      divs[i].parentNode.removeChild(divs[i]);
    }
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
// wordInput.addEventListener("keydown", function(event) {
//   console.log(event.keyCode);
// });
