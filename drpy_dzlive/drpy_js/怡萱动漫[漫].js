var rule = {
    title: '怡萱动漫[漫]',
    host: 'https://www.yxdm.tv',
    // url:'/category.html?channel=17&zhonglei=fyclass&orderby=pubdate&totalresult=2999&pageno=fypage',
    url: '/category.html?channel=17&zhonglei=fyclassfyfilter&pageno=fypage',
    filterable: 1,//是否启用分类筛选,
    filter_url: '&{{fl.by}}&{{fl.year}}&{{fl.area}}&{{fl.sta}}&{{fl.class}}',
    filter: 'H4sIAAAAAAAAA+2VT28SQRjGv8ueObDYfzbh4CfwYnoxPSx0D1qsyh8jaUhQQgOk0i0qtGGLYoJgC1ULqXbJ0i+zMwvfwl1mmH1nvHBnjvt7nrzzvu9k9jlUnuwo208PlX09q2wrqbSmhJQD7YXufUzvm8j67n2/0RIZfe468DAq9maFno+9DyUXInR635ratvN3QAWvUjqTigZ4YUR/btD1sTv+yBsDvDBi8xLXBvjThDcGOLfrW0njWlIHnSPzFzq2luwcNzrY7FPq14lSsjB43aOmDQ2UsAr9rjupchUIgR1mdS0JOrwbOWN7yQ4j4cgDyvwq0fk3ECOCGIGiKogqFMOCGAai+pAXvW8gbgniFhQ3BXETihuCuAHFdUFch+KaIK5BUdiQCjekChtS4YZUYUMq3JAqbEgNNoSbI9z4Icqo/IG79nhCS6XAvZe7uFBc8t7RUW12vjjh+evE2yglC4NbGEzbeWighBlKv+lxzEAIG8Jouf1TaKCE9WBU0fUV1wMhrMLXNmoOuAqEBO/YwqUzzkAIO+JujAtD7ghC2BTdU49wUxDCDFctXOH3QAgznE+QUeIMhLDfV94OnvDcQAmb4n3frfOLIoRNwW6WTUEIq1A6c6wyV4EQZnhn4HydMxAS/GMNVOlxTRLCeqj0HNvkeiAkWFRn+vOCX9ScsArVI3Ryw1UghFUwvziWxVUghFXoDHG+iwxuVwFkww7bs4tv7udLbl4G4ROKZYP3g6s1ZJ38935w43bWGNFSL5N7ejKWjb7KxPa0tA5fC80zYIonnsX3/eN2Q/4VItNyyyWZiDIRZSLKRJSJKBNxpRPx8c4jmYUyC2UWyiyUWSizcKWzEBVvnXFdxqGMQxmHMg5lHMo4XOE4zP0DDVodpDkcAAA=',
    filter_def: {
        TV: {by: 'orderby=pubdate'},
        剧场版: {by: 'orderby=pubdate'},
        OVA: {by: 'orderby=pubdate'},
        其他: {by: 'orderby=pubdate'}
    },
    searchUrl: '/search.html?keyword=**&PageNo=fypage',
    searchable: 2,//是否启用全局搜索,
    headers: {//网站的请求头,完整支持所有的,常带ua和cookies
        'User-Agent': 'PC_UA',
    },
    class_name: 'TV&剧场版&OVA&其他',
    class_url: 'TV&剧场版&OVA&其他',
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '.dhnew.adj li;*;*;*;*',
    一级: '.dhnew li;a&&title;img&&src;p:eq(-1)&&Text;a&&href',
    二级: {
        "title": "h1&&Text;.dhxx p:eq(4)&&Text",
        "img": ".anime-img&&img&&src",
        "desc": ".info1-left li:eq(1)&&Text;.dhxx p:eq(3)&&Text;.dhxx p:eq(2)&&Text;.info1-left li:eq(0)&&Text;.info1-left li:eq(2)&&Text",
        "content": ".info2--strong&&Text",
        "tabs": ".ol-select li",
        "lists": ".ol-content:eq(#id) li"
    },
    搜索: '*;*;*;p:eq(3)&&Text;*',
}