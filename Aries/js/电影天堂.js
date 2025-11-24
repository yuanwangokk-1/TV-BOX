/*
@header({
  searchable: 0,
  filterable: 0,
  quickSearch: 0,
  title: '电影天堂[自动]',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: '自动',
    title: '电影天堂[自动]',
    host: 'http://www.hongbaohk.com',
    class_parse: '.stui-header__menu li;a&&Text;a&&href;(\\d+).html',
    url: '/rou/fyclass--------fypage---.html',
    searchUrl: '/sou/**----------fypage---.html',
    二级: {
        title: '.stui-content__detail .title&&Text;.stui-content__detail p--span&&a&&Text',
        img: '.stui-content__thumb .lazyload&&data-original',
        desc: '.stui-content__detail p:eq(4)--strong&&Text;.stui-content__detail p--span--span--span--span&&a:eq(2)&&Text;.stui-content__detail p--span--span--span&&a:eq(1)&&Text;.stui-content__detail&&p:eq(2)--span&&Text;.stui-content__detail&&p:eq(3)--span&&Text',
        content: '.detail&&Text',
        tabs: '.stui-pannel__head h3',
        tabs1: '.stui-vodlist__head h3',
        lists: '.stui-content__playlist:eq(#id) li',
    },
    搜索: 'ul.stui-vodlist&&li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href;.detail&&Text',
}