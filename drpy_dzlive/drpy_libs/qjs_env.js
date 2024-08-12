const MOBILE_UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36';
const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36';
const UA = 'Mozilla/5.0';
const UC_UA = 'Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36';
const IOS_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
const VIVO_UA = 'Mozilla/5.0 (Linux; Android 11; V1824A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/13.5.2.0';
const True = true;
const False = false;
const None = null;
Array.prototype.add = Array.prototype.push;
Array.prototype.append = Array.prototype.push;
let _t1 = new Date().getTime()
eval(getCryptoJS());
let _t2 = new Date().getTime()
// print(`加载getCryptoJS耗时:${_t2 - _t1}毫秒`);
// console.log(`加载getCryptoJS耗时:${_t2 - _t1}毫秒`);
// print(console, JSON.stringify(Object.keys(console)))
// print(jsp, JSON.stringify(Object.keys(jsp)))
// print(local, JSON.stringify(Object.keys(local)))

function base64Encode(text) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    // return text
}

function base64Decode(text) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
    // return text
}

function md5(text) {
    return CryptoJS.MD5(text).toString();
}

// const jsp = {
//     pdfa: pdfa,
//     pdfh: pdfh,
//     pd: pd,
// };

// const local = {
//     set: local_set,
//     get: local_get,
//     delete: local_delete,
// };

function request(url, obj) {
    let new_obj;
    if (typeof (fetch_params) !== 'undefined') {
        new_obj = obj ? Object.assign(fetch_params, obj) : fetch_params;
    } else {
        new_obj = obj || {}
    }
    if (!new_obj || !new_obj.headers) {
        new_obj.headers = {};
    }
    if (!new_obj.headers['User-Agent'] && !new_obj.headers['user-agent']) {
        new_obj.headers['User-Agent'] = MOBILE_UA;
    }
    // delete new_obj.headers['Referer'];
    // print(obj);
    // print(new_obj);
    if (typeof (fetch) !== undefined) {
        let html = fetch(url, new_obj);
        if (/\?btwaf=/.test(html)) {//宝塔验证
            url = url.split('#')[0] + '?btwaf' + html.match(/btwaf(.*?)\"/)[1];
            log("宝塔验证跳转到:" + url);
            html = fetch(url, new_obj);
        }
        return html
    }
    return ''
}

function post(url, obj) {
    obj.method = 'POST';
    return request(url, obj);
}