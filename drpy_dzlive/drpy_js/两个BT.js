// 地址发布页 https://www.bttwo.vip/
var rule = {
    title: '两个BT',
    // host:'https://www.bttwo.net',
    host: 'https://www.bttwo.vip/',
    hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src = jsp.pdfh(html,"li:eq(0)&&a&&href");print(src);HOST=src',//网页域名根动态抓取js代码。通过HOST=赋值
    // url:'/fyclass/page/fypage',
    url: '/fyclassfyfilter',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.area}}{{fl.year}}{{fl.class}}/page/fypage',
    filter: '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',
    searchUrl: '/xssearch?q=**&f=_all&p=fypage',
    // searchUrl:'/xsssearch?q=**&f=_all&p=fypage',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'PC_UA'
    },
    timeout: 5000,
    class_name: '影视筛选&电视剧&高分电影&热门下载&本月热门&最新电影&国产剧&美剧&日韩剧',//静态分类名称拼接
    class_url: 'movie_bt&dsj&gf&hot&hot-month&new-movie&zgjun&meiju&jpsrtv',//静态分类标识拼接
    // class_parse: '.navlist li:gt(0):lt(7);a&&Text;a&&href;.*/(\\w+)',
    play_parse: true,
    lazy: '',
    limit: 5,
    推荐: '.leibox;li;*;*;*;*',
    double: true, // 推荐内容是否双层定位
    一级: '.bt_img li;.lazy&&alt;.thumb.lazy&&data-original;.jidi span&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.moviedteail_list&&li:eq(0)&&Text",
        "img": ".dyimg.fl img&&src",
        "desc": ".moviedteail_list&&li:eq(9)&&Text;;;.moviedteail_list&&li:eq(7)&&Text;.moviedteail_list&&li:eq(5)&&Text",
        "content": ".yp_context&&p:eq(0)&&Text",
        "tabs": ".ypxingq_t:eq(1) span",
        "lists": ".paly_list_btn:eq(#id) a"
    },
    搜索: '*',
}
