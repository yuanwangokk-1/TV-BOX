var rule = {
    title: '狗狗盘[搜]',
    host: 'https://gogopanso.com:3642',
    searchUrl: '/search?keyword=**&searchtype=movies&page=1&limit=10',
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
    // 一级: '',
    二级: '*',
    搜索: $js.toString(() => {
        var d = [];
        var list = JSON.parse(request(MY_URL)).data;
        //log(list)
        list.map(it => {
            d.push({
                title: it.name,
                desc: it.inputday + it.type,
                url: it.downurl
            });
        });
        setResult(d);
    }),
}