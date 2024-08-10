var rule = {
    模板: '首图2',
    title: '最新4K',
    host: 'https://www.1080.ee',
    url: '/vodtype/fyclass-fypage.html',
    searchUrl: '/vodsearch/**----------fypage---.html',
    cate_exclude: '专题',
    搜索: 'ul.stui-vodlist__media,ul.stui-vodlist,#searchList li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
    lazy: $js.toString(() => {
        let html = request(input);
        html = JSON.parse(html.match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        // log('url:'+url);
        let config = {};
        let jscode = request(HOST + '/static/js/playerconfig.js');
        // log('jscode:'+jscode);
        eval(jscode + '\nconfig=MacPlayerConfig;');
        let jx = config.player_list[html.from].parse;
        if (jx == '') {
            jx = config.parse
        }
        jx = jx.replace('///', '//');
        log('jx:' + jx);
        let p = 'url=' + url;
        let video = JSON.parse(request(jx.replace('?url=', 'API.php'), {
            headers: {
                'Referer': HOST
            },
            body: p,
            method: 'POST'
        })).url;
        log(video);
        if (video) {
            input = {
                jx: 0,
                url: video,
                parse: 0
            }
        }
    }),
}
