/*
@header({
  searchable: 0,
  filterable: 0,
  quickSearch: 0,
  title: '剧圈圈[自动]',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: '自动',
    模板修改: $js.toString(() => {
        Object.assign(muban.自动.二级, {
            tab_text: 'div--small&&Text',
        });
    }),
    title: '剧圈圈[自动]',
    host: 'https://www.jqqzx.cc/',
    url: '/vodshow/id/fyclass/page/fypage.html',
    searchUrl: '/vodsearch**/page/fypage.html',
    class_parse: '.navbar-items li:gt(1):lt(8);a&&Text;a&&href;.*/(.*?)\.html',
    cate_exclude: '今日更新|热榜',
    parse_url: 'https://137.220.183.102/jx/webcloud.php?vid=',
    lazy: $js.toString(() => {
        let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
        let kurl = kcode.url;
        // log(kurl);
        input = rule.parse_url + kurl;
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});Object.defineProperty(window, 'self', {get: ()=> {return {};}});Object.defineProperty(globalThis, 'self', {get: ()=> {return {};}});`;
        input = {
            parse: 1,
            url: input,
            // js: `try{location.href = document.querySelectorAll("iframe")[2].src;}catch(err) {}document.querySelector("#start").click()`,
            js: `document.querySelector("#start").click()`,
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        }
    }),
}