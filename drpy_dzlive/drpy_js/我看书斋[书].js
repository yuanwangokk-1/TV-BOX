var rule = {
    类型: '小说',//影视|听书|漫画|小说
    title: '我看书斋[书]',
    host: 'https://www.5ccc.net/',
    url: '/class/fyclass_fypage.html',
    searchUrl: '/search/**',
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
    class_parse: '.nav-menu-items&&li;a&&Text;a&&href;class/(.*?)\.html',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let title = pdfh(html, 'h1&&Text').split('(')[0].trim();
        // let content = pdfh(html, '#chaptercontent&&Html').replace(/<br>/g, '\n').replace(/\n\n/g, '\n');
        let content = pdfh(html, '#chaptercontent&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0).join("\n");

        let nextUrl = pd(html, '.bottem1&&a:contains(下一页)&&href', MY_URL);
        //log(nextUrl);
        if (nextUrl && nextUrl != MY_URL) {
            let nextHtml = request(nextUrl);
            let nextContent = pdfh(nextHtml, '#chaptercontent&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0).join("\n");
            content += nextContent;
        }
        let ret = JSON.stringify({
            title,
            content
        });
        input = {parse: 0, url: 'novel://' + ret, js: ''};
    }),
    double: true,
    推荐: '.content&&div.module;div.module-item;*;*;*;*;*',
    一级: '.module-list:eq(-1)&&div.module-item;a&&title;img&&data-original;.module-item-caption&&Text;a&&href;.book-text&&Text',
    二级: {
        title: 'h1&&Text;.book-tag-icon&&Text',
        img: 'img.lazyload&&src',
        desc: '.book-info-item&&Text',
        content: '.vod_content&&Text',
        tabs: 'h1',
        lists: '#chapterlist&&a',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '.module-list&&div.module-search-item;h3&&Text;*;.book-info-actor&&a&&Text;*;*',
}