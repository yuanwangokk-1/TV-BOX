Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '往往影视',
    host: 'https://www.wwys.pro/',
    cate_exclude: '今日更新',
    url: '/show/fyclass--------fypage---.html',
    searchUrl: '/search/**----------fypage---.html',
    class_parse: '.navbar-items li:gt(0):lt(8);a&&Text;a&&href;.*/(\\d+)',
    tab_exclude: '排序',
}