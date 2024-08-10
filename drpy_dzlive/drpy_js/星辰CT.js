Object.assign(muban.首图2.二级, {
    "tabs": ".nav-tabs&&a",
    "lists": ".stui-content__playlist:eq(#id)&&a:not(:contains(1080))",
});
var rule = {
    模板: '首图2',
    title: '星辰CT',
    host: 'https://citytv.cc',
    url: '/tv/fyclass-fypage/',
    searchUrl: '/wd/**/page/fypage/',
    class_parse: '.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;.*/(.*?)/',
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
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
        } else {
            input
        }
    }),
    搜索: '.stui-vodlist li;a&&title;a&&data-original;.pic-text&&Text;a&&href',
}