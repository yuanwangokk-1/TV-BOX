var rule = {
    模板: 'mx',
    title: '火狐影视',
    host: 'https://www.huohutv.net',
    url: '/vod-show-id-fyclass-page-fypage.html',
    searchUrl: '/vod-search-page-fypage-wd-**.html',
    class_parse: '.top_nav li;a&&Text;a&&href;/.*?(\\d*).html',
    图片来源: '@Referer=https://www.huohutv.net/',
}