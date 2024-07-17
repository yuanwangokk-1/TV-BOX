Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
    // list_url_prefix: 'push://',
});
var rule = {
    模板: 'mxpro',
    title: '一号影院5',
    host: 'https://001.pm',
    cate_exclude: '今日更新',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    class_parse: '.navbar-items li:gt(0):lt(8);a&&Text;a&&href;.*/(\\d+)',
    tab_exclude: '排序',
}