var rule = {
    类型: '小说',//影视|听书|漫画|小说
    title: '笔趣阁[书]',
    host: 'https://www.bqka.cc',
    url: '/json?sortid=fyclass&page=fypage',
    class_name: '玄幻&武侠&都市&历史&网游&科幻&女生&完本',
    class_url: '1&2&3&4&5&6&7&0',
    searchUrl: '/user/search.html?q=**',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'PC_UA',
    },
    timeout: 5000,
    cate_exclude: '',
    play_parse: true,
    // 图片替换:$js.toString(() => {log(input);input = getProxyUrl()+ '&url='+input+'&type=img';}),
    lazy: $js.toString(() => {
        let html = request(input);
        let title = pdfh(html, '.content&&h1&&Text');
        // let content = pdfh(html, '#chaptercontent&&Html').replace(/<br>/g, '\n').replace(/\n\n/g, '\n');
        let content = pdfh(html, '#chaptercontent&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0, -2).join("\n");
        let ret = JSON.stringify({
            title,
            content
        });
        input = {parse: 0, url: 'novel://' + ret, js: ''};
    }),
    double: false,
    推荐: 'ul:gt(0)&&li;a&&Text;;span:eq(-1)&&Text;a&&href',
    一级: $js.toString(() => {
        //let cookie = getItem(RULE_CK, '');
        //let cookie = '';
        //let html = request(input,{headers:{Cookie:cookie}});
        let html = request(input);
        let json = JSON.parse(html);
        let d = [];
        json.forEach(it => {
            d.push({
                title: it.articlename,
                desc: it.author,
                img: it.url_img,
                url: it.url_list,
                content: it.intro,
            })
        });
        setResult(d);
    }),
    二级: {
        title: 'h1&&Text',
        img: '.cover&&img&&src',
        desc: 'span.last:eq(-1)&&Text;span.last&&Text;;;.small&&span&&Text',
        content: '.intro&&dd&&Text',
        tabs: '.rl',
        lists: '.listmain&&dd:not(.more)&&a',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: $js.toString(() => {
        //let cookie = getItem(RULE_CK, '');
        //log('储存的cookie:' + cookie);
        let cookie = '';
        if (!cookie) {
            let {cookie, html} = reqCookie('https://www.bqka.cc/user/hm.html?q=' + KEY, {}, true
            );
            log(cookie);
            //setItem(RULE_CK, cookie);
        }
        eval(rule.一级.replace('js:', ''));
    }),
}