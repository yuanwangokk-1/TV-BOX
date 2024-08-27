// http://localhost:5707/parse/api/阳途.js?url=https://m.iqiyi.com/v_1pj3ayb1n70.html
function lazy() {
    try {
        let custom_regex = 'http((?!http).){12,}?(download4|pcDownloadFile)';
        let web_url = 'https://jx.yangtu.top/?url=' + input;
        // globalThis._debug = True;
        // console.log(custom_regex)
        // console.log(web_url)
        let result = snifferMediaUrl(web_url, 0, custom_regex)
        // console.log(JSON.stringify(result));
        realUrl = result.url;
        return realUrl
    } catch (e) {
        log(e.message)
        return input
    }
}

