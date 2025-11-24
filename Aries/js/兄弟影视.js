/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '兄弟影视',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视', //影视|听书|漫画|小说
    title: '兄弟影视',
    host: 'https://www.brovod.com',
    url: '/show/fyclass--------fypage---/',
    searchUrl: '/ss/-------------/?wd=**',
    filterable: 0, //是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2ZWU9bRxTH3/spKj/zcE0gSfOWfd/3VHlwI6uNSqkEtBKKIgHG1BBiG0QgZqfBQBDGZhGFSzFfxjO2v0XGnrOhtlf3ARLUXJ78+x+fuXNmhjl/Xb/65lv4C4VDZ75/Ffo52hk6E3rREmlvDzWEWiO/RA2q/kUdixv+PdLyW7T+vdaaHF+qxpZqsoHQ6wZQRyfN90EFwFg5sQYDMWBMd6d11yjEAGjMgaXS3iSOaYHGXBxSO7s4pgWKdRer40WMWaAxqSgGmkvifcntx7lYwFglt6AGlyEGQM8byJf3MAYgaiiP7HINNaBY9g+uAYDmklsoFWdxLhYor2+4mvmIeRYob3rZzBzzLPhZa92zUh4dwpgFisUGdM84xiy8fl6L2nMTaYtGxLGZLKhB1++xmV+sZvqwFAsYqy5k9HYeYgC05MWkmtjDJbdA0914xzEA2sY3axwDoLyxrJ5cwTwLNJeZj5wHQDUU/+IYAM+lIOdSOJD3tqDcBcyzQHm9KbMaKoG7zEyVZPfLqVy5P4PFEPPRm9Vv9k0anT5k+kZ8q7SLBwJAbmxLpPVH3thKPldZ6vK5sTqzWu0ar+SnsABisRVmRN6KGtD2rs9zDEBsBccAxBZyDEAcCxGzILaQYwBikdRqjBepBnKROqORNl4kPbZVHdv0uUiNTuMJ0Oofhd7IeqPUw6yHpe6w7gg9/B3p5qPQT7N+WuqnWD8l9ZOsn5R6M+vNUm9ivUnqXG9Y1hvmesOy3jDXG5b1hrle8/HAmY12dETFhqjcmM6/9bkhZ0E4S8o5UM6Rch6U86RcAOUCKRdBuUjKJVAukXIZlMukXAHlCilXQblKyjVQrpFyHZTrpNwA5QYpN0G5ScotUG6RchuU26TcAeUOKXdBuUvKPVDukXIflPukPADlASkPQXlIyiNQHpHyGJTHpDwB5QkpT0F5SsozUJ4dOBQ/dIr/0OSwclP/OBD8j2ug46X5Kg5Zcl1dGIHITy872vkKy/eqBHav9he/tkVrT33ewPaq8bDsVWq+8oFsiwU/tqU6NazfZ1X3loql8MqUkh/7pla3lEuXowWf1uc/7ZuX9fGyaCrZp1LrGLNAc9lNqfg2zsUC7eHOnJ5CewPA9iauM+gzAOh57/rYTgHQ8/aGeM0A/HbWI7JMXrbIy8J4WS2VKuidIh29OvixTF7Wx9OGjRaMU1FTc5hK/Blsi5mIMAIWvpRhCYzH8TcepDtcryPrdbheR9brcF2OrMvhuhxZl8N1mY+B4QkFhudYGp4Th2R4ql395cUuvDQtyIbdOyMatgGa4ep+pZDAS9oC5Q3n9EAW8yzwRRzX22geAPgC3yjtpOkCr4PouNUPOBcAirnLanUaYxboeRPrlX4Xn2eB8kZm9Ca927JAedvbOpEqucPGUGG2lGgdNv80FgjXwQKNsdZT6R7EbAufwZwYU2HsA026DqIPms7IfbAGFFtZNAuLMQv/27cUQdM//k0/aL5B8z2WzbfpkJqvV4P1/OEllqvMYdMGoDGTS+U0zh6AYunp8gr9+GCBLkSPHzsq6alKEt98ANCYs3Nqgi5ZCzSmx5sJPemKH1As0PP209x2ASjP4y2MKphlwt0GkLHshogZoPWcL5b+xh9eACgvOaMSE5hngc/QusqhYQGgMScGdAaNBwCvy5raH6N1qYNoTF/ijYbnG4Z/MwY+pxuYhsA0BKYhFJiGr940NAvTcESXuOqLm7Goh9eB7sMj+CX/q7r8g9+1g6YRNI2gaRx906j3jNefAExkaDU9KAAA',
    filter_def: {
        1: {
            by: 'time'
        },
        2: {
            by: 'time'
        },
        3: {
            by: 'time'
        },
        4: {
            by: 'time'
        },
        5: {
            by: 'time'
        }
    },
    searchable: 2,
    quickSearch: 0,
    class_name: "电影&剧集&动漫&综艺",
    class_url: "movie&tv&cartoon&show",
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    play_parse: true,
    lazy: async function () {
        let {input} = this;
        let phtml = await request(input);
        let title = pdfh(phtml, 'title&&Text').split("-")[0];
        let html = JSON.parse(phtml.match(/r player_.*?=(.*?)</)[1]);
        var next = html.link_next;
        var from = html.from;
        var url = html.url;
        let kurl = 'https://www.brovod.com' + '/static/player/' + from + '.js';
        let jx1 = await request(kurl);
        let jx = jx1.match(/src="(.*?)'/)[1];
        if (/mytv/.test(from)) {
            var url = await request(jx + url).match(/url: '(.*?)'/)[1];
            return {
                parse: 0,
                url: url,
                js: 0
            };
        } else {

            var psrc = await request(jx + url + '&next=//www.brovod.com' + next + '&title=' + encodeURIComponent(title), {
                headers: {
                    //'Host':'play.brovod.com',
                    //'Upgrade-insecure-requests':1,
                    //'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'Referer': input,
                }
            });
            var pconfig = psrc.split('var config =')[1].split(';')[0]
            //var pconfig = psrc.match(/config = {[\s\S]*?};/)[0];
            //log(pconfig)
            let config = JSON5.parse(pconfig)
            eval(getCryptoJS())
            let t = new Date(new Date().setMinutes(0, 0, 0)).getTime()
            let key = CryptoJS.SHA256(t / 1000 + "cnmdhb").toString(CryptoJS.enc.Hex);
            let play = await request('https://api.xdys.vip/JX', {
                headers: {
                    'Content-type': 'text/plain',
                    'Origin': 'https://play.brovod.com'
                    //'Priority': 'u=1, i'
                },
                method: 'POST',
                body: JSON.stringify({
                    "url": config.url,
                    "pbgjz": config.pbgjz,
                    "dmkey": config.dmkey,
                    "key": key
                })
            });
            let video = JSON.parse(play).cnmdhb;
            return {
                parse: 0,
                url: video,
                js: 0
            };
        }


    },
    double: false,
    一级: async function () {
        let {
            input,
            pdfa,
            pdfh,
            pd
        } = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, 'body a.module-poster-item.module-item');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.lazyload&&data-original'),
                desc: pdfh(it, '.module-item-note&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },
    //一级: 'body a.module-poster-item.module-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
    二级: async function () {
        let {
            input,
            pdfa,
            pdfh,
            pd
        } = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');
        VOD.vod_content = pdfh(html, '.vod_content&&Text');
        let playlist = pdfa(html, "body&&.module-play-list-content")
        let tabs = pdfa(html, '#y-playList&&span');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text')
            const list = playlist[i]
            const a = pdfa(list, 'body&&a')
            a.map((it) => {
                let title = pdfh(it, 'span&&Text')
                let urls = pd(it, 'a&&href', input)
                if (!playmap.hasOwnProperty(form)) {
                    playmap[form] = [];
                }
                playmap[form].push(title + "$" + urls);
            });
        });
        VOD.vod_play_from = Object.keys(playmap).join('$$$');
        const urls = Object.values(playmap);
        const playUrls = urls.map((urllist) => {
            return urllist.join("#")
        });
        VOD.vod_play_url = playUrls.join('$$$');
        return VOD
    },
    /*二级: {
        "title": "h1&&Text;.tag-link&&Text",
        "img": ".module-item-pic&&img&&data-src",
        "desc": ".video-info-items:eq(0)&&Text;.video-info-items:eq(1)&&Text;.video-info-items:eq(2)&&Text;.video-info-items:eq(3)&&Text",
        "content": ".vod_content&&Text",
        "tabs": ".module-tab-item",
        "lists": ".module-player-list:eq(#id)&&.scroll-content&&a"
    },*/
    搜索: async function () {
        let {
            input,
            pdfa,
            pdfh,
            pd
        } = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, 'body .module-item');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'module-card-item-title&&Text'),
                pic_url: pd(it, 'lazyload&&data-original'),
                desc: pdfh(it, '.module-item-note&&Text'),
                url: pd(it, 'a&&href'),
                content: pdfh(it, '.module-info-item-content&&Text'),
            })
        });
        return setResult(d)
    }
    //搜索: 'body .module-item;.module-card-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href;.module-info-item-content&&Text'
}
