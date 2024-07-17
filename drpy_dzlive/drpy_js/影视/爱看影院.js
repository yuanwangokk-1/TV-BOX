Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '爱看影院',
    host: 'https://www.92kyy.com',
    // host: 'https://92kyy.com',
    class_parse: '.navbar-items li:gt(0):lt(8);a&&Text;a&&href;.*/(\\d+)',
    cate_exclude: '今日更新|排序',
    url: '/vodshow/fyclass--------fypage---.html',
    searchUrl: '/vod-s/**----------fypage---.html',
    tab_exclude: '排序',
}