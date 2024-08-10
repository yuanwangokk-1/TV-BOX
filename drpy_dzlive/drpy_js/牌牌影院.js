var rule = {
    模板: '短视2',
    title: '牌牌影院',
    host: "https://paipaiyy.com",
    class_name: "电影&电视剧&综艺&动漫&短剧",
    class_url: "1&2&3&4&5",
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    url: '/index.php/api/vod#type=fyclassfyfilter&page=fypage',
    detailUrl: '/voddetail/fyid.html',
    play_parse: true,
    limit: 6,
    推荐: 'body&&.public-list-box;a&&title;.lazy&&data-original;.public-list-prb&&Text;a&&href',
    二级: {
        title: '.slide-info-title&&Text;.slide-info:eq(3)--strong&&Text',
        img: '.detail-pic&&data-original',
        desc: '.fraction&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(2)--strong&&Text;.slide-info:eq(1)--strong&&Text',
        content: '#height_limit&&Text',
        tabs: '.anthology.wow.fadeInUp.animated&&.swiper-wrapper&&a',
        tab_text: '.swiper-slide--i--span&&Text',
        lists: '.anthology-list-box:eq(#id) li',
    },
    搜索: '.search-box;.thumb-txt&&Text;.lazy&&data-original;.public-list-prb&&Text;a&&href;.thumb-blurb&&Text',
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/\.m3u8/.test(url)) {
            let body = request(url);
            let lines = body.split('\n');
            let m3u8Url = null;
            for (let line of lines) {
                line = line.trim();
                if (line.endsWith('.m3u8')) {
                    m3u8Url = urljoin(url, line);
                    console.log(m3u8Url);
                    break;
                }
            }
            input = {
                jx: 0,
                url: m3u8Url || url,
                parse: 0
            };
        } else {
            input = {
                jx: tellIsJx(url),
                url: url,
                parse: 0
            };
        }
    }),
}