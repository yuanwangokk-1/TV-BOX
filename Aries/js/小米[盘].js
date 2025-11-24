/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '小米[盘]',
  lang: 'ds'
})
*/

const {getHtml} = $.require('./_lib.request.js')
const {
    formatPlayUrl,
} = misc;
var rule = {
    title: '小米[盘]',
    author: '道长',
    host: 'http://www.mucpan.cc',
    url: '/index.php/vod/show/id/fyfilter.html',
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    filter: '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',
    filter_def: {
        20: {cateId: '20'},
        21: {cateId: '21'},
        22: {cateId: '22'},
        23: {cateId: '23'},
    },
    cate_exclude: '网址|专题|全部影片',
    play_parse: true,
    searchable: 1,
    filterable: 1,
    quickSearch: 0,
    class_name: '电影&剧集&动漫&综艺',
    class_url: '20&21&22&23',
    class_parse: async () => {
    },
    预处理: async () => {
        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.module-items .module-item');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, 'img&&data-src'),
                desc: pdfh(it, '.module-item-text&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },
    二级: async function (ids) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');
        VOD.type_name = pdfh(html, '.tag-link&&Text');
        VOD.vod_pic = pd(html, '.lazyload&&data-original||data-src||src');
        VOD.vod_content = pdfh(html, '.sqjj_a--span&&Text');
        VOD.vod_remarks = pdfh(html, '.video-info-items:eq(3)&&Text');
        VOD.vod_year = pdfh(html, '.tag-link:eq(2)&&Text');
        VOD.vod_area = pdfh(html, '.tag-link:eq(3)&&Text');
        VOD.vod_actor = pdfh(html, '.video-info-actor:eq(1)&&Text');
        VOD.vod_director = pdfh(html, '.video-info-actor:eq(0)&&Text');
        let playlist = pdfa(html, '.module-row-one')
        let tabs = pdfa(html, '.module-tab-item');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text');
            const list = playlist[i];
            const a = pdfa(list, 'body&&a.module-row-text');
            a.map((it) => {
                let _title = pdfh(it, 'h4&&Text');
                let _url = pd(it, 'a&&data-clipboard-text');
                if (!playmap.hasOwnProperty(form)) {
                    playmap[form] = [];
                }
                playmap[form].push(_title + "$" + 'push://' + _url);
            });
        });
        VOD.vod_play_from = Object.keys(playmap).join('$$$');
        const urls = Object.values(playmap);
        const playUrls = urls.map((_urls) => {
            return _urls.join("#")
        });
        VOD.vod_play_url = playUrls.join('$$$');
        return VOD
    },
    搜索: async function (wd, quick, pg) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.module-items .module-search-item');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'img&&alt'),
                pic_url: pd(it, 'img&&data-src'),
                desc: pdfh(it, '.video-serial&&Text'),
                url: pd(it, 'a:eq(-1)&&href'),
                content: pdfh(it, '.video-info-items:eq(-1)&&Text'),
            })
        });
        return setResult(d);
    },
    // lazy: async function (flag, id, flags) {
    //     let {input} = this;
    //     return input
    // },
}
