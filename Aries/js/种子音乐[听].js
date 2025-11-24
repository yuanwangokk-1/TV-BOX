/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '种子音乐[听]',
  lang: 'dr2'
})
*/

var rule = {
    title: '种子音乐[听]',
    host: 'https://www.zz123.com',
    homeUrl: '/list/mszm.htm?page=1',
    url: '/fyclass.htm?page=fypage',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
        'referer': 'https://www.zz123.com/',
    },
    class_parse: '.aside-menu-list.channel&&[href*=list];a&&Text;a&&href;.(list.*).htm',
    play_parse: true,
    lazy: $js.toString(() => {
        input = input.replace(/play\/(\w+)\.htm/, 'ajax/?act=songinfo&id=$1&lang=');
        log(input);
        let mp3 = JSON.parse(request(input)).data.mp3;
        input = {parse: 0, url: mp3, header: rule.headers};
    }),
    limit: 6,
    //  图片来源:'@Referer=https://www.zz123.com/',
    推荐: "*",
    一级: '.mobile-list&&.mobile-list-item;.songname&&Text;.lazyload&&data-src;.authorname&&Text;a&&href',
    二级: '*',
    // searchUrl:'/search/?key=**&page=fypage',
    // 搜索:'*',
    searchUrl: '/ajax/?act=search&key=**&lang=',
    detailUrl: '/play/fyid.html',
    搜索: 'json:data;mname;pic;sname;id',
}