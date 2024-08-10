// 搜索验证
var rule = {
    title: 'B站影视',
    // host:'https://bzhanys.com',
    host: 'https://bzhanyy.com',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',

    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    headers: {
        'User-Agent': 'PC_UA'
    },
    class_parse: '.fixed-nav&&.flex:lt(4);li&&Text;li&&data-id;(\\d+)',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        let from = html.from;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/\.m3u8|\.mp4/.test(url)) {

            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        }
        if (url.includes('NBY-')) {
            let MacPlayerConfig = {};
            eval(fetch(HOST + "/static/js/playerconfig.js").replace('var Mac', 'Mac'));
            let jx = MacPlayerConfig.player_list[from].parse;
            if (jx == '') {
                jx = MacPlayerConfig.parse
            }
            if (jx.startsWith("/")) {
                jx = HOST + jx;
            }
            input = {
                jx: 0, url: jx + url, parse: 1,
                header: {
                    'referer': input
                }
            }
        } else {
            input = {
                jx: tellIsJx(url),
                url: url,
                parse: 0
            }
        }
    }),
    limit: 6,
    推荐: '*',
    // 推荐:'.movie-list-body&&.movie-list-item;.movie-title&&Text;.Lazy&&data-original;.movie-rating&&Text;a&&href',
    一级: '.movie-list-body&&.movie-list-item;.movie-title&&Text;.Lazy&&data-original;.movie-rating&&Text;a&&href',
    // 一级:'json:list;vod_name;vod_pic;vod_score;vod_id',
    二级访问前: 'log(MY_URL);MY_URL=MY_URL.replace("/play/","/detail/").replace("/sid/1/nid/1","");log(MY_URL)',
    二级: {
        "title": "h1&&title;.scroll-content&&Text",
        "img": ".poster&&img&&src",
        "desc": ";;;.starLink&&Text;.cr3:eq(0)&&Text",
        "content": ".detailsTxt--div&&Text",
        "tabs": ".swiper-wrapper&&a",
        "lists": ".content_playlist:eq(#id)&&li"
    },

    // searchUrl:'/index.php/vod/search/page/fypage/wd/**.html',
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/index.php/vod/detail/id/fyid.html',
    // 搜索:'.movie-list-body&&.vod-search-list;*;*;.getop&&Text;*',
    搜索: 'json:list;name;pic;;id',
}