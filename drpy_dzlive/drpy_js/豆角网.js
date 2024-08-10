Object.assign(muban.首图2.二级, {
    img: 'img&&src',
    tabs: '.stui-pannel__head h4',
});
var rule = {
    模板: '首图2',
    title: '豆角网',
    host: 'https://www.dongkandi.com',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    class_parse: '.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;.*/(.*?).html',
    推荐: 'ul.stui-vodlist.clearfix;li;a&&title;img&&src;.pic-text&&Text;a&&href',
    一级: '.stui-vodlist li;a&&title;img&&src;.pic-text&&Text;a&&href',
    搜索: 'ul.stui-vodlist__media:eq(0),ul.stui-vodlist:eq(0),#searchList li;a&&title;img&&src;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
}