var rule = {
    title: 'eFuns影视',
    host: 'https://www.pili5.cn',
    hostJs: '',
    headers: {'User-Agent': 'MOBILE_UA'},
    编码: 'utf-8',
    timeout: 5000,
    homeUrl: '/',
    url: '/index.php/vod/show/fyfilter.html',
    filter_url: '{{fl.area}}{{fl.by}}{{fl.class}}{{fl.cateId}}/page/fypage{{fl.year}}',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    searchable: 1, quickSearch: 1, filterable: 1,
    class_name: '电影&剧集&综艺&动漫&短剧',
    class_url: '1&2&3&4&5',
    filter_def: {
        1: {cateId: '/id/1'}, 2: {cateId: '/id/2'}, 3: {cateId: '/id/3'}, 4: {cateId: '/id/4'}, 5: {cateId: '/id/5'}
    },
    play_parse: true,
    parse_url: '',
    lazy: '',
    推荐: '*;*;*;*;*',
    一级: '.module-item a;a&&title;img&&data-original;.module-item-note&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.module-info-tag-link:eq(2)&&Text",
        "img": "img&&data-original",
//主要描述;年份;地区;演员;导演
        "desc": ".module-info-item-content:eq(3)&&Text;.module-info-tag-link:eq(0)&&Text;.module-info-tag-link:eq(1)&&Text;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text",
//简介
        "content": ".module-info-introduction-content&&Text",
        "tabs": ".tab-item",
        "lists": ".module-play-list:eq(#id)&&a",
        "list_url": "a&&href"
    },
    搜索: 'body&&.module-item;img&&alt;img&&data-original;.module-item-note&&Text;a&&href',

    filter: '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'
}