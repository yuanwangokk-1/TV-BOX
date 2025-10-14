var rule = {
    title: 'script直播[飞]',
    host: 'https://zh.superchat.live',
    url: '/girls/fyclass#fypage',
    searchUrl: '',
    searchable: 0,
    quickSearch: 0,
    filterable: 0,
    headers: {
        "User-Agent": "okhttp/3.11.0"
    },
    class_name: 'live',
    class_url: 'chinese',
    play_parse: true,
    lazy: `$js.toString(() => {
        if (/\.(m3u8|mp4)/.test(input)) {
            input = {parse: 0, url: input}
        } else {
            if (rule.parse_url.startsWith('json:')) {
                let purl = rule.parse_url.replace('json:', '') + input;
                let html = request(purl);
                input = {parse: 0, url: JSON.parse(html).url}
            } else {
                input = rule.parse_url + input;
            }
        }
    })`,
    limit: 6,
    推荐: '',
    double: true,
    //一级: '.models-list-container&&.model-list-item;img&&alt;img&&src;;a&&href',
    一级: `$js.toString(() => {
        let html = request('https://zh.stripchatgirls.com/api/front/v2/models?limit=20&topLimit=2000&favoritesLimit=12&primaryTag=girls');
        let d = [];
        let blocks = JSON.parse(html).blocks;
        if (MY_PAGE <= blocks.length) {
            let list = JSON.parse(html).blocks[MY_PAGE].models;
            //log('长度'+blocks.length)
            for (let i in list) {
                d.push({
                    title: list[i].username,
                    img: list[i].previewUrlThumbBig,
                    url: 'https://b-hls-14.doppiocdn.net/hls/' + list[i].id + '/' + list[i].id + '.m3u8' + '##' + list[i].previewUrlThumbBig + '##' + list[i].username,
                });
            }
        }
        setResult(d)
    })`,
    二级: `$js.toString(() => {
        // log(MY_URL)
        let urls = [];
        let URL = MY_URL.split('##')[0];
        let PIC = MY_URL.split('##')[1];
        let Name = MY_URL.split('##')[2];
        let url = URL.split('.m3u8')[0];
        let list1 = ['原画', '720p', '480p', '240p'];
        let list = [URL, url + '_720p.m3u8', url + '_480p.m3u8', url + '_240p.m3u8'];
        list.forEach((it, index) => {
            urls.push(list1[index] + '$' + it);
        });
        //log(urls)
        VOD = {
            vod_content: URL,
            vod_name: Name,
            type_name: Name,
            vod_pic: PIC,
            vod_play_from: '直播源↓',
            //vod_play_url: '点击播放$' + MY_URL,
            vod_play_url: urls.join('#')
        };
    })`,
    搜索: '*',
}
