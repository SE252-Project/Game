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
const text = document.createElement("txt");
let currentWord ="";

// 在指定时间内随机选择单词并显示
function chooseWord() {
  //准备好要出现的单词
  const randomIndex = Math.floor(Math.random() * words.length);
  const text = document.createElement("txt");
  text.classList.add("text");
  text.innerHTML = words[randomIndex];
  currentWord = text.innerHTML

  // 切割单词成字母
  currentWord.split('').forEach(letter => {
    const letterElement = document.createElement('span');
    letterElement.classList.add('letter');
    letterElement.textContent = letter;
    wordInput.appendChild(letterElement);
  });

  //单词会随机位置诞生
  RandomPosition();
}

//生成一个合理的随机位置
function RandomPosition() {
  const windowH = window.innerHeight;
  const windowW = window.innerWidth;

  const wordH = wordInput.offsetHeight;
  const wordW = wordInput.offsetWidth;

  const wordTop = Math.floor(Math.random() * (windowH - wordH));
  const wordLeft = Math.floor(Math.random() * (windowW - wordW));

  wordInput.style.top = wordTop + "px";
  wordInput.style.left = wordLeft + "px";
  wordInput.style.color = '#e9ebf1';
}

// 检查输入是否正确并更新分数
function checkInput() {
    const letters = document.querySelectorAll('.letter');
    let index = 0;

    // 监听键盘
    document.addEventListener('keydown', (e) => {
      if (e.key.length !== 1) {
        return;
      }

      //键盘敲击的字母是否与该单词相同
      if (e.key === currentWord[index]) {
        letters[index].style.color = '#fa0000';
        index++;

        if (index === currentWord.length) {
          //输入完全正确，更新分数并重置计数器
          score += 10;
          scoreSpan.innerHTML = score;
          //刷新wordInput
          while (wordInput.hasChildNodes()) {
            wordInput.removeChild(wordInput.firstChild);
          }
          index = 0;
        }
      } else {
        //输入错误，需要重新计数直到单词完全拼写正确
        index = 0;
      }
    });
}

// 开始游戏
function startGame() {
  // startButton.disabled = true;
  // chooseWord();
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
      window.location.href = "./index.html";
    }
    else {
      chooseWord();
      checkInput();
    }
  }, 1000);
}

//按键绑定音效
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}
const keys = Array.from(document.querySelectorAll('.key'));

// 绑定事件
window.addEventListener('click', chooseWord);
window.addEventListener('click', checkInput);
window.addEventListener('keydown', playSound);
//wordInput.addEventListener('input', checkInput);
// startButton.addEventListener('click', startGame);
// wordInput.addEventListener("keydown", function(event) {
//   console.log(event.keyCode);
// });
