var rule = {
    author: '小可乐/240528/第一版',
    title: '胖虎影视',
    host: 'https://www.cdnkan.top',
    hostJs: 'let html=request(HOST,{headers:{"User-Agent":MOBILE_UA}});let src= jsp.pdfh(html,".go:eq(1)&&a&&href");HOST=src',
    headers: {'User-Agent': 'MOBILE_UA'},
    编码: 'utf-8',
    timeout: 5000,

    homeUrl: '/',
    url: '/vodshow/fyfilter.html',
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    detailUrl: '',
    searchUrl: '/phsch/page/fypage/wd/**.html',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,

    class_name: '电影&剧集&综艺&动漫&短剧&解说&其他',
    class_url: '1&2&3&4&7&8&9',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        7: {cateId: '7'},
        8: {cateId: '8'},
        9: {cateId: '9'}
    },

    proxy_rule: '',
    sniffer: 0,
    isVideo: '',
    play_parse: true,
    parse_url: '',
    lazy: `js:
var kcode = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
var kurl = kcode.url;
if (/m3u8|mp4/.test(kurl)) {
input = kurl
} else {
input= 'https://bfnb1sx.phvod.top/?url='+kurl
}`,

    limit: 9,
    double: false,
    推荐: '*;*;*;*;*',
    一级: 'a:has(.icon-play);a&&title;img&&data-original;.module-item-note&&Text;a&&href',
    二级: {
//名称;类型
        "title": "h1&&Text;.module-info-tag-link:eq(-1)&&Text",
//图片
        "img": "img.ls-is-cached&&data-original",
//主要描述;年份;地区;演员;导演
        "desc": ".module-info-item:eq(-2)&&Text;.module-info-tag-link:eq(0)&&Text;.module-info-tag-link:eq(1)&&Text;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text",
//简介
        "content": ".show-desc&&Text",
//线路数组
        "tabs": ".tab-item",
//线路标题
        "tab_text": "body--small&&Text",
//播放数组 选集列表
        "lists": ".module-play-list:eq(#id)&&a",
//选集标题
        "list_text": "body&&Text",
//选集链接
        "list_url": "a&&href"
    },
    搜索: '.module-item;strong&&Text;*;*;*',

    filter: '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'
}