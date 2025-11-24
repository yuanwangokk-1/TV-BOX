/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: 'MuteFun[漫]',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: 'mxpro',
    title: 'MuteFun[漫]',
    host: 'https://www.mutedm.com/',
    class_parse: '.navbar-items li;a&&Text;a&&href;/(\\d+).html',
}