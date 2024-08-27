// 屏蔽devtools监听控制台打开调试事件
// https://cdn.staticfile.net/devtools-detector/2.0.14/devtools-detector.min.js
const devtoolsDetector = {
    addListener() {

    },
    launch() {

    },
};

// devtoolsDetector.addListener(function(isOpen) {
//         if(isOpen&&!Rain){
//             self.location.href="https://baidu.com";
//         }
// });
// devtoolsDetector.launch();