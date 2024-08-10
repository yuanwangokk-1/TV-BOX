var rule = {
    模板: '自动',
    title: '神马影院[自动]',
    host: 'http://biso.cc',
    url: '/show/fyclass--------fypage---.html',
    class_parse: '.grid-items&&li:lt(7);a&&Text;a&&href;.*/(.*?).html',
    searchUrl: '/search/**----------fypage---.html',
    搜索: '.module-items .module-search-item;h3&&a&&Text;img&&data-src;.video-serial&&Text;h3&&a&&href',
}