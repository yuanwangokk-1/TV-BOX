Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '剧迷',
    host: 'https://www.jagcys.com/',
    url: '/vodshow/fyclass/page/fypage.html',
    searchUrl: '/vodsearch**/page/fypage.html',
    class_parse: '.navbar-items&&li:gt(1):lt(8);a&&Text;a&&href;/vodtype/(.*?)\.html',
    cate_exclude: '今日更新|热榜',
}