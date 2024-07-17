var rule = {
    title: '首发网',
    host: 'https://dumengys.com',
    url: '/list/?fyclass-fypage.html',
    //searchUrl:'/search.php?page=fypage&searchword=**&searchtype=',
    searchable: 0,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: '.menu&&dd;a&&Text;a&&href;.*?(\\d+)\.html',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: true,
    推荐: '.index-list;.row&&dl;*;*;*;*',
    一级: '.channel-list&&.row&&dl;h3&&Text;img&&src;i&&Text;a&&href',
    二级: {
        title: 'h3&&Text;p.data:eq(1)&&Text',
        img: '',
        desc: 'p.data&&Text',
        content: '.help&&Text',
        tabs: $js.toString(() => {
            TABS = ['道长在线'];
        }),
        lists: 'ul.detail-play-list&&li',
        tab_text: 'body&&Text',
        list_text: 'a&&Text',
        list_url: 'a&&href'
    },
    //搜索:'列表;标题;图片;描述;链接;详情',
}