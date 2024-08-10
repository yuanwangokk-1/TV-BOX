var rule = {
    类型: '听书',
    title: 'UAA[听]',
    host: 'https://www.uaa.com',
    url: '/api/audio/app/audio/search?category=fyclass&orderType=1&page=fypage&searchType=1&size=42',
    detailUrl: '/api/audio/app/audio/intro?id=fyid',
    searchUrl: '/api/audio/app/audio/search?category=&keyword=**&orderType=1&orderType=1&origin=&page=fypage&searchType=1&size=32&tag=',
    searchable: 2,
    headers: {'User-Agent': PC_UA},
    quickSearch: 0,
    filterable: 0,
    class_name: '有声小说&淫词艳曲&激情骚麦&寸止训练&ASMR',
    class_url: '有声小说&淫词艳曲&激情骚麦&寸止训练&ASMR',
    play_parse: true,
    lazy: $js.toString(() => {
        input = JSON.parse(request(input)).model.latestReadChapterUrl;
        input = {parse: 0, url: input};
    }),
    一级: 'json:model.data;title;coverUrl;categories;id',
    二级: '*',
    搜索: '*',
}