// http://localhost:5707/parse/api/夜幕.js?url=https://m.iqiyi.com/v_yxq6x4rsng.html
// https://www.yemu.xyz/?url=https://m.iqiyi.com/v_yxq6x4rsng.html
function lazy() {
    try {
        realUrl = snifferMediaUrl('https://www.yemu.xyz/?url=' + input).url;
        return realUrl
    } catch (e) {
        log(e.message)
        return input
    }

}