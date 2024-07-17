Object.assign(muban.首图2.二级, {
    tabs: '.stui-pannel_hd h3',
});

var rule = {
    模板: '首图2',
    title: '星辰影视',
    host: 'https://www.luanren.cc',
    url: '/vodtype/fyclass-fypage.html',
    cate_exclude: '明星|体育',
    searchUrl: '/vodsearch/**----------fypage---.html',
    headers: {
        'User-Agent': 'PC_UA',
    },
    lazy: $js.toString(() => {
        input = {
            parse: 1,
            url: input,
            header: rule.headers,
            parse_extra: '&is_pc=1'
        }
    }),
}