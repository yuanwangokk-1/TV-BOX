// http://localhost:5707/parse/api/盘古.js?url=https://m.iqiyi.com/v_yxq6x4rsng.html
// https://www.pangujiexi.com/jiexi/?url=https://m.iqiyi.com/v_yxq6x4rsng.html
function lazy() {
    try {
        realUrl = snifferMediaUrl('https://www.pangujiexi.com/jiexi/?url=' + input).url;
        return realUrl
    } catch (e) {
        log(e.message)
        return input
    }

}