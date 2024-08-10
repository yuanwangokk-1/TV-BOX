Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '影渣渣影视',
    host: 'https://www.yingzhazha.com/',
    url: '/vodshow/fyclass--------fypage---.html',
    class_parse: '.navbar-items li:gt(0):lt(8);a&&Text;a&&href;/(\\d+).html',
    searchUrl: '/vodsearch/**----------fypage---.html',
}