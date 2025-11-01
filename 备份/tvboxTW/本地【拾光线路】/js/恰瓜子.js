globalThis.cryptoConfig = {
    key: CryptoJS.enc.Utf8.parse("mvXBSW7ekreItNsT"),
    iv: CryptoJS.enc.Utf8.parse("2U3IrJL8szAKp0Fj"),
    rsaKey: "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA=="
};
globalThis.Encrypt = function(plainText) {
    let encrypted = CryptoJS.AES.encrypt(plainText, cryptoConfig.key, {
        iv: cryptoConfig.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
};
globalThis.Decrypt = function(word, key, iv) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let decrypt = CryptoJS.AES.decrypt({
        ciphertext: encryptedHexStr
    }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
};
globalThis.getbody = function(key, t) {
    return `token=1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79&token_id=&phone_type=1&time=${t}&phone_model=xiaomi-22021211rc&keys=qDpotE2bedimK3QGqlyV5ieXXC3EhaPLQ%2BIOJyHnHflCj5w%2F7ESK7FgywMvrgjxbx0GklEFLI4%2BJshgySe633OIRstuktwdiCy3CT%2BfLSpuxBJDIlfXQDaeH3ig1wiB0JsZ601XHiFweGMu4tZfnSpHg3OnoL6nz%2FuurUif2OK4%3D&request_key=${key}&signature=${md5(`token_id=,token=1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79,phone_type=1,request_key=${key},app_id=1,time=${t},keys=qDpotE2bedimK3QGqlyV5ieXXC3EhaPLQ+IOJyHnHflCj5w/7ESK7FgywMvrgjxbx0GklEFLI4+JshgySe633OIRstuktwdiCy3CT+fLSpuxBJDIlfXQDaeH3ig1wiB0JsZ601XHiFweGMu4tZfnSpHg3OnoL6nz/uurUif2OK4=*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br`).toUpperCase()}&app_id=1&ad_version=1`;
};
globalThis.gethtml = function(u, body,
    headers) {
    var hd = fetch(u, {
        headers: headers,
        body: body,
        method: 'POST',
        rejectCoding: true
    });
    var banner = JSON.parse(hd).data;
    var response_key = banner.response_key;
    var keys = banner.keys;
    var bodykeyiv = JSON.parse(RSA.decode(keys, cryptoConfig.rsaKey));
    var key = CryptoJS.enc.Utf8.parse(bodykeyiv.key);
    var iv = CryptoJS.enc.Utf8.parse(bodykeyiv.iv);
    var html = Decrypt(response_key, key, iv);
    return html;
};
globalThis.hqsub = function(MY_CATE) {
    let subs = ["5", "12", "30", "22", ""];
    let tids = ["1", "2", "4", "3", "64"];
    let index = tids.indexOf(MY_CATE);
    return index !== -1 ? subs[index] : "";
};
globalThis.headers = {
    'Cache-Control': 'no-cache',
    'Version': '2406025',
    'PackageName': 'com.uf076bf0c246.qe439f0d5e.m8aaf56b725a.ifeb647346f',
    'Ver': '1.9.2',
    'Referer': 'https://api.cj7wq4.com',
    'X-Customer-Client-Ip': '127.0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Host': 'api.cj7wq4.com',
    'Connection': 'Keep-Alive',
    'User-Agent': 'okhttp/3.12.0'
};
var rule = {
    title: '瓜子',
    host: 'https://api.cj7wq4.com',
    url: '/App/IndexList/indexList',
    searchUrl: '/App/Index/findMoreVod#**',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    class_name: '电影&电视剧&动漫&综艺&短剧',
    class_url: '1&2&4&3&64',
    play_parse: true,
    filter: 'H4sIAAAAAAAAA+2X304TQRTGX8XsdU1mdrvb2b6KaUy1vSAKJAVMCGkCErBtVCDRBaQGjciWf6FGVNrSPk1n176FOezsOTMYE0y4Me7NSc/37XzzJ7O/bJcsbhUfLFlPqotW0ZpbeGTlrJnydBWbZ+WnC9XrR2asoiXXOpPVDshW0WJWPafkVmc8bMfNF4njpnr0/DQOtlC3fRwQtGUzRMNL9bjxJVpdQ72AerglewPUBU6wshktB6hTfjPUczjDAY2dcb9JBte2EL+hGRxaUv9YDt/SHjAqXhlN3o1oBC4qbp3Hw2PaHK+XwEqOuFyrlumMVXe7Qz4IJ7vrSlZN6k0Od6PLc+WpBsdtdKPeKB2XNHgcp2E8eq081aC3/Tlqn6Ze0uB8+0dyb5jOlzQ436uu7B+m8yUNemvfx4Mg9ZJGP53FarlGp6O6W52OzWxXidc/NT1Pel7XHdIdXbdJt3Wdk851nZGur4f7qHNf1wXpQtcLpBd03SPdQ52z+9yVvQvy3JzNeB6KA8WGwqHQohiTvYvx4BMOYixnMwZPMXiewUgGGQzSmAelAEVAoV34ZhD3fZbjvs+h2FAcKHkoLhQPSgGKgEJB4maQgCABQQKCBAQJCBIQJCBIQJCAIEFB0d5FtH2Ubsy4VHOztXkNa0lnXqp4cCU3G2p05eFUhXLby1HQRadcqcxPTVd1O149Q3vu8WyNzMnJjmys3zRL9VLOsu+CunvDcT+UzVCxzDZpQIZjooCMvMkBMlwTAmR4JgHIQFRH337Ig4AMYvXXrjECYR0FXdn6IN9/VLz0/5aX7a582c94+Qdewvs1/O10Ml5mvPyHeOncBS+vGRAPrn42FS1sRCbwcqNreI72Yk/2jwzvBjgNz83wleErw1eGLw1f+TvA1/jyDL6fWp3o6kT95WTmy2t4+M/2nvq4000nY1TGqIxRGaM0Rnk6pLJbn936/+DW138B1JZ4kQAXAAA=',
    一级: $js.toString(() => {
        let d = [];
        let timestamp = Math.floor(new Date().getTime() / 1000);
        let t = timestamp.toString();
        var tid = MY_CATE;
        var sub = hqsub(MY_CATE);
        const fl = MY_FL;
        const pg = MY_PAGE; // 若未使用，可删除
        let request_key = JSON.stringify({
            "area": (MY_FL.area || 0).toString(),
            "sub": (MY_FL.sub || hqsub(MY_CATE)).toString(),
            "year": (MY_FL.year || 0).toString(),
            "pageSize": "30",
            "sort": (MY_FL.sort || "d_id").toString(),
            "page": MY_PAGE,
            "tid": MY_CATE
        });


        let request_key2 = Encrypt(request_key);
        let body = getbody(request_key2, t);
        let html = gethtml("https://api.cj7wq4.com/App/IndexList/indexList", body, headers);

        let data = JSON.parse(html);
        if (data.list) {
            data.list.forEach(item => {
                d.push({
                    title: item.vod_name,
                    desc: item.t_id === 1 ? '已完结' : item.vod_continu === 0 ? '更新至1集' : `更新至${item.vod_continu}集`,
                    year: item.vod_score,
                    img: item.vod_pic,
                    url: `${item.vod_id}/${item.vod_continu}`,
                });
            });
        }

        setResult(d);
    }),

    二级: $js.toString(() => {

        let d = [];
        VOD = {};
        let timestamp = Math.floor(new Date().getTime() / 1000);
        let t = timestamp.toString();
        input = input.replace('https://api.cj7wq4.com/', '');
        let vod_id = input.split("/")[0];
        let request_key = JSON.stringify({
            "token_id": "393668",
            "vod_id": vod_id,
            "mobile_time": t,
            "token": "1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79"
        });
        let request_key2 = Encrypt(request_key);
        let body = getbody(request_key2, t);
        let html1 = gethtml("https://api.cj7wq4.com/App/IndexPlay/playInfo", body, headers);
        let data2 = JSON.parse(html1).vodInfo;
        let request_key3 = JSON.stringify({
            "vurl_cloud_id": "2",
            "vod_d_id": vod_id
        });
        let request_key4 = Encrypt(request_key3);
        let body2 = getbody(request_key4, t);
        let html3 = gethtml("https://api.cj7wq4.com/App/Resource/Vurl/show", body2, headers);
        let list = JSON.parse(html3).list;
        let nnnmm = [];
        list.forEach(item => {
            let playParams = Object.values(item.play);
            let lastParam = null;
            for (let i = playParams.length - 1; i >= 0; i--) {
                if (playParams[i].param) {
                    lastParam = playParams[i].param;
                    break;
                }
            }
            let vurlIdMatch = lastParam.match(/vurl_id=(\d+)/);
            let resolution = lastParam.match(/resolution=(\d+)/);
            if (vurlIdMatch) {
                nnnmm.push(`${item.title}$${vod_id}/${vurlIdMatch[1]}?${resolution[1]}`);
            }
        });
        VOD.vod_name = data2.vod_name;
        VOD.type_name = data2.videoTag.toString();
        VOD.vod_remarks = data2.vod_addtime;
        VOD.vod_actor = data2.vod_actor;
        VOD.vod_area = data2.vod_area;
        VOD.vod_director = data2.vod_director;
        VOD.vod_pic = data2.vod_pic;
        VOD.vod_content = data2.vod_use_content;
        VOD.vod_play_from = '恰恰';
        VOD.vod_play_url = nnnmm.join('#');
    }),

    lazy: $js.toString(() => {
        let vod_id = input.split("/")[0];
        let vurl_id = input.split("/")[1];
        let resolution = input.split("?")[1];
        let timestamp = Math.floor(new Date().getTime() / 1000);
        let t = timestamp.toString();
        let request_key = JSON.stringify({
            "domain_type": "8",
            "vod_id": vod_id,
            "type": "play",
            "resolution": resolution,
            "vurl_id": vurl_id
        });
        let request_key2 = Encrypt(request_key);
        let body = getbody(request_key2, t);
        let html = gethtml('https://api.cj7wq4.com/App/Resource/VurlDetail/showOne', body, headers);
        let url = JSON.parse(html).url;
        input = {
            url: url,
            parse: 0
        };
    }),
    搜索: $js.toString(() => {
        let d = [];
        let timestamp = Math.floor(new Date().getTime() / 1000);
        let t = timestamp.toString();
        let url = input.split("#")[0];
        let request_key11 = input.split("#")[1];
        let request_key = JSON.stringify({
            "keywords": request_key11,
            "order_val": "1"
        });
        let request_key2 = Encrypt(request_key);
        let body = getbody(request_key2, t);
        let html = gethtml(url, body, headers);
        let list = JSON.parse(html).list;
        list.forEach(data => {
            d.push({
                title: data.vod_name,
                desc: data.vod_continu === 0 ? '电影' : `更新至${data.vod_continu}集`,
                content: data.vod_addtime,
                img: data.vod_pic,
                url: `${data.vod_id}/${data.vod_continu}`,
            });
        });
        setResult(d);
    }),

};