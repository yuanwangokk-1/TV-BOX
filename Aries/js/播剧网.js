/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '播剧',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',
    title: '播剧',
    host: 'https://www.dyxq.cc',
    hostJs: async function () {
        let HOST = this.HOST;
        let html = await request(HOST, {headers: {"User-Agent": UC_UA}});
        HOST = jsp.pdfh(html, "ul&&a:eq(0)&&href");
        return HOST;
    },
    url: '/vodshow/fyfilter.html',
    searchUrl: '/vodsearch/page/2/wd/**.html',
    headers: {'User-Agent': 'UC_UA'},
    searchable: 1, quickSearch: 0, filterable: 1, double: true, play_parse: true, limit: 6,
    class_name: '电影&连续剧&综艺&动漫&短剧',
    class_url: 'movie&tvplay&tvshow&dongman&duanju',
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-----fypage---{{fl.year}}',
    filter_def: {
        'movie': {cateId: 'movie'},
        'tvplay': {cateId: 'tvplay'},
        'dongman': {cateId: 'dongman'},
        'tvshow': {cateId: 'tvshow'},
        'duanju': {cateId: 'duanju'}
    },
    filter: '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',
    lazy: async function () {
        let {input, pdfa, pdfh, pd} = this
        const html = JSON.parse((await req(input)).content.match(/r player_.*?=(.*?)</)[1]);
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
            return {parse: 1, url: input}
        }
    },
    一级: async function () {
        let {input, pdfa, pdfh, pd} = this;
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
    二级: async function () {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');
        VOD.type_name = pdfh(html, '.module-info-tag-link:eq(-1)&&Text');
        VOD.vod_pic = pd(html, '.lazyload&&data-original||data-src||src');
        VOD.vod_content = pdfh(html, '.module-info-introduction&&Text');
        VOD.vod_remarks = pdfh(html, '.module-info-item:eq(-2)&&Text');
        VOD.vod_year = pdfh(html, '.module-info-tag-link&&Text');
        VOD.vod_area = pdfh(html, '.module-info-tag-link:eq(1)&&Text');
        VOD.vod_actor = pdfh(html, '.module-info-item:eq(2)&&Text');
        VOD.vod_director = pdfh(html, '.module-info-item:eq(1)&&Text');
        let playlist = pdfa(html, '.module-play-list')
        let tabs = pdfa(html, '.module-tab-item');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text')
            const list = playlist[i]
            const a = pdfa(list, 'body&&a')
            a.map((it) => {
                let title = pdfh(it, 'a&&Text')
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
    搜索: async function () {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, 'body .module-item');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, '.module-card-item-title&&Text'),
                pic_url: pd(it, '.lazyload&&data-original'),
                desc: pdfh(it, '.module-item-note&&Text'),
                url: pd(it, 'a&&href'),
                content: pdfh(it, '.module-info-item-content&&Text'),
            })
        });
        return setResult(d)
    }
}
