/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 1,
  title: '瓜子',
  '类型': '影视',
  lang: 'dr2'
})
*/

// by嗷呜
// 2025-07-15
/*globalThis.Aesalg = function(text, key, iv, dd) {
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    if (dd) {
        let encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
    } else {
        let decrypt = CryptoJS.AES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(text)
        }, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypt.toString(CryptoJS.enc.Utf8);
    }

}*/
globalThis.Aesalg = function(text, key, iv, dd) {
    // 将密钥和IV从字符串转换为Uint8Array
    const keyArray = new TextEncoder().encode(key);
    const ivArray = new TextEncoder().encode(iv);

    // 导入密钥
    const importedKey = crypto.subtle.importKey(
        "raw",
        keyArray,
        { name: "AES-CBC" },
        false,
        dd ? ["encrypt"] : ["decrypt"]
    );

    if (dd) {
        // 加密
        const encryptedArray = crypto.subtle.encrypt(
            {
                name: "AES-CBC",
                iv: ivArray,
            },
            importedKey,
            new TextEncoder().encode(text)
        );

        // 将加密结果转换为十六进制字符串
        const encryptedHex = Buffer.from(encryptedArray, 'utf8').toString('hex');
        return encryptedHex.toUpperCase();
    } else {
        // 解密
        const decryptedArray = crypto.subtle.decrypt(
            {
                name: "AES-CBC",
                iv: ivArray,
            },
            importedKey,
            new Uint8Array(Buffer.from(text, "hex"))
            //hexToUint8Array(text)
        );

        // 将解密结果转换为字符串
        const decryptedString = new TextDecoder().decode(decryptedArray);
        return decryptedString;
    }
};

