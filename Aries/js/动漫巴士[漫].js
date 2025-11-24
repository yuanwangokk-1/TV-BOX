/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '动漫巴士',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',
    title: '动漫巴士',
    desc: '',
    host: 'http://dm84.site',
    hostJs: async function () {
        let {HOST} = this;
        let html = await request(HOST, {headers: {'User-Agent': UC_UA}});
        HOST = pdfh(html, 'ul&&a:eq(1)&&href');
        if (HOST.startsWith('http')) {
            return HOST;
        } else {
            return 'https://dm84.top'
        }
    },
    url: '/show-fyclass--fyfilter-fypage.html',
    searchUrl: '/s-**---------fypage.html',
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/131.0.0.0'
    },
    searchable: 2, quickSearch: 0, timeout: 5000, play_parse: true, filterable: 1,
    filter: 'H4sIAAAAAAAAA+2Wb0sqQRTGv8u89oWu/f8q0QtvLNzIW5AViAh2tdoS9m5RWmSRQWW3rGtFkN7syzgz+i0anTlnJoploYgE3+3veeaZWc+e426KRMjEZIrM2kkyQabjsUSChMhc7JctkNca9CgveDkWX7J76+aETFcrnWylKwsg6ZBST9fpY0OpCsBjzh4rFJWnADzu5nROAXoXz+2HTfAkoHe+ZeQk4HnVs1bzGM6TgLlstV3OQE4CeO3ME2+6ylOAe3pH/GoL9pSAv32zwjIr7P8l38EKmFJ6qrtS1jhpxxZ0iVnxoVO8D1hiK2wNKa13aehRrUdNPaL1iKlbWrdMPaz1sKFHxlEXl4Y+pvUxUx/V+qipj2h9xNSHtT78qlw/kkax3G1a//OmWLqGAhZnxFLYuFWvs387yvk5s5jQT/omR5015SSm5xfs7qlTIWJ91jisbXf2L6AZJAQZB78xop5Lry/Bk6BbsEafi9h8PcDzjsv0oArnSQgyDqxUF3cHOQlBxoH9vuIF9CSgd9tgOQc8CXgv+03qgacAcyseyxQgJwE9t8I9eJgKdC7PnRrmeoDeXblzeMJ3/4KNPBjYvhnY6DceWL93lG/Obyh9Bu/dARq0cr+08tAXtLL4Lmk9lfRHShc+3MqFEt04h5yEIP/3vq3s1Fh2Fc6TMGjlPmnl9As69ti8VwwAAA==',
    filter_url: '{{fl.by}}-{{fl.class}}--{{fl.year}}',
    filter_def: {},
    class_name: '国漫&日漫&欧美漫&动漫电影',
    class_url: '1&2&3&4',

    预处理: async () => {
        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        // log('input:', input);
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.v_list&&li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.lazy&&data-bg'),
                desc: pdfh(it, '.desc&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },
    搜索: async function (wd, quick, pg) {
        let searchFn = rule.一级.bind(this);
        return await searchFn();
    },
    二级: async function (ids) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');
        VOD.vod_content = pdfh(html, '#intro&&p:eq(-1)&&Text');
        let playlist = pdfa(html, '.play_list');
        let tabs = pdfa(html, '.tab_control li');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text');
            const list = playlist[i];
            const a = pdfa(list, 'body&&a');
            a.map((it) => {
                let title = pdfh(it, 'a&&Text');
                let urls = pd(it, 'a&&href', input);
                if (!playmap.hasOwnProperty(form)) {
                    playmap[form] = [];
                }
                playmap[form].push(title + "$" + urls);
            });
        });
        VOD.vod_play_from = Object.keys(playmap).join('$$$');
        const urls = Object.values(playmap);
        const playUrls = urls.map((urllist) => {
            return urllist.join("#");
        });
        VOD.vod_play_url = playUrls.join('$$$');
        return VOD;
    },
    lazy: async function (flag, id, flags) {
        let {input, pdfa, pdfh, pd} = this
        let html = (await req(input)).content;
        const $ = pq(html)
        input = $('iframe').attr('src')
        let php_html = (await req(input)).content
        let data = {
            'url': php_html.match(/ var url = "(.*)"/)[1],
            't': php_html.match(/ var t = "(.*)"/)[1],
            'key': hh(php_html.match(/hh\("([^"]+)"\)/g)[0].match(/"(.*?)"/)[1]),
            'act': php_html.match(/ var act = "(.*)"/)[1],
            'play': php_html.match(/ var play = "(.*)"/)[1]
        }
        let js_html = JSON.parse((await req('https://hhjx.hhplayer.com/api.php', {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'accept-language': 'zh-CN,zh;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'origin': 'https://hhjx.hhplayer.com',
                'referer': input
            },
            data: data
        })).content)
        return {pares: 0, url: js_html.url}
    }

}

function hh(t) {
    const e = {
        "00ooQ00": "a",
        "11bbR11": "b",
        "22ccS22": "c",
        "33ddT33": "d",
        "44eeU44": "e",
        "55ffV55": "f",
        "66ggW66": "g",
        "77hhX77": "h",
        "88iiY88": "i",
        "99jjZ99": "j",
        "00kkA00": "k",
        "11llB11": "l",
        "22mmC22": "m",
        "33nnD33": "n",
        "44ooE44": "o",
        "55ppF55": "p",
        "66qqG66": "q",
        "77rrH77": "r",
        "88ssI88": "s",
        "99ttJ99": "t",
        "00uuK00": "u",
        "11vvL11": "v",
        "22wwM22": "w",
        "33xxN33": "x",
        "44yyO44": "y",
        "55zzP55": "z",
        "00AAQ00": "A",
        "11BBR11": "B",
        "22CCS22": "C",
        "33DDT33": "D",
        "44EEU44": "E",
        "55FFV55": "F",
        "66GGW66": "G",
        "77HHX77": "H",
        "88IIY88": "I",
        "99JJZ99": "J",
        "00KKAA00": "K",
        "11LLBB11": "L",
        "22MMCC22": "M",
        "33NNDD33": "N",
        "44OOEE44": "O",
        "55PPFF55": "P",
        "66QQGG66": "Q",
        "77RRHH77": "R",
        "88SSII88": "S",
        "99TTJJ99": "T",
        "00UUAA00": "U",
        "11VVBB11": "V",
        "22WWCC22": "W",
        "33XXDD33": "X",
        "44YYEE44": "Y",
        "55ZZFF55": "Z"
    };
    let n = "";
    const o = atob(t);
    for (let t = 0; t < o.length; t++) {
        let l = o[t];
        for (const [n, c] of Object.entries(e))
            if (o.slice(t, t + n.length) === n) {
                l = c,
                    t += n.length - 1;
                break
            }
        n += l
    }
    return n
}
