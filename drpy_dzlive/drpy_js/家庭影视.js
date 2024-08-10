Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '家庭影视',
    //host: 'http://103.242.3.90:565/',
    host: 'http://a1.qiuyu.xyz:565/',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    class_parse: '.navbar-items li:gt(0):lt(7);a&&Text;a&&href;/(\\d+).html',
    play_parse: true,
    lazy: $js.toString(() => {
        let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
        let kurl = kcode.url;
        if (/\.(m3u8|mp4)/.test(kurl)) {
            input = {jx: 0, parse: 0, url: kurl};
        } else {
            input = {jx: 0, parse: 1, url: kurl};
        }
    }),
}