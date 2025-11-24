/*
@header({
  searchable: 1,
  filterable: 0,
  quickSearch: 1,
  title: 'Nyafun',
  lang: 'ds'
})
*/

var rule = {
    类型: '动漫',
    title: 'Nyafun',
    host: 'https://nyafun.cc',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    headers: {'User-Agent': 'UC_UA'},
    searchable: 1,
    quickSearch: 1,
    play_parse: true,
    double: false,
    limit: 6,
    class_name: 'TV动漫&剧场版',
    class_url: '20&21',

    async lazy() {
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

    async 推荐() {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.hl-vod-list li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.hl-lazy&&data-original'),
                desc: pdfh(it, '.hl-pic-text&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },

    async 一级() {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.hl-vod-list li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.hl-lazy&&data-original'),
                desc: pdfh(it, '.hl-pic-text&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },

    async 二级() {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, '.h2&&Text');
        VOD.vod_content = pdfh(html, '.hl-dc-content&&.blurb&&Text');
        let playlist = pdfa(html, '.hl-plays-list')
        let tabs = pdfa(html, '.hl-plays-from.hl-tabs a');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text')
            const list = playlist[i]
            const a = pdfa(list, 'body&&a:not(:contains(展开))')
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

    async 搜索() {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.hl-one-list li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, '.hl-item-title&&Text'),
                pic_url: pd(it, '.hl-lazy&&data-original'),
                desc: pdfh(it, '.hl-pic-text&&Text'),
                url: pd(it, 'a&&href'),
                content: pdfh(it, '.hl-item-content&&p:eq(0)&&Text'),
            })
        });
        return setResult(d)
    }
}