/**
 * 解密json数据中的url
 * @param url
 * @returns {*}
 */
function decrypt(url) {
    let key = CryptoJS.enc.Utf8.parse("4OToScUFOaeVTrHE");
    let iv = CryptoJS.enc.Utf8.parse("9CLGao1vHKqm17Oz");
    let encrypted = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(url)
    }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    return encrypted;
}

/**
 * 自动输入验证码并登录成功获取cookie
 * @returns {`satoken=${*};${string}`|string}
 */
function verifyLogin() {
    let cnt = 0;
    let cookie = '';
    let yzm_url = 'https://yiso.fun/api/user/login/captcha';
    log(`验证码链接:${yzm_url}`);
    let submit_url = 'https://yiso.fun/api/user/login';
    log(`post登录链接:${submit_url}`);
    while (cnt < OCR_RETRY) {
        try {
            let {cookie, html} = reqCookie(yzm_url, {toBase64: true});
            let code = OcrApi.classification(html);
            log(`第${cnt + 1}次验证码识别结果:${code}`);
            html = post(submit_url, {
                headers: {Cookie: cookie},
                body: {
                    "userName": 'hjdhnx1',
                    "password": 'Dz@hjdhnx1',
                    "code": code
                }
            });
            html = JSON.parse(html);
            if (html.code === 200) {
                let tokenValue = html.data.tokenValue;
                log(`第${cnt + 1}次验证码提交成功`);
                cookie = `satoken=${tokenValue};${cookie}`
                return cookie // 需要返回cookie
            } else if (html.code !== 200 && cnt + 1 >= OCR_RETRY) {
                cookie = ''; // 需要清空返回cookie
            }
        } catch (e) {
            log(`第${cnt + 1}次验证码提交失败:${e.message}`);
            if (cnt + 1 >= OCR_RETRY) {
                cookie = '';
            }
        }
        cnt += 1
    }
    return cookie
}

globalThis.decrypt = decrypt;
globalThis.verifyLogin = verifyLogin;

var rule = {
    title: '易搜[搜]',
    host: 'https://yiso.fun',
    searchUrl: '/api/search?name=**',
    searchable: 2,
    quickSearch: 0,
    headers: {'User-Agent': 'PC_UA'},
    timeout: 10000,
    play_parse: true,
    lazy: $js.toString(() => {
        let url = input.startsWith('push://') ? input : 'push://' + input;
        input = {parse: 0, url: url};
    }),
    // 一级: '',
    二级: '*',
    搜索: $js.toString(() => {
        let cookie = getItem(RULE_CK, '');
        log('储存的cookie:' + cookie);
        let ret = request(MY_URL, {
            headers: {
                Referer: encodeUrl(`https://yiso.fun/info?searchKey=${KEY}`),
                Cookie: cookie,
            }
        });
        if (/登录用户无限制/.test(ret)) {
            log(ret);
            cookie = verifyLogin();
            if (cookie) {
                log(`本次成功过验证,cookie:${cookie}`);
                setItem(RULE_CK, cookie);
            } else {
                log(`本次自动过搜索验证失败,cookie:${cookie}`);
            }
            ret = request(MY_URL, {
                headers: {
                    Referer: encodeUrl(`https://yiso.fun/info?searchKey=${KEY}`),
                    Cookie: cookie,
                }
            });
        }
        let d = [];
        let arr = JSON.parse(ret).data.list;
        arr.forEach(it => {
            let u = decrypt(it.url);
            if (u && u.includes('ali')) {
                d.push({
                    title: it.fileInfos[0].fileName,
                    url: u,
                    desc: (it.gmtShare || it.gmtCreate) + "\n" + (u),
                    content: u,
                });
            }
        });
        setResult(d);
    }),
}