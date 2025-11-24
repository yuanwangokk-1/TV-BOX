/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '时光影院',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: '时光影院',
    host: 'https://www.time-chicken.com',
    url: '/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/vod/search/page/fypage/wd/**.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_parse: '.nav-menu-items&&li;a&&Text;a&&href;.*/(.*?).html',
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '.module-list;.module-items&&.module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    double: true,
    一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    二级: {
        title: 'h1&&Text;.tag-link&&Text',
        img: '.module-item-pic&&img&&data-src',
        desc: '.video-info-items:eq(0)&&Text;.video-info-items:eq(1)&&Text;.video-info-items:eq(2)&&Text;.video-info-items:eq(3)&&Text',
        content: '.vod_content&&Text',
        tabs: '.module-tab-item--small',
        lists: '.module-player-list:eq(#id)&&.scroll-content&&a',
    },
    搜索: '.module-items .module-search-item;h3&&Text;img&&data-src;.video-serial&&Text;a&&href',
}