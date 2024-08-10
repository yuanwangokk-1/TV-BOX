muban.mxpro.二级.desc = '.module-info-item:eq(4)&&Text;.module-info-tag-link&&Text;.module-info-tag-link:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(1)&&Text';
var rule = {
    title: '神仙影视',
    模板: 'mxpro',
    host: 'https://ys.sxtv.top',
    url: '/index.php/vod/show/id/fyfilter.html',
    filter_url: '{{fl.类型}}{{fl.地区}}{{fl.排序}}{{fl.剧情}}{{fl.语言}}{{fl.字母}}/page/fypage{{fl.年份}}',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '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',
    filter_def: {
        1: {类型: '1'},
        2: {类型: '2'},
        3: {类型: '3'},
        4: {类型: '4'},
        5: {类型: '5'},
        36: {类型: '36'}
    },
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    class_parse: '.navbar-items li:gt(1):lt(8);a&&Text;a&&href;/(\\d+).html',
}