var rule = {
            title: '爱看hd',
            host: 'https://www.aikanhd.vip',
            url: '/vodshow/fyclass--------fypage---/',
            searchUrl: '/rss.xml?wd=**',
            searchable: 2,
            quickSearch: 0,
            filterable: 0,
            filter: '',
            filter_url: '',
            filter_def: {},
            headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            },
            timeout: 5000,
            class_parse: 'ul.top-bar-menu&&li;a&&Text;a&&href;.*/(\\d+)/',
            cate_exclude: '爱看动漫公告|伦理剧',
            play_parse: true,
            lazy: `js:input = {parse: 1, url: input, js: ''}`,
            double: true,
            推荐: '*',
            一级: 'body&&.video-content-item;.text-overflow&&Text;.lazyload&&data-original;.video-title&&Text;a&&href;.text-muted&&Text',
            二级: {
                title: 'h1&&Text;.ewave-collapse-item&&li&&Text',
                img: '.lazyload&&data-original',
                desc: '.ewave-collapse-item&&li:eq(1)&&Text;.row:eq(2)&&li:eq(1)&&Text;.row:eq(2)&&li&&Text;.detail-info-text&&p&&Text;.ewave-collapse-item&&p&&Text',
                content: '.mb-0:eq(-1)&&Text',
                tabs: '.ewave-playlist-tab a',
                lists: '.ewave-playlist-content:eq(#id)&&li',
            },
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