/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '我播',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: 'mxone5',
    title: '我播',
    host: 'https://www.wobotv.cc/',
    class_parse: '.nav-menu-items&&li:lt(8);a&&Text;a&&href;type/(.*?)/',
    url: '/show/fyclass/page/fypage/',
    searchUrl: '/search/**--/page/fypage/',
    搜索: '.module-items .module-search-item;a&&title;img&&data-src;.video-serial&&Text;.video-serial&&href',
}