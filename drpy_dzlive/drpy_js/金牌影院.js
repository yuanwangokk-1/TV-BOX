var rule = {
    title: '金牌影院',
    host: 'https://www.cfkj86.com',
    url: '/vod/show/id/fyclass/page/fypage',
    searchUrl: '/api/mw-movie/anonymous/video/searchByWordPageable?keyword=**&pageNum=fypage&pageSize=12&type=false',
    headers: {
        'User-Agent': 'PC_UA',
        'Referer': 'https://www.cfkj86.com/'
    },
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_name: '电影&电视剧&综艺&动漫',
    class_url: '1&2&3&4',
    limit: 6,
    double: false,
    play_parse: true,
    lazy: $js.toString(() => {
        let url_id = input.split('/')[5];
        let jishu_id = input.split('/')[7];
        let t = new Date().getTime();
        eval(getCryptoJS);
        let signkey = 'id=' + url_id + '&nid=' + jishu_id + '&key=cb808529bae6b6be45ecfab29a4889bc&t=' + t;
        let key = CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString();
        let json_data = JSON.parse(request('https://www.cfkj86.com/api/mw-movie/anonymous/video/episode/url?id=' + url_id + '&nid=' + jishu_id, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                'deviceid': '58a80c52-138c-48fd-8edb-138fd74d12c8',
                'sign': key,
                't': t
            }
        }));
        let url = json_data.data;
        log(url);
        if (url) {
            input = {parse: 0, url: url, header: rule.headers};
        }

    }),
    图片替换: $js.toString(() => {
        // log(MY_URL);
        let src = decodeURIComponent(input).split(',')[0].split(' ')[0];
        input = urljoin(MY_URL, src) + '@Referer=https://www.cfkj86.com/';
    }),
    // double: false,
    // 推荐: '*',
    一级: '.movie-ul&&.kIDbTD;.title&&Text;.card-img&&img&&srcset;.info-tag&&Text;.kIDbTD a&&href',
    二级: {
        title: 'h1&&Text',
        img: 'img&&src',
        tabs: '.top a',
        lists: '.kmkeNw:eq(#id)&&a',
    },
    搜索: '*',
}