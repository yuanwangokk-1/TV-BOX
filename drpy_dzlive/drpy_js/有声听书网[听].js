var rule = {
    类型: '听书',//影视|听书|漫画|小说
    title: '有声听书网[听]',
    host: 'https://www.ysts.cc/',
    url: '/book/fyclass/lastupdate/fypage.html',
    searchUrl: '/search.html?searchtype=name&searchword=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'PC_UA',
    },
    timeout: 5000,
    class_parse: '.nav-ol li;a&&Text;a&&href;.*/(.*?)\/lastupdate',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: true,
    //推荐:'列表1;列表2;标题;图片;描述;链接;详情',
    一级: '.list-works li;a&&title;img&&data-original;span&&Text;a&&href;dd&&Text',
    二级: {
        title: '.content&&a&&title;.content&&a:eq(1)&&Text',
        img: '.content&&img&&data-original',
        desc: '主要信息;.content&&dd:eq(3)&&Text;地区;.content&&dd:eq(4)&&Text;导演',
        content: '.content&&.book-des&&Text',
        tabs: '.playlist-top&&h2',
        //tabs: '.chapter-list-block&&li',
        // 列表有分页，暂时解决不了。这种老6网站
        lists: '.playlist&&li',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },

    搜索: '.list-works li;*;*;*;*;详情',
}