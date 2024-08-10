// 地址发布页 https://www.dandanju.vip
// 搜索安全验证 > 通过drpy_ocr验证码接口过验证OK
var rule = {
    title: '蛋蛋剧',
    // host:'https://www.dandanju.cc',
    host: 'https://www.dandanju.tv',
    //hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src=jsp.pdfh(html,"a:eq(0)&&href");print(src);HOST=src',
    url: '/type/fyclass.html',
    searchUrl: '/index.php/rss.xml?wd=**',
    搜索: $js.toString(() => {
        let html = request(input);
        let items = pdfa(html, 'rss&&item');
        // log(items);
        let d = [];
        items.forEach(it => {
            it = it.replace(/title|link|author|pubdate|description/g, 'p');
            let url = pdfh(it, 'p:eq(1)&&Text');
            d.push({
                title: pdfh(it, 'p&&Text'),
                url: url,
                desc: pdfh(it, 'p:eq(3)&&Text'),
                content: pdfh(it, 'p:eq(4)&&Text'),
                pic_url: "",
            });
        });
        setResult(d);
    }),
    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,//网站的全局请求超时,默认是3000毫秒
    class_parse: 'ul.swiper-wrapper&&li;a&&Text;a&&href;.*/(.*?).html',
    play_parse: true,
    lazy: `js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        var from = html.from;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
        } else {
            var MacPlayerConfig={};
            eval(fetch(HOST + "/static/js/playerconfig.js").replace('var Mac','Mac'));
            var jx = MacPlayerConfig.player_list[from].parse;
            if (jx == '') {
                jx = MacPlayerConfig.parse
            };
            if (jx.startsWith("/")) {
                jx = HOST + jx;
            }
            input={jx:0,url:jx+url,parse:1,
                header: JSON.stringify({
                    'referer': input
                })}
        }
    `,
    limit: 6,
    推荐: '.tab-content&&li;*;*;*;*',
    一级: 'body&&.ewave-vodlist__box;h4&&a&&Text;.lazyload&&data-original;.pic-text&&Text;h4&&a&&href',
    二级: {
        "title": ".picture&&title;.data--span:eq(0)&&Text",
        "img": ".picture&&img&&data-original",
        "desc": ".pic-text:eq(0)&&Text;;;.data--span:eq(1)&&Text;.data--span:eq(2)&&Text",
        "content": ".desc--a&&Text",
        "tabs": ".nav-tabs&&li",
        "lists": ".tab-pane:eq(#id)&&li"
    },
}