var rule = {
    类型: '影视',
    title: 'UAA[密]',
    host: 'https://www.uaa.com',
    url: '/api/video/app/video/search?category&keyword&orderType=3&origin=fyclass&page=fypage&searchType=1&size=32&tag',
    searchUrl: '/api/video/app/video/search?category=&keyword=**&orderType=3&orderType=1&origin=&page=1&searchType=1&size=32&tag=',
    searchable: 2,
    headers: {'User-Agent': PC_UA},
    quickSearch: 0,
    filterable: 0,
    class_name: '国产视频&日本av&H动漫',
    class_url: '1&2&3',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 0, url: input, header: rule.headers}
    }),
    一级: 'json:model.data;title;coverUrl;categories;url',
    二级: '*',
    搜索: '*',
}