Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '魔方影视',
    host: 'https://mfys.vip/',
    url: '/vodshow/fyclass--------fypage---/',
    searchUrl: '/vodsearch/**----------fypage---/',
    class_parse: '.navbar-items li:gt(0):lt(8);a&&Text;a&&href;.*/(\\d+)',
}