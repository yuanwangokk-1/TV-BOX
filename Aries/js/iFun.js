/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: 'iFun',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: 'iFun',
    host: 'https://ifun.cc/',
    url: '/list/fyclass/?page=fypage',
    searchUrl: '/search?key=**',
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
    class_parse: 'ul.cat-menu&&li;a&&Text;a&&href;list/(.*?)/',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: true,
    推荐: '.videos;div.item;*;*;*;*',
    一级: '.videos&&a.item;.title&&Text;img&&src;.rt&&Text;a&&href',
    二级: {
        title: 'h1&&Text',
        img: 'img&&src',
        desc: '.updated&&Text',
        content: '.intro&&.inner&&p:eq(-1)&&Text',
        tabs: $js.toString(() => {
            TABS = ['播放'];
        }),
        lists: '.episode-list&&li',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '.videos&&div.item;*;*;div.vs&&Text;*',
}