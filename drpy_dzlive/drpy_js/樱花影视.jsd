var rule = {
    title: '樱花影视',
    host: 'https://www.mayadc.com',
    url: '/vodlist/fyclass_____addtime_fypage.html',
    searchUrl: '/search/**-.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'PC_UA',
    },
    class_parse: 'nav.nav li:gt(0):lt(4);a&&Text;a&&href;.*/(.*)/',
    play_parse: true,
    tab_remove: ['优酷视频', '腾讯视频'],
    lazy: $js.toString(() => {
        var url = JSON.parse(request(input).match(/_player = (.*?);</)[1]).url;
        //console.log(url);
        if (/\.m3u8/.test(url)) {
            let m3u8 = request(url);
            //log('m3u8处理前:' + m3u8);
            m3u8 = m3u8.trim().split('\n').map(it => it.startsWith('#') ? it : urljoin(url, it)).join('\n');
            //log('m3u8处理后:============:' + m3u8);
            // 获取嵌套m3u8地址
            let last_url = m3u8.split('\n').slice(-1)[0];
            if (last_url.includes('.m3u8') && last_url !== url) {
                input = {
                    jx: 0,
                    url: last_url,
                    parse: 0
                }
            } else {
                input = {
                    jx: 0,
                    url: last_url,
                    parse: 0
                }
            }
        } else {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        }
    }),
    limit: 6,
    推荐: 'div.layout-box;li.w8;h3&&Text;.vod-image img&&src;.sname&&Text;a&&href',
    double: true,
    一级: '.video-list .w8;h3&&Text;a&&data-original;.sname&&Text;a&&href',
    二级: {
        title: 'h1&&Text;.vod-seat ul a:eq(0)&&Text',
        img: '.lazyload&&data-original',
        desc: '.txt-hid&&Text;.vod-info p:eq(8)&&Text;.vod-info p:eq(6)&&Text;;.vod-info p:eq(3)&&Text',
        content: '.vod-info p:eq(1)&&Text',
        tabs: 'ul#Tab.vod-player li',
        lists: '.fade-in:eq(#id) li',
    },
    搜索: '.search-vod-list .w100;.lazyload&&title;.lazyload&&data-original;.txt-hidden&&Text;a&&href;.search-infos&&Text',
}