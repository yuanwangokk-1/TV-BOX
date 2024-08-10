var rule = {
    类型: '小说',//影视|听书|漫画|小说
    title: '笔趣阁13[书]',
    host: 'https://m.13bqg.cc',
    url: '/fyclass/fypage.html',
    searchUrl: '/user/hm.html?q=**',
    searchable: 0,
    quickSearch: 0,
    filterable: 0,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: 'div.nav&&ul&&li;a&&Text;a&&href;.*/(.*?)/',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let title = pdfh(html, 'title&&Text').split('_')[0];
        // let content = pdfh(html, '#chaptercontent&&Html').replace(/<br>/g, '\n').replace(/\n\n/g, '\n');
        let content = pdfh(html, '#chaptercontent&&Html').replace(/\n/g, "").split("<br>").filter(v => v).slice(0, -1).join("\n");
        let ret = JSON.stringify({
            title,
            content
        });
        input = {parse: 0, url: 'novel://' + ret, js: ''};
    }),
    double: true,
    // 推荐: '列表1;列表2;标题;图片;描述;链接;详情',
    一级: 'div.item;img&&alt;img&&src;span&&Text;a&&href',
    二级: {
        重定向: $js.toString(() => {
            log('执行重定向:' + MY_URL);
            // let html = request(MY_URL);
            MY_URL = pd(html, '.book_more&&a&&href', MY_URL);
            log('二级重定向到:' + MY_URL);
            html = request(MY_URL);
        }),
        title: '[property$=book_name]&&content',
        img: 'div.cover&&img&&src',
        desc: '主要信息;[property$=update_time]&&content;地区;演员;[property$=author]&&content',
        content: '[property$=description]&&content',
        tabs: '.title',
        lists: 'dl&&dd:gt(0)&&a',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
//   搜索:'列表;标题;图片;描述;链接;详情',
}