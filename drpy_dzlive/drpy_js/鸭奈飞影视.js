var rule = {
    title: '鸭奈飞影视',
    host: 'https://www.yanaifei.net',
    url: '/vod/list/fypage/fyclass/0/0/0/0/0/0.html',
    searchUrl: '/public/auto/search1.html?keyword=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: 'ul.tem_head_meun&&li;a&&Text;a&&href;(\\d+)',
    cate_exclude: '排行榜',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: true,
    推荐: 'div.box-width;div.public-list-box;img&&alt;*;span.ft2&&Text;*',
    一级: 'div.public-list-box;a:eq(1)&&Text;img&&data-src;a&&Text;a&&href',
    二级: {
        title: '.slide-info-title&&Text',
        img: '.detail-pic&&img&&data-src',
        desc: ';.slide-info&&span&&Text;;;',
        content: '#height_limit&&Text',
        tabs: '.anthology-tab&&.swiper-wrapper&&a',
        lists: '.anthology-list-play:eq(#id)&&li',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href'
    },
    搜索: 'div.public-list-bj;img&&alt;*;.public-list-prb&&Text;*',
}