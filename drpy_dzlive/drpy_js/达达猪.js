Object.assign(muban.mxpro.二级, {
    tab_text: 'div--small&&Text',
});
var rule = {
    模板: 'mxpro',
    title: '达达猪',
    host: ' https://www.dadazhu.me',
    url: '/vodtype/fyclass',
    class_parse: '.navbar-items&&li;a&&Text;a&&href;.*/(.*?).html',
    cate_exclude: '更新|热榜',
    lazy: $js.toString(() => {
        input = {
            parse: 1,
            url: input,
            js: 'document.querySelector("#playleft iframe").contentWindow.document.querySelector("#start").click()',
        }
    }),
    searchUrl: '/rss.xml?wd=**',
    搜索: $js.toString(() => {
        let html = post(input.split('?')[0], {body: input.split('?')[1]});
        let items = pdfa(html, 'rss&&item');
        // log(items);
        let d = [];
        items.forEach(it => {
            it = it.replace(/title|link|author|pubdate|description/g, 'p');
            let url = pdfh(it, 'p:eq(1)&&Text');
            url = url.replace(/cc/g, 'me');
            d.push({
                title: pdfh(it, 'p&&Text'),
                url: url,
                desc: pdfh(it, 'p:eq(3)&&Text'),
                content: pdfh(it, 'p:eq(2)&&Text'),
                pic_url: "",
            });
        });
        setResult(d);
    }),
}