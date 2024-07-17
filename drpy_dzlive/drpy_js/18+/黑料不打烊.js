var rule = {
    title: '黑料不打烊',
    host: 'https://hl49.co',
    url: '/category/fyclass/fypage.html',
    searchUrl: '/index/search_article?word=**&page=fypage',
    searchable: 1,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0',
    },
    class_name: '首页&热点&明星&奇葩&真实',
    class_url: '0&1&2&3&4',
    hostJs: $js.toString(() => {
        HOST = 'https://mgj.uzrpy.com';
        try {
            let html = request(rule.host);
            HOST = pdfh(html, ".box-wrap&&a&&href") || HOST;
        } catch (e) {
            log(`获取Host错误${e.message}`);
        }
    }),
    hikerListCol: "card_pic_1",
    hikerClassListCol: "card_pic_1",
    lazy: typeof MY_NAME !== "undefined" ? $js.toString(() => {
        var list = jsp.pdfa(request(input), '.dplayer');
        input = {
            parse: ""
        };
        if (list.length === '1') {
            let url = JSON.parse(pdfh(list[0], '.dplayer&&config')).video.url;
            input.url = url.startsWith("http") ? url : "https://hls.vdtuzv.com" + url;
        } else {
            var a = []
            list.forEach((data, id) => a.push('第' + (id + 1) + '部'))
            input.url = $(a, 1)
                .select(list => {
                    input = input.match(/\d+/)[0] - 1
                    return $(JSON.parse(pdfh(list[input], '.dplayer&&config'))
                        .video.url)
                        .lazyRule(() => input.startsWith("http") ? input : "https://hls.vdtuzv.com" + input)
                }, list)
        }
    }) : void 0,
    play_parse: true,
    limit: 6,
    proxy_rule: $js.toString(() => {
        //log(input);
        // 测试:https://www.wakatool.com/base64img
        if (input) {
            let t1 = new Date().getTime();
            let _type = input.url.split('.').slice(-1)[0];
            let data = request(input.url, {toBase64: true});
            //log(data);
            let t2 = new Date().getTime();
            log(`网络请求获取图片耗时:${t2 - t1}ms`);
            log(`当前线程:${java.lang.Thread.currentThread().getName()}`);

            let key = CryptoJS.enc.Utf8.parse("f5d965df75336270");
            let iv = CryptoJS.enc.Utf8.parse("97b60394abc2fbe1");
            let encrypted = CryptoJS.AES.decrypt({
                ciphertext: CryptoJS.enc.Base64.parse(data)
            }, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString(CryptoJS.enc.Base64);
            let img_base64 = 'data:image/' + _type + ';base64,' + encrypted;
            let t3 = new Date().getTime();
            log(`已获取图片${input.url}解密耗时:${t3 - t2}ms`);
            // // input = [200, 'text/plain', img_base64];
            // input = [302, 'text/html', '', {Location:'https://www.baidu.com'}];
            input = [200, 'image/' + _type, img_base64, null, 1];
            // input = [200, 'text/plain', data];
        }
    }),
    预处理: $js.toString(() => {
        rule.cate_exclude = '';
    }),
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let list = pdfa(html, '.video-item');
        list.forEach(item => {
            var pic = pdfh(item, 'img&&onload');
            var url = pd(item, 'a&&href', MY_URL);
            var title = pdfh(item, '.title&&Text');
            if (title) {
                d.push({
                    title: title,
                    img: pic,
                    desc: "0",
                    url: url
                });
            }
        });
        setResult(d);
    }),
    //一级: '.video-item;.title&&Text;img&&onload;;a&&href',
    图片替换: $js.toString(() => {
        if (/loadImg/.test(input)) {
            input = input.split("'")[1];
        }
        input = getProxyUrl() + '&url=' + input;
    }),
    二级: "*",
    搜索: $js.toString(() => {
        let d = [];
        let u = input.split("?");
        let h = post(u[0], {
            body: u[1]
        });
        let list = JSON.parse(h).data.list;

        list.forEach(item => {
            let pic = item.thumb;
            let url = `${rule.host}/archives/${item.id}.html`
            d.push({
                title: item.title,
                desc: item.created_date,
                img: pic,
                url: url
            });
        });
        setResult(d);
    })
}