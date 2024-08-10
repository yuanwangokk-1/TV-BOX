var rule = {
    title: '云电影网',
    模板: '首图',
    host: 'https://www.ydy8.com',
    url: '/fyclass/indexfypage.html[/fyclass/index.html]',
    searchUrl: '/search.php?page=2&searchword=**&searchtype=',
    class_name: '电影&电视剧&综艺&动漫',
    class_url: 'dy&tv&zy&dm',
    二级: {
        "title": ".myui-content__detail .title&&Text;.myui-content__detail p:eq(-2)&&Text",
        "img": ".myui-content__thumb .lazyload&&data-original",
        "desc": ".myui-content__detail p:eq(0)&&Text;.myui-content__detail p:eq(1)&&Text;.myui-content__detail p:eq(2)&&Text",
        "content": "#jq--h3&&Text",
        "tabs": ".tab-pane&&p",
        "lists": ".myui-content__list:eq(#id) li"
    },
    搜索: '#searchList li;a&&title;.lazyload&&data-original;.text-right&&Text;a&&href',
}