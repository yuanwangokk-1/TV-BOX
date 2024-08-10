Object.assign(muban.mxpro.二级, {
    tab_text: 'span&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '猫视界',
    host: 'http://www.msjtv.com',
    class_parse: '.navbar-items li:gt(1):lt(15);a&&Text;a&&href;/(\\d+).html',
    tab_exclude: '排序',
}