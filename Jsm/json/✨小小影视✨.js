var rule = {
    title: '小小影视',
    host: 'https://www.syszs.com',
    url: '/list/fyclass______fypage.html',
    homeUrl: '/',
    searchUrl: '/',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; M2102J2SC Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/141.0.7390.17 Mobile Safari/537.36',
    },
    class_parse: '.swiper-wrapper.clearfix li:gt(0):lt(6);a&&Text;a&&href;.*/(.*?).html',
    play_parse: true,
    lazy: $js.toString(() => {
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
        } else {
            input
        };
    }),
    limit: 30,
    推荐: '*',
    double: true,
    一级: '.img-list.clearfix li;a&&title;img&&data-original||src;.vod-lianzai&&Text;a&&href',
    二级: $js.toString(() => {
        let html = request(input);
        VOD = {};
        VOD.vod_id = input;
        VOD.vod_name = pdfh(html, 'h1&&Text');
        VOD.vod_pic = pd(html, 'img&&data-original||src', input);
        let type_name = pdfa(html, '.vod-micd a');
        VOD.type_name = type_name.map(it => pdfh(it, 'a&&Text')).join(' ');
        VOD.vod_area = pdfh(html, '.vod-area&&Text');
        VOD.vod_year = pdfh(html, '.vod-year&&Text');
        VOD.vod_remarks = pdfh(html, 'li:contains(更新时间)&&Text').replace('更新时间：', '');
        VOD.vod_lang = pdfh(html, 'p:contains(语言)&&Text').replace('语言：', '');
        VOD.vod_director = pdfh(html, 'li:contains(导演)&&Text').replace('导演：', '');
        let vod_actor = pdfa(html, 'li:contains(主演) a');
        VOD.vod_actor = vod_actor.map(it => pdfh(it, 'a&&Text')).join(' ');
        VOD.vod_content = '啦啦啦祝您观影愉快！现为您介绍剧情:\n' + pdfh(html, '.info-box.clearfix:contains(剧情介绍)&&Text').replace('剧情介绍', '');
        let r_ktabs = pdfa(html, '.playbtn a');
        let ktabs = r_ktabs.map(it => pdfh(it, 'a&&Text'));
        VOD.vod_play_from = ktabs.join('$$$');

        let klists = [];
        let r_plists = pdfa(html, '.tool-play-list .play-list');
        r_plists.forEach((rp) => {
            let klist = pdfa(rp, 'a').map((it) => {
                return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input);
            });
            klist = klist.join('#');
            klists.push(klist);
        });
        VOD.vod_play_url = klists.join('$$$')
    }),
    搜索: $js.toString(() => {
        let [kwd, kpage] = KEY.split('@');
        kpage = kpage ? parseInt(kpage) : 1;
        let kcate = ['dianshiju', 'dianying', 'dongman', 'zongyi', 'duanju'];
        let kvods = [];
        let kpg, surl, klists;
        for (let i = 0; i < kcate.length; i++) {
            for (let j = kpage; j < (kpage + 5); j++) {
                kpg = (j == 1) ? '' : j.toString();
                surl = `${HOST}/list/${kcate[i]}______${kpg}.html`;
                klists = pdfa(fetch(surl), '.img-list.clearfix li').filter((item) => {
                    return pdfh(item, 'a&&title').includes(`${kwd}`)
                });
                klists.map((it) => {
                    kvods.push({
                        vod_name: pdfh(it, 'a&&title'),
                        vod_pic: pdfh(it, 'img&&data-original||src'),
                        vod_remarks: pdfh(it, '.vod-lianzai&&Text'),
                        vod_id: pdfh(it, 'a&&href')
                    })
                })
            }
        };
        VODS = kvods
    }),
}