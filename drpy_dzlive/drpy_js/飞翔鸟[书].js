var rule = {
    类型: '小说',//影视|听书|漫画|小说
    title: '飞翔鸟[书]',
    host: 'https://www.fxnzw.com/',
    url: '/fxnlist/fyclass_fypage.html',

    searchUrl: '/fxnlist/**_fypage.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    hikerListCol: "text_1",
    hikerClassListCol: "text_1",
    //class_name: '全本',
    //class_url: '0',
    class_parse: '.nav&&ul&&li;a&&Text;a&&href;.*/(.*?)\.html',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let title = pdfh(html, 'h1&&Text');
        let content = pdfh(html, '#content&&div:eq(-2)&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0).join("\n").replace(/&nbsp;/g, ' ').split('请记住:飞翔鸟中文小说网')[0];
        let ret = JSON.stringify({
            title,
            content
        });
        input = {parse: 0, url: 'novel://' + ret, js: ''};
    }),
    double: false,
    推荐: '',
    一级: '#CrListText;a&&Text;;a:eq(1)&&Text;a&&href',
    二级: {
        重定向: $js.toString(() => {
            log('执行重定向:' + MY_URL);
            // let html = request(MY_URL);
            MY_URL = pd(html, 'li.as&&a&&href', MY_URL);
            log('二级重定向到:' + MY_URL);
            html = request(MY_URL);
        }),
        title: 'h2&&Text',
        img: '#Lab_BookImg&&img&&src',
        desc: '#zhangx&&Text',
        content: '#CommentText&&Text',
        tabs: '#NclassTitle',
        lists: '#BookText&&ul&&li:not(:contains(中文阅读))',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '*',
}