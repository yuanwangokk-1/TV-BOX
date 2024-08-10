var rule = {
    title: '短剧在线',
    host: 'https://duanju.best',
    url: '/vodshow/fyclass--------fypage---.html',
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_parse: '.nav-menu-items&&li;a&&Text;a&&href;.*/(.*?).html',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1])
        let url = html.url
        let from = html.from
        if (html.encrypt == '1') {
            url = unescape(url);
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url));
        }
        log('切片地址:' + url);
        if (url.includes('.mp4')) {
            let play = JSON.parse(request(url, {
                    redirect: false,
                    withHeaders: true
                }
            )).location;
            //log(play)
            input = {jx: 0, url: play, parse: 0}
        } else {
            input
        }
    }),
    limit: 6,
    推荐: '.module-list;.module-items&&.module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    double: true,
    一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    二级: {
        title: 'h1&&Text;.tag-link&&Text',
        img: '.module-item-pic&&img&&data-src',
        desc: '.video-info-items:eq(0)&&Text;.video-info-items:eq(1)&&Text;.video-info-items:eq(2)&&Text;.video-info-items:eq(3)&&Text',
        content: '.vod_content&&Text',
        tabs: '.module-tab-item',
        tab_text: 'div--small&&Text',
        lists: '.module-player-list:eq(#id)&&.scroll-content&&a',
    },
    搜索: '.module-items .module-search-item;a&&title;img&&data-src;.video-serial&&Text;a&&href',
}