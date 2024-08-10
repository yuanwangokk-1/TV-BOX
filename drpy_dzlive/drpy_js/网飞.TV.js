muban.mxpro.二级.desc = '.module-info-item:eq(-1)&&Text;;;.module-info-item-content:eq(2)&&Text;.module-info-item-content:eq(1)&&Text'
muban.mxpro.二级.tabs = '#y-playList&&.tab-item'
muban.mxpro.二级.tab_text = 'body--small&&Text'
var rule = {
    title: '网飞.TV',
    模板: 'mxpro',
    host: 'https://www.wangfei.tv',
    // url:'/vodshow/id/fyclass/page/fypage.html',
    url: '/vodshow/id/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by or "/by/time"}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    filter: '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',
    filter_def: {
        dy: {cateId: 'dy'},
        juji: {cateId: 'juji'},
        zongyi: {cateId: 'zongyi'},
        dongman: {cateId: 'dongman'},
        jilupian: {cateId: 'jilupian'},
        dyjs: {cateId: 'dyjs'}
    },
    searchUrl: '/index.php/rss.xml?wd=**',
    class_parse: '.navbar-items li:gt(1):lt(8);a&&title;a&&href;.*/(.*?).html',
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/\.m3u8|\.mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        }
    }),
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