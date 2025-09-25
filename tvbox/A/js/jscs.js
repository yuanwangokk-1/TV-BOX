var rule = {
    title: '5点影视', //规则标题,没有实际作用,但是可以作为cms类名称依据
    编码: 'utf8', //不填就默认utf-8
    host: 'https://www.5.movie/',
    url: '/vodtype/fyclass-fypage.html', //网站的分类页面链接
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 0, //是否启用全局搜索,
    quickSearch: 0, //是否启用快速搜索,
    filterable: 0, //是否启用筛选,
    filter: {}, // 筛选条件字典
    headers: { //网站的请求头,完整支持所有的,常带ua和cookies
        'User-Agent': 'MOBILE_UA',
        //  "Cookie": "searchneed=ok"
    },
    timeout: 5000, //网站的全局请求超时,默认是3000毫秒
    class_name: '电影&剧集&短剧&动漫&综艺', //静态分类名称拼接
    class_url: '20&21&24&22&23', //静态分类标识拼接
    play_parse: true,
    lazy: '',
    // 首页推荐显示数量
    limit: 6,
    //  double: true,
    一级: '.row&&li;a&&title;.lazyload&&data-original;p&&Text;a&&href',
    二级: {'title': 'h3&&Text;.row&&span:eq(0)Text',
    'img': 'img&&data-original',
    'desc': '.row&&p:eq(1)&&Text;.row&&p:eq(2)&&Text;.row&&p:eq(3)&&Text;.row&&p:eq(4)&&Text;.row&&p:eq(5)&&Text;',
    'content': '.more-box&&p&&p',
    'tabs': '.playlist-tab&&li&&',
    'lists': '.episode-box&&li'},
    // 搜索可以是*,集成一级，或者跟一级一样的写法 列表;标题;图片;描述;链接;详情
    搜索: '*',
}