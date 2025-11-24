/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '丫丫电子书[书]',
  '类型': '小说',
  lang: 'dr2'
})
*/

var rule = {
    类型: '小说',//影视|听书|漫画|小说
    title: '丫丫电子书[书]',
    host: 'http://www.shuyy8.cc/',
    url: '/fyclass/list_update_fypage.html',
    searchUrl: '/all/#key=**',
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
    class_parse: '#nav a;a&&Text;a&&href;.*/(.*?)/',
    cate_exclude: '全部小说',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let title = pdfh(html, 'h1&&Text');
        let content = pdfh(html, '#content--.readbutton&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0).join("\n").replace(/&nbsp;/g, ' ').split('<div')[0];
        let ret = JSON.stringify({
            title,
            content
        });
        input = {parse: 0, url: 'novel://' + ret, js: ''};
    }),
    double: false,
    推荐: '*',
    一级: '.listconl&&ul&&li;a&&Text;;span:eq(-1)&&Text;a&&href;a:eq(1)&&Text',
    二级: {
        重定向: $js.toString(() => {
            log('执行重定向:' + MY_URL);
            // let html = request(MY_URL);
            MY_URL = pd(html, 'a.diralinks&&href', MY_URL);
            log('二级重定向到:' + MY_URL);
            html = request(MY_URL);
        }),
        title: 'h1&&Text',
        img: 'img&&src',
        desc: '.lastrecord&&Text',
        content: '.r_cons&&Text',
        tabs: '.dirtitone&&h2',
        lists: 'ul&&li',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: $js.toString(() => {
        let html = request(input.split('#')[0]);
        let lis = pdfa(html, '.aubook2&&h4').filter(it => it.includes(KEY));
        let d = [];
        lis.forEach(it => {
            d.push({
                title: pdfh(it, 'a&&Text'),
                desc: pdfh(it, 'h4--a&&Text'),
                img: "",
                url: pd(it, 'a&&href', MY_URL),
            })
        });
        setResult(d);
    }),
}