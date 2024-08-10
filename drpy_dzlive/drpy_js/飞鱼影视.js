Object.assign(muban.mx.二级, {
    重定向: $js.toString(() => {
        log('执行重定向:' + MY_URL);
        // let html = request(MY_URL);
        MY_URL = pd(html, '.playbtn&&a&&href', MY_URL);
        log('二级重定向到:' + MY_URL);
        html = request(MY_URL);
    }),
});
var rule = {
    模板: 'mx',
    title: '飞鱼影视',
    host: 'https://www.kufeiyu.com',
    class_parse: '.top_nav li;a&&Text;a&&href;/(\\d+).html',
    url: '/list/fyclass-fypage.html',
}