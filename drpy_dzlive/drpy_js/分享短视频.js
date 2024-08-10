var rule = {
    类型: '影视',//影视|听书|漫画|小说
    title: '分享短视频',
    host: 'http://www.sharenice.net',
    url: '/fyclass?page=fypage',
    searchUrl: '/video/search?kw=**',
    searchable: 1,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'PC_UA',
    },
    timeout: 5000,
    class_parse: 'a[href*=net]:lt(29);a&&Text;a&&href;net/(.*)',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let _url = pdfh(html, 'div.video-play-box&&video&&src') + '#.mp4';
        input = {parse: 0, url: _url, js: ''};
    }),
    double: true,
    推荐: 'div.item-box ul;li;*;*;*;*',
    一级: 'div.item-box&&ul&&li;a&&title;img&&data-original;;a&&href',
    二级: '*',
    搜索: '*',
}