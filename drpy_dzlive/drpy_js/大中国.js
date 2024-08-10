Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '大中国',
    host: 'https://video.ao14.cn/',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    class_parse: '.navbar-items li:gt(0):lt(8);a&&Text;a&&href;.*/(.*?)\.html',
    cate_exclude: '今日更新|热榜',
}