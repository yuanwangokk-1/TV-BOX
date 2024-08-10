var rule = {
    title: '影搜',
    host: 'https://yingso.fun',
    searchUrl: 'https://ys.api.yingso.fun/v3/ali/search',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'PC_UA',
    },
    timeout: 5000,
    play_parse: true,
    lazy: $js.toString(() => {
        let url = input.startsWith('push://') ? input : 'push://' + input;
        input = {parse: 0, url: url};
    }),
    一级: '',
    二级: '*',
    搜索: $js.toString(() => {
        let d = [];
        //log(KEY);
        let html = post(MY_URL, {
            body: {
                "pageNum": 1,
                "pageSize": 30,
                "title": KEY,
                "root": 0,
                "cat": "all"
            }
        });
        //log(html);
        var list = JSON.parse(html).data;
        //log(list);
        list.map(it => {
            let url = it.key
            if (url.length === 11) {
                let _img = 'https://3848.kstore.space/TVBox/tp/%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98.png';
                d.push({
                    title: it.title,
                    img: _img,
                    url: "https://www.aliyundrive.com/s/" + url + `@@${it.title}@@${_img}`,
                });
            }
        });
        setResult(d);
    }),
}