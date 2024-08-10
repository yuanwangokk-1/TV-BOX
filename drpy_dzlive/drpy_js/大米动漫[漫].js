var rule = {
    模板: 'mxpro',
    title: '大米动漫[漫]',
    host: 'https://damidm.com/',
    url: 'show/fyclass--------fypage---.html',
    searchUrl: '/search/**----------fypage---.html',
    class_parse: '.navbar-items li;a&&Text;a&&href;/(\\d+).html',
    二级: {
        "title": "h1&&Text;.module-info-tag&&Text",
        "img": ".lazyload&&data-original",
        "desc": ".module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text",
        "content": ".module-info-introduction&&Text",
        "tabs": ".module-tab-item--small",
        "lists": ".module-play-list:eq(#id) a"
    },
}