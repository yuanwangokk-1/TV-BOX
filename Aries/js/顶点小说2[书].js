/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '顶点小说2[书]',
  '类型': '小说',
  lang: 'ds'
})
*/

var rule = {
    类型: '小说',//影视|听书|漫画|小说
    title: '顶点小说2[书]',
    host: 'https://www.ddyueshu.cc/',
    编码: 'gb18030',
    url: '/fyclass/#fypage',

    searchUrl: '/xiaoshuodaquan/#key=',
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
    class_parse: '.nav&&ul&&li;a&&Text;a&&href;.*/(.*?)/',
    cate_exclude: '书架|排行',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let title = pdfh(html, '.bookname&&h1&&Text');
        let content = pdfh(html, '#content&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0, -2).join("\n").replace(/&nbsp;/g, ' ');
        let ret = JSON.stringify({
            title,
            content
        });
        input = {parse: 0, url: 'novel://' + ret, js: ''};
    }),
    double: false,
    推荐: '#newscontent&&ul&&li;.s2&&Text;;.s5&&Text;a&&href',
    一级: $js.toString(() => {
        let d = [];
        if (MY_CATE == '0') {
            input = urljoin(rule.host, '/quanben/' + MY_PAGE);
            let html = request(input);
            let lis = pdfa(html, 'table.grid&&tr:gt(0)');
            lis.forEach(it => {
                d.push({
                    title: pdfh(it, 'a&&Text'),
                    desc: pdfh(it, 'a:eq(1)&&Text'),
                    img: "",
                    url: pd(it, 'a&&href', MY_URL),
                });
            });
        } else {
            let html = request(input.split('#')[0]);
            let lis = pdfa(html, '.up&&ul&&li');
            lis.forEach(it => {
                d.push({
                    title: pdfh(it, '.s2&&Text'),
                    desc: pdfh(it, '.s4&&Text'),
                    img: "",
                    url: pd(it, 'a&&href', MY_URL),
                });
            });
        }
        setResult(d);
    }),
    二级: {
        title: 'h1&&Text',
        img: '#fmimg&&img&&src',
        desc: '#info&&p:eq(-1)&&Text',
        content: '#intro&&p&&Text',
        tabs: '#list&&dt&&b',
        lists: '#list&&dd',
        tab_text: 'b&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: $js.toString(() => {
        let html = request(input.split('#')[0]);
        let key = decodeStr(KEY, rule.编码);
        //log(key);
        let lis = pdfa(html, '.novellist&&ul&&li').filter(it => it.includes(key));
        let d = [];
        lis.forEach(it => {
            d.push({
                title: pdfh(it, 'a&&Text'),
                desc: "",
                img: "",
                url: pd(it, 'a&&href', MY_URL),
            })
        });
        setResult(d);
    }),
}