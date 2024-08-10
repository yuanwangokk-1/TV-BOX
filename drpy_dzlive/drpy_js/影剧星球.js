var rule = {
   模板: '自动',
   模板修改: $js.toString(() => {
       Object.assign(muban.自动.二级, {
          tab_text: 'div--small&&Text',
        });
    }),
    title: '影剧星球[自动]',
    host: 'https://jumov.com',
    url: '/vod/list/fypage/fyclass/0/0/0/0/0/0',
    searchUrl: '/public/auto/search1.html?keyword=**&page=fypage',
    class_parse: '.navbar-items li:gt(1):lt(8);a&&Text;a&&href;/vod/1/(.*?)/0/0/0/0/0/0',
    搜索: 'body .module-item;.module-poster-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href',
}