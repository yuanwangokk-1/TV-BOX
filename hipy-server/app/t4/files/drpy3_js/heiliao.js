var rule = {
    title: '黑料网',
    host: 'https://9kl.iemixovyt.com',
    url: '/category/fyclass/fypage.html[/category/fyclass.html]',
    searchUrl: '/search/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_name: '今日黑料&热点吃瓜&独家爆料&经典大瓜&黑料历史&明星网红&反差女友&原创社区&校园政坛&性爱课堂&奇闻逸事&禁播影视',
    class_url: '6&7&9&8&10&1&4&13&2&12&3&14',
    play_parse: true,
    tab_rename: {'道长在线': '在线播放'},
    lazy: '',
    推荐: '',
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let list = pdfa(html, '.video-list&&.video-item');
        list.forEach(it => {
            let title = pdfh(it, '.title&&Text');
            let img = pdfh(it, '.placeholder-img&&img&&onload');
            if (img) {
                img = img.match(/'(.*?)'/)[1]
            }
            if (title != '') {
                d.push({
                    url: pd(it, '.cursor-pointer&&href', MY_URL),
                    title: title,
                    content: title,
                    img: getProxyUrl() + '&url=' + img,
                    desc: '',
                });
            }
        });
        setResult(d);
    }),
    二级: '*',
    搜索: '*',
    proxy_rule: $js.toString(() => {
        log(input.url);
        if (input.url.includes('https://pic.eqiykt.cn')) {
            let content = request(input.url, {withHeaders: true, toBase64: true});
            log(content);
            input = [200, 'text/plain', content];
        } else {
            input = [403, 'text/plain', 'forbidden']
        }
    }),
}