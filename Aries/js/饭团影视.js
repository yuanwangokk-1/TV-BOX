/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '饭团影视',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: 'vfed',
    title: '饭团影视',
    host: 'https://fantuansjz.com/',
    url: '/sjvodshow/fyclass--------fypage---.html',
    searchUrl: '/sjvodsearch/**----------fypage---.html',
    class_parse: '.fed-navs-left&&a;a&&Text;a&&href;/sjvodtype/(.*?).html',
    二级: {
        title: 'h3&&Text;.fed-deta-content&&li:eq(2)--span&&Text',
        img: '.fed-list-pics&&data-original',
        desc: '.fed-list-remarks&&Text;.fed-deta-content&&li:eq(4)--span&&Text;.fed-deta-content&&li:eq(3)--span&&Text;.fed-deta-content&&li--span&&Text;.fed-deta-content&&li:eq(1)--span&&Text',
        content: '',
        tabs: 'body&&.fed-tabs-btn',
        lists: 'body&&.fed-tabs-btm:eq(#id)&&li',
    },
    搜索: 'body&&.fed-part-layout&&.fed-list-deta;h3&&Text;*;*;.fed-deta-play&&href;.fed-part-rows&&Text',
}