var rule = {
    模板: 'mxone5',
    title: '小鱼影视',
    host: 'http://zsxy1.top/',
    cate_exclude: '直播',
    url: '/index.php/vod/show/id/fyclass/page/fypage.html',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    二级: {
        "title": "h1&&Text;.tag-link&&Text",
        "img": ".module-item-pic&&img&&data-src",
        "desc": ".video-info-items:eq(0)&&Text;.video-info-items:eq(1)&&Text;.video-info-items:eq(2)&&Text;.video-info-items:eq(3)&&Text",
        "content": ".vod_content&&Text",
        "tabs": ".module-tab-item--small",
        "lists": ".module-player-list:eq(#id)&&.scroll-content&&a"
    },
}