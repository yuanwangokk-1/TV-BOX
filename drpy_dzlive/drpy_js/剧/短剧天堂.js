var rule = {
    author: '小可乐/240525/第一版',
    title: '短剧天堂',
    host: 'https://duanjutt.tv',
    hostJs: '',
    headers: {'User-Agent': 'MOBILE_UA'},
    编码: 'utf-8',
    timeout: 5000,

    homeUrl: '/',
    url: '/vodshow/fyfilter---fypage---.html',
    filter_url: '{{fl.cateId}}--{{fl.by}}---{{fl.letter}}',
    detailUrl: '',
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,

//分类太多，动态获取写筛选太烦
// class_parse: '.nav-list&&li;a&&Text;a&&href;vodtype/(.*?)\\.html',
// cate_exclude: '重生|明星',
    class_name: '逆袭(1组)&现代言情(2组)&神豪(3组)&赘婿(4组)',
    class_url: '1&21&26&31',
    filter_def: {
        1: {cateId: '1'},
        21: {cateId: '21'},
        26: {cateId: '26'},
        31: {cateId: '31'}
    },

    proxy_rule: '',
    sniffer: 0,
    isVideo: '',
    play_parse: true,
    parse_url: '',
    lazy: '',

    limit: 9,
    double: false,
//列表;(true双层列表);标题;图片;描述;链接;详情(可不写)
    推荐: '*;*;*;*;*',
//列表;标题;图片;描述;链接;详情(可不写)
    一级: '.myui-vodlist li;a&&title;a&&data-original;.text-right&&Text;a&&href',
    二级: {
//名称;类型
        "title": "h1&&Text;.data:eq(0)&&a:eq(0)&&Text",
//图片
        "img": ".picture&&img&&data-original",
//主要描述;年份;地区;演员;导演
        "desc": ".data:eq(1)&&Text;.data:eq(0)&&a:eq(-1)&&Text;.data:eq(0)&&a:eq(-2)&&Text;.data--span:eq(2)&&Text;.data--span:eq(3)&&Text",
//简介
        "content": ".data:eq(-1)&&Text",
//线路数组
        "tabs": ".nav-tabs:has(li)&&a",
//线路标题
        "tab_text": "body&&Text",
//播放数组 选集列表
        "lists": ".myui-content__list:eq(#id)&&a",
//选集标题
        "list_text": "body&&Text",
//选集链接
        "list_url": "a&&href"
    },
//列表;标题;图片;描述;链接;详情(可不写)
    搜索: '.myui-vodlist__media .thumb;*;*;*;*',

    filter: 'H4sIAAAAAAAAA+3Wy0ojQRQG4HepdQY0cXR05914v19xEbVBGXVAewZEAtFOVEYTnSEYBY13iEK8gAZNI75MqrvyFtMZ/zoVyC67QO+6vqquqsX5ObXOqlnD1Dr7rq2xBjYb0DX/HPOw5cCS5oztJ5Mnd53xr8DiT+3/wmWH86EtcZkusDOoZkHPJ9vxE35/DvYSi+MDa2MX7FOrbz9E5je4hjhvvPPXTblJFQtOF2Y+r7eo6bq2oq7H0wnrIVpyPR5J5Y0UtqCNGwGNJE2QJpJmSDNJC6SFpBXSStIGaSNph7STdEA6SPwQP0knpJOkC9JF0g3pJumB9JD0QnpJ+iB9JP2QfpIByADJIGSQZAgyRDIMGSYZgYyQjEJGScYgYyTjkHGSCcgEySRkkqTqSz2s8FVcKjNrqkys2F+e3S8pEyuRySee8b++4CyV2+ayWesxjpn5BX1V1fJDmO9sYWZ19seKVjh12sO8ZcTIjj3mzCuRCllGRBa8ShPfvxZX5N5iL/lLpcraObJvktJVrBzke6b0r26s3FhVRKxqy4jVTVI83clSr1WHZCLCeJdep/xgj9+fSv+mgnYdzZnb0uvV+vAf61lGzOd2KDdKFRElXxkdSrwc8dsPWepFL71YmL/JbuJTvck20uIiJF11JR7J5MxD6UWPve2oHT+Du03JTVIFJCn4D28JtyIzDQAA',
}