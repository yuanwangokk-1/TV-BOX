/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '星空影院',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: 'mxpro',
    title: '星空影院',
    host: 'https://xkyy9.com',
    url: '/vodshow/fyclass--------fypage---.html',
    searchUrl: '/vodsearch/**----------fypage---.html',
    class_parse: '.navbar-items li;a&&Text;a&&href;/(\\d+).html',
    tab_exclude: '排序',
}