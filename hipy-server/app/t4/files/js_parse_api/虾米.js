// http://localhost:5707/parse/api/虾米.js?url=https://m.iqiyi.com/v_yxq6x4rsng.html
// https://jx.xmflv.cc/?url=https://m.iqiyi.com/v_yxq6x4rsng.html
function lazy() {
    try {
        realUrl = snifferMediaUrl('https://jx.xmflv.cc/?url=' + input).url;
        return realUrl
    } catch (e) {
        log(e.message)
        return input
    }

}