var rule = {
    模板: '首图',
    title: '电影天堂',
    host: 'http://www.hongbaohk.com',
    url: '/fyclass-fypage.html',
    searchUrl: '/sou/**----------fypage---.html',
    tab_exclude: '切换线路',
    推荐: 'ul.myui-vodlist.clearfix;li;*;*;*;*',
    一级: '.myui-vodlist li;a[title]&&title;a[title]&&data-original;.pic-text&&Text;a[title]&&href',
    class_parse: '.dropdown-box li;a&&Text;a&&href;.*/(.*?)\.html',
    cate_exclude: '电影咨询|明星',
}