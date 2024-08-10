Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '悠悠影视',
    host: 'https://www.xiyuzhubao.com',
    url: '/vodshow/fyclass/page/fypage.html',
    searchUrl: '/vodsearch**/page/fypage.html',
    cate_exclude: '今日更新',
    class_parse: '.navbar-items li:gt(0):lt(9);a&&Text;a&&href;.*/(.*?).html',
}