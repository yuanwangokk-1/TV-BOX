Object.assign(muban.首图2.二级, {
    "tabs": ".nav-tabs&&li",
});
var rule = {
    模板: '首图2',
    title: '西瓜影院',
    host: 'https://www.xigua1100.com',
    url: '/show/fyclass--------fypage---.html',
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