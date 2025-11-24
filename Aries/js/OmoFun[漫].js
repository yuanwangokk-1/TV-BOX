/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: 'OmoFun动漫',
  lang: 'ds',
  logo: 'https://i-blog.csdnimg.cn/blog_migrate/2621e710a94ab40ba66645d47f296aaf.gif'
})
*/

var rule = {
    类型: '影视',
    title: 'OmoFun动漫',
    author: '不告诉你',
    host: 'https://omofun5.com',
    logo: 'https://i-blog.csdnimg.cn/blog_migrate/2621e710a94ab40ba66645d47f296aaf.gif',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    headers: {'User-Agent': 'MOBILE_UA'},
    searchable: 1, quickSearch: 1, double: true, timeout: 10000, play_parse: true, filterable: 1, invalid: true,
    class_name: 'TV动画&国漫&剧场&电影&电视剧',
    class_url: '21&20&22&3&4',
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
        let data = pdfa(html, '.module-items .module-poster-item');
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
    二级: async function (ids) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');//名称
        VOD.vod_actor = pdfh(html, '');//演员
        VOD.vod_director = pdfh(html, '');//导演
        VOD.vod_remarks = pdfh(html, '.module-info-content&&.module-info-item:eq(1)&&Text');//备注
        VOD.vod_status = pdfh(html, '.module-info-content&&.module-info-item:eq(2)&&Text');//状态
        VOD.vod_content = pdfh(html, '.module-info-introduction-content&&Text');//简介
        let playlist = pdfa(html, '.module-play-list');
        let tabs = pdfa(html, '#y-playList&&.module-tab-item');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text');
            const list = playlist[i];
            const a = pdfa(list, 'body&&a:not(:contains(展开))');
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
        const {input, pdfa, pdfh, pd} = this;
        const html = await request(input);
        const d = [];
        const data = pdfa(html, '.module-items .module-card-item');

        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'img&&alt'),
                pic_url: pdfh(it, '.lazyload&&data-original'),
                desc: pdfh(it, '.module-item-note&&Text'),
                url: pdfh(it, 'a&&href'),
            })
        });
        return setResult(d);
    },
    lazy: async function (flag, id, flags) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        // log(html);
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
            return {parse: 1, url: input}
        }
    }

}
