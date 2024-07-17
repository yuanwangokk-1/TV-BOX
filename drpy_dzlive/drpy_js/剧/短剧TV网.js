Object.assign(muban.首图2.二级, {
    tabs: '.stui-pannel__head h3',
    img: '.stui-content__thumb img&&src',
});
var rule = {
    模板: '首图2',
    title: '短剧TV网',
    host: 'http://www.duanjutv.cc',
    url: '/vodtype/fyclass-fypage.html',
    searchUrl: '/vodsearch/**----------fypage---.html',
    推荐: 'ul.stui-vodlist.clearfix;li;*;*;*;*',
    double: true,
    一级: '.stui-vodlist li;a&&title;img&&src;.pic-text&&Text;a&&href',
    搜索: 'ul.stui-vodlist__media:eq(0),ul.stui-vodlist:eq(0),#searchList li;a&&title;*;.text-muted&&Text;a&&href;.text-muted:eq(-1)&&Text',
}