var rule = {
    模板: '自动',
    模板修改: $js.toString(() => {
        muban.自动.二级.tabs = '.module-tab-item.tab-item';
        muban.自动.二级.tab_text = 'div--small&&Text';
    }),
    title: '三集电影[自动]',
    host: 'https://www.3jdy.com',
    url: '/index.php/vod/type/id/fyclass.html',
    class_parse: '.navbar-items li:gt(1):lt(8);a&&Text;a&&href;/(\\d+).html',
    searchUrl: '/index.php/rss/index.xml?wd=**',
    搜索: $js.toString(() => {
        let html = request(input);
        let items = pdfa(html, 'rss&&item');
        // log(items);
        let d = [];
        items.forEach(it => {
            it = it.replace(/title|link|author|pubdate|description/g, 'p');
            let url = pdfh(it, 'p:eq(1)&&Text');
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