globalThis.Token = '1be86e8e18a9fa18b2b8d5432699dad0.ac008ed650fd087bfbecf2fda9d82e9835253ef24843e6b18fcd128b10763497bcf9d53e959f5377cde038c20ccf9d17f604c9b8bb6e61041def86729b2fc7408bd241e23c213ac57f0226ee656e2bb0a583ae0e4f3bf6c6ab6c490c9a6f0d8cdfd366aacf5d83193671a8f77cd1af1ff2e9145de92ec43ec87cf4bdc563f6e919fe32861b0e93b118ec37d8035fbb3c.59dd05c5d9a8ae726528783128218f15fe6f2c0c8145eddab112b374fcfe3d79'
globalThis.Getdata = function(data, host, path) {
    let headers = {
        'Cache-Control': 'no-cache',
        'Version': '2406025',
        'PackageName': 'com.uf076bf0c246.qe439f0d5e.m8aaf56b725a.ifeb647346f',
        'Ver': '1.9.2',
        'Referer': host,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'okhttp/3.12.0'
    }
    let key = Aesalg(JSON.stringify(data), 'mvXBSW7ekreItNsT', '2U3IrJL8szAKp0Fj', 1)
    const bodykey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA==";
    const keys = "Qmxi5ciWXbQzkr7o+SUNiUuQxQEf8/AVyUWY4T/BGhcXBIUz4nOyHBGf9A4KbM0iKF3yp9M7WAY0rrs5PzdTAOB45plcS2zZ0wUibcXuGJ29VVGRWKGwE9zu2vLwhfgjTaaDpXo4rby+7GxXTktzJmxvneOUdYeHi+PZsThlvPI="
    let t = Math.floor(new Date().getTime() / 1000).toString()
    let signstr = `token_id=,token=${Token},phone_type=1,request_key=${key},app_id=1,time=${t},keys=${keys}*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br`;
    let body = {
        'token': Token,
        'token_id': '',
        'phone_type': '1',
        'time': t,
        'phone_model': 'xiaomi-22021211rc',
        'keys': keys,
        'request_key': key,
        'signature': md5(signstr),
        'app_id': '1',
        'ad_version': '1'
    }
    let res = JSON.parse(fetch(`${host}${path}`, {
        headers: headers,
        body: body,
        method: 'POST'
    })).data
    let response_keys = res.keys;
    let bodyki = JSON.parse(RSA.decode(response_keys, bodykey))
    return JSON.parse(Aesalg(res.response_key, bodyki.key, bodyki.iv))
}
var rule = {
    title: '瓜子',
    host: 'https://api.cj7wq4.com',
    url: '/App/IndexList/indexList',
    homeUrl:'/App/Resource/VurlDetail/showOne',
    searchUrl: '/App/Index/findMoreVod',
    detailUrl: '/App/IndexPlay/playInfo',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    class_name: '电影&电视剧&动漫&综艺&短剧',
    class_url: '1&2&4&3&64',
    filter: 'H4sIAAAAAAAAA+2a7U4aQRSG/3sVht/bZHf5WnorjWlo4YfphwlqE2NMtGoLWIsmFbRi2qYqoBgxtVVR8GZ2duUuOmchfuDuDHI2xJhD4hGYyTzv7hlm57yZ6aFh/gpogefDL5y38Jq+fuc0vklO8eZAPJWMB5S7Te/j75JebR/ibyeTd8Z1H/9mMBiJLZZb8+WusW7GhC5q4F7jzP3+Qsh2qbXxSQjpdMGSWrsb1umhkNTpgr6mXM06a4qvqd0FS7KqJbv5VUgyLxfsRsHKHyos+9NauuR3U2HNE7bZUKyFHP/E0hXF+rPmfOEMp/A/+HS1dOT827m0cwd2ZgOvtrBjFatCtZ0u6Fz/qHDp4ly3u2BJ5mmRLRfM+ndxupdrrL6rWPkaTwLb+sVveA3ubatStbZ2+B2GAdDTbvGfeZ4X62h3uU+6883I9adbCtxXoqlkPOW1Erm1PeKVSFf1kBDhdPCBEpRRgn5QdBlF94OiySiaHxRVRvEj+1pMQuEdfKAYMorhByUqo0T9oERklAiaoqnPtDA7O5aRwgoPIQhBCDoEDQJ+aqgq55vnvyUSVJXjVGCqQFdBhwqKVNCmRiBEIRgQ8HMp1ossLRZTFR40CDqEIIQQhDCECIQoBAMCXpbRmywDZBkgywBZBsgyQJYBsgyQZYAsA2QZeFnW5rFVqIhT6ONzcXzylddj0aXpET8VWbZsNop25rOIE0Zn52PVzq9KKHoMfTH5IsuUJJgIlmKnj6z5RQkliqaUVtnZuYRioBMzt2LN5iUUfF4yJfkd01T0xaTXzXpGhtF8+MnY32SZCeKnWX2PNdZkvxn0TbPnmq3vTdnVoCeanT20G3uyn6ZLbvpeocdSE55LtEtbf2u0fX7BVtLCNTrxcjSBf7wVZ3lxKeHEE4mJUX6FPsDs+QMJbPz1WAqPau2vs7TYHvJGeU0N591Ie0z+1H80fluxxr7UyW8jv438Nk8S+W2D8NugghOnk/y2Lgr5bQ+kkN9GfpurBPLbHiKL/LaB+W2bDbNeYpmS0D7Q/dk3yzBBfzbNMkzInx2zDIM3EJ19rAyD9lzam1gZBu3tWX9P2HZehsGbe86mWIZBu3vXu3ChteOC6XsxIGsHAXs61k6IrJ0uCFk7niSydtxJZO146CBrxxNC1g5ZO0IKWTvdFLJ2bkkga4esnYFaO+bpAVTC2bJ1sS8854A/g9I2KuQk9DGU4Y71Ike5eEl9J4tKbwTs6ZTeQSq9uyBUenuSqPR2J1Hp7aGDSm9PCJXeVHoLKVR6d1Oo9L4lgUpvKr0He6rC2Rfziu4qI9yl6+iDFXCqIlfrgYQ+W8H3f3xj1gPJp+MVPZBcTlj0PSuoxkfAnkCNPzTzH+StPxCsRAAA',
    play_parse: true,
    lazy: $js.toString(() => {
        let ids = input.split('||')
        let body = {};
        ids[0].split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            body[key] = value;
        });
        let urls = []
        let resolutions = ids[ids.length - 1].split('@');
        resolutions.sort((a, b) => Number(b) - Number(a));
        resolutions.forEach(item => {
            body.resolution = item
            let url = Getdata(body, rule.host, rule.homeUrl.slice(rule.host.length)).url
            urls.push(item, url)
        })
        input = {
            url: urls,
            parse: 0,
            header: rule.headers
        }
    }),
    /*
    推荐: $js.toString(() => {
        let d = []
        let data = Getdata({'pid': '1'}, rule.host, '/App/IndexList/index').list;
        data.slice(1).forEach(item => {
            d.push(item)
        });
        setResult(d)
    }),
    */
    一级: $js.toString(() => {
        let d = [];
        let body = {
            "area": MY_FL.area || '0',
            "year": MY_FL.year || '0',
            "pageSize": "30",
            "sort": MY_FL.year || 'd_id',
            "page": MY_PAGE,
            "tid": MY_CATE
        }
        log('一级>>>>' + rule.url.slice(rule.host.length))
        var list = Getdata(body, rule.host, rule.url.slice(rule.host.length)).list;
        list.forEach(data => {
            d.push({
                title: data.vod_name,
                desc: data.vod_continu == 0 ? '电影' : '更新至' + data.vod_continu + '集',
                year: data.vod_scroe,
                img: data.vod_pic,
                url: `${data.vod_id}/${data.vod_continu}`,
            })
        })
        setResult(d)
    }),
    二级: $js.toString(() => {
        let t = Math.floor(new Date().getTime() / 1000).toString()
        let body1 = {
            "token_id": "1649412",
            "vod_id": vod_id,
            "mobile_time": t,
            "token": Token
        }
        let body2 = {
            "vurl_cloud_id": "2",
            "vod_d_id": vod_id
        }
        let qdata = Getdata(body1, rule.host, rule.detailUrl.slice(rule.host.length))
        let jdata = Getdata(body2, rule.host, '/App/Resource/Vurl/show')
        let vod = qdata.vodInfo;
        vod.type_name = (vod.videoTag || []).map(String).join(',');
        if (vod.videoTag) {
            delete vod.videoTag;
        }
        vod.vod_content = (vod.vod_use_content || '').trim();
        let r = [];
        jdata.list.forEach((item, index) => {
            let n = [];
            let p = [];
            Object.entries(item.play || {}).forEach(([key, value]) => {
                if (value.param) {
                    n.push(key);
                    p.push(value.param);
                }
            });
            let cm = String(index + 1);
            if (jdata.list.length === 1) {
                cm = vod.vod_name;
            }
            r.push(`${cm}$${p[p.length - 1]}||${n.join('@')}`);
        });
        vod.vod_play_from = '嗷呜要吃瓜';
        vod.vod_play_url = r.join('#');
        VOD = vod
    }),
    搜索: $js.toString(() => {
        let d = [];
        let data = Getdata({
            "keywords": KEY,
            "order_val": "1"
        }, rule.host, rule.searchUrl.slice(rule.host.length))
        data.list.forEach(data => {
            d.push({
                title: data.vod_name,
                desc: data.vod_continu == 0 ? '电影' : '更新至' + data.vod_continu + '集',
                content: data.vod_addtime,
                img: data.vod_pic,
                url: `${data.vod_id}/${data.vod_continu}`,
            })
        })
        setResult(d)
    }),
}