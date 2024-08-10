var rule = {
    title: '宇航影视',
    host: 'http://yuhang007.com',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    class_parse: '.nav-menu-items&&li;a&&Text;a&&href;/(\\d+)\.html',
    cate_exclude: '今日更新|热榜|资讯',
    搜索: '.module-items .module-search-item;.video-serial&&title;img&&data-src;.video-serial&&Text;.video-serial&&href',
    推荐: '.module-list;.module-items&&.module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    double: true, // 推荐内容是否双层定位
    tab_remove: ['WJ-良', 'YK'],
    一级: '.module-items .module-item;a&&title;img&&data-src;.module-item-text&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.tag-link&&Text",
        "img": ".module-item-pic&&img&&data-src",
        "desc": ".video-info-items:eq(0)&&Text;.video-info-items:eq(1)&&Text;.video-info-items:eq(2)&&Text;.video-info-items:eq(3)&&Text",
        "content": ".vod_content&&Text",
        "tabs": ".module-tab-item--small",
        "lists": ".module-player-list:eq(#id)&&.scroll-content&&a--em"
    },
}