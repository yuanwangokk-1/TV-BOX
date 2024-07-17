var rule = {
    类型: '漫画',//影视|听书|漫画|小说
    title: '古风漫画',
    host: 'https://www.gufengmh9.com/',
    //host:'https://www.gufengmh.com/',
    url: '/list/fyclass/fypage/',
    searchUrl: '/search/?keywords=**&page=fypage',
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
    class_parse: '.filter-nav&&ul&&li;a&&Text;a&&href;.*/(.*?)/',
    cate_exclude: '全部',
    play_parse: true,
    lazy: $js.toString(() => {
        //log(input);
        let html = request(input);
        let scripts = pdfa(html, 'script');
        //log(scripts);
        let scode = scripts.filter(it => it.includes('var chapterImages'))[0];
        scode = pdfh(scode, 'script&&Html');
        //log(scode);
        let cpath = scode.match(/var chapterPath =.*?"(.*?)"/)[1];
        //log(cpath);
        let pgpath = scode.match(/var pageImage =.*?"(.*?)"/)[1];
        //log(pgpath);
        let img_str = scode.match(/chapterImages = (.*?);/)[1];
        // https://res.xiaoqinre.com/images/comic/1366/2730910/1702075658iUtiEMC70Hu8l1AE.jpg
        //log(img_str);
        let img_prefix = getHome(pgpath) + '/' + cpath;
        log(img_prefix);
        let imgs = eval(img_str);
        //log(imgs);
        imgs = imgs.map(it => img_prefix + it);
        //log(imgs);
        input = {url: 'pics://' + imgs.join('&&')};
    }),
    double: false,
    推荐: '.cover-list li;*;*;*;*;*',
    一级: '#w1&&.book-list&&li;a&&title;img&&src;.tt&&Text;a&&href;.updateon&&Text',
    二级: {
        title: 'h1&&Text',
        img: 'img.pic&&src',
        desc: '.detail-list&&.sj&&Text',
        content: '#intro-cut&&p&&Text',
        tabs: '.caption&&span',
        lists: '.chapter-body&&ul&&li',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '#w0&&.book-list&&li;*;*;*;*;*',
}