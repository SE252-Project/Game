//背景点特效

// 获取DOM元素
var border = document.getElementById("border");
var dot = document.getElementById("dot");

// 设置参数
var interval = 200; // 生成间隔（毫秒）
var speed = 0; // 初始速度
var maxSpeed = 100  ; // 最大速度
var acceleration = 1; // 加速度
var mark = 0;//控制Enter键对代码的重复生成


window.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && mark == 0) {
        mark = 1;
        // 用户按下了enter键，这里插入代码执行相应操作
        // 定时生成白点
        setInterval(function() {
            // 生成白点
            var newDot = dot.cloneNode(true);
            border.appendChild(newDot);
            document.querySelector('#dot').style.opacity = 0;

            // 设置初始位置
            var x = border.offsetWidth / 2 - newDot.offsetWidth / 2;
            var y = border.offsetHeight / 2 - newDot.offsetHeight / 2;
            newDot.style.left = x + "px";
            newDot.style.top = y + "px";

            // 随机选择边框上的位置
            var position = Math.floor(Math.random() * 5);
            switch (position) {
                case 0: // 左边框
                    y = Math.random() * (border.offsetHeight - newDot.offsetHeight);
                    x = -newDot.offsetWidth;
                    break;
                case 1: // 右边框
                    y = Math.random() * (border.offsetHeight - newDot.offsetHeight);
                    x = border.offsetWidth;
                    break;
                case 2: // 下边框左
                    y = border.offsetHeight;
                    x = Math.random() * (1/3*border.offsetWidth - newDot.offsetWidth);
                    break;
                case 3: // 下边框右
                    y = border.offsetHeight;
                    x = 2/3*border.offsetWidth + Math.random() * (1/3*border.offsetWidth - newDot.offsetWidth);
                    break;
                case 4: // 上边框
                    y = -newDot.offsetHeight;
                    x = Math.random() * (border.offsetWidth - newDot.offsetWidth);
                    break;
            }

            // 移动白点
            document.querySelector('#dot').style.opacity = 1;
            var dx = x - parseFloat(newDot.style.left);
            var dy = y - parseFloat(newDot.style.top);
            var distance = Math.sqrt(dx * dx + dy * dy);
            let distance1 = distance;
            var startTime = new Date().getTime();
            var timer = setInterval(function() {
                var currentTime = new Date().getTime();
                var elapsedTime = currentTime - startTime;

                if (distance !== distance1){
                    document.querySelector('#dot').style.opacity = 1;
                }
                // 判断白点和边框的距离是否小于等于0
                if (distance <= 0) {
                    clearInterval(timer);
                    border.removeChild(newDot);
                } else {
                    var t = elapsedTime / distance;

                    // 更新速度
                    var currentSpeed = speed + acceleration * t;
                    if (currentSpeed > maxSpeed) {
                        currentSpeed = maxSpeed;
                    }

                    // 计算白点当前位置
                    var currentX = parseFloat(newDot.style.left) + dx * currentSpeed / distance;
                    var currentY = parseFloat(newDot.style.top) + dy * currentSpeed / distance;

                    // 更新白点位置
                    newDot.style.left = currentX + "px";
                    newDot.style.top = currentY + "px";

                    // 更新距离
                    dx = x - currentX;
                    dy = y - currentY;
                    distance = Math.sqrt(dx * dx + dy * dy);

                    // 检测边框碰撞
                    if (currentX < -newDot.offsetWidth || currentX > border.offsetWidth || currentY < -newDot.offsetHeight || currentY > border.offsetHeight) {
                        clearInterval(timer);
                        border.removeChild(newDot);
                    }
                }
            }, 10);
        }, interval);
    }
});