/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '秋霞电影网',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',
    title: '秋霞电影网',
    desc: '不告诉你',
    host: 'https://www.llyady.cc',
    url: '/vodshow/fyfilter.html',
    searchUrl: '/search/**--fypage-----------.html',
    headers: {'User-Agent': 'MOBILE_UA'},
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    timeout: 5000,
    play_parse: true,
    double: true,
    filter: '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',
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.class}}--{{fl.year}}-------fypage',
    filter_def: {
        '1': {cateId: '1'},
        '2': {cateId: '2'},
        '3': {cateId: '3'},
        '4': {cateId: '4'},
        '9': {cateId: '9'},
        '50': {cateId: '50'}
    },
    class_name: '电影&电视剧&动漫&综艺&短剧&其它',
    class_url: '1&2&4&3&9&50',
    预处理: async () => {
        return []
    },
    推荐: async function (tid, pg, filter, extend) {
        let homeFn = rule.一级.bind(this);
        return await homeFn();
    },
    一级: async function (tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        //log(html);
        let data = pdfa(html, '.ysList6 a');
        log(data.length)
        data.forEach((it) => {
            //log(it);
            d.push({
                title: pdfh(it, 'img&&alt'),
                pic_url: pd(it, 'img&&data-src'),
                desc: pdfh(it, ''),
                url: pd(it, 'a&&href'),
            })
        });
        log(d);
        return setResult(d)
    },
    二级: async function (ids) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, '.ys-name18&&Text');
        VOD.vod_content = pdfh(html, '.Synopsis-word&&Text');
        let playlist = pdfa(html, '.list-number1');
        let tabs = pdfa(html, '.list-name17 .list-left17');
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
    搜索: async function (wd, quick, pg) {
        let searchFn = rule.一级.bind(this);
        return await searchFn();
    },
    lazy: async function (flag, id, flags) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        html = JSON.parse(html.match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        if (html.encrypt == "1") {
            url = unescape(url)
            return {parse: 0, url: url}
        } else if (html.encrypt == "2") {
            url = unescape(base64Decode(url))
            return {parse: 0, url: url}
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
            return {parse: 0, url: input}
        } else {
            return {parse: 0, url: input}
        }
    },
}
