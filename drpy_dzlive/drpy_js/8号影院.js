Object.assign(muban.首图2.二级, {
    tabs: '.stui-pannel__head h3',
});
var rule = {
    模板: '首图2',
    title: '8号影院',
    host: 'http://www.bahaoys.com',
    url: '/frim/fyclass-fypage.html',
    searchUrl: '/search.php?page=fypage&searchword=**&searchtype=',
    tab_exclude: '本周热门|最近更新',
    class_parse: '.type-slide li:gt(0):lt(7);a&&Text;a&&href;.*/(.*?).html',
    lazy: $js.toString(() => {
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            js: '',
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        }
    }),
}