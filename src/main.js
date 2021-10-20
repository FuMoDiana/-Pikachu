const string = `
.skin * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.skin {
    position: relative;
    background-color: rgb(255, 230, 0);
    min-height:50vh;
}

.nose {
    border: 10px solid red;
    border-color: black transparent transparent transparent;
    width: 0px;
    height: 0px;
    position: relative;
    left: 50%;
    top: 150px;
    margin-left: -10px;
    z-index: 5;
}

@keyframes wave {
    0% {
        transform: rotate(0deg);
    }
    33% {
        transform: rotate(5deg);
    }
    66% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.nose:hover {
    animation: wave 200ms infinite linear;
}

.yuan {
    width: 20px;
    height: 6px;
    position: absolute;
    top: -16px;
    left: -10px;
    border-radius: 50% / 100% 100% 0 0;
    ;
    background-color: black;
}

.eye {
    border: 2px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background: rgb(46, 46, 46);
}
/* 眼白设置伪元素 */

.eye::before {
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: white;
    position: relative;
    left: 8px;
    top: 4px;
}

.eye.left {
    transform: translateX(-150px);
    border-radius: 50%;
}

.eye.right {
    transform: translateX(150px);
    border-radius: 50%;
}

.mouth {
    width: 200px;
    height: 200px;
    left: 50%;
    top: 160px;
    position: absolute;
    margin-left: -100px;
}

.lip.left {
    border: 4px solid black;
    height: 30px;
    width: 100px;
    border-radius: 0 0 0 50px;
    border-top-color: transparent;
    border-right-color: transparent;
    position: relative;
    transform: rotate(-14deg);
    z-index: 1;
}

.lip.left::before {
    content: '';
    display: block;
    width: 10px;
    height: 40px;
    position: absolute;
    right: -7px;
    bottom: -0px;
    background-color: rgb(255, 230, 0);
}

.lip {
    background-color: rgb(255, 230, 0);
}

.lip.right {
    border: 4px solid black;
    height: 30px;
    width: 100px;
    left: 100px;
    border-radius: 0 0 50px 0;
    border-top-color: transparent;
    border-right-color: transparent;
    position: relative;
    transform: rotate(-346deg);
    top: -31px;
    z-index: 1;
}

.lip.right::before {
    content: '';
    display: block;
    width: 10px;
    height: 40px;
    position: absolute;
    left: -7px;
    bottom: -0px;
    background-color: rgb(255, 230, 0);
}

.mouth .down {
    height: 160px;
    margin-top: 10px;
    position: absolute;
    top: 0px;
    width: 100%;
    overflow: hidden;
}

.yuan2 {
    border: 1px solid black;
    width: 180px;
    height: 1000px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -90px;
    border-radius: 0 0 60% 60%;
    background: rgb(155, 0, 10);
    overflow: hidden;
}

.yuan2 .inner {
    border: 1px solid black;
    width: 200px;
    height: 300px;
    background: rgb(255, 72, 95);
    position: absolute;
    bottom: -170px;
    left: 50%;
    margin-left: -100px;
    border-radius: 50%;
}

.face1 {
    border: 3px solid black;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 200px;
    position: relative;
    border-radius: 50%;
    background: rgb(255, 0, 0);
    transform: translateX(-220px);
}

.face2 {
    border: 3px solid black;
    width: 80px;
    height: 80px;
    left: 50%;
    top: 120px;
    position: relative;
    border-radius: 50%;
    background: rgb(255, 0, 0);
    transform: translateX(135px);
}
`
let time = 30
let n = 1
let id
const demo = document.querySelector('#demo')
const demo2 = document.querySelector('#demo2')


const player = {
    //初始化模块
    init: () => {
        demo2.innerHTML = string.substr(0, n)
        demo.innerText = string.substr(0, n)
        id = player.play();
        player.bindEvents();
    },
    run: () => {
        n = n + 1
        if (n > string.length) {
            window.clearInterval(id);
            return
        }
        demo2.innerHTML = string.substr(0, n)
        demo.innerText = string.substr(0, n)
        demo.scrollTop = 9999999 // 自动向下滚动
    },
    events: {
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    bindEvents: () => {
        for (let key in player.events) {
            //防止循环到非自身的属性
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key]
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    play: () => {
        id = setInterval(player.run, time);
        return id;
    },
    pause: () => {
        window.clearInterval(id);
    },
    slow: () => {
        player.pause();
        time = 60
        id = player.play();
    },
    normal: () => {
        player.pause();
        time = 30
        id = player.play();
    },
    fast: () => {
        player.pause();
        time = 0
        id = player.play();
    }

}

player.init();