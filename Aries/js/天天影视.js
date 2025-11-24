/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '天天影视',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',
    title: '天天影视',
    host: 'https://m.rvm2.com',
    url: '/ttgd/fyclass--------fypage---.html',
    searchUrl: '/ttsearch/**----------fypage---.html',
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
    class_parse: '.hom_mob_list li;a&&Text;a&&href;.*/(.*?).html',
    cate_exclude: '',
    play_parse: true,
    lazy: "js:input = {parse: 1, url: input, js: ''}",
    double: true,
    推荐: '.vod_row .pannel;.vodlist_wi li;a&&title;a&&data-original;.pic_text&&Text;a&&href',
    一级: '.vodlist_wi li;a&&title;a&&data-original;.pic_text&&Text;a&&href;.vodlist_sub&&Text',
    二级: {
        title: 'h2&&Text',
        img: '.lazyload&&data-original',
        desc: '.pic_text&&Text;.content_min li&&target&&Text;.hidden_xs&&Text',
        content: '.content_desc',
        tabs: '.play_source_tab a',
        lists: '.content_playlist:eq(#id)&&a',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '.vodlist li;h4&&Text;.lazyload&&data-original;.pic_text&&Text;a&&href;.content_desc',
}