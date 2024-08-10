var rule = {
    title: 'OmoFun[漫]',
    host: 'http://omofun1.xyz',
    hostJs: $js.toString(() => {
        print(HOST);
        let html = request(HOST, {headers: {"User-Agent": PC_UA}});
        let src = jsp.pdfh(html, ".content-top&&ul&&a&&href");
        print(src);
        HOST = src;
    }),
    url: "/vod/showfyfilter/page/fypage.html",
    // searchUrl: "/vod/search/page/fypage/wd/**.html",
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: "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",
    filter_url: "{{fl.地区}}{{fl.排序}}{{fl.剧情}}/id/{{fl.类型}}{{fl.语言}}{{fl.字母}}{{fl.年份}}",
    filter_def: {
        1: {
            类型: "1"
        },
        2: {
            类型: "2"
        },
        3: {
            类型: "3"
        },
        4: {
            类型: "4"
        },
        5: {
            类型: "5"
        }
    },
    headers: {
        "User-Agent": "MOBILE_UA"
    },
    timeout: 5000,
    class_parse: "ul.navbar-items&&a;a&&Text;a&&href;(\\d+?)",
    cate_exclude: "动漫资讯",
    play_parse: true,
    lazy: `js:        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);        var url = html.url;        if (html.encrypt == '1') {            url = unescape(url)        } else if (html.encrypt == '2') {            url = unescape(base64Decode(url))        }        if (/\\.m3u8|\\.mp4/.test(url)) {            input = {                jx: 0,                url: url,                parse: 0            }        } else {            input        }    `,
    double: false,
    推荐: 'body&&.module-poster-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
    一级: 'body&&.module-poster-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
    二级: {
        "title": "h1&&Text",
        "img": ".module-item-pic&&img&&data-original",
        "desc": ".module-info-item:eq(4)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(1)&&Text;li.col-xs-12--span:eq(0)&&Text;;",
        "content": ".show-desc&&Text",
        "tabs": "body&&.module-tab-item",
        "lists": "#panel1&&a",
        tab_text: "body&&Text",
        list_text: "body&&Text",
        list_url: "a&&href"
    },
    searchUrl: '/vod/search/page/fypage/wd/**.html',
    //detailUrl:'/vod/detail/id/fyid.html', //非必填,二级详情拼接链接
    搜索: 'body&&.module-card-item;.module-card-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href',
}