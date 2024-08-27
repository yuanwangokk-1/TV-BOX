if (!sessionStorage._check_enable) {
    sessionStorage._check_enable = '0';
}

function snifferCheck() {
    log("正在执行js的snifferCheck");
    let src = document.querySelectorAll("iframe")[1];
    if (src) {
        sessionStorage._check_enable = '1';
        location.href = src.src;
    } else {
        setTimeout(snifferCheck, 200);
    }
}

if (location.href.includes("v.nmvod.cn")) {
    snifferCheck();
}

function snifferCheck2() {
    log("正在执行js的snifferCheck2");
    let a = document.querySelector("#lines ul a");
    if (a) {
        a.click();
    } else {
        setTimeout(snifferCheck2, 200);
    }
}

if (!location.href.includes("v.nmvod.cn") && sessionStorage._check_enable === '1') {
    snifferCheck2();
}

// function gazeCheck() {
//     log("正在执行js的gazeCheck");
//     let button = document.querySelector(".vjs-big-play-button");
//     if (button) {
//         button.click();
//         sessionStorage._check_enable = '1';
//         log("点击了gaze播放按钮");
//     } else {
//         setTimeout(gazeCheck, 200);
//     }
// }
//
// if (location.href.includes("https://gaze.run/play/")) {
//     gazeCheck();
// }