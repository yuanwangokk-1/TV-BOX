var rule = {
    title: '小女18[密]',
    host: 'https://xnm18ujjxa.buzz',
    url: '/type/id/fyclass/fypage.html',
    searchUrl: '/hunt/**/h/fypage.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'PC_UA',
    },
    class_parse: '.infoShow a;a&&Text;a&&href;.*/(.*?).html',
    play_parse: true,
    lazy: $js.toString(() => {
    var url = request(input).split("var playUrl = '")[1].split("'")[0]
        input = {
parse: 0, 
url: url,
 js: ''
 };
    }),
    limit: 6,
    推荐: 'ul.stui-vodlist.clearfix;li;h4&&Text;img&&src;.pic-text&&Text;a&&href',
    double: true,
    一级: '.stui-vodlist li;h4&&Text;img&&src;.pic-text&&Text;a&&href',
    二级: {
        title: '.stui-content__detail .title&&Text',
        img: 'img&&src',
        content: '.detail&&Text',
        tabs: '',
        lists: '.stui-content__playlist:eq(#id)&&a',
        tab_text: 'Text',
        list_text: 'Text',
        list_url: 'a&&href',
    },
    搜索: '.stui-vodlist li;*;*;*;a&&href;.text-muted:eq(-1)&&Text',
}