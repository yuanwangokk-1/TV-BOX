Object.assign(muban.首图2.二级, {
    tabs: '.stui-pannel__head h3',
});
var rule = {
    模板: '首图2',
    title: '想看影院',
    host: 'https://xiangkan1.com',
    url: '/list-fyclass-fypage.html',
    class_parse: '.stui-header__menu li:gt(0):lt(7);a&&Text;a&&href;.*/list-(.*?).html',
    searchUrl: '/search-**----------fypage---.html',
    二级访问前: $js.toString(() => {
        MY_URL = MY_URL.replace('play-', 'detail-');
    }),
    搜索: 'ul.stui-vodlist li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
}