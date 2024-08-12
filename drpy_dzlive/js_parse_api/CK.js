// http://localhost:5707/parse/api/CK.js?url=https://m.iqiyi.com/v_yxq6x4rsng.html
// https://www.ckplayer.vip/jiexi/?url=https://m.iqiyi.com/v_yxq6x4rsng.html
function lazy() {
    try {
        realUrl = snifferMediaUrl('https://www.ckplayer.vip/jiexi/?url=' + input).url;
        return realUrl
    } catch (e) {
        log(e.message)
        return input
    }

}