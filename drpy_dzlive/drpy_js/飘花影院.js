Object.assign(muban.mxone5.二级, {
    tab_text: 'div--small&&Text',
    lists: '.module-player-list.tab-list:eq(#id)&&.scroll-content&&a',
});
var rule = {
    模板: 'mxone5',
    title: '飘花影院',
    host: 'https://www.6bys.com/',
    cate_exclude: '演员',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    搜索: '.module-items .module-search-item;a&&title;img&&data-src;.video-serial&&Text;.video-serial&&href',
}