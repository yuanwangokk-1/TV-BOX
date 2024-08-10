var rule = {
    模板: '自动',
    模板修改: $js.toString(() => {
        muban.自动.二级.tabs = '.module-tab-item.tab-item';
        muban.自动.二级.img = '.lazyload&&src';
        muban.自动.二级.tab_text = 'div--small&&Text';
    }),
    title: '奈飞中文[自动]',
    host: 'https://www.naifei.io',
    url: '/vodshow/id/fyclass/page/fypage.html',
    class_parse: '.nav&&ul&&li;a&&Text;a&&href;.*/(.*?).html',
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
                content: pdfh(it, 'p:eq(4)&&Text'),
                pic_url: "",
            });
        });
        setResult(d);
    }),
}