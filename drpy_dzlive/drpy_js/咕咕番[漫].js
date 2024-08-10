var rule = {
    title: '咕咕番[漫]',
    host: 'https://www.gugufan.com',
    url: '/index.php/api/vod',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    headers: {
        'User-Agent': 'PC_UA',
    },
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_name: '连载日漫&完结日漫&剧场&特摄',
    class_url: '6&7&21&23',
    limit: 6,
    double: false,
    play_parse: true,
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        if (url) {
            input = {parse: 0, url: url, header: rule.headers}
        }
    }),
    一级: $js.toString(() => {
        // eval(getCryptoJS);
        let t = Math.floor(Date.now() / 1000);
        let key = CryptoJS.MD5('DS' + t + 'DCC147D11943AF75').toString();
        let type = MY_CATE;
        let pg = MY_PAGE;
        let data = {
            'type': type,
            'class': '',
            'area': '',
            'lang': '',
            'version': '',
            'state': '',
            'letter': '',
            'page': pg,
            'time': t,
            'key': key
        };
        let list = JSON.parse(post(input, {body: data})).list;
        let d = [];
        list.forEach(it => {
            let url = 'https://www.gugufan.com/index.php/vod/detail/id/' + it.vod_id + '.html';
            d.push({
                title: it.vod_name,
                desc: it.vod_remarks,
                img: it.vod_pic,
                url: url
            });
        });
        setResult(d);
    }),
    二级: {
        title: 'h3&&Text',
        img: '.detail-pic&&img&&data-src',
        content: '#height_limit&&Text',
        tabs: '.anthology-tab a',
        lists: '.anthology-list:eq(#id)&&a',
    },
    搜索: '.row-right&&.public-list-box;img&&alt;img&&data-src; span&&Text;a&&href'
}